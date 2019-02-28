const path = require('path');
const VError = require('verror');
const globby = require('globby');
const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const mongoSession = require('connect-mongodb-session');
// const passport = require('passport');

const LOG = require('../utils/logger');
const promisifyExpress = require('../utils/promisifyExpress');
const appConfig = require('./appConfig');
const User = require('../model/user');

// require('./utils/passport.js');

// Log all unhandled promise rejections
process.on('unhandledRejection', function(reason, promise) {
  LOG.error(new VError('Possibly Unhandled Rejection'), { reason, promise });
});

const app = express();

// Database setup: mongoose
require('../utils/dbUtils.js').connect(appConfig.mongo.url);

// Public files
app.use(express.static(path.join(__dirname, '..', '..', '..', 'client', 'build')));

// Make the real IP available, even behind an nginx proxy
app.use(function(req, res, next) {
  req.realIp = req.headers['x-real-ip'] || req.ip;
  req.ip = req.realIp;
  next();
});

// Parse JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure sessions
app.set('trust proxy', 'loopback'); // trust first proxy. Needed for encrypted cookies
const MongoDBStore = mongoSession(expressSession);

const sessionStore = new MongoDBStore({ uri: appConfig.mongo.url, collection: 'sessions' });
const sessionParser = expressSession({
  name: 'sessionId',
  secret: appConfig.express.cookieSecret,
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    httpOnly: true, // BTW, default value is true
    signed: true, // BTW, default value is true
    secure: appConfig.express.cookieSecure,
  },
});
app.use(sessionParser);

// Configure passport (login)
// app.use(passport.initialize());
// app.use(passport.session());
app.use((req, resp, next) => {
  User
    .findOne({ email: 'yannis@drosidis.com' })
    .then(user => {
      req.user = user;
      next();
    });
});

// Add promise based functions to express.js
app.getP = promisifyExpress.wrap(app, 'get');
app.postP = promisifyExpress.wrap(app, 'post');
app.putP = promisifyExpress.wrap(app, 'put');
app.deleteP = promisifyExpress.wrap(app, 'delete');

// Include all routes in directory
const cwd = path.resolve(__dirname, '..');
globby
  .sync(['routes/**/*.js', '**/*.routes.js'], { cwd })
  // eslint-disable-next-line global-require, import/no-dynamic-require
  .forEach(f => require(path.resolve(cwd, f))(app));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new VError({ info: { status: 404 } }, 'Not Found'));
});

// error handler
app.use(function(err, req, res, next) {
  const status = VError.info(err).status || 500;
  res.status(status);
  // Log a warning for "Not found" and "Forbidden". Log a full stacktrace for everything else
  const ip = req.realIp;
  const username = req.user ? req.user.email : 'anonymous';
  if (status === 404) {
    LOG.warn('Not found. User: "%s" IP:"%s" url:"%s"', username, ip, req.originalUrl);
    res.send('Not found');
  } else if (status === 403) {
    LOG.warn('Forbidden. User: "%s" IP:"%s" url:"%s"', username, ip, req.originalUrl, VError.info(err).reason);
    res.send('An unexpected error occurred.');
  } else {
    LOG.error(err, 'Unexpected error. User: "%s" IP:"%s" url:"%s"', username, ip, req.originalUrl, VError.info(err));
    res.send('An unexpected error occurred.');
  }
});

module.exports = app;

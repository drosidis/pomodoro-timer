const bunyan = require('bunyan');
const appConfig = require('../config/appConfig.js');

const logger = bunyan.createLogger({
  name: 'timerApp',
  level: appConfig.app.logLevel,
});

module.exports = logger;

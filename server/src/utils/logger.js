const bunyan = require('bunyan');
const appConfig = require('../bin/appConfig');

const logger = bunyan.createLogger({
  name: 'timerApp',
  level: appConfig.app.logLevel,
});

module.exports = logger;

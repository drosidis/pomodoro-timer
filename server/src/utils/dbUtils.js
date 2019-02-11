const VError = require('verror');
const mongoose = require('mongoose');
const LOG = require('./logger.js');

// Connect to DB
module.exports.connect = function(mongoUrl) {
  mongoose.Promise = Promise;
  mongoose.connection
    .on('error', function(err) {
      LOG.warn(new VError(err, 'Mongoose failed to connect to DB %s', mongoUrl));
    })
    .on('open', function() {
      LOG.info('Mongoose connected to DB %s', mongoUrl);
    })
    .on('reconnected', function() {
      LOG.info('Mongoose re-connected to DB %s', mongoUrl);
    });
  mongoose.connect(mongoUrl);
};


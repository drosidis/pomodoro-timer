// Determine configuration file based on NODE_ENV (defaults to DEV)
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./environments/production');
} else {
  module.exports = require('./environments/development');
}

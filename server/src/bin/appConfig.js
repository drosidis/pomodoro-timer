// Groups together all application-wide configuration

// Sanity check: assert we have all required env variables before starting the server
const requiredEnvVariablies = [
  // 'NODE_ENV',
  'COOKIE_SECRET',
  'MONGO_CONNECTION_STRING',
];
requiredEnvVariablies.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Could not start BoxMind. Missing environment variable: ${varName}`); // eslint-disable-line no-console
    process.exit(1);
  }
});

// Create the appConfig object
const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const config = {

  app: {
    logLevel: isProd ? 'info' : 'debug',
  },

  express: {
    cookieSecret: process.env.COOKIE_SECRET,
    cookieSecure: isProd || isTest,
  },

  mongo: {
    url: process.env.MONGO_CONNECTION_STRING,
  },

};

module.exports = config;

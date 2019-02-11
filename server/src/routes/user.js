const User = require('../model/user');
const pick = require('lodash/pick')

module.exports = function(app) {

  app.getP('/user/me', (req, resp, next) => pick(req.user, ['email', 'preferences', 'currentTask']));

  app.postP('/user/me', (req, resp, next) => {
    // TODO: update preferences
    const data = req.body;
    console.log('Saving', data);
    return 'Done';
  });

};
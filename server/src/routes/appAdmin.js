const User = require('../model/user');

module.exports = function(app) {

  app.get('/ok', (req, resp, next) => resp.send('OK ' + new Date()));

  app.getP('/seed', (req, resp, next) =>
    User.create({
      email: 'yannis@drosidis.com',
      hash: null,
      preferences: {
        defaultInterval: 25 * 60,
        stopReasons: ['Done', 'Distracted', 'Cancel', 'Failed'],
        availableTasks: [
          {
            category: 'Box Mind - Infra',
            names: ['Dev environment', 'AWS', 'email & SMS', 'Rich table', 'Widgets', 'Style guide', 'authentication']
          },
          {
            category: 'Learn',
            names: ['React', 'AWS', 'node.js']
          },
        ]
      },
    })
      .then(() => 'OK')
  );

};
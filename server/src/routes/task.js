const Task = require('../model/task');
const User = require('../model/user');

module.exports = function(app) {

  // TODO: add hapi validation
  app.postP('/tasks/current/start', (req, resp, next) => {
    const currentTask = {
      category: req.body.category,
      name: req.body.name,
      tmStart: Date.now(),
    };
    return User.findOneAndUpdate({ _id: req.user._id }, { $set: { currentTask  } }, { new: true })
      .then(savedUser => savedUser.currentTask);
  });

  // TODO: add hapi validation
  app.postP('/tasks/current/stop', (req, resp, next) => {
    const currentTask = {
      userId: req.user._id,
      ...req.user.currentTask.toObject(), // toObject() needed because user is loaded through mongoose
      stopReason: req.body.stopReason,
      duration: new Date() - req.user.currentTask.tmStart,
    }
    return Task.create(currentTask)
      .then(() => User.findOneAndUpdate({ _id: req.user._id }, { $set: { currentTask: null  } }, { new: true }))
      .then(() => currentTask);
  });

};
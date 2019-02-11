const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Task = require('./task');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hash: String, // Password hash
  preferences: {
    defaultInterval: Number, // seconds
    stopReasons: [String],
    availableTasks: [{
      category: String,
      names: [String],
    }]
  },
  currentTask: Task.schema,
}, { minimize: false });

userSchema.methods.setPassword = function(password) {
  this.hash = bcrypt.hashSync(password);
};

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.hash);
};

module.exports = mongoose.model('User', userSchema);

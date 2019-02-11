const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: String,
  category: String,
  name: String,
  tmStart: Date,
  stopReason: String,
  duration: Number, // milis
}, { minimize: false });

module.exports = mongoose.model('Task', taskSchema);

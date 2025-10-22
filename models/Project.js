const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  files: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

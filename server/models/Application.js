const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  birthDate: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  parentName: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['new', 'viewed', 'waiting', 'continued', 'rejected'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema); 
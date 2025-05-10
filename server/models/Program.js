const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['онлайн', 'офлайн'],
    required: true
  },
  mode: {
    type: String,
    enum: ['групові', 'індивідуальні'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
programSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program; 
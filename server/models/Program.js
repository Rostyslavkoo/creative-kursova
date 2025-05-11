const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['онлайн', 'офлайн'],
    required: false
  },
  mode: {
    type: String,
    enum: ['групові', 'індивідуальні'],
    required: true
  },
  includes: [{
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  }],
  advantages: {
    type: String,
    required: false
  },
  duration: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  details: [
    {
      title: { type: String, required: false },
      description: { type: String, required: false }
    }
  ],
  showInCarousel: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

// Update the updatedAt timestamp before saving
programSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program; 
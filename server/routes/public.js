const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const reviewController = require('../controllers/reviewController');

// Public program routes
router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/programs/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Public review routes
router.get('/reviews', reviewController.getAllReviews);
router.post('/reviews', reviewController.createReview);

module.exports = router; 
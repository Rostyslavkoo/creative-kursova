const express = require('express')
const router = express.Router()
const Program = require('../../models/Program')
const { updateOne } = require('../../models/User')

// Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find()
    res.json(programs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get program by ID
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
    if (!program) {
      return res.status(404).json({ message: 'Program not found' })
    }
    res.json(program)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update program
router.put('/:id', async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const { title, description, type, mode, duration, price, details, showInCarousel } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!mode || !['групові', 'індивідуальні'].includes(mode)) {
      return res.status(400).json({ message: 'Valid mode (групові/індивідуальні) is required' });
    }
    let parsedDetails = [];
    if (details) {
      try {
        parsedDetails = typeof details === 'string' ? JSON.parse(details) : details;
      } catch (e) {
        return res.status(400).json({ message: 'Invalid details format' });
      }
    }
    // Remove empty details
    parsedDetails = Array.isArray(parsedDetails)
      ? parsedDetails.filter(d => d.title || d.description)
      : [];
    const updateData = {
      title,
      description: description || '',
      type: type || '',
      mode,
      duration: duration || '',
      price: typeof price === 'string' ? price : '',
      details: parsedDetails,
      showInCarousel: showInCarousel === 'true' || showInCarousel === true
    };
    // Якщо поле порожнє, зберігаємо як порожній рядок/масив
    if (!updateData.description) updateData.description = '';
    if (!updateData.duration) updateData.duration = '';
    if (!updateData.price) updateData.price = '';
    if (!updateData.type) updateData.type = '';
    if (!Array.isArray(updateData.details)) updateData.details = [];
    // Debug: log incoming price
    console.log('req.body.price:', req.body.price);
    updateData.price = typeof price === 'string' ? price : '';
    if (updateData.price === undefined || updateData.price === null) {
      updateData.price = '';
    }
    console.log('updateData.price:', updateData.price);
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { $set: { ...updateData, price: updateData.price ?? '' } },
      { new: true }
    );
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ... rest of your routes ...

module.exports = router 
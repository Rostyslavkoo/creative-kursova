const express = require('express');
const multer = require('multer');
const path = require('path');
const { adminAuth } = require('../middleware/auth');
const Program = require('../models/Program');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Protected admin routes
router.use(adminAuth);

// Get all content
router.get('/content', async (req, res) => {
  try {
    // TODO: Implement content retrieval
    res.json({ message: 'Get all content' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content
router.put('/content/:id', async (req, res) => {
  try {
    // TODO: Implement content update
    res.json({ message: 'Update content' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create content
router.post('/content', async (req, res) => {
  try {
    // TODO: Implement content creation
    res.json({ message: 'Create content' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete content
router.delete('/content/:id', async (req, res) => {
  try {
    // TODO: Implement content deletion
    res.json({ message: 'Delete content' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all programs
router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new program
router.post('/programs', upload.single('image'), async (req, res) => {
  try {
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

    const data = {
      title,
      description,
      type,
      mode,
      duration,
      price,
      details: parsedDetails,
      image: req.file ? req.file.filename : null,
      showInCarousel: showInCarousel === 'true' || showInCarousel === true
    };
    // Remove empty optional fields except mode
    ['type', 'duration', 'price'].forEach(field => {
      if (!data[field]) delete data[field];
    });

    const program = new Program(data);

    await program.save();
    res.status(201).json(program);
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update program
router.put('/programs/:id', upload.single('image'), async (req, res) => {
  try {
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
    console.log('req.body:', req.body);
    const updateData = {
      title,
      description: description || '',
      type: type || '',
      mode,
      duration: duration || '',
      price: typeof price === 'string' ? price : '',
      details: Array.isArray(parsedDetails) ? parsedDetails.filter(d => d.title || d.description) : [],
      showInCarousel: showInCarousel === 'true' || showInCarousel === true
    };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    if (updateData.price === undefined || updateData.price === null) {
      updateData.price = '';
    }
    console.log('updateData.price:', updateData.price);
    const program = await Program.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete program
router.delete('/programs/:id', async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Delete the image file if it exists
    if (program.image) {
      const fs = require('fs');
      const imagePath = path.join(__dirname, '..', 'uploads', program.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Program.findByIdAndDelete(req.params.id);
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
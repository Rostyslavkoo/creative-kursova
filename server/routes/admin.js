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
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const program = new Program({
      title,
      description,
      image: req.file ? req.file.filename : null
    });

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
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const updateData = {
      title,
      description
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const program = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
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
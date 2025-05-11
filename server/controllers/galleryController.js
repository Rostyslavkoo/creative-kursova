const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs').promises;

// Get all gallery images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new image
exports.addImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const newImage = new Gallery({
      title: req.body.title,
      url: imageUrl
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update image
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { title: req.body.title };

    if (req.file) {
      // Delete old image file
      const oldImage = await Gallery.findById(id);
      if (oldImage) {
        const oldImagePath = path.join(__dirname, '..', oldImage.url);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
      updateData.url = `/uploads/${req.file.filename}`;
    }

    const updatedImage = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '..', image.url);
    try {
      await fs.unlink(imagePath);
    } catch (error) {
      console.error('Error deleting image file:', error);
    }

    await Gallery.findByIdAndDelete(id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
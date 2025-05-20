require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ isAdmin: true });
    
    if (!admin) {
      console.log('No admin user found. Creating new admin...');
      const newAdmin = new User({
        username: 'admin',
        password: 'admin123', // This will be hashed automatically
        isAdmin: true
      });
      await newAdmin.save();
      console.log('New admin user created with credentials:');
      console.log('Username: admin');
      console.log('Password: admin123');
    } else {
      // Reset admin password
      admin.password = 'admin123'; // This will be hashed automatically
      await admin.save();
      console.log('Admin password has been reset to: admin123');
    }

    console.log('Password reset completed successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

resetAdminPassword(); 
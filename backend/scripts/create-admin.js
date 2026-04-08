const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../.env' });

const createAdmin = async () => {
  const [email, password, name] = process.argv.slice(2);

  if (!email || !password) {
    console.error('Usage: node create-admin.js <email> <password> [name]');
    process.exit(1);
  }

  try {
    const mongoUri = process.env.DB_URL || 'mongodb://127.0.0.1:27017/quillstack';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists. Updating to admin and resetting password...');
      existingUser.password = password;
      existingUser.isAdmin = true;
      if (name) existingUser.name = name;
      await existingUser.save();
      console.log('User updated successfully.');
    } else {
      const newUser = new User({
        email,
        password,
        name: name || 'Admin User',
        isAdmin: true
      });
      await newUser.save();
      console.log('Admin user created successfully.');
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

createAdmin();

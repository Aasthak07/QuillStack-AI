const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/quillstack'; // Use the environment variable or fallback to a local MongoDB URL

mongoose.connect(url)
    .then((result) => {
        console.log('✅ Connected to MongoDB successfully');
    }).catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        console.log('Make sure MongoDB is running or check your MONGO_URI environment variable');
    });

module.exports = mongoose;
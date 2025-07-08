const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const url = process.env.MONGO_URI; // Use the environment variable or fallback to a local MongoDB URL

mongoose.connect(url)
    .then((result) => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

module.exports = mongoose;
const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config(); // Load environment variables from .env file

// Set DNS servers to resolve MongoDB Atlas SRV records on Windows networks
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    // Ignore if environment restricts setting DNS servers
}

const url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quillstack';

if (mongoose.connection.readyState === 0) {
    mongoose.connect(url)
        .then(() => {
            console.log('✅ Connected to MongoDB successfully');
        }).catch((err) => {
            console.error('❌ MongoDB connection error:', err.message);
            console.log('Checking fallback connection to local MongoDB...');
            if (url.startsWith('mongodb+srv://')) {
                mongoose.connect('mongodb://127.0.0.1:27017/quillstack')
                    .then(() => console.log('✅ Connected to local MongoDB fallback successfully'))
                    .catch((localErr) => console.error('❌ Local fallback MongoDB error:', localErr.message));
            }
        });
}

module.exports = mongoose;
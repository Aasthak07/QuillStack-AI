const mongoose = require('mongoose');

const uploadcodeSchema = new mongoose.Schema({
    filename: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('upload', uploadcodeSchema);
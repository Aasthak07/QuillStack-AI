const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Simple password comparison (direct string comparison)
userSchema.methods.comparePassword = function (candidate) {
  return candidate === this.password;
};

module.exports = mongoose.model('User', userSchema);
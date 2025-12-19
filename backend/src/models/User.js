const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  balance: {
    type: Number,
    default: 100000
  },

  themePreference: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);

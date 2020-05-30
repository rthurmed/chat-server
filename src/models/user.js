const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true }
}, {
  collection: 'users',
  timestamps: true
});

module.exports = model('User', User);
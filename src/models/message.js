const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Message = new Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sender: { type: String, required: false },
}, {
  collection: 'messages',
});

module.exports = model('Message', Message);
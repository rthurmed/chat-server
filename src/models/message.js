const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Message = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: new Date() },
  sender: { type: String, required: false },
}, {
  collection: 'messages',
});

module.exports = model('Message', Message);
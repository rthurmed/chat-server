const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema, model } = mongoose;

const Message = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sender: { type: String, required: false },
}, {
  collection: 'messages',
});

Message.plugin(mongoosePaginate);

module.exports = model('Message', Message);
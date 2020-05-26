const { model } = require('mongoose');

const Message = model('Message')

exports.list = (req, res) => {
  Message.find({}).exec((err, messages) => {
    if (err) res.send(err);
    res.json({ list: messages });
  })
}
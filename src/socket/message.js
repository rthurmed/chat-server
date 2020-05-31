var jwt = require('jsonwebtoken');
const Message = require('../models/message');

module.exports = function (io, socket) {
  socket.on('write', (payload) => {
    jwt.verify(payload.token, process.env.SECRET, function(err, decoded) {
      Message.create({
        text: payload.text,
        author: decoded.payload._id
      }, (err, message) => {
        if (err) console.log(err);
        Message.findById(message._id)
          .populate('author')
          .exec(function (err, message) {
            if (err) console.log(err);
            io.emit('message', message);
          })
      })
    })
  });
}
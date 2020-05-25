var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config()
require('./db')

const Message = require('./src/models/message');

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('write', (msg) => {
    const message = new Message({
      text: msg
    })
    message.save((err) => {
      if (err) return
    })
    io.emit('message', message)
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
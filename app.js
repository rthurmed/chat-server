var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config()
require('./db')

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('write', (msg) => {
    io.emit('message', msg)
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
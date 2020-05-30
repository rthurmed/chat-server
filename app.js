require('dotenv-safe').config();
var app = require('express')();
var cors = require('cors')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var helmet = require('helmet');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var bearerToken = require('express-bearer-token');
require('./db');
const verifyJWT = require('./src/security/jwt').verifyJWT

const messagesRouter = require('./src/routes/message');
const authRouter = require('./src/routes/auth');

const Message = require('./src/models/message');

app.use(cors())
app.use(helmet())
app.use(bodyParser.json());
app.use(bearerToken())

app.use('/messages', verifyJWT, messagesRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({ message: '404 not found' });
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

http.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
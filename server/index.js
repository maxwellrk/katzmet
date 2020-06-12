const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
require('dotenv').config();
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist/')));

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected, there are', io.engine.clientsCount, 'users');
  socket.on('holdDiePosition', (position) => {
    io.emit('holdDiePosition', position);
  });

  socket.on('shuffleDice', (dice) => {
    io.emit('shuffleDice', dice);
  });

  socket.on('saveScore', (scores) => {
    io.emit('saveScore', scores);
  });

  socket.on('disconnect', () => {
    console.log(
      'user disconnected, there are,',
      io.engine.clientsCount,
      'users'
    );
  });
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}!`));

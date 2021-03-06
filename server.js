require("dotenv").config();

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./server/users');

const PORT = process.env.PORT || 3001

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use( express.static('client/build') )
} else {
    app.use( express.static('public') )
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(require("./server/router.js"));

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name.charAt(0).toUpperCase() + user.name.slice(1)}, welcome to room ${user.room.charAt(0).toUpperCase() + user.room.slice(1)}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    io.emit('room', {room: user.room})

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
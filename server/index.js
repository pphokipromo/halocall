const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(path.join(__dirname, '../public')));

// Rooms: { roomId: { id, name, camOn, micOn, sharing } }
const rooms = {};

io.on('connection', (socket) => {

  // Join room
  socket.on('join-room', ({ roomId, name }) => {
    if (!rooms[roomId]) rooms[roomId] = {};

    const peers = rooms[roomId];
    const peerCount = Object.keys(peers).length;

    if (peerCount >= 4) {
      socket.emit('room-full');
      return;
    }

    peers[socket.id] = { id: socket.id, name, camOn: true, micOn: true, sharing: false };
    socket.join(roomId);
    socket.roomId = roomId;

    // Send existing peers to new joiner
    socket.emit('room-joined', {
      peerId: socket.id,
      roomId: roomId,
      peers: Object.values(peers).filter(p => p.id !== socket.id)
    });

    // Notify existing peers
    socket.to(roomId).emit('peer-joined', { id: socket.id, name, camOn: true, micOn: true, sharing: false });
  });

  // WebRTC signaling
  socket.on('offer', ({ to, offer }) => {
    io.to(to).emit('offer', { from: socket.id, offer });
  });

  socket.on('answer', ({ to, answer }) => {
    io.to(to).emit('answer', { from: socket.id, answer });
  });

  socket.on('ice-candidate', ({ to, candidate }) => {
    io.to(to).emit('ice-candidate', { from: socket.id, candidate });
  });

  // State changes
  socket.on('toggle-cam', ({ camOn }) => {
    const roomId = socket.roomId;
    if (rooms[roomId]?.[socket.id]) rooms[roomId][socket.id].camOn = camOn;
    socket.to(roomId).emit('peer-cam-toggle', { id: socket.id, camOn });
  });

  socket.on('toggle-mic', ({ micOn }) => {
    const roomId = socket.roomId;
    if (rooms[roomId]?.[socket.id]) rooms[roomId][socket.id].micOn = micOn;
    socket.to(roomId).emit('peer-mic-toggle', { id: socket.id, micOn });
  });

  socket.on('screen-share-start', () => {
    const roomId = socket.roomId;
    if (rooms[roomId]?.[socket.id]) rooms[roomId][socket.id].sharing = true;
    socket.to(roomId).emit('peer-screen-share-start', { id: socket.id });
  });

  socket.on('screen-share-stop', () => {
    const roomId = socket.roomId;
    if (rooms[roomId]?.[socket.id]) rooms[roomId][socket.id].sharing = false;
    socket.to(roomId).emit('peer-screen-share-stop', { id: socket.id });
  });

  // Disconnect
  socket.on('disconnect', () => {
    const roomId = socket.roomId;
    if (roomId && rooms[roomId]) {
      delete rooms[roomId][socket.id];
      if (Object.keys(rooms[roomId]).length === 0) delete rooms[roomId];
      socket.to(roomId).emit('peer-left', { id: socket.id });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`HaloCall running on port ${PORT}`));

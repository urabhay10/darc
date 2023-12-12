const socketIo = require('socket.io');
const cors = require('cors')
const playerSockets = new Map();

module.exports = (server) => {
  const io = socketIo(server, { cors: { origin: 'http://localhost:3000' } });
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    playerSockets.set(username, socket);
    next();
  });
  io.on('connection', (socket) => {
    socket.on('send', (data) => {
      const message = data.message;
      const opponentname = data.opponentname;
      const opponentSocket = playerSockets.get(opponentname);
      if (opponentSocket) {
        opponentSocket.emit('receive', message);
      } else {
        console.log('your opponent does not exist')
        console.log(data)
      }
    })
    socket.on('joined', (data) => {
      const opponentname = data.opponentname;
      const username = data.username;
      const opponentSocket = playerSockets.get(opponentname);
      const playerSocket = playerSockets.get(username);
      if (opponentSocket) {
        opponentSocket.emit('joined', data.room);
      } else {
        // Handle the case when the opponent's socket is not found
        // You can log an error or handle it as needed
        console.log('your opponent does not exist')
        console.log(data)
      }
      setTimeout(() => {
        playerSocket.emit('turn1', {});
        opponentSocket.emit('turn1', {});
      }, 5000)
      setTimeout(() => {
        playerSocket.emit('end-turn1', {});
        opponentSocket.emit('end-turn1', {});
      }, 35000)
    });

    socket.on('start-turn2', (data) => {
      const opponentname = data.opponentname;
      const opponentSocket = playerSockets.get(opponentname);
      if (opponentSocket) {
        setTimeout(() => {
          opponentSocket.emit('turn2', data.room);
        }, 5000);
        setTimeout(() => {
          opponentSocket.emit('end-turn2', data.room);
        }, 35000);
      } else {
        console.log('opponent doesnt exist anymore')
        console.log(data)
      }
    });
    socket.on('start-turn3', (data) => {
      const opponentname = data.opponentname;
      const opponentSocket = playerSockets.get(opponentname);
      if (opponentSocket) {
        setTimeout(() => {
          opponentSocket.emit('turn3', data.room);
        }, 5000);
        setTimeout(() => {
          opponentSocket.emit('end-turn3', data.room);
        }, 35000);
      } else {
        console.log('opponent doesnt exist anymore')
        console.log(data)
      }
    });
    socket.on('start-turn4', (data) => {
      const opponentname = data.opponentname;
      const opponentSocket = playerSockets.get(opponentname);
      if (opponentSocket) {
        setTimeout(() => {
          opponentSocket.emit('turn4', data.room);
        }, 5000);
        setTimeout(() => {
          opponentSocket.emit('end-turn4', data.room);
        }, 35000);
        setTimeout(() => {
          opponentSocket.emit('end-game', data.room);
        }, 40000);
      } else {
        console.log('opponent doesnt exist anymore')
        console.log(data)
      }
    });
  });
};

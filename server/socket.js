const socketIo = require('socket.io');
const cors=require('cors')
const playerSockets = new Map();

module.exports = (server) => {
  const io = socketIo(server,{cors:{origin:'http://localhost:3000'}});
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    playerSockets.set(username, socket);
    next();
  });
  io.on('connection', (socket) => {
    socket.on('send',(data)=>{
      const message = data.message;
      const opponentname = data.opponentname;
      const opponentSocket = playerSockets.get(opponentname);
      if(opponentSocket){
        opponentSocket.emit('receive', message);
      }else{
        console.log('your opponent does not exist')
        console.log(data)
      }
    })
    socket.on('joined', (data) => {
      const opponentname = data.opponentname;
      const opponentSocket = playerSockets.get(opponentname);
      
      if (opponentSocket) {
        opponentSocket.emit('joined', data.room);
      } else {
        // Handle the case when the opponent's socket is not found
        // You can log an error or handle it as needed
        console.log('your opponent does not exist')
        console.log(data)
      }
    });
    
    socket.on('disconnect', () => {

    });
  });
};

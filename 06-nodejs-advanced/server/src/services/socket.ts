import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

let io: SocketServer;

function initializeSocket(server: Server) {
  io = new SocketServer(server);

  io.on('connection', socket => {
    const userId = socket.handshake.auth.userId as number;

    if (!userId) {
      console.log(`Socket ${socket.id} rejected, no userId provided.`);
      socket.disconnect();
      return;
    }

    // create room for user
    socket.join(userId.toString());

    socket.on('disconnect', reason => {
      console.log(`Socket ${socket.id} disconnected reason ${reason}.`);
    });
  });

  return io;
}

export { io, initializeSocket };

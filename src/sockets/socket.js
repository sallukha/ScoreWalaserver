 import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    socket.on("join-match", (matchId) => {
      socket.join(matchId);
    });
  });
};

export const getIO = () => io;

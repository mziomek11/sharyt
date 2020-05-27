import express from "express";
import http from "http";
import socket, { Socket } from "socket.io";

import User from "./User";
import Room from "./Room";
import UserList from "./UserList";
import RoomList from "./RoomList";

const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = process.env.PORT || 8080;

const userList = new UserList();
const roomList = new RoomList();

const joinRoom = (
  socket: Socket,
  username: string,
  room: Room,
  callback: (r: Room) => void
) => {
  const user = new User(socket.id, username, room.id);
  userList.addUser(user);
  socket.join(room.id);

  callback(room);
};

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomId }, callback) => {
    if (roomId === "new") {
      const newRoom = new Room();
      roomList.addRoom(newRoom);

      return joinRoom(socket, username, newRoom, callback);
    }

    const room = roomList.getRoom(roomId);
    if (room) return joinRoom(socket, username, room, callback);

    return callback();
  });

  socket.on("playVideo", ({ time, roomId }) => {
    socket.broadcast.to(roomId).emit("playVideo", time);
  });

  socket.on("pauseVideo", ({ time, roomId }) => {
    socket.broadcast.to(roomId).emit("pauseVideo", time);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

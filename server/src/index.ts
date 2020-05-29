import express from "express";
import http from "http";
import socket, { Socket } from "socket.io";

import User from "./User";
import Room from "./Room";
import UserList from "./UserList";
import RoomList from "./RoomList";
import Message from "./Message";
import {
  ChangeVideoData,
  PauseVideoData,
  PlayVideoData,
  SendMessageData,
  JoinRoomCallback,
} from "./types";

const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = process.env.PORT || 8080;

const userList = new UserList();
const roomList = new RoomList();

function broadcastMessage(socket: Socket, user: User, content: string) {
  const message = new Message(user.username, content);
  socket.broadcast.to(user.room).emit("message", message);
}

function joinRoom(socket: Socket, room: Room, callback: JoinRoomCallback) {
  const user = new User(socket.id, room.id);
  userList.addUser(user);
  socket.join(room.id);
  broadcastMessage(socket, user, "joined room");

  callback(room, user.username);
}

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId: string, callback: JoinRoomCallback) => {
    if (roomId === "new") {
      const newRoom = new Room();
      roomList.addRoom(newRoom);

      return joinRoom(socket, newRoom, callback);
    }

    const room = roomList.getRoom(roomId);
    if (room) return joinRoom(socket, room, callback);

    return callback();
  });

  socket.on("disconnect", () => {
    const user = userList.getUser(socket.id);
    if (!user) return;

    userList.removeUser(user.id);
    const usersInRoom = userList.getUsersInRoom(user.room);
    if (usersInRoom.length === 0) roomList.removeRoom(user.room);
    else broadcastMessage(socket, user, "left room");
  });

  socket.on("startWatching", (roomId: string) => {
    socket.broadcast.to(roomId).emit("startWatching");
  });

  socket.on("playVideo", ({ time, roomId }: PlayVideoData) => {
    socket.broadcast.to(roomId).emit("playVideo", time);
  });

  socket.on("pauseVideo", ({ time, roomId }: PauseVideoData) => {
    socket.broadcast.to(roomId).emit("pauseVideo", time);
  });

  socket.on("changeVideo", ({ roomId, videoId }: ChangeVideoData) => {
    const room = roomList.getRoom(roomId);
    if (!room) return;

    room.videoId = videoId;
    io.to(roomId).emit("changeVideo", videoId);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

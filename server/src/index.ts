import express from "express";
import http from "http";
import socket from "socket.io";

import UserList from "./UserList";

const app = express();
const server = http.createServer(app);
const io = socket(server);
const port = process.env.PORT || 8080;

io.on("connection", (socket) => {
  console.log("socket connected");
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

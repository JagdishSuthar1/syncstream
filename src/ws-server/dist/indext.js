"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const users_1 = require("./users");
const app = (0, express_1.default)();
const httpServer = app.listen(3001, () => console.log("Http server is Running on the PORT 3001"));
const ws = new ws_1.WebSocketServer({ server: httpServer });
const SpacesUsers = new users_1.Users();
ws.on("connection", (socket) => {
    console.log("Connected");
    socket.on("message", (data) => {
        if (data.type == 'JOIN_SPACE') {
            const response = SpacesUsers.addUserToSpace(data.payload.spaceId, data.payload.userId, socket);
            if (response.success == true) {
                const allUsers = SpacesUsers.getAllUsersInSpace(data.payload.spaceId);
                for (let i = 0; i < allUsers.data.length; i++) {
                    allUsers.data[i].socketId.send("UserId " + data.payload.userId + "is Connected");
                }
            }
        }
        else if (data.type == 'REMOVE_USER') {
            const response = SpacesUsers.removeUsers(data.payload.spaceId, data.payload.userId, socket);
            socket.close(1000, "Kicked");
            if (response.success == true) {
                const allUsers = SpacesUsers.getAllUsersInSpace(data.payload.spaceId);
                for (let i = 0; i < allUsers.data.length; i++) {
                    allUsers.data[i].socketId.send("UserId " + data.payload.userId + "is Removed");
                }
            }
        }
        else if (data.type == 'COMMENT_IN_SPACE') {
            const allUsers = SpacesUsers.getAllUsersInSpace(data.payload.spaceId);
            for (let i = 0; i < allUsers.data.length; i++) {
                allUsers.data[i].socketId.send(JSON.stringify(data.payload));
            }
        }
    });
    socket.on("close", (userId, reason) => {
        console.log("User is disconnected with UserId", userId);
    });
});

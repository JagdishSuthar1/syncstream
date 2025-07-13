"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const users_1 = require("./users");
const polls_1 = require("./polls");
const app = (0, express_1.default)();
const httpServer = app.listen(3001, () => console.log("Http server is Running on the PORT 3001"));
const ws = new ws_1.WebSocketServer({ server: httpServer });
const SpacesUsers = new users_1.Users();
const PollsOfSPaces = new polls_1.SpacePolls();
function SendMessageToAll(spaceId, payload) {
    var _a;
    const allUsers = SpacesUsers.getAllUsersInSpace(spaceId);
    console.log("length", (_a = allUsers.data) === null || _a === void 0 ? void 0 : _a.length);
    if (allUsers.data != null) {
        for (let i = 0; i < allUsers.data.length; i++) {
            allUsers.data[i].socketId.send(payload);
        }
    }
}
ws.on("connection", (socket) => {
    console.log("Connected");
    socket.on("message", (data) => {
        data = JSON.parse(data.toString());
        console.log(data);
        if (data.type == 'JOIN_SPACE') {
            const response = SpacesUsers.addUserToSpace(data.payload.spaceId, data.payload.userId, socket, data.payload.email);
            // console.log(response)
            if (response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({ type: "ADDED_USER", payload: `UserId " + ${data.payload.userId} + "is Connected"` });
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
            }
        }
        else if (data.type == 'REMOVE_USER') {
            const response = SpacesUsers.removeUsers(data.payload.spaceId, data.payload.userId);
            // console.log(response)
            if (response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({ type: "REMOVED_USER", payload: `UserId " + ${data.payload.userId} + "is Removed"` });
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
                response.data.close(1000, "Kicked");
            }
        }
        else if (data.type == 'COMMENT_IN_SPACE') {
            // console.log(allUsers)
            console.log("in comment ");
            const payloadSendToAllSocket = JSON.stringify(data);
            SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
        }
        else if (data.type == 'BAN_USER') {
            const response = SpacesUsers.removeUsers(data.payload.spaceId, data.payload.userId);
            if (response.success == true) {
                response.data.close(1000, "Banned");
            }
        }
        else if (data.type == "POLL_CREATE") {
            const response = PollsOfSPaces.addPoll(data.payload.spaceId, data.payload);
            console.log("poll crreation", response);
            if (response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({ type: 'POLL_CREATED', payload: data.payload });
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
                // let startPoll = true;
                // while(startPoll) {
                // }
            }
        }
        else if (data.type == 'POLL_UPDATE') {
            PollsOfSPaces.updatePoll(data.payload.id, data.payload.spaceId, data.payload);
        }
        else if (data.type == 'GET_ACTIVE_POLLS') {
            const response = PollsOfSPaces.giveActivePolls(data.payload.spaceId);
            const payloadSendToAllSocket = JSON.stringify({ type: 'ACTIVE_POLLS', payload: response.data });
            socket.send(payloadSendToAllSocket);
        }
        else if (data.type == 'CLOSE_POLL') {
            const response = PollsOfSPaces.closePoll(data.payload.spaceId, data.payload.pollId);
            if (response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({ type: 'CLOSED_POLL', payload: `Poll ${data.payload.pollId} is closed` });
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
            }
        }
        else if (data.type == 'GET_ACTIVE_USERS') {
            const response = SpacesUsers.getAllUsersInSpace(data.payload.spaceId);
            const payloadSendToAllSocket = JSON.stringify({ type: 'ACTIVE_USERS', payload: response.data });
            socket.send(payloadSendToAllSocket);
        }
    });
    socket.on("close", (userId, reason) => {
        console.log("User is disconnected with UserId", userId);
    });
});

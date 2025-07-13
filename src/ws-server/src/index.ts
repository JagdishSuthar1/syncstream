import express from "express"
import WebSocket,{  WebSocketServer } from "ws";
import { IncommingData } from "./types";
import { Users } from "./users";
import { SpacePolls } from "./polls";

const app = express();

const httpServer = app.listen(3001, ()=>console.log("Http server is Running on the PORT 3001"))

const ws = new WebSocketServer({server : httpServer});

const SpacesUsers = new Users();
const PollsOfSPaces = new SpacePolls();


function SendMessageToAll(spaceId : number, payload : string) {
    const allUsers = SpacesUsers.getAllUsersInSpace(spaceId);
    console.log("length" , allUsers.data?.length)
                if(allUsers.data != null) {
                    for(let i = 0; i < allUsers.data.length; i++) {
                        allUsers.data[i].socketId.send(payload)
                    }
        }
}


ws.on("connection" , (socket : WebSocket)=> {
    console.log("Connected");

    socket.on("message" , (data : IncommingData)=>{
        data = JSON.parse(data.toString())
        console.log(data);

        if(data.type == 'JOIN_SPACE') {
            const response = SpacesUsers.addUserToSpace(data.payload.spaceId , data.payload.userId , socket, data.payload.email);
            // console.log(response)
            if(response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({type : "ADDED_USER" , payload : `UserId " + ${data.payload.userId} + "is Connected"`})
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);

            }
        } 
        else if(data.type == 'REMOVE_USER') {
            const response = SpacesUsers.removeUsers(data.payload.spaceId , data.payload.userId);
            // console.log(response)
            if(response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({type : "REMOVED_USER" , payload : `UserId " + ${data.payload.userId} + "is Removed"`});
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
                response.data.close(1000, "Kicked");
            }
        }
        
        else if(data.type == 'COMMENT_IN_SPACE') {
            // console.log(allUsers)
            console.log("in comment ")
                const payloadSendToAllSocket = JSON.stringify(data);
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
        }
        
        else if(data.type == 'BAN_USER') {
            const response = SpacesUsers.removeUsers(data.payload.spaceId , data.payload.userId);
            if(response.success == true) {
                response.data.close(1000, "Banned");
            }
        }
        else if(data.type == "POLL_CREATE") {
            const response = PollsOfSPaces.addPoll(data.payload.spaceId , data.payload)
            console.log("poll crreation" , response)
            if(response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({type : 'POLL_CREATED' , payload : data.payload})
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
                // let startPoll = true;
                // while(startPoll) {
                // }
            }

        }
        else if(data.type =='POLL_UPDATE') {
            PollsOfSPaces.updatePoll(data.payload.id , data.payload.spaceId, data.payload)
        }
        else if(data.type =='GET_ACTIVE_POLLS') {
            const response = PollsOfSPaces.giveActivePolls(data.payload.spaceId)
            
            const payloadSendToAllSocket = JSON.stringify({type : 'ACTIVE_POLLS' , payload : response.data})
            socket.send(payloadSendToAllSocket)

        }
        else if(data.type == 'CLOSE_POLL') {
            const response = PollsOfSPaces.closePoll(data.payload.spaceId, data.payload.pollId)
            if(response.success == true) {
                const payloadSendToAllSocket = JSON.stringify({type : 'CLOSED_POLL' , payload : `Poll ${data.payload.pollId} is closed`})
                SendMessageToAll(data.payload.spaceId, payloadSendToAllSocket);
            }
        }
        else if(data.type =='GET_ACTIVE_USERS') {
            const response = SpacesUsers.getAllUsersInSpace(data.payload.spaceId)
            
            const payloadSendToAllSocket = JSON.stringify({type : 'ACTIVE_USERS' , payload : response.data})
            socket.send(payloadSendToAllSocket)

        }


    })


    socket.on("close" , (userId , reason)=>{
        console.log("User is disconnected with UserId", userId)
    })
})


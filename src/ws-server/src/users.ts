import WebSocket from "ws";


type Room = {
    socketId : WebSocket,
    userId : number,
    email : string
}

type ResponseType = {
    success : boolean,
    message : string,
    data? : any
}

export class Users {
    private spaceUsers : Map<string, Room[]>  = new Map()

    addUserToSpace(spaceId : number , userId : number, socketId : WebSocket, email : string) :ResponseType{
        if(!this.spaceUsers.has(spaceId.toString())) {
            this.spaceUsers.set(spaceId.toString(), [{socketId: socketId , userId : userId, email : email}]);
            return {
                success : true,
                message : "User Added Successfully"
            }
        } 

        const allUsers = this.spaceUsers.get(spaceId.toString())!;
        // console.log("allusers", allUsers)
        const checkExist = allUsers.some((item)=>  item.userId == userId);
        if(checkExist) {

            let indexOfUpdateSocket = -1;
            for(let i = 0; i < allUsers.length; i++) {
                if(allUsers[i].userId == userId) {
                    indexOfUpdateSocket = i;
                    break;
                }
            }

            allUsers[indexOfUpdateSocket] = {socketId : socketId , userId : userId, email : email};
            this.spaceUsers.set(spaceId.toString() , allUsers)
            return {
                success : false,
                message : "User is already in room"
            }
        }
        else {
            allUsers.push({socketId : socketId , userId : userId, email : email});
            this.spaceUsers.set(spaceId.toString() , allUsers)
            // console.log("allusers" , this.spaceUsers.get(spaceId.toString()))
            return {
                success : true,
                message : "User Added Successfully"
            }
        }
    }
    
    getAllUsersInSpace(spaceId : number) : {success : boolean , message : string , data : Room[] | null} {

        const allUsers = this.spaceUsers.get(spaceId.toString());
        if(allUsers != null) {
            return {
                success : true, 
                message : "All users Fetched SUccessfully",
                data : allUsers
            }
        }
        else {
            return {
                success : false, 
                message : "No users in this Space",
                data : null
            }
        }
    }

    removeUsers(spaceId : number , userId : number) : ResponseType {
        if(!this.spaceUsers.has(spaceId.toString())) {
            return {
                success : false,
                message : "Space not exist"
            }
        }

        let allUsers = this.spaceUsers.get(spaceId.toString())!;
        // console.log("allusers" , allUsers)
        const checkExist = allUsers.some((item)=> item.userId == userId);

        
        if(!checkExist) {
            return {
                success : false,
                message : "User is not in room"
            }
        }
        else {
            let deletedSocket ;
            let indexofremoval = -1;
            for(let i = 0; i < allUsers.length; i++) {
                if(allUsers[i].userId == userId) {
                    deletedSocket = allUsers[i].socketId
                    indexofremoval = i;
                    break;
                }
            }

            allUsers.splice(indexofremoval, 1);

            this.spaceUsers.set(spaceId.toString(), allUsers);
            return {
                success : true,
                message : "User Removed",
                data : deletedSocket
            }
        }
    }
}
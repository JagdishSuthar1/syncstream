
export enum IncommingMessageType {
    join_space = "JOIN_SPACE",
    comment = "COMMENT_IN_SPACE",
    remove_user = "REMOVE_USER",
    ban_user = "BAN_USER",
    poll_create = "POLL_CREATE",
    poll_update = 'POLL_UPDATE',
    get_active_polls = 'GET_ACTIVE_POLLS',
    close_poll = 'CLOSE_POLL',
    active_users = 'GET_ACTIVE_USERS',
    fetch_again = 'FETCH_AGAIN'    
}

export type UserPayloadType= {
    spaceId : number,
    userId : number,
    email : string
}



export type PollStreamType = {
    id : number,
    url : string,
    startTime : number,
    currTime :  number,
    spaceId : number,
    want : number ,
    dontWant  : number,
}


type UserType = {
    id: number,
    email: string
} 

export type PollCloseType = {
    spaceId : number,
    pollId : number
}

export type SpaceCommentType = {
    id : number,
    spaceId : number,
    user : UserType,
    message : string
}


export type IncommingData  = {
    type : IncommingMessageType.join_space,
    payload : UserPayloadType
} | {
    type : IncommingMessageType.comment,
    payload : SpaceCommentType
} |  {
    type : IncommingMessageType.remove_user,
    payload : UserPayloadType
} | {
    type : IncommingMessageType.ban_user,
    payload : UserPayloadType
} |  {
    type : IncommingMessageType.poll_create,
    payload : PollStreamType
} |  {
    type : IncommingMessageType.poll_update,
    payload : PollStreamType
} | {
    type : IncommingMessageType.get_active_polls,
    payload : {spaceId : number}
}  | {
    type : IncommingMessageType.close_poll,
    payload : PollCloseType
} | {
    type : IncommingMessageType.active_users,
    payload : {spaceId : number}
} | {
    type : IncommingMessageType.fetch_again,
    payload : {spaceId : number}
}
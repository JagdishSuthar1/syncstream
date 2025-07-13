import { SpaceType } from "@/context"

export type PollStreamType = {
    url : string,
    startTime : number,
    status : 'ACTIVE' | 'CLOSE'
    spaceId : number,
    want : number ,
    dontWant  : number,
}

export type AllSpaceType = {
  success: boolean,
  message: string,
  data : {
    mySpaces : SpaceType[]  , 
    joinedSpaces :SpaceType[]
  } | null

} 

"use client"
import { Dialog, DialogDescription, DialogHeader, DialogTitle , DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MainContext, StreamType } from "@/context";
import { VideoPlayer } from "../reactPlayer";
import { PollStreamType } from "@/types/allTypes";
import UpvoteOnPoll from "@/helpers/upvoteOnPoll";
import { toast } from "sonner";
import DownVoteOnPoll from "@/helpers/downVoteOnPoll";
import PollResultChart from "./pollResultChar";


export default function PollDialog({pollStream}: {pollStream : PollStreamType & {id : number}}) {
    const {commentSocket, pollResultShow, setPollResultShow} = useContext(MainContext)!;
    const [openDialog , setOpenDialog] = useState<boolean>(true)

    useEffect(()=>{
        setOpenDialog(true)
    },[pollStream])
    
    return (
        
        <Dialog open={openDialog} onOpenChange={setOpenDialog} >

            <DialogTrigger></DialogTrigger>
            <DialogContent className=" text-white w-full h-100 bg-[#071919]">
               {!pollResultShow ?
               <div className="w-full h-full flex flex-col gap-3">
                   <DialogHeader className="h-11 flex flex-row  gap-1">
                       <div className="flex flex-col gap-1 w-[70%]">
                       <DialogTitle className="text-white">Poll</DialogTitle>
                       <DialogDescription>Vote if You Like it..</DialogDescription>
                       </div>
                       <div className="flex flex-row items-center w-[30%] justify-center">
                       <Button className=" bg-[#889da5] hover:bg-[#889da5] hover:cursor-pointer  rounded-2xl p-1 w-[70%]" onClick={()=>{
                        setPollResultShow(true);
                       }}>Result</Button>
   
                       </div>
                   </DialogHeader>
                           <div className="w-full h-60">
                               <VideoPlayer videoURL={pollStream.url}/>
                           </div>
                   
                   <div className="flex flex-row gap-3 justify-center ">
                   <Button  className="bg-[#889da5] hover:bg-[#889da5] hover:cursor-pointer " onClick={async()=>{
                       const response = await UpvoteOnPoll(pollStream.id, pollStream.spaceId);
                       commentSocket?.send(JSON.stringify({type : "POLL_UPDATE", payload : response.data }))
                   }}>Play Now {pollStream.want}</Button>
                   <Button  className="bg-[#889da5] hover:bg-[#889da5] hover:cursor-pointer" onClick={async()=>{
                       const response = await DownVoteOnPoll(pollStream.id, pollStream.spaceId);
                       commentSocket?.send(JSON.stringify({type : "POLL_UPDATE", payload : response.data }))
                   }}>I Don't Like {pollStream.dontWant}</Button>

                </div>
                </div> :
                <div className="w-full h-full flex flex-col gap-3">
                     <DialogHeader className=" h-11 flex flex-row  gap-1">
                       <div className="flex flex-col gap-1 w-[70%]">
                       <DialogTitle className="text-white">Result</DialogTitle>
                       </div>
                       <div className="flex flex-row items-center w-[30%] justify-center">
                       <Button className=" bg-[#889da5] hover:bg-[#889da5] hover:cursor-pointer  rounded-2xl p-1 w-[70%]" onClick={()=>{
                        setPollResultShow(false);
                       }}>Back to Poll</Button>
                       </div>
                   </DialogHeader>
                    <PollResultChart chartData={[{xlabel: 'want' , count : pollStream.want },
    {xlabel : 'dontWant' , count :pollStream.dontWant },
]}/>
                </div>}
                
            </DialogContent> 
        </Dialog>
    )
}
"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"
import { PollStreamType } from "@/types/allTypes";

type ResponseType = {
    success : boolean,
    message? : string,
    data? : {

        id : number,
        email : string
     }[]
}


export default async function ClosePoll(pollId : number , spaceId : number )  {

    const response = await CheckAuthenticated();
    if(response.success == true) {
        try {
            await prisma.polls.update({
                where :{
                    id : pollId ,
                    spaceId : spaceId
                },

                data : {
                        status : 'CLOSE',
                },


            })
            
                return {
                    success : true,
                    message : "Poll Close Successfully",
                }
        }

        catch(err) {
            //console.log(err);
            return {
                success : false
            }
        }
        
    }
    else {
        return {
            success : false
        }
    }
}
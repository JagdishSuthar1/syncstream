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


export default async function CreatePoll(pollData  : PollStreamType)  {

    const response = await CheckAuthenticated();
    if(response.success == true) {
        try {
            const result =  await prisma.polls.create({

                data : {
                        status : 'ACTIVE',
                        url : pollData.url,
                        startTime : pollData.startTime,
                        spaceId : pollData.spaceId,
                }
                ,
                include : {
                        _count : {
                            select : {
                                want : true,
                                dontWant : true
                            },
                        },
                        
                }
            })

            let dummy = {
                id: result.id,
                spaceId: result.spaceId,
                url: result.url,
                status: result.status ,
                startTime: result.startTime,
                want : result._count.want,
                dontWant : result._count.dontWant
            }
            

            

                return {
                    success : true,
                    message : "Poll created Successfully",
                    data : dummy
                }
        }

        catch(err) {
            console.log(err);
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
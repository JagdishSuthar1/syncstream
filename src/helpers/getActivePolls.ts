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


export default async function GetActivePolls(spaceId  : number)  {

    const response = await CheckAuthenticated();
    
    if(response.success == true) {
        try {
            const result =  await prisma.polls.findMany({
                where : {
                    id : spaceId,
                    status : 'ACTIVE'
                },
                include : {
                    _count : {
                        select : {
                            want : true,
                            dontWant : true
                        },
                    },
                    
            }
            

            })
                return {
                    success : true,
                    message : "Poll Fetched Successfully",
                    data : result
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
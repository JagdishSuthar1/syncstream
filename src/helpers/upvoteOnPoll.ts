"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"

export default async function UpvoteOnPoll(id : number, spaceId : number) {

   const response = await CheckAuthenticated();

   if(response.success == true && response.data != null) {

    try {
        
        const result = await prisma.polls.update({
            where : {
                id : id,
                spaceId : spaceId
            },
            data : {
               dontWant : {
                disconnect : {
                    id : response.data.id
                }
               },
               want : {
                connect : {
                    id : response.data.id
                }
               }
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
            message : "Upvoted on Poll",
            data : dummy
        }
    }
   
   catch(err)  {
    console.log(err)
    return {
        success : false,
        message :  " Database error"
    }
   }
 
}
else {
    return {
        success : false,
        message : "Unauthroised access"
    }
}

}
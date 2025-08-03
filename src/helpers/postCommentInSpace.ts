"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"



export default async function PostCommentInSpace(formdata : FormData) {

    const spaceId = Number(formdata.get("spaceId"));
    const userId = Number(formdata.get("userId"));
    const message = String(formdata.get("message"))
    const response = await CheckAuthenticated();
    if(response.success == true) {
        try {
            const chats = await prisma.chats.create( {
                data : {
                    spaceId : spaceId ,
                    userId : userId , 
                    message : message
                },
                include : {
                    user : true
                }
            })

            if(chats) {
                
            }
    
        }

        catch(err) {
            //console.log(err);
            
        }
        
    }
    else {
        
    }
}
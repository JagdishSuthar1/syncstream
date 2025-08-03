"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"

type ResponseType = {
    success : boolean,
    message? : string,
    data? : {

        id : number,
        email : string
     }[]
}

export default async function ActiveSpaceUsers(spaceId : number) :Promise<ResponseType> {

    const response = await CheckAuthenticated();
    if(response.success == true) {
        try {
            const allUsers = await prisma.space.findUnique( {
                where : {
                    id : spaceId
                },
                select : {
                    activeUsers : {
                        select : {
                            id : true,
                            email : true
                        }
                    }
                }
            })
    
            if(allUsers != null) {
                return {
                    success : true,
                    message : "All users fetched Successfully",
                    data : allUsers.activeUsers 
                }
            }
            else {
                return {
                    success : true,
                    message : "All users fetched Successfully",
                   
                }
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
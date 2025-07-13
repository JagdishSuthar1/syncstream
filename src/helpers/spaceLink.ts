"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"


export default async function SpaceLink(spaceId : number)  {

    const response = await CheckAuthenticated();
    if(response.success == true) {
        try {
            
            const result = await prisma.space.findUnique({
                where : {
                    id : spaceId
                },
                select : {
                    link : true
                }
            })

            return {
                success : true,
                message : "Link extract successfully",
                data : result?.link
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
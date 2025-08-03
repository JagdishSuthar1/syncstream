"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function SpaceJoinUsingCode(spaceCode : number) {

   const response = await CheckAuthenticated();

    if(response.success == true && response.data != null ) {
        try {
            const result = await prisma.space.findMany({
                where : {
                    spacecode : spaceCode ,
                    bannedUsers : {
                        some : {
                            email : response.data.email
                        }
                    }
                }
            })
    
            // //console.log(result)
            if(result.length != 0) {
                return {
                    success : false,
                    message : "You are Banned In this Space"
                }
            }
    
            
           const updatedSpace =  await prisma.space.update({
                where : {
                    spacecode : spaceCode
                },
                data : {
                    activeUsers : {
                        connect : {
                            email : response.data.email
                        }
                    }
                },
                select : {
                    id : true
                }
            })
    
            // //console.log("updatedSpace",updatedSpace)
            revalidatePath(`/dashboard/${updatedSpace.id}`)
            return {
                success : true,
                data : updatedSpace.id
            }
        }
       
       catch(err)  {
        //console.log(err)
        return {
            success : false,
            data : "Error"
    
        }
       }

    }
 
else {
    redirect("/")
}

}
"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BannedOrNot from "./bannedOrNot";

export default async function HandleSpaceJoin(id : number) {


    const response = await BannedOrNot(id)
    if (response.success == false && response.message == "NOT_BANNED" && response.data != null) {

    try {


        
        await prisma.space.update({
            where : {
                id : id
            },
            data : {
                activeUsers : {
                    connect : {
                        email : response.data.email
                    }
                }
            }
        })

        revalidatePath(`/dashboard/${id}`)
        return {
            success : true,
            message : "Joined"
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
    redirect("/")
}

}
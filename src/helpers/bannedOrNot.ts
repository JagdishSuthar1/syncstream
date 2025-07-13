"use server"

import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function BannedOrNot(id : number) {

   const response = await CheckAuthenticated();
   const session = await getServerSession();

   if(response.success == true && response.data != null) {

    try {
        const result = await prisma.space.findMany({
            where : {
                id : id ,
                bannedUsers : {
                    some : {
                        email : session?.user?.email!
                    }
                }
            }
        })

        if(result.length != 0) {
            return {
                success : true,
                message : "BANNED",
                data : response.data
            }
        }
        else {
            return {
                success : false,
                message : "NOT_BANNED",
                data : response.data
            }
        }
        
    }
   
   catch(err)  {
    console.log(err)
    return {
        success : false,
        message : "Database error",
        data : response.data
    }
   }

}
else {
    redirect("/")
}
}
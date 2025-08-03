'use server'

import { MainContext } from "@/context";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { useContext } from "react";
import CheckAuthenticated from "./checkAuthenticated";
import { redirect } from "next/navigation";

export async function handleDeleteStream(spaceId : number) {
  
     const response = await CheckAuthenticated();

     if(response.success == true) {

try {
    
    await prisma.space.delete({
        where : {
            id : spaceId,
            creatorId : response.data?.id
        }
    })
    
    revalidatePath("/dashboard");
    return {
        success : true,
        message : "Space is Deleted"
    }
}
catch(err) {
    //console.log(err);
    return {
        success : false,
        message : "Space is not Deleted"
    }
}
   
  }
  else {
      return {
        success : false,
        message : response.message
      }
  }
  
  }



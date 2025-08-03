"use server"
import { prisma } from "@/lib/prisma";


export default async function getAllSpaceID() {
    try {

        const allSpacesId = await prisma.space.findMany({});
    
    
        return {
          success: true,
          messsage: "All Spaces Fetched Successfully",
          data: allSpacesId
        }
    }
    catch(err) {
        //console.log(err);
        return {
            success : false,
            message : "Database Error",
            data : null
        }

    }
}
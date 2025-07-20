'use server'
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"
import CheckAuthenticated from "./checkAuthenticated";




export async function HandleSetCurrentStream(spaceId : number , newStreamId : number) {


                    const response = await CheckAuthenticated()
                    if(response.success == true && response.data != null) {
                            try {

                                await prisma.space.update({
                                where : {
                                    id : spaceId,
                                },
                                data : {
                                    currentStream : newStreamId
                                }
                               
                            })
    
                            return {
                                success : true,
                                message : "Current Stream Updated Successfully"
                            }
                            }
                            catch(err) {
                                return {
                                success : false,
                                message : "Database Issue"
                            }
                            }
                    }
                    return {
                                success : false,
                                message : "Sign Up first"
                            }
        
                        }
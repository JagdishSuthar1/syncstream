"use server"

import { prisma } from "@/lib/prisma";
import CryptoJS from "crypto-js"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


const secret_key = "Jagdish_Suthar"

function handleCreateLink(data : object) {
    const hashedSpaceUserId = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), secret_key).toString());
    const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/share/${hashedSpaceUserId}`;
    //console.log(shareLink);

    return shareLink

  }

export async function handleCreateSpace(prevState : any , formData : FormData) {

    const nameOfSpace = String(formData.get("nameOfSpace"));
        
    const session = await getServerSession();
    if (session != null && session.user?.email != null) {
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: session?.user?.email
                }
            })

            if (user) {
                    const spacecode  = Math.random() * 10000;
                    const results = await prisma.space.create({
                        data: {
                            creatorId: user.id,
                            name : nameOfSpace,
                            spacecode : spacecode,
                            link : ""
                        }
                    })

                    const forShare = {
                        id : results.id,
                        creatorId : results.creatorId
                    }

                    const link = handleCreateLink(forShare);

                    await prisma.space.update({
                        where : {
                            id : results.id
                        }
                        ,
                        data: {
                            link : link
                        }
                    })

                    revalidatePath("/dashboard")
                    return {
                        success: true,
                        message: "Space Created Successfully",
                        linkCreated : true,
                        linkCopy : false,
                        link : link 
                    }

            }

            else {
                return {
                    success: false,
                    message: "Unauthorised access"
                }

            }
        }
        catch (err) {
            //console.log(err);
            return {
                success: false,
                message: "Error in Request"
            }
        }
    }

    else {
        return {
            success: false,
            message: "Sign in first"
        }
    }


    }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth";


export async function POST(req: NextRequest) {

    const session = await getServerSession();
    if (session != null && session.user?.email != null) {
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: session?.user?.email
                }
            })

            if (user) {
                const reqBody = await req.json();

                    const newComment = await prisma.chats.create( {
                        data : {
                            spaceId : reqBody.spaceId ,
                            userId : reqBody.userId , 
                            message : reqBody.message
                        },
                        
                        select : {
                            spaceId : true,
                            id : true,
                            message : true,
                            user : {
                                    select : {
                                        id : true,
                                        email : true
                                    }
                                }

                            
                        }
                    })

                    return NextResponse.json({
                        success : true ,
                        message : "Comment Posted Successfully",
                        data : newComment
                    })

            }

            else {
                return NextResponse.json({
                    success: false,
                    message: "Sign in first"
                })

            }
        }
        catch (err) {
            console.log(err);
            return NextResponse.json({
                success: false,
                message: "Error in Request"
            })
        }
    }

    else {
        
        return NextResponse.json({
            success: false,
            message: "Unauthorised access"
        })
    }

}



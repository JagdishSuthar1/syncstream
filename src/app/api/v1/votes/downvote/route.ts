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

                await prisma.votes.update(
                    {
                        where: {
                            streamId_userId: {
                                userId: user?.id!,
                                streamId: reqBody.streamId
                            }
                        }
                        , data : {
                            type : "DownVote"
                        }
                    }
                )

            
                return NextResponse.json({
                    success: true,
                    message: "DownVote added Successfully",
                })
            }

            else {
                return NextResponse.json({
                    success: false,
                    message: "Unauthorised access"
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
            message: "Sign in first"
        })
    }









}
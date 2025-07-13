import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {

    const session = await getServerSession();
    console.log(session)
    if (session != null && session.user?.email != null) {
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: session?.user?.email
                }
            })


            if (user) {

                const results = await prisma.space.findMany({
                    where: {
                            creatorId: user.id
                    },
                    include : {
                        activeStreams : true
                    }
                    
                });

                console.log(results)
                return NextResponse.json({
                    success: true,
                    messsage: "Active stream Fetched Successfully",
                    data: results
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
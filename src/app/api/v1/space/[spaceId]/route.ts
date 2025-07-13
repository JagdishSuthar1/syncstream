import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth";



export async function GET(req: NextRequest , {params} : {params : {spaceId : string}}) {

    const session = await getServerSession();
    if (session != null && session.user?.email != null) {
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: session?.user?.email
                }
            })


            if (user) {

                // const spaceId = req.nextUrl.searchParams.get("spaceId")
                const spaceId = (await params).spaceId
                // console.log(spaceId)
                const results = await prisma.activeStream.findMany({
                    // _count : {
                    //     upvote : true
                    // },
                    
                    where: {
                        spaceId: parseInt(spaceId!)
                    },

                    // orderBy: {
                    //     votes: {
                    //         _count: 'desc'
                    //     }
                    // },
                    include : {
                        votes : true
                    }
                })

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
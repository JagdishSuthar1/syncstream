
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest , {params} : {params : {spaceId : string}}) {

    
         const session = await getServerSession();
         const spaceId = Number((await params ).spaceId)
                console.log(session)
                if (session != null && session.user?.email != null) {
                    try {
            
                        const user = await prisma.user.findFirst({
                            where: {
                                email: session?.user?.email
                            }
                        })
            
            
                        if (user) {
                      
                            const allUsers = await prisma.space.findMany( {
                                where : {
                                    id : spaceId
                                },
                                include : {
                                    activeUsers : true
                                }
                            })
                    
                            return NextResponse.json({
                                success : true,
                                message : "All users fetched Successfully",
                                data : allUsers
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

   

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
// @ts-ignore
import youtubesearchapi from "youtube-search-api"
import { getServerSession } from "next-auth";
const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}(&[\w=&]*)?/i;


export async function POST(req: NextRequest) {
    const session = await getServerSession();
    console.log("in router add stream")
    if (session != null && session.user?.email != null) {
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: session?.user?.email
                }
            })

            if (user) {

                    const reqBody = await req.json();
                    console.log(reqBody)
                    const youtube_regex = new RegExp(YT_REGEX, "i");
                    const check = youtube_regex.test(reqBody.url);
                    console.log("check : ", check)
                    if (check) {
                        const extractedId = reqBody.url.split("?v=")[1];
                        const dataFromYoutube = await youtubesearchapi.GetVideoDetails(extractedId)
                        console.log(dataFromYoutube.thumbnail)
                        // console.log({
                        //     userId: reqBody.userId,
                        //     url: reqBody.url,
                        //     thumbnailURL: dataFromYoutube.thumbnail.thumbnails[4].url,
                        //     title: dataFromYoutube.title,
                        //     spaceId: reqBody.spaceId,
                        //     type: reqBody.type,
                        //     extractedId: extractedId
                        // })
                        const results = await prisma.activeStream.create({
                            data: {
                                userId: user.id,
                                url: reqBody.url,
                                thumbnailURL: dataFromYoutube.thumbnail.thumbnails[3].url,
                                title: dataFromYoutube.title,
                                spaceId: reqBody.spaceId,
                                type: reqBody.type,
                                extractedId: extractedId
                            }
                        })
                        console.log(reqBody);
                        return NextResponse.json({
                            success: true,
                            message: "Stream Add successfully",
                            data: results
                        })
                    }
                    else {
                        return NextResponse.json({
                            success: false,
                            message: "Url is Not Correct"
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
    
        catch (err) {
                console.log(err);
                return NextResponse.json({
                    success: false,
                    message: "Server Side Issue"
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
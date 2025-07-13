'use server'

import { axiosInstance } from "@/axiosInstance"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
// @ts-ignore
import youtubesearchapi from "youtube-search-api"
import { getServerSession } from "next-auth";
import CheckAuthenticated from "./checkAuthenticated";
const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}(&[\w=&]*)?/i;




export async function handleCreateStream(prevState : any, formdata : FormData) {

    // const {spaceId , inputString ,urlType} = data

    const spaceId = Number(formdata.get("spaceId"));
    const urlType = String(formdata.get("urlType"));
    const inputString = String(formdata.get("inputString"));

        console.log({
            spaceId : spaceId,
            type : urlType,
            url : inputString
        })
        const session = await getServerSession();
        // try {
        //     const response = await axiosInstance.post("/api/v1/stream/add-stream"  ,{
        //         spaceId : spaceId,
        //         type : urlType,
        //         url : inputString
        //     })
    
    
        //     console.log(response.data)
        //     if(response.data.success == true) {
        //        revalidatePath(`/dashboard/${spaceId}`)
        //        redirect(`/dashboard/${spaceId}`)
               
        //     }  

        // }
        // catch(err) {
        //     console.log(err)
        // }


                    const response = await CheckAuthenticated()
                    if(response.success == true && response.data != null) {
                        const youtube_regex = new RegExp(YT_REGEX, "i");
                        const check = youtube_regex.test(inputString);
                        console.log("check : ", check)
                        if (check) {
                            const extractedId = inputString.split("?v=")[1];
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
                                    userId: response.data.id,
                                    url: inputString,
                                    thumbnailURL: dataFromYoutube.thumbnail.thumbnails[3].url,
                                    title: dataFromYoutube.title,
                                    spaceId: spaceId,
                                    type: "Youtube",
                                    extractedId: extractedId
                                }
                            })

                            revalidatePath(`/dashboard/${spaceId}`)
                            // redirect(`/dashboard/${spaceId}`)
                            return {
                                success : true,
                                message : ""
                            }
                    }
                            
                            }
                            else {
                                return {
                                    success: false,
                                    message: "Unauthorized"
                                }
                            }
        
                        }
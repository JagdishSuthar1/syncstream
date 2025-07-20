'use server'

import { axiosInstance } from "@/axiosInstance";
import getAllStream from "./getAllStream";
import { getServerSession } from "next-auth";
import { SpaceType, StreamType, UserType } from "@/context";
import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated";

export default async function handleDownvote(formdata: FormData) {

    const userId = Number(formdata.get("userID"))
    const spaceId = Number(formdata.get("spaceId"))
    const contentOfMessage = String(formdata.get("message"));

    const response = await CheckAuthenticated()
    if (response.success == true && response.data != null) {

        await prisma.chats.create(
            {
                data: {
                    userId : userId,
                    spaceId : spaceId,
                    message : contentOfMessage
                }
            }
        )

        return {
            success : true,
            
        }

    }

    else {
        return {
            success: false,
            message: "Unauthorised access",
            userInfo : null,
            data : null
        }
    }

}
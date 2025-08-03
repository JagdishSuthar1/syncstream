'use server'

import { axiosInstance } from "@/axiosInstance";
import getAllStream from "./getAllStream";
import { getServerSession } from "next-auth";
import { SpaceType, StreamType, UserType } from "@/context";
import { prisma } from "@/lib/prisma";
import CheckAuthenticated from "./checkAuthenticated";

type DataProps = {
    success: boolean,
    message: string,
    userInfo : UserType | null,
    data: {
        currentStream: StreamType;
                allStream: StreamType[];
                currentSpace: SpaceType
                ,
                comments: {
                    id: number;
                    spaceId: number;
                    user: UserType;
                    message: string;
                }[]
                fetchAgain: boolean;

    } | null

}



export default async function handleDownvote(prevState: DataProps, formdata: FormData): Promise<DataProps> {

    const streamId = Number(formdata.get("currentStream"))
    const spaceId = Number(formdata.get("spaceId"))
    ////console.log("stream and spaceId", streamId, spaceId);


    const response = await CheckAuthenticated()
    if (response.success == true && response.data != null) {

        await prisma.votes.update(
            {
                where: {
                    streamId_userId: {
                        userId: response.data.id,
                        streamId: streamId
                    }
                }
                , data: {
                    type: "DownVote"
                }
            }
        )

        return getAllStream(spaceId);


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
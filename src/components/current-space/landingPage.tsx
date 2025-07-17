"use client";
import DialogForAddStream from "@/components/current-space/dialogforAddStream";
import { VideoPlayer } from "@/components/reactPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainContext, SpaceType, StreamType, UserType } from "@/context";
import handleDownvote from "@/helpers/downVote";
import getAllStream from "@/helpers/getAllStream";
import handleUpvote from "@/helpers/upvote";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {  Router, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

import { axiosInstance } from "@/axiosInstance";
import KickedDialog from "./kicketd";
import BannedDialog from "./bannedDialog";
import CreatePoll from "@/helpers/createPoll";
import PollDialog from "./pollDialog";
import {GetDecryptedData } from "@/helpers/getDecryptedData";

type DataProps = {
    success: boolean;
    message: string;
    userInfo : UserType | null,
    data: {
        currentStream: StreamType;
        allStream: StreamType[];
        currentSpace: SpaceType,
        comments: {
            id: number;
            spaceId: number;
            user: UserType;
            message: string;
        }[]
        fetchAgain: boolean;
    } | null
};


export default function LandingPageForCurrentSPace({
    data,
}: {
    data: DataProps;
}) {
    const router = useRouter()

    if(data.success == true && data.data != null && data.userInfo != null) {

    const {
        allStreams,
        setAllStream,
        fetchAgain,
        setFetchAgain,
        commentSocket,
        setCommentSocket,
        comments,
        setComments,
        setKicked,
        kicked,
        setActivePolls,
        setCurrentPollDetails,
        currentPollDetails,
        colorsStates,
        typography,
        setActiveUsers
    } = useContext(MainContext)!;


    const [currentstream, setCurrentStream] = useState<StreamType | null>(null);
    const [state, formAction] = useActionState(handleUpvote, data);
    const [banned, setBanned] = useState<boolean>(false);
    const [state2, formAction2] = useActionState(handleDownvote, data);

    const pathname = usePathname()
    const decryptedSpaceData = GetDecryptedData(pathname.split("/")[2]);

    // if(data.data != undefined) {
    //     setAllStream(data.data.allStream);
    //     setCurrentStream(data.data.currentStream)
    //     setFetchAgain(data.data.fetchAgain)
    // }


    useEffect(() => {
        // const params = new URLSearchParams(window.location.search);

        async function handleFetchStream() {
            const serverData = await getAllStream(decryptedSpaceData.id);

            if (serverData.data != null) {
                setAllStream(serverData.data.allStream);
                setCurrentStream(serverData.data.currentStream);
                // setSpaceSelected(serverData.data.currentSpace)
                setComments(serverData.data.comments)
                setFetchAgain(false);
            }
        }

        if (data == undefined || fetchAgain == true) {
            handleFetchStream();
        }

    }, [fetchAgain, data]);


    useEffect(() => {
        //   setInterval(()=> {
        //     router.refresh();
        //       }, 10000);
        setComments(data.data?.comments!)
        // console.log("mountinr websocket")
        const socket = new WebSocket("ws://localhost:3001");

        socket.onopen = () => {
            console.log("Connected");
            socket.send(
                JSON.stringify({
                    type: "JOIN_SPACE",
                    payload: {
                        spaceId: decryptedSpaceData.id,
                        userId: data.userInfo?.id,
                        email: data.userInfo?.email
                    },
                })
            );
        }

        socket.onmessage = (ev) => {
            const getDataFromWS = JSON.parse(ev.data);
            console.log(getDataFromWS)
            if (getDataFromWS.type == "ADDED_USER") {
                toast.success(getDataFromWS.payload);
            } else if (getDataFromWS.type == "REMOVED_USER") {
                toast.error(getDataFromWS.payload);
            }
            else if (getDataFromWS.type == "COMMENT_IN_SPACE") {
                console.log(getDataFromWS);
                const newComment = {
                    id: getDataFromWS.payload.id,
                    spaceId: getDataFromWS.payload.spaceId,
                    user: getDataFromWS.payload.user,
                    message: getDataFromWS.payload.message,
                }
                setComments(prev => (prev ? [...prev, newComment] : [newComment]));
            }
            else if (getDataFromWS.type == 'POLL_CREATED') {
                console.log("done poll creation")
                setCurrentPollDetails(prev => prev = getDataFromWS.payload)
            }
            else if (getDataFromWS.type == 'CLOSED_POLL') {
                toast.success(getDataFromWS.payload)
            }

            else if (getDataFromWS.type == 'ACTIVE_POLLS') {

                setActivePolls(prev => prev = getDataFromWS.payload)
            }

            else if (getDataFromWS.type == 'ACTIVE_USERS') {
                console.log(getDataFromWS)
                setActiveUsers(prev => prev = getDataFromWS.payload)
            }

        }

        socket.onclose = (ev) => {
            console.log(ev.reason)
            if (ev.reason == 'Kicked') {
                setKicked(prev => prev = true);
            }
            else if (ev.reason == 'Banned') {
                setBanned(prev => prev = true);
            }
        }



        setCommentSocket(prev => prev = socket);

        return () => {
            socket.close(1000);
        }
    }, [])


    useEffect(() => {
        if (state.data != undefined) {
            setAllStream(state.data.allStream);
            setCurrentStream(state.data.currentStream);
            setFetchAgain(state.data.fetchAgain);
        }

        if (state2.data != undefined) {
            setAllStream(state2.data.allStream);
            setCurrentStream(state2.data.currentStream);
            setFetchAgain(state2.data.fetchAgain);
        }

    }, [state, state2]);

    // const initialState = {};


    async function PostCommentInSpace(formdata: FormData) {
        const spaceId = Number(formdata.get("spaceId"));
        const userId = Number(formdata.get("userId"));
        const message = String(formdata.get("message"));
        // console.log(spaceId + userId + message);

        try {
            const response = await axiosInstance.post("/api/v1/chats", {
                spaceId: decryptedSpaceData.id,
                userId: userId,
                message: message,
            });

            if (response.data.success == true) {
                const newComment = response.data.data;
                console.log("newComment", newComment);

                commentSocket?.send(
                    JSON.stringify({
                        type: "COMMENT_IN_SPACE",
                        payload: newComment,
                    })
                );
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={`w-full bg-[#071919] text-${typography} min-h-max `}>
            {currentPollDetails ? <PollDialog pollStream={currentPollDetails} /> : ""}
            {kicked ? <KickedDialog /> : banned ? <BannedDialog /> :

                <div className="w-full min-h-max flex flex-col gap-5 p-3">

                    <div className={`w-[98%] h-150 flex flex-row gap-3 justify-evenly mt-3  rounded-[5px]`}>
                        <Card className="h-full w-[70%] flex flex-col gap-0 pb-0 bg-[#071919] rounded-[5px] ">

                            {currentstream ? (
                                <CardContent className="flex flex-col gap-3 h-full w-full ">
                                    <div className="w-full h-[85%]">
                                        <VideoPlayer videoURL={currentstream.url} />
                                    </div>

                                    <div className="w-full flex flex-row h-[15%]">
                                        <div className=" w-[70%] h-full flex flex-col gap-1">
                                            <span className="text-white">{currentstream.title}</span>
                                            <div className="flex flex-row gap-3 w-full">
                                                {/* <Button className="hover:cursor-pointer" onClick={async()=> {
                                                        
                                                        const dataAfterVoting = await handleUpvote(currentstream.id);
                                                        if(dataAfterVoting.data != null) {


                                                        setAllStream(dataAfterVoting.data.allStream);
                                                        setCurrentStream(dataAfterVoting.data.currentStream)
                                                        setFetchAgain(dataAfterVoting.data.fetchAgain)
                                                        }
                                                        }}><ThumbsUpIcon /> <span>{currentstream.upvote}</span></Button> */}
                                                {/* <div className="flex flex-row gap-3"> */}

                                                <form action={formAction}>
                                                    <input
                                                        type="hidden"
                                                        name="currentStream"
                                                        value={currentstream.id}
                                                    />
                                                    <input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                                    <Button type="submit" className={`bg-[#3b3937]`}>
                                                        {" "}
                                                        <ThumbsUpIcon />
                                                        <span>{currentstream.upvote}</span>
                                                    </Button>
                                                </form>

                                                {/* <Button className="hover:cursor-pointer" onClick={() => handleDownvote(currentstream.id)}><ThumbsDownIcon /> <span>{currentstream.downvote}</span></Button> */}
                                                {/* <form action={formAction}>
                                                            <input type="hidden" name="currentStream"  />
                                                            <Button type="submit"> <span>{currentstream.upvote}</span></Button>
                                                        </form> */}
                                                <form action={formAction2}>
                                                    <input
                                                        type="hidden"
                                                        name="currentStream"
                                                        value={currentstream.id}
                                                    />
                                                    <input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                                    <Button type="submit" className={`bg-[#3b3937]`}>
                                                        {" "}
                                                        <ThumbsDownIcon />
                                                        <span>{currentstream.downvote}</span>
                                                    </Button>
                                                </form>
                                                {/* </div> */}
                                            </div>
                                        </div>


                                        <div className="w-[30%]  flex flex-row justify-end">
                                            {allStreams && allStreams.length > 0 && decryptedSpaceData && decryptedSpaceData.creatorId == data.userInfo?.id ?  (
                                                <Button
                                                    className="bg-[#e80082] hover:bg-[#e80082] w-15 h-15 rounded-[50%] hover:cursor-pointer"
                                                    onClick={() => {
                                                        let dummy = [...allStreams!];
                                                        const top = dummy.shift()!;
                                                        dummy.push(top);
                                                        setAllStream(dummy);
                                                        setCurrentStream(dummy[0]);
                                                    }}
                                                >
                                                    Skip
                                                </Button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            ) : (
                                "No stream Available"
                            )}
                        </Card>

                        <Card className={`h-full w-[30%]  flex flex-col gap-3 pt-3 bg-[${colorsStates.streamPage.background}] rounded-[5px]`}>
                            <DialogForAddStream userId={data.userInfo.id} />
                            <ScrollArea className="w-full h-[95%]">
                                <CardContent className="flex flex-col gap-[5px]">
                                    {allStreams
                                        ? allStreams.map((item, index) => (
                                            <Card
                                                key={index}

                                                className={`w-full h-33 bg-[#cfc8b6] hover:cursor-pointer rounded-[5px]`}
                                                onClick={() => setCurrentStream(item)}
                                            >
                                                {/* {colorsStates.streamPage.background} */}
                                                <CardContent className="flex flex-row w-full h-full gap-3">
                                                    <div className="w-[30%] h-[89px]">
                                                        <img
                                                            className="w-full h-full rounded-[7px]"
                                                            src={item.thumbnailURL}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="w-[70%] flex flex-col gap-1">
                                                        <ScrollArea className="h-[47px]">
                                                            <span>{item.title}</span>
                                                        </ScrollArea>
                                                        <div className="w-full flex flex-row justify-between">
                                                            {/* <Button className="hover:cursor-pointer" onClick={() => handleUpvote(item.id)}><ThumbsUpIcon /> <span>{item.upvote}</span></Button> */}
                                                            <div className="flex flex-row gap-3">
                                                                <form action={formAction}>
                                                                    <input
                                                                        type="hidden"
                                                                        name="currentStream"
                                                                        value={item.id}
                                                                    />
                                                                    <input
                                                                        type="hidden"
                                                                        name="spaceId"
                                                                        value={decryptedSpaceData.id}
                                                                    />
                                                                    <Button
                                                                        type="submit"
                                                                        className={`bg-[#3b3937] hover:cursor-pointer`}
                                                                    >

                                                                        <ThumbsUpIcon /> <span>{item.upvote}</span>
                                                                    </Button>
                                                                </form>

                                                                {/* <Button className="hover:cursor-pointer" onClick={() => handleDownvote(item.id)}><ThumbsDownIcon /> <span>{item.downvote}</span></Button> */}

                                                                <form action={formAction2}>
                                                                    <input
                                                                        type="hidden"
                                                                        name="currentStream"
                                                                        value={item.id}
                                                                    />
                                                                    <input
                                                                        type="hidden"
                                                                        name="spaceId"
                                                                        value={decryptedSpaceData.id}
                                                                    />
                                                                    <Button
                                                                        type="submit"
                                                                        className={` bg-[#3b3937] hover:cursor-pointer`}
                                                                    >

                                                                        <ThumbsDownIcon /> <span>{item.downvote}</span>
                                                                    </Button>
                                                                </form>
                                                            </div>

                                                            {decryptedSpaceData && decryptedSpaceData.creatorId == data.userInfo?.id ? <Button className={`bg-[#3b3937]  hover:cursor-pointer`} onClick={async () => {

                                                                const response = await CreatePoll({
                                                                    status: 'ACTIVE',
                                                                    url: item.url,
                                                                    spaceId: Number(item.spaceId),
                                                                    startTime: new Date().getSeconds(),
                                                                    want: 0,
                                                                    dontWant: 0
                                                                })

                                                                if (response.success == true) {
                                                                    commentSocket?.send(JSON.stringify({
                                                                        type: "POLL_CREATE",
                                                                        payload: response.data
                                                                    }))
                                                                    toast.success(response.message)
                                                                }


                                                            }}>Create Poll</Button> : ""}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                        : "No stream Found"}
                                </CardContent>
                            </ScrollArea>
                        </Card>
                    </div>

                    <Card className={`bg-[#071919] w-[98%] h-100 rounded-[5px] flex flex-col pt-1 pb-0`}>
                        <CardHeader className="w-full h-15 flex flex-row justify-between items-center  rounded-[5px]">
                            <span className="text-white font-bold">All Comments</span>

                            <div>
                                <form action={PostCommentInSpace}>
                                    <Input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                    <Input type="hidden" name="userId" value={data.userInfo.id} />
                                    <div className="flex flex-row gap-3 ">
                                        <Input
                                            className="w-100 rounded-[5px] text-white"
                                            type="text"
                                            placeholder="Type Your Comment.."
                                            name="message"
                                        />
                                        <Button type="submit" className={`bg-[#3b3937] hover:cursor-pointer`}>Post Comment</Button>
                                    </div>
                                </form>
                            </div>
                        </CardHeader>
                        <ScrollArea className="w-full h-70">
                            <CardContent className="w-full h-70 bg-[#1d2525] flex flex-col gap-1  pt-1 pl-1 pr-0 ">
                                {comments
                                    ? comments.map((item, index) => (
                                        <div key={index} className={`w-full h-13  flex flex-row gap-10 p-3 rounded-none`}>
                                            {item.user.id == data.userInfo?.id ? (
                                                <span className="text-white mt-1">You</span>
                                            ) : (
                                                <Avatar>
                                                    <AvatarFallback className="hover:cursor-pointer">
                                                        {item.user.email[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}

                                            <span className="text-white mt-1">{item.message}</span>
                                        </div>
                                    ))
                                    : <span className="text-white pl-5">No comment Found</span>}
                            </CardContent>
                        </ScrollArea>
                    </Card>
                </div>}
        </div>

    );
}
else {
    router.push("/")
}

}


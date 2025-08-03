"use client";
import DialogForAddStream from "@/components/current-space/dialogforAddStream";
import { VideoPlayer } from "@/components/reactPlayer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MainContext, SpaceType, StreamType, UserType } from "@/context";
import handleDownvote from "@/helpers/downVote";
import getAllStream from "@/helpers/getAllStream";
import handleUpvote from "@/helpers/upvote";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Router, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";

import { axiosInstance } from "@/axiosInstance";
import KickedDialog from "./kicketd";
import BannedDialog from "./bannedDialog";
import CreatePoll from "@/helpers/createPoll";
import PollDialog from "./pollDialog";
import { GetDecryptedData } from "@/helpers/getDecryptedData";
import { HandleSetCurrentStream } from "@/helpers/setCurrentStream";
import { Accordion } from "../ui/accordion";
import ReactPlayer from "react-player";

type DataProps = {
    success: boolean;
    message: string;
    userInfo: UserType | null,
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

    if (data.success == true && data.data != null && data.userInfo != null) {

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

        useEffect(() => {

            async function handleFetchStream() {
                const serverData = await getAllStream(decryptedSpaceData.id);

                if (serverData.data != null) {
                    setAllStream(serverData.data.allStream);
                    setCurrentStream(serverData.data.currentStream);
                    setComments(serverData.data.comments)
                    setFetchAgain(false);
                      commentSocket?.send(JSON.stringify({
                    type: "FETCH_AGAIN",
                    payload: {
                        spaceId: decryptedSpaceData.id,
                    }
                }))
                }
            }

            if (data == undefined || fetchAgain == true) {
                handleFetchStream();
              
            }

        }, [fetchAgain, data]);


        useEffect(() => {
            setComments(data.data?.comments!)
            const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL as string);

            socket.onopen = () => {
                //console.log("Connected");
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
                //console.log(getDataFromWS)
                if (getDataFromWS.type == "ADDED_USER") {
                    toast.success(getDataFromWS.payload);
                } else if (getDataFromWS.type == "REMOVED_USER") {
                    toast.error(getDataFromWS.payload);
                }
                else if (getDataFromWS.type == "COMMENT_IN_SPACE") {
                    //console.log(getDataFromWS);
                    const newComment = {
                        id: getDataFromWS.payload.id,
                        spaceId: getDataFromWS.payload.spaceId,
                        user: getDataFromWS.payload.user,
                        message: getDataFromWS.payload.message,
                    }
                    setComments(prev => (prev ? [...prev, newComment] : [newComment]));
                }
                else if (getDataFromWS.type == 'POLL_CREATED') {
                    //console.log("done poll creation")
                    setCurrentPollDetails(prev => prev = getDataFromWS.payload)
                }
                else if (getDataFromWS.type == 'CLOSED_POLL') {
                    toast.success(getDataFromWS.payload)
                }

                else if (getDataFromWS.type == 'ACTIVE_POLLS') {

                    setActivePolls(prev => prev = getDataFromWS.payload)
                }

                else if (getDataFromWS.type == 'ACTIVE_USERS') {
                    //console.log(getDataFromWS)
                    setActiveUsers(prev => prev = getDataFromWS.payload)
                }
                else if (getDataFromWS.type == 'FETCH_AGAIN') {
                    //console.log(getDataFromWS)
                    setFetchAgain(true);
                }
                // else if (getDataFromWS.type == 'HOST_STREAM_UPDATE') {
                //     //console.log(getDataFromWS)
                //     setcu(prev => prev = getDataFromWS.payload)
                // }

            }

            socket.onclose = (ev) => {
                //console.log(ev.reason)
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
                commentSocket?.send(JSON.stringify({
                    type: "FETCH_AGAIN",
                    payload: {
                        spaceId: decryptedSpaceData.id,
                    }
                }))
            }

            if (state2.data != undefined) {
                setAllStream(state2.data.allStream);
                setCurrentStream(state2.data.currentStream);
                setFetchAgain(state2.data.fetchAgain);
                commentSocket?.send(JSON.stringify({
                    type: "FETCH_AGAIN",
                    payload: {
                        spaceId: decryptedSpaceData.id,
                    }
                }))
            }

        }, [state, state2]);



        async function PostCommentInSpace(formdata: FormData) {
            const userId = Number(formdata.get("userId"));
            const message = String(formdata.get("message"));
            // //console.log(spaceId + userId + message);

            try {
                const response = await axiosInstance.post("/api/v1/chats", {
                    spaceId: decryptedSpaceData.id,
                    userId: userId,
                    message: message,
                });

                if (response.data.success == true) {
                    const newComment = response.data.data;
                    //console.log("newComment", newComment);

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
                //console.log(err);
            }
        }


        return (
            <div className={`w-full bg-[#071919] text-${typography} min-h-max  md:text-[15px] text-[13px]`}>
                {currentPollDetails ? <PollDialog pollStream={currentPollDetails} /> : ""}

                {kicked ? <KickedDialog /> : banned ? <BannedDialog /> :

                    <div className="w-full min-h-screen flex flex-col gap-5 p-3">

                        <div className={`w-[98%]   lg:h-150  flex lg:flex-row flex-col gap-3 justify-evenly mt-3  rounded-[5px]`}>
                            <Card className="h-full lg:w-[70%]  w-full flex flex-col gap-0 pb-0 bg-[#071919] rounded-[5px] ">

                                {currentstream ? (
                                    <CardContent className="flex flex-col gap-3 h-full w-full ">
                                        <div className="w-full h-[85%] text-white">
                                            <VideoPlayer videoURL={currentstream.url}  />
                                        </div>

                                        <div className="w-full flex flex-row h-[15%]">
                                            <div className=" w-[70%] h-full flex flex-col gap-1 py-1">
                                                <ScrollArea className="not-md:h-10">
                                                <span className="text-white">{currentstream.title}</span>
                                                <ScrollBar/>
                                                </ScrollArea>
                                                <div className="flex flex-row gap-3 w-full">
                                                

                                                    <form action={formAction}>
                                                        <input
                                                            type="hidden"
                                                            name="currentStream"
                                                            value={currentstream.id}
                                                        />
                                                        <input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                                        <Button type="submit" className={`bg-[#3b3937] w-13 h-7 md:w-15 md:h-9`}>
                                                            {" "}
                                                            <ThumbsUpIcon />
                                                            <span>{currentstream.upvote}</span>
                                                        </Button>
                                                    </form>
                                                    
                                                    <form action={formAction2}>
                                                        <input
                                                            type="hidden"
                                                            name="currentStream"
                                                            value={currentstream.id}
                                                        />
                                                        <input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                                        <Button type="submit" className={`bg-[#3b3937] w-13 h-7 md:w-15 md:h-9`}>
                                                            {" "}
                                                            <ThumbsDownIcon />
                                                            <span>{currentstream.downvote}</span>
                                                        </Button>
                                                    </form>
                                                    {/* </div> */}
                                                </div>
                                            </div>


                                            <div className="w-[30%]  flex flex-row justify-end ">
                                                {allStreams && allStreams.length > 0 && decryptedSpaceData && decryptedSpaceData.creatorId == data.userInfo?.id ? (
                                                    <Button
                                                        className="bg-[#e80082] hover:bg-[#e80082] w-15 h-15 rounded-[50%] hover:cursor-pointer"
                                                        onClick={async() => {
                                                            let dummy = [...allStreams!];
                                                            const top = dummy.shift()!;
                                                            dummy.push(top);

                                                            if (decryptedSpaceData.creatorId == data.userInfo?.id) {
                                                            const response = await HandleSetCurrentStream(decryptedSpaceData.id , dummy[0].id);
                                                            if(response.success == true) {
                                                                setAllStream(dummy);
                                                                setCurrentStream(dummy[0]);
                                                                commentSocket?.send(JSON.stringify({
                                                                    type: "FETCH_AGAIN",
                                                                    payload: {
                                                                        spaceId: decryptedSpaceData.id
                                                                    }
                                                                }))
                                                            }
                                                        }
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

                            <Card className={`lg:h-full h-130 lg:w-[30%] w-full  flex flex-col gap-3 pt-3 bg-[${colorsStates.streamPage.background}] rounded-[5px]`}>
                                <DialogForAddStream userId={data.userInfo.id} />
                                <ScrollArea className="w-full h-[90%]">
                                    <CardContent className="flex flex-col gap-[5px] ">
                                       
                                        {allStreams
                                            ? allStreams.map((item, index) => (
                                                <Card
                                                    key={index}

                                                    className={`w-full md:h-35 h-29 bg-[#cfc8b6] hover:cursor-pointer rounded-[5px] py-3 px-1 `}
                                                    onClick={async() => {
                                                        if (decryptedSpaceData.creatorId == data.userInfo?.id) {
                                                            const response = await HandleSetCurrentStream(decryptedSpaceData.id , item.id);
                                                            if(response.success == true) {
                                                                setCurrentStream(item);
                                                                commentSocket?.send(JSON.stringify({
                                                                    type: "FETCH_AGAIN",
                                                                    payload: {
                                                                        spaceId: decryptedSpaceData.id
                                                                    }
                                                                }))
                                                            }
                                                        }

                                                        else {
                                                            toast.error("Only host can change the stream");
                                                        }
                                                    }
                                                    }
                                                >
                                                    {/* {colorsStates.streamPage.background} */}
                                                    <CardContent className="flex flex-row justify-between w-full h-full gap-5 px-1">
                                                        <div className="w-[30%] h-full">
                                                            <img
                                                                className="w-full h-full rounded-[7px]"
                                                                src={item.thumbnailURL}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="w-[70%] h-full flex flex-col  justify-between">
                                                            <ScrollArea className="md:h-[55px] h-[51px]">
                                                                <span>{item.title}</span>
                                                            </ScrollArea>
                                                            <div className="w-full flex flex-row justify-between">
                                                                {/* <Button className="hover:cursor-pointer" onClick={() => handleUpvote(item.id)}><ThumbsUpIcon /> <span>{item.upvote}</span></Button> */}
                                                                <div className="flex flex-row md:gap-3 gap-1">
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
                                                                            className={`bg-[#3b3937] hover:cursor-pointer w-13 h-7 md:w-15 md:h-9`}
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
                                                                            className={` bg-[#3b3937] hover:cursor-pointer w-13 h-7 md:w-15 md:h-9 `}
                                                                        >

                                                                            <ThumbsDownIcon /> <span>{item.downvote}</span>
                                                                        </Button>
                                                                    </form>
                                                                </div>

                                                                {decryptedSpaceData && decryptedSpaceData.creatorId == data.userInfo?.id ? <Button className={`bg-[#3b3937]  hover:cursor-pointer h-7 md:h-9 py-1`} onClick={async () => {

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


                                                                }} >
                                                                    
                                                                    <span className="hidden md:flex">Create Poll</span>
                                                                    <span className="md:hidden">Poll</span>
                                                                    </Button> : ""}
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

                        <Card className={`bg-[#071919] w-[98%] h-100 rounded-[5px] flex flex-col py-3 pb-0`}>
                            <CardHeader className="w-full h-15 flex md:flex-row flex-col justify-between items-start  md:items-center  rounded-[5px] gap-3">
                                <span className="text-white font-bold">All Comments</span>

                                <div className="">
                                    <form action={PostCommentInSpace}>
                                        <Input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                        <Input type="hidden" name="userId" value={data.userInfo.id} />
                                        <div className="flex flex-row gap-5 ">
                                            <Input
                                                className="lg:w-100  rounded-[5px] text-white md:text-[15px] text-[13px]"
                                                type="text"
                                                placeholder="Type Your Comment.."
                                                name="message"
                                            />
                                            <Button type="submit" className={`bg-[#3b3937] hover:cursor-pointer md:text-[15px] text-[13px]`}>Post Comment</Button>
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


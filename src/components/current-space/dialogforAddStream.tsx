"use client"

import { BanIcon, Delete, DeleteIcon, LinkIcon, Loader, PlusIcon, RefreshCwIcon } from "lucide-react"
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogFooter, DialogClose } from "../ui/dialog"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { startTransition, useActionState, useContext, useEffect, useRef, useState } from "react"
// import { handleCreateStream } from "@/helpers/createStream"
// import { revalidatePath } from "next/cache"
import { redirect, usePathname, useRouter } from "next/navigation"
import { handleCreateStream } from "@/helpers/createStream"
import { MainContext, SpaceType } from "@/context"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { AvatarImage } from "@radix-ui/react-avatar"
import ActiveSpaceUsers from "@/helpers/activeSpaceUsers"
import BanUser from "@/helpers/banUser"
import Kickuser from "@/helpers/kckUser"
import { toast } from "sonner"
import GetActivePolls from "@/helpers/getActivePolls"
import { PollStreamType } from "@/types/allTypes"
import ClosePoll from "@/helpers/closePoll"
import { GetDecryptedData } from "@/helpers/getDecryptedData"


export default function DialogForAddStream({ userId }: { userId: number }) {

    const [urlType, setUrlType] = useState<string>("");
    const urlRef = useRef<HTMLInputElement>(null);
    const { setFetchAgain, spaceSelected, commentSocket, activePolls, setCurrentPollDetails, typography , activeUsers} = useContext(MainContext)!
    const [linkCopy, setLinkCopy] = useState<boolean>(false)
    // const [spaceId, setSpaceId] = useState<number>(spaceSelected?.id!)
    const pathname = usePathname()
    const decryptedSpaceData =  GetDecryptedData(pathname.split("/")[2]);
    let user;


    const initialState = {
        success: true,
        message: "Hello"
    }

    const [state, formAction3, pending] = useActionState(handleCreateStream, initialState)


    useEffect(() => {

        if (state != undefined && state.success) {
            setFetchAgain(true)
            // router.refresh()
        }

    }, [state])

    
    const dummyUsers = [
        { name: "jagdish" },
        { name: "jagdish" },
        { name: "jagdish" },
        { name: "jagdish" },
        { name: "jagdish" },
        { name: "jagdish" },
        { name: "jagdish" },
    ]

    // async function ActiveUsersInSpace(spaceId : number){
    //     const response = await fetch(`http://localhost:3000/api/v1/space/activeUsers/${spaceId}`, {
    //         method : "GET", 
    //         next : {
    //             revalidate : 100
    //         },
    //         cache : "force-cache"
    //       })

    //       const data  = await response.json();
    //       console.log(data)

    //       setActiveUsers(data)
    // }

    return (
        <Dialog>
            <div className={`flex flex-row justify-end gap-3 md:text-[15px] text-[13px]`}>
                <div className="flex flex-row md:gap-3 gap-1">
                    <Popover>
                        <PopoverTrigger asChild className="hover:cursor-pointer" onClick={() => {
                            commentSocket?.send(JSON.stringify({ type: "GET_ACTIVE_POLLS", payload: { spaceId : decryptedSpaceData.id } }))
                        }}>

                            <Avatar className="md:w-9 md:h-9 h-7 w-7 mt-[1px] mr-1 ">
                                <AvatarImage src={"data:image/webp;base64,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"} />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-39 md:h-70 w h-50 md:mr-19 ml-10 flex flex-col bg-[#071919] md:text-[15px] text-[13px]">
                            <ScrollArea className="w-full h-full">
                            {/* <div className="w-full h-[5%] flex flex-row justify-end">
                                <RefreshCwIcon onClick={async () => {

                                   
                                }} />
                            </div> */}


                                {activePolls && activePolls.length > 0 ? activePolls.map((item, index) => (
                                        <Card  key={index} className="w-[full h-13 flex flex-col gap-0 p-1 bg-[#5c5956] hover:cursor-pointer text-white" onClick={() => {
                                            console.log("current poll selected : ", item)
                                            setCurrentPollDetails(item)
                                        }}>
                                            <CardContent className="pl-3 flex flex-row justify-between pr-0">
                                                <Avatar className="bg-black w-9 h-9 mt-[1px] mr-1 ">
                                                    <AvatarFallback className="text-black">{item.id}</AvatarFallback>
                                                </Avatar>

                                                {decryptedSpaceData && decryptedSpaceData.creatorId == userId ? <div className="flex flex-row gap-[5px] p-[5.5px]" >

                                                    <DeleteIcon onClick={async () => {
                                                        const response = await ClosePoll(item.id, decryptedSpaceData.id);
                                                        if (response.success == true)
                                                            toast.success(response.message)
                                                        commentSocket?.send(JSON.stringify({ type: "CLOSE_POLL", payload: { spaceId: decryptedSpaceData.id, pollId: item.id } }))
                                                    }} />

                                                </div> : ""}

                                            </CardContent>
                                        </Card>


                                ))
                                    : <span className="text-white">No Active Polls</span>}
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild className="hover:cursor-pointer" onClick={async () => {

                            // const response = await ActiveSpaceUsers(spaceId)
                            // if (response.success == true && response.data != null) {
                            //     console.log(response.data)
                            //     setActiveUsers(response.data)
                            // }

                            commentSocket?.send(JSON.stringify({type : 'GET_ACTIVE_USERS', payload : {
                                spaceId : decryptedSpaceData.id
                            }}))
                        }}>
                            <Avatar className="md:w-9 md:h-9 h-7 w-7 mt-[1px] mr-1 ">
                                <AvatarImage src={"https://static.vecteezy.com/system/resources/previews/000/550/535/original/user-icon-vector.jpg"} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className="md:w-70 md:h-70 w-50 h-50 md:mr-30 ml-10 bg-[#071919] md:text-[15px] text-[13px]">
                            <ScrollArea className="w-65 h-63 ">
                                <div className="w-full h-full flex flex-col gap-3 ">
                                    {activeUsers && activeUsers.map((item, index) => (
                                        <Card key={index} className="w-[97%] h-13 bg-[#5c5956] text-white flex flex-col gap-0 p-1">
                                            <CardContent className="w-full pl-3 flex flex-row  pr-0 gap-3">
                                                <Avatar className="bg-black w-9 h-9 mt-[1px] mr-1 ">
                                                    <AvatarFallback className="text-black">{item.email[0]}</AvatarFallback>
                                                </Avatar>

                                                <ScrollArea className="w-29 mt-[5px]">
                                                    <span className="mt-[5px] w-29">{item.email}</span>
                                                    <ScrollBar orientation="horizontal" className="hidden" />
                                                </ScrollArea>
                                                {decryptedSpaceData && decryptedSpaceData.creatorId == userId && item.userId != userId ? <div className="w-13 flex flex-row gap-[5px] p-[5.5px]" >

                                                    <BanIcon onClick={async () => {
                                                        const response = await BanUser(item.userId, decryptedSpaceData.id);
                                                        if (response.success == true && response.data)
                                                            // setActiveUsers(response.data);
                                                        commentSocket?.send(JSON.stringify({ type: "BAN_USER", payload: { spaceId: decryptedSpaceData.id, userId: item.userId } }))
                                                    }} />
                                                    <DeleteIcon onClick={async () => {
                                                        const response = await Kickuser(item.userId, decryptedSpaceData.id);
                                                        if (response.success == true && response.data)
                                                            // setActiveUsers(response.data);
                                                        commentSocket?.send(JSON.stringify({ type: "REMOVE_USER", payload: { spaceId: decryptedSpaceData.id, userId: item.userId } }))
                                                    }} />

                                                </div> : item.userId == userId ? <span className="w-13 mt-[5px] pl-3">You</span> : ""}
                                            </CardContent>
                                        </Card>
                                    ))}

                                </div>

                            </ScrollArea>
                        </PopoverContent>
                    </Popover>
                </div>

                <Button className={`md:w-10  mt-[1px] w-7  not-md:h-7 bg-[#e80082]`} onClick={async () => {
                    setLinkCopy(true);
                    await window.navigator.clipboard.writeText(spaceSelected?.link!);
                    setTimeout(() => {
                        setLinkCopy(false)
                    }, 800)
                    toast.success("Link Copied");


                }}>{!linkCopy ? <LinkIcon /> : <Loader />}</Button>

                <DialogTrigger className="w-40" asChild>
                    <Button className={`w-40 mr-7  not-md:h-7 hover:cursor-pointer bg-[#e80082] md:text-[15px] text-[13px]`}><PlusIcon />Create New Stream</Button>
                </DialogTrigger>

                <DialogContent className={`text-${typography} bg-[#071919] text-white`}>
                    <DialogHeader>
                        <DialogTitle>Play the Next Stream</DialogTitle>
                    </DialogHeader>
                    <Tabs onValueChange={setUrlType}>
                        <TabsList>
                            <TabsTrigger value="Youtube" className="hover:cursor-pointer">Youtube</TabsTrigger>
                            <TabsTrigger value="Spotify" className="hover:cursor-pointer">Spotify</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Youtube">
                            <Card>
                                <CardContent className="flex flex-col ">

                                    <Label htmlFor="url" className="pl-1">Url</Label>
                                    <form action={formAction3}>
                                        <Input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                        <Input type="hidden" name="urlType" value={urlType} />
                                        <Input type="text" ref={urlRef} name="inputString" placeholder="Paste the url" id="url" className="w-full mt-2 mb-3" />
                                        <DialogFooter>

                                            <DialogClose asChild>
                                                <Button className="hover:cursor-pointer">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" className="hover:cursor-pointer">Create</Button>
                                        </DialogFooter>
                                    </form>

                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="Spotify">
                            <Card>
                                <CardContent className="flex flex-col">
                                    <Label htmlFor="url" className="pl-1">Url</Label>
                                    <form action={formAction3}>
                                        <Input type="hidden" name="spaceId" value={decryptedSpaceData.id} />
                                        <Input type="hidden" name="urlType" value={urlType} />
                                        <Input type="text" ref={urlRef} name="inputString" placeholder="Paste the url" id="url" className="w-full mt-2 mb-3" />
                                        <DialogFooter>

                                            <DialogClose asChild>
                                                <Button className="hover:cursor-pointer">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" className="hover:cursor-pointer">Create</Button>
                                        </DialogFooter>
                                    </form>

                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    <DialogFooter>
                        {/* <DialogClose asChild>
                    <Button className="hover:cursor-pointer">Cancel</Button>
                </DialogClose> */}
                        {/* <DialogClose asChild> */}

                        {/* <Button className="hover:cursor-pointer" formAction={()=> 
                    {
                        if(urlRef != null && urlRef.current != null && urlType != "") {
                           const spaceId = parseInt(window.location.pathname.split("/")[2])
                           const inputString = urlRef.current.value;
                       handleCreateStream(spaceId ,inputString  , urlType)
                        }
                        
                    }
                
                }>Create</Button> */}
                        {/* </DialogClose> */}
                    </DialogFooter>
                </DialogContent>
            </div>

        </Dialog>
    )
}
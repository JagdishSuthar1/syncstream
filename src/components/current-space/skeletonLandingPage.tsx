import { GetDecryptedData } from "@/helpers/getDecryptedData";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


export default function SkeltonLandingPage() {
    return (
        <div className={`w-full bg-[#071919] `}>


            <div className="w-full h-vh flex flex-col gap-5 p-3">

                <div className={`w-[98%] h-150 flex flex-row gap-3 justify-evenly mt-3  rounded-[5px]`}>
                    <Card className="h-full w-[70%] flex flex-col gap-0 pb-0 bg-[#071919] rounded-[5px] ">

                        <CardContent className="flex flex-col gap-3 h-full w-full ">
                            <div className="w-full h-[85%]">
                                <Skeleton className="w-full h-full" />
                            </div>

                            <div className="w-full flex flex-row h-[15%]">
                                <div className=" w-[70%] h-full flex flex-col gap-3">
                                    <Skeleton className="w-[80%] h-7" />
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


                                        <Skeleton className="w-15 h-9" />

                                        {/* <Button className="hover:cursor-pointer" onClick={() => handleDownvote(currentstream.id)}><ThumbsDownIcon /> <span>{currentstream.downvote}</span></Button> */}
                                        {/* <form action={formAction}>
                                                                <input type="hidden" name="currentStream"  />
                                                                <Button type="submit"> <span>{currentstream.upvote}</span></Button>
                                                            </form> */}

                                        <Skeleton className="w-15 h-9"/>
                                        {/* </div> */}
                                    </div>
                                </div>


                                <div className="w-[30%]  flex flex-row justify-end">
                                    <Skeleton className="bg-[#e80082] w-15 h-15 rounded-[50%] hover:cursor-pointer" />
                                </div>
                            </div>
                        </CardContent>

                    </Card>

                    <Card className={`h-full w-[30%]  flex flex-col gap-3 pt-3 bg-[#071919] rounded-[5px]`}>
                        <div className={`flex flex-row justify-end gap-3 `}>

                            <Skeleton className=" rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
                            <Skeleton className="rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
                            <Skeleton className="w-10 h-9 mt-[1px] bg-[#e80082]" />
                            <Skeleton className={`w-40 mr-7 hover:cursor-pointer bg-[#e80082]`} />
                        </div>

                        <CardContent className="flex flex-col gap-[5px]">
                            {new Array(3).fill(0).map((item, index) => (
                                <Card
                                    key={index}

                                    className={`w-full h-33 bg-[#cfc8b6] hover:cursor-pointer rounded-[5px]`}
                                >
                                    {/* {colorsStates.streamPage.background} */}
                                    <CardContent className="flex flex-row w-full h-full gap-3">
                                        <div className="w-[30%] h-[89px]">
                                            <Skeleton
                                                className="w-full h-full rounded-[7px]"
                                            />
                                        </div>
                                        <div className="w-[70%] flex flex-col gap-1">
                                            <Skeleton className="w-full h-full" />
                                            <div className="w-full flex flex-row justify-between">
                                                {/* <Button className="hover:cursor-pointer" onClick={() => handleUpvote(item.id)}><ThumbsUpIcon /> <span>{item.upvote}</span></Button> */}
                                                <div className="flex flex-row gap-3">

                                                    <Skeleton className="w-full h-full" />

                                                    {/* <Button className="hover:cursor-pointer" onClick={() => handleDownvote(item.id)}><ThumbsDownIcon /> <span>{item.downvote}</span></Button> */}

                                                    <Skeleton className="w-full h-full" />


                                                </div>


                                                <Skeleton className={`bg-[#3b3937]  hover:cursor-pointer`} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <Card className={`bg-[#071919] w-[98%] h-100 rounded-[5px] flex flex-col pt-1 pb-0`}>
                    <CardHeader className="w-full h-15 flex flex-row justify-end items-center rounded-[5px]">
                        <div className="flex flex-row gap-3">
                            <Skeleton className="w-100 h-10 text-white" />
                            <Skeleton className="w-30" />
                        </div>
                    </CardHeader>
                    <CardContent className="w-full h-70 bg-[#1d2525] flex flex-col gap-3  pt-1 pl-1 pr-0 ">
                        {new Array(4).fill(0).map((item, index) => (
                            <div key={index} className={`w-full h-13  flex flex-row gap-10 p-3 rounded-none`}>

                                <Skeleton className="w-13  mt-1 rounded-[50%] h-13" />

                                <Skeleton className="w-100 mt-3 h-full" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>

    );

}


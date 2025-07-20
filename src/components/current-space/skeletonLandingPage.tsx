import { GetDecryptedData } from "@/helpers/getDecryptedData";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";


export default function SkeltonLandingPage() {
    return (
        <div className={`w-full bg-[#071919] `}>


            <div className="w-full h-vh flex flex-col gap-5 p-3">


                        <div className={`w-[98%]   lg:h-150  flex lg:flex-row flex-col gap-3 justify-evenly mt-3  rounded-[5px]`}>
                            <Card className="h-full lg:w-[70%]  w-full flex flex-col gap-0 pb-0 bg-[#071919] rounded-[5px] ">

                                <CardContent className="flex flex-col gap-3 h-full w-full ">
                                    <div className="w-full h-[85%]">
                                <Skeleton className="w-full h-full" />
                            </div>

                                        <div className="w-full flex flex-row h-[15%]">
                                            <div className=" w-[70%] h-full flex flex-col gap-1 py-1">
                                    <Skeleton className="w-[80%] h-7" />
                                    <div className="flex flex-row gap-3 w-full">



                                        <Skeleton className="w-15 h-9" />


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

                            <Card className={`lg:h-full h-130 lg:w-[30%] w-full  flex flex-col gap-3 pt-3 rounded-[5px] bg-[#071919]`}>
                        <div className={`flex flex-row justify-end gap-3 `}>
 
                            <Skeleton className=" rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
                            <Skeleton className="rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
                            <Skeleton className="w-10 h-9 mt-[1px] bg-[#e80082]" />
                            <Skeleton className={`w-40 mr-7 hover:cursor-pointer bg-[#e80082]`} />
                        </div>

                        <CardContent className="flex flex-col gap-[5px] bg-[#071919]"> 
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
        <div className="w-full min-h-max flex flex-col gap-5 p-3">

                        <div className={`w-[98%]   lg:h-150  flex lg:flex-row flex-col gap-3 justify-evenly mt-3  rounded-[5px]`}>
                            <Card className="h-full lg:w-[70%]  w-full flex flex-col gap-0 pb-0 bg-[#071919] rounded-[5px] ">

                                    <CardContent className="flex flex-col gap-3 w-full h-full not-lg:h-70">
                                        <div className="w-full h-[85%]">
                                                <Skeleton className="w-full h-full" />
                                        </div>

                                        <div className="w-full flex flex-row h-[15%]">
                                            <div className=" w-[70%] h-full flex flex-col gap-1 py-1">
                                    <Skeleton className="w-[80%] h-7" />
                                                <div className="flex flex-row gap-3 w-full">

                                                        <Skeleton  className={`bg-[#3b3937] w-13 h-7 md:w-15 md:h-9`}/>


                                        
                                
                                                        <Skeleton  className={`bg-[#3b3937] w-13 h-7 md:w-15 md:h-9`} />
                                                    {/* </div> */}
                                                </div>
                                            </div>


                                        
                                        </div>
                                    </CardContent>
                                
                            </Card>

                            <Card className={`lg:h-full h-130 lg:w-[30%] w-full  flex flex-col gap-3 pt-3  rounded-[5px]`}>
                <div className={`flex flex-row justify-end gap-3 `}>
 
                            <Skeleton className=" rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
                            <Skeleton className="rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
                            <Skeleton className="w-10 h-9 mt-[1px] bg-[#e80082]" />
                            <Skeleton className={`w-40 mr-7 hover:cursor-pointer bg-[#e80082]`} />
                        </div>                                    <CardContent className="flex flex-col gap-[5px] ">
                                       
                                        {
                                         new Array(3).fill(0).map((item, index) => (
                                                <Card
                                                    key={index}

                                                    className={`w-full md:h-35 h-29 bg-[#cfc8b6] hover:cursor-pointer rounded-[5px] py-3 px-1 `}
                            
                                                >
                                                    {/* {colorsStates.streamPage.background} */}
                                                    <CardContent className="flex flex-row justify-between w-full h-full gap-5 px-1">
                                                        <div className="w-[30%] h-full">
                                                            <Skeleton
                                                                className="w-full h-full rounded-[7px]"
                                                            />
                                                        </div>
                                                        <div className="w-[70%] h-full flex flex-col  justify-between">
                                                                <Skeleton />
                                                            <div className="w-full flex flex-row justify-between">
                                                                {/* <Button className="hover:cursor-pointer" onClick={() => handleUpvote(item.id)}><ThumbsUpIcon /> <span>{item.upvote}</span></Button> */}
                                                                <div className="flex flex-row md:gap-3 gap-1">
                                                                    
                                                                        <Skeleton
                                                                            className={`bg-[#3b3937] hover:cursor-pointer w-13 h-7 md:w-15 md:h-9`}
                                                                        />

                                                                       

                                                                    {/* <Button className="hover:cursor-pointer" onClick={() => handleDownvote(item.id)}><ThumbsDownIcon /> <span>{item.downvote}</span></Button> */}

                                                                      
                                                                        <Skeleton
                                                                            className={` bg-[#3b3937] hover:cursor-pointer w-13 h-7 md:w-15 md:h-9 `}
                                                                       />

                                                                       
                                                                </div>

                                                            
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                            }
                                    </CardContent>
                            </Card>
                        </div>

                        <Card className={`bg-[#071919] w-[98%] h-100 rounded-[5px] flex flex-col py-3 pb-0`}>
                            <CardHeader className="w-full h-15 flex md:flex-row flex-col justify-between items-start  md:items-center  rounded-[5px] gap-3">
                                <span className="text-white font-bold">All Comments</span>

                                <div className="w-100">
                                        <div className="flex flex-row gap-5 ">
                                            <Skeleton className="lg:w-100 w-40 rounded-[5px] bg-white h-7 md:h-9" />
                                            <Skeleton  className={`bg-[#3b3937] hover:cursor-pointer  w-30 h-7 md:h-9`}/>
                                        </div>
                                </div>
                            </CardHeader>
                                <CardContent className="w-full h-70 bg-[#1d2525] flex flex-col gap-1  pt-1 pl-1 pr-0 ">
                                    {
                                         new Array(4).fill(0).map((item, index) => (
                                           <div key={index} className={`w-full h-13  flex flex-row md:gap-10 gap-5 p-3 rounded-none`}>

                                <Skeleton className="md:w-13 w-9 h-9  mt-1 rounded-[50%] md:h-13" />

                                <Skeleton className="md:w-100 w-50 mt-3 h-full" />
                                </div>
                                        ))
                                        }
                                </CardContent>
                        </Card>
                    </div>
        </div>


    );

}




// function comp() {
//     return (

//                     <div className="w-full min-h-max flex flex-col gap-5 p-3">

//                         <div className={`w-[98%]   lg:h-150  flex lg:flex-row flex-col gap-3 justify-evenly mt-3  rounded-[5px]`}>
//                             <Card className="h-full lg:w-[70%]  w-full flex flex-col gap-0 pb-0 bg-[#071919] rounded-[5px] ">

//                                     <CardContent className="flex flex-col gap-3 h-full w-full ">
//                                         <div className="w-full h-[85%]">
//                                 <Skeleton className="w-full h-full" />
//                                         </div>

//                                         <div className="w-full flex flex-row h-[15%]">
//                                             <div className=" w-[70%] h-full flex flex-col gap-1 py-1">
//                                     <Skeleton className="w-[80%] h-7" />
//                                                 <div className="flex flex-row gap-3 w-full">

//                                                         <Skeleton  className={`bg-[#3b3937] w-13 h-7 md:w-15 md:h-9`}/>


                                        
                                
//                                                         <Skeleton  className={`bg-[#3b3937] w-13 h-7 md:w-15 md:h-9`} />
//                                                     {/* </div> */}
//                                                 </div>
//                                             </div>


                                        
//                                         </div>
//                                     </CardContent>
                                
//                             </Card>

//                             <Card className={`lg:h-full h-130 lg:w-[30%] w-full  flex flex-col gap-3 pt-3  rounded-[5px]`}>
//                 <div className={`flex flex-row justify-end gap-3 `}>
 
//                             <Skeleton className=" rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
//                             <Skeleton className="rounded-[50%] w-9 h-9 mt-[1px] mr-1" />
//                             <Skeleton className="w-10 h-9 mt-[1px] bg-[#e80082]" />
//                             <Skeleton className={`w-40 mr-7 hover:cursor-pointer bg-[#e80082]`} />
//                         </div>                                    <CardContent className="flex flex-col gap-[5px] ">
                                       
//                                         {
//                                          new Array(4).fill(0).map((item, index) => (
//                                                 <Card
//                                                     key={index}

//                                                     className={`w-full md:h-35 h-29 bg-[#cfc8b6] hover:cursor-pointer rounded-[5px] py-3 px-1 `}
                            
//                                                 >
//                                                     {/* {colorsStates.streamPage.background} */}
//                                                     <CardContent className="flex flex-row justify-between w-full h-full gap-5 px-1">
//                                                         <div className="w-[30%] h-full">
//                                                             <Skeleton
//                                                                 className="w-full h-full rounded-[7px]"
//                                                             />
//                                                         </div>
//                                                         <div className="w-[70%] h-full flex flex-col  justify-between">
//                                                                 <Skeleton />
//                                                             <div className="w-full flex flex-row justify-between">
//                                                                 {/* <Button className="hover:cursor-pointer" onClick={() => handleUpvote(item.id)}><ThumbsUpIcon /> <span>{item.upvote}</span></Button> */}
//                                                                 <div className="flex flex-row md:gap-3 gap-1">
                                                                    
//                                                                         <Skeleton
//                                                                             className={`bg-[#3b3937] hover:cursor-pointer w-13 h-7 md:w-15 md:h-9`}
//                                                                         />

                                                                       

//                                                                     {/* <Button className="hover:cursor-pointer" onClick={() => handleDownvote(item.id)}><ThumbsDownIcon /> <span>{item.downvote}</span></Button> */}

                                                                      
//                                                                         <Skeleton
//                                                                             className={` bg-[#3b3937] hover:cursor-pointer w-13 h-7 md:w-15 md:h-9 `}
//                                                                        />

                                                                       
//                                                                 </div>

                                                            
//                                                             </div>
//                                                         </div>
//                                                     </CardContent>
//                                                 </Card>
//                                             ))
//                                             }
//                                     </CardContent>
//                             </Card>
//                         </div>

//                         <Card className={`bg-[#071919] w-[98%] h-100 rounded-[5px] flex flex-col py-3 pb-0`}>
//                             <CardHeader className="w-full h-15 flex md:flex-row flex-col justify-between items-start  md:items-center  rounded-[5px] gap-3">
//                                 <span className="text-white font-bold">All Comments</span>

//                                 <div className="">
//                                         <div className="flex flex-row gap-5 ">
//                                             <Skeleton
//                                                 className="lg:w-100  rounded-[5px] text-white md:text-[15px] text-[13px]"
//                                             />
//                                             <Skeleton  className={`bg-[#3b3937] hover:cursor-pointer md:text-[15px] text-[13px]`}/>
//                                         </div>
//                                 </div>
//                             </CardHeader>
//                                 <CardContent className="w-full h-70 bg-[#1d2525] flex flex-col gap-1  pt-1 pl-1 pr-0 ">
//                                     {
//                                          new Array(4).fill(0).map((item, index) => (
//                                            <div key={index} className={`w-full h-13  flex flex-row gap-10 p-3 rounded-none`}>

//                                 <Skeleton className="w-13  mt-1 rounded-[50%] h-13" />

//                                 <Skeleton className="w-100 mt-3 h-full" />
//                                 </div>
//                                         ))
//                                         }
//                                 </CardContent>
//                         </Card>
//                     </div>
//     )
// }
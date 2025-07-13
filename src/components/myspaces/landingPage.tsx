"use client";
import { axiosInstance } from "@/axiosInstance";
import DialogForAddSpace from "@/components/myspaces/createSpace";
import DialogForJoinSpace from "@/components/myspaces/joinSpace";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { MainContext, SpaceType } from "@/context";
import { handleDeleteStream } from "@/helpers/deleteSpace";
import HandleSpaceJoin from "@/helpers/spaceJoin";
// import { getdata } from "@/helpers/getdata";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import CryptoJS from "crypto-js"
import { AllSpaceType } from "@/types/allTypes";

const secret_key = "Jagdish_Suthar"


export default function DashboardLandingPage({ data }: { data: Promise<AllSpaceType> }) {
  const content = use(data)
  const router = useRouter();
  if (content.data != null && content.success == true) {

    const {
      setFetchSpacesAgain,
      setSpaceSelected, colorsStates,
      typography
    } = useContext(MainContext)!;


    return (

      <div className={`w-full h-full bg-[${colorsStates.dashaboardPage.background}] text-${typography.dashaboardPage}`}>
        <Toaster />
        <Card className={`w-full h-full bg-[${colorsStates.dashaboardPage.background}] text-black flex flex-col gap-2 rounded-none border-none`}>
          <CardHeader className="text-2xl font-bold text-white pl-10 flex flex-row gap-10 justify-end">

            <div className="flex flex-row">
              <div>
                <DialogForJoinSpace />
              </div>
              <div>
                <DialogForAddSpace />
              </div>
            </div>
          </CardHeader>


          <CardContent className="flex flex-col gap-3">

            <Card className={`h-121  bg-[#071919] flex flex-col gap-0 rounded-[7px] pt-3`}>
              <CardHeader className="text-[20px] h-10 font-semibold text-white rounded-[7px] ml-3 mr-3" >My Spaces</CardHeader>
              <ScrollArea className="w-full h-[90%]">

                {/* <ScrollBar orientation="horizontal"/> */}
                <CardContent className="flex flex-row flex-wrap gap-3 p-3">

                  {content.data && content.data.mySpaces && content.data.mySpaces.length > 0 ? (
                    content.data.mySpaces.map((item, index) => (
                      <Card
                        key={index}
                        className="w-100 h-95  flex flex-col gap-0 ml-3 rounded-[7px]"
                      >
                        <CardHeader className="w-full h-[10%] flex flex-row justify-between pr-3 ">
                          {item.name}

                          <Button
                            className={`hover:cursor-pointer bg-[#e80082] hover:bg-[#e80082]`}
                            onClick={async () => {
                              const response = await handleDeleteStream(
                                item.id as number
                              );
                              if (response.success == true) {
                                setFetchSpacesAgain(true);
                                toast.success(response.message);
                              } else {
                                toast.error(response.message);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </CardHeader>
                        <CardContent className="w-full h-[90%] flex flex-col gap-1 p-3">
                          {item.thumbnailURL == "" && item.title == "" ? (
                            <div className="w-full h-[90%] flex flex-col gap-3">
                              <Skeleton className="w-full h-[90%] "/>
                              <Skeleton className="w-full h-[10%]"/>
                            </div>
                          ) : (

                            <div className="w-full h-[90%] flex flex-col gap-3">
                              <img
                                src={item.thumbnailURL}
                                width={"918"}
                                // height={"200"}
                                alt=""
                                // className="object-contain"
                                className="w-full h-[85%] object-cover"
                              />
                              <span className="w-full h-[20%]"> {item.title}</span>
                            </div>
                          )}
                          <div className="w-full h-[10%] flex flex-row justify-end">
                            {/* <Button
                    className="hover:cursor-pointer"
                    onClick={() => handleSpaceJoin(item.id)}
                  >
                    Join Now

                  </Button> */}

                            {/* <Link href={`${pathname + `/${item.id}`}`} prefetch={false} className="bg-black text-white rounded-[5px] p-1 mt-1 pl-2 pr-2"> Join Now</Link> */}
                            <Button className={`mt-3 hover:cursor-pointer bg-[${colorsStates.dashaboardPage.link_delete_button}] `} onClick={async () => {
                              const response = await HandleSpaceJoin(item.id)
                              if (response.success == true) {
                                setSpaceSelected(item)
                                const hashedSpaceUserId = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify({
                                  id: item.id,
                                  creatorId: item.creatorId
                                }), secret_key).toString());

                                router.push(`/dashboard/${hashedSpaceUserId}`)
                              }
                            }}>Join Now</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="pl-5">No Spaces Found</div>
                  )}
                </CardContent>
              </ScrollArea>
            </Card>

            <Card className={`h-121 bg-[#071919] flex flex-col gap-0 pt-3 rounded-[7px] text-white`}>
              <CardHeader className="text-[20px] h-10 font-semibold text-white  rounded-[7px] ml-3 mr-3 " >Joined Spaces</CardHeader>
              <CardContent className="flex flex-row flex-wrap gap-3 p-3">


                {content && content.data.joinedSpaces && content.data.joinedSpaces.length > 0 ? (
                  content.data.joinedSpaces.map((item, index) => (
                    <Card
                      key={index}
                      className="w-100 h-95  flex flex-col gap-0 m-0 ml-3 rounded-[7px]"
                    >
                      <CardHeader className="flex flex-row justify-between pr-3 ">
                        {item.name}
                        {/*                 
                <Button
                  className="hover:cursor-pointer bg-red-500"
                  onClick={async () => {
                    const response = await handleDeleteStream(
                      item.id as number
                    );
                    if (response.success == true) {
                      setFetchSpacesAgain(true);
                      toast.success(response.message);
                    } else {
                      toast.error(response.message);
                    }
                  }}
                >
                  Delete
                </Button> */}
                      </CardHeader>
                      <CardContent className="flex flex-col gap-1 p-3">
                        {item.thumbnailURL == "" && item.title == "" ? (
                          <div className="w-full h-full flex flex-col gap-3">
                            <Skeleton className="w-full h-40" />
                            <Skeleton className="w-full h-20" />
                          </div>
                        ) : (

                          <div>
                            <img
                              src={item.thumbnailURL}
                              width={"918"}
                              height={"516"}
                              alt=""
                            />
                            <span>{item.title}</span>
                          </div>
                        )}
                        <div className="flex flex-row justify-end">
                          {/* <Button
                    className="hover:cursor-pointer"
                    onClick={() => handleSpaceJoin(item.id)}
                  >
                    Join Now

                  </Button> */}

                          {/* <Link href={`${pathname + `/${item.id}`}`} prefetch={false} className="bg-black text-white rounded-[5px] p-1 mt-1 pl-2 pr-2"> Join Now</Link> */}
                          <Button className={`hover:cursor-pointer bg-[${colorsStates.dashaboardPage.link_delete_button}]`} onClick={async () => {
                            const response = await HandleSpaceJoin(item.id)
                            if (response.success == true) {
                              setSpaceSelected(item)
                              const hashedSpaceUserId = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify({
                                id: item.id,
                                creatorId: item.creatorId
                              }), secret_key).toString());

                              router.push(`/dashboard/${hashedSpaceUserId}`)
                            }
                          }}>Join Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="pl-5">No Spaces Found</div>
                )}
              </CardContent>
            </Card>

          </CardContent>
        </Card>



      </div>

    )
  }
  else {

    router.push("/");

  }
}
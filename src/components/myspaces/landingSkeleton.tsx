import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";


export default function DashboardLandingSkelton()  {

  return (

    <div className={`w-full min-h-max bg-[#071919]`}>

  <Card className={`w-full h-full  text-black flex flex-col gap-2 rounded-none border-none bg-[#071919]`}>
    <CardHeader className="text-2xl font-bold text-white flex flex-row justify-end md:gap-5 gap-3 px-7 ">
      <Skeleton className="md:h-[40px] h-[30px] rounded-md w-50 bg-[#e80082]" />
      <Skeleton className=" md:h-[40px] h-[30px]  rounded-md  w-50 bg-[#e80082]" />
    </CardHeader>

    <CardContent className="flex flex-col gap-3">
      
      {/* My Spaces Skeleton */}
      <Card className="h-121 bg-[#071919] flex flex-col gap-0 rounded-[7px] pt-3">
        <CardHeader className="text-[20px] h-10 font-semibold text-white rounded-[7px] ml-3 mr-3">
          <span className="w-40 h-6" >My Spaces</span>
        </CardHeader>
        <ScrollArea className="w-full h-[90%] overflow-hidden">
          <CardContent className="flex md:flex-row flex-wrap gap-3  flex-col not-md:justify-center not-md:items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="md:w-100 md:h-95 sm:w-79 sm:h-85 w-73 h-77 flex flex-col gap-0 ml-3 rounded-[7px]">
                <CardHeader className="w-full h-[10%] flex flex-row justify-between pr-3">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-20 h-8 bg-[#e80082]" />
                </CardHeader>
                <CardContent className="w-full h-[90%] flex flex-col gap-1 p-3">
                  <Skeleton className="w-full h-[85%]" />
                  <Skeleton className="w-full h-[10%]" />
                  <div className="w-full h-[10%] flex flex-row justify-end">
                    <Skeleton className="w-24 h-8 bg-[#e80082]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Joined Spaces Skeleton */}
           <Card className="h-121 bg-[#071919] flex flex-col gap-0 rounded-[7px] pt-3">
        <CardHeader className="text-[20px] h-10 font-semibold text-white rounded-[7px] ml-3 mr-3">
          <span className="w-40 h-6" >  Joined Spaces</span>
        </CardHeader>
        <ScrollArea className="w-full h-[90%] overflow-hidden">
          <CardContent className="flex md:flex-row flex-wrap gap-3  flex-col not-md:justify-center not-md:items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="md:w-100 md:h-95 sm:w-79 sm:h-85 w-73 h-77 flex flex-col gap-0 ml-3 rounded-[7px]">
                <CardHeader className="w-full h-[10%] flex flex-row justify-between pr-3">
                  <Skeleton className="w-32 h-5" />
                </CardHeader>
                <CardContent className="w-full h-[90%] flex flex-col gap-1 p-3">
                  <Skeleton className="w-full h-[85%]" />
                  <Skeleton className="w-full h-[10%]" />
                  <div className="w-full h-[10%] flex flex-row justify-end">
                    <Skeleton className="w-24 h-8 bg-[#e80082]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </CardContent>
  </Card>
</div>





  )

}

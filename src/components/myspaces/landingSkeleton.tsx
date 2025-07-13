import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


export default function DashboardLandingSkelton()  {

  return (

    <div className={`w-full h-full bg-[#071919]`}>

      <Card className={`w-full h-full bg-[#071919] text-black flex flex-col gap-2 rounded-none border-none`}>
        <CardHeader className="text-2xl font-bold text-white pl-10 flex flex-row gap-10 justify-end">

          <div className="flex flex-row gap-1">
            <div>
              <Skeleton className="w-40 mr-7 h-10 hover:cursor-pointer bg-[#e80082] hover:bg-[#e80082] "/>
            </div>
            <div>
              <Skeleton className="w-40 mr-7 h-10 hover:cursor-pointer bg-[#e80082] hover:bg-[#e80082] " />
            </div>
          </div>
        </CardHeader>


        <CardContent className="flex flex-col gap-3">

        <Card className={`h-121  bg-[#071919] flex flex-col gap-0 rounded-[7px] pt-3`}>
            <CardHeader className="text-[20px] h-10 font-semibold text-white rounded-[7px] ml-3 mr-3" >My Spaces</CardHeader>

              {/* <ScrollBar orientation="horizontal"/> */}
              <CardContent className="flex flex-row flex-wrap gap-3 p-3">

                {
                new Array(3).fill(0).map((item, index) => (
                    <Card
                      key={index}
                      className="w-100 h-95 flex flex-col gap-0 ml-3 rounded-[7px] bg-[#b4a6a6]"
                    >
                      <CardHeader className="flex flex-row justify-between pr-3 ">
                        <Skeleton className="w-35 h-9"/>

                        <Skeleton
                          className={`w-15 h-9 hover:cursor-pointer bg-[#e80082] `} />
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3 p-3">
                          <div className="w-full h-full flex flex-col gap-3">
                            <Skeleton className="w-full h-40" />
                            <Skeleton className="w-full h-15" />
                          </div>
                         
                        <div className="flex flex-row justify-end">
                          {/* <Button
                  className="hover:cursor-pointer"
                  onClick={() => handleSpaceJoin(item.id)}
                >
                  Join Now

                </Button> */}

                          {/* <Link href={`${pathname + `/${item.id}`}`} prefetch={false} className="bg-black text-white rounded-[5px] p-1 mt-1 pl-2 pr-2"> Join Now</Link> */}
                          <Skeleton className={`hover:cursor-pointer w-15 h-9`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))
}
              </CardContent>
          </Card>




          <Card className={`h-121  bg-[#071919] flex flex-col gap-0 rounded-[7px] pt-3`}>
            <CardHeader className="text-[20px] h-10 font-semibold text-white rounded-[7px] ml-3 mr-3" >Joined Spaces</CardHeader>

              {/* <ScrollBar orientation="horizontal"/> */}
              <CardContent className="flex flex-row flex-wrap gap-3 p-3">

                {
                new Array(3).fill(0).map((item, index) => (
                    <Card
                      key={index}
                      className="w-100 h-95 flex flex-col gap-0 ml-3 rounded-[7px] bg-[#b4a6a6]"
                    >
                      <CardHeader className="flex flex-row justify-between pr-3 ">
                        <Skeleton className="w-35 h-9"/>

                        <Skeleton
                          className={`w-15 h-9 hover:cursor-pointer bg-[#e80082] `} />
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3 p-3">
                          <div className="w-full h-full flex flex-col gap-3">
                            <Skeleton className="w-full h-40" />
                            <Skeleton className="w-full h-15" />
                          </div>
                         
                        <div className="flex flex-row justify-end">
                          {/* <Button
                  className="hover:cursor-pointer"
                  onClick={() => handleSpaceJoin(item.id)}
                >
                  Join Now

                </Button> */}

                          {/* <Link href={`${pathname + `/${item.id}`}`} prefetch={false} className="bg-black text-white rounded-[5px] p-1 mt-1 pl-2 pr-2"> Join Now</Link> */}
                          <Skeleton className={`hover:cursor-pointer w-15 h-9`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))
}
              </CardContent>
          </Card>


        </CardContent>
      </Card>



    </div>

  )

}

import BannedDialog from "@/components/current-space/bannedDialog";
import LandingPageForCurrentSPace from "@/components/current-space/landingPage";
import SkeltonLandingPage from "@/components/current-space/skeletonLandingPage";
import { Toaster } from "@/components/ui/sonner";
import { UserType } from "@/context";
import CheckAuthenticated from "@/helpers/checkAuthenticated";
import getAllSpaceID from "@/helpers/getAllSpaceIDs";
import getAllStream from "@/helpers/getAllStream";
import { GetDecryptedData } from "@/helpers/getDecryptedData";
import { Suspense } from "react";
import SpacePage from "./serversideSpace";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const response = await getAllSpaceID();
    let paths: { spaceId: string }[] = [];

    if (response.success == true && response.data != null) {
        for (let i = 0; i < response.data.length; i++) {
            paths.push({ spaceId: response.data[i].id.toString() });
        }
    }

    return paths;
}



type ParamsProp = {
    params : {
        spaceId: string 
    }
}


export default async function Page({ params }:  ParamsProp) {

            return (
                <div className="w-full h-screen">
                    <Suspense fallback={<SkeltonLandingPage />} >
                        {<SpacePage params={params} />}
                    </Suspense>
                </div>
            )

}

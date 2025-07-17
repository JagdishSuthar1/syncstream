import LandingPageForCurrentSPace from "@/components/current-space/landingPage";
import getAllStream from "@/helpers/getAllStream";
import { GetDecryptedData } from "@/helpers/getDecryptedData";
import { Metadata } from "next";
import { Toaster } from "sonner";
import {cache} from "react"



const getSpaceData = cache(async (spaceId : string)=>{

    const decryptedData = await GetDecryptedData(spaceId);

    const streamData = await getAllStream(decryptedData.id);
    return streamData;

})



export async function generateMetadata({
    params,
}: {
    params: { spaceId: string };
}) :Promise<Metadata> {

    const streamData = await getSpaceData(params.spaceId)


return {
    title : streamData.data?.currentSpace.name,
}

}



export default async function SpacePage({
    params,
}: {
    params: { spaceId: string };
}) {

    const streamData = await getSpaceData(params.spaceId)

    return (
        <div className="w-full min-h-max">
            {<LandingPageForCurrentSPace data={streamData} />}
            <Toaster />
        </div>
    );
}

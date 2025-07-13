import JoinSpaceUsingLink from "@/components/share/joinSpaceUsingLink";
import { GetDecryptedData } from "@/helpers/getDecryptedData";
import { Suspense } from "react";


export default async function SharePage({params} : {params :{
    link : string
}}) {

    // const router = useRouter();
   const decryptedData = GetDecryptedData((await params).link)
    

    return (
        <Suspense fallback={<div>Loading..</div>}>
            <JoinSpaceUsingLink id={decryptedData.id}/>
        </Suspense>
    )
}
import { title } from "process";
import { Card, CardContent, CardHeader } from "../ui/card";
import { AlignVerticalSpaceAroundIcon, FolderSyncIcon, GroupIcon, SpaceIcon, VoteIcon } from "lucide-react";


export default function KeyFeature() {
    const feature = [
        {
            title : "Create Spaces",
            icon : AlignVerticalSpaceAroundIcon,
            description : "Start your own music room where friends can join, share streams, and vibe together in real time."
        },
        {
            title : "Vote to Play",
            icon : VoteIcon,
            description : "Everyone gets a say — vote for your favorite stream, and the highest-voted track plays next."
        }
        ,
        {
            title : "Real-Time Sync",
            icon : FolderSyncIcon,
            description : "Enjoy a perfectly synced listening experience across all devices, no matter where you are."
        },
        {
            title : "Community Driven",
            icon : GroupIcon,
            description : "Build a shared playlist with your crew — every stream, vote, and play reflects the group's vibe."
        }
    ]
    return (
        <Card className="w-full h-[50%]  text-white bg-[#071919] rounded-none border-none">
            <CardHeader className="text-2xl text-center font-bold">Key Features</CardHeader>
            <CardContent className="w-full h-full flex flex-row gap-10 justify-center">
                    {feature.map((item, index)=>(
                        <Card key={index} className="h-60 w-90 bg-amber-50">
                            <CardContent className="flex flex-col gap-2 justify-center">
                                <div className="flex flex-row justify-center mt-2">
                                <item.icon className="w-15 h-15 "/>
                                </div>
                                <span className="text-center">{item.title}</span>
                                <span className="text-center">{item.description}</span>
                            </CardContent>
                        </Card>
                    ))}
            </CardContent>
        </Card>
    )
}
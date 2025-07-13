import { SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";


export default function MainView() {

    return (
        <Card className="w-full h-[50%] rounded-none border-none text-white bg-[#071919]">
            <CardContent className="flex flex-row justify-center items-center w-full h-full">
                <div className="flex flex-col gap-3 w-200">
                    <span className="text-center text-3xl font-bold font-sans">Let Your Fans Choose The Beat</span>
                    <span className="text-center text-wrap">Create your own music space. Add streams, vote, and let the crowd decide what plays next.
                        Collaborative listening, real-time voting — your soundtrack, powered by the people.</span>
                        <div className="flex flex-row gap-3 pl-0 justify-center">
                            <Button className="hover:cursor-pointer  bg-amber-50 text-black hover:bg-amber-50">Get Started <SquareArrowOutUpRight/></Button>
                            <Button className="hover:cursor-pointer bg-amber-50 text-black hover:bg-amber-50">Learn More</Button>
                        </div>
                </div>
            </CardContent>
        </Card>
    )
}
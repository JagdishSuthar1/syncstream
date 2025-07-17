"use client"
import { Button } from "../ui/button";
import {easeInOut, motion} from "framer-motion"
import { SquareArrowOutUpRight } from "lucide-react";
import { signIn, useSession} from "next-auth/react";

export default function Hero() {
    const session = useSession();
    return (
        <section className="py-9 w-full h-230 bg-[radial-gradient(ellipse_at_bottom_left,_#ec4899,_#111111,_#000000)] text-white p-6">
            <div className="w-full md:h-full md:flex  ">
            <div className="h-90 py-5 md:w-[60%] md:h-full md:flex md:flex-col md:justify-center lg:w-[60%] lg:px-15">
                <h1 className="text-5xl font-bold bg-gradient-to-b  from-blue-900 to-red-300 bg-clip-text  text-transparent tracking-tight lg:text-7xl">Let Your Fans Choose The Beat</h1>
                <p className="text-[15px] text-white mt-5 lg:text-[21px] lg:mt-9 ">Create your own music space. Add streams, vote, and let the crowd decide what plays next.
                        Collaborative listening, real-time voting — your soundtrack, powered by the people.</p>
                <div className="flex flex-row gap-3 mt-3 tracking-tight">
                     {session.status == "authenticated" ? <Button className="mb-2 hover:cursor-pointer">Get Started <SquareArrowOutUpRight/></Button> : <Button className="hover:cursor-pointer" onClick={()=>signIn()}>Get Started <SquareArrowOutUpRight/></Button> }
                    <Button>Learn More</Button>
                    
                </div>
            </div>


            <div className="w-full h-130 p-3 md:w-[39%] md:h-full md:relative md:overflow-hidden">
                <motion.img src="/app-icon.png" className="w-full h-[97%] object-cover  md:object-fit md:absolute md:w-full md:h-[97%] md:left-0 md:-top-19 md:z-29" animate={{translateY : [-25,25 ]}} transition={{
                    duration : 5,
                    ease : easeInOut
                }} />
            </div>

            </div>

        </section>
    )
}
"use client"
import {  CardContent, CardHeader } from "../ui/card";
import { motion} from "framer-motion"
import { AlignVerticalSpaceAroundIcon, FolderSyncIcon, GroupIcon, SpaceIcon, VoteIcon } from "lucide-react";


export default function KeyFeature() {
    const features = [
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
    <section className="p-9 bg-[radial-gradient(ellipse_at_bottom,_#ec4899,_#111111,_#000000)] w-full relative overflow-x-clip ">
        <div className="mt-17 md:mt-5 flex justify-center items-center bg-gradient-to-b from-cyan-500 to-emerald-300 text-transparent bg-clip-text">
          <h1 className="text-5xl font-bold ">Key Features</h1>
        </div>{" "}
        <div className="mt-5 px-3 flex flex-col gap-5 md:flex-row justify-center items-center  md:gap-5 md:flex-wrap  py-5">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col p-3 shadow-[0_2px_12px_#546644] border-2 gap-3 h-57 w-85 sm:w-110 md:w-full/2 md:h-full/2 bg-[#eeeeee55] rounded-2xl "
              whileHover={{scale : 1.03}}
            >
              <CardHeader className="flex flex-col items-center text-[17px] text-black font-bold py-1">
                <item.icon className="w-15 h-15 "/>
                {item.title}
              </CardHeader>
              <CardContent className="text-[17px] text-white">
                {item.description}
              </CardContent>
            </motion.div>
          ))}
        </div>
    </section>
  );
}

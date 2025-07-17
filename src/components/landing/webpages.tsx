"use client"
import { motion} from "framer-motion"

export default function WebPages() {
    return (
        <section className=" pt-23 bg-[radial-gradient(ellipse_at_top,_#ec4899,_#111111,_#000000)] w-full relative overflow-x-clip text-white ">
                <div className="flex flex-col justify-center items-center ">
                    <div className="w-[73%]">
                    <div className="px-5 flex flex-row justify-center items-center bg-gradient-to-b from-cyan-500 to-emerald-300 text-transparent bg-clip-text flex-wrap">
                    <h1 className="text-5xl font-bold text-center">Stream. Discover. Feel the Beat</h1>
                    </div>
                    <p className="text-center mt-7 pb-0  text-[17px] mb-0">Your personal hub to discover stream and share music effortlessly with the world</p>
                    </div>
                </div>
                <div className="mt-5 w-full flex justify-center items-center md:w-full   ">
                    <div className="w-full flex flex-col gap-7  md:px-13 lg:px-35 md:py-11 md:w-full justify-center items-center">
                    <motion.img src="/web1.png" alt=""  className="w-[87%] h-[50%]  md:w-[70%] md:h-[50%] lg:w-[70%] lg:h-[50%] object-fit border-amber-700" whileHover={{scale : 1.03}} />
                    <motion.img src="/web2.png" alt=""  className="w-[87%] h-[50%]  md:w-[70%] md:h-[50%] object-fit border-amber-700" whileHover={{scale : 1.03}} />
                    </div>
                </div>
        </section>
    )
}
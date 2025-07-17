"use client"
import { motion } from "framer-motion"

export default function LogoMover() {
    return (

        <div className="w-full overflow-hidden bg-amber-50">
            <motion.div className="flex  min-w-max   h-30 py-9 [mask-image:linear-gradient(to_right,transparent,black,transparent)] md:text-5xl font-bold  text-[25px] text-black/40 sm:text-3xl italic " animate={{ translateX: '-50%' }} transition={{ duration: 30, repeat: Infinity, repeatType: 'loop', ease: "linear" }}>
                Built for passionate listeners and rising creators — explore trending tracks, share your sound, and experience music the way it was meant to be, all in one seamless platform.
            </motion.div>

        </div>
    )
}
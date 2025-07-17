import FooterLinks from "./foorterlinks";




export default function Footer() {
    return (
        <footer className="bg-black bg-gradient-to-b from-[#222222] to-[#000000] text-white py-15  flex flex-col gap-5 justify-center items-center border-none">
            <div className="flex justify-center pt-5 items-center gap-3">
                <img src="/app-icon.png" alt="" className="w-10 h-10"/> 
                <span className="text-2xl font-bold ">Sync Stream</span>
            </div>
                <FooterLinks/>

            <p className="text-center pb-5">  © 2025 Sync Stream. All rights reserved. Built for thinkers, makers, and lifelong listeners.
</p>
        </footer>
    )
}
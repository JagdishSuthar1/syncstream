"use client"
import { Music2Icon, NotebookIcon } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import { signIn, signOut, useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";
import Link from "next/link";
import { useContext } from "react";
import { MainContext } from "@/context";


export default function Header() {
    const session = useSession()
    const router = useRouter()
    const {colorsStates} = useContext(MainContext)!;
    
    
    return (
        <Card className={`rounded-none border-none sticky z-50 top-0 text-white bg-[#071919]`}>
           <CardContent className="rounded-none flex flex-row justify-between">
            <div className="flex flex-row gap-3">
                <Music2Icon className="mt-1"/>
                <span className="mt-[5.3px] font-bold">Music App</span>
            </div>

            <div className="flex flex-row gap-5">
                <Link className={`mt-[5.7px]  hover: cursor-pointer }`} href={"/dashboard"}>Dashboard</Link>
                <Link className={`mt-[5.7px]  hover: cursor-pointer `}  href={"/explore"}>Explore</Link>
                <Link className={`mt-[5.7px]  hover: cursor-pointer `} href={"/search"}>Search</Link>
                
                {session.status == "authenticated" ? <Button className="mb-2 hover:cursor-pointer" onClick={()=>signOut()}>Log out</Button> : <Button className="hover:cursor-pointer" onClick={()=>signIn()}>Sign in</Button> }
            </div>
           </CardContent>
        </Card>
    )
}
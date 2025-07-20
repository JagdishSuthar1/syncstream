"use client"
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MenuIcon } from "lucide-react";


export default function Header() {
    const session = useSession()

    return (
        <Card className={`rounded-none border-none sticky z-50 top-0 text-white bg-[#071919] bg-[radial-gradient(ellipse_at_top_right,_#ec4899,_#111111,_#000000)] md:text-[15px] text-[13px]`}>
            <CardContent className="rounded-none flex flex-row justify-between">
                <div className="flex flex-row gap-3">
                    <Image src={"/app-icon.png"} alt="SyncStream" width={"51"} height={"51"} />
                    <Link href={"/"} className="mt-5 font-bold">Sync Stream</Link>
                </div>

                <div className="md:flex flex-row gap-5 mt-3 hidden">
                    <Link className={`mt-[5.7px]  hover: cursor-pointer }`} href={"/dashboard"}>Dashboard</Link>
                    <Link className={`mt-[5.7px]  hover: cursor-pointer `} href={"/about"}>About</Link>

                    {session.status == "authenticated" ? <Button className="mb-2 hover:cursor-pointer" onClick={() => signOut()}>Log out</Button> : <Button className="hover:cursor-pointer" onClick={() => signIn()}>Sign in</Button>}
                </div>

                
                <div className="flex md:hidden">
                    <Popover>
                        <PopoverTrigger className="hover:cursor-pointer">
                            <MenuIcon className="w-5 h-5 text-white md:hidden mt-[5px] " />
                        </PopoverTrigger>
                        <PopoverContent className="w-31 h-43 mr-9 py-3 px-2 bg-[#333131] md:hidden rounded-2xl">

                            <div className="flex flex-col gap-5 mt-3 items-center">
                                <Link className={`mt-[5.7px]  hover: cursor-pointer }`} href={"/dashboard"}>Dashboard</Link>
                                <Link className={`mt-[5.7px]  hover: cursor-pointer `} href={"/about"}>About</Link>

                                {session.status == "authenticated" ? <Button className="mb-2 hover:cursor-pointer" onClick={() => signOut()}>Log out</Button> : <Button className="hover:cursor-pointer" onClick={() => signIn()}>Sign in</Button>}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>





            </CardContent>
        </Card>
    )
}
"use client"
import { Dialog, DialogDescription, DialogHeader, DialogTitle , DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RocketIcon } from "lucide-react";
import SpaceJoinUsingCode from "@/helpers/spaceJoinUsingCode";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DialogForJoinSpace() {
    
    const codeRef = useRef<HTMLInputElement >(null);
    const router = useRouter()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={`w-37  hover:cursor-pointer bg-[#e80082] hover:bg-[#e80082] text-black md:text-[15px] text-[13px]`}><RocketIcon/>Join Space</Button>
            </DialogTrigger>
            <DialogContent className="md:w-full w-70 bg-[#071919] text-white md:text-[15px] text-[13px] ">
                <DialogHeader>
                    <DialogTitle>Join the Active Space</DialogTitle>
                    <DialogDescription className="">If the Host accept your request then you can join</DialogDescription>
                </DialogHeader>
                <div className="w-full md:text-[15px] text-[13px]">
                    <Label htmlFor="space-code" className="mb-2 font-bold">Space Code</Label>
                    <Input ref={codeRef} type="text" placeholder="Enter the Space Code" id="space-code"/>
                    <div className="flex flex-row justify-end w-full mt-2 hover:cursor-pointer">
                     <Button className="bg-[#889da5] text-white" onClick={async()=>{
                        if(codeRef != null && codeRef.current != null) {
                        const response = await SpaceJoinUsingCode(Number(codeRef.current.value));
                        if(response.success == true) {
                            router.push(`/dashboard/${response.data}`)
                        }
                        else {
                            toast.error(response.message)
                        }
                        }
                       }}>Join Room </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
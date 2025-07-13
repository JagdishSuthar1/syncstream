"use client"
import { Dialog, DialogDescription, DialogHeader, DialogTitle , DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

export default function BannedDialog() {
    const router = useRouter()


    return (
        <Dialog open={true}>
            <DialogContent className="w-full bg-[#3b3937]">
                <DialogHeader>
                    <DialogTitle className="text-white">Banned!</DialogTitle>
                    <DialogDescription className="text-white">You are banned In this Space</DialogDescription>
                </DialogHeader>
                    <Button className="text-white" onClick={()=> router.push("/dashboard")}>Go to Dashboard</Button>
            </DialogContent>
        </Dialog>
    )
}

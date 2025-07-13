"use client"
import { Dialog, DialogDescription, DialogHeader, DialogTitle , DialogContent, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { MainContext } from "@/context";


export default function KickedDialog() {
    const router = useRouter()
    const pathname = usePathname()
    const {setKicked, setFetchAgain} = useContext(MainContext)!

    return (
        <Dialog open={true}>
            
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Kicked!</DialogTitle>
                    <DialogDescription>You are kicked by the Host</DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-3">
                    <Button onClick={()=> router.push("/dashboard")}>Go to Dashboard</Button>
                    <Button onClick={()=> {
                        setKicked(false);
                        setFetchAgain(true);
                        router.refresh()
                        // router.push(pathname)
                        }}>Join Again</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
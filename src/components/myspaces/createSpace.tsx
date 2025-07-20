"use client"

import { PlusIcon } from "lucide-react"
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogFooter, DialogClose } from "../ui/dialog"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useActionState, useContext, useRef, useState } from "react"
import { handleCreateSpace } from "@/helpers/createSpace"
import { useRouter } from "next/navigation"


const secret_key = "Jagdish_Suthar"
export default function DialogForAddSpace() {
    const [linkCopy, setLinkCopy] = useState<boolean>(false);
    const nameRef = useRef<HTMLInputElement>(null);
    // const urlRef = useRef<HTMLInputElement>(null);
    const router = useRouter()


    // async function handleCreateSpace() {
    //     if(nameRef != null && nameRef.current != null) {
    //         console.log({
    //             name : nameRef.current.value,
    //         })

    //         const response = await axiosInstance.post("/api/v1/space"  ,{
    //             name : nameRef.current.value,
    //         })

    //         console.log(response.data)
    //         if(response.data.success == true) {
    //             setFetchSpacesAgain(true);
    //             const forShare = {
    //                 id : response.data.data.id,
    //                 creatorId : response.data.data.creatorId
    //             }
    //             handleCreateLink(forShare);

    //         }
    //     }
    // }


    const initialState = {
        success: false,
        message: "",
        linkCreated: false,
        linkCopy: false,
        link: ""
    }


    const [state, formAction, pending] = useActionState(handleCreateSpace, initialState);

    async function handleLinkCopy(link: string) {
        await window.navigator.clipboard.writeText(link);
        setLinkCopy(true);
        router.refresh()
    }


    return (
        <Dialog onOpenChange={() => {
            setLinkCopy(false)
        }
        }
        >
            <div className="flex flex-row justify-end md:text-[15px] text-[13px]">
                <DialogTrigger className="w-40" asChild>
                    <Button className={`w-40 mr-7 hover:cursor-pointer bg-[#e80082] hover:bg-[#e80082] text-black`}><PlusIcon />Create New Space</Button>
                </DialogTrigger>
            </div>
            <DialogContent className="bg-[#071919] text-white md:text-[15px] text-[13px] md:w-full  w-70">
                <DialogHeader>
                    <DialogTitle>Create New  Space</DialogTitle>
                </DialogHeader>

                <Card className="bg-[#071919] text-white border-none md:text-[15px] text-[13px]">
                    <CardContent className="flex flex-col">
                        <form action={formAction}>
                            {state.linkCreated == false ? <div className="flex flex-col gap-[7px]">
                                <Label htmlFor="url" className="pl-1">Name</Label>
                                <Input type="text" defaultValue={""} ref={nameRef} id="url" name="nameOfSpace" />
                            </div> : <div className="flex flex-col gap-[7px]">
                                <Label htmlFor="url" className="pl-1">Link</Label>
                                <Input type="text" value={state.link} readOnly id="url" />
                            </div>
                            }

                            <DialogFooter className="mt-3 ">
                                <DialogClose asChild>
                                    <Button className="bg-[#889da5] hover:cursor-pointer md:text-[15px] text-[13px]">Cancel</Button>
                                </DialogClose>
                                {/* <DialogClose asChild> */}
                                {!state.linkCreated ? <Button className="bg-[#889da5] hover:cursor-pointer md:text-[15px] text-[13px]" type="submit" >Create</Button> : !linkCopy ? <Button className="bg-[#889da5] hover:cursor-pointer" type="button" onClick={() => handleLinkCopy(state.link)}>Copy</Button> : <Button className="bg-[#889da5] hover:cursor-pointer" type="button" disabled={true}>Copied</Button>}
                                {/* </DialogClose> */}
                            </DialogFooter>
                        </form>

                    </CardContent>
                </Card>

            </DialogContent>
        </Dialog>
    )
}
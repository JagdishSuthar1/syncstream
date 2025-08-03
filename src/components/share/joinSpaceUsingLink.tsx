"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import HandleSpaceJoin from "@/helpers/spaceJoin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export default function JoinSpaceUsingLink({ id }: { id: number }) {

    const router = useRouter()
  return (
    <Dialog open={true}>
        <Toaster/>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join the Space</DialogTitle>
          <DialogDescription>
            If the Host accept your request then you can join
          </DialogDescription>
        </DialogHeader>

        <Button onClick={async() => {
           const response = await HandleSpaceJoin(id)
            if(response.success == false) {
                    router.push("/dashboard")
            }
            else {
                toast.error(response.message)
                router.push("/dashboard")
            }
        }}>Join {id}</Button>
      </DialogContent>
    </Dialog>
  );
}

import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Action = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Approve Account Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="cursor-pointer p-2 bg-green-100 text-green-800 rounded-lg font-semibold">
            Approve Account
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex justify-center flex-col gap-4">
          <DialogHeader className="flex flex-col gap-4 justify-center items-center">
          <div className="bg-green-400/20 p-4 rounded-full">
              <div className="bg-green-400 p-6 rounded-full">
                <Image
                  src={"/icons/admin/tick.svg"}
                  alt="approve"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
            </div>
            <DialogTitle className="mx-auto">Approve Account</DialogTitle>
            <DialogDescription>
              Approve the student’s account request and grant access. A
              confirmation email will be sent upon approval.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="action" type="submit">
              Approve & Send Confirmation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Account Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="cursor-pointer">
            <Image
              src={"/icons/admin/close-circle.svg"}
              alt="Reject Account"
              width={20}
              height={20}
            />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] flex justify-center flex-col gap-4">
          <DialogHeader className="flex flex-col gap-4 justify-center items-center">
            <div className="bg-red-400/20 p-4 rounded-full">
              <div className="bg-red-400 p-6 rounded-full">
                <Image
                  src={"/icons/admin/info.svg"}
                  alt="Warning"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
            </div>
            <DialogTitle className="mx-auto">Reject Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject the student’s account request? A
              notification email will be sent upon rejection.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="destructive" type="submit">
              Denis & Notify Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Action;

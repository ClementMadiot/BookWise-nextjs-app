"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changeUserStatus } from "@/lib/admin/action/user";

const Action = ({
  userId,
  status,
}: {
  userId: string;
  status: string | null;
}) => {
  const [currentStatus, setCurrentStatus] = React.useState(status ?? "PENDING");

  const handleApprove = async () => {
    if (currentStatus === "APPROVED") {
      toast.error("User already approved", {
        description: "This user has already been approved.",
      });
      return;
    }
    try {
      const result = await changeUserStatus(userId, "APPROVED");
      if (result.success) {
        toast.success("User approved successfully!");
        setCurrentStatus("APPROVED");
        console.log("User approved successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("Failed to approve user", {
        description: "An error occurred while approving the user.",
      });
    }
  };

  const handleRejected = async () => {
    console.log(status);

    const result = await changeUserStatus(userId, "REJECTED");
    if (status === "REJECTED") {
      toast.error("User already rejected", {
        description: "This user has already been rejected.",
      });
      return;
    }
    if (result.success) {
      toast.success("User rejected successfully!");
      setCurrentStatus("REJECTED");
      console.log("User rejected successfully");
      window.location.reload();
    } else {
      toast.error("Failed to reject user", {
        description: "An error occurred while rejecting the user.",
      });
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer bg-green-800/60 rounded-full">
            <Image
              src={"/icons/admin/tick.svg"}
              alt="Approve Account"
              width={20}
              height={20}
            />
          </div>
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
            <DialogClose asChild>
              <Button variant="action" type="submit" onClick={handleApprove}>
                Approve & Send Confirmation
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Account Dialog */}
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          <div className="cursor-pointer">
            <Image
              src={"/icons/admin/close-circle.svg"}
              alt="Reject Account"
              width={20}
              height={20}
            />
          </div>
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
            <DialogClose asChild>
              <Button
                onClick={handleRejected}
                variant="destructive"
                type="submit"
              >
                Deny & Notify Student
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Action;

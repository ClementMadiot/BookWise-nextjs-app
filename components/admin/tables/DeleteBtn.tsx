"use client";

import React, { useState } from "react";
import Image from "next/image";
// Components
import {  deleteUser } from "@/lib/admin/action/user";
import { deleteBook } from "@/lib/actions/book";

import { toast } from "sonner";
// Alert Dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  id: string;
  type: "user" | "book";
  message: string;
}

const DeleteBtn = ({ id, type, message }: Props) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    console.log(`Delete user with ID: ${id}`);
    if (type === "user") {
      try {
        const result = await deleteUser(id);
        if (result.success) {
          toast.success("User deleted successfully");
          // Optionally, refresh the page or update the UI
          window.location.reload();
        } else {
          toast.error("Failed to delete user");
          console.error("Error deleting user:", result.error);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        setDeleting(false);
      }
    } else if (type === "book") {
      console.log("Deleting book with ID:", id);
      try {
        const result = await deleteBook(id);
        if (result.success) {
          toast.success("Book deleted successfully");
          // Optionally, refresh the page or update the UI
          window.location.reload();
        } else {
          toast.error("Failed to delete book");
          console.error("Error deleting book:", result.error);
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        setDeleting(false);
      }
    }
    setDeleting(true);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer mx-auto flex justify-center">
        {" "}
        <Image
          src="/icons/admin/trash.svg"
          alt="Delete User"
          width={20}
          height={20}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-dark-700">
            This action is irreversible. Deleting this {message} will
            permanently remove all associated data from our servers. Please
            proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-400 text-light-300 shadow-xs hover:bg-red-400/90"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;

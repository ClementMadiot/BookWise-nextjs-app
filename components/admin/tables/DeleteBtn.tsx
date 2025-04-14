"use client";


import { deleteBook, deleteUser } from "@/lib/admin/action/user";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  id: string;
  type?: "user" | 'book';
}

const DeleteBtn = ({ id, type }: Props) => {
  const [deleting, setDeleting] = useState(false);
  
  const handleDelete = async () => {
    console.log(`Delete user with ID: ${id}`);
    if(type === "user"){
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
    } else if(type === "book"){
      console.log("Deleting book with ID:", id);    
      try {
        const result = await deleteBook(id)
        if(result.success){
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
    <button
      onClick={handleDelete}
      className="cursor-pointer mx-auto flex justify-center"
      disabled={deleting}
    >
      <Image
        src="/icons/admin/trash.svg"
        alt="Delete User"
        width={20}
        height={20}
      />
    </button>
  );
};

export default DeleteBtn;

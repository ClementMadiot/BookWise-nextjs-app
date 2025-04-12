"use client";


import { deleteUser } from "@/lib/admin/action/user";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const DeleteUser = ({ usersId }: { usersId: string }) => {
  const [deleting, setDeleting] = useState(false);
  
  const handleDelete = async () => {
    console.log(`Delete user with ID: ${usersId}`);
    // Add your delete logic here
    setDeleting(true);
    try {
      const result = await deleteUser(usersId);
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

export default DeleteUser;

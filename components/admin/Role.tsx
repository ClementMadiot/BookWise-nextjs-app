"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { updateUserRole } from "@/lib/admin/action/user";

const Role = ({ userId, role }: { userId: string; role: string }) => {
  const [position, setPosition] = React.useState(
    role === "ADMIN" ? "admin" : "user"
  );

  const handleRoleChange = async (newRole: string) => {
    setPosition(newRole); // Update the local state immediately for a responsive UI
    try {
      const result = await updateUserRole(userId, newRole.toUpperCase());
      if (result.success) {
        toast.success("User role updated successfully");
      } else {
        toast.error("Failed to update user role");
        console.error("Error updating user role:", result.error);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
      // Revert the local state change if the API call fails
      setPosition(role === "ADMIN" ? "admin" : "user");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={
            position === "admin"
              ? "bg-green-100 text-green-800"
              : "bg-rose-100 text-rose-800"
          }
        >
          {position === "admin" ? "Admin" : "User"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!bg-light-300 text-dark-200 !p-0">
        <DropdownMenuRadioGroup value={position} onValueChange={(newRole) => handleRoleChange(newRole)}>
          <DropdownMenuRadioItem
            className={`cursor-pointer font-semibold text-rose-800 hover:bg-rose-100 !py-3 ${
              position === "user" ? " bg-rose-100" : ""
            }`}
            value="user"
          >
            User
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className={`cursor-pointer font-semibold text-green-800 hover:bg-green-100 !py-3 ${
              position === "admin" ? "bg-green-100" : ""
            }`}
            value="admin"
          >
            Admin
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Role;

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
import { updateStatusBorrow } from "@/lib/actions/book";

interface RoleProps {
  id: string;
  role: string;
  dueDate?: Date;
  array?: {
    value: string;
    label: string;
    bgcoverColor: string;
    textcoverColor: string;
  }[];
  onRoleChange?: (newRole: string) => void;
}

const Role = ({ id, role, array, dueDate }: RoleProps) => {
  const [position, setPosition] = React.useState(role);

  // Dynamically set the default value based on the role prop
  const currentConfig = array?.find(
    (item) => item.value.toLowerCase() === position.toLowerCase()
  );

  const handleRoleChange = async (newRole: string) => {
    setPosition(newRole); // Update the local state immediately
    console.log("Role changed to:", newRole); // Debugging log

    if (newRole === "admin" || newRole === "user") {
      try {
        const result = await updateUserRole(id, newRole.toUpperCase());
        if (result.success) {
          toast.success("User role updated successfully");
        } else {
          toast.error("Failed to update user role");
          console.error("Error updating user role:", result.error);
        }
      } catch (error) {
        console.error("Error updating user role:", error);
        toast.error("Failed to update user role");
        setPosition(role); // Revert the local state change if the API call fails
      }
    }

    if (
      newRole === "borrowed" ||
      newRole === "returned"
    ) {
      try {
        const result = await updateStatusBorrow(id, newRole.toUpperCase());

        if (newRole === "returned") {
          // Update the returned_date in the database
          await updateStatusBorrow(
            id,
            newRole.toUpperCase(),
            new Date().toISOString()
          );
        }

        if (result.success) {
          toast.success("Book status updated successfully");
        } else {
          toast.error("Failed to update book status");
          console.error("Error updating book status:", result.error);
        }
      } catch (error) {
        console.error("Error updating book status:", error);
        toast.error("Failed to update book status");
        setPosition(role); // Revert the local state change if the API call fails
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`${currentConfig?.bgcoverColor} ${currentConfig?.textcoverColor} hover:${currentConfig?.bgcoverColor} font-semibold focus-visible:ring-${currentConfig?.textcoverColor}`}
        >
          {currentConfig?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!bg-light-300 text-dark-200 !p-0">
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(newRole) => handleRoleChange(newRole)}
        >
          {array?.map(({ value, label, bgcoverColor, textcoverColor }) => (
            <DropdownMenuRadioItem
              key={value}
              className={`cursor-pointer font-semibold !py-3 ${bgcoverColor} ${textcoverColor}`}
              value={value}
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Role;

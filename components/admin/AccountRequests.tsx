import React from "react";
import TableComponent from "./tables/TableComponent";
import { TableCell } from "../ui/table";
import ViewCard from "./tables/ViewCard";
import Action from "./tables/Action";
import { Session } from "next-auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

const tableHeader = [
  "Name",
  "Date Joined",
  "Unmiversity ID No",
  "University ID Card",
  "Action",
];

interface Props {
  users: User[];
}

const AccountRequests = ({ users }: Props) => {
  return (
    <TableComponent
      headers={tableHeader}
      data={users}
      title="Account Registration Requests"
      renderRow={(user) => (
        <>
          <TableCell className="p-4 flex items-center gap-4">
            {/* Name and Email */}
              <Avatar>
                <AvatarFallback className="bg-amber-100">
                  {getInitials(user?.fullName || "IN")}
                </AvatarFallback>
              </Avatar>

            <div className="flex flex-col max-md:hidden">
              <h1 className="text-sm font-semibold">{user.fullName}</h1>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </TableCell>
          <TableCell className="admin-cell ">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </TableCell>
          <TableCell className="admin-cell ">{user.universityId}</TableCell>
          <TableCell className="admin-cell ">
            <ViewCard type="eye" universityCard={user.universityCard} />
          </TableCell>
          <TableCell>
            <Action />
          </TableCell>
        </>
      )}
    />
  );
};

export default AccountRequests;

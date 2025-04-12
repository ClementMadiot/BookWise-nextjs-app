
import Image from "next/image";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteUser from "./DeleteUser";


export const tableName = [
  "Name",
  "Date Joined",
  "Role",
  "Books Borrowed",
  "University ID No",
  "University ID Card",
  "Action",
];

interface Props {
  // booksBorrowed: number;
  users: User[];
}

const AllList = async ({ users }: Props) => {
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className="!py-4">
          <TableRow className="!bg-light-300 !text-dark-200 !text-sm !font-[300] text-left">
            {tableName.map((name, index) => (
              <TableHead
                key={index}
                className="!text-dark-200 !font-[300] text-left p-4"
              >
                {name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.fullName}>
              <TableCell className="p-4 flex items-center gap-4">
                {/* Name and Email */}
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Image
                    src="/icons/user-fill.svg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-dark-200 text-sm">
                    {user.fullName}
                  </p>
                  <p className="text-light-900 text-sm">{user.email}</p>
                </div>
              </TableCell>
              {/* Date Joined */}
              <TableCell className="p-4 !text-dark-200 font-semibold text-sm">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              {/* Role */}
              <TableCell className="p-4 !text-dark-200 font-semibold text-sm">
                {user.role === "ADMIN" ? "Admin" : "User"}
              </TableCell>
              {/* Books Borrowed */}
              <TableCell className="p-4 !text-dark-200 font-semibold text-sm">
                {/* {booksBorrowed} */} 1
              </TableCell>
              {/* University ID No */}
              <TableCell className="p-4 !text-dark-200 font-semibold text-sm">
                {user.universityId}
              </TableCell>
              {/* University ID Card */}
              <TableCell className="p-4 !text-dark-200 font-semibold">
                <a
                  href={user.universityCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-500"
                >
                  <span>View ID Card</span>
                  <Image
                    src="/icons/admin/link.svg"
                    alt="View ID Card"
                    width={14}
                    height={14}
                  />
                </a>
              </TableCell>
              {/* Action */}
              <TableCell className="p-4">
                <DeleteUser usersId={users[0].id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AllList;

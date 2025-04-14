"use client";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteBtn from "./DeleteBtn";
import Role from "./Role";
import ViewCard from "./forms/ViewCard";
import { useEffect, useState } from "react";
import { countUserBorrowedBooks } from "@/lib/admin/action/user";

const tableName = [
  "Name",
  "Date Joined",
  "Role",
  "Books Borrowed",
  "University ID No",
  "University ID Card",
  "Action",
];

interface Props {
  users: User[];
}

const AllList = ({ users }: Props) => {
  const [borrowedBooksCounts, setBorrowedBooksCounts] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const fetchBorrowedBooksCounts = async () => {
      const counts: Record<string, number> = {};
      for (const user of users) {
        const count = await countUserBorrowedBooks(user.id);
        counts[user.id] = count;
      }
      setBorrowedBooksCounts(counts);
    };

    fetchBorrowedBooksCounts();
  }, [users]);

  return (
    <Table>
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
            <TableCell className="p-4 !text-dark-200 font-medium text-sm">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </TableCell>

            {/* Role */}
            <TableCell className="p-4 !text-dark-200 font-medium text-sm">
              <Role userId={user.id} role={user.role} />
            </TableCell>

            {/* Books Borrowed */}
            <TableCell className="p-4 !text-dark-200 font-medium text-sm">
              {borrowedBooksCounts[user.id] ?? "Loading..."}
            </TableCell>

            {/* University ID No */}
            <TableCell className="p-4 !text-dark-200 font-medium text-sm">
              {user.universityId}
            </TableCell>

            {/* University ID Card */}
            <TableCell className="p-4 !text-dark-200 font-medium">
              <ViewCard universityCard={user.universityCard} />
            </TableCell>
            {/* Action */}
            <TableCell className="p-4">
              <DeleteBtn id={users[0].id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllList;

"use client";
import Image from "next/image";

import { TableCell } from "@/components/ui/table";
import DeleteBtn from "./tables/DeleteBtn";
import Role from "./tables/Role";
import ViewCard from "./tables/ViewCard";
import { useEffect, useState } from "react";
import { countUserBorrowedBooks } from "@/lib/admin/action/user";
import TableComponent from "./tables/TableComponent";

const tableHeader = [
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

const AllUser = ({ users }: Props) => {
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
    <TableComponent
      headers={tableHeader}
      data={users}
      title="All Users"
      renderRow={(user) => (
        <>
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
          <TableCell className="admin-cell ">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </TableCell>

          {/* Role */}
          <TableCell className="admin-cell ">
            <Role userId={user.id} role={user.role} />
          </TableCell>

          {/* Books Borrowed */}
          <TableCell className="admin-cell ">
            {borrowedBooksCounts[user.id] ?? "Loading..."}
          </TableCell>

          {/* University ID No */}
          <TableCell className="admin-cell ">{user.universityId}</TableCell>

          {/* University ID Card */}
          <TableCell className="p-4 !text-dark-200 font-medium">
            <ViewCard type="link" universityCard={user.universityCard} />
          </TableCell>
          {/* Action */}
          <TableCell className="p-4">
            <DeleteBtn id={users[0].id} />
          </TableCell>
        </>
      )}
    />
  );
};

export default AllUser;

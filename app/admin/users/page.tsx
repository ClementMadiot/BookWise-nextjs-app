import { users } from "@/database/schema";
import { db } from "@/database/drizzle";
import Image from "next/image";
// components
import TableComponent from "@/components/admin/tables/TableComponent";
import { TableCell } from "@/components/ui/table";
import Role from "@/components/admin/tables/Role";
import ViewCard from "@/components/admin/tables/ViewCard";
import DeleteBtn from "@/components/admin/tables/DeleteBtn";
import BorrowCount from "@/components/admin/tables/BorrowCount";

const tableHeader = [
  "Name",
  "Date Joined",
  "Role",
  "Books Borrowed",
  "University ID No",
  "University ID Card",
  "Action",
];

const page = async () => {
  const allUsers = (await db.select().from(users)).map((user) => ({
    ...user,
    createdAt: user.createdAt ? user.createdAt.toISOString() : null,
  })) as User[];

  if (allUsers.length < 1) return null;

  return (
    <section className="w-full rounded-2xl bg-white p-4">
      <TableComponent
        headers={tableHeader}
        data={allUsers}
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
              <BorrowCount users={user.id} />
              
            </TableCell>

            {/* University ID No */}
            <TableCell className="admin-cell ">{user.universityId}</TableCell>

            {/* University ID Card */}
            <TableCell className="p-4 !text-dark-200 font-medium">
              <ViewCard type="link" universityCard={user.universityCard} />
            </TableCell>
            {/* Action */}
            <TableCell className="p-4">
              <DeleteBtn id={allUsers[0].id} type="user" message="account" />
            </TableCell>
          </>
        )}
      />
    </section>
  );
};

export default page;

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { getInitials } from "@/lib/utils";
// Components
import Action from "@/components/admin/tables/Action";
import TableComponent from "@/components/admin/tables/TableComponent";
import ViewCard from "@/components/admin/tables/ViewCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TableCell } from "@/components/ui/table";

const tableHeader = [
  "Name",
  "Date Joined",
  "Unmiversity ID No",
  "University ID Card",
  "Status",
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
              {user.status === "PENDING" && (
                <span className="p-2 bg-blue-100/10 text-blue-800 rounded-lg font-semibold">
                  Pending
                </span>
              )}

              {user.status === "APPROVED" && (
                <span className="p-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                  Approved
                </span>
              )}
              {user.status === "REJECTED" && (
                <span className="p-2 bg-red-400/10 text-red-800 rounded-lg font-semibold">
                  Rejected
                </span>
              )}
            </TableCell>
            <TableCell>
              <Action userId={user.id} status={user.status ?? null} />
            </TableCell>
          </>
        )}
      />
    </section>
  );
};

export default page;

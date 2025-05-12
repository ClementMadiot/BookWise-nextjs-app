import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { books, borrowRecords, users } from "@/database/schema";
import Role from "@/components/admin/tables/Role";
import { BorrowRecord } from "@/types";
import { borrowStatuses } from "@/constants";
import TableComponent from "@/components/admin/tables/TableComponent";
import BookCover from "@/components/BookCover";
import { TableCell } from "@/components/ui/table";
import { truncateText } from "../books/page";

const tableHeader = [
  "Book",
  "User Requested",
  "Status",
  "Borrowed date",
  "Return date", // today's date
  "Due date", // due date
];

const page = async () => {
  const allRecords = (
    await db
      .select({
        id: borrowRecords.id,
        userId: borrowRecords.userId,
        bookId: borrowRecords.bookId,
        borrowDate: borrowRecords.borrowDate,
        dueDate: borrowRecords.dueDate,
        returnDate: borrowRecords.returnDate,
        status: borrowRecords.status,
        createdAt: borrowRecords.createdAt,
        title: books.title,
        coverColor: books.coverColor,
        coverUrl: books.coverUrl,
        fullName: users.fullName,
        email: users.email,
      })
      .from(borrowRecords)
      .leftJoin(books, eq(books.id, borrowRecords.bookId))
      .leftJoin(users, eq(users.id, borrowRecords.userId))
  ).map((record) => ({
    ...record,
    borrowDate: record.borrowDate ? new Date(record.borrowDate) : null,
    dueDate: record.dueDate ? new Date(record.dueDate) : null,
    returnDate: record.returnDate ? new Date(record.returnDate) : null,
  })) as BorrowRecord[];
  return (
    <section className="w-full rounded-2xl bg-white p-4">
      <TableComponent
        headers={tableHeader}
        data={allRecords}
        title="Borrow Records"
        renderRow={(record) => (
          <>
            <TableCell className="p-4 flex items-center gap-4">
              {/* Book and User Requested */}
              <div className="flex items-center gap-4">
                <BookCover
                  coverColor={record.coverColor || ""}
                  coverImage={record.coverUrl || ""}
                  variant={"extraSmall"}
                />
                <h1 className="text-sm font-semibold">
                  {truncateText(record.title, 20)}
                </h1>
              </div>
            </TableCell>
            <TableCell className="admin-cell">
              <div className="flex items-center gap-4">
                <div className="flex flex-col max-md:hidden">
                  <h1 className="text-sm font-semibold">{record.fullName}</h1>
                  <p className="text-xs text-gray-500">{record.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="admin-cell ">
              <Role
                id={record.id}
                role={record.status}
                array={borrowStatuses}
                dueDate={record.dueDate}
              />
            </TableCell>
            <TableCell className="admin-cell ">
              {record.borrowDate
                ?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .replace(",", "")}
            </TableCell>
            <TableCell className="admin-cell ">
              {record.returnDate
                ?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .replace(",", "")}
            </TableCell>
            <TableCell className="admin-cell ">
              {record.dueDate
                ?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .replace(",", "")}
            </TableCell>
          </>
        )}
      />
    </section>
  );
};

export default page;

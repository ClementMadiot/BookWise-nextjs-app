import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
// Components
import BookEdit from "@/components/admin/forms/BookEdit";
import DeleteBtn from "@/components/admin/tables/DeleteBtn";
import TableComponent from "@/components/admin/tables/TableComponent";
import BookCover from "@/components/BookCover";
import { TableCell } from "@/components/ui/table";
import { Book } from "@/types";
import Link from "next/link";

const tableHeader = ["Book Title", "Author", "Genre", "Date Created", "Action"];

// Utility function to truncate text
export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const page = async () => {
  const allBooks = (await db.select().from(books)).map((book) => ({
    ...book,
  })) as Book[];

  if (allBooks.length < 1) return null;
  return (
    <section className="w-full rounded-2xl bg-white px-4">
      <div className="w-full overflow-hidden ">
        <TableComponent
          headers={tableHeader}
          data={allBooks}
          title="All Books"
          renderRow={(book) => (
            <>
              <TableCell className="!font-semibold  p-2 !text-dark-200 text-sm">
                <Link
                  href={`/books/${book.id}`}
                  className="flex items-center gap-3"
                >
                  {/* Book Cover */}
                  <BookCover
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                    variant={"extraSmall"}
                  />

                  {/* Limit title to 30 characters */}
                  {truncateText(book.title, 30)}
                </Link>
              </TableCell>
              {/* Author */}
              <TableCell className="admin-cell">
                <div className="flex">{truncateText(book.author, 18)}</div>
              </TableCell>
              <TableCell className="admin-cell">{book.genre}</TableCell>
              {/* Date Joined */}
              <TableCell className="admin-cell">
                {book.createdAt
                  ? book.createdAt
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })
                      .replace(",", " \u00A0")
                  : "N/A"}
              </TableCell>
              <TableCell className="text-center">
                <div className="inline-flex gap-2">
                  <BookEdit id={book.id} />
                  <DeleteBtn id={book.id} type="book" message="book" />
                </div>
              </TableCell>
            </>
          )}
        />
      </div>
    </section>
  );
};

export default page;

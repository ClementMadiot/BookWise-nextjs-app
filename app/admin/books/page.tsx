import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
// Components
import BookEdit from "@/components/admin/forms/BookEdit";
import DeleteBtn from "@/components/admin/tables/DeleteBtn";
import TableComponent from "@/components/admin/tables/TableComponent";
import BookCover from "@/components/BookCover";
import { TableCell } from "@/components/ui/table";
import { Book } from "@/types";


const tableHeader = ["Book Title", "Author", "Genre", "Date Created", "Action"];

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const page = async () => {
  const allBooks = (await db
    .select()
    .from(books)).map(book => ({
    ...book,  
    })) as Book[];

    if(allBooks.length < 1) return null;
  return (
    <section className="w-full rounded-2xl bg-white px-4">
      <div className="w-full overflow-hidden ">
      <TableComponent
      headers={tableHeader}
      data={allBooks}
      title="All Books"
      renderRow={(book) => (
        <>
          <TableCell className="flex !font-semibold items-center gap-3 p-2 !text-dark-200 text-sm">
            {/* Book Cover */}
            <BookCover
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
              variant={"extraSmall"}
            />

            {truncateText(book.title, 30)}
            {/* Limit title to 30 characters */}
          </TableCell>
          <TableCell className="admin-cell">
            {truncateText(book.author, 18)}
          </TableCell>
          <TableCell className="admin-cell">{book.genre}</TableCell>
          {/* Date Joined */}
          <TableCell className="admin-cell">
            {book.createdAt
              ? book.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).replace(",", " \u00A0")
              : "N/A"}
          </TableCell>
          <TableCell className="!p-2 text-center">
            <div className="inline-flex gap-2">
              <BookEdit id={book.id} />
              <DeleteBtn id={book.id} type="book" message="book"/>
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

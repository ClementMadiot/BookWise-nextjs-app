import { TableCell } from "@/components/ui/table";
import BookCover from "../BookCover";
import BookEdit from "./forms/BookEdit";
import DeleteBtn from "./tables/DeleteBtn";
import TableComponent from "./tables/TableComponent";

const tableHeader = ["Book Title", "Author", "Genre", "Date Created", "Action"];

interface Props {
  books: Book[];
}

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const AllBooks = ({ books }: Props) => {
  return (
    <TableComponent
      headers={tableHeader}
      data={books}
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
              ? new Date(book.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "N/A"}
          </TableCell>
          <TableCell className="!p-2 text-center">
            <div className="inline-flex gap-2">
              <BookEdit id={book.id} />
              <DeleteBtn type="book" id={book.id} />
            </div>
          </TableCell>
        </>
      )}
    />
  );
};

export default AllBooks;

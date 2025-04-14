import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookCover from "../BookCover";
import BookEdit from "./BookEdit";

const tableName = ["Book Title", "Author", "Genre", "Date Created", "Action"];

interface Props {
  books: Book[];
}

// Utility function to truncate text
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const AllBooks = ({ books }: Props) => {
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
        {books.map((book) => (
          <TableRow
            key={book.id}
            className="border-b border-light-200 text-sm font-[300] text-dark-200"
          >
            <TableCell className="p-4 font-semibold text-dark-200 text-sm flex items-center gap-3">
              {/* Book Cover */}
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                variant={"extraSmall"}
              />

              {truncateText(book.title, 30)}
              {/* Limit title to 30 characters */}
            </TableCell>
            <TableCell className="p-4 font-medium text-dark-200 text-sm">
              {truncateText(book.author, 18)}
            </TableCell>
            <TableCell className="p-4 font-medium text-dark-200 text-sm">
              {book.genre}
            </TableCell>
            {/* Date Joined */}
            <TableCell className="p-4 !text-dark-200 font-medium text-sm">
              {book.createdAt
                ? new Date(book.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "N/A"}
            </TableCell>
            <TableCell className="flex items-center gap-2 p-4">
              {/* Add your action buttons here */}
              <BookEdit id={book.id}/>
              <button className="text-red-500">D</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AllBooks;

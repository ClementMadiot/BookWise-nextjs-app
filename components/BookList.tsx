import React from "react";
import BookCard from "./BookCard";
import { Book } from "@/types";

interface Props {
  title: string;
  books: Book[]
  containerClassName?: string;
  listBookClassName?: string;
  titleClassName?: string;
  userId?: string;
}

const BookList = ({ title, books, containerClassName, listBookClassName, userId, titleClassName }: Props) => {
  if (books.length < 1) return null; 
  return (
    <section className={containerClassName}>
      <h2 className={`font-bebas-neue text-4xl text-light-100 ${titleClassName}`}>{title}</h2>

      <ul className={`book-list w-full ${listBookClassName}`}>
        {books.map((book) => (
          <BookCard key={book.title} {...book} userId={userId || ""} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;

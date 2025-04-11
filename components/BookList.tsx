import React from "react";
import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  listBookClassName?: string;
  userId?: string;
}

const BookList = ({ title, books, containerClassName, listBookClassName, userId }: Props) => {
  if (books.length < 1) return null; 
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className={`book-list w-full ${listBookClassName}`}>
        {books.map((book) => (
          <BookCard key={book.title} {...book} userId={userId || ""} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;

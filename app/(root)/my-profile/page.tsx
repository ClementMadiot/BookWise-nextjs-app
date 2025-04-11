import React from "react";
import BookList from "@/components/BookList";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import BookProfile from "@/components/BookProfile";

const page = async () => {
  const session = await auth();

  if (!session?.user?.id) return null;

  // Fetch current user info
  const [user] = await db
    .select({
      fullName: users.fullName,
      email: users.email,
      universityId: users.universityId,
      universityCard: users.universityCard,
      status: users.status,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) return null;

  // Fetch borrowed books with status "BORROWED"
  const borrowedBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      description: books.description,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      videoUrl: books.videoUrl,
      summary: books.summary,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(
      eq(borrowRecords.userId, session.user.id) &&
        eq(borrowRecords.status, "BORROWED")
    );

  // Handle empty or single-item arrays
  if (!borrowedBooks.length) {
    return (
      <p className="font-bebas-neue text-4xl text-light-100 m-auto">
        You have not borrowed any books yet.
      </p>
    );
  }

  return (
    <>
      <section className="flex flex-col lg:flex-row gap-20 justify-between items-stretch lg:gap-16">
        <BookProfile
          fullName={user.fullName}
          email={user.email}
          universityId={user.universityId}
          universityCard={user.universityCard}
          status={user.status ?? ""}
          role={user.role ?? ""}
        />
        <BookList
          title="Borrowed Books"
          books={borrowedBooks.map((book) => ({
            ...book,
            createdAt: new Date(book.borrowDate), // Ensure borrowDate is a Date object
          }))}
          containerClassName="flex-grow"
        />
      </section>
    </>
  );
};

export default page;

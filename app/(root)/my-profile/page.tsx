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

  // Fetch borrowed books
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
      status: borrowRecords.status,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session.user.id));

  return (
    <>
      <section
        className={`flex flex-col justify-center lg:flex-row lg:justify-between items-stretch gap-8 ${
          borrowedBooks.length > 0 ? "lg:items-start" : "lg:items-center"
        }`}
      >
        <div className="max-w-lg mx-auto lg:max-w-none">
          <BookProfile
            fullName={user.fullName}
            email={user.email}
            universityId={user.universityId}
            universityCard={user.universityCard}
            status={user.status ?? ""}
            role={user.role ?? ""}
          />
        </div>
        <div className="flex-1">
          {borrowedBooks.length > 0 ? (
            <BookList
              title="Borrowed Books"
              books={borrowedBooks.map((book) => ({
                ...book,
                createdAt: new Date(book.borrowDate),
                borrowDate: book.borrowDate ? new Date(book.borrowDate) : null,
                dueDate: book.dueDate ? new Date(book.dueDate) : null,
                returnDate: book.returnDate ? new Date(book.returnDate) : null,
              }))}
              userId={session?.user?.id}
              containerClassName="lg:justify-end"
              listBookClassName="justify-center lg:justify-start"
            />
          ) : (
            <p className="font-bebas-neue text-4xl text-light-100 text-center flex justify-center mt-8 lg:mt-0">
              You have not borrowed any books yet
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;

import React from 'react'
import BookList from '@/components/BookList'
import { auth } from '@/auth'
import { db } from '@/database/drizzle'
import { books, borrowRecords } from '@/database/schema'
import { eq } from 'drizzle-orm'

const page = async () => {
  const session = await auth()

  if(!session?.user?.id) return null

  // Fetch borrowed books with status "BORROWED"
  const borrowedBooks = (await db
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
    ));

      // Handle empty or single-item arrays
  if (!borrowedBooks.length) {
    return <p className='font-bebas-neue text-4xl text-light-100 m-auto'>You have not borrowed any books yet.</p>;
  }

  return (
    <BookList
      title='Borrowed Books'
      books={borrowedBooks.map((book) => ({
        ...book,
        createdAt: new Date(book.borrowDate), // Ensure borrowDate is a Date object
      }))}
      />

  )
}

export default page
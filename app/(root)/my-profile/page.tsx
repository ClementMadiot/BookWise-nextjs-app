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
    )).map(book => ({
      ...book,
      totalCopies: 0, // Default value
      availableCopies: 0, // Default value
      videoUrl: '', // Default value
      summary: '', // Default value
      createdAt: new Date(), // Default value
    }));

  return (
    <>
    <BookList
      title='Borrowed Books'
      books={borrowedBooks} 
      />
    </>
  )
}

export default page
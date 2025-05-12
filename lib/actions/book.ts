"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, and, sql } from "drizzle-orm";
import dayjs from "dayjs";
import { BorrowBookParams } from "@/types";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    // Check if the user has already borrowed this book
    const existingBorrowRecord = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED")
        )
      )
      .limit(1);

    if (existingBorrowRecord.length > 0) {
      return {
        success: false,
        error: "You have already borrowed this book",
      };
    }

    // Check if the book is available for borrowing
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    // Calculate the due date (7 days from now)
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    // Insert a new borrow record
    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    // Decrement the available copies of the book
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const returnBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    // Return Date is the current date
    const returnDate = new Date().toDateString();

    // Update the borrow record
    const updatedRecord = await db
      .update(borrowRecords)
      .set({ status: "RETURNED", returnDate })
      .where(
        and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId))
      );

    if (!updatedRecord.rowCount) {
      return {
        success: false,
        error: "No borrow record found for this book",
      };
    }

    // Check if the book is available for borrowing
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    // Increment the available copies of the book
    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies + 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while returning the book",
    };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await db.delete(books).where(eq(books.id, bookId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting book:", error);
    return { success: false, error: "Failed to delete book" };
  }
};

// BORROW BOOKS

export const updateStatusBorrow = async (
  id: string,
  status: string,
  returnedDate?: string | null
) => {
  try {
    await db
      .update(borrowRecords)
      .set({
        status: status as "BORROWED" | "RETURNED",
        returnDate: returnedDate,
      })
      .where(eq(borrowRecords.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error updating borrow status:", error);
    return { success: false, error: "Failed to update borrow status" };
  }
};

// Count how many books a user has borrowed
export const countUserBorrowedBooks = async (userId: string) => {
  try {
    const result = await db
      .select({
        borrowedBooksCount: sql<number>`COUNT(${borrowRecords.id})`,
      })
      .from(borrowRecords)
      .where(
        sql`${eq(borrowRecords.userId, userId)} AND ${eq(
          borrowRecords.status,
          "BORROWED"
        )}`
      );

    return result[0]?.borrowedBooksCount || 0; // Return the count or 0 if no records
  } catch (error) {
    console.error("Error counting borrowed books:", error);
    return 0; // Return 0 in case of an error
  }
};

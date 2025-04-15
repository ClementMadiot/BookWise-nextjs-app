"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";

export const deleteUser = async (userId: string) => {
  try {
    await db.delete(users).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
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
}

export const updateUserRole = async (userId: string, role: string) => {
  try {
    if (role !== "ADMIN" && role !== "USER") {
      throw new Error("Invalid role value");
    }
    await db.update(users).set({ role }).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role" };
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

// Change user's status 
export const changeUserStatus = async (userId: string, status: string) => {
  try {
    // Validate the status value
    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      throw new Error("Invalid status value");
    }
    // Update the user's status in the database
    await db.update(users).set({ status: status as "PENDING" | "APPROVED" | "REJECTED" }).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error changing user status:", error);
    return { success: false, error: "Failed to change user status" };
    
  }
}
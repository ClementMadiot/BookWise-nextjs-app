"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { BookParams } from "@/types";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning(); // get are value back

    return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      error: "An error occurred while creating the book",
    };
  }
};

export const updateBook = async (params: BookParams & { id: string }) => {
  try {
    const updatedBook = await db
      .update(books)
      .set({
        ...params,
        availableCopies: params.totalCopies, // Update available copies as well
      })
      .where(eq(books.id, params.id)) // Ensure the update targets the correct book
      .returning(); // Get the updated value back

    return { success: true, data: JSON.parse(JSON.stringify(updatedBook[0])) };
  } catch (error) {
    console.error("Error updating book:", error);
    return {
      success: false,
      error: "An error occurred while updating the book",
    };
  }
};

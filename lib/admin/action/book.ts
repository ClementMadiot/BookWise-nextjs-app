"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies, // Ensure this property exists in the schema
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

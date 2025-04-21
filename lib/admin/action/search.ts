"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { like, sql } from "drizzle-orm"; // Import necessary helpers

export const getFiles = async (query: string) => {
  if (!query.trim()) return { documents: [] };

  const lowerQuery = query.toLowerCase(); // Convert the query to lowercase for case-insensitive matching

  // Search for users
  // const userResults = await db
  //   .select({
  //     id: users.id,
  //     name: users.fullName,
  //     type: sql`'users'`.as<string>(), // Explicitly set the type as "users"
  //   })
  //   .from(users)
  //   .where(like(sql`LOWER(${users.fullName})`, `%${lowerQuery}%`)) // Use LOWER for case-insensitive matching
  //   .limit(5);

  // Search for books by title
  const bookResults = await db
    .select({
      id: books.id,
      title: books.title,
      type: sql`'books'`.as<string>(), // Explicitly set the type as "books"
    })
    .from(books)
    .where(like(sql`LOWER(${books.title})`, `%${lowerQuery}%`)) // Use LOWER for case-insensitive matching
    .limit(5);

  // Search for books by genre
  // const genreResults = await db
  //   .select({
  //     id: books.id,
  //     title: books.genre,
  //     type: sql`'books'`.as<string>(), // Explicitly set the type as "books"
  //   })
  //   .from(books)
  //   .where(like(sql`LOWER(${books.genre})`, `%${lowerQuery}%`)) // Use LOWER for case-insensitive matching
  //   .limit(5);

  // Combine results
  const documents = [ ...bookResults];

  return { documents };
};

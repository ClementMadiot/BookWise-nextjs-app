"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteUser = async (userId: string) => {
  try {
    await db.delete(users).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
};

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
}
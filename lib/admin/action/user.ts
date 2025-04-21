"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import {  eq, sql, Table } from "drizzle-orm";

export const deleteUser = async (userId: string) => {
  try {
    await db.delete(users).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
};

// Role update function
export const updateUserRole = async (userId: string, role: string) => {
  try {
    await db.update(users).set({ role: role as "USER" | "ADMIN" }).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, error: "Failed to update user role" };
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

// Fetch counts dynamically from the database
export const fetchCounts = async (table: Table<any>) => {
  try {
    const result = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(table)
      .then((result) => result[0]?.count || 0);

    return result; // Return the count
  } catch (error) {
    console.error("Error fetching counts:", error);
    return 0; // Return 0 in case of an error
  }
};
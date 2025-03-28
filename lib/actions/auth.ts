"use server";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export const signInWithCredentails = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // if error, return error
    if (result?.error) {
      return { success: false, error: result.error };
    }
    // else return success
    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return {
      success: false,
      error: "Signin failed",
    };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  // check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    // eq = equal, function from drizzle-orm
    .where(eq(users.email, email))
    .limit(1);

  // if user already exists
  if (existingUser.length > 0) {
    return {
      success: false,
      error: "User already exists",
    };
  }
  // if user does not exist, hash the password
  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });
    await signInWithCredentails({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return {
      success: false,
      error: "Signup failed",
    };
  }
};

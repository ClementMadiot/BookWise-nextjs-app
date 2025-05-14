import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  // Fetch the user role
  const [user] = await db
  .select({
    role: users.role,})
    .from(users)
    .where(eq(users.id, session?.user?.id!))
    .limit(1);

    if (!user) return;


  // update user's last activity
  after(async () => {
    if (!session?.user?.id) return;

    // get the user and see if the last activity date is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;
    // if not, update the last activity date

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session.user.id));
  });
  return (
    <main className="root-container">
      <div className="max-w-6xl lg:min-w-6xl mx-auto">
        <Header session={session} admin={user.role ?? "user"} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;

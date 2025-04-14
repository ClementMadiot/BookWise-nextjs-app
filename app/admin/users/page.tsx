import React from "react";
import AllUser from "@/components/admin/AllUsers";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";

const page = async () => {
  const allUsers = (await db
    .select()
    .from(users)).map(user => ({
      ...user,
      createdAt: user.createdAt ? user.createdAt.toISOString() : null,
    })) as User[];

    if(allUsers.length < 1) return null;

  return (
    <section className="w-full rounded-2xl bg-white p-4">
        <AllUser users={allUsers} />
      
    </section>
  );
};

export default page;

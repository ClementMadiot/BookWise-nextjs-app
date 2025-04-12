import React from "react";
import Title from "@/components/admin/Title";
import AllList from "@/components/admin/AllList";
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
      <Title title="All Users" />

        <AllList users={allUsers} />
      
    </section>
  );
};

export default page;

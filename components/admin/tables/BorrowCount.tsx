"use client";
import { countUserBorrowedBooks } from "@/lib/admin/action/user";
import React, { useEffect, useState } from "react";

const BorrowCount = ({ users }: { users: string }) => {
  const [borrowedBooksCounts, setBorrowedBooksCounts] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const fetchBorrowedBooksCounts = async () => {
      const counts: Record<string, number> = {};

      // Directly assign the result to counts[users]
      counts[users] = await countUserBorrowedBooks(users);

      setBorrowedBooksCounts(counts);
    };

    fetchBorrowedBooksCounts();
  }, [users]);

  return <>{borrowedBooksCounts[users] ?? "Loading..."}</>;
};

export default BorrowCount;

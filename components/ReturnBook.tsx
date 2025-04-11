"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { returnBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  coverColor?: string;
}

const ReturnBook = ({ userId, bookId, coverColor = "#3A354E" }: Props) => {
  console.log(coverColor);
  const [returning, setReturning] = useState(false);

  const handleReturnBook = async () => {
    setReturning(true);
    try {
      const result = await returnBook({ userId, bookId });

      if (result.success) {
        toast.success("Success", {
          description: "Book returned successfully",
        });
      } else {
        toast.error("Error", {
          description: "An error occurred while returning the book",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An error occurred while returning the book",
      });
    } finally {
      setReturning(false);
    }
  };

  return (
    <Button
      style={{ backgroundColor: coverColor }}
      className="!rouded-full w-9 h-9 !flex justify-center items-center px-0 relative group"
      onClick={handleReturnBook}
      disabled={returning}
    >
      <Image src="/icons/receipt.svg" alt="receipt" width={16} height={16} />
      <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
      Return Book
      </span>
    </Button>
  );
};

export default ReturnBook;

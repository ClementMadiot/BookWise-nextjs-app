"use client";
import Link from "next/link";
import Image from "next/image";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";

import ReturnBook from "./ReturnBook";
import { usePathname } from "next/navigation";
import { Book } from "@/types";

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  userId,
}: Book & { userId: string }) => {
  const pathname = usePathname();

  if (pathname === "/my-profile") {
    isLoanedBook = true;
  }
  // Convert the coverColor to rgba with 30% opacity
  const backgroundColorWithOpacity = `${coverColor}4D`;
  return (
    <li className={cn(isLoanedBook && "xs:w-66 w-full gradient-vertical rounded-2xl py-4")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        {isLoanedBook ? (
          <div
            className="px-10 py-6 rounded-xl"
            style={{ backgroundColor: backgroundColorWithOpacity }}
          >
            <BookCover coverColor={coverColor} coverImage={coverUrl} variant={'medium'} />
          </div>
        ) : (
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        )}

        <div className={cn("mt-4 px-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>
      </Link>
      {isLoanedBook && (
        <div className="mt-3 w-full px-4">
          <div className="book-loaned">
            <Image
              src="/icons/book-2.svg"
              alt="book-2"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-light-100">Borrowed on Dec 26</p>
          </div>
          <div className="flex justify-between">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days left to return</p>
            </div>
            <ReturnBook
              userId={userId}
              bookId={id}
              coverColor={backgroundColorWithOpacity}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default BookCard;

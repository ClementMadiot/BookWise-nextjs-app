"use client";
import Link from "next/link";
import Image from "next/image";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";

import ReturnBook from "./ReturnBook";
import { usePathname } from "next/navigation";

interface BookCardProps {
  id: string;
  title: string;
  genre: string;
  coverColor: string;
  coverUrl: string;
  borrowDate?: Date | null;
  dueDate?: Date | null;
  returnDate?: Date | null;
  isLoanedBook?: boolean;
  userId: string;
}

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  borrowDate,
  dueDate,
  returnDate,
  isLoanedBook = false,
  userId,
}: BookCardProps) => {
  const pathname = usePathname();

  if (pathname === "/my-profile") {
    isLoanedBook = true;
  }

  // calculate days left to due date
  const daysLeft =
    dueDate && !returnDate
      ? Math.ceil(
          (dueDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
        )
      : null;
  // Convert the coverColor to rgba with 30% opacity
  const backgroundColorWithOpacity = `${coverColor}4D`;
  return (
    <li
      className={cn(
        isLoanedBook && "xs:w-66 w-full gradient-vertical rounded-2xl py-4"
      )}
    >
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        {isLoanedBook ? (
          <div
            className="px-10 py-6 rounded-xl"
            style={{ backgroundColor: backgroundColorWithOpacity }}
          >
            <BookCover
              coverColor={coverColor}
              coverImage={coverUrl}
              variant={"medium"}
            />
          </div>
        ) : (
          <BookCover coverColor={coverColor} coverImage={coverUrl} />
        )}

        <div
          className={cn("mt-4 px-4", !isLoanedBook && "xs:max-w-40 max-w-28")}
        >
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
            <p className="text-light-100">
              Borrowed on{" "}
              {borrowDate
                ? borrowDate
                    .toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })
                    .replace(",", " \u00A0")
                : "N/A"}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="book-loaned">
              <Image
                src={
                  returnDate
                    ? "/icons/tick.svg" // If returned, show tick icon
                    : daysLeft !== null && daysLeft <= 0
                    ? "/icons/warning-2.svg" // If overdue, show warning icon
                    : "/icons/calendar.svg" // Default icon
                }
                alt={
                  returnDate
                    ? "Returned"
                    : daysLeft !== null && daysLeft <= 0
                    ? "Overdue"
                    : "Due Date"
                }
                width={18}
                height={18}
                className="object-contain"
              />
              <p className={daysLeft !== null && daysLeft <= 0 ? `text-red-900` : "text-light-100"}>
                {returnDate
                  ? `Returned on ${returnDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}`
                  : daysLeft !== null && daysLeft <= 0
                  ? "Late Return"
                  : daysLeft !== null
                  ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left to due`
                  : "N/A"}
              </p>
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

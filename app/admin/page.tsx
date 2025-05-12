import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import BookCover from "@/components/BookCover";
import { truncateText } from "./books/page";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { fetchCounts } from "@/lib/admin/action/user";

const NoPendingRequests: React.FC<{ img: string; h1: string; p: string }> = ({
  img,
  h1,
  p,
}) => (
  <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4">
    <Image src={img} alt={h1} width={195} height={145} />
    <h1 className="text-xl font-semibold text-dark-100 ">{h1}</h1>
    <p className="text-sm text-light-900">{p}</p>
  </div>
);

const page = async () => {
  // Fetching all total counts
  const borrowedBooksCount = await fetchCounts(borrowRecords);
  const totalUsersCount = await fetchCounts(users);
  const totalBooksCount = await fetchCounts(books);

  const dashboardHeader = [
    {
      title: "Borrowed Books",
      value: borrowedBooksCount,
    },
    {
      title: "Total Users",
      value: totalUsersCount,
    },
    {
      title: "Total Books",
      value: totalBooksCount,
    },
  ];
  
  const bookRequests = await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))
    .limit(5);

  const borrowRequests = await db
    .select({
      bookId: borrowRecords.bookId,
      borrowDate: borrowRecords.borrowDate,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
      title: books.title,
      author: books.author,
      genre: books.genre,
      fullName: users.fullName,
    })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"))
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .leftJoin(users, eq(users.id, borrowRecords.userId))
    .orderBy(desc(borrowRecords.createdAt))
    .limit(4);

  const accountRequests = await db
    .select()
    .from(users)
    .where(eq(users.role, "USER"))
    .orderBy(desc(users.createdAt))
    .limit(3);

  return (
    <section className="flex flex-col h-full">
      <article className="flex justify-center gap-4 mb-8">
        {dashboardHeader.map((header, index) => (
          <Card key={index} className="p-4 flex-1 flex flex-col gap-4">
            <p className="font-medium text-light-900">{header.title}</p>
            <p className="text-dark-400 font-semibold text-2xl">
              {header.value}
            </p>
          </Card>
        ))}
      </article>
      <ResizablePanelGroup direction="horizontal" className="gap-4">
        <ResizablePanel>
          <div className="flex flex-col gap-4 h-full">
            {/* Borrow Requests */}
            <Card className="p-4 flex-1 relative !shadow-none">
              <div className="flex items-center justify-between">
                <h2 className="text-dark-400 text-xl font-semibold">
                  Borrow Requests
                </h2>
                <Button className="text-primary-admin hover:bg-primary-admin/5 bg-light-300 font-semibold">
                  <Link href="/admin/borrow-records">View all</Link>
                </Button>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {borrowRequests.length > 0 ? (
                  borrowRequests.map((record) => (
                    <Link
                      key={record.bookId}
                      href={`admin/books/${record.bookId}`}
                      className="flex w-full gap-4 items-center p-3 rounded-lg bg-light-300"
                    >
                      <BookCover
                        coverColor={record.coverColor || "#FFFFFF"}
                        coverImage={record.coverUrl || ""}
                        variant={"small"}
                      />
                      <div className="flex flex-col md:items-center md:flex-row md:justify-between w-full">
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-[16px] text-dark-400">
                            {truncateText(record.title || "", 30)}
                          </p>
                          <p className="text-light-900 text-sm">
                            By{" "}
                            {(record.author
                              ? record.author.split(" ").slice(0, 2).join(" ")
                              : "") || ""}{" "}
                            ▪ {record.genre}
                          </p>
                          <div className="text-dark-200 text-xs flex gap-2 ">
                            <p className="flex gap-2">
                              {record.fullName} <span>▪</span>
                            </p>
                            <div className="flex items-center gap-2">
                              <Image
                                src={"/icons/admin/calendar.svg"}
                                width={16}
                                height={16}
                                alt="calendar"
                              />{" "}
                              {record.borrowDate
                                ? record.borrowDate.toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                    }
                                  )
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <NoPendingRequests
                    img={"/images/no-book-request.png"}
                    h1={"No Pending Book Requests"}
                    p={
                      "There are no borrow book requests awaiting your review at this time."
                    }
                  />
                )}
              </div>
            </Card>
            {/* Account Requests */}
            <Card className="w-full p-4 flex-1 flex flex-col gap-2 relative !shadow-none">
              <div className="flex items-center justify-between">
                <h2 className="text-dark-400 text-xl font-semibold">
                  Account Requests
                </h2>
                <Button className="text-primary-admin hover:bg-primary-admin/5 bg-light-300 font-semibold">
                  <Link href="/admin/account-requests">View all</Link>
                </Button>
              </div>
              {accountRequests.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {accountRequests.map((record) => (
                    <div
                      key={record.id}
                      className="flex flex-col items-center gap-4 p-2 bg-light-300 rounded-lg"
                    >
                      <Avatar>
                        <AvatarFallback className="bg-amber-100 p-2 px-3">
                          {getInitials(record?.fullName || "IN")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col max-md:hidden text-center">
                        <h1 className="font-medium text-dark-400">
                          {record.fullName}
                        </h1>
                        <p className="text-sm text-light-900">
                          {truncateText(record?.email || "", 15)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <NoPendingRequests
                  img={"/images/no-account-request.png"}
                  h1={"No Pending Account Requests"}
                  p={
                    "There are currently no account requests awaiting approval."
                  }
                />
              )}
            </Card>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {/* Recently Added Books */}
          <Card className="p-4 flex-1 overflow-hidden h-full relative !shadow-none">
            <div className="flex items-center justify-between">
              <h2 className="text-dark-400 text-xl font-semibold">
                Recently Added Books
              </h2>
              <Button className="text-primary-admin hover:bg-primary-admin/5 bg-light-300 font-semibold">
                <Link href="/admin/books">View all</Link>
              </Button>
            </div>
            <div className="flex flex-col flex-start gap-4 mt-4">
              <Button className="bg-light-300 text-dark-400 font-meduim text-lg hover:bg-primary-admin/10 flex w-full p-4 py-8 rounded-lg text-left">
                <Link
                  href={"/admin/books/new"}
                  className="flex w-full gap-4 items-center"
                >
                  <div className="bg-white rounded-full p-2 flex justify-center items-center">
                    <Image
                      src={"/icons/admin/plus.svg"}
                      width={20}
                      height={20}
                      alt="plus"
                    />
                  </div>
                  Add New Book
                </Link>
              </Button>

              {bookRequests.map((record) => (
                <Link
                  key={record.id}
                  href={`admin/books/${record.id}`}
                  className="flex w-full gap-4 items-center p-3 rounded-lg "
                >
                  <BookCover
                    coverColor={record.coverColor}
                    coverImage={record.coverUrl}
                    variant={"small"}
                  />

                  <div className="flex flex-col md:items-center  md:flex-row md:justify-between w-full">
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-[16px] text-dark-400">
                        {truncateText(record.title, 50)}
                      </p>
                      <p className="text-light-900 text-sm">
                        By {record.author.split(" ").slice(0, 2).join(" ")} ▪{" "}
                        {record.genre}
                      </p>
                      <div className="text-dark-200 text-xs flex gap-2 ">
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/icons/admin/calendar.svg"}
                            width={16}
                            height={16}
                            alt="calendar"
                          />{" "}
                          {record.createdAt
                            ? record.createdAt.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              })
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default page;

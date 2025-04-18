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
import { eq } from "drizzle-orm";
import Image from "next/image";
import BookCover from "@/components/BookCover";
import { truncateText } from "./books/page";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const page = async () => {
  const dashboard = (
    await db
      .select({
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        title: books.title,
        author: books.author,
        createdAt: books.createdAt,
        genre: books.genre,
        borrowDate: borrowRecords.borrowDate,
        id: borrowRecords.id,
        userId: borrowRecords.userId,
        bookId: borrowRecords.bookId,
        fullName: users.fullName,
        email: users.email,
      })
      .from(books)
      .leftJoin(borrowRecords, eq(books.id, borrowRecords.bookId))
      .leftJoin(users, eq(users.id, borrowRecords.userId))
  ).map((record) => ({
    ...record,
    borrowDate: record.borrowDate ? new Date(record.borrowDate) : null,
    createdAt: record.createdAt ? new Date(record.createdAt) : null,
  }));

  const dashboardHeader = [
    {
      title: "Borrowed Books",
      value: "145",
    },
    {
      title: "Total Users",
      value: "317",
    },
    {
      title: "Total Books",
      value: "163",
    },
  ];
  return (
    <section>
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
          <div className="flex flex-col gap-8">
            {/* borrow request  */}
            <Card className="p-4 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-dark-400 text-xl font-semibold">
                  Borrow Requests
                </h2>
                <Button className="text-primary-admin hover:bg-primary-admin/5 bg-light-300 font-semibold">
                  <Link href="/admin/borrow-records">View all</Link>
                </Button>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {dashboard.slice(0, 3).map((record) => (
                  <Link
                    key={record.id}
                    href={`admin/books/${record.bookId}`}
                    className="flex w-full gap-4 items-center p-3 rounded-lg bg-light-300"
                  >
                    <BookCover
                      coverColor={record.coverColor}
                      coverImage={record.coverUrl}
                      variant={"small"}
                    />
                    <div className="flex flex-col md:items-center  md:flex-row md:justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-[16px] text-dark-400">
                          {truncateText(record.title, 30)}
                        </p>
                        <p className="text-light-900 text-sm">
                          By {record.author.split(" ").slice(0, 2).join(" ")} ▪{" "}
                          {record.genre}
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
                              ? record.borrowDate.toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })
                              : "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="p-2 flex justify-center items-center">
                        <Image
                          src="/icons/eye.svg"
                          alt="eye"
                          width={20}
                          height={20}
                          className="text-dark-400"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
            {/* Account request  */}
            <Card className="w-full p-4 flex-1 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-dark-400 text-xl font-semibold">
                  Account Requests
                </h2>
                <Button className="text-primary-admin hover:bg-primary-admin/5 bg-light-300 font-semibold">
                  <Link href="/admin/account-requests">View all</Link>
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {dashboard.slice(0, 6).map((record) => (
                  <div
                    key={record.id}
                    className="flex flex-col items-center gap-4 p-2 bg-light-300 rounded-lg"
                  >
                    <Avatar>
                      <AvatarFallback className="bg-amber-100">
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
            </Card>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {/* Recently added books */}
          <Card className="p-4 flex-1 overflow-hidden">
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

              {dashboard.slice(0, 5).map((record) => (
                <Link
                  key={record.id}
                  href={`admin/books/${record.bookId}`}
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
                          {record.borrowDate
                            ? record.borrowDate.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              })
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="p-2 flex justify-center items-center">
                      <Image
                        src="/icons/eye.svg"
                        alt="eye"
                        width={20}
                        height={20}
                        className="text-dark-400"
                      />
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

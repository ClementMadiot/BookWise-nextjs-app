import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  // fetch data based on the id
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");
  console.log(bookDetails);
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      {/* video trailer  */}
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>

          {/* Book summary  */}
          <section className="mt-1 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {/* Split the summary by new line and map each line to a paragraph  */}
              {/* This is to avoid having a single long paragraph  */}
              {bookDetails.summary.split("\n").map((line, index) => (
                <p key={index}>
                  {line}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* SIMILAR BOOKS */}
      </div>
    </>
  );
};

export default page;

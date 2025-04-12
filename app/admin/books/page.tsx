import AllBooks from "@/components/admin/AllBooks";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import Link from "next/link";

const page = async () => {
  const allBooks = (await db
    .select()
    .from(books)).map(book => ({
    ...book,
    createdAt: book.createdAt ? book.createdAt.toISOString() : null,  
    })) as Book[];

    if(allBooks.length < 1) return null;
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href={"/admin/books/new"} className="text-white hover:!bg-primary-admin/95">
            + Create a New Books
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <AllBooks books={allBooks} />
      </div>
    </section>
  );
};

export default page;

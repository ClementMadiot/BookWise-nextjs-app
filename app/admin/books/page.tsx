import AllBooks from "@/components/admin/AllBooks";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const page = async () => {
  const allBooks = (await db
    .select()
    .from(books)).map(book => ({
    ...book,
    createdAt: book.createdAt ? book.createdAt.toISOString() : null,  
    })) as Book[];

    if(allBooks.length < 1) return null;
  return (
    <section className="w-full rounded-2xl bg-white px-4">
      <div className="w-full overflow-hidden ">
        <AllBooks books={allBooks} />
      </div>
    </section>
  );
};

export default page;

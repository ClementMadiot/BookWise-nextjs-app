import SearchPageClient from "@/components/SearchPageClient";
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';


const page = async () => {
  const searchBooks = await db.select().from(books).limit(10);

  return (
    <section className="flex flex-col items-center gap-8 w-full">
      <SearchPageClient books={searchBooks} />
    </section>
  );
};

export default page;

import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { Book } from "@/types";
import { desc } from "drizzle-orm";

const Home = async () => {
  // display new book to home page
  const sesion = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
  // fetch data from database
  // const result = await db.select().from(users);
  // console.log(JSON.stringify(result, null, 2));

  return (
    <>
      <BookOverview 
      // {...sampleBooks[0]} 
      {...latestBooks[0]} 
      userId={sesion?.user?.id as string}
      />
      

      <BookList
        title="Latest Books"
        containerClassName="mt-28"
        // books={sampleBooks}
        books={latestBooks.slice(1)}
      />
    </>
  );
};
export default Home;

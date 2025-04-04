import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  // fetch data from database
  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));

  return (
    <>
      <BookOverview
        {...{
          ...sampleBooks[0],
          totalCopies: sampleBooks[0].total_copies,
          availableCopies: sampleBooks[0].available_copies,
        }}
      />

      <BookList
        title="Latest Books"
        books={sampleBooks.map(book => ({
          ...book,
          totalCopies: book.total_copies,
          availableCopies: book.available_copies,
        }))}
        containerClassName="mt-28"
      />
    </>
  );
};
export default Home;

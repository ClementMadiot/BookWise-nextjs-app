import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import BookDetails from "@/components/admin/BookDetails";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

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
    <Button asChild className="back-btn">
        <Link href={"/admin/books"}>
          <Image
            src="/icons/admin/arrow-left.svg"
            alt="back"
            width={18}
            height={18}
          />
          Go Back
        </Link>
      </Button>

      <section className="w-full">
        <BookDetails {...bookDetails} />
      </section>
    </>
  );
};

export default page;

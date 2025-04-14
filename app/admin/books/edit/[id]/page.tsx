
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import BookForm from "@/components/admin/forms/BookForm";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";


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

      <section className="w-full max-w-2xl">
        <BookForm type="update" {...bookDetails} />
      </section>
    </>
  );
};

export default page;

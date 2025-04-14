import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import BookForm from "@/components/admin/forms/BookForm";
import Image from "next/image";

const page = () => {
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
        <BookForm type="create" />
      </section>
    </>
  );
};

export default page;

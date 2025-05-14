"use client";
import React, { useState } from "react";

import BookList from "./BookList";
import SearchBar from "./SearchBar";

const SearchPageClient = ({ books }: { books: any[] }) => {
  const [showBookList, setShowBookList] = useState(true);

  return (
    <>
      <article className="flex flex-col text-center gap-12 md:w-[630px]">
        <p className="uppercase text-light-100 font-semibold text-lg">
          Discover Your Next Great Read:
        </p>
        <h1 className="text-white text-center font-semibold text-3xl lg:text-5xl">
          Explore and Search for{" "}
          <span className="text-light-200">Any Book</span> In Our Library
        </h1>
        <SearchBar setShowBookList={setShowBookList} />
      </article>
      {showBookList && (
        <BookList
          title="Search Results"
          containerClassName="mt-28"
          titleClassName="font-semibold text-2xl lg:text-3xl text-light-100 font-ibm-plex-sans"
          books={books.slice(1)}
        />
      )}
    </>
  );
};

export default SearchPageClient;

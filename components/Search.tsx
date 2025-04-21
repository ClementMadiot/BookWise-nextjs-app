"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFiles } from "@/lib/admin/action/search";

interface Suggestion {
  id: string;
  name?: string;
  title?: string;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions from the server
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      const { documents } = await getFiles(query);
      setSuggestions(documents);
      setOpen(true);
    };

    fetchSuggestions();
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle redirection based on selection
  const handleSelect = (item: Suggestion) => {
    setOpen(false);
    setSuggestions([]);

    // if (item.type === "users") {
    //   router.push(`/admin/users`);
    // }
    if (item.id) {
      router.push(`/admin/books/${item.id}`);
    } else {
      return;
    }
  };

  return (
    <div
      ref={searchRef}
      className="relative flex items-center w-full max-w-[450px] max-h-[52px]"
    >
      <div className="absolute left-3">
        <SearchIcon className="text-muted-foreground" />
      </div>
      <Input
        placeholder="Search books by title"
        className="pl-12 !focus-visible:ring-[0px] h-[50px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {open && (
        <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 shadow-lg transition-all duration-300 ease-in-out">
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-2 hover:bg-light-300 rounded-lg cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                <div>
                  <p className="font-medium text-dark-400">
                    {item.name || item.title}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li className="flex items-center gap-4 p-2 rounded-lg text-dark-400">
              <div>
                <p className="font-medium text-dark-400">Book not found</p>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;

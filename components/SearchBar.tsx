"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { getFiles } from "@/lib/admin/action/search";
import { cn } from "@/lib/utils";
import Suggestion from "@/app/admin/search/suggestion";

export interface SuggestionProps {
  id: string;
  name?: string;
  title?: string;
}

const SearchBar = ({
  setShowBookList,
}: {
  setShowBookList?: (show: boolean) => void;
}) => {
  const [query, setQuery] = useState("");
  const [getSuggestions, setGetSuggestions] = useState<SuggestionProps[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Fetch suggestions from the server
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setGetSuggestions([]);
        setOpen(false);
        setShowBookList?.(true);
        return;
      }
      
      const { documents } = await getFiles(query);
      setGetSuggestions(documents);
      setOpen(true);
      setShowBookList?.(false);
    };

    fetchSuggestions();
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (isAdmin) {
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
    }
    if (getSuggestions.length === 0 || query === "") setOpen(false);
  }, []);

  // Handle redirection based on selection
  const handleSelect = (item: SuggestionProps) => {
    setOpen(false);
    setGetSuggestions([]);

    // if (item.type === "users") {
    //   router.push(`/admin/users`);
    // }
    if (item.id && isAdmin) {
      router.push(`/admin/books/${item.id}`);
    } else {
      router.push(`/books/${item.id}`);
      return;
    }
  };

  return (
    <div
      ref={searchRef}
      className={cn(
        isAdmin ? "max-w-[450px] max-h-[52px]" : "justify-center",
        "relative flex items-center w-full"
      )}
    >
      <div className="flex flex-col w-full">
        <div
          className={cn(
            isAdmin ? "border border-input" : "bg-dark-300",
            "flex items-center rounded-md pl-2"
          )}
        >
          <SearchIcon
            className={cn(
              isAdmin ? "text-muted-foreground" : "text-light-200 "
            )}
          />
          <Input
            placeholder="Search books by title"
            className={cn(
              isAdmin
                ? "!focus-visible:ring-[0px] placeholder:text-muted-foreground"
                : " text-white bg-dark-300 border-none",
              "h-[50px] "
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {open && (
          <Suggestion
            getSuggestions={getSuggestions}
            handleSelect={handleSelect}
            query={query}
            setQuery={setQuery}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;

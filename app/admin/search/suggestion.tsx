import { SuggestionProps } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SuggestionComponentProps {
  getSuggestions: SuggestionProps[];
  handleSelect: (item: SuggestionProps) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
}

const Suggestion = ({
  getSuggestions,
  handleSelect,
  query,
  setQuery,
  isAdmin,
}: SuggestionComponentProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuery("");
  };
  return (
    <>
      {getSuggestions.length > 0 ? (
        <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 shadow-lg transition-all duration-300 ease-in-out">
          {getSuggestions.map((item) => (
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
          ))}
        </ul>
      ) : isAdmin ? (
        <ul className="hidden" />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-start w-full self-stretch">
            <h2 className="font-semibold text-2xl lg:text-3xl text-light-100 my-8">
              Search Result for <span className="text-light-200">{query}</span>
            </h2>
          </div>
          <article className="flex items-center flex-col gap-6 text-center md:w-[360px]">
            <Image
              src={"/images/no-books.png"}
              alt="no-books"
              width={200}
              height={200}
            />
            <h3 className="text-white font-semibold text-xl lg:text-2xl">
              No books found
            </h3>

            <p className="text-light-100">
              We couldn’t find any books matching your search. Try using
              different keywords or check for typos.
            </p>
            <Button
              className="uppercase w-full font-bebas-neue text-xl py-5"
              onClick={handleClick}
            >
              clear search
            </Button>
          </article>
        </div>
      )}
    </>
  );
};

export default Suggestion;

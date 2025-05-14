import { Session } from "next-auth";
import React from "react";
import SearchBar from "../SearchBar";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-dark-400 font-semibold text-2xl">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all of your users and books here
        </p>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;

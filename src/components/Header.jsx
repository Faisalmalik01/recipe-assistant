
import React from "react";
import { Search } from "lucide-react";

const Header = ({ onSearch, searchTerm }) => (
  <div className="mb-14 text-center w-full animate-fade-in-up">
    <div className="mx-auto relative max-w-xl">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearch}
        placeholder=" Type a cuisine name—'Mexican', 'Thai', 'French'… and explore"
        className="w-full pl-12 pr-6 py-4 rounded-2xl shadow-lg bg-white dark:bg-[#2C2C2E]/80
          text-base text-slate-900 dark:text-[#F5F5F7]
          placeholder:text-gray-500 dark:placeholder:text-[#A1A1A1]
          border border-transparent dark:border-[#3A3A3C]
          backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 
          transition-all duration-300 ease-in-out"
        aria-label="Search recipes"
        autoFocus
        spellCheck={false}
      />
      <Search
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary dark:text-accent"
        size={23}
        aria-hidden
      />
    </div>
  </div>
);

export default Header;
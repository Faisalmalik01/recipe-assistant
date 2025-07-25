import React, { useState } from "react";

const CATEGORIES = ["All", "Italian", "Egyptian", "Indian"];

const CategoryTabs = ({ onSelect }) => {
  const [active, setActive] = useState("All");

  const handleTab = (category) => {
    setActive(category);
    onSelect(category === "All" ? "" : category);
  };

  return (
    <div className="flex flex-wrap gap-6 mb-10 select-none justify-center items-center">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        const base =
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out";
        const activeStyle =
          "bg-primary text-white shadow-md dark:shadow dark:bg-accent";
        const inactiveStyle =
          "bg-primary-light dark:bg-[#2C2C2E]/70 text-primary dark:text-accent border border-primary/20 dark:border-[#3A3A3C] hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-white";

        return (
          <button
            key={cat}
            onClick={() => handleTab(cat)}
            type="button"
            className={`${base} ${isActive ? activeStyle : inactiveStyle}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
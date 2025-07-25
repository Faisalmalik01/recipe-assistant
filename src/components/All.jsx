// src/components/All.jsx
import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import FeaturedCarousel from "./FeaturedCarousel";
import Header from "./Header";
import CategoryTabs from "./CategoryTabs";
import RecipeGrid from "./RecipeGrid";
import RecipeDetail from "./RecipeDetail";

const All = ({ setSelectedRecipeId, selectedRecipeId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Optional: scroll to explore section on new search
  useEffect(() => {
    if (searchTerm) {
      document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchTerm]);

  return (
    <main className="min-h-screen pb-20 bg-white dark:bg-[#1C1C1E] transition-colors duration-300">
      <HeroSection />
      <section
        id="explore"
        className="px-4 sm:px-6 py-14 sm:py-20 max-w-6xl mx-auto relative bg-white dark:bg-transparent transition-colors duration-300"
      >
        <FeaturedCarousel onSelectRecipe={setSelectedRecipeId} />
        <Header
          onSearch={(e) => setSearchTerm(e.target.value)}
          searchTerm={searchTerm}
        />
        <CategoryTabs onSelect={(category) => setSearchTerm(category)} />
        <RecipeGrid
          searchQuery={searchTerm}
          onSelectRecipe={setSelectedRecipeId}
        />
        {selectedRecipeId && (
          <RecipeDetail
            id={selectedRecipeId}
            onClose={() => setSelectedRecipeId(null)}
          />
        )}
      </section>
    </main>
  );
};

export default All;
// src/components/RecipeGrid.jsx
import React, { useEffect, useState } from "react";
import { Heart, Clock, Users } from "lucide-react";

const RecipeGrid = ({ searchQuery, onSelectRecipe }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage?.getItem("favorites") || "[]"));
  }, []);

  const toggleFavorite = (meal) => {
    const exists = favorites.find((m) => m.idMeal === meal.idMeal);
    const updated = exists
      ? favorites.filter((m) => m.idMeal !== meal.idMeal)
      : [...favorites, meal];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = id => favorites.some(m => m.idMeal === id);

  useEffect(() => {
    if (!searchQuery) {
      setRecipes([]);
      return;
    }
    setLoading(true);
    fetch(`${import.meta.env.VITE_MEALDB_FILTER_URL}${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => setRecipes(data.meals || []))
      .catch(() => setRecipes([]))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  if (loading)
    return (
      <div className="text-center py-16 text-xl flex flex-col items-center gap-2 text-slate-700 dark:text-[#F5F5F7]">
        <div className="animate-spin rounded-full h-7 w-7 border-2 border-primary border-t-accent"></div>
        Searching recipes...
      </div>
    );

  if (!recipes.length && !!searchQuery)
    return (
      <div className="text-center py-20 text-slate-600 dark:text-[#F5F5F7]/70">
        <div className="text-3xl mb-3 text-primary-light">—</div>
        <div className="mb-3 text-lg font-light">
          No results found for <span className="font-medium">{searchQuery}</span>
        </div>
        <div className="text-sm text-gray-400 dark:text-[#A1A1A1]">Try a different region, style, or spelling.</div>
      </div>
    );

  if (!searchQuery)
    return (
      <div className="text-center py-16 text-gray-400 dark:text-[#999999] text-sm italic">
        Ready for new flavors? Search by country or category to begin!
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {recipes.map((meal) => (
          <article
            tabIndex={0}
            key={meal.idMeal}
            className="group cursor-pointer outline-none focus:ring-4 focus:ring-primary/30 rounded-2xl"
            aria-label={`Recipe: ${meal.strMeal}`}
            onClick={() => onSelectRecipe(meal.idMeal)}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && onSelectRecipe(meal.idMeal)}
            role="button"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md 
              bg-white dark:bg-[#2C2C2E]/80 
              group-hover:shadow-xl transition duration-300 backdrop-blur-md">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <button
                aria-label={isFavorite(meal.idMeal) ? "Unsave" : "Save to favorites"}
                tabIndex={0}
                onClick={e => {
                  e.stopPropagation();
                  toggleFavorite(meal);
                }}
                className={`absolute top-3 right-3 p-2 rounded-full shadow-md 
                  bg-white/80 dark:bg-[#1C1C1E]/80 ring-1 ring-white dark:ring-[#3A3A3C] 
                  text-primary dark:text-accent hover:bg-primary hover:text-white 
                  transition-all ${isFavorite(meal.idMeal) ? "bg-primary text-white" : ""}`}
              >
                <Heart size={18} fill={isFavorite(meal.idMeal) ? "currentColor" : "none"} />
              </button>
            </div>

            {/* ✅ FIXED TITLE VISIBILITY */}
            <div className="space-y-1 px-1">
              <h3 className="font-medium text-base md:text-lg line-clamp-2 
                text-slate-800 dark:text-[#F5F5F7] 
                group-hover:text-primary dark:group-hover:text-accent 
                transition-colors duration-300 ease-in-out">
                {meal.strMeal}
              </h3>
              <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-[#A1A1A1]">
                <span className="flex items-center gap-1">
                  <Clock size={13} /> 30 min
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} /> 4 servings
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
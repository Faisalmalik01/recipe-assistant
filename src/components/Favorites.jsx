
// src/components/Favorites.jsx
import React, { useEffect, useState } from "react";
import { Heart, Clock, Users, ArrowLeft } from "lucide-react";

const Favorites = ({ onSelectRecipe, onBack }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage?.getItem("favorites") || "[]"));
  }, []);

  const removeFavorite = (mealId) => {
    const updated = favorites.filter((m) => m.idMeal !== mealId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1C1C1E] text-slate-800 dark:text-[#F5F5F7] transition-colors duration-300 px-4 sm:px-6 pb-20">
      {!favorites.length ? (
        <div className="text-center py-20">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center mb-8 gap-2 text-primary dark:text-accent hover:bg-primary-light dark:hover:bg-[#FFD60033] px-4 py-2 rounded-full font-medium transition"
            >
              <ArrowLeft size={21} /> Explore
            </button>
          )}
          <Heart size={48} className="text-primary-light dark:text-[#FFD60066] mx-auto mb-5" />
          <h3 className="text-lg font-light mb-2">No favorites yet</h3>
          <p className="text-gray-400 dark:text-[#A1A1A1]">Explore and add your must-keep recipes!</p>
        </div>
      ) : (
        <>
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 mb-8 text-primary dark:text-accent hover:bg-primary-light dark:hover:bg-[#FFD60033] px-4 py-2 rounded-full font-medium transition"
            >
              <ArrowLeft size={21} /> Explore
            </button>
          )}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-light mb-1 text-primary dark:text-accent">Your Favorite Recipes</h2>
            <p className="text-gray-500 dark:text-[#A1A1A1]">
              {favorites.length} recipe{favorites.length !== 1 ? "s" : ""} saved
            </p>
          </div>

          {/* Match RecipeGrid layout */}
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {favorites.map((meal) => (
                <article
                  key={meal.idMeal}
                  className="group cursor-pointer outline-none focus:ring-4 focus:ring-primary/30 rounded-2xl"
                  onClick={() => onSelectRecipe?.(meal.idMeal)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Recipe: ${meal.strMeal}`}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && onSelectRecipe?.(meal.idMeal)
                  }
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md 
                    bg-white dark:bg-[#2C2C2E]/80 group-hover:shadow-xl transition duration-300 backdrop-blur-md">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                      loading="lazy"
                    />
                    <button
                      aria-label="Remove from favorites"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(meal.idMeal);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary-light dark:hover:bg-accent hover:text-primary dark:hover:text-white transition"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>
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
        </>
      )}
    </div>
  );
};

export default Favorites;
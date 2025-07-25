import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";

const FeaturedCarousel = ({ onSelectRecipe }) => {
  const [featured, setFeatured] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
         import.meta.env.VITE_MEALDB_URL
        );
        const data = await res.json();
        setFeatured(data.meals?.slice(0, 5) || []);
      } catch (error) {
        setFeatured([]);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (!featured.length) return;
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % featured.length),
      5000
    );
    return () => clearInterval(timer);
  }, [featured]);

  if (!featured.length) return null;
  const dish = featured[current];

  return (
    <div className="mb-12">
      <h3 className="text-xl font-light mb-6 text-center text-primary dark:text-accent">
        Spotlight Recipe
      </h3>
      <div className="relative max-w-3xl mx-auto group">
        <div
          className="aspect-[16/7] rounded-3xl overflow-hidden shadow-xl 
          bg-white dark:bg-[#2C2C2E]/80 backdrop-blur-md border border-neutral-200 dark:border-[#3A3A3C]"
        >
          <img
            src={dish.strMealThumb}
            alt={dish.strMeal}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-7 py-6 flex items-end 
            bg-gradient-to-t from-white/90 dark:from-[#1C1C1E]/80 to-transparent"
          >
            <div>
              <h4 className="text-xl font-medium text-primary dark:text-[#F5F5F7] drop-shadow">
                {dish.strMeal}
              </h4>
              <button
                onClick={() => onSelectRecipe?.(dish.idMeal)}
                className="inline-flex items-center gap-2 py-2 px-5 rounded-full 
  bg-primary-light dark:bg-[#FFD60033] text-primary dark:text-accent 
  hover:bg-primary dark:hover:bg-accent hover:text-white dark:hover:text-white 
  font-medium transition"
                type="button"
              >
                <Play size={17} /> Quick View
              </button>
            </div>
          </div>
        </div>

        {/* Slide Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {featured.map((_, idx) => (
            <button
              aria-label={`Switch to highlighted recipe ${idx + 1}`}
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 
                ${
                  idx === current
                    ? "w-7 bg-primary dark:bg-accent"
                    : "w-2 bg-primary-light dark:bg-[#FFD60033]"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;

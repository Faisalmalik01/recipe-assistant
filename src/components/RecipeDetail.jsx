// src/components/RecipeDetail.jsx
import React, { useEffect, useState } from "react";
import { X, Clock, Users } from "lucide-react";

const RecipeDetail = ({ id, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_MEALDB_LOOKUP_URL}${id}`)
      .then((res) => res.json())
      .then((data) => setDetail(data.meals[0]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="fixed inset-0 z-[99] bg-black/60 flex items-center justify-center">
        <div className="bg-white dark:bg-[#2C2C2E] text-slate-800 dark:text-[#F5F5F7] 
          rounded-xl px-8 py-10 flex flex-col items-center shadow-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-accent mb-6" />
          <span>Loading details…</span>
        </div>
      </div>
    );

  if (!detail) return null;

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    name: detail[`strIngredient${i + 1}`],
    amt: detail[`strMeasure${i + 1}`],
  })).filter((it) => it.name && it.name.trim());

  let yt = "";
  if (detail.strYoutube) {
    const urlId = detail.strYoutube.split("v=")[1]?.slice(0, 11);
    yt = `${import.meta.env.VITE_YT_EMBED_BASE}${urlId}`;

  }

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="relative max-w-5xl w-full bg-white dark:bg-[#1C1C1E] text-slate-800 dark:text-[#F5F5F7] 
        rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto transition">
        {/* Image & Close */}
        <div className="relative">
          <img
            src={detail.strMealThumb}
            alt={detail.strMeal}
            loading="lazy"
            className="w-full h-56 md:h-72 object-cover"
          />
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-5 p-2 bg-primary text-white rounded-full shadow hover:bg-primary-light hover:text-primary transition"
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        {/* Details */}
        <div className="px-4 sm:px-8 py-7 space-y-10">
          <header>
            <h2 className="text-3xl font-semibold mb-3 text-primary dark:text-accent">{detail.strMeal}</h2>
            <div className="flex gap-7 items-center text-gray-500 dark:text-[#A1A1A1] text-base mb-1">
              <span className="flex gap-2 items-center">
                <Clock size={18} /> 30–45 min
              </span>
              <span className="flex gap-2 items-center">
                <Users size={18} /> 4 servings
              </span>
            </div>
            <div className="text-gray-400 dark:text-[#999999] text-sm mt-2">
              {detail.strArea} • {detail.strCategory}
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <section>
              <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
              <ul className="divide-y divide-primary-light dark:divide-[#3A3A3C]">
                {ingredients.map((item, i) => (
                  <li key={i} className="flex justify-between py-2">
                    <span>{item.name}</span>
                    <span className="text-xs text-gray-400 dark:text-[#A1A1A1]">{item.amt}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section className="md:pl-3">
              <h3 className="font-semibold text-lg mb-3">Instructions</h3>
              <div className="prose prose-slate dark:prose-invert max-w-none text-base whitespace-pre-line">
                {detail.strInstructions}
              </div>
            </section>
          </div>

          {/* YouTube Embed */}
          {yt && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Video Guide</h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={yt}
                  title="How to cook"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
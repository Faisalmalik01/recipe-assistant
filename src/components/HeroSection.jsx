import React from "react";
import { ChefHat, Flame, Leaf, Star, ArrowRight } from "lucide-react";

const CATEGORIES = [
  { icon: <Flame size={18} />, label: "Trending" },
  { icon: <Leaf size={18} />, label: "Plant-Based" },
  { icon: <Star size={18} />, label: "Top Rated" },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[88vh] flex flex-col items-center justify-center px-4 py-16 sm:py-24 bg-gradient-to-br from-primary-light via-white to-neutral dark:from-[#1C1C1E] dark:via-[#2C2C2E] dark:to-[#1C1C1E] text-slate-900 dark:text-[#F5F5F7] transition-all duration-300 overflow-hidden">
      
      {/* Decorative SVGs */}
      <svg className="absolute left-[-60px] top-[-60px] w-[300px] md:w-[470px] h-[300px] z-0 animate-[float_7s_ease-in-out_infinite]" viewBox="0 0 300 300" aria-hidden>
        <ellipse cx="170" cy="150" rx="140" ry="95" fill="#54C06322" />
      </svg>
      <svg className="absolute right-[-80px] bottom-[-100px] w-[340px] md:w-[480px] h-[310px] z-0 animate-[floatAlt_9s_ease-in-out_infinite]" viewBox="0 0 360 330" aria-hidden>
        <ellipse cx="190" cy="180" rx="150" ry="90" fill="#FFD6001a" />
      </svg>

      <div className="z-10 flex flex-col items-center text-center max-w-2xl w-full">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-white/90 dark:bg-[#2C2C2E]/80 rounded-full font-bold text-primary text-xs sm:text-sm tracking-widest shadow mb-5 sm:mb-7 animate-fade-in-down backdrop-blur-md border border-neutral-300 dark:border-[#3A3A3C]">
          <ChefHat size={16} /> From Crave to Plate
        </span>

        {/* Responsive Headline */}
        <h1 className="font-hero font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-3 sm:mb-4 animate-fade-in-up bg-gradient-to-r from-[#FFD600] via-primary to-yellow-400 bg-clip-text text-transparent dark:from-[#FFD600] dark:via-[#FFD600] dark:to-yellow-300 drop-shadow-xl transition-colors" style={{ fontFamily: "'Clash Display', ui-sans-serif, Inter, sans-serif" }}>
          Your Personal Recipe Assistant.
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg font-medium max-w-xl mb-8 sm:mb-10 animate-fade-in-up transition-colors duration-300 text-slate-700 dark:text-[#D1D1D1] px-2">
          Discover, save, and cook with ease. Find recipes tailored to your taste, ready in minutes, and made to impress.
        </p>

        {/* Call to Action */}
        <button
          onClick={() =>
            document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })
          }
          className="group flex items-center gap-2 px-7 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#FFD600] to-yellow-400 text-[#1C1C1E] text-base sm:text-lg font-bold rounded-full shadow-xl backdrop-blur-xl hover:scale-105 active:scale-98 transition-all focus:ring-2 focus:ring-yellow-400 animate-fade-in-up"
        >
          Find My Next Recipe
          <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
        </button>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 justify-center mt-10 sm:mt-12 px-2 z-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              tabIndex={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-[11px] sm:text-xs bg-[#F5F5F7] dark:bg-[#2C2C2E]/80 text-primary border border-primary/20 dark:border-[#3A3A3C] ring-1 ring-primary/10 dark:ring-[#FFD60022] cursor-pointer backdrop-blur-md shadow-md focus:ring-2 focus:ring-primary focus:outline-none hover:bg-primary hover:text-white active:scale-95 transition duration-300"
              aria-label={`${cat.label} recipes`}
              onClick={() =>
                document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })
              }
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
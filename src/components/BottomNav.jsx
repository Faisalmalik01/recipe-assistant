
import React from "react";
import { Home, Heart, Users, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const tabs = [
  { key: "/", icon: Home, label: "Home" },
  { key: "/favorites", icon: Heart, label: "Favorites" },
  { key: "/community", icon: Users, label: "Community" },
];

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 h-16 px-2 bg-white dark:bg-[#2C2C2E]/80 
        backdrop-blur-md shadow-[0_-4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_12px_rgba(0,0,0,0.4)] 
        border-t border-neutral-200 dark:border-[#3A3A3C] rounded-t-xl flex items-center justify-around"
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => navigate(tab.key)}
          className={`flex flex-col items-center justify-center flex-1 text-xs font-medium transition-all 
            ${location.pathname === tab.key 
              ? "text-primary dark:text-accent" 
              : "text-gray-400 dark:text-[#A1A1A1] hover:text-primary dark:hover:text-accent"}`}
        >
          <tab.icon size={22} />
          <span className="mt-1">{tab.label}</span>
        </button>
      ))}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex flex-col items-center justify-center flex-1 text-xs font-medium text-primary dark:text-accent"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
        <span className="mt-1">{theme === "light" ? "Dark" : "Light"}</span>
      </button>
    </nav>
  );
}

export default BottomNav;
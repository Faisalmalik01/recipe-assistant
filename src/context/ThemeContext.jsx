import React, { createContext, useEffect, useState, useContext } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Detect system preference or use localStorage
 const getInitial = () => {
  if (typeof localStorage !== "undefined" && localStorage.theme)
    return localStorage.theme;
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    return "dark";
  return "light";
};
const [theme, setTheme] = useState(getInitial);
  useEffect(() => {
    localStorage.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// src/app/theme-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: (t: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children, defaultTheme = "serika" }: { children: React.ReactNode; defaultTheme?: string; }) {
  const [theme, setThemeState] = useState<string>(() => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem("tortoise_theme") || defaultTheme;
      }
    } catch {}
    return defaultTheme;
  });

  useEffect(() => {
    // apply class to html element so css variables affect whole page
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      // remove any previous theme classes we know about
      ["serika", "dracula", "nord", "carbon"].forEach((c) => html.classList.remove(c));
      html.classList.add(theme);
    }

    try {
      localStorage.setItem("tortoise_theme", theme);
    } catch {}

  }, [theme]);

  const setTheme = (t: string) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

"use client";


import { createContext, useState, useContext } from "react";
import React from "react";


interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}


const ThemeContext = createContext<ThemeContextType | null>(null);


export function ThemeProvider({ children, defaultTheme }: { children: React.ReactNode; defaultTheme: string }) {
  const [theme, setTheme] = useState(defaultTheme);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
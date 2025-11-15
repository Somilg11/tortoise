// src/components/controls/difficulty-selector.tsx
"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

export default function DifficultySelector() {
  const [difficulty, setDifficulty] = useState<string>(() => {
    try {
      return localStorage.getItem("tortoise_difficulty") || "medium";
    } catch {
      return "medium";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tortoise_difficulty", difficulty);
      try {
        // notify listeners in same window that a setting changed
        window.dispatchEvent(
          new CustomEvent("tortoise_setting_changed", {
            detail: { key: "tortoise_difficulty", value: difficulty },
          })
        );
      } catch {}
    } catch {}
  }, [difficulty]);

  return (
    <ToggleGroup type="single" value={difficulty} onValueChange={(v) => v && setDifficulty(v)}>
      <ToggleGroupItem value="easy">Easy</ToggleGroupItem>
      <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
      <ToggleGroupItem value="hard">Hard</ToggleGroupItem>
    </ToggleGroup>
  );
}

// src/components/controls/theme-switcher.tsx
"use client";

import { useTheme } from "@/app/theme-provider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={(v) => setTheme(v)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="serika">Serika</SelectItem>
        <SelectItem value="dracula">Dracula</SelectItem>
        <SelectItem value="nord">Nord</SelectItem>
        <SelectItem value="carbon">Carbon</SelectItem>
      </SelectContent>
    </Select>
  );
}

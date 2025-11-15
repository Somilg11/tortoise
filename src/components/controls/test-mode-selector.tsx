// src/components/controls/test-mode-selector.tsx
"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

export default function TestModeSelector() {
  const [time, setTime] = useState<string>(() => {
    try {
      return localStorage.getItem("tortoise_time") || "30";
    } catch {
      return "30";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tortoise_time", time);
      try {
        window.dispatchEvent(
          new CustomEvent("tortoise_setting_changed", { detail: { key: "tortoise_time", value: time } })
        );
      } catch {}
    } catch {}
  }, [time]);

  return (
    <ToggleGroup type="single" value={time} onValueChange={(v) => v && setTime(v)}>
      <ToggleGroupItem value="15">15s</ToggleGroupItem>
      <ToggleGroupItem value="30">30s</ToggleGroupItem>
      <ToggleGroupItem value="60">60s</ToggleGroupItem>
      <ToggleGroupItem value="120">120s</ToggleGroupItem>
    </ToggleGroup>
  );
}

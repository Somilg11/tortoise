import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateWPM(text: string, timeSpent: number) {
  if (timeSpent === 0) return 0;
  const wordsTyped = text.trim().split(/\s+/).length;
  return Math.round((wordsTyped / timeSpent) * 60);
}

export function calculateAccuracy(words: string[], wordIndex: number, typed: string) {
  const correctWords = words.slice(0, wordIndex);
  const correct = correctWords.length;
  const total = wordIndex + (typed.trim() !== "" ? 1 : 0);
  if (total === 0) return 100;
  return Math.round((correct / total) * 100);
}
/* eslint-disable react-hooks/rules-of-hooks */
// src/hooks/useTyping.ts
"use client";

import { useState, useEffect } from "react";
import generateWords from "@/components/typing/words-generator"; // FIXED import
import { calculateWPM, calculateAccuracy } from "@/lib/utils";  // CHECK path

export function useTyping(timeLimit: number) {
  // CORE STATES
  const [words, setWords] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // 🔥 SAFETY: return fallback instead of undefined
  if (!words) {
    return {
      words: [],
      typed: "",
      wordIndex: 0,
      started: false,
      finished: false,
      timeLeft: timeLimit,
      wpm: 0,
      accuracy: 100,
      handleInput: () => {},
    };
  }

  // GENERATE WORDS
  useEffect(() => {
    try {
      const generated = generateWords(80, "medium");
      setWords(generated);
    } catch (e) {
      console.error("Word generation failed:", e);
    }
  }, []);

  // TIMER
  useEffect(() => {
    if (!started || finished) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, finished]);

  // INPUT HANDLER
  const handleInput = (v: string) => {
    if (!started) setStarted(true);
    if (finished) return;

    // SPACE → next word
    if (v.endsWith(" ")) {
      setWordIndex((i) => i + 1);
      setTyped("");
    } else {
      setTyped(v);
    }
  };

  // RESULTS
  const elapsed = timeLimit - timeLeft;
  const wpm = calculateWPM(words.slice(0, wordIndex).join(" "), elapsed);
  const accuracy = calculateAccuracy(words, wordIndex, typed);

  return {
    words,
    typed,
    wordIndex,
    started,
    finished,
    timeLeft,
    wpm,
    accuracy,
    handleInput,
  };
}

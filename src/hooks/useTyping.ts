"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import generateWords from "@/components/typing/words-generator";
import { calculateWPM, calculateAccuracy } from "@/lib/utils";

export type UseTypingOptions = {
  count?: number;
  difficulty?: "easy" | "medium" | "hard";
  includePunctuation?: boolean;
};

export function useTyping(timeLimit: number, opts: UseTypingOptions = {}) {
  const { count = 80, difficulty = "medium", includePunctuation = false } = opts;

  // core states
  const [words, setWords] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // advanced metrics
  const [timeline, setTimeline] = useState<{ t: number; wpm: number }[]>([]);
  const [keystrokes, setKeystrokes] = useState<{ t: number; kps: number }[]>([]);
  const [heatmap, setHeatmap] = useState<number[]>(Array(count).fill(0));

  const lastKeystroke = useRef<number | null>(null);
  const timeLeftRef = useRef<number>(timeLeft);

  // helper: generate initial words
  const generate = useCallback(() => {
    try {
      const w = generateWords(count, difficulty, includePunctuation);
      setWords(w);
      setHeatmap(Array(w.length).fill(0));
    } catch (e) {
      console.error("generateWords failed", e);
      setWords(["error", "loading", "words"]);
    }
  }, [count, difficulty, includePunctuation]);

  // generate words when generation options change
  useEffect(() => {
    generate();
  }, [generate]);

  // update timeLeft when timeLimit changes
  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  // timer
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

  // keep a ref to latest timeLeft for interval callbacks
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // timeline sampling — use a ref for timeLeft to avoid recreating interval every second
  useEffect(() => {
    if (!started || finished) return;
    const interval = setInterval(() => {
      const elapsed = Math.max(1, timeLimit - timeLeftRef.current);
      const wpmNow = calculateWPM(words.slice(0, wordIndex).join(" "), elapsed);
      setTimeline((prev) => [...prev, { t: elapsed, wpm: wpmNow }]);
    }, 1000);

    return () => clearInterval(interval);
    // intentionally not including timeLeft in deps — we rely on timeLeftRef
  }, [started, finished, wordIndex, words, timeLimit]);

  // when test finishes, append a final timeline sample (if not already present)
  useEffect(() => {
    if (!finished) return;
    const elapsed = Math.max(0, timeLimit - timeLeftRef.current);
    const wpmNow = calculateWPM(words.slice(0, wordIndex).join(" "), Math.max(1, elapsed));
    setTimeline((prev) => {
      if (prev.length && prev[prev.length - 1].t === Math.max(1, elapsed)) return prev;
      return [...prev, { t: Math.max(1, elapsed), wpm: wpmNow }];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  // input handler
  const handleInput = (v: string) => {
    if (finished) return;
    const now = Date.now();

    if (!started) setStarted(true);

    // kps
    if (lastKeystroke.current) {
      const diff = (now - lastKeystroke.current) / 1000;
      if (diff > 0 && diff < 1.5) {
        setKeystrokes((prev) => [...prev, { t: timeLimit - timeLeft, kps: +(1 / diff).toFixed(2) }]);
      }
    }
    lastKeystroke.current = now;

    const currentWord = words[wordIndex] || "";
    const typedClean = v.replace(/\s+$/, ""); // remove trailing space for comparison

    // compute mismatches for heatmap
    let mismatches = 0;
    for (let i = 0; i < Math.min(typedClean.length, currentWord.length); i++) {
      if (typedClean[i] !== currentWord[i]) mismatches++;
    }
    setHeatmap((h) => {
      const next = [...h];
      next[wordIndex] = currentWord.length ? mismatches / currentWord.length : 0;
      return next;
    });

    // SPACE -> commit word
    if (v.endsWith(" ")) {
      setWordIndex((i) => i + 1);
      setTyped("");
    } else {
      setTyped(v);
    }
  };

  // reset function
  const reset = useCallback(() => {
    setTyped("");
    setWordIndex(0);
    setStarted(false);
    setFinished(false);
    setTimeLeft(timeLimit);
    setTimeline([]);
    setKeystrokes([]);
    generate();
  }, [generate, timeLimit]);

  // final metrics
  const elapsed = Math.max(0, timeLimit - timeLeft);
  const wpm = calculateWPM(words.slice(0, wordIndex).join(" "), elapsed);
  const accuracy = calculateAccuracy(words, wordIndex, typed);

  return {
    words,
    typed,
    wordIndex,
    started,
    finished,
    timeLeft,
    timeline,
    keystrokes,
    heatmap,

    wpm,
    accuracy,

    handleInput,
    reset,
  };
}

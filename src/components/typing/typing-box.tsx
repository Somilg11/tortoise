// src/components/typing/typing-box.tsx
"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useTyping } from "@/hooks/useTyping";
import ResultsModal from "./results-modal";

function readSetting<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    if (v === null) return fallback;
    // try to parse numbers
    if (!isNaN(Number(v))) return (Number(v) as unknown) as T;
    return (v as unknown) as T;
  } catch {
    return fallback;
  }
}

export default function TypingBox() {
  // read persisted settings once on mount (safely)
  const [count, setCount] = useState<number>(() => readSetting<number>("tortoise_wordcount", 80));
  const [difficulty, setDifficulty] = useState<string>(() => readSetting<string>("tortoise_difficulty", "medium"));
  const [includePunctuation, setIncludePunctuation] = useState<boolean>(() => readSetting<boolean>("tortoise_punctuation", false));
  const [timeLimit, setTimeLimit] = useState<number>(() => readSetting<number>("tortoise_time", 30));
  const [applyReset, setApplyReset] = useState(false);

  const typing = useTyping(timeLimit, {
    count,
    difficulty: difficulty as "easy" | "medium" | "hard",
    includePunctuation: Boolean(includePunctuation),
  });

  // listen for same-window setting changes dispatched by selectors
  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const ev = e as CustomEvent<{ key?: string; value?: unknown }>;
        const detail = (ev.detail as { key?: string; value?: unknown } | undefined) || {};
        const { key, value } = detail;
        if (!key) return;
        if (key === "tortoise_time") setTimeLimit((v) => (Number(value) || v));
        if (key === "tortoise_difficulty") setDifficulty(String(value));
        if (key === "tortoise_wordcount") setCount((v) => (Number(value) || v));
        if (key === "tortoise_punctuation") setIncludePunctuation(Boolean(value));
        // request a reset after the new settings are applied
        setApplyReset(true);
      } catch {}
    };

    window.addEventListener("tortoise_setting_changed", handler as EventListener);
    return () => window.removeEventListener("tortoise_setting_changed", handler as EventListener);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const typedMeasureRef = useRef<HTMLSpanElement | null>(null);
  const [caretLeft, setCaretLeft] = useState(0);

  // ensure textarea is focused after restart/close modal
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, [typing.started, typing.finished]);

  // measure typed width for active word and move caret smoothly
  useLayoutEffect(() => {
    const node = typedMeasureRef.current;
    if (!node) {
      setCaretLeft(0);
      return;
    }
    // offsetWidth is reliable for width of inline content
    const w = node.offsetWidth || 0;
    setCaretLeft(w);
  }, [typing.typed, typing.wordIndex, typing.words]);

  // if settings changed and a reset was requested, call reset after the new props
  // from state have flowed into useTyping (this runs on the next render)
  useEffect(() => {
    if (!applyReset) return;
    try {
      typing.reset();
      if (textareaRef.current) textareaRef.current.focus();
    } catch {}
    setApplyReset(false);
    // intentionally only watch applyReset and typing.reset
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applyReset]);

  function renderWord(word: string, idx: number) {
    // completed words
    if (idx < typing.wordIndex) {
      const correct = typing.heatmap[idx] === 0;
      return (
        <span
          key={idx}
          className={`mr-3 whitespace-nowrap ${correct ? "text-green-400" : "text-red-400 line-through opacity-60"}`}
        >
          {word}
        </span>
      );
    }

    // active word - render per character + caret after typed length
    if (idx === typing.wordIndex) {
      const chars = word.split("");
      const typedChars = typing.typed.replace(/\s+$/, "");

      return (
        <span key={idx} className="mr-3 whitespace-nowrap inline-flex items-center relative">
          <span className="inline-flex">
            {chars.map((ch, i) => {
              const typedChar = typedChars[i];
              const isCorrect = typedChar === ch;
              const cls = typedChar == null ? "opacity-70" : isCorrect ? "text-green-300" : "text-red-400";
              return (
                <span key={i} className={`${cls} inline-block`}>
                  {ch}
                </span>
              );
            })}
          </span>

          {/* invisible measuring span used to position caret without affecting layout */}
          <span
            ref={typedMeasureRef}
            aria-hidden
            className="absolute left-0 top-0 opacity-0 pointer-events-none whitespace-nowrap"
          >
            {typedChars}
          </span>

          {/* absolute caret — does not affect layout and moves smoothly */}
          <span
            className="absolute top-0 h-6 w-0.5 bg-primary"
            style={{ left: `${caretLeft}px`, transition: "left 120ms linear" }}
          />
        </span>
      );
    }

    // future words
    return (
      <span key={idx} className="mr-3 whitespace-nowrap opacity-70">
        {word}
      </span>
    );
  }

  return (
    <div className="relative w-full min-h-[260px] bg-muted/20 rounded-xl p-6 text-xl select-none">
      <div className="flex justify-between items-center mb-3 z-20 relative">
        <div />
        <div className="flex items-center gap-3 z-20">
          <div className="text-lg font-semibold">{typing.timeLeft}s</div>
          <div>
            <Button variant={"ghost"} size="xs" onClick={() => { typing.reset(); if (textareaRef.current) textareaRef.current.focus(); }}>
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="text-foreground/80 flex flex-wrap gap-x-3 gap-y-2 relative z-10">
        {typing.words.map((w, i) => renderWord(w, i))}
      </div>

      {/* Hidden input: z-0 so buttons above are clickable */}
      <textarea
        ref={textareaRef}
        aria-label="typing-input"
        autoFocus
        value={typing.typed}
        onChange={(e) => typing.handleInput(e.target.value)}
        className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-primary outline-none resize-none z-0"
      />

      {typing.finished && (
        <ResultsModal
          wpm={typing.wpm}
          accuracy={typing.accuracy}
          timeline={typing.timeline}
          keystrokes={typing.keystrokes}
          heatmap={typing.heatmap}
        />
      )}
    </div>
  );
}

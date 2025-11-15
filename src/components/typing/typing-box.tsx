"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
// motion import removed (not used)
import { useTyping } from "@/hooks/useTyping";
import ResultsModal from "./results-modal";

export default function TypingBox() {
    const typing = useTyping(30, { count: 80, difficulty: "medium", includePunctuation: false });
    const containerRef = useRef<HTMLDivElement | null>(null);

    // render words with per-character spans
    function renderWord(word: string, idx: number) {
        // completed words
        if (idx < typing.wordIndex) {
            // determine if the completed word was correct by comparing to typed history
            // For simplicity: if heatmap[idx] === 0 => correct
            const correct = typing.heatmap[idx] === 0;
            return (
                <span key={idx} className={`mr-3 ${correct ? 'text-green-400' : 'text-red-400 line-through opacity-60'}`}>
                    {word}
                </span>
            );
        }

        // active word
        if (idx === typing.wordIndex) {
            const chars = word.split("");
            const typedChars = typing.typed.replace(/\s+$/, "").split("");

            return (
                <span key={idx} className="mr-3">
                    {chars.map((ch, i) => {
                        const typedChar = typedChars[i];
                        const isCorrect = typedChar === ch;
                        const className = typedChar == null ? "opacity-70" : isCorrect ? "text-green-300" : "text-red-400";
                        return (
                            <span key={i} className={`${className} inline-block`}>
                                {ch}
                            </span>
                        );
                    })}

                      {/* caret as inline block after typed length */}
                      <span className="inline-block w-0.5 h-6 align-middle bg-primary animate-pulse ml-1" />
                </span>
            );
        }

        // future words
        return (
            <span key={idx} className="mr-3 opacity-70">
                {word}
            </span>
        );
    }

    return (
        <div className="relative w-full min-h-[260px] bg-muted/20 rounded-xl p-6 text-xl select-none">
            <div className="flex justify-between items-center mb-3">
                <div />
                <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold">{typing.timeLeft}s</div>
                                            <div>
                                                {/* small restart button with icon */}
                                                <Button size="xs" onClick={() => typing.reset()}>
                                                    <RefreshCw className="size-4" />
                                                    Restart
                                                </Button>
                                            </div>
                </div>
            </div>

            <div ref={containerRef} className="text-foreground/80 flex flex-wrap gap-x-3 gap-y-2">
                {typing.words.map((w, i) => renderWord(w, i))}
            </div>

            {/* Hidden input */}
            <textarea
                aria-label="typing-input"
                autoFocus
                value={typing.typed}
                onChange={(e) => typing.handleInput(e.target.value)}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-primary outline-none resize-none"
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
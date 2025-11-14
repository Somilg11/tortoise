"use client";


import { motion } from "framer-motion";
import { useTyping } from "@/hooks/useTyping";
import Caret from "./caret";
import ResultsModal from "./results-modal";


export default function TypingBox() {
    const typing = useTyping(30); // uses corrected hook


    return (
        <div className="relative w-full min-h-[260px] bg-muted/20 rounded-xl p-8 text-xl select-none leading-relaxed">
            {/* Timer */}
            <p className="absolute top-4 right-6 text-lg opacity-80 font-semibold">
                {typing.timeLeft}
            </p>


            {/* Words Display */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-foreground/80 flex flex-wrap gap-x-3 gap-y-2"
            >
                {typing.words.map((word, i) => (
                    <span
                        key={i}
                        className={
                            i === typing.wordIndex
                                ? "text-primary font-semibold"
                                : i < typing.wordIndex
                                    ? "opacity-40 line-through"
                                    : "opacity-70"
                        }
                    >
                        {word}
                    </span>
                ))}
            </motion.div>


            {/* Caret */}
            <Caret />


            {/* Hidden Textarea */}
            <textarea
                autoFocus
                value={typing.typed}
                onChange={(e) => typing.handleInput(e.target.value)}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-primary outline-none resize-none"
            />


            {/* Results */}
            {typing.finished && (
                <ResultsModal
                    wpm={typing.wpm}
                    accuracy={typing.accuracy}
                />
            )}
        </div>
    );
}
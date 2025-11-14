"use client";
import { motion } from "framer-motion";


export default function TypingBox() {
    return (
        <div className="relative w-full min-h-60 bg-muted/20 rounded-xl p-8 text-xl leading-relaxed select-none">
            <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-foreground/70"
            >
                sample words will appear here in phase 4 typing logic
            </motion.div>
        </div>
    );
}
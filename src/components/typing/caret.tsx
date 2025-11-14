"use client";
import { motion } from "framer-motion";


export default function Caret() {
    return (
        <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-0.5 h-6 bg-primary absolute top-[90px] left-8"
        />
    );
}
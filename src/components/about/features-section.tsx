"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
    "Real-time WPM tracking & timeline analytics",
    "Heatmap-based mistake visualization",
    "Multiple difficulty levels & test modes",
    "Inline caret & per-character accuracy coloring",
    "Session history, CSV & PDF export",
    "Multiple themes (Serika, Dracula, Nord, Carbon)",
    "Fully responsive and keyboard-optimized UI",
    "Framer-motion animated experience",
];


export default function FeaturesSection() {
    return (
        <section className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-10">Features</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 bg-muted/20 p-4 rounded-xl"
                    >
                        <Check className="text-primary mt-1" />
                        <p>{f}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
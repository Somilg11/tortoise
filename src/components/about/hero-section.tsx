"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="text-center max-w-4xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4"
            >
                About <span className="text-primary">Tortoise</span>
            </motion.h1>


            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg opacity-80 max-w-2xl mx-auto"
            >
                Tortoise is a modern, lightning-fast typing test platform - 
                built with precision, analytics, customization, and a beautiful minimal UI.
            </motion.p>
        </section>
    );
}
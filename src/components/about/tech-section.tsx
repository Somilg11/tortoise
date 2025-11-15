"use client";

import { motion } from "framer-motion";
import { SiNextdotjs, SiReact, SiTailwindcss, SiFramer, SiTypescript } from "react-icons/si";

const tech = [
    { name: "Next.js", icon: <SiNextdotjs size={28} /> },
    { name: "React", icon: <SiReact size={28} /> },
    { name: "TypeScript", icon: <SiTypescript size={28} /> },
    { name: "TailwindCSS", icon: <SiTailwindcss size={28} /> },
    { name: "Framer Motion", icon: <SiFramer size={28} /> },
];


export default function TechSection() {
    return (
        <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-10">Tech Stack</h2>


            <div className="flex justify-center flex-wrap gap-10">
                {tech.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-2 bg-muted/20 p-5 rounded-xl w-32"
                    >
                        {t.icon}
                        <p className="text-sm opacity-80">{t.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
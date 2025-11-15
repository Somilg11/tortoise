/* eslint-disable react-hooks/set-state-in-effect */
"use client";


import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";


const fonts = [
    { label: "Inter", class: "font-inter", family: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" },
    { label: "JetBrains Mono", class: "font-jetbrains", family: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace" },
    { label: "Fira Code", class: "font-fira", family: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace" },
    { label: "Roboto Mono", class: "font-roboto", family: "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace" },
];


export default function FontSelector() {
    const [font, setFont] = useState("font-inter");


    useEffect(() => {
        const f = localStorage.getItem("tortoise_font");
        if (f) {
            setFont(f);
            // apply both class and explicit style to ensure font-family takes effect
            document.body.classList.add(f);
            const found = fonts.find((x) => x.class === f);
            if (found) document.body.style.fontFamily = found.family;
        }
    }, []);


    const update = (val: string) => {
    setFont(val);
    localStorage.setItem("tortoise_font", val);

    // remove old font classes
    fonts.forEach((f) => document.body.classList.remove(f.class));
    document.body.classList.add(val);

    // also explicitly set body fontFamily to ensure it overrides other rules
    const found = fonts.find((x) => x.class === val);
    if (found) document.body.style.fontFamily = found.family;
    };


    return (
        <div className="space-y-2">
            <p className="text-lg font-semibold">Font</p>
            <Select value={font} onValueChange={update}>
                <SelectTrigger className="w-60">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {fonts.map((f, i) => (
                        <SelectItem key={i} value={f.class}>{f.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
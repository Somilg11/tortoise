/* eslint-disable react-hooks/set-state-in-effect */
"use client";


import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";


const fonts = [
    { label: "Inter", class: "font-inter" },
    { label: "JetBrains Mono", class: "font-jetbrains" },
    { label: "Fira Code", class: "font-fira" },
    { label: "Roboto Mono", class: "font-roboto" },
];


export default function FontSelector() {
    const [font, setFont] = useState("font-inter");


    useEffect(() => {
        const f = localStorage.getItem("tortoise_font");
        if (f) {
            setFont(f);
            document.body.classList.add(f);
        }
    }, []);


    const update = (val: string) => {
        setFont(val);
        localStorage.setItem("tortoise_font", val);


        // remove old font classes
        fonts.forEach((f) => document.body.classList.remove(f.class));
        document.body.classList.add(val);
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
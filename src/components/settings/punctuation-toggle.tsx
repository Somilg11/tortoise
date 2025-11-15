/* eslint-disable react-hooks/set-state-in-effect */
"use client";


import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";


export default function PunctuationToggle() {
    const [enabled, setEnabled] = useState(false);


    useEffect(() => {
        const p = localStorage.getItem("tortoise_punctuation");
        if (p) setEnabled(p === "true");
    }, []);


    const update = (v: boolean) => {
        setEnabled(v);
        localStorage.setItem("tortoise_punctuation", String(v));
    };


    return (
        <div className="space-y-2">
            <p className="text-lg font-semibold">Include Punctuation</p>
            <div className="flex items-center gap-3">
                <Switch checked={enabled} onCheckedChange={update} />
                <span>{enabled ? "Enabled" : "Disabled"}</span>
            </div>
        </div>
    );
}
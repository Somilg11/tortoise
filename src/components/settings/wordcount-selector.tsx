/* eslint-disable react-hooks/set-state-in-effect */
"use client";


import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";


export default function WordCountSelector() {
    const [count, setCount] = useState("80");


    useEffect(() => {
        const c = localStorage.getItem("tortoise_wordcount");
        if (c) setCount(c);
    }, []);


    const update = (v: string) => {
        setCount(v);
        localStorage.setItem("tortoise_wordcount", v);
    };


    return (
        <div className="space-y-2">
            <p className="text-lg font-semibold">Word Count</p>
            <Select value={count} onValueChange={update}>
                <SelectTrigger className="w-60">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="30">30 words</SelectItem>
                    <SelectItem value="50">50 words</SelectItem>
                    <SelectItem value="80">80 words</SelectItem>
                    <SelectItem value="120">120 words</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
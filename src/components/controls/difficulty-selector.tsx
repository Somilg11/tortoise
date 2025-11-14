"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";


export default function DifficultySelector() {
    const [difficulty, setDifficulty] = useState("medium");


    return (
        <ToggleGroup type="single" value={difficulty} onValueChange={setDifficulty}>
            <ToggleGroupItem value="easy">Easy</ToggleGroupItem>
            <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
            <ToggleGroupItem value="hard">Hard</ToggleGroupItem>
        </ToggleGroup>
    );
}
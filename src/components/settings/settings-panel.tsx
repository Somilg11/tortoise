"use client";

import ThemeSelector from "./theme-selector";
import DifficultySelector from "./difficulty-selector";
import WordCountSelector from "./wordcount-selector";
import PunctuationToggle from "./punctuation-toggle";
import FontSelector from "./font-selector";

export default function SettingsPanel() {
    return (
        <div className="space-y-10 max-w-3xl">
            <ThemeSelector />
            <DifficultySelector />
            <WordCountSelector />
            <PunctuationToggle />
            <FontSelector />
        </div>
    );
}
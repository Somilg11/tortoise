import { words as baseWords } from "@/lib/words";


export type Difficulty = "easy" | "medium" | "hard";


const diffMap = {
    easy: (w: string) => w.length <= 4,
    medium: (w: string) => w.length <= 7,
    hard: (w: string) => w.length >= 5,
};


export default function generateWords(
    count: number,
    difficulty: Difficulty = "medium",
    includePunctuation = false
) {
    const pool = baseWords.filter(diffMap[difficulty]);


    const punctuation = [",", ".", "?", "!"];
    const arr: string[] = [];


    for (let i = 0; i < count; i++) {
        const word = pool[Math.floor(Math.random() * pool.length)] || "word";
        let finalWord = word;


        if (includePunctuation && Math.random() < 0.1) {
            finalWord = word + punctuation[Math.floor(Math.random() * punctuation.length)];
        }


        arr.push(finalWord);
    }


    return arr;
}
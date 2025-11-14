/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";


export default function ResultsModal({ wpm, accuracy }: any) {
    return (
        <Dialog defaultOpen>
            <DialogTrigger className="hidden" />
            <DialogContent>
                <h2 className="text-xl font-semibold mb-3">Results</h2>
                <div className="space-y-1">
                    <p>WPM: {wpm}</p>
                    <p>Accuracy: {accuracy}%</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
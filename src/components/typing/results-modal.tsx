"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { saveSession } from "@/lib/sessionStore";
import Heatmap from "@/components/charts/heatmap";

type TimelinePoint = { t: number; wpm: number };
type KeystrokePoint = { t: number; kps: number };
type ResultsProps = {
    wpm: number;
    accuracy: number;
    timeline: TimelinePoint[];
    keystrokes: KeystrokePoint[];
    heatmap: number[];
};

export default function ResultsModal({ wpm, accuracy, timeline, keystrokes, heatmap }: ResultsProps) {
    const saved = useRef(false);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (saved.current) return;
        try {
            saveSession({ timestamp: Date.now(), wpm, accuracy, timeline, keystrokes, heatmap });
            saved.current = true;
        } catch (e) {
            console.error("saveSession failed", e);
        }
    }, [wpm, accuracy, timeline, keystrokes, heatmap]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Test Result</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 py-2">
                    <div className="text-lg">WPM: <b>{wpm}</b></div>
                    <div className="text-lg">Accuracy: <b>{accuracy}%</b></div>

                    <section className="bg-muted/10 rounded p-3">
                        <h3 className="text-sm font-medium mb-2">Mistake Heatmap</h3>
                        <Heatmap heatmap={heatmap} />
                    </section>

                    <div className="flex gap-3 pt-2">
                        <Button size="xs" variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
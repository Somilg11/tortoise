"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { saveSession } from "@/lib/sessionStore";
import { exportCSV, exportPDF } from "@/lib/exportUtils";

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

                                <div className="flex gap-3 pt-2">
                                    <Button size="xs" onClick={() => exportCSV({ timestamp: Date.now(), wpm, accuracy, timeline, keystrokes, heatmap })}>
                                        <Download className="size-4" />
                                        CSV
                                    </Button>

                                    <Button size="xs" onClick={() => exportPDF({ timestamp: Date.now(), wpm, accuracy, timeline, keystrokes, heatmap })}>
                                        <FileText className="size-4" />
                                        PDF
                                    </Button>

                                    <Button size="xs" variant="outline" onClick={() => setOpen(false)}>
                                        Close
                                    </Button>
                                </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
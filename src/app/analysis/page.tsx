"use client";

import AnalysisChart from "@/components/charts/analysis-chart";
import KeystrokeChart from "@/components/charts/keystroke-chart";
import Heatmap from "@/components/charts/heatmap";
import MistakeMap from "@/components/charts/mistake-map";
import StatsCard from "@/components/analysis/stats-card";
import { loadSessions, clearSessions, SessionEntry } from "@/lib/sessionStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function AnalysisPage() {
    const [sessions, setSessions] = useState<SessionEntry[]>(() => loadSessions());

    if (!sessions.length) {
        return (
            <div className="py-12">
                <h1 className="text-3xl font-semibold mb-4">Session Analysis</h1>
                <p>No session data found. Complete a test to see analysis here.</p>
            </div>
        );
    }

    const latest = sessions[sessions.length - 1];

    return (
        <div className="py-12 space-y-8">
            <h1 className="text-3xl font-semibold">Session Analysis</h1>

            <div className="flex items-center justify-between">
                <p className="text-muted-foreground max-w-2xl">
                    This page shows metrics for your most recent typing session and a history of previous sessions stored
                    locally in your browser. Data is stored only in localStorage on this device and is not uploaded.
                </p>
                <div className="flex items-center gap-3">
                    <Button size="sm" variant="destructive" onClick={() => { clearSessions(); setSessions([]); }}>
                        <Trash className="size-4" />
                        Reset Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard title="WPM" value={latest.wpm} />
                <StatsCard title="Accuracy" value={`${latest.accuracy}%`} />
                <StatsCard title="Duration" value={`${latest.timeline.length}s`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-muted/20 rounded-xl p-4">
                    <h2 className="text-lg font-medium mb-2">WPM Timeline (latest)</h2>
                    <AnalysisChart data={latest.timeline} height={220} />
                </section>

                <section className="bg-muted/20 rounded-xl p-4">
                    <h2 className="text-lg font-medium mb-2">Keystrokes / Second (latest)</h2>
                    <KeystrokeChart data={latest.keystrokes} height={220} />
                </section>
            </div>

                <section className="bg-muted/20 rounded-xl p-4">
                    <h2 className="text-lg font-medium mb-3">Mistake Heatmap (latest)</h2>
                    <Heatmap heatmap={latest.heatmap} />
                </section>

            <section className="bg-muted/20 rounded-xl p-4">
                <h2 className="text-lg font-medium mb-3">Previous Sessions</h2>
                <p className="mb-4 text-sm opacity-80">A compact view of your previous sessions stored locally. Click a session to inspect.</p>
                <div className="space-y-4">
                    {sessions.map((s, i) => (
                        <div key={i} className="p-3 bg-background/50 rounded flex flex-col gap-4">
                            <div>
                                <div className="text-sm opacity-80">{new Date(s.timestamp).toLocaleString()}</div>
                                <div className="font-semibold">WPM: {s.wpm} • Accuracy: {s.accuracy}% • Duration: {s.timeline.length}s</div>
                            </div>

                            <div className="w-full">
                                <div>
                                    <AnalysisChart data={s.timeline} height={112} />
                                </div>
                            </div>

                            <div className="w-full">
                                <MistakeMap values={s.heatmap} />
                            </div>

                            <div className="w-full">
                                <Heatmap heatmap={s.heatmap} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
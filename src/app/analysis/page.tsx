"use client";

import AnalysisChart from "@/components/charts/analysis-chart";
import KeystrokeChart from "@/components/charts/keystroke-chart";
import Heatmap from "@/components/charts/heatmap";
import StatsCard from "@/components/analysis/stats-card";
import { loadLatestSession, SessionEntry } from "@/lib/sessionStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { exportCSV, exportPDF } from "@/lib/exportUtils";

export default function AnalysisPage() {
        const [session] = useState<SessionEntry | null>(() => loadLatestSession());

    if (!session) {
        return (
            <div className="py-12">
                <h1 className="text-3xl font-semibold mb-4">Session Analysis</h1>
                <p>No session data found. Complete a test to see analysis here.</p>
            </div>
        );
    }

    return (
        <div className="py-12 space-y-8">
            <h1 className="text-3xl font-semibold">Session Analysis</h1>

                            <div className="flex gap-4">
                                <Button size="xs" onClick={() => exportCSV(session)}>
                                    <Download className="size-4" />
                                    CSV
                                </Button>
                                <Button size="xs" onClick={() => exportPDF(session)}>
                                    <FileText className="size-4" />
                                    PDF
                                </Button>
                            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard title="WPM" value={session.wpm} />
                <StatsCard title="Accuracy" value={`${session.accuracy}%`} />
                <StatsCard title="Duration" value={`${session.timeline.length}s`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-muted/20 rounded-xl p-4">
                    <h2 className="text-lg font-medium mb-2">WPM Timeline</h2>
                    <AnalysisChart data={session.timeline} />
                </section>

                <section className="bg-muted/20 rounded-xl p-4">
                    <h2 className="text-lg font-medium mb-2">Keystrokes / Second</h2>
                    <KeystrokeChart data={session.keystrokes} />
                </section>
            </div>

            <section className="bg-muted/20 rounded-xl p-4">
                <h2 className="text-lg font-medium mb-3">Mistake Heatmap</h2>
                <Heatmap heatmap={session.heatmap} />
            </section>
        </div>
    );
}
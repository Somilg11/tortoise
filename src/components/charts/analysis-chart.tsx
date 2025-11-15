"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type AnalysisChartProps = { data: { t: number; wpm: number }[]; height?: number | string };

export default function AnalysisChart({ data, height = 256 }: AnalysisChartProps) {
    const style: React.CSSProperties = { width: "100%", height: typeof height === "number" ? `${height}px` : height };
    return (
        <div style={style}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="wpm" stroke="var(--primary)" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
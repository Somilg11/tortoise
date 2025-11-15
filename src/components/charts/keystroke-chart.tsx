"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type KeystrokeChartProps = { data: { t: number; kps: number }[]; height?: number | string };

export default function KeystrokeChart({ data, height = 256 }: KeystrokeChartProps) {
    const style: React.CSSProperties = { width: "100%", height: typeof height === "number" ? `${height}px` : height };
    return (
        <div style={style}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="t" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="kps" fill="var(--primary)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
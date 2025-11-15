"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function KeystrokeChart({ data }: { data: { t: number; kps: number }[] }) {
    return (
        <div className="w-full h-64">
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
"use client";

export default function MistakeMap({ values }: { values: number[] }) {
    // Simple vertical bar map showing mistake fraction per index (0..1)
    return (
        <div className="w-full overflow-x-auto">
            <div style={{ display: "flex", gap: 6, alignItems: "end", padding: 6 }}>
                {values.map((v, i) => {
                    const h = Math.round((Math.min(1, Math.max(0, v)) || 0) * 100);
                    const bg = `rgba(220,38,38,${0.4 + (h / 100) * 0.6})`; // redish
                    return (
                        <div key={i} style={{ width: 6, height: `${10 + h}px`, background: bg }} title={`#${i + 1}: ${h}%`} />
                    );
                })}
            </div>
        </div>
    );
}

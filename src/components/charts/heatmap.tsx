"use client";

// Simple heatmap: grid of squares with intensity based on value 0..1
export default function Heatmap({ heatmap }: { heatmap: number[] }) {
    // Render a responsive grid with one column per heatmap entry.
    const cols = Math.max(1, heatmap.length);
    const gridStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: 6,
        alignItems: "center",
    };

    // interpolate between green (correct) and red (wrong)
    const lerpColor = (t: number) => {
        const clamp = (n: number) => Math.max(0, Math.min(1, n));
        const tt = clamp(t);
        // green: rgb(34,197,94)  ; red: rgb(220,38,38)
        const r = Math.round(34 * (1 - tt) + 220 * tt);
        const g = Math.round(197 * (1 - tt) + 38 * tt);
        const b = Math.round(94 * (1 - tt) + 38 * tt);
        return `rgb(${r}, ${g}, ${b})`;
    };

    return (
        <div className="w-full overflow-x-auto">
            <div style={gridStyle}>
                {heatmap.map((v, i) => {
                    const val = Math.min(1, Math.max(0, Number(v) || 0));
                    const bg = lerpColor(val);
                    const title = val === 0 ? `#${i + 1}: Correct` : `#${i + 1}: Mistakes ${Math.round(val * 100)}%`;
                    return (
                        <div
                            key={i}
                            style={{ background: bg }}
                            title={title}
                            className="w-full h-4 rounded"
                        />
                    );
                })}
            </div>
        </div>
    );
}
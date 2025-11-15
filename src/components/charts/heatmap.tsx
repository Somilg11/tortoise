"use client";

// Simple heatmap: grid of squares with intensity based on value 0..1
export default function Heatmap({ heatmap }: { heatmap: number[] }) {
    // heatmap assumed to be array of 50 values
    return (
        <div className="w-full">
            <div className="grid grid-cols-25 gap-1">
                {heatmap.map((v, i) => {
                    const alpha = Math.min(1, Math.max(0, v));
                    const bg = `rgba(226,183,20,${alpha})`;
                    return (
                        <div
                            key={i}
                            className="w-full h-4 rounded"
                            style={{ background: bg }}
                            title={`Mistakes: ${Math.round(v * 100)}`}
                        />
                    );
                })}
            </div>
        </div>
    );
}
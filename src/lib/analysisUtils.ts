export function mockSessionData() {
    const timeline = Array.from({ length: 30 }).map((_, i) => ({ t: i + 1, wpm: Math.round(40 + Math.sin(i / 3) * 8 + Math.random() * 6) }));
    const keystrokes = Array.from({ length: 30 }).map((_, i) => ({ t: i + 1, kps: +(1 + Math.random() * 3).toFixed(2) }));
    const heatmap = Array.from({ length: 25 * 2 }).map(() => Math.random());


    const avgWpm = Math.round(timeline.reduce((s, x) => s + x.wpm, 0) / timeline.length);
    const bestWpm = Math.max(...timeline.map((d) => d.wpm));
    const accuracy = Math.round(90 + Math.random() * 8);


    return { timeline, keystrokes, heatmap, avgWpm, bestWpm, accuracy };
}
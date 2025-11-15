import { SessionEntry } from "@/lib/sessionStore";

export function exportCSV(session: SessionEntry) {
    const rows: string[][] = [];
    rows.push(["timestamp", new Date(session.timestamp).toISOString()]);
    rows.push(["wpm", String(session.wpm)]);
    rows.push(["accuracy", String(session.accuracy)]);
    rows.push(["duration_s", String(session.timeline.length)]);

    // timeline rows
    rows.push([]);
    rows.push(["timeline_t", "wpm"]);
    session.timeline.forEach((r: { t: number; wpm: number }) => rows.push([String(r.t), String(r.wpm)]));

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tortoise-session-${session.timestamp}.csv`;
    a.click();
}

export async function exportPDF(session: SessionEntry) {
    try {
        const { default: jsPDF } = await import("jspdf");
        const { default: autoTable } = await import("jspdf-autotable");
        const doc = new jsPDF();
        doc.text("Tortoise Session Report", 14, 16);

        (autoTable as unknown as (doc: unknown, opts: unknown) => void)(doc, {
            startY: 24,
            head: [["Metric", "Value"]],
            body: [
                ["WPM", session.wpm],
                ["Accuracy", session.accuracy + "%"],
                ["Duration (s)", session.timeline.length],
            ],
        });

        doc.save(`tortoise-session-${session.timestamp}.pdf`);
    } catch (e) {
        console.error("PDF export failed", e);
        // fallback to CSV
        exportCSV(session);
    }
}
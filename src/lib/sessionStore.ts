export interface SessionEntry {
    timestamp: number;
    wpm: number;
    accuracy: number;
    timeline: { t: number; wpm: number }[];
    keystrokes: { t: number; kps: number }[];
    heatmap: number[];
}

const KEY = "tortoise_sessions_v1";

export function saveSession(entry: SessionEntry) {
    try {
        const raw = localStorage.getItem(KEY);
        const arr: SessionEntry[] = raw ? JSON.parse(raw) : [];
        arr.push(entry);
        localStorage.setItem(KEY, JSON.stringify(arr));
    } catch (e) {
        console.error("saveSession error", e);
    }
}

export function loadSessions(): SessionEntry[] {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch (e) {
        console.error("loadSessions error", e);
        return [];
    }
}

export function loadLatestSession(): SessionEntry | null {
    const s = loadSessions();
    return s.length ? s[s.length - 1] : null;
}

export function clearSessions() {
    try {
        localStorage.removeItem(KEY);
    } catch (e) {
        console.error("clearSessions error", e);
    }
}
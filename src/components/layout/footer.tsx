export default function Footer() {
    return (
        <footer className="w-full py-6 text-center text-xs opacity-60">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
                <p>© 2025 tortoise — built for speed, simplicity & clarity.</p>

                <div className="flex items-center gap-2">
                    <a
                        href="https://github.com/Somilg11/tortoise"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm hover:opacity-100 transition-opacity"
                        aria-label="Star on GitHub"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.804 5.625-5.476 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/>
                        </svg>
                        <span className="hidden sm:inline">Star</span>
                    </a>

                    <a
                        href="https://www.buymeacoffee.com/gsomil"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm hover:opacity-100 transition-opacity"
                        aria-label="Buy me a coffee"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                            <path d="M18 3H6v11a4 4 0 004 4h4a4 4 0 004-4V7h2V5h-2V3zM4 5H2v2h2V5zm14 6a2 2 0 01-2 2h-4a2 2 0 01-2-2V5h8v6z"/>
                        </svg>
                        <span className="hidden sm:inline">Buy me a coffee</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
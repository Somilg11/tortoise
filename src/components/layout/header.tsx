import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full py-3 md:py-5 flex justify-between items-center opacity-95 mx-auto px-4">
            <Link href="/" className="hover:opacity-100 transition-opacity">
            <h1 className="text-xl font-semibold tracking-tight">tortoise</h1>
            </Link>
            <nav className="flex flex-wrap gap-4 items-center text-sm opacity-80">
                <Link href="/" className="hover:opacity-100 transition-opacity">Test</Link>
                <Link href="/analysis" className="hover:opacity-100 transition-opacity">Analysis</Link>
                <Link href="/about" className="hover:opacity-100 transition-opacity">About</Link>
                <Link href="/settings" className="hover:opacity-100 transition-opacity">Settings</Link>

                {/* Buttons moved to footer for better placement on mobile */}
            </nav>
        </header>
    );
}
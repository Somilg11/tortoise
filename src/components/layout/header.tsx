import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full py-5 flex justify-between items-center opacity-95 mx-auto">
            <h1 className="text-xl font-semibold tracking-tight">tortoise</h1>
            <nav className="flex gap-6 text-sm opacity-80">
                <Link href="/" className="hover:opacity-100 transition-opacity">Test</Link>
                <Link href="/analysis" className="hover:opacity-100 transition-opacity">Analysis</Link>
                <Link href="/about" className="hover:opacity-100 transition-opacity">About</Link>
                <Link href="/settings" className="hover:opacity-100 transition-opacity">Settings</Link>
            </nav>
        </header>
    );
}
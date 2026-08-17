export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-800/80 py-8 text-center text-xs text-zinc-500">
            <p>&copy; {new Date().getFullYear()} Noah Belstad. Built with React, TypeScript & Tailwind CSS.</p>
        </footer>
    );
}
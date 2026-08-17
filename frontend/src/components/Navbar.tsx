import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="flex gap-6 p-6 border-b border-zinc-800 justify-center">
            <Link to="/" className="text-zinc-300 hover:text-indigo-400 font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-zinc-300 hover:text-indigo-400 font-medium transition-colors">About</Link>
        </nav>
    );
}
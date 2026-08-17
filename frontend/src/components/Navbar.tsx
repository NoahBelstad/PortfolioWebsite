import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/activity', label: 'Activity' },
    { path: '/uses', label: 'Uses' },
    { path: '/contact', label: 'Contact' },
];

export function Navbar() {
    const location = useLocation();

    return (
        <nav className="w-full border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-40">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
                <Link to="/" className="flex items-baseline gap-1 hover:opacity-80 transition-opacity">
                    <span className="text-xl sm:text-2xl font-extrabold text-indigo-400 tracking-tight">
                        Noah
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white tracking-normal">
                        belstad
                    </span>
                </Link>

                <div className="flex gap-1 sm:gap-2 overflow-x-auto py-2 [::-webkit-scrollbar]:hidden">
                    {NAV_LINKS.map(({ path, label }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${isActive
                                    ? 'bg-zinc-800 text-indigo-400 border border-zinc-700'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                    }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
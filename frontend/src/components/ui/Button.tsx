import { Link } from 'react-router-dom';

interface ButtonProps {
    to: string;
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    showArrow?: boolean;
}

export function Button({ to, variant = 'secondary', children, showArrow = false }: ButtonProps) {
    const isPrimary = variant === 'primary';

    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-2.5 font-medium text-sm rounded-lg transition-all duration-200 group";
    const primaryStyles = "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-950/50";
    const secondaryStyles = "bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white";

    return (
        <Link to={to} className={`${baseStyles} ${isPrimary ? primaryStyles : secondaryStyles}`}>
            <span>{children}</span>
            {showArrow && (
                <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
            )}
        </Link>
    );
}
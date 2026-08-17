import { useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export function ProjectCarousel() {
    const { data } = usePortfolio();
    const featuredProjects = (data?.projects || []).filter((p) => p.featured);

    const scrollRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const currentSpeed = useRef(0.25);

    const displayProjects = [
        ...featuredProjects,
        ...featuredProjects,
        ...featuredProjects,
    ];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || displayProjects.length === 0) return;

        let animationFrameId: number;
        const baseSpeed = 0.25;

        const autoScroll = () => {
            if (container) {
                if (isHovered.current) {
                    if (Math.abs(currentSpeed.current) > 0.005) {
                        currentSpeed.current *= 0.92;
                        container.scrollLeft += currentSpeed.current;
                    } else {
                        currentSpeed.current = 0;
                    }
                } else {
                    currentSpeed.current += (baseSpeed - currentSpeed.current) * 0.05;
                    container.scrollLeft += currentSpeed.current;
                }

                const halfWidth = container.scrollWidth / 2;
                if (container.scrollLeft >= halfWidth) {
                    container.scrollLeft -= halfWidth;
                } else if (container.scrollLeft <= 0) {
                    container.scrollLeft += halfWidth;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [displayProjects.length]);

    if (displayProjects.length === 0) return null;

    return (
        <div
            ref={scrollRef}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
            className="mt-8 sm:mt-10 flex gap-4 overflow-x-hidden select-none [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
            {displayProjects.map((project, idx) => (
                <div
                    key={`${project.id}-${idx}`}
                    className="w-72 sm:w-80 bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-colors shrink-0"
                >
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-100">{project.title}</h3>
                        <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-snug line-clamp-3">{project.description}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs bg-indigo-950 text-indigo-300 rounded border border-indigo-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
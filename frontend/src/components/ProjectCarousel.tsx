import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { usePortfolio } from '../context/PortfolioContext';

export function ProjectCarousel() {
    const { data } = usePortfolio();
    const featuredProjects = (data?.projects || []).filter((p) => p.featured);

    const scrollRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const currentSpeed = useRef(0.25);

    // Ensure we have enough items in our base chunk so scrollWidth is always larger than the container
    const baseProjects = [...featuredProjects];
    if (baseProjects.length > 0) {
        while (baseProjects.length < 4) {
            baseProjects.push(...featuredProjects);
        }
    }

    // Create 3 identical chunks for seamless infinite scrolling
    const displayProjects = [
        ...baseProjects,
        ...baseProjects,
        ...baseProjects,
    ];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container || featuredProjects.length === 0) return;

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

                // Since we have 3 chunks, the width of one chunk is scrollWidth / 3
                const singleSetWidth = container.scrollWidth / 3;

                if (container.scrollLeft >= singleSetWidth * 2) {
                    container.scrollLeft -= singleSetWidth;
                } else if (container.scrollLeft <= 0) {
                    container.scrollLeft += singleSetWidth;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [displayProjects.length, featuredProjects.length]);

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

                        {/* Markdown-enabled description with line clamping to keep cards uniform */}
                        <div className="mt-2 text-xs sm:text-sm text-zinc-400 leading-snug line-clamp-3 prose prose-invert max-w-none">
                            <ReactMarkdown>{project.description}</ReactMarkdown>
                        </div>
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
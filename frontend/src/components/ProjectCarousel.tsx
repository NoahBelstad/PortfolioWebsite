import { useRef, useEffect } from 'react';

const FEATURED_PROJECTS = [
    {
        id: 1,
        title: "Rust & React Web App",
        description: "A fast web dashboard with an Axum/Rust REST API server and a responsive React frontend.",
        tags: ["Rust", "Axum", "React", "TypeScript"],
    },
    {
        id: 2,
        title: "Minecraft Dimension Mod",
        description: "A comprehensive Java mod adding custom dimension mechanics, new mobs, and unique items.",
        tags: ["Java", "Minecraft Forge", "Gradle"],
    },
    {
        id: 3,
        title: "High-Throughput CLI Engine",
        description: "Multi-threaded command line tool built in Rust for processing large data payloads efficiently.",
        tags: ["Rust", "CLI", "Async/Tokio"],
    },
    {
        id: 4,
        title: "Telemetry Backend Service",
        description: "Backend microservice in Rust handling WebSocket streaming and real-time telemetry.",
        tags: ["Rust", "WebSockets", "Serde"],
    },
    {
        id: 5,
        title: "Economy Server Plugin",
        description: "Lightweight server-side mod written in Java to manage player-driven market mechanics.",
        tags: ["Java", "PaperMC", "Spigot API"],
    },
];

export function ProjectCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const isHovered = useRef(false);
    const startX = useRef(0);
    const scrollLeftPos = useRef(0);
    const velocity = useRef(0);
    const lastX = useRef(0);
    const currentSpeed = useRef(0.25);

    const displayProjects = [
        ...FEATURED_PROJECTS,
        ...FEATURED_PROJECTS,
        ...FEATURED_PROJECTS,
        ...FEATURED_PROJECTS,
    ];

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrameId: number;
        const baseSpeed = 0.25;

        const autoScroll = () => {
            if (container) {
                if (!isDragging.current) {
                    if (Math.abs(velocity.current) > 0.05) {
                        container.scrollLeft -= velocity.current;
                        velocity.current *= 0.95;
                        currentSpeed.current = baseSpeed;
                    } else if (isHovered.current) {
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
    }, []);

    const startDrag = (pageX: number) => {
        const container = scrollRef.current;
        if (!container) return;
        isDragging.current = true;
        startX.current = pageX - container.offsetLeft;
        scrollLeftPos.current = container.scrollLeft;
        lastX.current = pageX;
        velocity.current = 0;
    };

    const moveDrag = (pageX: number) => {
        if (!isDragging.current) return;
        const container = scrollRef.current;
        if (!container) return;

        const walk = (pageX - startX.current) * 1.5;
        container.scrollLeft = scrollLeftPos.current - walk;

        velocity.current = pageX - lastX.current;
        lastX.current = pageX;

        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
            container.scrollLeft -= halfWidth;
            scrollLeftPos.current -= halfWidth;
        } else if (container.scrollLeft <= 0) {
            container.scrollLeft += halfWidth;
            scrollLeftPos.current += halfWidth;
        }
    };

    const endDrag = () => {
        isDragging.current = false;
    };

    return (
        <div
            ref={scrollRef}
            onMouseDown={(e) => startDrag(e.pageX)}
            onMouseLeave={() => { isHovered.current = false; endDrag(); }}
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseUp={endDrag}
            onMouseMove={(e) => moveDrag(e.pageX)}
            onTouchStart={(e) => startDrag(e.touches[0].pageX)}
            onTouchEnd={endDrag}
            onTouchMove={(e) => moveDrag(e.touches[0].pageX)}
            className="mt-8 sm:mt-10 flex gap-4 overflow-x-auto select-none cursor-grab active:cursor-grabbing touch-pan-y [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
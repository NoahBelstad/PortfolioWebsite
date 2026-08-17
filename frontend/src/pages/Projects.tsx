import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectCard } from '../components/ProjectCard';

export default function Projects() {
    const { data, loading } = usePortfolio();
    const [filter, setFilter] = useState("All");

    if (loading) {
        return <div className="p-8 text-center text-zinc-400">Loading projects from S3...</div>;
    }

    const projects = data?.projects || [];

    const categories = [
        "All",
        ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))
    ];

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <div className="p-4 sm:p-8 text-white max-w-5xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Projects Showcase</h1>
                <p className="mt-2 text-zinc-400 text-base sm:text-lg">
                    A collection of backend services, mods, and web applications I've engineered.
                </p>
            </div>

            <div className="flex gap-2 border-b border-zinc-800 pb-4 overflow-x-auto">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${filter === category
                            ? 'bg-indigo-600 text-white'
                            : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredProjects.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                    No projects found for category "{filter}".
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            )}
        </div>
    );
}
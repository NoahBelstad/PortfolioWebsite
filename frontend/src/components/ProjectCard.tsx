interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export function ProjectCard({ title, description, tags, githubUrl, liveUrl }: ProjectCardProps) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-6 rounded-xl flex flex-col justify-between transition-all duration-200 group">
            <div>
                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                    {title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                    {description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs bg-indigo-950/60 text-indigo-300 rounded-md border border-indigo-800/60">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-4 text-xs font-medium">
                {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                        Source Code &rarr;
                    </a>
                )}
                {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                        Live Demo &rarr;
                    </a>
                )}
            </div>
        </div>
    );
}
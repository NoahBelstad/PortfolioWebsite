const POSTS = [
    {
        title: "Building Fast Web APIs with Axum and Rust",
        date: "August 2026",
        readTime: "5 min read",
        excerpt: "Exploring route handling, shared state management, and async database connections in Axum.",
    },
    {
        title: "Lessons Learned Modding Minecraft Dimensions",
        date: "July 2026",
        readTime: "8 min read",
        excerpt: "How to engineer custom biomes, chunk generators, and entity spawning rules using Java and Forge.",
    }
];

export default function Blog() {
    return (
        <div className="p-4 sm:p-8 text-white max-w-4xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Articles & Writings</h1>
                <p className="mt-2 text-zinc-400 text-base sm:text-lg">
                    Thoughts on backend architecture, systems programming, and modding.
                </p>
            </div>

            <div className="space-y-4">
                {POSTS.map((post, idx) => (
                    <article key={idx} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-6 rounded-xl transition-colors cursor-pointer group">
                        <div className="flex justify-between items-center text-xs text-zinc-500 mb-2">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h2 className="text-xl font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                            {post.title}
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                            {post.excerpt}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}
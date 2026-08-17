export default function Contact() {
    return (
        <div className="py-12 px-6 sm:px-8 text-white max-w-4xl mx-auto w-full space-y-12">
            <div className="space-y-3">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                    Contact
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Get in Touch
                </h1>
                <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                    Have a project in mind, a question about Rust and Java, or want to collaborate? Reach out through any of the platforms below and let's build something great.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* GitHub */}
                <a
                    href="https://github.com/NoahBelstad"
                    target="_blank"
                    rel="noreferrer"
                    className="p-6 bg-zinc-900 border border-zinc-800 hover:border-purple-500/60 rounded-2xl text-center transition-all duration-300 flex flex-col items-center justify-center space-y-3 group shadow-lg hover:-translate-y-1"
                >
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-purple-400 group-hover:bg-purple-950/40 group-hover:border-purple-500/50 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block font-bold text-zinc-200 text-base">GitHub</span>
                        <span className="text-xs text-purple-400 font-medium">@noahbelstad</span>
                    </div>
                </a>

                {/* Email */}
                <a
                    href="mailto:noahbelstad@gmail.com"
                    className="p-6 bg-zinc-900 border border-zinc-800 hover:border-blue-500/60 rounded-2xl text-center transition-all duration-300 flex flex-col items-center justify-center space-y-3 group shadow-lg hover:-translate-y-1"
                >
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400 group-hover:bg-blue-950/40 group-hover:border-blue-500/50 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block font-bold text-zinc-200 text-base">Email</span>
                        <span className="text-xs text-blue-400 font-medium">noahbelstad@gmail.com</span>
                    </div>
                </a>

                {/* Fiverr */}
                <a
                    href="https://www.fiverr.com/s/GPxzNvz"
                    target="_blank"
                    rel="noreferrer"
                    className="p-6 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/60 rounded-2xl text-center transition-all duration-300 flex flex-col items-center justify-center space-y-3 group shadow-lg hover:-translate-y-1"
                >
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-950/40 group-hover:border-emerald-500/50 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block font-bold text-zinc-200 text-base">Fiverr</span>
                        <span className="text-xs text-emerald-400 font-medium">Hire Me</span>
                    </div>
                </a>
            </div>

            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3 shadow-lg">
                <h2 className="text-xl font-bold text-white">Collaboration & Availability</h2>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    Whether you need full-stack web applications with TypeScript and React, server-side infrastructure in Rust, or custom Minecraft mods and plugins in Java, I'm open to interesting projects and collaborations. Feel free to reach out via email or check out my gig on Fiverr!
                </p>
            </div>
        </div>
    );
}
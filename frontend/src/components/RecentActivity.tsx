import { Button } from './ui/Button';

const MOCK_7_DAY_COMMITS = [
    { day: "Mon", date: "Mon, Aug 17", commits: ["feat: add project carousel component", "fix: rust backend endpoint CORS header"] },
    { day: "Sun", date: "Sun, Aug 16", commits: ["refactor: migrate client state handling", "style: adjust zinc dark mode color palette"] },
    { day: "Sat", date: "Sat, Aug 15", commits: ["feat: initial minecraft forge mod setup", "docs: update setup guide in readme"] },
    { day: "Fri", date: "Fri, Aug 14", commits: ["perf: optimize rust async database query pool"] },
    { day: "Thu", date: "Thu, Aug 13", commits: ["chore: setup tailwind css config", "feat: build s3 sync utility script"] },
    { day: "Wed", date: "Wed, Aug 12", commits: ["feat: implement github API commit fetching engine"] },
    { day: "Tue", date: "Tue, Aug 11", commits: ["initial commit: web portfolio repository structure"] },
];

export function RecentActivity() {
    return (
        <section className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Recent Activity</h2>
                    <p className="text-zinc-400 text-sm mt-1">Commits from the last 7 days</p>
                </div>

                <div className="self-start sm:self-auto">
                    <Button to="/activity" variant="secondary" showArrow>
                        View live feed
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {MOCK_7_DAY_COMMITS.map((item) => (
                    <div
                        key={item.day}
                        className="group relative bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl flex flex-col items-center hover:border-emerald-500/50 transition-colors cursor-pointer"
                    >
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
                            {item.day}
                        </span>

                        <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-base shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                            +{item.commits.length}
                        </div>

                        <span className="text-[10px] text-zinc-500 mt-2">
                            {item.commits.length === 1 ? '1 commit' : `${item.commits.length} commits`}
                        </span>

                        <div className="absolute bottom-full mb-3 hidden group-hover:block w-56 p-3 bg-zinc-800 border border-zinc-700 rounded-lg shadow-2xl z-30 pointer-events-none left-1/2 -translate-x-1/2">
                            <div className="text-xs font-semibold text-zinc-200 border-b border-zinc-700 pb-1 mb-2 flex justify-between">
                                <span>{item.date}</span>
                                <span className="text-emerald-400">{item.commits.length} commits</span>
                            </div>
                            <ul className="space-y-1 max-h-36 overflow-y-auto">
                                {item.commits.map((commit, idx) => (
                                    <li key={idx} className="text-[11px] text-zinc-300 font-mono flex items-start gap-1.5 leading-tight">
                                        <span className="text-emerald-400">&bull;</span>
                                        <span>{commit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
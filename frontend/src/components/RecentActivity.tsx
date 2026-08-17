import { usePortfolio } from '../context/PortfolioContext';
import { Button } from './ui/Button';

// Color progression: 0 = Dark Gray -> 1 = Soft Forest Green -> 2-3 = Rich Dark Green -> 4-6 = Vibrant Emerald -> 7+ = Glowing Mint
function getCommitStyle(count: number) {
    if (count <= 0) {
        // 0: Pure dark gray
        return 'bg-zinc-900 border-zinc-800/60 text-zinc-600 shadow-none';
    }
    if (count === 1) {
        // 1: Subtle dark forest green (distinctly green, but soft)
        return 'bg-emerald-950/60 border-emerald-900/60 text-emerald-400/90 shadow-sm shadow-emerald-950/30';
    }
    if (count <= 3) {
        // 2-3: Rich medium-dark green
        return 'bg-emerald-900 border-emerald-700 text-emerald-300 shadow-md shadow-emerald-950/50';
    }
    if (count <= 6) {
        // 4-6: Vibrant solid emerald
        return 'bg-emerald-500 border-emerald-400 text-zinc-950 font-extrabold shadow-lg shadow-emerald-500/40';
    }
    // 7+: Glowing bright mint green with white border highlight
    return 'bg-emerald-300 border-white text-zinc-950 font-black ring-2 ring-emerald-400 shadow-xl shadow-emerald-400/80 scale-105';
}

export function RecentActivity() {
    const { data } = usePortfolio();
    const weeklyCommits = data?.gitHistory?.weeklyCommits || [];

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
                {weeklyCommits.map((item, index) => {
                    const commits = Array.isArray(item?.commits) ? item.commits : [];
                    const count = typeof item === 'number' ? item : commits.length;
                    const day = item?.day || `Day ${index + 1}`;
                    const date = item?.date || '';

                    const badgeClass = getCommitStyle(count);

                    return (
                        <div
                            key={item?.day || index}
                            className="group relative bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl flex flex-col items-center hover:border-emerald-500/50 transition-colors cursor-pointer"
                        >
                            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
                                {day}
                            </span>

                            <div
                                className={`w-12 h-12 rounded-full border flex items-center justify-center text-base transition-all group-hover:scale-110 ${badgeClass}`}
                            >
                                {count > 0 ? `+${count}` : '0'}
                            </div>

                            <span className="text-[10px] text-zinc-500 mt-2">
                                {count === 1 ? '1 commit' : `${count} commits`}
                            </span>

                            {commits.length > 0 && (
                                <div className="absolute bottom-full mb-3 hidden group-hover:block w-56 p-3 bg-zinc-800 border border-zinc-700 rounded-lg shadow-2xl z-30 pointer-events-none left-1/2 -translate-x-1/2">
                                    <div className="text-xs font-semibold text-zinc-200 border-b border-zinc-700 pb-1 mb-2 flex justify-between">
                                        <span>{date}</span>
                                        <span className="text-emerald-400">{count} commits</span>
                                    </div>
                                    <ul className="space-y-1 max-h-36 overflow-y-auto">
                                        {commits.map((commit, idx) => (
                                            <li key={idx} className="text-[11px] text-zinc-300 font-mono flex items-start gap-1.5 leading-tight">
                                                <span className="text-emerald-400">&bull;</span>
                                                <span>{commit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
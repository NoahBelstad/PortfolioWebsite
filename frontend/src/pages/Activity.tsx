import { usePortfolio } from '../context/PortfolioContext';

export default function Activity() {
    const { data, loading } = usePortfolio();

    if (loading) {
        return <div className="p-8 text-center text-zinc-400">Loading activity feed...</div>;
    }

    const activities = data?.gitHistory.activityFeed || [];

    return (
        <div className="p-4 sm:p-8 text-white max-w-4xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Activity Feed</h1>
                <p className="mt-2 text-zinc-400 text-base sm:text-lg">
                    Recent development milestones, commits, and project updates.
                </p>
            </div>

            <div className="space-y-4">
                {activities.map((act, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <span className="text-xs text-indigo-400 font-mono">{act.date}</span>
                            <h3 className="text-lg font-bold text-zinc-100">{act.title}</h3>
                            <p className="text-xs sm:text-sm text-zinc-400 mt-1">{act.detail}</p>
                        </div>
                        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-mono rounded-md border border-zinc-700 self-start sm:self-center">
                            {act.type}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
import { useState } from 'react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="p-4 sm:p-8 text-white max-w-3xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Get in Touch</h1>
                <p className="mt-2 text-zinc-400 text-base sm:text-lg">
                    Have a project in mind, a question about Rust/Java, or just want to connect?
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-center transition-colors">
                    <span className="block font-bold text-zinc-200">GitHub</span>
                    <span className="text-xs text-zinc-500">@noahbelstad</span>
                </a>
                <a href="mailto:noah@example.com" className="p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-center transition-colors">
                    <span className="block font-bold text-zinc-200">Email</span>
                    <span className="text-xs text-zinc-500">Direct Message</span>
                </a>
                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
                    <span className="block font-bold text-zinc-200">Discord</span>
                    <span className="text-xs text-zinc-500">noah#0000</span>
                </div>
            </div>

            {submitted ? (
                <div className="p-6 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-emerald-300 text-center">
                    Thank you! Your message has been sent.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-xl space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Your Name</label>
                        <input
                            required
                            type="text"
                            placeholder="Alex Smith"
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                        <input
                            required
                            type="email"
                            placeholder="alex@example.com"
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Message</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Tell me about your project..."
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors resize-none"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            )}
        </div>
    );
}
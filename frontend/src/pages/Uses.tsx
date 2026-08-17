const SETUP_SECTIONS = [
    {
        category: "Hardware",
        items: [
            { name: "Custom Desktop PC", spec: "Ryzen 7, 32GB RAM, RTX 3070" },
            { name: "Monitors", spec: "Dual 27-inch 144Hz Displays" },
            { name: "Keyboard & Mouse", spec: "Mechanical Keyboard (Tactile Switches), Logitech MX Master" }
        ]
    },
    {
        category: "Software & Editor",
        items: [
            { name: "IDE", spec: "VS Code & IntelliJ IDEA (for Java/Minecraft)" },
            { name: "Terminal", spec: "Alacritty + Zsh" },
            { name: "Font", spec: "JetBrains Mono" }
        ]
    }
];

export default function Uses() {
    return (
        <div className="p-4 sm:p-8 text-white max-w-4xl mx-auto space-y-8 w-full">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Development Setup</h1>
                <p className="mt-2 text-zinc-400 text-base sm:text-lg">
                    Hardware, editor configurations, and tools I use daily.
                </p>
            </div>

            <div className="space-y-6">
                {SETUP_SECTIONS.map((section, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-indigo-400 mb-4">{section.category}</h2>
                        <ul className="space-y-3">
                            {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex flex-col sm:flex-row sm:justify-between border-b border-zinc-800/60 pb-2 text-sm">
                                    <span className="font-medium text-zinc-200">{item.name}</span>
                                    <span className="text-zinc-400">{item.spec}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
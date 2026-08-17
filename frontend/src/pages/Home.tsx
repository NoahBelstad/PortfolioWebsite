import { ProjectCarousel } from '../components/ProjectCarousel';
import { AboutSection } from '../components/AboutSection';
import { RecentActivity } from '../components/RecentActivity';
import { Button } from '../components/ui/Button';

export default function Home() {
    return (
        <div className="p-4 sm:p-8 text-white max-w-5xl mx-auto space-y-12 sm:space-y-16 w-full">
            <section className="py-8 sm:py-12 border-b border-zinc-800">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                    Hi, I'm <span className="text-indigo-400">Noah Belstad</span>
                </h1>

                <div className="mt-4 text-lg sm:text-xl text-zinc-300 leading-relaxed">
                    A passionate developer building:
                    <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400 text-base sm:text-lg">
                        <li>Websites with Rust backends and React frontends</li>
                        <li>Minecraft mods with Java</li>
                        <li>Other backend applications in Rust</li>
                    </ul>
                </div>

                <ProjectCarousel />

                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button to="/projects" variant="primary">
                        View All Projects
                    </Button>
                    <Button to="/contact" variant="secondary" showArrow>
                        Get in Touch
                    </Button>
                </div>
            </section>

            <AboutSection />
            <RecentActivity />
        </div>
    );
}
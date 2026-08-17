import { Button } from './ui/Button';

export function AboutSection() {
    return (
        <section className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Me</h2>
            <div className="text-zinc-300 leading-relaxed space-y-4 text-base sm:text-lg">
                <p>
                    Hello! I'm Noah, a software developer driven by curiosity for high-performance backends and creative game modifications. My core tech stack revolves around crafting fast, reliable APIs using Rust and connecting them with modern React frontends to deliver seamless user experiences.
                </p>
                <p>
                    Beyond web applications, I spent significant time in the Minecraft modding ecosystem, engineering custom gameplay mechanics, dimensions, and server plugins in Java. Whether I'm managing async memory in systems code or designing interactive UI components, I enjoy taking complex ideas and building them into clean, functional applications.
                </p>
            </div>

            <div className="mt-6">
                <Button to="/about" variant="secondary" showArrow>
                    Read full bio
                </Button>
            </div>
        </section>
    );
}
import { Button } from '../components/ui/Button';
import aboutImage1 from '../assets/Aboutimage1.png';
import aboutImage2 from '../assets/Aboutimage2.svg';
import aboutImage3 from '../assets/Aboutimage3.svg';

interface SectionBlockProps {
    number: string;
    category: string;
    title: string;
    paragraphs: string[];
    tags?: string[];
    imageSrc?: string;
    imageAlt?: string;
    placeholderIcon: string;
    placeholderLabel: string;
    reverse?: boolean;
}

function getAge(birthDateString: string): number {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function AboutSection({
    number,
    category,
    title,
    paragraphs,
    tags,
    imageSrc,
    imageAlt,
    placeholderIcon,
    placeholderLabel,
    reverse = false,
}: SectionBlockProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className={`space-y-4 ${reverse ? 'md:order-2' : ''}`}>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    {number} / {category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
                {paragraphs.map((p, idx) => (
                    <p key={idx} className="text-zinc-400 text-base leading-relaxed">
                        {p}
                    </p>
                ))}

                {tags && tags.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2">
                        {tags.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className={`relative aspect-video sm:aspect-square w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center p-4 sm:p-6 group shadow-xl ${reverse ? 'md:order-1' : ''}`}>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={imageAlt || title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-xl"
                    />
                ) : (
                    <div className="text-center p-6 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-400 text-xl">
                            {placeholderIcon}
                        </div>
                        <p className="text-xs text-zinc-500 font-mono">[{placeholderLabel}]</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default function About() {
    const age = getAge('2011-02-08');

    return (
        <div className="py-12 px-6 sm:px-8 text-white max-w-5xl mx-auto w-full space-y-24">
            <section className="space-y-4 border-b border-zinc-800/80 pb-12">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                    About Me
                </span>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                    Noah Belstad
                </h1>
                <p className="text-xl text-zinc-300 max-w-2xl leading-relaxed">
                    Full-stack developer focused on building fast web applications, complex Minecraft mods, and indie games.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-zinc-400">
                    <span>{age} years old</span>
                    <span>&bull;</span>
                    <span>Still in school</span>
                    <span>&bull;</span>
                    <span>Based in Norway</span>
                </div>
            </section>

            <AboutSection
                number="01"
                category="Background"
                title="My Story"
                paragraphs={[
                    'My programming journey started when I was 10 years old in 4th grade. I joined a Scratch coding class and immediately fell in love with it, building tons of small games while learning foundational programming concepts.',
                    'Eventually, I wanted to move beyond 2D graphics and stepped into Roblox Studio to create 3D games. From there, I expanded into Java for Minecraft modding and picked up web development. By age 15, I learned Rust and AWS, building this portfolio website as my first production-ready cloud app.',
                    "Currently, I'm focused on mastering Rust, advancing my web development skills, and diving into the Godot engine for indie game creation.",
                ]}
                imageSrc={aboutImage1}
                imageAlt="Noah Belstad portrait"
                placeholderIcon="📷"
                placeholderLabel="Your Photo / Image 1"
            />

            <AboutSection
                number="02"
                category="Specialization"
                title="What I Build"
                reverse={true}
                paragraphs={[
                    "My primary technical toolkit centers around modern TypeScript, React, and Tailwind CSS on the frontend, paired with Rust, Node.js, and AWS infrastructure on the backend. I also have a keen interest in Java and Godot, and I'm always on the lookout for new tools and techniques to improve my skills. I'm a firm believer in the power of open-source software and the importance of contributing to the community.",
                ]}
                tags={['Rust', 'TypeScript', 'React', 'Tailwind CSS', 'AWS', 'Java', 'Godot']}
                imageSrc={aboutImage2}
                imageAlt="Development workspace"
                placeholderIcon="💻"
                placeholderLabel="Code / Workspace Image 2"
            />

            <AboutSection
                number="03"
                category="Personal"
                title="Beyond Development"
                paragraphs={[
                    "When I'm not writing code or building serverless backend pipelines, I enjoy designing indie game mechanics in Godot, exploring hardware projects, and keeping up with the latest open-source tools.",
                ]}
                imageSrc={aboutImage3}
                imageAlt="Hobbies and game development"
                placeholderIcon="⚡"
                placeholderLabel="Hobbies / Image 3"
            />

            <section className="pt-12 border-t border-zinc-800/80 text-center space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold">Let's Work Together</h2>
                <p className="text-zinc-400 text-base max-w-lg mx-auto">
                    Have a project in mind or want to collaborate? Feel free to reach out.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <Button to="/contact" variant="primary">
                        Get in Touch
                    </Button>
                    <a
                        href="https://github.com/NoahBelstad"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                        GitHub
                    </a>
                </div>
            </section>
        </div>
    );
}
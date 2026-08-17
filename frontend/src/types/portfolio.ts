export interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
}

export interface CommitDay {
    day: string;
    date: string;
    commits: string[];
}

export interface ActivityEvent {
    date: string;
    title: string;
    type: string;
    detail: string;
}

export interface BlogPost {
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
}

export interface ToolItem {
    name: string;
    spec: string;
}

export interface ToolCategory {
    category: string;
    items: ToolItem[];
}

export interface PortfolioData {
    profile: {
        name: string;
        headline: string;
        subtitles: string[];
        bio: string[];
        socials: {
            github: string;
            email: string;
            discord: string;
        };
    };
    projects: Project[];
    gitHistory: {
        weeklyCommits: CommitDay[];
        activityFeed: ActivityEvent[];
    };
    blog: BlogPost[];
    uses: ToolCategory[];
}
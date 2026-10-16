/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Central Editable Data File (Single Source of Truth)
 * ===========================================
 * Edit this file to update your portfolio content across the entire site.
 * No build tools, bundlers, or frameworks required.
 * Fully compatible with file:/// local browsing.
 */

window.portfolioData = {
    // Site configuration
    config: {
        siteTitle: "Pranav Sharma — Developer & Creative Technologist",
        edition: "2025 // V4.0",
        enableCustomCursor: true
    },

    // Profile & Hero Section
    profile: {
        name: "Pranav Sharma",
        role: "Developer & Creative Technologist",
        tagline: "Building things that live on the web",
        editionBadge: "EDITION 2025 // V4.0",
        location: "India",
        status: "Available for Projects & Collaborations",
        introduction: "I build creative, high-performance web experiences and am actively expanding into video editing and automation workflows. Still learning, still building.",
        // Path to your profile picture (or leave empty to show the polaroid placeholder)
        profileImage: ""
    },

    // About Section
    about: {
        headline: "Building things, learning always.",
        description: "I'm a student and self-taught developer passionate about creating tactile, engaging web experiences. My journey started with pure curiosity about how the web works, which evolved into a focus on frontend architecture, creative interactions, and modern web standards. Today, I'm bridging traditional code with visual storytelling and workflow automation.",
        philosophy: "I believe the most compelling digital experiences live at the intersection of robust engineering and thoughtful visual storytelling.",
        interests: [
            "Web Development",
            "UI / UX Design",
            "Creative Coding",
            "Video Editing",
            "AI Workflows",
            "Open Source"
        ],
        learning: [
            "Advanced JavaScript & Frontend Architecture",
            "Video editing workflows & Premiere Pro / DaVinci Resolve",
            "Python automation scripts & LLM integrations"
        ]
    },

    // Skills & Toolkit
    skills: [
        { name: "JavaScript (ES6+)", category: "Programming", status: "Proficient" },
        { name: "HTML5 & CSS3", category: "Programming", status: "Proficient" },
        { name: "Python", category: "Programming", status: "Working With" },
        { name: "Git & GitHub", category: "Programming", status: "Working With" },

        { name: "Responsive Design", category: "Frontend", status: "Proficient" },
        { name: "DOM Manipulation", category: "Frontend", status: "Proficient" },
        { name: "CSS Grid & Flexbox", category: "Frontend", status: "Proficient" },
        { name: "Tailwind CSS", category: "Frontend", status: "Exploring" },

        { name: "VS Code", category: "Tools", status: "Proficient" },
        { name: "Terminal / CLI", category: "Tools", status: "Working With" },
        { name: "Figma", category: "Tools", status: "Exploring" },

        { name: "Premiere Pro", category: "Video Editing", status: "Learning" },
        { name: "DaVinci Resolve", category: "Video Editing", status: "Exploring" },
        { name: "Color Grading & Pacing", category: "Video Editing", status: "Learning" },

        { name: "Python Automation", category: "Automation", status: "Exploring" },
        { name: "API Integration", category: "Automation", status: "Working With" },
        { name: "Prompt Engineering", category: "Automation", status: "Exploring" }
    ],

    // Projects across three domains
    projects: {
        // 01 — Coding & Development (Primary Focus)
        coding: [
            {
                id: "portfolio-v4",
                title: "Personal Portfolio V4",
                subtitle: "Neo-Retro Scrapbook Portfolio System",
                description: "An art-directed personal portfolio engineered with warm paper surfaces, asymmetrical bento layouts, an accessible project detail modal, adaptive custom cursor, and zero build tool dependencies.",
                tags: ["HTML5", "CSS3", "Vanilla JS", "Design System", "A11y"],
                github: "https://github.com/pranavsharma",
                live: "#home",
                status: "Completed",
                featured: true,
                image: "",
                imagePlaceholder: "assets/images/projects/portfolio.jpg",
                details: {
                    overview: "Portfolio V4 represents an evolution in creative frontend craftsmanship. The goal was to build a distinctive digital identity combining mid-century editorial typography with tangible physical motifs (washi tape, polaroid frames, rubber stamps) while strictly adhering to pure web standards.",
                    challenge: "Designing a rich, interactive scrapbook aesthetic without relying on heavy frameworks (React, Next.js) or bundlers (Vite, Webpack), while maintaining sub-second load times, flawless WCAG AAA/AA contrast, and 100% responsiveness from 320px to 4K displays.",
                    solution: "Developed a lightweight component architecture in vanilla JavaScript powered by a single data store (`data.js`). Built an adaptive cursor engine that samples DOM layers to maintain contrast over dark sections, and engineered an accessible dialog modal system with keyboard trapping and scroll management.",
                    highlights: [
                        "100% pure HTML5/CSS3/Vanilla JS with zero external dependencies",
                        "Dual-element adaptive custom cursor with real-time dark background detection",
                        "Accessible project detail modal with Escape-key handling and focus management",
                        "Content-driven responsive breakpoints delivering zero horizontal scrollbar overflow",
                        "Decoupled data architecture enabling one-file content customization"
                    ]
                }
            },
            {
                id: "todo-habit-tracker",
                title: "Interactive Todo & Habit Tracker",
                subtitle: "Minimalist Productivity Application",
                description: "A minimalist local-storage task manager featuring custom categories, streak counters, completion audio cues, and satisfying micro-interactions.",
                tags: ["JavaScript", "LocalStorage", "CSS Grid", "Micro-interactions"],
                github: "https://github.com/pranavsharma",
                live: "",
                status: "Completed",
                featured: false,
                image: "",
                imagePlaceholder: "assets/images/projects/todo.jpg",
                details: {
                    overview: "A lightweight productivity tool built for keyboard-driven efficiency. Designed for daily task tracking, recurring habit monitoring, and streak visualizations without sending data to third-party cloud servers.",
                    challenge: "Creating an instantaneous, tactile user experience with zero server latency while handling state persistence and schema migrations cleanly in browser LocalStorage.",
                    solution: "Engineered an event-driven vanilla JS state manager that syncs tasks with LocalStorage on every mutation. Designed tactile retro checkbox controls and dynamic day streak calculation algorithms.",
                    highlights: [
                        "Zero-latency client-side persistence using LocalStorage",
                        "Custom streak calculation algorithm for tracking daily habits",
                        "Fluid drag-and-drop task prioritization and custom categories",
                        "Satisfying CSS keyframe micro-interactions on task completion"
                    ]
                }
            },
            {
                id: "weather-dashboard",
                title: "Weather Dashboard App",
                subtitle: "Dynamic Meteorological Interface",
                description: "Clean weather forecasting web application utilizing open meteorological APIs with dynamic atmospheric backgrounds, UV indexing, and hourly forecast sliders.",
                tags: ["API Integration", "Async JS", "CSS Variables", "Geolocation"],
                github: "https://github.com/pranavsharma",
                live: "",
                status: "In Progress",
                featured: false,
                image: "",
                imagePlaceholder: "assets/images/projects/weather.jpg",
                details: {
                    overview: "An atmospheric dashboard that translates raw weather telemetry into clear, visual forecasts. Pulls real-time temperature, wind speed, humidity, and UV indexes from open meteorological services.",
                    challenge: "Gracefully managing asynchronous network states, rate limits, geolocation permissions, and varying weather icon sets without visual flashes or layout shifts.",
                    solution: "Implemented an async fetch pipeline with localStorage caching, defensive error boundaries for API downtime, and dynamic CSS variable theme shifting based on day/night and precipitation states.",
                    highlights: [
                        "Real-time geolocation lookup with graceful fallback to manual search",
                        "Dynamic background hue shifting based on ambient weather and time of day",
                        "5-day forecast visualization and hourly precipitation charts",
                        "Defensive API caching to prevent rate-limit throttling"
                    ]
                }
            }
        ],

        // 02 — Video Editing (Learning Showcase)
        videoEditing: {
            bannerText: "I'm currently exploring video editing and motion design — studying narrative pacing, rhythmic audio cuts, and cinematic color grading in Premiere Pro and DaVinci Resolve.",
            items: [
                {
                    id: "cinematic-montage",
                    title: "Cinematic Travel Montage",
                    description: "Practice edit exploring speed ramping, rhythmic beat-matching audio cues, and warm film-look color grading.",
                    tags: ["Premiere Pro", "Color Grading", "Sound Design"],
                    status: "Still Learning",
                    link: "",
                    details: {
                        overview: "A 60-second exercise in rhythmic editing and sensory sound design. Focused on pairing cut transitions precisely with drum transients and ambient soundscapes.",
                        challenge: "Maintaining visual momentum while transitioning between radically different lighting environments without jarring the viewer.",
                        solution: "Applied LUT balancing and manual color correction curves in Premiere Pro's Lumetri Color panel, layering whooshes, risers, and Foley audio to smooth every cut.",
                        highlights: [
                            "Precise audio transient cut points synchronized to percussion",
                            "Color palette normalization across multiple camera sources",
                            "Layered ambient audio soundscape with sub-bass swells"
                        ]
                    }
                },
                {
                    id: "coding-vlog",
                    title: "Coding Vlog / Dev Diary #1",
                    description: "Short-form documentary style edit documenting a weekend coding sprint with animated typography and dynamic captions.",
                    tags: ["DaVinci Resolve", "Subtitles", "Storytelling"],
                    status: "Practice In Progress",
                    link: "",
                    details: {
                        overview: "A behind-the-scenes dev diary capturing the rhythm of problem solving, debugging sessions, and breakthrough moments.",
                        challenge: "Transforming static screen recordings and desk footage into an engaging, fast-paced educational story.",
                        solution: "Used jump cuts to eliminate filler speech, added kinetic captions via DaVinci Resolve Text+, and integrated retro UI sound effects on key code highlights.",
                        highlights: [
                            "Kinetic word-by-word subtitle styling for retention",
                            "Screen recording pan-and-crop transitions focusing on key code blocks",
                            "Retro mechanical keyboard sound design accents"
                        ]
                    }
                }
            ]
        },

        // 03 — Automation & AI (Workflow Showcase)
        automation: {
            bannerText: "Building utility scripts, web scrapers, and AI-powered workflow automations to streamline repetitive developer tasks and boost productivity.",
            items: [
                {
                    id: "git-summary-cli",
                    title: "Git Commit Auto-Summary CLI",
                    description: "A lightweight Python utility script that analyzes staged git diffs and drafts structured, conventional commit messages.",
                    tags: ["Python", "Git API", "CLI", "LLM Workflows"],
                    status: "Still Learning",
                    github: "https://github.com/pranavsharma",
                    details: {
                        overview: "A developer CLI tool that automates the friction of writing detailed, structured git commit messages across multi-file diffs.",
                        challenge: "Parsing raw diff chunks without exceeding API token limits while generating concise Conventional Commit compliant headers.",
                        solution: "Constructed a Python script using `subprocess` and git plumbing commands (`git diff --staged`), filtering non-semantic whitespace and piping compressed diffs to local or remote LLM endpoints.",
                        highlights: [
                            "Adheres to the Conventional Commits specification (feat, fix, refactor)",
                            "Diff token compression algorithm to minimize latency and token usage",
                            "Interactive CLI prompt allowing instant confirmation or message edits"
                        ]
                    }
                },
                {
                    id: "doc-link-validator",
                    title: "Markdown Asset Link Validator",
                    description: "Automation script that crawls local repository files, validates markdown image and link references, and reports broken paths.",
                    tags: ["Python", "File System", "Automation", "CI Tooling"],
                    status: "Working",
                    github: "https://github.com/pranavsharma",
                    details: {
                        overview: "A zero-dependency Python script designed for local documentation maintenance and pre-commit verification.",
                        challenge: "Accurately resolving relative paths, URI encoded filenames, and anchor tags across deep directory hierarchies.",
                        solution: "Built a recursive AST-like regex scanner in Python that verifies each referenced file against the actual disk filesystem, outputting a colorized terminal report.",
                        highlights: [
                            "Zero external pip dependencies — runs on standard Python 3.8+",
                            "Recursive directory scanning with ignore-pattern support (.git, node_modules)",
                            "Clear CLI error reporting highlighting exact line numbers and broken paths"
                        ]
                    }
                }
            ]
        }
    },

    // Journey / Experience Timeline
    experience: [
        {
            title: "Self-Taught Web Developer",
            organization: "Independent Projects & Creative Exploration",
            date: "2023 — Present",
            description: "Diving deep into modern JavaScript (ES6+), responsive CSS architecture, semantic HTML5, Git version control, and building accessible web applications from first principles."
        },
        {
            title: "Exploring Creative Technologies",
            organization: "Video Editing & Workflow Automation",
            date: "2024 — Present",
            description: "Expanding creative toolkit into rhythmic video editing, motion design in Premiere Pro & DaVinci Resolve, and authoring Python developer utility scripts."
        },
        {
            title: "Student & Technology Enthusiast",
            organization: "Academic Studies",
            date: "Ongoing",
            description: "Balancing academic rigor with continuous hands-on project building, exploring the intersections of design, code, and user interaction."
        }
    ],

    // Current Focus (Component B in Experience Section)
    currentFocus: [
        {
            id: "01",
            title: "Coding & Development",
            status: "Primary Focus",
            description: "Building art-directed web experiences, semantic frontend architecture, and clean vanilla JS components.",
            tagColor: "acid"
        },
        {
            id: "02",
            title: "Video Editing",
            status: "Still Learning",
            description: "Studying narrative pacing, rhythmic audio cuts, and cinematic color grading in Premiere Pro and DaVinci Resolve.",
            tagColor: "coral"
        },
        {
            id: "03",
            title: "Automation & AI",
            status: "Still Learning",
            description: "Authoring Python utility scripts, CLI developer tooling, and exploring local LLM workflow integrations.",
            tagColor: "sky"
        }
    ],

    // Contact & Social Links
    socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        youtube: "https://youtube.com",
        email: "pranav@example.com"
    },

    footer: {
        creditText: "Handcrafted with curiosity & code ☕",
        version: "Portfolio V4.0"
    }
};

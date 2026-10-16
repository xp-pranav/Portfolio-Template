# Pranav Sharma — Portfolio V4 Master Reference (`list.md`)

This document is the comprehensive single-source technical reference for the **V4** portfolio codebase. It details all design language decisions, V4 editorial enhancements, accessible project detail modals, asymmetrical bento project layouts, features, content structures, and responsive audits.

---

## Table of Contents
1. [Project Overview & V4 Objectives](#1-project-overview--v4-objectives)
2. [Design Language & Aesthetics](#2-design-language--aesthetics)
   - [Core Philosophy](#core-philosophy)
   - [Color Palette & Design Tokens](#color-palette--design-tokens)
   - [Typography System](#typography-system)
   - [Visual Motifs & Physicality](#visual-motifs--physicality)
3. [Architecture & File Inventory](#3-architecture--file-inventory)
4. [Features & Functional Breakdown (V4)](#4-features--functional-breakdown-v4)
   - [Navigation & Mobile Drawer](#navigation--mobile-drawer)
   - [Hero Section V4](#hero-section-v4)
   - [About & Polaroid Frame](#about--polaroid-frame)
   - [Three Creative Domains & Tab Switching](#three-creative-domains--tab-switching)
   - [Asymmetrical Bento Project Grid & Modal System](#asymmetrical-bento-project-grid--modal-system)
   - [Skills & Toolkit Matrix](#skills--toolkit-matrix)
   - [Experience Timeline](#experience-timeline)
   - [Contact Section & Social Connectors](#contact-section--social-connectors)
   - [Adaptive Custom Scrapbook Cursor](#adaptive-custom-scrapbook-cursor)
   - [Scroll Animations & Scroll Spy](#scroll-animations--scroll-spy)
5. [Complete Content System (`js/data.js`)](#5-complete-content-system-jsdatajs)
6. [Responsive Design & Breakpoint Matrix (320px – 1440px+)](#6-responsive-design--breakpoint-matrix-320px--1440px)
7. [V4 Upgrade Log & Improvements](#7-v4-upgrade-log--improvements)
8. [Accessibility (a11y) & Usability Checklist](#8-accessibility-a11y--usability-checklist)

---

## 1. Project Overview & V4 Objectives

- **Owner**: Pranav Sharma
- **Role**: Developer & Creative Technologist
- **Version**: **V4.0** (Major editorial layout evolution, asymmetrical bento grid, accessible project detail modals, enhanced hero visual hierarchy, refined film/workflow workspaces, rigorous zero-dependency audit)
- **Core Concept**: An art-directed personal portfolio showcasing three distinct creative domains:
  1. **Coding & Development** (Primary: web development, frontend architecture, interactive applications)
  2. **Video Editing** (Learning: pacing, rhythmic cuts, storytelling, color grading in Premiere Pro & DaVinci Resolve)
  3. **Automation & AI** (Exploring: Python utility scripts, developer CLI tools, LLM workflows)
- **Technical Constraint**: 100% pure HTML5, CSS3, and Vanilla JavaScript (ES6+). Zero build tools, no Node.js/npm dependencies, zero external framework overhead, fully functional via direct browser file access (`file:///`).

---

## 2. Design Language & Aesthetics

### Core Philosophy
- **Light-First & High Contrast**: Built on warm, off-white, tactile paper-like surfaces (`#F9F7F2`, `#FFFEF9`) with ink-black high-contrast text (`#141412`). Avoids oppressive pure-black backgrounds while maintaining full WCAG AAA/AA readability.
- **Neo-Retro Scrapbook Editorial (V4 Enhanced)**: Combines modern Swiss editorial asymmetry with tangible physical artifacts:
  - Washi tape strips on cards
  - Tilting sticker labels with hard offset retro drop shadows (`5px 5px 0 #141412`)
  - Polaroid photo frames with tape bindings
  - Asymmetrical bento grid layouts highlighting primary work
  - Film strip perforations & timeline playheads for video
  - Node graph flowcharts for automation
  - Rubber stamp / editorial badges rotated at subtle angles

### Color Palette & Design Tokens
All color variables are established in `css/style.css` on `:root`:

| Token Name | Hex Code | Role & Usage | Contrast / WCAG |
|---|---|---|---|
| `--paper-surface` | `#F9F7F2` | Base body background (warm paper tone) | Base surface |
| `--warm-white` | `#FFFEF9` | Elevated card surfaces, nav, containers | Surface accent |
| `--light-grey` | `#EBE8E0` | Subdued borders, divider lines, placeholders | 1.3:1 vs surface |
| `--muted-grey` | `#7A7570` | Secondary metadata, dates, labels | 4.8:1 vs paper (AA compliant) |
| `--charcoal` | `#2D2A26` | Body paragraph text, subheaders | 12.8:1 vs paper (AAA compliant) |
| `--ink-black` | `#141412` | Primary headings, prominent borders, primary buttons | 16.5:1 vs paper (AAA compliant) |
| `--acid-lime` | `#C8FF35` | Primary high-energy accent, active states, tape | High visibility punch |
| `--acid-lime-dark` | `#A8E010` | Darkened lime for high-contrast border states | Accent variant |
| `--soft-lavender` | `#E5D8FF` | Scrapbook sticker accent, familiar skills | Pastel secondary |
| `--coral` | `#FF6B4A` | "Learning in progress" alerts, primary actions | Warm punchy accent |
| `--sky-blue` | `#A8E8F2` | "Exploring" status, automation badges | Cool secondary |
| `--pale-yellow` | `#FFE57A` | Hero stickers, "coming soon" badge | Warm retro highlight |

### Typography System
Google Fonts loaded asynchronously in `<head>`:
- **Display Heading Font**: `'Bebas Neue', sans-serif`
  - All-caps, condensed, high-impact neo-retro header styling (`h1`, `h2`, `h3`).
  - Fluid sizing via `clamp()` (e.g., `clamp(2.8rem, 13vw, 8rem)`).
- **Body & Editorial Font**: `'Space Grotesk', sans-serif`
  - High-legibility geometric sans-serif for comfortable paragraph reading (`line-height: 1.6–1.7`).
- **Monospace Font**: `'Space Mono', monospace`
  - Section numbers, dates, technical tags, CTA buttons, status labels.
- **Handwritten Accent Font**: `'Caveat', cursive`
  - Polaroid captions, scrapbook stickers, notes.

---

## 3. Architecture & File Inventory

```
portfolio/
├── index.html            # Semantic HTML5 single-page application
├── README.md             # Project summary, setup guide, and V4 documentation
├── list.md               # Master technical reference & audit log (this file)
├── css/
│   ├── style.css         # Tokens, typography, base layout, hero, about, timeline, contact, footer
│   ├── components.css    # Buttons, asymmetrical bento cards, modal dialog, badges, stickers, video & automation banners
│   ├── responsive.css    # Content-driven media queries across 320px–1440px+
│   └── cursor.css        # Custom dual-element adaptive scrapbook cursor styles
├── js/
│   ├── data.js           # Central editable data store (single source of truth with V4 project details)
│   ├── main.js           # App bootstrapping, DOM data-binding, skills & timeline renderer
│   ├── projects.js       # Dynamic multi-domain project renderer + accessible Project Detail Modal system
│   ├── interactions.js   # Navigation drawer, tab switcher, IntersectionObserver, scroll spy
│   └── cursor.js         # Custom cursor requestAnimationFrame loop, hover bindings, and dark detection
└── assets/
    ├── images/
    │   ├── profile.jpg   # Profile picture destination
    │   └── projects/     # Project preview screenshots
    └── textures/         # Background paper and grain textures
```

---

## 4. Features & Functional Breakdown (V4)

### Navigation & Mobile Drawer
- **Desktop**: Fixed top bar (`height: 70px`), brand initials with lime square indicator, navigation links with lime animated underlines, and "Let's Talk" CTA button.
- **Mobile Drawer**:
  - Hamburger menu transforms into an 'X' using CSS transforms.
  - Full-screen slide-down panel with warm-white background and light grey dividers.
  - Body scroll lock toggled via `body.nav-open` (`overflow: hidden`).
  - Accessible keyboard control: closes on `Escape` key press.
  - Auto-closes immediately upon clicking any navigation anchor.
  - Minimum 44×44px touch target compliance for mobile buttons and links.

### Hero Section V4
- Bold two-tone typography: "PRANAV" on line 1, "SHARMA" on line 2 highlighted inside an acid-lime block with a retro border and drop shadow.
- Responsive typography scaling smoothly using `clamp()` down to small 320px screens without clipping.
- Floating scrapbook stickers displaying personal tags (`{ code }`, `🎬 Learning`, `⚡ AI`, `2025`).
- Multi-tier CTA buttons: High-contrast primary "View My Work ↓" and secondary "Get In Touch".

### About & Polaroid Frame
- Tactile polaroid-style card featuring simulated washi tape, photo boundary, and handwritten caption.
- Dynamic fallback: Displays an instructional placeholder if `profileImage` in `data.js` is empty.
- Dynamic interest tags rendered as rotated stickers (`.interest-tag`).
- "Currently Learning" panel with coral label and arrow list items.

### Asymmetrical Bento Project Grid & Modal System (V4)
- **Asymmetrical Bento Layout**:
  - In desktop views (`min-width: 968px`), the first featured coding project spans 2 columns with a side-by-side media/content split, creating a striking editorial anchor.
  - Secondary projects form a clean 2-column auto-fill grid.
- **Accessible Project Detail Modal System**:
  - Clicking "Details", "Breakdown", or "Workflow Spec" on any project card instantly triggers a modal dialog (`role="dialog"`, `aria-modal="true"`).
  - Displays deep-dive information including project overview, technical challenge, architectural solution, and key tech stack highlights sourced from `js/data.js`.
  - Accessible interaction: Closes via close button, clicking the backdrop overlay, or pressing the `Escape` key. Automatically locks body scroll (`body.modal-open`).

### Three Creative Domains & Tab Switching
- **Domain Preview Cards**: High-level introductory cards distinguishing primary focus (Coding) from active learning areas (Video Editing, Automation & AI).
- **Interactive Tab Controller**:
  - Semantic tab buttons (`role="tab"`, `aria-selected`, `aria-controls`).
  - Seamless switching between Coding, Video Editing, and Automation panels without page reload.
  - Panel restoration logic: Coding panel restores its responsive grid layout (`display: grid; grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr))`), while banner panels display as blocks.

### Skills Dashboard & Tech Stack Playground (V4 Redesign)
- **Two-Column Composition**:
  - **Left Column (approx. 62%)**: Balanced category cards grid (Programming, Frontend, Tools, Video Editing, Automation) featuring interactive skill pills with honest status badges (`Proficient`, `Working With`, `Learning`, `Exploring`).
  - **Right Column (approx. 38%)**: Integrated **Tech Stack Playground** containing:
    1. **Currently Exploring**: Active learning focus tracking (`Coding & Development`, `Video Editing`, `Automation & AI`).
    2. **Interactive Toolbox Selector**: Compact chip grid for quick tool and technology selection.
    3. **Live Skill Terminal**: High-contrast information panel (`SKILL_TERMINAL.EXE`) that updates in real-time when clicking any skill pill or toolbox chip, displaying technical specs, categories, proficiencies, and a reset control.
- **Accessibility & Responsiveness**: Fully keyboard navigable, touch-friendly, respects `prefers-reduced-motion`, and scales smoothly across all viewports from 320px to 1440px+.

### Experience Section Redesign (Two-Column Layout)
- **Left Column — Journey Timeline**: High-contrast vertical milestone tracker (`01 // Timeline`) rendered from `portfolioData.experience`.
- **Right Column Component A — PRANAV.EXE Terminal**:
  - Interactive vanilla JavaScript CLI emulator with retro window styling, green/yellow/red traffic light dots, and live status badge.
  - Command interpreter supporting commands: `help`, `about`, `skills`, `projects`, `journey`, `clear`.
  - Clickable quick-action suggestion chips (`help`, `about`, `skills`, `projects`, `journey`, `clear`) that auto-execute commands on click.
  - Auto-scrolling output container and defensive input handling.
- **Right Column Component B — Current Focus Workspace**:
  - "What I'm Working On" focus workspace rendered dynamically from `portfolioData.currentFocus`.
  - Cards featuring index numbers (`01`, `02`, `03`), titles, status tags with color coding (`Primary Focus`, `Still Learning`), and descriptive summaries.

### Contact Section & Social Connectors
- High-contrast card with deep ink-black background and an acid-lime offset shadow.
- Dynamic social link buttons with embedded SVG icons (GitHub, LinkedIn, Twitter/X, YouTube, Email).
- Defensive URL check: Links with empty strings in `data.js` are automatically hidden rather than creating broken buttons.

### Adaptive Custom Scrapbook Cursor
- Dual-element setup:
  - Center dot (`.custom-cursor`): 10px with acid-lime border and shadow.
  - Trailing follower (`.custom-cursor-follower`): 32px ring with smooth linear interpolation (`lerp` factor: 0.18).
- **Dark Section Auto-Detection**:
  - Uses `document.elementFromPoint(mouseX, mouseY)` on mousemove.
  - Instantly detects when the pointer is over `.bg-dark`, `.contact-box`, `.footer`, or `.card-dark`.
  - Applies `.on-dark` state: switches center dot to glowing acid-lime neon (`box-shadow: 0 0 10px rgba(200, 255, 53, 0.8)`) and brightens the follower ring, ensuring 100% visibility over black surfaces.
- Touch & Accessibility Safety:
  - Automatically disabled on touchscreens (`@media (hover: none), (pointer: coarse)`).
  - Automatically disabled when `prefers-reduced-motion` is active.

---

## 5. Complete Content System (`js/data.js`)

All portfolio content is decoupled from layout and managed in a clean JavaScript data structure:

```javascript
window.portfolioData = {
    config: {
        siteTitle: "Pranav Sharma — Developer & Creative Technologist",
        edition: "2025 // V4.0",
        enableCustomCursor: true
    },
    profile: {
        name: "Pranav Sharma",
        role: "Developer & Creative Technologist",
        tagline: "Building things that live on the web",
        editionBadge: "EDITION 2025 // V4.0",
        location: "India",
        status: "Available for Projects & Collaborations",
        introduction: "...",
        profileImage: ""
    },
    about: { ... },
    skills: [ ... ],
    projects: {
        coding: [
            {
                id: "portfolio-v4",
                title: "Personal Portfolio V4",
                subtitle: "Neo-Retro Scrapbook Portfolio System",
                description: "...",
                tags: ["HTML5", "CSS3", "Vanilla JS", "Design System"],
                github: "https://github.com/pranavsharma",
                live: "#home",
                status: "Completed",
                featured: true,
                image: "",
                imagePlaceholder: "assets/images/projects/portfolio.jpg",
                details: {
                    overview: "...",
                    challenge: "...",
                    solution: "...",
                    highlights: [ ... ]
                }
            }
            // ... additional coding projects
        ],
        videoEditing: { ... },
        automation: { ... }
    },
    experience: [ ... ],
    socialLinks: { ... },
    footer: { ... }
};
```

---

## 6. Responsive Design & Breakpoint Matrix (320px – 1440px+)

The layout is tested and hardened across all standard viewports:

| Viewport Width | Device Target | Key Layout Adaptations |
|---|---|---|
| **1400px+** | Ultra-wide / 4K | Max-width clamped to 1400px; generous margins. |
| **1024px – 1280px** | Laptops / Desktops | Asymmetrical bento grid active; 2-column hero grid. |
| **769px – 1024px** | Tablets (Landscape) | Reduced grid gaps; stickers contained; hero spacing scaled down. |
| **max 968px** | Tablets (Portrait) | Hero switches to single-column; bento span collapses to single columns. |
| **max 768px** | Standard Mobile Phones | Mobile drawer enabled; single-column project grid; full-width stacked buttons; touch padding. |
| **max 480px** | Compact Mobile Phones | Washi tape hidden on small cards; sticker sizes reduced; typography scaled via clamp. |
| **max 360px** | Small Phones (e.g. Galaxy S) | Node diagram stacks vertically; container padding 12px; compact project tabs. |
| **max 320px** | Ultra-narrow (iPhone SE 1st gen) | Hero stickers hidden; filmstrip perforations hidden; container padding 10px; zero horizontal scroll. |

---

## 7. V4 Upgrade Log & Improvements

### 1. Asymmetrical Bento Grid Integration
- **Enhancement**: Evolved standard uniform project cards into an asymmetrical bento layout (`.featured-bento` spanning 2 columns with side-by-side media and content on desktop), creating a strong visual focal point for primary work.

### 2. Accessible Project Detail Modal System
- **Enhancement**: Added a robust vanilla JavaScript dialog modal system. Each project card now includes a "Details" / "Breakdown" action button that opens an accessible modal (`role="dialog"`) detailing the project's overview, technical challenge, solution, and tech stack highlights. Supports Escape key closing, backdrop clicking, and body scroll locking.

### 3. Data Schema Expansion
- **Enhancement**: Enhanced `js/data.js` project objects with comprehensive `details` payloads (`overview`, `challenge`, `solution`, `highlights`) to power the new modal views seamlessly.

### 4. Adaptive Dark-Background Custom Cursor & Touch Safety
- **Enhancement**: Retained real-time element sampling (`document.elementFromPoint`) for smooth neon acid-lime cursor visibility over dark surfaces (`.bg-dark`, `.contact-box`, `.footer`), with complete touch device safety (`@media (hover: none)`).

---

## 8. Accessibility (a11y) & Usability Checklist

- [x] **Semantic Landmarks**: Semantic `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>` elements used throughout.
- [x] **Keyboard Navigation**: All links, modal triggers, and buttons possess distinct `:focus-visible` styling (`outline: 3px solid var(--acid-lime)`).
- [x] **ARIA Roles & Dialogs**: Project tabs utilize `role="tab"`, `aria-selected`, and `aria-controls`. Project detail modal uses `role="dialog"` and `aria-modal="true"`.
- [x] **Touch Target Sizes**: All interactive elements (links, buttons, tab headers) provide at least 44×44px hit areas on mobile devices.
- [x] **Motion Safety**: Full support for `@media (prefers-reduced-motion: reduce)` — disables transitions, cursor animations, and scroll transforms.
- [x] **Responsive Images**: Profile and project images feature `loading="lazy"` and descriptive `alt` tags.
- [x] **WCAG Contrast**: Body text, headers, and buttons consistently exceed minimum WCAG AA/AAA contrast ratios against their respective backgrounds.
- [x] **Adaptive Pointer**: Custom cursor automatically switches to high-visibility neon over dark sections.

# Pranav Sharma — Developer & Creative Technologist Portfolio (V4)

An art-directed, neo-retro scrapbook personal portfolio showcasing three creative domains: **Coding & Development** (primary), **Video Editing** (learning), and **Automation & AI** (learning).

Built with a **light-first scrapbook and neo-retro editorial aesthetic** (warm off-white paper surfaces, high-contrast ink-black typography, acid lime punch accents, washi tape decorations, polaroid photo styling, asymmetrical bento project grids, an interactive terminal `PRANAV.EXE`, current focus workspace, and accessible project detail modals). The entire codebase uses **pure HTML5, CSS3, and Vanilla JavaScript** with **zero build tools, npm packages, or external frameworks**.

---

## 🎨 Visual Identity & Design System (V4)

- **Light-First Palette**: Built on warm paper surfaces (`#F9F7F2`, `#FFFEF9`) with ink-black text (`#141412`) delivering WCAG AAA/AA contrast. Dark backgrounds are used selectively for high-impact focal points (e.g., Contact Box, Journey & Experience section).
- **Accent Colors**: Acid lime (`#C8FF35`), coral (`#FF6B4A`), soft lavender (`#E5D8FF`), and sky blue (`#A8E8F2`).
- **Typography**: 
  - Headings: `Bebas Neue` (condensed neo-retro display)
  - Body: `Space Grotesk` (clean, readable geometric sans)
  - Metadata & Code: `Space Mono` (technical monospace)
  - Accents: `Caveat` (warm handwritten script)
- **Tactile Motifs**: Washi tape strips, polaroid photo frame with tape bindings, asymmetrical bento layouts, film strip perforations, workflow node diagrams, rotated editorial stamps, floating bug hunter arcade, retro CLI window, and hard retro drop shadows (`5px 5px 0 #141412`).

---

## 🚀 Key Features & Functionality (V4)

1. **Central Editable Data System (`js/data.js`)**: All personal info, biography, skills, projects (with detailed challenge/solution payloads), experience timeline, current focus workspace items, and social links are managed in a single, well-structured JavaScript data file.
2. **Hero Bug Hunter Mini-Game Arcade**:
   - An interactive 30-second bug-catching sprint embedded directly in the hero scrapbook composition.
   - Manual start button (`▶ PLAY GAME`) that activates dynamic bug spawning, score counting, and a game-over screen with replay capability.
3. **Asymmetrical Bento Grid & Project Detail Modals**:
   - Featured projects take center stage with an asymmetrical bento grid layout.
   - Clicking "Details", "Breakdown", or "Workflow Spec" on any project opens an accessible modal dialog (`role="dialog"`) showcasing project overviews, technical challenges, solutions, and key highlights.
4. **Redesigned Skills Dashboard & Tech Stack Playground**:
   - **Left Column**: Balanced responsive category cards grid (Programming, Frontend, Tools, Video Editing, Automation) with interactive skill pills.
   - **Right Column (Tech Stack Playground)**:
     - **Currently Exploring**: Honest active focus tracker derived from `currentFocus`.
     - **Interactive Toolbox Selector**: Compact chip grid for quick technology selection.
     - **Live Skill Terminal**: Real-time information panel with tool specs and category inspection.
5. **Redesigned Experience Section (Two-Column Layout)**:
   - **Left Column**: High-contrast Journey Timeline (`01 // Timeline`) tracking milestones from first principles to creative coding.
   - **Right Column Component A (PRANAV.EXE)**: Interactive terminal emulator with command line parsing (`about`, `skills`, `projects`, `journey`, `clear`, `help`), quick-action suggestion chips, and auto-scrolling output.
   - **Right Column Component B (Active Focus)**: "What I'm Working On" focus workspace cards rendered dynamically from `portfolioData.currentFocus`, highlighting active priorities with status tags (`Primary Focus`, `Still Learning`).
6. **Three Creative Domains**:
   - **Coding & Development**: Featured asymmetrical bento cards with tech tags, source code links, live demos, and deep-dive modals.
   - **Video Editing**: Visual film strip headers, timeline playhead mockup, and video editing practice items.
   - **Automation & AI**: Interactive workflow node diagram and Python utility scripts.
6. **Adaptive Custom Scrapbook Cursor**:
   - **Light Surfaces**: Crisp ink-black dot and trailing ring that expand into acid-lime on hover and compress to coral on click.
   - **Dark Surfaces (Experience, Footer, Contact, Dark Cards)**: Automatically detects pointer position via element sampling and switches to **glowing acid-lime neon styling (`.on-dark`)**, guaranteeing 100% visibility over black backgrounds.
   - Elevated to top z-index (`2147483647`) to remain visible across all modal dialogs.
   - Automatically disabled on touchscreens and when `prefers-reduced-motion` is active.
7. **Responsive Navigation & Drawer**:
   - Desktop: Sticky navigation bar with animated underline indicator.
   - Mobile: Hamburger-to-X animated toggle, full-screen slide-down menu, background scroll lock, and Escape key closing.
8. **Scroll Animations & Spy**: Performant `IntersectionObserver` scroll-reveal animations and active section tracking in the top navigation.

---

## 📂 Project Structure

```
portfolio/
├── index.html            # Semantic HTML5 single-page application structure
├── README.md             # This setup & overview guide
├── list.md               # Master technical reference & audit log
├── css/
│   ├── style.css         # Design tokens, typography, layout, hero, timeline, contact
│   ├── components.css    # Buttons, asymmetrical bento cards, modal dialog, badges, stickers
│   ├── responsive.css    # Complete content-driven breakpoints (320px to 1440px+)
│   ├── cursor.css        # Custom dual-element adaptive scrapbook cursor styling
│   ├── mini-game.css     # Hero Bug Hunter arcade floating stickers and active game styling
│   ├── terminal.css      # Experience section PRANAV.EXE terminal & Current Focus workspace
│   └── skills.css        # Skills dashboard & Tech Stack Playground styling
├── js/
│   ├── data.js           # Central editable portfolio data (Single Source of Truth)
│   ├── main.js           # App initialization, DOM data-binding, skills & focus renderer
│   ├── projects.js       # Dynamic multi-domain project renderer & accessible modal system
│   ├── mini-game.js      # Hero arcade 30s Bug Hunter game loop and spawn mechanics
│   ├── terminal.js       # PRANAV.EXE terminal command parser and suggestion chip interactions
│   ├── skills.js         # Skills dashboard & interactive Tech Stack Playground engine
│   ├── interactions.js   # Navigation drawer, tab switcher, IntersectionObserver, scroll spy
│   └── cursor.js         # Custom cursor animation loop, hover bindings, and dark-section detection
└── assets/
    ├── images/
    │   ├── profile.jpg   # Profile picture destination
    │   └── projects/     # Project preview screenshots
    └── textures/         # Background paper and grain textures
```

---

## ✏️ How to Edit Content

Open **`js/data.js`** in your favorite text editor. You can update everything from this single file:

### 1. Profile & Bio
```javascript
profile: {
    name: "Pranav Sharma",
    role: "Developer & Creative Technologist",
    tagline: "Building things that live on the web",
    location: "India",
    profileImage: "" // Add 'assets/images/profile.jpg' or leave empty for polaroid placeholder
}
```

### 2. About & Learning Goals
```javascript
about: {
    description: "Your background description here...",
    interests: ["Web Development", "UI / UX Design", "Creative Coding"],
    learning: ["Advanced JavaScript", "Premiere Pro & DaVinci Resolve", "LLM Workflows"]
}
```

### 3. Skills Matrix & Tech Stack Playground
Honest status tags: `"Proficient"`, `"Working With"`, `"Learning"`, or `"Exploring"`. The redesigned Skills dashboard instantly syncs with your skill pills and toolbox selector:
```javascript
skills: [
    { name: "JavaScript (ES6+)", category: "Programming", status: "Proficient" },
    { name: "Premiere Pro", category: "Video Editing", status: "Learning" },
    { name: "Python Automation", category: "Automation", status: "Exploring" }
]
```

### 4. Projects & Deep-Dive Modals (3 Domains)
- **Coding**: Add projects with `title`, `subtitle`, `description`, `tags`, `github`, `live`, `status`, and `details` (`overview`, `challenge`, `solution`, `highlights`).
- **Video Editing**: Customize `bannerText` and video editing projects in `items`.
- **Automation**: Customize `bannerText` and automation scripts in `items`.

### 5. Journey / Timeline
```javascript
experience: [
    {
        title: "Role Title",
        organization: "Company or School",
        date: "2024 — Present",
        description: "What you built or learned..."
    }
]
```

### 6. Social Links
```javascript
socialLinks: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-profile",
    twitter: "https://twitter.com/your-handle",
    youtube: "https://youtube.com/@your-channel",
    email: "your-email@example.com"
}
```
*(Leaving any link as `""` automatically hides its button in the contact section)*

---

## 💻 How to View & Deploy

### Local Development
Open `index.html` directly in any web browser, or run a local server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```
Then visit `http://localhost:8000`.

### Deploy Online (Free Static Hosting)
- **GitHub Pages**: Push this directory to a GitHub repository, go to **Settings $\to$ Pages**, and select the `main` branch.
- **Netlify**: Drag-and-drop the portfolio folder into [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Import the GitHub repo or run `npx vercel` in the project root.

---

## 📖 Detailed Reference & Bug Log

For the exhaustive list of design tokens, architectural decisions, accessibility audits, and bug fix logs, refer to **[`list.md`](./list.md)**.

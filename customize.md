# 🎨 Customize Guide — Portfolio V4 (A → Z)

This is the **complete, from-A-to-Z customization manual** for your portfolio. It tells you **exactly which file and which line/value** to change to alter *anything* on the site — content, branding, colors, fonts, layout, animations, the terminal, the mini-game, and the responsive behavior.

> **TL;DR:** ~90% of what visitors read lives in one file — **`js/data.js`**. Open it, edit a string, save, refresh your browser. Everything else (labels, colors, fonts, game settings) is covered below.

---

## ⚡ 60-Second Quick Start

1. Open **`js/data.js`** in any text editor (VS Code works great).
2. Change `profile.name`, `profile.role`, `profile.introduction`, the `skills` array, and your `socialLinks`.
3. Save the file and refresh `index.html` in your browser.
4. Done — the whole site updates automatically (no build step, no npm, no server).

To preview locally, either double-click `index.html`, or run a server:

```bash
python3 -m http.server 8000      # then visit http://localhost:8000
```

---

## 🗂️ How the site is wired (4 edit layers)

| Layer | Files | What it controls |
|---|---|---|
| 1. **Content** | `js/data.js` | Name, role, bio, skills, projects, timeline, focus, social links, footer credit |
| 2. **Structure & labels** | `index.html` | Section headings, nav labels, domain cards, tab names, terminal header, hero name (letters `PRANAV/SHARMA`), CTA button text |
| 3. **Look & feel** | `css/*.css` | Colors, fonts, spacing, borders, shadows, layout, breakpoints, cursor, game/terminal/skills styles |
| 4. **Behavior** | `js/*.js` | Terminal commands, mini-game rules, scroll animations, tab switching, modal system, cursor engine |

### 📁 File map

```
portfolio/
├── index.html            ← hard-coded labels & section markup
├── css/
│   ├── style.css         ← design tokens (:root) + base + hero/about/work/contact/footer
│   ├── components.css    ← buttons, bento cards, tabs, modal, stickers, stamps
│   ├── terminal.css      ← PRANAV.EXE terminal + current-focus workspace
│   ├── skills.css        ← skills dashboard + tech stack playground
│   ├── mini-game.css     ← Bug Hunter arcade
│   ├── cursor.css        ← custom cursor colors/states
│   └── responsive.css    ← all breakpoints (320px → 1440px+)
├── js/
│   ├── data.js           ← ⭐ SINGLE SOURCE OF TRUTH (edit content here)
│   ├── main.js           ← renders data → HTML + social SVG icons
│   ├── projects.js       ← project cards + detail modal
│   ├── skills.js         ← skills dashboard logic + status→color mapping
│   ├── terminal.js       ← terminal commands
│   ├── mini-game.js      ← Bug Hunter game rules
│   ├── interactions.js   ← tabs, mobile nav, scroll spy, animations
│   └── cursor.js         ← custom cursor logic
└── assets/
    ├── images/profile.jpg        ← your photo (referenced from data.js)
    ├── images/projects/          ← project screenshots
    └── textures/                 ← optional paper/grain textures
```

---

## 🔤 The A → Z Customization Guide

Jump to any letter:

| | | | | |
|---|---|---|---|---|
| [A — Assets & images](#a--assets--images) | [B — Brand](#b--brand--browser-tab) | [C — Colors](#c--colors--design-tokens) | [D — Domains & tabs](#d--domain-cards--project-tabs) | [E — Experience & timeline](#e--experience-timeline--current-focus) |
| [F — Footer & fonts](#f--footer--fonts) | [G — Google Fonts](#g--google-fonts--typography) | [H — Hero section](#h--hero-section) | [I — Interests & learning](#i--interests--currently-learning) | [J — Journey (terminal)](#j--journey-terminal-command) |
| [K — Kickoff config](#k--kickoff--site-config) | [L — Layout & spacing](#l--layout--spacing) | [M — Mini-game](#m--mini-game-bug-hunter) | [N — Navigation](#n--navigation) | [O — Output (unused fields)](#o--output--currently-unrendered-fields) |
| [P — Projects](#p--projects-coding-video-automation) | [Q — Quick actions (CTAs)](#q--quick-actions--cta-buttons) | [R — Responsive breakpoints](#r--responsive-breakpoints) | [S — Skills & statuses](#s--skills--statuses--tech-playground) | [T — Terminal](#t--terminal-pranavexe) |
| [U — URLs & social links](#u--urls--social-links) | [V — Version & edition labels](#v--version--edition-labels) | [W — Washi tape & motifs](#w--shadows--washi-tape--visual-motifs) | [X — (X)tra interactions](#x--extra-interactions-cursor--scroll) | [Y — Year & copyright](#y--year--copyright) |
| [Z — Zero-dependency & deploy](#z--zero-dependency--deploy-checklist) | | | | |

---

## A — Assets & images

Images are referenced **in `js/data.js`** (or `index.html`), not hard-coded into the CSS.

**Your profile photo (polaroid frame):**

```javascript
// js/data.js → profile
profileImage: ""   // ← set to "assets/images/profile.jpg"
```

- Leave it `""` to keep the handwritten "your photo here → assets/images/profile.jpg" placeholder.
- Put your file at `assets/images/profile.jpg` (or any relative path).
- The polaroid caption below the photo comes from `profile.name`.

**Project preview images (coding projects):**

```javascript
// js/data.js → projects.coding[] each item
image: "",                                  // real image URL/path (optional)
imagePlaceholder: "assets/images/projects/portfolio.jpg"
```

- Drop screenshots into `assets/images/projects/` and set `image` (or both fields).
- Video + automation cards use a styled placeholder instead of an image, so no image setup needed there.

**Create the folders if missing:**

```bash
mkdir -p assets/images/projects assets/textures
```

---

## B — Brand & browser tab

**Browser tab title** — set in two places:

1. `index.html` line 7 `<title>…</title>` (static fallback).
2. `js/data.js → profile.name` — `main.js` overwrites the tab title at runtime to `"{name} — Portfolio"`.

**Meta description (search/social previews)** — `index.html` line 6:

```html
<meta name="description" content="Pranav Sharma — Developer & Creative Technologist. Portfolio…">
```

**Nav logo initials** — `index.html` line 31 (hard-coded, not from data):

```html
<a href="#home" class="nav-brand" aria-label="Pranav Sharma — Home">
    <span>PS</span><span class="dot" aria-hidden="true"></span>
</a>
```

Change `PS` and the `aria-label` to match your name.

**Favicon** — none is set by default. Add one inside `<head>`:

```html
<link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
```

---

## C — Colors & design tokens

Every color is a **CSS variable** in `css/style.css` `:root { }` (lines ~10–57). Change a value **once** and it updates everywhere.

| Token | Default | Used for |
|---|---|---|
| `--paper-surface` | `#F9F7F2` | Page background (light) |
| `--warm-white` | `#FFFEF9` | Cards, light sections |
| `--light-grey` | `#EBE8E0` | Subtle backgrounds, placeholders |
| `--muted-grey` | `#7A7570` | Secondary/muted text |
| `--charcoal` | `#2D2A26` | Body paragraph text |
| `--ink-black` | `#141412` | Headings, borders, dark sections |
| `--acid-lime` | `#C8FF35` | Primary accent & highlights |
| `--acid-lime-dark` | `#A8E010` | (reserved darker accent) |
| `--soft-lavender` | `#E5D8FF` | Lavender sticker/accents |
| `--coral` | `#FF6B4A` | Coral accents, "Learning" status |
| `--sky-blue` | `#A8E8F2` | Sky accents, "Exploring" status |
| `--pale-yellow` | `#FFE57A` | Yellow sticker/accents |

```css
:root {
    --acid-lime: #C8FF35;   /* ← change your accent color here */
    --coral:    #FF6B4A;
}
```

> Tip: keep one **monochrome** set (paper/ink) + 2–3 accents. Everything stays coherent automatically because the whole site references these variables.

---

## D — Domain cards & project tabs

The three preview cards and the tab labels live in **`index.html`** (they are *not* data-driven).

**Domain preview cards (lines ~171–188):**

```html
<div class="domain-preview-card primary animate-on-scroll">
    <span class="domain-tag">01 — Primary</span>
    <h3>CODING<br>&amp; DEV</h3>
    <p>Building web experiences with code.</p>
</div>
<!-- repeat for VIDEO EDITING / AUTOMATION & AI -->
```

**Tab buttons (lines ~191–195):**

```html
<button class="project-tab active" data-tab="coding" …>⌨ Coding Projects</button>
<button class="project-tab" data-tab="video" …>🎬 Video Editing</button>
<button class="project-tab" data-tab="automation" …>⚡ Automation</button>
```

Keep the `data-tab` values (`coding`, `video`, `automation`) unchanged — they wire each tab to its panel. Rename the visible text/emojis freely.

---

## E — Experience timeline & current focus

Both come from **`js/data.js`**.

**Timeline (`experience: []`):** each entry has `title`, `organization`, `date`, `description`.

```javascript
experience: [
  {
    title: "Self-Taught Web Developer",
    organization: "Independent Projects & Creative Exploration",
    date: "2023 — Present",
    description: "Diving deep into modern JavaScript…"
  }
]
```

Add/remove entries as needed — they render top-to-bottom.

**Current Focus workspace (`currentFocus: []`):**

```javascript
{ id: "04", title: "Mobile App Development", status: "Still Learning",
  description: "…", tagColor: "sky" }
```

- `id` → the small label on the left (`01`, `02`, …).
- `status` → the colored tag text.
- `tagColor` → **`"acid"`** (green), **`"coral"`** (orange), or **`"sky"`** (blue). Anything else falls back to green.

The heading "Current Focus Workspace" and its intro line are hard-coded in `index.html` (lines ~291–297).

---

## F — Footer & typography sizes

**Footer content** is driven by **`js/data.js → footer`** and **`profile.name`**:

```javascript
footer: {
    creditText: "Handcrafted with curiosity & code ☕",   // ← the "Built with…" line
    version: "Portfolio V4.0"                              // currently not displayed
}
```

The footer copyright line structure is in **`index.html`** (line 333):

```html
<p>&copy; 2025 <span data-field="footerName">Pranav Sharma</span>.
   <span data-field="creditText">Built with curiosity ☕</span></p>
```

`footerName` is auto-set to `profile.name` by `main.js`. Footer social text links are populated from `socialLinks` — see **U — URLs**.

**Base typography sizes** (if type feels too big/small) — `css/style.css` lines 111–123:

```css
h1 { font-size: clamp(3rem, 10vw, 7.5rem); }
h2 { font-size: clamp(2.2rem, 5vw, 4rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2.2rem); }
p  { font-size: 1.05rem; line-height: 1.7; }
```

---

## G — Google Fonts & typography

The site loads four font families (`index.html` line 12) and maps them to CSS variables (`css/style.css` lines ~28–31):

```css
--font-display: 'Bebas Neue', 'Anton', 'Impact', sans-serif;    /* headings */
--font-body:    'Space Grotesk', -apple-system, …, sans-serif;  /* paragraphs */
--font-mono:    'Space Mono', 'SF Mono', monospace;             /* labels/code */
--font-hand:    'Caveat', 'Comic Sans MS', cursive;             /* handwritten */
```

**To swap a font:**

1. Add the new family to the Google Fonts `<link>` in `index.html`.
2. Update the matching CSS variable in `css/style.css`.

Example — change the body font to *Inter*:

```html
<!-- index.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
```
```css
/* css/style.css */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

> Changing only the `<link>` (or only the CSS) won't work — both must match.

---

## H — Hero section

The hero name is **hard-coded** in HTML; role & intro are **data-driven**.

**Big name (`index.html` lines 58–61):**

```html
<h1 class="hero-name">
    PRANAV<br>
    <span class="highlight">SHARMA</span>
</h1>
```

Edit `PRANAV` and `SHARMA` directly (put your last name in the highlighted `<span>`).

**Role, intro & profile (`js/data.js → profile`):**

```javascript
profile: {
    name: "Pranav Sharma",                          // → polaroid caption, footer, tab title
    role: "Developer & Creative Technologist",      // → hero role line (data-field="role")
    tagline: "Building things that live on the web",// reserved (see O)
    editionBadge: "EDITION 2025 // V4.0",           // reserved (see O)
    location: "India",                              // only shown where data-field="location" exists
    status: "Available for Projects & Collaborations", // shown in terminal "about"
    introduction: "I build creative, high-performance web experiences…", // hero paragraph
    profileImage: ""                                // see A — Assets
}
```

The small "— PORTFOLIO 2025" label is hard-coded in `index.html` line 57; the CTA buttons are covered in **Q**.

---

## I — Interests & "currently learning"

These live in **`js/data.js → about`** and are rendered by `main.js`.

```javascript
about: {
    headline: "Building things, learning always.",   // reserved (see O) — the h2 is hard-coded in HTML
    description: "I'm a student and self-taught developer…",  // → About paragraph
    philosophy: "I believe the most compelling…",    // reserved (see O)
    interests: [                                     // → "Interests" tag chips
        "Web Development", "UI / UX Design", "Creative Coding",
        "Video Editing", "AI Workflows", "Open Source"
    ],
    learning: [                                      // → "Currently Learning" list
        "Advanced JavaScript & Frontend Architecture",
        "Video editing workflows & Premiere Pro / DaVinci Resolve",
        "Python automation scripts & LLM integrations"
    ]
}
```

- **To change the About paragraph**, edit `about.description` (it fills the `data-field="aboutDescription"` element).
- **To edit the big About heading** ("Building things, learning always."), edit `index.html` lines 138–141 — it is *not* auto-read from `about.headline`.
- The "Interests" and "Currently Learning" labels themselves are hard-coded in `index.html` (lines 149 & 154).

---

## J — Journey (terminal command)

"Journey" is just a friendly alias for your **Experience timeline** — see **E** for the `experience: []` data.

The terminal also has a `journey` command (typed in PRANAV.EXE) that prints the same `experience[]` entries. It's defined in `js/terminal.js`. No separate data to edit.

---

## K — Kickoff (site config)

There's a `config` object at the top of **`js/data.js`**:

```javascript
config: {
    siteTitle: "Pranav Sharma — Developer & Creative Technologist", // reserved (see O)
    edition: "2025 // V4.0",                                        // reserved (see O)
    enableCustomCursor: true                                        // NOT currently read (see X)
}
```

⚠️ As shipped, none of these three values are rendered/used by the running site. Edit the actual title in **B**, the edition labels in **V**, and the cursor in **X** instead.

---

## L — Layout & spacing

Layout and spacing are **CSS variables** in `css/style.css` `:root`:

```css
/* Spacing scale */
--space-xs: 0.25rem;  --space-sm: 0.5rem;  --space-md: 1rem;
--space-lg: 1.5rem;   --space-xl: 2.5rem;  --space-2xl: 4rem;  --space-3xl: 6rem;

/* Page container */
--container-width: 1240px;               /* max content width */
--container-padding: var(--space-lg);    /* horizontal page padding */
--nav-height: 70px;                      /* navigation bar height */
```

- Make the site **wider/narrower**: change `--container-width` (it expands to `1400px` on ≥1400px screens via `css/responsive.css`).
- Add **more breathing room**: increase the `--space-*` tokens.
- Section vertical padding is set via `.section { padding: … }` in `css/style.css`.

---

## M — Mini-game (Bug Hunter)

All game rules are in **`js/mini-game.js`**.

| Setting | Where | Default |
|---|---|---|
| Game length | `var timeLeft = 30` | 30 seconds |
| Points per bug | `score += 10` | +10 |
| Bug emojis | `bugEmojis = ['🐛','🐞','👾','🐜','⚡']` | 5 emojis |
| Bug lifetime | `setTimeout(…, 2200)` | bug disappears after 2.2s |
| Start button | `btn-play-game` text | "▶ PLAY GAME" |
| Idle stickers | `renderIdleState()` markups | "🐛 Bug Hunter", "30s Sprint ⚡" |
| Game-over | `endActiveGame()` markup | "GAME OVER", "▶ PLAY AGAIN", "← Back to Portfolio" |

**Example** — make a 60-second game worth 25 points per bug:

```javascript
var timeLeft = 60;      // was 30
// …inside catchBug():
score += 25;            // was 10
```

To change the emojis, edit:

```javascript
var bugEmojis = ['🐛', '🐞', '👾', '🐜', '⚡', '🦋', '🕷️'];
```

> The floating decorative badges ("bug.py:42", "404: bug_found", etc.) and stickers are in `renderIdleState()` inside `js/mini-game.js` — search for those strings to rename them.

---

## N — Navigation

The nav bar is **hard-coded** in `index.html` (lines 28–46).

**Links:**

```html
<ul class="nav-links" id="nav-links">
    <li><a href="#home" class="nav-link active">Home</a></li>
    <li><a href="#about" class="nav-link">About</a></li>
    <li><a href="#work" class="nav-link">Work</a></li>
    <li><a href="#skills" class="nav-link">Skills</a></li>
    <li><a href="#experience" class="nav-link">Experience</a></li>
    <li><a href="#contact" class="nav-link">Contact</a></li>
</ul>
```

- Rename the visible labels freely (e.g. "Work" → "Projects").
- Keep the `href="#…"` values matching the `id` of the corresponding `<section>` (e.g. `#work` ↔ `<section id="work">`).
- The "Let's Talk" CTA button is the `<a class="nav-cta">` near line 41.

**Brand initials** are covered in **B**.

---

## O — Output (currently unrendered fields)

These fields exist in `js/data.js` but are **not displayed anywhere yet** (good to know so you don't waste time editing them and seeing no change):

| Field | Location | Why it's unused |
|---|---|---|
| `config.siteTitle` | `config` | Tab title is built from `profile.name` instead |
| `config.edition` | `config` | No element reads it |
| `config.enableCustomCursor` | `config` | `cursor.js` doesn't check it (see X) |
| `profile.tagline` | `profile` | No `data-field="tagline"` element in HTML |
| `profile.editionBadge` | `profile` | No element reads it |
| `about.headline` | `about` | The About `<h2>` is hard-coded |
| `about.philosophy` | `about` | No element reads it |
| `footer.version` | `footer` | Footer only prints `creditText` + name |

**To surface any of them**, add an element with the matching `data-field` (for the bindable ones) or update the render code in `js/main.js`.

```html
<!-- example: reveal the tagline under the hero intro -->
<p class="hero-intro" data-field="tagline"></p>
```

---

## P — Projects (Coding / Video / Automation)

All projects live in **`js/data.js → projects`**, split into three groups. Every card's deep-dive modal is powered by an optional `details` object.

### 1. Coding — `projects.coding[]`

```javascript
{
    id: "portfolio-v4",
    title: "Personal Portfolio V4",
    subtitle: "Neo-Retro Scrapbook Portfolio System",
    description: "…",                          // short card blurb
    tags: ["HTML5", "CSS3", "Vanilla JS"],      // pill tags
    github: "https://github.com/…",             // optional (hide with "")
    live: "#home",                              // optional live URL
    status: "Completed",                        // shown on the badge
    featured: true,                             // true → spans 2 columns (bento)
    image: "",                                  // optional real screenshot
    imagePlaceholder: "assets/images/projects/portfolio.jpg",
    details: {                                  // powers the "Details" modal
        overview: "…",
        challenge: "…",
        solution: "…",
        highlights: ["…", "…", "…"]
    }
}
```

- `featured: true` makes the first card the big 2-column "featured bento" tile. Only set it on one card.
- Leave `github`/`live` as `""` to hide those buttons.

### 2. Video Editing — `projects.videoEditing`

```javascript
videoEditing: {
    bannerText: "I'm currently exploring video editing…",   // top intro line
    items: [
        {
            id: "cinematic-montage",
            title: "Cinematic Travel Montage",
            description: "…",
            tags: ["Premiere Pro", "Color Grading", "Sound Design"],
            status: "Still Learning",
            link: "",                              // optional sample/reel URL
            details: { overview, challenge, solution, highlights }
        }
    ]
}
```

### 3. Automation — `projects.automation`

```javascript
automation: {
    bannerText: "Building utility scripts, web scrapers…",
    items: [
        {
            id: "git-summary-cli",
            title: "Git Commit Auto-Summary CLI",
            description: "…",
            tags: ["Python", "Git API", "CLI"],
            status: "Still Learning",
            github: "https://github.com/…",
            details: { overview, challenge, solution, highlights }
        }
    ]
}
```

**Adding a new project** = copy an existing object in the matching array and change its values. There's no limit on the number of items.

**If a list is empty**, the renderer shows a friendly "coming soon" callout card automatically.

---

## Q — Quick actions (CTA buttons)

All button/CTA label strings are **hard-coded** in `index.html`:

**Hero (lines 68–71):**

```html
<a href="#work" class="btn btn-primary">View My Work ↓</a>
<a href="#contact" class="btn btn-secondary">Get In Touch</a>
```

**Navigation (line 41):** `Let's Talk` (see N).

**Terminal suggestion chips (lines 278–285):** `help`, `about`, `skills`, `projects`, `journey`, `clear`.

**Project card action buttons** are generated in `js/projects.js` — notably the "Workflow Spec" (automation) and "Details"/"Breakdown" labels. Search `projects.js` for those strings to rename them.

Button **styling** (not text) lives in `css/components.css` under `.btn`, `.btn-primary`, `.btn-secondary`.

---

## R — Responsive breakpoints

All responsive rules are in **`css/responsive.css`**. The breakpoints (and what they do):

| Width | Target | Key change |
|---|---|---|
| ≥1400px | Ultra-wide / 4K | container expands to `1400px` |
| ≤1280px | Laptops | tighter hero/domain gaps |
| ≤1024px | Tablets (landscape) | skills + experience switch to single column |
| ≤968px | Tablets (portrait) | hero stacks to one column |
| ≤768px | Phones | mobile drawer nav, single cards, 44px touch targets |
| ≤480px | Compact phones | smaller stickers/type, stacked buttons |
| ≤360px | Small phones | node diagram stacks, padding 12px |
| ≤320px | iPhone SE 1st gen | stickers/filmstrip hidden, padding 10px |

- Tweaks for cards, hero, nav, contact, skills, terminal, and the mini-game live in their own CSS files too (e.g. `mini-game.css` has its own `@media` blocks).
- The universal reset/overflow rules are at the **top** of `responsive.css`.

---

## S — Skills & statuses + tech playground

Skills are in **`js/data.js → skills`** — a flat array, auto-grouped by `category`.

```javascript
skills: [
    { name: "JavaScript (ES6+)", category: "Programming", status: "Proficient" },
    { name: "Premiere Pro", category: "Video Editing", status: "Learning" },
    { name: "Python Automation", category: "Automation", status: "Exploring" }
]
```

- **Any** values work for `name`, `category`, and `status`. New categories get their own card automatically.
- Categories auto-sort into the left grid; the right "Tech Stack Playground" (Currently Exploring / Toolbox / Skill Terminal) is driven by the **same** skills + `currentFocus`.

**Status → color mapping** (defined in `js/skills.js` + `css/skills.css`):

| Status text you write | Color class | Color |
|---|---|---|
| `Proficient` | `status-proficient` | coral 🟠 |
| `Working With` / `Familiar` | `status-familiar` | lavender 🟣 |
| `Exploring` / `Experimenting` / `Interested` / `Still Learning` | `status-exploring` | sky blue 🔵 |
| anything else (e.g. `Learning`) | `status-learning` | acid lime 🟢 |

**Category header emoji** (optional) is configured in `js/skills.js` `catIcons`:

```javascript
var catIcons = {
    'Programming': '</>', 'Frontend': '🎨', 'Tools': '⚙',
    'Video Editing': '🎬', 'Automation': '⚡'
};
```

Add your new category + icon there if you introduce one.

---

## T — Terminal (PRANAV.EXE)

The terminal lives in the **Experience** section. Its **look** is `css/terminal.css`; its **commands** are `js/terminal.js`; its **header/placeholder text** is `index.html`.

**Header / placeholder (index.html, lines ~261–275):**

```html
<div class="terminal-title">PRANAV.EXE — Interactive Terminal v4.0</div>
<div class="terminal-status">● LIVE</div>
...
<input id="terminal-input" placeholder="try 'skills', 'projects', 'about'...">
```

**Built-in commands** (`js/terminal.js` `commands` map): `help`, `about`, `skills`, `projects`, `journey`, `clear`.

- `about` reads from `profile` (name/role/location/status/introduction).
- `skills` reads `skills[]`.
- `projects` reads `projects`.
- `journey` reads `experience[]`.

**Add your own command** — insert a key into `commands` in `js/terminal.js`:

```javascript
var commands = {
    // …existing…
    coffee: function () {
        return '<div class="term-res-block"><div class="term-res-heading">☕</div>' +
               '<div>Fueled by chai, ship it anyway.</div></div>';
    }
};
```

Then add a suggestion chip in `index.html`:

```html
<button type="button" class="term-chip" data-cmd="coffee">coffee</button>
```

**Initial output text** ("System initialized successfully…") is hard-coded in `index.html` lines 264–272.

---

## U — URLs & social links

Social links are in **`js/data.js → socialLinks`**:

```javascript
socialLinks: {
    github: "https://github.com/your-name",
    linkedin: "https://linkedin.com/in/your-name",
    twitter: "https://twitter.com/your-name",
    youtube: "https://youtube.com/@your-channel",
    email: "your@email.com"
}
```

- **Contact section buttons** (`main.js`) support exactly these keys: `github`, `linkedin`, `twitter`, `youtube`, plus a `mailto:` from `email`.
- Set any value to `""` to **hide** that button.
- **Footer text links** (`GitHub` / `LinkedIn` / `Email`) also come from here.
- The **labels** ("GitHub", "LinkedIn", "Twitter / X", "YouTube", "Email Me") and their SVG icons are defined in `js/main.js` (`socialIcons` + the `defs` array).

> Adding a brand-new platform (e.g. Instagram) requires a small addition to `main.js` (icon + entry in `defs`) and optionally to `renderFooter()`.

---

## V — Version & edition labels

The site shows a few "edition/version" strings, all independent:

| String | Where | Default |
|---|---|---|
| `— PORTFOLIO 2025` | `index.html` line 57 (hero) | hard-coded |
| `EDITION 2025 // V4.0` | reserved `profile.editionBadge` (not shown) | data.js |
| `2025 // V4.0` | reserved `config.edition` (not shown) | data.js |
| `PRANAV.EXE — Interactive Terminal v4.0` | `index.html` (terminal header) | hard-coded |
| `Portfolio V4.0` | reserved `footer.version` (not shown) | data.js |

To change the visible ones, edit `index.html` directly. (The data.js edition strings are placeholders that aren't rendered — see **O**.)

---

## W — Shadows, washi tape & visual motifs

The "scrapbook" look is a set of reusable CSS pieces:

**Retro drop shadows** — `css/style.css` `:root`:

```css
--shadow-retro:  5px 5px 0 var(--ink-black);
--shadow-hover:  8px 8px 0 var(--ink-black);
```

**Borders** — same `:root`:

```css
--border-thick:  3px solid var(--ink-black);
--border-medium: 2.5px solid var(--ink-black);
--border-thin:   1.5px solid var(--ink-black);
```

**Washi tape strip** on project cards — `css/components.css` `.project-card::before` (change its `background`, `width`, `height`, or `rotate`).

**Polaroid tape** — `.polaroid-wrapper::before` in `css/components.css`.

**Editorial stamps** — `.editorial-stamp` in `css/components.css` (color, border, rotation).

**Scrapbook stickers** — `.scrapbook-sticker` + `.sticker-lavender/.coral/.sky/.yellow` in `css/components.css`.

To make the whole site look **flat** instead of scrapbook: set `--shadow-retro`/`--shadow-hover` to `none`, and hide the tape pseudo-elements.

---

## X — (X)tra interactions: cursor, scroll, motion

**Custom cursor**
- Colors/states: `css/cursor.css` (`.custom-cursor`, `.custom-cursor-follower`, `.hover`, `.active`, `.on-dark`).
- Logic: `js/cursor.js` (auto-skips on touch devices and when `prefers-reduced-motion` is on).
- **To disable it entirely**, set on `<body>`: `<body data-cursor="disabled">` (already supported by `cursor.css`), or delete the `<script src="js/cursor.js">` line. Note: `config.enableCustomCursor` is *not* wired up — see **O**.

**Scroll-in animations**
- `.animate-on-scroll` reveal is defined in `css/style.css` and toggled by `js/interactions.js` (`IntersectionObserver`).
- Disable by removing the `animate-on-scroll` class from elements, or override in CSS.

**Reduced motion** — the site already honors `@media (prefers-reduced-motion: reduce)` (see `css/style.css` and others); animations and the cursor turn off automatically.

---

## Y — Year & copyright

The visible copyright **year** is hard-coded in **`index.html`** line 333:

```html
<p>&copy; 2025 <span data-field="footerName">Pranav Sharma</span>. …</p>
```

Change `2025` (and the credit text via `footer.creditText` in `js/data.js`) when you update the year.

---

## Z — Zero-dependency & deploy checklist

This site is **100% HTML/CSS/vanilla JS** — no build step, no npm, no framework. That means:

1. **Edit** → save files → refresh browser. Nothing else needed.
2. **Preview** → double-click `index.html`, or `python3 -m http.server 8000`.
3. **Deploy** (any static host):
   - **GitHub Pages** — push the folder to a repo → Settings → Pages → branch `main`.
   - **Netlify** — drag-and-drop the folder into [app.netlify.com/drop](https://app.netlify.com/drop).
   - **Vercel** — `npx vercel` in the folder.

---

### ✅ Final "complete rebrand" checklist

- [ ] `profile.name`, `role`, `introduction`, `location`, `status` (`js/data.js`)
- [ ] `profile.profileImage` → drop photo in `assets/images/profile.jpg`
- [ ] Hero name letters → `index.html` (`PRANAV` / `SHARMA`)
- [ ] Nav initials `PS` + `aria-label` → `index.html`
- [ ] `<title>` + meta description → `index.html` (title auto-overridden by `profile.name`)
- [ ] `about.description`, `interests`, `learning` → `js/data.js`
- [ ] About `<h2>` heading → `index.html`
- [ ] `skills[]` entries + statuses → `js/data.js`
- [ ] `projects.coding / videoEditing / automation` → `js/data.js`
- [ ] `experience[]` timeline → `js/data.js`
- [ ] `currentFocus[]` → `js/data.js`
- [ ] `socialLinks` + `footer.creditText` → `js/data.js`
- [ ] Accent colors → `css/style.css` `:root` (`--acid-lime`, etc.)
- [ ] Fonts → `index.html` Google Fonts link + `css/style.css` variables
- [ ] Section labels / domain cards / tabs / CTA text → `index.html`
- [ ] (Optional) terminal commands → `js/terminal.js`; mini-game rules → `js/mini-game.js`

---

### ❗ Gotchas (read before editing)

- **Hero name is NOT data-driven** — it's plain HTML in `index.html`. Changing `profile.name` won't update the giant "PRANAV SHARMA" letters.
- **About heading is NOT data-driven** — `about.headline` is ignored; edit the `<h2>` in `index.html`.
- A few `data.js` fields are **reserved but unused** (see **O**). Editing them changes nothing until you wire them up.
- **Social platforms are a fixed set** — GitHub/LinkedIn/Twitter/YouTube/Email only (see **U**).
- Touching `data-tab` values, section `id`s, or `id="…"` elements referenced by JS can break tab switching / rendering — keep IDs in sync if you rename them.
- Always keep the **script order** at the bottom of `index.html` (`data.js` first, `main.js` last).









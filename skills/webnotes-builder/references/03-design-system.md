# 03 — Design System

> The visual language. Don't reinvent — every chapter shares the same `base.css`, only the accent color differs.

---

## 1. Color tokens (defined in `base.css` via CSS variables)

The dark theme uses these tokens. Reference them with `var(--name)` everywhere — never hard-code hex values.

```
Background      --bg          #0d1117    main page bg
                --bg-rgb      13,17,23   for rgba()
Surfaces        --surf        #161b22    card background
                --surf2       #1c2230    nested surface
Borders         --border      #30363d
Text            --txt         #e6edf3    main text
                --muted       #8b949e    secondary text
                --dim         #6e7681    tertiary / placeholders

Accent palette  --blue        #58a6ff    with --bdim (#0d1f40) bg
                --green       #3fb950    with --gdim (#0d2218)
                --yellow      #e3b341    with --ydim (#2d2208)
                --red         #f85149    with --rdim (#2d1010)
                --cyan        #39d4c8    with --cdim (#0a2422)
                --purple      #bc8cff    with --pdim (#1a1040)
                --orange      #f0883e    with --odim (#2d1800)
```

Each accent has a `*dim` companion meant as a dim/desaturated background fill.

---

## 2. Per-chapter accent assignment

Pick ONE accent per chapter. Reuse it for:
- Hero gradient
- Section header icon backgrounds
- Topic chips
- Strong-emphasis text in body (`<strong style="color:var(--blue)">term</strong>`)

### Standard CS-course palette mapping

| Chapter # | Subject hint | Accent | Reason |
|---|---|---|---|
| 1 | Intro, basics, fundamentals | `--blue` | classic, trustworthy |
| 2 | Tools, shells, environment | `--cyan` | adjacent, calmer |
| 3 | I/O, signals, low-level | `--yellow` | warning-tone for syscalls |
| 4 | Processes, fork | `--orange` | warm, energetic |
| 5 | Networks, sockets | `--blue` (or repeat first) | networking is often blue |
| 6 | Threads, concurrency | `--green` | "parallel" feel |
| 7 | IPC, sync | `--purple` | "magic" of synchronization |
| 8+ | Misc | `--red` (sparingly!) | reserve red for critical/security |

For non-CS courses, follow the same rule: visually distinguish consecutive chapters.

### Per-chapter `<style>` block template

Place this at the top of every chapter HTML, just below the shared CSS link:

```html
<style>
:root{ /* keep these — they're shared across chapters but redeclared per page so chapters can be standalone */
  --bg:#0d1117; --bg-rgb:13,17,23; --surf:#161b22; --surf2:#1c2230; --border:#30363d;
  --blue:#58a6ff; --blue-rgb:88,166,255; --bdim:#0d1f40;
  --green:#3fb950; --green-rgb:63,185,80; --gdim:#0d2218;
  --yellow:#e3b341; --ydim:#2d2208;
  --red:#f85149; --rdim:#2d1010;
  --cyan:#39d4c8; --cdim:#0a2422;
  --purple:#bc8cff; --purple-rgb:188,140,255; --pdim:#1a1040;
  --orange:#f0883e; --orange-rgb:240,136,62; --odim:#2d1800;
  --txt:#e6edf3; --muted:#8b949e; --dim:#6e7681;
}
/* CHAPTER-SPECIFIC — change the gradient to match this chapter's accent */
.hero{background:linear-gradient(150deg,#0d1117 0%,#0d2218 55%,#0d1117 100%)} /* green */
.hero::after{content:'$ chapter-specific-tagline';position:absolute;right:32px;bottom:16px;font-family:'JetBrains Mono',monospace;font-size:clamp(1rem,3vw,2.2rem);color:rgba(63,185,80,.06);pointer-events:none;font-weight:700}

/* Syntax highlight classes (must be in EVERY chapter that has code) */
.cb{background:#060a10}
.kw{color:var(--blue);font-weight:600}    /* keywords: int, return, if, struct */
.fn{color:var(--yellow);font-weight:600}  /* function names: fork(), malloc() */
.st{color:var(--orange)}                  /* strings: "hello" */
.cm{color:var(--dim);font-style:italic}   /* comments: // ... */
.nm{color:var(--purple)}                  /* numbers: 42, NULL */
.tp{color:var(--cyan)}                    /* types: pthread_t, size_t */
.mc{color:var(--purple);font-weight:600}  /* macros: #define, IPC_CREAT */
.pr{color:var(--muted)}                   /* punctuation muted */

/* Chapter-specific helper classes go here */
.struct-box{background:#060a10;border:1px solid var(--border);border-radius:10px;padding:18px 22px;font-family:'JetBrains Mono',monospace;line-height:2}
.sf-type{color:var(--cyan)}.sf-field{color:var(--txt)}.sf-comment{color:var(--dim);font-style:italic}
.compare{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0}
.good-side{background:var(--gdim);border:1px solid rgba(63,185,80,.2);border-radius:8px;padding:12px}
.bad-side{background:var(--rdim);border:1px solid rgba(248,81,73,.2);border-radius:8px;padding:12px}
.side-label{font-size:0.8125rem;font-family:'JetBrains Mono',monospace;letter-spacing:1px;font-weight:700;margin-bottom:0.5rem;text-transform:uppercase}
.retval-row{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}
.retval{flex:1;min-width:120px;background:var(--surf);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center}
.retval-num{font-family:'JetBrains Mono',monospace;font-weight:700;margin-bottom:4px}
.retval-desc{color:var(--muted)}
</style>
```

---

## 3. Typography

Fonts loaded via Google Fonts (or imported in `base.css`):

| Font | Use | Weights |
|---|---|---|
| **Roboto** (sans-serif) | Body text | 400, 500, 700 |
| **Google Sans / Roboto** | Headings, titles, and structural labels | 700, 800 |
| **JetBrains Mono** | Code, terminal output, monospace UI | 400, 600, 700 |
| **Syne** (display) | Hub Hero H1 title | 400, 700, 800 |

Loaded via `@import` in `base.css` or `<link>` in templates:

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
```

### Size scale

Body base: `1.09rem` (~17.4px). Line height: `1.88`.
H1 (hero): `clamp(1.8rem, 5vw, 3rem)`.
H2 (section): `1.35rem`.
H3: `1.55rem`.
H4: `1.3rem`.
Code: `0.94rem`. Line height: `1.85`.

---

## 4. Spacing system

Loosely based on 8px grid:

- Inter-section vertical gap: `60–80px`
- Card padding: `16–24px`
- Inline gaps (lists, button rows): `8–12px`
- Tight pairings (label + value): `4–6px`

---

## 5. Layout

```
│  Fixed nav bar (72px height)             │  ← shared via nav.js
├──────────────────────────────────────────┤
│  Hero (full-width, gradient, 200–300px)  │  ← per-chapter color
├──────────────────────────────────────────┤
│  TOC (sticky, full-width, ~80px)         │  ← anchor links
├──────────────────────────────────────────┤
│                                          │
│  <main class="wrap" style="text-align:left">
│                                          │
│    <section> 1 of N                      │
│    <section> 2 of N                      │
│    ...                                   │
│                                          │
├──────────────────────────────────────────┤
│  Footer (centered, small text)           │
└──────────────────────────────────────────┘
```

The `.wrap` container has `max-width: 1160px; margin: 0 auto; padding: 0 24px`. **All content must be left-aligned** to ensure readability. Avoid `text-align: center` for educational content.

---

## 6. Grids

Most sections use a `.grid2` (two-column on desktop, stacks on mobile):

```css
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 14px 0;
}
@media (max-width: 768px) {
  .grid2 { grid-template-columns: 1fr; }
}
```

Use it for: definition + example, theory + diagram, API + usage, problem + solution.

---

## 7. The component library

These classes are defined in `base.css`. **Do not redefine.** Just use:

| Class | Purpose | Visual |
|---|---|---|
| `.card` | Generic content container | rounded, surface bg, border |
| `.card-title` | Card heading | uppercase mono label |
| `.tip` | Helpful tip with icon | yellow-themed callout |
| `.ibox` | Info box (neutral) | blue-themed callout |
| `.wbox` | Warning box | yellow-themed callout |
| `.rbox` | Error / critical box | red-themed callout |
| `.gbox` | Success / done box | green-themed callout |
| `.vtbl` | Vertical table | dark, bordered, clean |
| `.cb` | Code block | nearly-black bg, mono |
| `.struct-box` | Struct visualization | mono, bordered |
| `.compare` + `.good-side` / `.bad-side` | Side-by-side comparison | 2-column with colors |
| `.thread-diagram` / `.fd-diagram` | SVG / code trace diagram container | mono, centered |
| `.chip` | Topic tag chip | small rounded label |
| `.retval-row` + `.retval` | Return-value callouts | horizontal cards |

Section header is always:

```html
<div class="sh">
  <div class="sh-icon" style="background:var(--pdim)">🧵</div>
  <h2>N. Section Title</h2>
</div>
```

Where `--pdim` is the section's accent dim — matches the chapter color, but each section can vary slightly.

---

## 8. Quiz styling

The `.section-quiz` container is rendered by `quiz-loader.js`. You just put:

```html
<div class="section-quiz" data-topic="topicN" data-section="sectionId"></div>
```

at the end of each `<section>`. The CSS for the quiz is in `base.css` — don't override.

---

## 9. Mobile responsiveness

Built in to the components. Test by resizing browser to 375px width. Common adjustments needed:

- `.grid2` collapses to single column at <768px (built-in)
- Hero title scales via `clamp()`
- TOC wraps to multiple rows
- Tables get horizontal scroll: `<div style="overflow-x:auto">` around them

---

## 10. Light and Dark Theme System

We fully support both Light and Dark modes. The system uses a global theme toggle and a set of transition and high-specificity override rules inside `base.css`:

1. **Root Variables Overrides**: 
   All colors (`--bg`, `--surf`, `--border`, `--txt`, `--muted`, `--dim`, and accent variables like `--blue` and `--green`) are overridden under `html[data-theme="light"]` to use a high-contrast light scheme.
2. **Transition Rules**: 
   Smooth theme transitions are applied to all components (such as `section`, `p`, code blocks, inputs, and SVG nodes) via:
   `transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ...`
3. **Component Refinements**: 
   Specific classes (e.g. code block backgrounds `.cb`, syntax keywords `.kw`/`.fn`/`.st`, list commentary, trees, and custom quiz elements) have light mode-specific overrides.
4. **Theme Toggle Button**: 
   A floating `.theme-toggle` button is dynamically appended to the navigation links (initialized via `nav.js` and styled in `base.css`) showing `☀️` or `🌙` to let users toggle the mode.

---

Next: `references/04-html-components.md` — the full reference of HTML patterns.

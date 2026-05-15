# 06 — Interactivity: Diagrams, Animations, Simulations

> When to escalate from prose → ASCII art → SVG → animated SVG → full Canvas simulation. Choose the lightest tool that works.

---

## 1. Decision tree

For each concept you're explaining, ask:

```
Is the concept visual?
├─ No  → prose + maybe a table
└─ Yes → Can it be conveyed statically?
         ├─ Yes → Is it simple geometry?
         │       ├─ Box-and-arrow → ASCII art (.thread-diagram)
         │       ├─ Hierarchical (tree) → ASCII tree
         │       ├─ Tabular → <table class="vtbl">
         │       └─ Anything else → inline SVG
         │
         └─ No  → Does it require animation or randomness?
                 ├─ Animation only → SVG with CSS animation OR
                 │                   a 5-line vanilla-JS canvas loop
                 ├─ User parameter exploration → small interactive
                 │                                widget (input → render)
                 └─ Complex (full simulation) → only if the concept
                                                truly demands it
```

**Default to the lightest option.** Adding a 200-line Canvas simulation for a concept that's clear from ASCII is over-engineering.

---

## 2. Static visualizations

### 2.1 ASCII art (use 80% of the time)

Pros: zero dependencies, copies cleanly, monospaced is universal.

Patterns:

**Memory layout**
```
┌──────────────────────┐
│ Code (Text)          │ ← 0x08048000
│ Initialized Data     │
│ BSS (uninitialized)  │
├──────────────────────┤
│ Heap → growing up    │
│  ...                 │
│ Stack ← growing down │ ← 0xC0000000
└──────────────────────┘
```

**Tree / hierarchy**
```
         [root: 50]
        /          \
   [30]            [70]
   /  \           /    \
 [10] [40]    [60]    [80]
```

**Pipeline / sequence**
```
  read() → parse() → validate() → store() → respond()
    ↓        ↓          ↓           ↓         ↓
  bytes    AST       bool        DB id     HTTP 200
```

**State machine**
```
        ┌─→ READY ──┐
        │           │ schedule()
   fork()           ↓
        │       RUNNING
   create          │
        │      ┌───┴───┐
        │      │       │
        │   wait()   exit()
        │      ↓       ↓
        │   WAITING  ZOMBIE
        │      │
        └──────┘
```

### 2.2 Inline SVG (when ASCII can't)

Use for: precise geometry, circles, curves, color gradients.

```html
<div style="text-align:center;margin:16px 0">
  <svg viewBox="0 0 400 200" style="max-width:100%;height:auto;background:#060a10;border:1px solid var(--border);border-radius:10px">
    <circle cx="100" cy="100" r="40" fill="none" stroke="var(--blue)" stroke-width="2"/>
    <text x="100" y="105" text-anchor="middle" fill="var(--blue)" font-family="JetBrains Mono">A</text>

    <line x1="140" y1="100" x2="260" y2="100" stroke="var(--muted)" stroke-width="2" marker-end="url(#arrow)"/>

    <circle cx="300" cy="100" r="40" fill="none" stroke="var(--green)" stroke-width="2"/>
    <text x="300" y="105" text-anchor="middle" fill="var(--green)" font-family="JetBrains Mono">B</text>

    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/>
      </marker>
    </defs>
  </svg>
</div>
```

Use `var(--blue)` etc. inside SVG to inherit theme colors.

### 2.3 Tables (most underused)

A clean table beats a busy diagram. Use `.vtbl` for any 2D comparison.

---

## 3. Animated visualizations

### 3.1 CSS animation (cheap, no JS)

For loops, pulses, slow rotations:

```html
<svg viewBox="0 0 100 100" style="width:100px">
  <circle cx="50" cy="50" r="20" fill="var(--green)">
    <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite"/>
  </circle>
</svg>
```

Or via CSS:
```html
<style>
  @keyframes blink { 0%,100% {opacity:1} 50% {opacity:0.3} }
  .blink { animation: blink 1.5s infinite; }
</style>
<div class="blink">Waiting...</div>
```

### 3.2 Vanilla JS canvas (when truly needed)

Keep it < 50 lines. No frameworks.

```html
<div class="card">
  <div class="card-title">Random Walk Simulation</div>
  <canvas id="walk-canvas" width="400" height="200" style="background:#060a10;border-radius:8px;display:block;margin:8px auto"></canvas>
  <button onclick="restartWalk()" style="background:var(--surf);color:var(--txt);border:1px solid var(--border);padding:6px 12px;border-radius:6px;cursor:pointer;margin-top:8px">Restart</button>
</div>
<script>
(function(){
  const canvas = document.getElementById('walk-canvas');
  const ctx = canvas.getContext('2d');
  let x, y;
  function init() {
    x = canvas.width/2; y = canvas.height/2;
    ctx.fillStyle = '#060a10';
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  function step() {
    const dx = (Math.random()-0.5)*4;
    const dy = (Math.random()-0.5)*4;
    ctx.strokeStyle = '#58a6ff';
    ctx.beginPath(); ctx.moveTo(x,y);
    x += dx; y += dy;
    ctx.lineTo(x,y); ctx.stroke();
    if (x>0 && x<canvas.width && y>0 && y<canvas.height) requestAnimationFrame(step);
  }
  window.restartWalk = function() { init(); requestAnimationFrame(step); };
  init(); requestAnimationFrame(step);
})();
</script>
```

---

## 4. Interactive widgets (user input → output)

### When to add

✅ **YES** for:
- Demonstrating a parameter's effect on a curve (e.g. "λ in Poisson distribution")
- Stepping through an algorithm at user's pace
- Toggling between two visualizations

❌ **NO** for:
- Static facts that don't change with input
- Anything where a screenshot would suffice
- Complex multi-step inputs (becomes too fiddly)

### Pattern

```html
<div class="card">
  <div class="card-title">Try it: O(n) vs O(n²)</div>
  <div style="display:flex;align-items:center;gap:12px;margin:8px 0">
    <label style="color:var(--muted);font-size:0.85rem">n = </label>
    <input type="range" id="n-slider" min="1" max="100" value="10" style="flex:1">
    <span id="n-display" style="color:var(--blue);font-family:'JetBrains Mono',monospace">10</span>
  </div>
  <div class="thread-diagram" id="comp-display">
    <span style="color:var(--blue)">O(n)</span> = 10 ops<br>
    <span style="color:var(--orange)">O(n²)</span> = 100 ops
  </div>
</div>
<script>
(function(){
  const slider = document.getElementById('n-slider');
  const display = document.getElementById('n-display');
  const out = document.getElementById('comp-display');
  function update() {
    const n = +slider.value;
    display.textContent = n;
    out.innerHTML = '<span style="color:var(--blue)">O(n)</span> = ' + n + ' ops<br>' +
                    '<span style="color:var(--orange)">O(n²)</span> = ' + n*n + ' ops';
  }
  slider.addEventListener('input', update);
})();
</script>
```

---

## 5. Subject-specific recommendations

### Operating Systems / Systems Programming
- **High-value:** Process tree (ASCII), memory layout, race condition timeline, scheduler Gantt chart, file descriptor table
- **Medium-value:** Animated context switch, simulated semaphore P/V counter
- **Skip:** complex CPU pipeline animations (out of scope for most courses)

### Algorithms / Data Structures
- **High-value:** Recursion tree (ASCII), execution trace (step-by-step table), complexity growth chart (SVG)
- **Medium-value:** Interactive sort visualization (Canvas, ~80 lines)
- **Skip:** building from scratch — link to external `visualgo.net` if needed

### Math (Calculus / Linear Algebra)
- **High-value:** MathJax for formulas, SVG plots of common functions, geometric SVG diagrams
- **Medium-value:** Interactive function plotter (input → plot)
- **Skip:** symbolic manipulation simulators (rabbit hole)

### Networking
- **High-value:** OSI stack diagram (ASCII), packet format breakdown, sequence diagrams (TCP handshake)
- **Medium-value:** Interactive subnet calculator
- **Skip:** real packet capture (use Wireshark-screenshot images instead)

### Databases
- **High-value:** ER diagrams (SVG), B-tree visualization, join algorithm step-trace
- **Medium-value:** Interactive query plan explorer
- **Skip:** full SQL engine simulation

### Probability / Statistics
- **High-value:** SVG plots of distributions, MathJax formulas, sample-mean convergence animation
- **Medium-value:** Interactive distribution explorer (sliders for params → plot updates)
- **Skip:** large Monte Carlo simulations (slow in browser)

---

## 6. Loading external libraries

Only load if you really need them. Cheap ones (acceptable):

- **MathJax** — for math (3MB CDN; loads on demand)
- **Prism.js or highlight.js** — for code (only if you have many different languages — skip if you only have C / pseudocode)

Avoid:
- jQuery — never needed
- React/Vue — way too heavy for static study pages
- d3.js — overkill unless you have a really specific chart need; basic SVG suffices

---

## 7. Performance budget

Keep each chapter page under:
- 200 KB HTML (it's a study page, not a SPA)
- 5 inline `<script>` blocks
- 0 external dependencies beyond `base.css`, `nav.js`, `quiz-loader.js`, and (optionally) MathJax

If your chapter feels heavy, you're over-doing interactivity. Strip back to ASCII.

---

## 8. Accessibility

Even study pages should:
- Have meaningful alt text for `<svg>` (use `<title>` inside)
- Use sufficient color contrast (the dark theme already does this)
- Keyboard-navigable interactive widgets
- Not auto-play sound

---

## 9. Anti-patterns

❌ Adding interactive widget when a static SVG would explain better
❌ Loading three.js for a 2D visualization
❌ Using setInterval (use requestAnimationFrame for animations)
❌ Building a full simulation when a textbook diagram works
❌ Mixing canvas drawing with DOM manipulation in same loop
❌ Forgetting to clean up event listeners / animation frames on page unload (low-priority, but good practice)

---

Next: `references/07-checklist.md` — final QA before saying "done".

# 04 — HTML Component Reference

> Copy-paste recipes for every component. The chapter is built by composing these.
>
> *Note:* Chapter pages live at the **workspace root**, next to `index.html` — so asset
> references are root-relative (`styles/base.css`, `js/nav.js`). `_build/` holds only
> state/outlines, never HTML pages.

---

## 1. Page skeleton

```html
<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Topic N · Chapter Title</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/base.css">
  <link rel="stylesheet" href="styles/layout.css">
  <link rel="stylesheet" href="styles/components.css">
  <style> /* chapter-specific overrides — see 03-design-system.md */ </style>
  <script src="js/nav.js" defer></script>
  <script src="data/questions.js" defer></script>
  <script src="js/quiz-loader.js" defer></script>
</head>
<body>
  <div id="site-nav"></div>

  <div class="hero">
    <div class="hero-label">COURSE · Topic N</div>
    <h1>Chapter <em>Title</em></h1>
    <p>One-paragraph summary of what this chapter teaches.</p>
    <div class="chips">
      <span class="chip">keyword1</span>
      <span class="chip">keyword2</span>
    </div>
  </div>

  <nav class="toc">
    <a href="#intro">Section 1</a>
    <a href="#part2">Section 2</a>
    <!-- ... -->
  </nav>

  <div class="wrap">
    <section id="intro">
      <!-- section content -->
      <div class="section-quiz" data-topic="topicN" data-section="intro"></div>
    </section>
    <!-- more sections -->
  </div>

  <div class="footer">COURSE · DEPT · Topic N: Chapter Title</div>
</body>
</html>
```

---

## 2. Section header

```html
<section id="someId">
  <div class="sh">
    <div class="sh-icon" style="background:var(--bdim)">📡</div>
    <h2>N. Section Title</h2>
  </div>
  <p style="color:var(--muted);margin-bottom:14px">
    Lead paragraph explaining what this section covers. Bold the <strong style="color:var(--blue)">key term</strong> on first mention.
  </p>
  <!-- body -->
  <div class="section-quiz" data-topic="topicN" data-section="someId"></div>
</section>
```

**Icon emoji:** pick one that visually represents the section. Common choices:
- 🌐 network/web · 🔌 sockets · 🧵 threads · 🔒 mutexes · ⚙️ system/config
- 📡 signals/IO · 🚦 semaphores · 📨 messages · 🧠 memory/concepts
- ⚠️ warnings/pitfalls · 💥 errors · ⚖️ comparison · 🏎️ races/perf
- 📐 design/structure · 🚀 launch/process · 🔧 tools · 💻 examples

---

## 3. Two-column grid

```html
<div class="grid2">
  <div>
    <!-- left column (concept) -->
  </div>
  <div>
    <!-- right column (example or diagram) -->
  </div>
</div>
```

---

## 4. Card

```html
<div class="card">
  <div class="card-title">Card Title</div>
  <p style="color:var(--muted);font-size:0.85rem">
    Body text...
  </p>
</div>
```

---

## 5. Lists (ol, ul)

Always apply `padding-left: 1.5rem` to all list elements. This ensures that bullets and numbers are properly indented within their parent containers and do not "clip" out of the viewport on mobile or narrow containers.

```html
<ul style="padding-left: 1.5rem">
  <li>First item</li>
  <li>Second item with <strong>emphasis</strong></li>
</ul>
```

---

## 5. Callout boxes

### Tip box (with icon)

```html
<div class="tip">
  <div class="tip-icon">🧠</div>
  <div>
    <div class="tip-title">Tip — short title</div>
    <div class="tip-text">
      Body of the tip. Use <strong>strong</strong> for emphasis.
    </div>
  </div>
</div>
```

### Info box (`.ibox`)

```html
<div class="ibox">
  <div class="lbl" style="color:var(--blue)">Did you know?</div>
  Informational content here.
</div>
```

### Warning box (`.wbox`)

```html
<div class="wbox">
  <div class="lbl" style="color:var(--yellow)">⚠️ Watch out</div>
  Be careful about...
</div>
```

### Red / critical box (`.rbox`)

```html
<div class="rbox">
  <div class="lbl" style="color:var(--red)">🚨 Common Bug</div>
  This will crash because...
</div>
```

### Green / success box (`.gbox`)

```html
<div class="gbox">
  <div class="lbl" style="color:var(--green)">✅ Correct Pattern</div>
  Do it this way.
</div>
```

---

## 6. Code block (annotated)

To maintain maximum readability and consistency:
1. **Tag Placement**: Place the `<code>` tag immediately after `<div class="cb">` with no newline/spaces to avoid accidental leading spaces.
2. **Formatting**: Break the line after the logical rule operator (e.g., `:-` in Prolog, or `{` in C) and indent the body.
3. **Indentation**: Indent the body of the rule with **4 spaces**.
4. **Alignment**: All code blocks must be **strictly left-aligned**.

```html
<div class="cb"><code><span class="fn">predicate</span>(X, Y) <span class="kw">:-</span>
    <span class="fn">goal1</span>(X),
    <span class="fn">goal2</span>(Y).</code></div>
```

```html
<div class="cb"><code><span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="st">"Hello World"</span>);
    <span class="kw">return</span> <span class="nm">0</span>;
}</code></div>
```

**Class reference:**
- `.kw` = keyword (int, return, struct, if)
- `.fn` = function name (printf, main, fork)
- `.st` = string literal ("...")
- `.cm` = comment (// ...)
- `.nm` = number / NULL / constant value
- `.tp` = type (pthread_t, size_t, FILE)
- `.mc` = macro (#include, IPC_CREAT, M_PI)

**Always use `&lt;` `&gt;` `&amp;`** for `< > &` inside HTML.

---

## 7. Comparison table

```html
<table class="vtbl">
  <thead>
    <tr>
      <th>Feature</th>
      <th style="color:var(--blue)">Option A</th>
      <th style="color:var(--orange)">Option B</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>Speed</strong></td><td>Fast</td><td>Slow</td></tr>
    <tr><td><strong>Memory</strong></td><td>10 KB</td><td>100 KB</td></tr>
  </tbody>
</table>
```

---

## 8. Side-by-side compare (good vs bad)

```html
<div class="compare">
  <div class="good-side">
    <div class="side-label" style="color:var(--green)">✅ Good</div>
    <ul style="font-size:0.85rem;color:var(--muted)">
      <li>...</li>
    </ul>
  </div>
  <div class="bad-side">
    <div class="side-label" style="color:var(--red)">❌ Bad</div>
    <ul style="font-size:0.85rem;color:var(--muted)">
      <li>...</li>
    </ul>
  </div>
</div>
```

---

## 9. Struct / data layout visualization

```html
<div class="struct-box" style="font-size:0.82rem;line-height:2">
<span class="kw">struct</span> <span class="tp">sockaddr_in</span> {<br>
&nbsp;&nbsp;<span class="sf-type">short</span>          <span class="sf-field">sin_family</span>;     <span class="sf-comment">// AF_INET</span><br>
&nbsp;&nbsp;<span class="sf-type">unsigned short</span> <span class="sf-field">sin_port</span>;       <span class="sf-comment">// network byte order</span><br>
&nbsp;&nbsp;<span class="kw">struct</span> <span class="sf-type">in_addr</span> <span class="sf-field">sin_addr</span>;       <span class="sf-comment">// 4-byte IP</span><br>
&nbsp;&nbsp;<span class="sf-type">char</span>           <span class="sf-field">sin_zero</span>[<span class="nm">8</span>];    <span class="sf-comment">// padding</span><br>
};
</div>
```

Class reference for struct fields:
- `.sf-type` = type name
- `.sf-field` = field name
- `.sf-comment` = inline comment

---

## 10. HTML/CSS Layout Diagrams & Flowcharts (Preferred over SVGs)

Do NOT use text/ASCII-based drawings or trees. Recreate all diagrams, flowcharts, trees, and processes using **structured HTML/CSS layouts** (CSS Flexbox, Grid, border connectors, and relative positioning) rather than inline SVGs. 
**Why?** Inline SVGs frequently suffer from layout, rendering, scaling, alignment, and text-overlapping bugs across different system fonts, screen resolutions, and mobile viewports. HTML/CSS layouts scale natively, wrap automatically, and are fully responsive.

### A. Process Flow / Chain Diagram Recipe

```html
<div style="background:var(--surf);border:1px solid var(--border);border-radius:12px;padding:20px 16px;margin:24px 0">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;width:100%">
    <!-- Step 1 -->
    <div style="background:var(--bg);border:1.5px solid var(--blue);padding:12px;border-radius:8px;flex:1;min-width:130px;text-align:center;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="color:var(--blue);font-weight:700;font-size:0.85rem">Phase 1</div>
      <div style="color:var(--muted);font-size:0.7rem;margin-top:4px">Description A</div>
    </div>
    
    <!-- Arrow -->
    <div style="display:flex;flex-direction:column;align-items:center;color:var(--muted);font-size:0.75rem;min-width:40px">
      <span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--dim)">Action</span>
      <span style="font-size:1.2rem;line-height:1">&rarr;</span>
    </div>

    <!-- Step 2 -->
    <div style="background:var(--bg);border:1.5px solid var(--cyan);padding:12px;border-radius:8px;flex:1;min-width:130px;text-align:center;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
      <div style="color:var(--cyan);font-weight:700;font-size:0.85rem">Phase 2</div>
      <div style="color:var(--muted);font-size:0.7rem;margin-top:4px">Description B</div>
    </div>
  </div>
</div>
```

### B. Tree / Hierarchy Diagram Recipe
Include the CSS stylesheet classes in the page's `<style>` tag, then define:

```html
<div class="tree-container">
  <div class="tree-node internal">
    <div class="node-content">Root Node</div>
    
    <div class="branches">
      <div class="branch-item">
        <span class="branch-label">Condition A</span>
        <div class="tree-node leaf-yes">
          <div class="node-content">Leaf Value A</div>
        </div>
      </div>
      
      <div class="branch-item">
        <span class="branch-label">Condition B</span>
        <div class="tree-node internal">
          <div class="node-content">Sub Node</div>
          <div class="branches">
            <!-- Nested children here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 11. Return-value callouts

When a function has 2–4 distinct return values worth highlighting:

```html
<div class="retval-row">
  <div class="retval">
    <div class="retval-num" style="color:var(--green)">0</div>
    <div class="retval-desc">Success</div>
  </div>
  <div class="retval">
    <div class="retval-num" style="color:var(--red)">-1</div>
    <div class="retval-desc">Error (check errno)</div>
  </div>
</div>
```

---

## 12. Per-section quiz placeholder

At the END of every `<section>`:

```html
<div class="section-quiz" data-topic="topicN" data-section="sectionId"></div>
```

The `data-topic` and `data-section` must match keys in `data/questions.js`. `quiz-loader.js` does the rest.

---

## 13. Hero

```html
<div class="hero">
  <div class="hero-label">K24 · Topic N</div>
  <h1>Chapter <em>Title</em></h1>
  <p>One sentence summary.</p>
  <div class="chips">
    <span class="chip">tag1</span>
    <span class="chip">tag2</span>
  </div>
</div>
```

The `<em>` inside `<h1>` is rendered in the chapter accent color (per design).

---

## 14. TOC

```html
<nav class="toc">
  <a href="#intro">Section 1</a>
  <a href="#mutexes">Mutexes</a>
  <a href="#condvars">Condition Variables</a>
</nav>
```

Each link's href = the section's `id`. Keep names short (1–3 words).

---

## 15. Footer

```html
<div class="footer">COURSE · DEPARTMENT · Topic N: Chapter Title</div>
```

---

## 16. Hub (index.html) topic card

```html
<a href="topic1_basics.html" class="topic-card">
  <div class="topic-num">TOPIC 01</div>
  <h3>Chapter Title</h3>
  <p>One-sentence summary of what this chapter covers.</p>
  <div class="topic-tags">
    <span class="tag">tag1</span>
    <span class="tag">tag2</span>
    <span class="tag">tag3</span>
  </div>
</a>
```

For the Interactive Quiz card (special — purple-themed):

```html
<a href="interactive_quiz.html" class="topic-card" style="border-color: var(--purple); background: linear-gradient(135deg, var(--surf), rgba(192, 132, 252, 0.05));">
  <div class="topic-num" style="color: var(--purple);">PRACTICE</div>
  <h3>Interactive Quiz</h3>
  <p>Διαδραστικό quiz πολλαπλών επιλογών για όλα τα topics.</p>
  <div class="topic-tags">
    <span class="tag">interactive</span>
    <span class="tag">test</span>
  </div>
</a>
```

---

## 17. Math (MathJax)

For chapters that need math, add to `<head>` AFTER the base.css link:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

Then in body:
- Inline: `\( x^2 + y^2 = z^2 \)`
- Display: `\[ \int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2} \]`

Place math inside `.card` blocks for prominence:

```html
<div class="card">
  <div class="card-title">Pythagorean Identity</div>
  \[ \sin^2\theta + \cos^2\theta = 1 \]
  <p style="color:var(--muted);font-size:0.85rem;margin-top:8px">
    Proof sketch: ...
  </p>
</div>
```

---

## 18. Algorithm pseudocode

Use the `.cb` block but with relaxed "keyword" markup — language-agnostic:

```html
<div class="cb" style="padding:14px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:0.82rem;line-height:1.9">
<span class="kw">function</span> <span class="fn">MergeSort</span>(A, lo, hi):
    <span class="kw">if</span> lo &gt;= hi: <span class="kw">return</span>
    mid = (lo + hi) / <span class="nm">2</span>
    <span class="fn">MergeSort</span>(A, lo, mid)
    <span class="fn">MergeSort</span>(A, mid+<span class="nm">1</span>, hi)
    <span class="fn">Merge</span>(A, lo, mid, hi)
</div>
```

---

## 19. Step-by-step execution trace

For algorithm visualization:

```html
<div class="card">
  <div class="card-title">Mergesort on [5,2,8,1,9]</div>
  <div class="thread-diagram" style="text-align:left;line-height:2">
    <span style="color:var(--yellow)">Step 1:</span> split → [5,2] [8,1,9]<br>
    <span style="color:var(--yellow)">Step 2:</span> recurse left → [5] [2]<br>
    <span style="color:var(--yellow)">Step 3:</span> merge → [2,5]<br>
    <span style="color:var(--yellow)">Step 4:</span> recurse right → [8] [1,9]<br>
    <span style="color:var(--yellow)">Step 5:</span> ...<br>
    <span style="color:var(--green);font-weight:700">Final:</span> [1,2,5,8,9]
  </div>
</div>
```

---

## 20. Complexity table

```html
<table class="vtbl">
  <thead><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr></thead>
  <tbody>
    <tr><td>Bubble Sort</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td></tr>
    <tr><td>Merge Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td></tr>
    <tr><td>Quick Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td></tr>
  </tbody>
</table>
```

---

## 21. Exam components (used on exam_prep.html — full spec in `11-exam-prep.md`)

### Exercise statement box (`.exam-stmt`)

Requires the extra CSS from `11-exam-prep.md` §5 in the page's `<style>`.

```html
<div class="exam-stmt">
  <div class="stmt-label">Άσκηση 1 — descriptive name</div>
  <p>Full exercise statement...</p>
  <ul>
    <li>i) first requirement</li>
    <li>ii) second requirement</li>
  </ul>
  <p><strong>Ερώτημα (β):</strong> numeric sub-question?</p>
</div>
```

Label is always `Άσκηση N — <name>` or `Άσκηση N — παραλλαγή: <name>`. NEVER a dated
reference like "Εξέταση Ιουνίου 2025" (see `11-exam-prep.md` §2 Rule A).

### 🎯 Exam Focus box (used in CHAPTER pages)

Placed immediately before a section's `.section-quiz` div, links to an exam_prep anchor:

```html
<div class="tip">
  <div class="tip-icon">🎯</div>
  <div>
    <div class="tip-title">Exam Focus — short hook</div>
    <div class="tip-text">The recurring exercise/trap this section maps to, the 1-2
    graded points, and a link: <a href="exam_prep.html#anchor">Λυμένη άσκηση</a>.</div>
  </div>
</div>
```

### Inline reveal-answer drill (trace questions)

Reuses quiz CSS + the global `toggleAnswer()` from quiz-loader.js — no extra JS:

```html
<div class="quiz">
  <h3>🔥 Theme title</h3>
  <div class="qitems">
    <div class="qitem">
      <div class="qq">Question text<br><code>code snippet if any</code></div>
      <div class="qa" id="tq1" style="display:none"><strong>Answer.</strong> Mechanism + the trap it tests.</div>
      <button class="qa-toggle" onclick="toggleAnswer('tq1', this)">Δες απάντηση</button>
    </div>
  </div>
</div>
```

`id` unique per item (`tq1`, `tq2`, ...).

### Exam Prep hub card (index.html — orange, before the quiz card)

```html
<a href="exam_prep.html" class="topic-card"
   style="border-color: var(--orange); background: linear-gradient(135deg, var(--surf), rgba(251, 146, 60, 0.06));">
  <div class="topic-num" style="color: var(--orange);">EXAM PREP</div>
  <h3>Εξεταστική 🎯</h3>
  <p>Λυμένες ασκήσεις στο στυλ της εξέτασης, μοτίβα, drills και η γέφυρα από τις εργασίες.</p>
  <div class="topic-tags">
    <span class="tag">solved</span><span class="tag">patterns</span><span class="tag">drills</span>
  </div>
</a>
```

---

## 22. Anti-patterns (don't do these)

❌ `<pre>` and `<code>` for code blocks — they don't get the syntax highlighting.
❌ Inline `style="font-family: monospace"` — use the existing `.cb` class.
❌ `style="background:#000"` hardcoded — use `var(--bg)` or `#060a10` (for code only).
❌ Custom color classes (`.my-blue-text`) — use inline `style="color:var(--blue)"` or extend the design system.
❌ Section without `.section-quiz` div at the end — quizzes are mandatory per section.
❌ Two sections sharing the same `data-section` value — they must be unique within a topic.

---

Next: `references/05-quiz-format.md` — quiz data schema.

# 04 — HTML Component Reference

> Copy-paste recipes for every component. The chapter is built by composing these.

---

## 1. Page skeleton

```html
<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Topic N · Chapter Title</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles/base.css">
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

For nested elements, prefer `<ul>`s with custom bullet styles:

```html
<div class="card">
  <div class="card-title">Things to remember</div>
  <ul style="color:var(--muted);list-style:none;padding:0">
    <li style="margin-bottom:12px">
      <strong style="color:var(--blue)">Item:</strong> description...
    </li>
  </ul>
</div>
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

```html
<div class="cb" style="padding:14px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:0.82rem;line-height:1.9;overflow-x:auto">
<span class="mc">#include</span> <span class="st">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>(<span class="kw">int</span> argc, <span class="kw">char</span> *argv[]) {
    <span class="kw">if</span> (argc &lt; <span class="nm">2</span>) {
        <span class="fn">printf</span>(<span class="st">"Usage: %s name\n"</span>, argv[<span class="nm">0</span>]);
        <span class="kw">return</span> <span class="nm">1</span>;
    }
    <span class="cm">// greet the user</span>
    <span class="fn">printf</span>(<span class="st">"Hello, %s!\n"</span>, argv[<span class="nm">1</span>]);
    <span class="kw">return</span> <span class="nm">0</span>;
}
</div>
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

## 10. ASCII diagram

```html
<div class="thread-diagram">
  <div style="color:var(--green);font-weight:700;margin-bottom:8px">── Process Address Space ──</div>
  <div style="color:var(--muted);font-size:0.85rem">
    ┌──────────────────────────────┐<br>
    │ <span style="color:var(--cyan)">Code (Text)</span> &nbsp;&nbsp; <span class="cm">← shared</span> │<br>
    │ <span style="color:var(--cyan)">Heap (malloc)</span> <span class="cm">← shared</span> │<br>
    ├──────────────────────────────┤<br>
    │ <span style="color:var(--green)">Stack T1</span> │ <span style="color:var(--yellow)">Stack T2</span> │<br>
    └──────────────────────────────┘
  </div>
</div>
```

Use Unicode box-drawing chars: `┌─┐ │ └─┘ ├ ┤ ┬ ┴ ┼` and arrows `→ ← ↑ ↓ ↔`.

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

## 21. Anti-patterns (don't do these)

❌ `<pre>` and `<code>` for code blocks — they don't get the syntax highlighting.
❌ Inline `style="font-family: monospace"` — use the existing `.cb` class.
❌ `style="background:#000"` hardcoded — use `var(--bg)` or `#060a10` (for code only).
❌ Custom color classes (`.my-blue-text`) — use inline `style="color:var(--blue)"` or extend the design system.
❌ Section without `.section-quiz` div at the end — quizzes are mandatory per section.
❌ Two sections sharing the same `data-section` value — they must be unique within a topic.

---

Next: `references/05-quiz-format.md` — quiz data schema.

# 02 — Research Phase: Extracting Structure from Source Material

> How to read course material productively. The agent that just dumps slide text gets shallow output. The agent that interprets, restructures, and adds context gets pages students actually use.

---

## 1. The mindset

You are not a transcriber. You are a **textbook author** who is converting a professor's slide deck into a polished study guide. That means:

- **Reorder** if the source jumps around — group related concepts.
- **Expand** when slides are terse — a bullet "fork() copies address space" becomes 2 paragraphs explaining copy-on-write.
- **Compress** when slides repeat — combine 4 slides on "what is a pipe" into one tight section.
- **Add** mnemonics, exam tips, common-misconception warnings — the slides won't have these; you need to invent them based on what students typically struggle with.
- **Translate visuals** — every diagram in the PDF becomes an inline SVG or a clean CSS/HTML layout in your output (no ASCII art).

---

## 2. Reading order for a PDF

1. **First pass — table of contents.** Read first/last pages. Identify how many "logical units" the deck contains. Most professor decks have 5–15 unit boundaries.
2. **Second pass — slide titles only.** Glob through and note every slide title. This gives you the lecture's outline.
3. **Third pass — page-by-page deep read.** Now actually read each page. Take notes per slide:
   - What's the key concept?
   - Is there code? Transcribe it exactly.
   - Is there a diagram? Describe it well enough to recreate.
   - Is there a numbered list? It probably maps to bullet points in your output.

---

## 3. Identifying section boundaries

A section in the output corresponds to ONE _self-contained concept_ that can be studied (and quizzed) independently. Heuristics:

| Source signal | → Section boundary? |
|---|---|
| Slide titled "What is X?" or "X — Introduction" | YES — start of new section |
| Same title repeated (e.g. "Pipes — slide 12, 13, 14, 15") | NO — same section continues |
| New blue-section-divider in source | YES |
| Switch from theory → example → exercise | section divider, NEW section if 5+ pages |
| Side-note slide (e.g. "Historical aside") | NO — embed as `.ibox` inside neighbor section |

**Test:** could you write a 1-question quiz that's only about this section's content? If yes → it's a real section. If you'd need content from elsewhere to write a fair question, merge sections.

---

## 4. Content extraction patterns

### 4.1 Definitions

Source: a slide titled "Definition" with bullet list.

Output:
```html
<p style="color:var(--muted)">
  A <strong style="color:var(--accent)">mutex</strong> (MUTual EXclusion) is a synchronization primitive that...
</p>
```

Put the term in `<strong>` with the accent color the first time it's used.

### 4.2 Code listings

Source: a slide with C code (often blurry, hand-typed, sometimes wrong).

Output: rewrite cleanly into a `.cb` block with syntax highlighting. **Fix obvious typos** but preserve the intent. Add inline comments if missing.

```html
<div class="cb" style="padding:14px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:0.78rem;line-height:1.8;overflow-x:auto">
<span class="kw">int</span> <span class="fn">main</span>() {
  <span class="tp">pthread_t</span> tid;
  <span class="fn">pthread_create</span>(&amp;tid, <span class="nm">NULL</span>, work, <span class="nm">NULL</span>);
  <span class="cm">// wait for thread to finish</span>
  <span class="fn">pthread_join</span>(tid, <span class="nm">NULL</span>);
  <span class="kw">return</span> <span class="nm">0</span>;
}
</div>
```

### 4.3 Diagrams

Source: a slide with a box-and-arrow diagram.

Output: Recreate as a responsive inline SVG using theme tokens (`var(--blue)`, `var(--surf)`, etc.) or as a structured CSS grid. Do NOT use ASCII art or text-based box drawings.

### 4.4 Comparison tables

Source: a slide with a 2-column "X vs Y" comparison.

Output: `<table class="vtbl">` with thead + tbody.

### 4.5 Worked examples

Source: a slide with a step-by-step example.

Output: a `.card` titled "Example — <description>", with the steps numbered, code/state shown after each step.

### 4.6 Common mistakes / pitfalls

Source: often a slide titled "Be careful!" or "Common errors".

Output: a `.rbox` (red box) with `.lbl` titled "⚠️ Common Mistake" and 1-3 specific examples.

### 4.7 Mnemonics

Source: usually NOT in the slides — you invent these.

Output: a `.tip` box. Pattern:

> **Mnemonic — FORK** = **F**ork, **O**verwrite-on-write, **R**eturn-twice, **K**id-gets-zero

Good mnemonics for any subject:
- Acronyms from the first letter of each concept
- Visual metaphors ("imagine semaphore as a parking garage gate")
- Number patterns ("3 D's of deadlock", "5 stages of a packet")

### 4.8 Exam tips

Source: NOT in slides. You invent from genre knowledge of what's typically tested.

Output: a `.tip` box with title "Exam Tip — ..." and 1-2 sentences of specific, actionable advice.

---

## 5. When the source is sparse or unclear

Sometimes a slide is a single image with 3 words. You have options:

1. **Skip it** if it adds nothing.
2. **Expand it** from your own training knowledge — but flag that you did:
   > _Note: this slide was minimal; the expansion below combines source intent with standard textbook treatment of the topic._
3. **Ask the user** — "Slide 47 has just 'consistency models' with no detail — should I expand from general knowledge, or do you have a textbook reference?"

### When the source contradicts your knowledge

The source professor is the authority. If you're sure they have an error, add a small `.ibox` after the corrected version: "_The original slides state X; this contradicts the standard definition. We've used the standard form here. Verify with the instructor if unsure._"

---

## 6. Per-source-type tips

### PDF slides (LaTeX-beamer style)

- Heavy on bullet points → expand each bullet into 1–2 sentences of prose.
- Diagrams are often vectorial — describe them in text + recreate as SVG/CSS.
- Code is usually present and important — transcribe carefully.

### PDF lecture notes (paragraph form)

- Already in prose → light editing for tone consistency.
- Watch for footnotes — usually contain examples worth keeping.

### Markdown notes

- Already structured → easy mapping (`##` → section, `###` → subsection).
- Code blocks are already typed correctly → just add syntax highlighting.

### Scanned handwritten notes

- OCR them first (`tesseract`) or ask user for text version.
- Treat with skepticism — handwritten formulas often misread.

### Image-only slides (photo of whiteboard)

- Read carefully — vision models may misread small text.
- For dense slides, ask the user for a cleaner source.

### Video transcripts

- Often verbose — heavily prune. Extract only the conceptual core.

---

## 7. Subject-specific extraction

### CS / Operating Systems

Look for: system call signatures, struct layouts, race condition examples, process/thread lifecycle diagrams.

### Algorithms

Look for: pseudocode (transcribe to `.cb` blocks), complexity claims (build a `vtbl`), worked execution traces (step-by-step table or CSS grid), recurrence relations (use MathJax if you load it).

### Mathematics

Look for: theorem statements, proofs (often skip the proof body, keep statement + intuition), worked examples, counterexamples.

Use MathJax — add to chapter `<head>`:
```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

Inline math: `\( ... \)`. Display math: `\[ ... \]`.

### Networking

Look for: protocol stack diagrams, packet format breakdowns, sequence diagrams (use `.thread-diagram` vertical layout), state machines.

### Databases

Look for: ER diagrams (SVG), schema definitions, query plans, transaction sequences.

---

## 8. Time budget per chapter

For a typical 50-page chapter, budget:

- 30 min — first read-through (skim)
- 60 min — deep read with notes
- 90 min — write HTML (most of this time)
- 15 min — quiz questions
- 10 min — verify

Total: ~3.5 hours of agent work. Don't try to compress this — quality drops fast.

---

Next: read `references/03-design-system.md` for the visual design system.

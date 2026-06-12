---
name: webnotes-builder
description: Builds OR enhances interactive HTML study notes (webnotes) from a folder of course material (PDF slides, markdown, lecture handouts, past exams, assignments). Generates one chapter page per source file with annotated code/pseudocode, CSS-based diagrams, per-section quizzes, a hub index — plus an exam-prep page (solved exam-style exercises, theory flash-cards, "what does this print?" drills) when exam material or assignments exist. Use when the user asks to "build course notes", "create webnotes", "generate study guide", "make interactive notes", "add exam prep", "φτιάξε σημειώσεις", or asks to upgrade an existing webnotes site to this standard. Works for CS, math, algorithms, networking, databases, logic programming (Prolog), and most other technical subjects.
license: MIT
---

# Webnotes Builder Skill

You are the **webnotes-builder**. Your job: convert a folder of course material into a complete, polished, interactive study site that a student will use **instead of** the original PDFs.

This means **content fidelity is the highest priority**. If the source mentions 10 Prolog operators, the output mentions all 10. If a slide contains a warning, the output preserves that warning. If a definition appears, the output reproduces it. The student cannot study from source they don't have access to in the output.

---

## ⚠️ Read this BEFORE generating any code

This task is **too large for one session.** You will work iteratively:

1. **Discovery** session — survey input, propose plan, get user approval
2. **Scaffolding** session — copy shared assets, create skeleton index/nav
3. **Per-chapter sessions** — one chapter at a time:
   - 3a. Deep read + content extraction → save to `_build/topicN_outline.md`
   - 3b. Generate HTML page from outline
   - 3c. Write quiz questions
   - 3d. **Reviewer pass** — re-read source PDF, list omissions, enhance HTML
4. **Exam prep** session(s) — if past exams / assignments / exercises exist, build
   `exam_prep.html` + 🎯 Exam Focus boxes in chapters (see `references/11-exam-prep.md`)
5. **Final wiring** session — interactive quiz, hub, QA checklist

**Two modes.** Discovery also decides the mode:
- **CREATE** — no webnotes exist; full pipeline above.
- **ENHANCE** — `topic*.html`/`index.html` already exist; audit the existing site against
  this skill's standard (component usage, content depth vs source, per-section quizzes,
  exam prep page, responsive rendering) and upgrade the gaps in place. Reuse the same
  per-chapter cycle for any chapter that needs deepening; never regress content the
  site already has.

You may complete multiple of these in one user message if context allows, but track progress in `_build/STATE.md` (see `references/09-chunked-execution.md`).

---

## Required reading (in order)

Before generating any HTML, read these in order:

1. `references/01-workflow.md` — overall phases
2. `references/02-research.md` — how to extract content from sources
3. `references/03-design-system.md` — visual design tokens (colors, fonts)
4. `references/04-html-components.md` — reusable HTML patterns (consult constantly)
5. `references/05-quiz-format.md` — quiz data schema
6. `references/06-interactivity.md` — when to add diagrams/simulations
7. **`references/08-fidelity.md`** — content fidelity guarantees (MANDATORY)
8. **`references/09-chunked-execution.md`** — multi-session workflow + state tracking
9. **`references/10-reviewer-pass.md`** — verification loop to catch omissions
10. **`references/11-exam-prep.md`** — exam-prep page + Exam Focus boxes (when exam material exists)
11. `references/07-checklist.md` — final QA

Then study `assets/chapter.html` to internalize the structure.

---

## 1. Core principles

1. **Content fidelity over brevity.** Never skim. If the source has 95 slides, the output covers all 95. Long source = long output. See `references/08-fidelity.md`.

2. **Build chapter-by-chapter, never all at once.** Long autoregressive generation produces shallow output. One chapter per work cycle. Track progress in `_build/STATE.md`.

3. **Always do a reviewer pass.** After generating a chapter, re-read the source PDF and compare against the HTML. If anything is missing, mentioned only in passing, or not properly explained, enhance the page. See `references/10-reviewer-pass.md`.

4. **Per-section quizzes are mandatory.** Every `<section>` ends with a quiz placeholder AND a matching entry in `data/questions.js`.

5. **Match the source language.** Slides in Greek → explanations in Greek. Keep technical terms in English (`fork()`, `O(n log n)`, `:- module/2`).

6. **Match the source domain.** CS course → code blocks + struct diagrams. Math → MathJax + theorem boxes. Logic programming → operator tables + execution traces. The design system supports all; choose components per chapter.

7. **Pedagogical & Visual Guidelines.**
   - **Thoroughness**: Read slides deeply. Create outlines that include ALL original material (terms, formulas, methods, theory).
   - **Clarity**: Write explanations that are easy to understand. Break down complex concepts and problems.
   - **Visual Learning**: Extensively use shapes, diagrams, simulations, and flowcharts to aid visual and intuitive understanding.
   - **No ASCII Art or Overuse of SVGs**: Do NOT generate ASCII boxes, text flowcharts, or text trees. Prefer structured HTML/CSS layouts (using CSS Grid, Flexbox, border lines, and standard typography) for all diagrams, flowcharts, trees, and visual components. Avoid using inline SVG elements unless absolutely necessary for complex custom icons or shapes, as SVGs often cause text overlapping, alignment bugs, or responsiveness issues across different viewports and screen scales.
   - **Readability**: Prioritize spacious layouts. Avoid overwhelming the reader with walls of text.
   - **Contrast**: Avoid subtle shading and dark backgrounds with dark-colored text. Ensure high contrast.

8. **Architectural Consistency.** 
   - **Navigation**: Nav bar must be 72px high with flex-centering.
   - **Alignment**: All content must be strictly left-aligned.
   - **Code Blocks**: Break lines after `:-` (or `{`) and indent body by 4 spaces.
   - **Lists**: Always apply `padding-left: 1.5rem` to prevent clipping.
   - **Quiz**: Must include Next/Previous navigation in card mode.

---

## 2. Output structure (in the PARENT directory)

Do **not** generate inside `webnotes-skill/`. The skill folder is reference-only. Output goes to the parent directory:

```
course-folder/
├── slides/                    ← original PDFs (untouched)
├── exams/ · assignments/      ← exam material, if present (untouched — feeds exam_prep)
├── webnotes-skill/            ← this skill (kept for re-runs, do not modify)
├── _build/                    ← agent's working state ONLY (created by you)
│   ├── STATE.md               ← progress tracker (see §3)
│   ├── topic1_outline.md      ← extracted content per chapter
│   ├── topic1_fidelity.md     ← per-chapter coverage checklist
│   ├── examprep_outline.md    ← exam material extraction (if exam material exists)
│   └── examprep_fidelity.md
├── index.html                 ← course hub
├── topic1_<slug>.html         ← chapter pages live at the ROOT, next to index.html
├── topic2_<slug>.html         ← ...
├── exam_prep.html             ← exam-prep page (if exam material exists)
├── interactive_quiz.html      ← cross-chapter quiz
├── styles/base.css            ← copied from assets/styles/ (all four files)
├── styles/layout.css
├── styles/components.css
├── styles/quiz.css
├── js/nav.js                  ← copied + topics array edited
├── js/quiz-loader.js          ← copied as-is
├── js/interactive_quiz.js     ← copied as-is
└── data/questions.js          ← populated by you
```

Chapter pages link assets with root-relative paths (`styles/base.css`, `js/nav.js`) —
they sit next to `index.html`, NOT inside `_build/`. `_build/` holds only state,
outlines, and fidelity checklists.

---

## 3. State tracking (`_build/STATE.md`)

You **must** create and maintain this file in the parent directory. It lets a future session pick up where you left off.

Format:

```markdown
# Build State

## Course
- Title: Algorithms & Data Structures
- Lang: el
- Style: standard-depth, mixed Greek + English technical terms
- Source dir: ./slides/

## Phases
- [x] Phase 1 — Discovery (mode: CREATE | ENHANCE; exam material: yes/no)
- [x] Phase 2 — Plan approved by user
- [x] Phase 3 — Scaffolding (shared assets, index skeleton)
- [ ] Phase 4 — Chapters
- [ ] Phase 5 — Exam prep (exam_prep.html + Exam Focus boxes) — skip only if no exam material
- [ ] Phase 6 — Cross-chapter quiz
- [ ] Phase 7 — Final QA

## Chapters
| # | File                        | Slug       | Outline | HTML | Quiz | Reviewed |
|---|-----------------------------|------------|---------|------|------|----------|
| 1 | slides/lecture1-intro.pdf   | bigo       | ✅      | ✅   | ✅   | ✅       |
| 2 | slides/lecture2-recurse.pdf | recursion  | ✅      | ✅   | ⏳   | ❌       |
| 3 | slides/lecture3-dnc.pdf     | divide_conq| ⏳      | ❌   | ❌   | ❌       |

## Last completed action
2026-05-15 18:45 — Chapter 2 HTML draft written. Quiz pending.

## Next action
Write quiz questions for chapter 2 (sections: intro, base-cases, induction, examples).

## Open questions for user
- (none)

## Known fidelity gaps
- Chapter 1 §3.4 references the textbook "CLRS Ch.4" — couldn't access; that section is lighter than others.
```

Update STATE.md **at the end of every meaningful action** (a chapter's outline done, an HTML draft done, a reviewer pass done). This is your handoff document for the next session.

---

## 4. Per-chapter cycle (the core loop)

For each chapter:

```
4a. OUTLINE      — Read source PDF page-by-page. Extract every concept,
                   definition, code listing, diagram, table, warning,
                   example. Write to _build/topicN_outline.md.
                   Include a "fidelity checklist" at the end listing every
                   item that MUST appear in the final HTML.

4b. HTML         — Generate the chapter HTML from the outline. Use
                   assets/chapter.html as starting structure.
                   Reference references/04-html-components.md constantly.

4c. QUIZ         — Add quiz questions to data/questions.js. One sub-entry
                   per section. 1-3 questions per section.

4d. REVIEWER     — Re-read the source PDF. For EACH item in the fidelity
                   checklist, verify it appears in the HTML. Enhance any
                   sections that are missing items or are too terse.
                   See references/10-reviewer-pass.md.

4e. UPDATE       — Mark chapter row complete in _build/STATE.md.
```

**One chapter per cycle. Do not skip the reviewer pass.**

For long chapters (90+ slides), split into 4a-i, 4a-ii, 4a-iii (sub-outlines for ~30 slides each). The agent reads one third, writes one third of the outline, repeats.

---

## 5. Anti-patterns

❌ Building all chapters in one tool-call run — produces shallow output
❌ Skipping the reviewer pass to save time — students will miss content
❌ "Summarizing" a 90-page deck in 200 lines — that defeats the purpose
❌ Using only outline notes for HTML — always re-read the source for the actual writing
❌ Generating outline + HTML in same tool call — context bloat, quality drops
❌ Inventing CSS classes — use only what's in `references/04-html-components.md`
❌ Empty / missing `<div class="section-quiz">` placeholders
❌ Skipping STATE.md updates — handoff between sessions becomes impossible
❌ Dated/attributed exam references ("έπεσε τον Ιούνιο 2025", "(18%)") — present past
   exam content as GENERIC exercises (`references/11-exam-prep.md` §2)
❌ Referencing the student's specific assignment code/file names — teach the patterns
   with your own annotated sample code instead
❌ In ENHANCE mode: rewriting pages that already meet the standard, or deleting
   user-authored content — upgrade gaps only

---

## 6. Discovery (first session) — checklist

When the user invokes you for the first time, before doing anything else:

- [ ] Glob the parent directory for `*.pdf`, `*.md`, `*.docx`, `*.tex`
- [ ] Open the first 2-3 pages of each source to identify its subject
- [ ] Detect the language (Greek? English? Mixed?)
- [ ] Detect the subject domain (CS / math / logic / networking / ...)
- [ ] Detect exam material: `exams/`, `past-papers/`, `assignments/`, exercise files,
      photos of exam papers → plan an Exam Prep phase (`references/11-exam-prep.md`)
- [ ] Detect an existing webnotes site (`topic*.html`, `index.html`, `styles/`) →
      switch to ENHANCE mode: audit gaps vs this skill's standard, propose upgrade plan
- [ ] Propose a chapter plan: file → chapter title → slug → estimated section count
      (or, in ENHANCE mode, a per-page gap list ordered by impact)
- [ ] Ask the user 4 questions (use `AskUserQuestion` if available):
  1. Confirm/edit the plan
  2. Preferred language for explanations
  3. Depth preference: terse / standard / encyclopedic
  4. Any specific topics to emphasize or de-emphasize

Wait for answers before scaffolding.

---

## 7. Scaffolding (second session) — checklist

- [ ] Create `_build/STATE.md` (use the template in §3)
- [ ] Copy ALL FOUR stylesheets: `assets/styles/{base,layout,components,quiz}.css` → `../styles/`
- [ ] Copy `assets/js/nav.js` → `../js/nav.js` (edit `topics` array: one entry per chapter,
      pick a fitting `SVG_ICONS.*` per subject; keep `examprep` + `quiz` entries last)
- [ ] Copy `assets/js/quiz-loader.js` → `../js/quiz-loader.js`
- [ ] Copy `assets/js/interactive_quiz.js` → `../js/interactive_quiz.js`
- [ ] Copy `assets/data/questions.js` → `../data/questions.js` (empty stub)
- [ ] Create `../index.html` from `assets/index.html`, with one card per planned chapter (cards link to chapter files that don't yet exist — that's OK)
- [ ] Create `../interactive_quiz.html` from `assets/interactive-quiz.html`
- [ ] Verify: `ls ../index.html ../styles/ ../js/ ../data/`
- [ ] Update STATE.md: mark Phase 3 done
- [ ] Tell the user scaffolding is done; ask which chapter to start with

---

## 8. End of session

Whatever you complete in a session, **always** end with:

1. Update `_build/STATE.md` with what you completed and what's next
2. Tell the user what was done
3. Tell the user what to ask in the next session (e.g. "Next session, ask me to run the reviewer pass on Chapter 2")

---

## 9. Hand-off for a new agent

If you're a fresh agent picking up an existing build, **first action**:

1. Read `_build/STATE.md`
2. Read this `SKILL.md` (you're doing this)
3. Read whichever `references/*.md` are relevant to the next action
4. Continue from the "Next action" in STATE.md

Never assume you can re-derive state from looking at file modification times — always trust STATE.md.

---

## 10. Multi-agent coordination (optional)

For the most thorough output, consider running TWO agents per chapter:

1. **Builder agent** — does 4a–4c (outline, HTML, quiz)
2. **Reviewer agent** — does 4d (re-reads source, enhances HTML)

The reviewer SHOULD be a fresh context with no memory of the builder's reasoning. It only sees: source PDF + generated HTML + the fidelity checklist. It then identifies omissions objectively.

If you're a single agent doing both roles, **deliberately clear your reasoning between 4c and 4d** — re-open the source PDF from scratch, don't trust your memory of what's already in the HTML.

See `references/10-reviewer-pass.md` for the reviewer protocol.

---

Now read `references/01-workflow.md` for the full process, or `references/09-chunked-execution.md` if you're picking up mid-build.

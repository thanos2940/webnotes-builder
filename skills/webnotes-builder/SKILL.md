---
name: webnotes-builder
description: Builds OR enhances interactive HTML study notes (webnotes) from a folder of course material (PDF slides, markdown, txt, images, lecture handouts, past exams, assignments). Two goal modes — PASS (mine past-exam patterns, teach only what's needed to pass, exam-prep page with model answers as the centerpiece) and MASTER (full-fidelity coverage of all source material). Generates one chapter page per source file with an intuition-first "essence in 60 seconds" opener, annotated code/pseudocode, CSS-based diagrams, per-section quizzes, flashcards, a hub index — plus an exam-prep page (model answers, solved exam-style exercises, recurring proofs, complexity tables, trace drills) when exam material exists. Use when the user asks to "build course notes", "create webnotes", "generate study guide", "make interactive notes", "add exam prep", "φτιάξε σημειώσεις", "θέλω απλά να περάσω το μάθημα", "help me pass this exam", "analyze past exams", or asks to upgrade an existing webnotes site to this standard. Works for CS, math, algorithms, networking, databases, logic programming (Prolog), and most other technical subjects.
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

**Two build modes.** Discovery also decides the mode:
- **CREATE** — no webnotes exist; full pipeline above.
- **ENHANCE** — `topic*.html`/`index.html` already exist; audit the existing site against
  this skill's standard (component usage, content depth vs source, per-section quizzes,
  exam prep page, responsive rendering) and upgrade the gaps in place. Reuse the same
  per-chapter cycle for any chapter that needs deepening; never regress content the
  site already has.

**Two GOAL modes** (orthogonal to the build mode — Discovery MUST ask the user which
one they want; record it in STATE.md):

- **PASS** («θέλω απλά να περάσω, έστω με 5/10») — the site is optimized for passing
  the exam with minimal study time. Exam mining (`references/12-exam-mining.md`) runs
  FIRST and drives everything: only exam-relevant/in-syllabus chapters are built (or
  shown), pages are intuition-first (visuals and plain language over formulas — formulas
  only where they are graded), every page opens with an «Η Ουσία σε 60″» essence section,
  and `exam_prep.html` is the centerpiece: first full-width hub card («ΞΕΚΙΝΑ ΑΠΟ ΕΔΩ»),
  model answers for every recurring question, the recurring proofs, priority tiers and a
  "τι να αφήσεις τελευταίο" triage. Out-of-scope chapters are HIDDEN (hub/nav/quiz),
  never deleted.
- **MASTER** (κατανόησε όλη την ύλη) — the site explains ALL the professor's material,
  independent of exam frequency: full fidelity coverage of every source file, so the
  site is a central, beginner-friendly explanation of the whole course. Exam mining
  still feeds the exam-prep page and 🎯 Exam Focus boxes, but nothing is filtered out.

In PASS mode the fidelity contract (`08-fidelity.md`) is scoped to the confirmed
syllabus: out-of-scope items are listed under `## Skipped (out of syllabus)` in the
fidelity checklist — excluded *visibly*, never silently.

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
10. **`references/12-exam-mining.md`** — past-exam pattern analysis (MANDATORY when exam material exists; runs before chapter planning in PASS mode)
11. **`references/11-exam-prep.md`** — exam-prep page + Exam Focus boxes (when exam material exists)
12. `references/13-orchestration.md` — multi-agent role orchestration (optional, recommended)
13. `references/07-checklist.md` — final QA

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

Do **not** generate inside `webnotes-builder/` (the skill/extension folder). It is reference-only. Output goes to the course workspace:

```
course-folder/
├── slides/                    ← original PDFs (untouched)
├── exams/ · assignments/      ← exam material, if present (untouched — feeds exam_prep)
├── webnotes-builder/          ← this skill/extension (kept for re-runs, do not modify;
│                                 absent when installed globally as a plugin/extension)
├── _build/                    ← agent's working state ONLY (created by you)
│   ├── STATE.md               ← progress tracker (see §3)
│   ├── exam_patterns.md       ← past-exam mining output (see references/12-exam-mining.md)
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
- Goal: PASS | MASTER
- Attribution: dated | generic   (exam-reference style — see references/12-exam-mining.md §5)
- Style: standard-depth, mixed Greek + English technical terms
- Source dir: ./slides/
- Syllabus scope: all | in-scope: [3,4,5,6,7,8,10] hidden: [9,11,12,13]

## Phases
- [x] Phase 1 — Discovery (mode: CREATE | ENHANCE; goal: PASS | MASTER; exam material: yes/no)
- [x] Phase 1.5 — Exam mining (_build/exam_patterns.md) — mandatory if exam material exists
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
                   EVERY chapter page opens with an «Η Ουσία σε 60″» essence
                   section (intuition-first TL;DR: what it does, the mental
                   model, works-well-when vs fails-when, "για τις εξετάσεις
                   θυμήσου" tip) — see 04-html-components.md. Mandatory in
                   PASS mode, strongly recommended in MASTER mode.

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
- [ ] Detect flashcard data or need for theory flashcards (if theory questions exist)
- [ ] Detect an existing webnotes site (`topic*.html`, `index.html`, `styles/`) →
      switch to ENHANCE mode: audit gaps vs this skill's standard, propose upgrade plan
- [ ] Detect an official syllabus announcement («ανακοίνωση ύλης», "exam covers...") —
      it defines the in-scope chapter set for PASS mode
- [ ] Propose a chapter plan: file → chapter title → slug → estimated section count
      (or, in ENHANCE mode, a per-page gap list ordered by impact)
- [ ] Ask the user (use `AskUserQuestion` if available):
  1. **Goal mode** — «Θέλεις (α) να ΠΕΡΑΣΕΙΣ το μάθημα γρήγορα (εστίαση στα μοτίβα
     των εξετάσεων, μόνο ό,τι χρειάζεται για τη βάση) ή (β) να ΚΑΤΑΝΟΗΣΕΙΣ όλη την
     ύλη (πλήρης κάλυψη όλων των σημειώσεων);» → PASS | MASTER
  2. Confirm/edit the plan (in PASS mode: after exam mining, including the hide-list)
  3. Preferred language for explanations + depth (terse / standard / encyclopedic —
     PASS mode defaults to intuition-first standard)
  4. If exam material exists: attribution style — dated badges («πέφτει σίγουρα»,
     «2023·Σεπτ») or generic exercises; default dated (see 12-exam-mining.md §5)

Wait for answers before scaffolding. If exam material exists, run exam mining
(`references/12-exam-mining.md`) BEFORE finalizing the chapter plan — in PASS mode
the mining output IS the plan's backbone.

---

## 7. Scaffolding (second session) — checklist

- [ ] Create `_build/STATE.md` (use the template in §3)
- [ ] Copy ALL FOUR stylesheets: `assets/styles/{base,layout,components,quiz}.css` → `../styles/`
- [ ] Copy `assets/js/nav.js` → `../js/nav.js` (edit `topics` array: one entry per chapter,
      pick a fitting `SVG_ICONS.*` per subject; keep `examprep` + `quiz` + `flashcards` entries last)
- [ ] Copy `assets/js/quiz-loader.js` → `../js/quiz-loader.js`
- [ ] Copy `assets/js/interactive_quiz.js` → `../js/interactive_quiz.js`
- [ ] Copy `assets/js/flashcards.js` → `../js/flashcards.js`
- [ ] Copy `assets/data/questions.js` → `../data/questions.js` (empty stub)
- [ ] Copy `assets/data/flashcards.js` → `../data/flashcards.js` (empty stub)
- [ ] Create `../index.html` from `assets/index.html`, with one card per planned chapter (cards link to chapter files that don't yet exist — that's OK)
- [ ] Create `../interactive_quiz.html` from `assets/interactive-quiz.html`
- [ ] Create `../flashcards.html` from `assets/flashcards.html`
- [ ] Verify: `ls ../index.html ../flashcards.html ../styles/ ../js/ ../data/`
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

## 10. Multi-agent coordination (optional, recommended)

The build maps onto distinct agent roles — Orchestrator, Exam Miner, Outliner, Chapter
Writer, Reviewer, QA Runner. Full role definitions, platform mapping (Claude Code
subagents in `agents/`, Gemini sequential sessions, chat-per-role elsewhere), and
parallelism/file-ownership rules are in **`references/13-orchestration.md`**.

The non-negotiable core: the **Reviewer must be a fresh context** with no memory of the
builder's reasoning. It only sees: source PDF + generated HTML + the fidelity checklist.
If you're a single agent doing both roles, deliberately clear your reasoning between 4c
and 4d — re-open the source PDF from scratch, don't trust your memory of what's already
in the HTML. See `references/10-reviewer-pass.md` for the reviewer protocol.

---

Now read `references/01-workflow.md` for the full process, or `references/09-chunked-execution.md` if you're picking up mid-build. If past exams exist, `references/12-exam-mining.md` comes before any chapter planning.

# 01 — The Workflow

> Step-by-step process for an agent building course webnotes. Follow in order. Each phase has explicit "stop and confirm with user" checkpoints — respect them.
>
> **IMPORTANT — multi-session workflow:** The task spans many sessions. This doc shows the linear flow; for state tracking across sessions read `09-chunked-execution.md`. Content-fidelity rules are in `08-fidelity.md`. The reviewer pass (`10-reviewer-pass.md`) is mandatory after each chapter HTML draft.

---

## Phase 0 — Sanity check the environment

Before anything else:

1. Confirm you can read PDFs (try opening one). If not, ask the user to convert PDFs to markdown.
2. Confirm the skill's `assets/` folder exists (next to SKILL.md). If not, the skill folder is incomplete.
3. Identify the **course workspace** — your output lives there, never inside the skill/extension folder.

---

## Phase 1 — Discovery

**Goal:** know what source material exists.

### Actions

1. `Glob` parent directory for: `*.pdf`, `*.md`, `*.docx`, `*.tex`, common note formats.
2. List what you found, grouped logically (e.g. `slides/` folder vs loose files).
3. Identify **exam material**: `exams/`, `past-papers/`, `assignments/`, exercise files,
   photos of exam papers — if any exist, plan an Exam Prep phase (`11-exam-prep.md`).
4. Identify any **existing webnotes output** (e.g. previous `topic1_*.html`, `index.html`,
   `styles/`) — if found, this is an **ENHANCE run**: audit the existing pages against the
   skill's standard (component usage, depth vs source, per-section quizzes, exam prep,
   responsive rendering) and produce a gap list instead of a greenfield chapter plan.
   Never regress or delete content the site already has.

### Output

A bullet list to the user:

> Βρήκα τα εξής αρχεία:
> - `slides/lecture1-intro.pdf` (12 pages)
> - `slides/lecture2-recursion.pdf` (34 pages)
> - `slides/lecture3-divide-conquer.pdf` (28 pages)
> - `extra/cheatsheet.md`
> - `exams/2023.md`, `exams/2024.md` (past papers → exam mining will run)
> - (no existing topic*.html files)

Also ask the **goal mode** question now (see SKILL.md §6): PASS (πέρνα το μάθημα
γρήγορα — exam-pattern-driven) or MASTER (κατανόησε όλη την ύλη — full coverage).
The answer changes Phases 2.5–6 below.

---

## Phase 2 — Subject classification

**Goal:** decide what kind of content this is, so you know which components to use heavily.

### Decision tree

- **CS / Programming course** → code blocks, struct diagrams, race-condition timelines, terminal output examples
- **Algorithms / DS course** → pseudocode, complexity tables, step-by-step traces, recursion trees
- **Pure Math course** → MathJax formulas (load CDN), theorem/proof boxes, worked examples, geometry SVG
- **Mixed (e.g. theoretical CS)** → both code and math

### Action

Briefly state to the user what you classified the subject as, so they can correct you:

> Φαίνεται μάθημα Αλγορίθμων — θα χρησιμοποιήσω pseudocode blocks, complexity tables, και recursion-tree diagrams. Σωστά;

---

## Phase 2.5 — Exam mining (when exam material exists)

**Goal:** know what the exam actually tests BEFORE planning chapters.

Follow `references/12-exam-mining.md` in full. Output: `_build/exam_patterns.md` with
the question inventory, the family × period frequency matrix, the typical-paper
blueprint, the Tier 1/2/3 pass plan, and the syllabus cross-check.

- **PASS goal mode:** this phase is MANDATORY and its output drives Phase 3 — the
  chapter plan covers in-scope chapters only, ordered by exam value; zero-exam-presence
  chapters go on the hide-list (confirmed with the user, hidden from hub/nav/quiz,
  never deleted).
- **MASTER goal mode:** the mining output feeds Phase 6 (exam prep) and the 🎯 Exam
  Focus boxes, but the chapter plan still covers everything.

### Stop and confirm

Show the user the frequency matrix + tier list + (in PASS mode) the hide-list.
Wait for confirmation before Phase 3.

---

## Phase 3 — Per-source skim & chapter planning

**Goal:** produce a chapter plan, each chapter with a section list.

### Actions

For EACH source file:
1. Read first ~3 pages to identify the chapter title and main subject.
2. Skim section headers (look for slide titles, numbered sections, "##" in markdown).
3. Note approximate page count → estimate complexity tier:
   - < 20 pages → 6–8 sections
   - 20–50 pages → 8–11 sections
   - 50–90 pages → 11–14 sections
   - 90+ pages → consider splitting into 2 chapters

4. Suggest 2–4 word **section IDs** (used in URLs/quiz data): lowercase, no hyphens, snake_case OK but prefer single words (`intro`, `mutexes`, `prodcons`).

### Output

A plan table like:

```
| # | File                      | Chapter Title            | Slug              | Sections (IDs)
| 1 | lecture1-intro.pdf        | Intro & Big-O           | bigo              | intro, growth, common-funcs, master-theorem, quiz
| 2 | lecture2-recursion.pdf    | Recursion & Induction   | recursion         | intro, base-cases, induction, tower-of-hanoi, ...
| 3 | lecture3-divide-conquer.pdf | Divide & Conquer       | divide_conquer    | intro, mergesort, quicksort, closest-pair, ...
```

### Stop and confirm

Show this plan to the user, ask: "Should I proceed with this structure? Want any chapters renamed, merged, or split?"

**Wait for confirmation.** Don't skip this.

---

## Phase 4 — Scaffolding

**Goal:** lay down shared assets in the parent directory.

### Actions

1. Copy ALL FOUR stylesheets `assets/styles/{base,layout,components,quiz}.css` → `../styles/`
2. Copy `assets/js/nav.js` → `../js/nav.js`
3. Copy `assets/js/quiz-loader.js` → `../js/quiz-loader.js`
4. Copy `assets/js/interactive_quiz.js` → `../js/interactive_quiz.js`
5. Copy `assets/js/flashcards.js` → `../js/flashcards.js`
6. Copy `assets/data/questions.js` → `../data/questions.js` (starts as empty stub)
7. Copy `assets/data/flashcards.js` → `../data/flashcards.js` (starts as empty stub)
8. Create `../index.html` from `assets/index.html`:
   - Fill in course title, hero subtitle
   - Add ONE `<a class="topic-card">` per planned chapter (link target = `topic<N>_<slug>.html`
     at the workspace root, even if the file doesn't exist yet)
   - Add the Exam Prep card (orange) if exam material exists, then the Interactive Quiz card at end, and the Flashcards card at the end
9. Edit `../js/nav.js`:
   - Populate the `topics` array with one entry per chapter (pick a fitting `SVG_ICONS.*` each; keep examprep + quiz + flashcards last)
10. Create `../interactive_quiz.html` from `assets/interactive-quiz.html`
11. Create `../flashcards.html` from `assets/flashcards.html`

### Verification

`Glob` the parent directory — confirm `index.html`, `flashcards.html`, `styles/base.css`, `js/nav.js`, `js/quiz-loader.js`, `js/flashcards.js`, `data/questions.js`, and `data/flashcards.js` all exist.

---

## Phase 5 — Build chapters (one at a time, ACROSS SESSIONS)

**Goal:** for each chapter, produce a complete, high-quality, fully-faithful HTML page.

> ⚠️ Each chapter is split into **5 sub-sessions**: Outline → HTML → Quiz → Reviewer → (optional) Cross-validation. See `09-chunked-execution.md` §4 for the cadence. Don't try to compress this — quality drops fast.

### Per-chapter cycle

#### 5.A — OUTLINE session (read source, extract content)

**Output files:**
- `../_build/topic<N>_outline.md` — structured content extraction
- `../_build/topic<N>_fidelity.md` — checklist of items that MUST appear in the HTML

Open the PDF and read it **page by page**. For a 80-page deck, this takes ~3-5 tool calls. Capture **every**:
- Definition (term + statement)
- Code listing (transcribe exactly)
- Pseudocode
- Diagram (describe so you can recreate as inline SVG or CSS shapes)
- Worked example
- Warning / prohibition / "be careful"
- Table / comparison
- Named operator / function / keyword / property
- Bibliographic reference

Write each into the outline AND into the fidelity checklist (one checkbox per item). See `08-fidelity.md` for the exact format.

**Update STATE.md:** mark Outline ✅ for this chapter.

#### 5.B — HTML session (write the page)

**Input:** `../_build/topic<N>_outline.md`, `../_build/topic<N>_fidelity.md`, `assets/chapter.html`
**Output:** `../topic<N>_<slug>.html` (workspace ROOT, next to index.html — `_build/` holds state only)

Steps:
1. Pick a chapter accent color (see `03-design-system.md` §2). Don't reuse what siblings use.
2. Map outline items to sections (per Phase 3 plan).
3. Open the page with the «Η Ουσία σε 60″» essence section (see `04-html-components.md`):
   what-it-does gbox, the intuition/mental model in plain language, works-well-when vs
   fails-when compare, and a «Για τις εξετάσεις θυμήσου» tip. Mandatory in PASS mode.
4. Write the chapter HTML using components from `04-html-components.md`.
   In PASS mode: intuition and visuals first; include a formula only when the exam
   grades it, and always translate it to words.
5. As you write each section, tick the corresponding fidelity items.
6. Target 800–1500 lines depending on chapter size.

**Update STATE.md:** mark HTML ✅. Note which fidelity items are now covered.

#### 5.C — QUIZ session (add questions)

**Input:** outline + completed HTML
**Output:** updated `../data/questions.js`

Add `window.quizData["topic<N>"] = { ... }` with one sub-entry per section. 1-3 questions per section. See `05-quiz-format.md`.

**Update STATE.md:** mark Quiz ✅.

#### 5.D — REVIEWER session (mandatory) (re-read source, fill gaps)

**Input:** source PDF (re-read FROM SCRATCH), generated HTML, fidelity checklist
**Output:** patched HTML, completed coverage report

Follow `10-reviewer-pass.md` protocol. Verify every fidelity item is in the HTML. Enhance any section that's missing items or is too terse. Don't skip this.

**Update STATE.md:** mark Reviewer ✅. Add a one-line note about what was added.

#### 5.E — Optional cross-validation

A second agent (or your future self after a break) re-runs Session D independently. Useful for high-stakes / large chapters.

### Repeat for next chapter

**Mandatory:** update `_build/STATE.md` after each session. Tell the user what to ask next.

### Don't rush

Do not attempt all 5 sub-sessions in one tool-call run. Context bloat → quality collapse. One sub-session per work cycle, with state persisted between.

---

## Phase 6 — Exam prep (when exam material exists)

After all chapters are reviewed, if Discovery found past exams / assignments / exercises:

1. Read `references/11-exam-prep.md` in full — it's the complete spec. Your primary
   input is `_build/exam_patterns.md` from Phase 2.5 (families, tiers, blueprint).
2. Extract remaining exam detail → `_build/examprep_outline.md` +
   `_build/examprep_fidelity.md`; the family list comes from the mining matrix
   (already confirmed with the user in Phase 2.5).
3. Build `exam_prep.html` — PASS mode uses the model-answers-centric template
   (strategy → primer → core facts table → recipes/mnemonics → model answers →
   recurring proofs → skip-triage); MASTER mode uses the solved-families template.
   Respect the attribution setting (dated badges vs generic exercises) and Rule B
   (never reference the student's specific implementation).
4. Add `"examprep"` quiz data, 🎯 Exam Focus boxes in mapped chapter sections,
   nav entry + orange hub card.

This phase is its own session (or two for rich material). Skip ONLY if no exam-related
material exists and the user doesn't want a generic version.

---

## Phase 7 — Cross-chapter quiz wiring

After all chapters are done:

1. Open `../interactive_quiz.html`
2. Confirm it pulls from `../data/questions.js` (the template does this automatically)
3. Test in browser — verify questions from multiple chapters appear

---

## Phase 8 — Final QA

Run through `references/07-checklist.md`. Every box ticked = ship.

---

## Phase 9 — Summary to user

Final message:

```
✅ Built course webnotes:
   - 6 chapter pages (topic1_*.html ... topic6_*.html)
   - 87 sections, 142 quiz questions
   - Shared assets in styles/, js/, data/

📂 Output: ./
🚀 Preview: npm run dev (then http://localhost:3000)

🧠 Coverage: All 6 source PDFs covered. Notable depth points:
   - Topic 3 includes 4 simulations
   - Topic 5 has 18 annotated code listings
   ...

⚠️ Known gaps:
   - The slides on §4.3 (advanced recursion) reference an external textbook
     I didn't have access to — that section is lighter than others.
```

---

## Anti-patterns

| Don't | Do |
|---|---|
| Build all 7 chapters in one tool call | One chapter per "work session"; verify before moving on |
| Auto-confirm own plan | Stop at Phase 3 and Phase 4 to let user adjust |
| Skip the per-section quiz | Mandatory — they're 50% of the value |
| Generate from memory of the topic | Always read the actual source pages |
| Use plain `<pre>` for code | Use `.cb` with syntax-highlight classes |
| Make every section "intro/details/example" | Each section has a distinct role — use the components creatively |

---

Next: read `references/02-research.md` for techniques on extracting structure from messy source material.

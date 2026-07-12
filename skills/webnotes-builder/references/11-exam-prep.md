# 11 — Exam Prep Page (`exam_prep.html`)

> How to build the exam-preparation page: solved exam-style exercises, theory flash-cards,
> "what does this print?" drills, and the bridge from coursework/assignments to the exam.
> This is a **standard part of every webnotes site** whenever exam material exists —
> and one of the highest-value pages for students.

---

## 1. When to build it

Build (or enhance) `exam_prep.html` when ANY of these exist in the workspace:

- A folder of past exam material: `exams/`, `exam material/`, `past-papers/`, photos/PDFs of old exams
- Student assignment implementations: `assignments/`, `homework/`, `projects/`
- Exercise collections: `exercises/`, `*.txt` problem sets
- The user explicitly asks for exam preparation content

If none exist, ask the user once during Discovery: *"Do you have past exams or
assignments? They make a big difference for the exam-prep page."* If the answer is no,
you can still build a lighter version from the lecture material alone (recurring
concepts → theory flash + drills), but say so honestly.

**Input quality note:** past exams are often *photos*. Read them carefully; if part of a
statement is unreadable, reconstruct the *pattern* of the question (say so in your
notes) rather than inventing exact wording. Never present a guessed statement as a
verbatim quote.

---

## 2. The content-policy rules

### Rule A — Attribution follows the user's choice (`Attribution:` in STATE.md)

Two valid styles — Discovery asks which one (see `12-exam-mining.md` §5):

- **`dated`** (default for personal study) — recurrence evidence is SHOWN, because it's
  the strongest motivator: `.exam-badge` chips like «πέφτει σίγουρα», «2023·Σεπτ»,
  «3/4 χρόνια» next to headings and model-answer questions. Point values may be shown
  when they inform strategy («αξίζει 20 μονάδες — ξεκίνα από εδώ»).
- **`generic`** — no dates, no sitting references, no point percentages; everything
  presented as generic exercises. Use when the site will be shared beyond the user:
  - ❌ "Έπεσε τον Ιούνιο 2025" / "Θέμα 3 της εξέτασης του 2024" / "(18% + 2%)"
  - ✅ "Άσκηση 1 — recv_and_sum" / "Κλασικό ερώτημα θεωρίας"

In BOTH styles the *structure overview* may describe the typical format
("τυπικά ~5 θέματα σε 120 λεπτά"). In both styles, never fabricate attribution —
a `dated` badge must be backed by the frequency matrix in `_build/exam_patterns.md`.

### Rule B (NON-NEGOTIABLE) — No references to the student's specific implementation

The assignments bridge teaches **ideas and patterns**, never one student's code. Other
students implemented things differently.

- ❌ "το `queue_pop()` σου στο `jobqueue.c`" / "η `write_all` της Εργασίας 2 (protocol.c)"
- ✅ "η ουρά εργασιών: workers που περιμένουν με `cond_wait` όσο η ουρά είναι άδεια"
- ✅ Generic annotated sample code showing the pattern (write it yourself; don't paste the student's)

What you DO take from the assignments: the **patterns** (length-prefixed messaging,
read/write loops, blocking queue with condvars, fork→dup2→exec→wait, signal flags) and
the mapping "exam exercise family ↔ idea you already implemented".

---

## 3. Page structure — two templates, pick by goal mode

Theme: **orange accent** (`--orange` / `--odim`), hero tagline like `'$ ./exam --duration=120min'`.
The page uses the standard chapter skeleton (hero, toc, wrap, sections, footer) plus the
extra CSS below. Section content is driven by `_build/exam_patterns.md` (the tiers and
families from `12-exam-mining.md`). A starter skeleton exists at `assets/exam-prep.html`.

### 3a. PASS-mode template (theory-heavy exams / «πέρνα με 1 μέρα διάβασμα»)

Proven with real courses — the page is a *standalone crash course*, readable top-to-bottom
in one sitting by a beginner:

| # | id | Title pattern | Content |
|---|----|---------------|---------|
| 1 | `strategy` | Στρατηγική: πώς να περάσεις | The blueprint from exam mining in plain language: what the typical paper contains, which Tier-1 families guarantee the pass line (show the arithmetic: «Tier 1 ≈ 65 μον. → βάση με περιθώριο»), time strategy |
| 2 | `primer` | Τα απολύτως βασικά (για αρχάριο) | 5–10 core definitions/concepts a total beginner needs before the model answers make sense — plain language, one visual |
| 3 | `core-facts` | Ο Πίνακας που πέφτει σίγουρα | The recurring "memorize me" asset of the course as ONE table (complexity table, operator table, formula sheet, TCP-state table...) with an `.exam-badge` («πέφτει σίγουρα») and a memorization aid per row |
| 4 | `howto` | Πώς να λύνεις — Συνταγές & Μνημονικά | One recipe card per recurring *computational* family: the steps, a worked micro-example, the mnemonic, the classic trap |
| 5 | `answers` | Πρότυπες Απαντήσεις | THE core section — see §4b: one ready-to-reproduce model answer per recurring theory question, with attribution badges per the setting |
| 6 | `proofs` | Οι Αποδείξεις που πέφτουν | Every proof the exam recurringly asks, written for a beginner: statement → idea-in-one-line → the proof in numbered steps → what graders look for |
| 7 | `skip` | Τι να αφήσεις τελευταίο | Honest triage from the tier list: Tier-3/rare topics to postpone under time pressure, with one-line "αν τελικά πέσει, γράψε τουλάχιστον αυτό" fallbacks |

Sections 4/6 exist only if the mining found computational families / recurring proofs.
Add `trace` (§6) and `bridge` (§7) sections when the course has code/trace questions or
assignments respectively.

### 3b. MASTER-mode / exercise-heavy template (solved exercise families)

| # | id | Title pattern | Content |
|---|----|---------------|---------|
| 1 | `format` | Πώς Μοιάζει η Εξέταση | Typical structure table, time strategy card, "prototypes are given on the sheet" tip if true, instructor's general advice as a quote if known |
| 2 | `theory` | Θεωρία-Flash | Every recurring short-answer theory pair, as cards with ready 2-line answers ("2 διαφορές", "2 τρόποι", "2 περιπτώσεις") + answer-pattern tip |
| 3..k | one per exercise family | Άσκηση «X» — Λυμένη | See §4 — one section per recurring exam exercise family |
| k+1 | `trace` | Drill: «Τι θα Τυπώσει;» | 10–15 inline reveal-answer drills (see §6) grouped by topic |
| k+2 | `bridge` | Από τις Εργασίες στην Εξέταση | Table mapping exercise families → the *idea* in the assignments + 2 generic annotated code skeletons + last-day checklist |

For a systems-programming course the exercise families were: socket function, synchronized
threads, fork+exec+wait, bash script. **Derive the families from the actual exam material**
(the mining matrix): each recurring group becomes a section. Other courses differ
(Prolog: unification trace, cut behavior, list predicates; Algorithms: complexity
analysis, algorithm trace, correctness argument; Data Mining: describe-an-algorithm,
complexity table, Apriori proof, Gini/Entropy computation).

Mixed exams (theory + exercises) can combine: PASS template + solved-family sections.

---

## 4. Anatomy of a "solved exercise family" section

Each family section contains, in order:

1. **Lead paragraph** — what the family tests and the 1–2 graded points
   ("τα δύο σημεία που βαθμολογούνται: σωστό byte order και σωστό read loop").
2. **Exercise statement** in an `.exam-stmt` box (label: `Άσκηση 1 — <name>`), including
   any sub-question ("Ερώτημα (β): ...").
3. **Full solved code** in a `.cb` block — annotated with comments that explain the
   *graded* decisions, written so it could be reproduced on paper.
4. **"Τα σημεία που βαθμολογούνται" card** — bullet list of what earns/loses marks,
   each tied to a line of the solution.
5. **A "zero-marks" warning** (`.wbox` with red label) if the family has an instant-fail
   pattern (e.g. busy waiting where the statement forbids it).
6. **A variant** — second `.exam-stmt` with a different statement of the same family,
   solved more briefly (sketch + the key insight), teaching generalization:
   "μάθε ΕΝΑΝ σκελετό και προσαρμόζεις μόνο τη συνθήκη".
7. **Answer to numeric sub-questions** with the *why* AND the misconception the question
   is fishing for ("αν ξεχάσεις το ntohl σε little-endian θα έβλεπες ...").
8. **`<div class="section-quiz" data-topic="examprep" data-section="<id>"></div>`**

Solution code quality bar: compile-ready, helper functions included (e.g. `read_all`/
`write_all` with the short-read loop), every error path checked, comments in the course
language explaining *why* not *what*.

---

## 4b. Anatomy of the Model Answers section (`#answers` — PASS template's core)

One `.qa-card` per recurring theory question from the mining matrix (Tier 1 first).
Each card is an answer the student can **reproduce on paper for full marks**:

1. **`.qa-q` header** — the question as typically phrased, `.qno` number, and (if
   `Attribution: dated`) an `.exam-badge` with the sittings it appeared in
   («2023·Σεπτ», «πέφτει σίγουρα»).
2. **`.qa-layout` two-column body**:
   - **`.qa-main-ans`** — the model answer itself: exam-register prose («διατυπωμένη
     όπως απαιτείται γραπτώς για μέγιστη βαθμολόγηση»), numbered steps for algorithm
     descriptions, the formula in MathJax when graded, and a `.compare`
     (πλεονεκτήματα/μειονεκτήματα) block when the question asks for pros/cons.
   - **`.qa-side-notes`** — the «💡 Για Αρχάριους» column: 2–3 `.side-notes-concept`
     entries decoding the jargon used in the answer with everyday metaphors
     («Φαντάσου το δενδρόγραμμα σαν οικογενειακό δέντρο ανάποδα»). This column is what
     makes the model answer usable by someone who skipped the lectures — never omit it.
3. Optionally a `details.selftest` collapsible («Κάλυψέ την και προσπάθησε να τη
   γράψεις») for active recall.

Quality bar: the main answer alone, transcribed by hand, would earn full marks; the
side notes alone let a beginner understand every term in it.

---

## 5. Extra CSS for the page

Add to the page's `<style>` (on top of the standard chapter block from `03-design-system.md`):

```css
.exam-stmt{background:var(--surf);border:1px solid var(--border);border-left:4px solid var(--orange);border-radius:8px;padding:16px 20px;margin:14px 0;overflow-wrap:anywhere}
.exam-stmt .stmt-label{font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-weight:700;margin-bottom:8px}
/* Q&A model-answer card (PASS template §4b) */
.qa-card{background:var(--surf);border:1px solid var(--border);border-radius:14px;padding:0;margin:18px 0;overflow:hidden}
.qa-q{background:var(--surf2);padding:14px 20px;font-weight:700;color:var(--txt);font-size:1.02rem;border-left:4px solid var(--green);display:flex;gap:10px;align-items:flex-start}
.qa-q .qno{color:var(--green);font-family:'JetBrains Mono',monospace;font-weight:700;flex-shrink:0}
.qa-a{padding:16px 22px}
.exam-badge{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.62rem;letter-spacing:1px;text-transform:uppercase;color:var(--yellow);background:var(--ydim);border:1px solid rgba(227,179,65,.3);border-radius:20px;padding:2px 9px;margin-left:6px;vertical-align:middle}
details.selftest{background:#010409;border:1px solid var(--border);border-radius:8px;padding:10px 14px;margin:12px 0}
details.selftest summary{cursor:pointer;color:var(--purple);font-weight:600;font-size:0.92rem}
details.selftest[open] summary{margin-bottom:8px}
.keyfact{background:linear-gradient(135deg,rgba(63,185,80,.08),rgba(63,185,80,.03));border:1px solid rgba(63,185,80,.3);border-radius:10px;padding:12px 16px;margin:12px 0}
/* Beginner side-notes column */
.qa-layout{display:grid;grid-template-columns:1fr;gap:20px}
@media (min-width:992px){.qa-layout{grid-template-columns:1.25fr 1fr}}
.qa-main-ans{display:flex;flex-direction:column;justify-content:center}
.qa-side-notes{background:rgba(88,166,255,0.04);border:1px dashed rgba(88,166,255,0.2);border-radius:10px;padding:16px;font-size:0.88rem;line-height:1.6;color:var(--muted);display:flex;flex-direction:column;gap:12px}
.side-notes-header{font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--blue);font-size:0.75rem;letter-spacing:1px;text-transform:uppercase;display:flex;align-items:center;gap:6px;margin-bottom:4px;border-bottom:1px solid rgba(88,166,255,0.15);padding-bottom:6px}
.side-notes-concept{border-bottom:1px dashed rgba(255,255,255,0.08);padding-bottom:10px}
.side-notes-concept:last-child{border-bottom:none;padding-bottom:0}
.concept-title{color:var(--txt);font-weight:600;font-size:0.88rem;margin-bottom:4px;display:flex;align-items:center;gap:4px}
.concept-desc{margin:0;font-size:0.84rem;color:var(--muted)}
```

Statement box usage:

```html
<div class="exam-stmt">
  <div class="stmt-label">Άσκηση 1 — recv_and_sum</div>
  <p>Γράψτε μια συνάρτηση <code>int recv_and_sum(int sock)</code> που ...</p>
  <ul>
    <li>i) ... </li>
    <li>ii) ... </li>
  </ul>
  <p><strong>Ερώτημα (β):</strong> Αν ο αποστολέας στείλει ... ;</p>
</div>
```

---

## 6. The trace drill ("Τι θα τυπώσει;")

Inline reveal-answer items reusing the quiz CSS and the global `toggleAnswer()` from
`quiz-loader.js` — NO extra JS needed. Group drills into 2–3 `.quiz` blocks by theme:

```html
<div class="quiz">
  <h3>🔥 Fork &amp; Processes</h3>
  <div class="qitems">
    <div class="qitem">
      <div class="qq">Πόσες φορές τυπώνεται το "hi";<br>
        <code>int main() { fork(); fork(); printf("hi\n"); }</code></div>
      <div class="qa" id="tq1" style="display:none"><strong>4 φορές.</strong>
        Το 1ο fork → 2 διεργασίες· καθεμιά κάνει το 2ο fork → 4. Γενικά: n σειριακά fork → 2ⁿ.</div>
      <button class="qa-toggle" onclick="toggleAnswer('tq1', this)">Δες απάντηση</button>
    </div>
    <!-- more .qitem -->
  </div>
</div>
```

- `id` must be unique per item (`tq1`, `tq2`, ...).
- Each answer explains the *mechanism*, not just the value, and names the trap
  ("κλασική παγίδα του buffering").
- Good drill sources: anything with a surprising output (buffering + fork, copy-on-write,
  lost updates without mutex, `read()==0`, short writes, `dup2`, `grep -c` vs `grep -o|wc -l`,
  `if` vs `while` with cond_wait). Adapt to the course domain.
- Tell the student to **solve on paper first** in the section lead.

---

## 7. The assignments bridge (`#bridge`)

Goal: convince the student that "if you wrote the assignments, you already know this" —
**at the level of ideas**, per Rule B.

1. **Table** with 3 columns: exercise family | "Η ιδέα στις εργασίες" (described
   generically: *what* the assignment made them build, not *how they named it*) |
   "Τι να προσέξεις".
2. **Two annotated skeleton cards** showing the 2 most exam-critical patterns as
   ~8-line generic code (e.g. blocking pop with condvar; fork→dup2→exec→wait). Caption:
   "άλλαξε τη συνθήκη του while και έχεις τη λύση της άσκησης X".
3. **Last-day checklist tip** — 4 items: reproduce the N core patterns on paper, re-run
   theory-flash, redo drills, "κρίνεται η λογική, όχι η αποστήθιση".

---

## 8. Quiz data

Add an `"examprep"` top-level key in `data/questions.js` with one sub-key per section
that has a `.section-quiz` placeholder (typically: `theory`, plus one per exercise
family). 3–5 questions per section, standard format (`05-quiz-format.md`). The questions
should test the *graded points* and the *misconceptions* (e.g. "τι μετράει το grep -c;",
"γιατί broadcast και όχι signal;"). The `trace` section needs no quizData — its drills
are inline.

These questions automatically join the cross-chapter Interactive Quiz.

---

## 8b. Theory Flashcards Workspace (`flashcards.html` & `data/flashcards.js`)

In addition to short-answer theory pairs in the `exam_prep.html` file, a standalone **Theory Flashcards Test Workspace** (`flashcards.html`) should be deployed. 

This workspace aggregates all theory questions from all chapters into an interactive, flippable self-test dashboard.

### 1. Data Schema (`data/flashcards.js`)
All flashcards are loaded from `data/flashcards.js` using the following object structure:
```javascript
window.flashcardData = {
  "topic1": {
    "title": "Chapter Title",
    "page": "topic1_basics.html",
    "cards": [
      {
        "tag": "Short Label",
        "q": "What is the question?",
        "hint": "Clue text.",
        "a": "Detailed model answer explaining it."
      }
    ]
  }
};
```

### 2. Rendering In Chapters
On individual chapter pages, you can render that chapter's specific deck by placing:
```html
<div data-fc-deck="topic1"></div>
```
Ensure that `js/flashcards.js` and `data/flashcards.js` are loaded on the page.

---

## 8c. Cram Sheet (`cram_sheet.html`) — printable one-pager (PASS mode)

The last thing a student reads before walking into the exam — **one printed page** (two
at most). Build it in PASS mode, or whenever the user asks for a printable summary.

**Content (in this order, everything sourced from `_build/exam_patterns.md` and the
chapter essence sections):**

1. **The core-facts table** (complexity/operator/formula table) — condensed to one
   compact `vtbl`, memorization aid column included.
2. **«Θυμήσου» per chapter** — the numbered take-aways from each in-scope chapter's
   «Η Ουσία σε 60″» exam tip, one line each, grouped by chapter.
3. **Key formulas** — only the graded ones, each with a 3-5 word "τι λέει" gloss.
4. **Tier-1 checklist** — the CORE families as checkboxes («μπορώ να γράψω την
   περιγραφή του K-means από μνήμης;»), so the student can self-verify readiness.

**Format rules:**

- Standard page skeleton (nav/hero minimal), but the whole content area is optimized
  for `@media print`: white background, black text, no shadows/gradients, `.no-print`
  on nav/hero/footer, `page-break-inside: avoid` on each block.

```css
@media print {
  body { background: #fff; color: #000; font-size: 11px; }
  .no-print, #site-nav, .hero, .footer, .theme-toggle { display: none !important; }
  .vtbl, .card { border-color: #999; box-shadow: none; break-inside: avoid; }
  a { color: #000; text-decoration: none; }
}
```

- Density over beauty: this page intentionally violates the "spacious layout" rule —
  it's a reference card, not reading material.
- No quizzes, no interactivity, no MathJax if avoidable (plain text/Unicode formulas
  print more reliably); if MathJax is needed, keep display math out of tables.
- Attribution rules apply as everywhere (badges only in `dated` mode).

**Wiring:** nav entry after Exam Prep (`icon: SVG_ICONS.book`), plus a small hub card
(«🖨️ Cram Sheet — τύπωσέ το για την τελευταία επανάληψη») next to the Flashcards card.

---

## 9. Exam Focus boxes in the chapter pages (the "hybrid")

The exam page alone is not enough — students study chapter-by-chapter. Add a compact
**🎯 Exam Focus** box in each chapter section whose material maps to an exercise family
or recurring theory question, placed **immediately before that section's
`.section-quiz`** div:

```html
<div class="tip">
  <div class="tip-icon">🎯</div>
  <div>
    <div class="tip-title">Exam Focus — <short hook></div>
    <div class="tip-text">One paragraph: the recurring exercise/trap this section maps to,
    the 1-2 graded points, and a link: <a href="exam_prep.html#<anchor>">Λυμένη άσκηση</a>.</div>
  </div>
</div>
```

Guidelines:
- 1 box per mapped section, max ~2 per chapter — they must stay special.
- Each box names concrete graded points ("args[] με NULL στο τέλος", "while όχι if"),
  not vague "this is important".
- Same genericity rules apply (no dates, no student-implementation references).

---

## 10. Wiring

1. `js/nav.js` — add `{ id: 'examprep', title: 'Exam Prep', path: 'exam_prep.html', icon: SVG_ICONS.target }`.
   In **PASS mode** place it right after Home (it's the primary destination); in MASTER
   mode before the Interactive Quiz entry.
2. `index.html`:
   - **PASS mode** — the exam-prep card is the FIRST card, full-width and prominent
     («ΞΕΚΙΝΑ ΑΠΟ ΕΔΩ»), see the "exam-first hub hero card" recipe in
     `04-html-components.md`; the hub hero paragraph also points to it.
   - **MASTER mode** — an orange-themed card before the Interactive Quiz card:

```html
<a href="exam_prep.html" class="topic-card"
   style="border-color: var(--orange); background: linear-gradient(135deg, var(--surf), rgba(251, 146, 60, 0.06));">
  <div class="topic-num" style="color: var(--orange);">EXAM PREP</div>
  <h3>Εξεταστική 🎯</h3>
  <p>Λυμένες ασκήσεις στο στυλ της εξέτασης, τα μοτίβα που επανέρχονται, drills «τι θα τυπώσει;» και η γέφυρα από τις εργασίες στα θέματα.</p>
  <div class="topic-tags">
    <span class="tag">solved</span><span class="tag">patterns</span><span class="tag">drills</span>
  </div>
</a>
```

---

## 11. Fidelity rules for exam material

The fidelity discipline (`08-fidelity.md`) applies to exam sources too. Build
`_build/examprep_fidelity.md` listing:

- [ ] every theory question found in the exam material → covered in `#theory`
- [ ] every coding exercise → either fully solved OR represented by a solved exercise
      of the same family + a variant (note which)
- [ ] every numeric sub-question → answered with reasoning
- [ ] every "Απαραίτητα/constraints" note (e.g. "no busy waiting") → reflected in a
      graded-points card or warning box
- [ ] reference/prototype sheet included with the exam (if any) → mentioned in `#format`

You don't have to solve every exercise in full — the user's guidance: *"nudge the
students into the insight and practices that will help them solve them."* A variant with
the key insight + skeleton counts as covered. Full solutions for at least one exercise
per family.

---

## 12. Done criteria

- [ ] `exam_prep.html` exists with all sections of the template chosen in §3 (PASS or
      MASTER), standard nav/hero/toc/footer
- [ ] Every Tier-1 family from `_build/exam_patterns.md` has a model answer or solved
      exercise; every recurring proof is written out
- [ ] `flashcards.html` workspace and `data/flashcards.js` exist and compile/run correctly
- [ ] Attribution matches the STATE.md setting: `dated` → every `.exam-badge` is backed
      by the frequency matrix; `generic` → no years/sittings/percentages anywhere
- [ ] No student-implementation references in either style (grep for assignment file names)
- [ ] All solution code is complete and would compile/run
- [ ] Trace drills toggle correctly (unique ids)
- [ ] `examprep` entries in `data/questions.js`; no console warnings
- [ ] 🎯 Exam Focus boxes placed in mapped chapter sections, links resolve
- [ ] Nav + hub card wired (including Flashcards Test, and in PASS mode the
      `cram_sheet.html` printable one-pager per §8c with its card + print CSS)
- [ ] `_build/examprep_fidelity.md` all ticked
- [ ] STATE.md updated (Exam Prep phase ✅)

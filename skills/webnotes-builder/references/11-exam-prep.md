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

## 2. The two golden rules (content policy)

These come from real user feedback and are NON-NEGOTIABLE:

### Rule A — No dated/attributed exam references

Present everything as **generic exercises and guidance**, even when they are, at heart,
solutions to specific past exams.

- ❌ "Έπεσε τον Ιούνιο 2025" / "Θέμα 3 της εξέτασης του 2024" / "(18% + 2%)"
- ❌ "Εκφώνηση (παλιά εξέταση)"
- ✅ "Άσκηση 1 — recv_and_sum" / "Άσκηση 2 — παραλλαγή"
- ✅ "Κλασικό ερώτημα θεωρίας" / "Η τυπική άσκηση sockets"

The *structure overview* section may describe the exam's typical format in general terms
("τυπικά ~5 θέματα σε 120 λεπτά"), but never cite specific sittings.

### Rule B — No references to the student's specific implementation

The assignments bridge teaches **ideas and patterns**, never one student's code. Other
students implemented things differently.

- ❌ "το `queue_pop()` σου στο `jobqueue.c`" / "η `write_all` της Εργασίας 2 (protocol.c)"
- ✅ "η ουρά εργασιών: workers που περιμένουν με `cond_wait` όσο η ουρά είναι άδεια"
- ✅ Generic annotated sample code showing the pattern (write it yourself; don't paste the student's)

What you DO take from the assignments: the **patterns** (length-prefixed messaging,
read/write loops, blocking queue with condvars, fork→dup2→exec→wait, signal flags) and
the mapping "exam exercise family ↔ idea you already implemented".

---

## 3. Page structure (8 sections)

Theme: **orange accent** (`--orange` / `--odim`), hero tagline like `'$ ./exam --duration=120min'`.
The page uses the standard chapter skeleton (hero, toc, wrap, sections, footer) plus the
extra CSS below.

| # | id | Title pattern | Content |
|---|----|---------------|---------|
| 1 | `format` | Πώς Μοιάζει η Εξέταση | Typical structure table (exercise families, NOT dated papers), time strategy card, "prototypes are given on the sheet" tip if true, instructor's general advice as a quote if known |
| 2 | `theory` | Θεωρία-Flash | Every recurring short-answer theory pair, as cards with ready 2-line answers ("2 διαφορές", "2 τρόποι", "2 περιπτώσεις") + answer-pattern tip |
| 3..k | one per exercise family | Άσκηση «X» — Λυμένη | See §4 — one section per recurring exam exercise family |
| k+1 | `trace` | Drill: «Τι θα Τυπώσει;» | 10–15 inline reveal-answer drills (see §6) grouped by topic |
| k+2 | `bridge` | Από τις Εργασίες στην Εξέταση | Table mapping exercise families → the *idea* in the assignments + 2 generic annotated code skeletons + last-day checklist |

For a systems-programming course the exercise families were: socket function, synchronized
threads, fork+exec+wait, bash script. **Derive the families from the actual exam material**:
group past questions by what they test; each group with ≥1 occurrence becomes a section.
Other courses will differ (e.g. Prolog: unification trace, cut behavior, list predicates;
Algorithms: complexity analysis, algorithm trace, correctness argument).

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

## 5. Extra CSS for the page

Add to the page's `<style>` (on top of the standard chapter block from `03-design-system.md`):

```css
.exam-stmt{background:var(--surf);border:1px solid var(--border);border-left:4px solid var(--orange);border-radius:8px;padding:16px 20px;margin:14px 0;overflow-wrap:anywhere}
.exam-stmt .stmt-label{font-family:'JetBrains Mono',monospace;font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-weight:700;margin-bottom:8px}
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

1. `js/nav.js` — add `{ id: 'examprep', title: 'Exam Prep', path: 'exam_prep.html', icon: SVG_ICONS.gradCap }`
   **before** the Interactive Quiz entry.
2. `index.html` — add an orange-themed card before the Interactive Quiz card:

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

- [ ] `exam_prep.html` exists with all sections from §3, standard nav/hero/toc/footer
- [ ] No dated exam references, no student-implementation references (grep for years,
      semester names, assignment file names)
- [ ] All solution code is complete and would compile/run
- [ ] Trace drills toggle correctly (unique ids)
- [ ] `examprep` entries in `data/questions.js`; no console warnings
- [ ] 🎯 Exam Focus boxes placed in mapped chapter sections, links resolve
- [ ] Nav + hub card wired
- [ ] `_build/examprep_fidelity.md` all ticked
- [ ] STATE.md updated (Exam Prep phase ✅)

# 12 — Exam Mining (Past-Exam Pattern Analysis)

> Before you plan chapters — and before you write a single line of exam prep — you analyze
> the past exams as **data**. The output is `_build/exam_patterns.md`: a frequency-ranked
> map of what the exam actually tests. In **PASS goal mode** this file drives the whole
> build (what to cover deeply, what to hide, what the exam-prep page solves). In
> **MASTER goal mode** it drives the 🎯 Exam Focus boxes and the exam-prep page only.

---

## 1. When to run

Run exam mining as **Phase 2.5** — after Discovery/subject classification, BEFORE the
chapter plan is finalized — whenever the workspace contains ANY of:

- Past exam papers: `exams/`, `past-papers/`, `exam material/`, loose PDFs/photos/md of old exams
- An official syllabus announcement («ανακοίνωση ύλης», "exam covers chapters ...")
- Exercise sets explicitly labeled as exam-style

If the user picked **PASS goal mode** and no exam material exists, say honestly:
*"Χωρίς παλιά θέματα δεν μπορώ να βρω μοτίβα — θα βασιστώ στην ύλη και στη γενική
τυπολογία εξετάσεων του αντικειμένου."* Then mine what you can from the syllabus +
subject-genre knowledge and mark every prediction as low-confidence.

---

## 2. The mining protocol (6 steps)

### Step 1 — Question inventory

Read EVERY exam file. Photos included — read them carefully; if part of a statement is
unreadable, reconstruct the *pattern* of the question and mark it `(reconstructed)`.
Never present a guessed statement as a verbatim quote.

For each question record:

| Field | Example |
|---|---|
| Period | `2024 Ιούνιος` |
| # in paper | `Θέμα 2β` |
| Statement (condensed) | «Περιγράψτε τον K-means. Τι βελτιστοποιεί; 2 θετικά & 2 αρνητικά» |
| Type | `theory-describe` / `trace-compute` / `proof` / `design-code` / `true-false` / `multiple-choice` |
| Topic(s) | `clustering / k-means` |
| Points | `20` (if visible; else `?`) |

### Step 2 — Family clustering

Group questions **across periods** that test the same skill, even with different wording.
Name each family with a short handle the student will recognize:

```
Family: "Περιγραφή αλγορίθμου clustering"  → 2023-Σεπτ Θ1, 2024-Ιουν Θ3, 2025-Ιουν Θ2
Family: "Πίνακας/ερώτηση πολυπλοκότητας"  → appears in ALL 4 papers
Family: "Απόδειξη anti-monotone (Apriori)" → 2024-Ιουν Θ4, 2025-Σεπτ Θ5
```

A family needs ≥1 occurrence; recurrence across ≥2 periods is what makes it interesting.

### Step 3 — Frequency matrix

Build the family × period matrix:

```markdown
| Family                        | 2023Σ | 2024Ι | 2024Σ | 2025Ι | Freq | Avg pts |
|-------------------------------|:-----:|:-----:|:-----:|:-----:|:----:|:-------:|
| Περιγραφή αλγ. clustering     |  ✓    |  ✓    |  ✓    |  ✓    | 4/4  |  20     |
| Πολυπλοκότητα (k-NN, Hunt...) |  ✓    |  ✓    |  ✓    |  ✓    | 4/4  |  15     |
| Απόδειξη Apriori              |       |  ✓    |  ✓    |       | 2/4  |  15     |
| Gini/Entropy υπολογισμός      |  ✓    |       |  ✓    |       | 2/4  |  10     |
| ...                           |       |       |       |       |      |         |
```

### Step 4 — Exam blueprint

Reconstruct the *typical paper*: number of questions, mandatory vs choice, point
distribution, duration, whether formula sheets/prototypes are provided, style of
grading (does partial credit exist?). One short table + 3-4 bullets.

### Step 5 — Pass-plan tiers (the payoff)

Assign every family to a tier, then compute the **minimum passing set**:

- **Tier 1 — CORE**: recurrence ≥ ~75% of papers. «Πέφτει σχεδόν σίγουρα». The student
  must be able to answer these *perfectly*.
- **Tier 2 — FREQUENT**: recurrence ~40–75%. Learn the pattern + one solved example.
- **Tier 3 — RARE**: seen once, or only in old formats. Read-once material; skip under
  time pressure.

Then the pass check: **sum the average points of Tier 1 families**. If Tier 1 alone
≥ 55–60% of the pass threshold, the pass plan is "master Tier 1, skim Tier 2". If not,
promote the highest-value Tier 2 families into the plan until the expected total clears
the pass line with margin. State this arithmetic explicitly in the file:

```
Pass line: 50/100.  Tier 1 total ≈ 65 pts → μαθαίνοντας ΜΟΝΟ τα Tier 1 τέλεια,
περνάς με περιθώριο ακόμα κι αν χάσεις ένα θέμα.
```

### Step 6 — Syllabus cross-check

Map every family → source chapter/section. Flag both directions:

- **Chapters with zero exam presence** → in PASS mode these become `hidden` (built last
  or not at all, removed from hub/nav/quiz — never deleted; see §4).
- **Families with no source coverage** → the professor tests something not in the
  slides; note it, plan a section from standard textbook treatment, and TELL the user.

---

## 3. Output file — `_build/exam_patterns.md` template

```markdown
# Exam Patterns — <course>

## Sources analyzed
- exams/2023.md (Σεπτέμβριος 2023 — full paper)
- exams/2024.md (Ιούνιος 2024 — full paper)
- exams/june2025_photo.jpg (photo, 80% readable — Θ3 reconstructed)

## Question inventory
<table from Step 1>

## Families & frequency matrix
<table from Step 3>

## Typical paper blueprint
- ~5 θέματα / 120', όλα υποχρεωτικά, σύνολο 100
- Πάντα: 1 περιγραφή αλγορίθμου + 1 πολυπλοκότητα + 1 υπολογιστικό trace
- Δεν δίνεται τυπολόγιο· ζητούνται αποδείξεις σε ~1/2 papers

## Pass plan (target: 50/100)
### Tier 1 — CORE (μάθε τα τέλεια)          ≈ 65 pts expected
1. <family> — <why, which chapters>
...
### Tier 2 — FREQUENT (πάρε τα μισά)        ≈ 25 pts expected
### Tier 3 — RARE (μόνο αν περισσέψει χρόνος)

## Syllabus cross-check
- In-scope chapters: 3,4,5,6,7,8,10   ·   Zero-exam-presence: 9,11,12,13 → hide in PASS mode
- Families without source coverage: <none | list>

## Confidence notes
- Only 4 papers available — Tier 2/3 split is uncertain.
```

Everything in later phases cites THIS file — the exam-prep page structure, the 🎯 Exam
Focus boxes, the hub ordering, and (in PASS mode) the chapter plan itself.

---

## 4. How goal mode consumes the mining output

| | PASS mode («θέλω να περάσω») | MASTER mode (πλήρης κάλυψη) |
|---|---|---|
| Chapter plan | In-scope chapters only, ordered by tier value; zero-presence chapters **hidden** (not built, or built and hidden from hub/nav/quiz) | All chapters built; mining affects ordering hints only |
| Chapter depth | Intuition-first; formulas only where graded; every page opens with «Η Ουσία σε 60″» | Full fidelity to source; essence section still recommended |
| exam_prep.html | The **centerpiece** — first, full-width hub card («ΞΕΚΙΝΑ ΑΠΟ ΕΔΩ»); model answers for every Tier 1 family | Standard orange card before the quiz card |
| Fidelity scope | Fidelity checklist is built against the **in-scope syllabus**; out-of-scope items go to a `## Skipped (out of syllabus)` section of the checklist — excluded *visibly*, never silently | Fidelity against the full source |
| Quiz | `window.quizSyllabus` whitelist filters the cross-chapter quiz to in-scope topics | No filter |

**Hidden ≠ deleted.** When hiding out-of-scope chapters that were already built (ENHANCE
runs), remove them from `index.html`, `js/nav.js`, and the quiz whitelist, but keep the
HTML files on disk and note the hiding in STATE.md so it's reversible.

---

## 5. Attribution style (replaces the old "no dated references" absolute)

Ask the user in Discovery, record in STATE.md as `Attribution: dated | generic`:

- **`dated`** (default for personal study) — recurrence evidence is SHOWN: badges like
  <span>«πέφτει σίγουρα»</span>, «2023·Σεπτ», «3/4 χρόνια». Seeing that the same question
  fell three years running is the strongest motivation to learn the model answer.
- **`generic`** — no dates, no sitting references; everything presented as generic
  exercises («Άσκηση 1 — recv_and_sum»). Use when the site will be shared publicly or
  the user is uncomfortable citing papers.

The badge component (`.exam-badge`) is specified in `04-html-components.md`. Rule B from
`11-exam-prep.md` (never reference one student's specific assignment implementation) is
unaffected and still absolute.

---

## 6. Session protocol

Exam mining is its own session (**EP-0** in `09-chunked-execution.md`):

1. Read this file + all exam material.
2. Produce `_build/exam_patterns.md` per §3.
3. Present to the user: the frequency matrix, the blueprint, and the tier list —
   in 10 lines, plain language.
4. **Confirm the tier list and the hide-list before the chapter plan is finalized.**
   The user knows things you don't (e.g. "ο καθηγητής άλλαξε φέτος την ύλη").
5. Update STATE.md (`Exam mining ✅`, attribution choice, goal mode consequences).

## 7. Anti-patterns

❌ Building exam_prep.html straight from the papers without the inventory/matrix step
❌ Treating one paper's quirk as a "pattern" — recurrence needs ≥2 periods
❌ Silently dropping a chapter because "it doesn't seem exam-relevant" — only the
   matrix + user confirmation can put a chapter on the hide-list
❌ Inventing point values or verbatim statements from unreadable photos
❌ Presenting the pass-plan arithmetic without stating how many papers it's based on

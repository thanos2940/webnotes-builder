# Workflow: EXAMPREP — Build/enhance exam_prep.html (EP-1/EP-2)

> Canonical phase instructions. Paths are relative to the webnotes-builder plugin root;
> if the repo sits inside your course workspace, prefix them with `webnotes-builder/`.

1. Read the spec first:
   - `skills/webnotes-builder/references/11-exam-prep.md` (the full page spec — MANDATORY)
   - `_build/exam_patterns.md` (from the MINE workflow — if missing, run MINE first)
   - `_build/STATE.md` (goal mode PASS|MASTER, attribution dated|generic)
   - `skills/webnotes-builder/references/08-fidelity.md` (fidelity applies to exam material too)
   - `references/03-design-system.md` and `references/04-html-components.md` as needed

2. Discover remaining exam-related material in the workspace:
   - Past exams: `exams/`, `exam material/`, `past-papers/`, loose photos or PDFs
   - Assignments: `assignments/`, `homework/`, `projects/` (extract PATTERNS — never
     quote or reference the student's specific code/file names)
   - Exercise collections (`*.txt`, `*.md` problem sets)
   - Photos: reconstruct unreadable parts as PATTERNS, never fake verbatim quotes.

3. Write `_build/examprep_outline.md` (families from the mining matrix, theory
   questions, drills, bridge ideas) and `_build/examprep_fidelity.md` (checklist per
   11-exam-prep.md §11).

4. Write `exam_prep.html` (start from `skills/webnotes-builder/assets/exam-prep.html`),
   template per goal mode (11-exam-prep.md §3):
   - **PASS**: strategy → primer → core-facts table → recipes/mnemonics → MODEL ANSWERS
     (`.qa-card` with the «Για Αρχάριους» side-notes column, one per recurring question,
     Tier 1 first) → recurring proofs → skip-triage (+ trace/bridge if applicable)
   - **MASTER**: format / theory-flash / one solved section per exercise family
     (statement → full solution → graded points → variant) / trace drills / bridge
   - Attribution `dated`: `.exam-badge` chips ONLY where the frequency matrix backs
     them. Attribution `generic`: no dates, sittings, or percentages anywhere.
   - Rule B always: no references to the student's specific implementation.

5. Add `"examprep"` quiz data to `data/questions.js` (one sub-key per section with a
   `.section-quiz` placeholder, 3-5 questions each).

6. Add 🎯 Exam Focus boxes to the mapped chapter sections (immediately before each
   section's `.section-quiz` div), max ~2 per chapter, each linking to an
   exam_prep.html anchor.

7. Wire navigation: nav.js entry (PASS: right after Home; MASTER: before Interactive
   Quiz) + hub card in index.html (PASS: FIRST full-width «ΞΕΚΙΝΑ ΑΠΟ ΕΔΩ» card;
   MASTER: orange card before the quiz card). Build/refresh `flashcards.html` +
   `data/flashcards.js`. In PASS mode also build `cram_sheet.html` (printable
   one-pager — 11-exam-prep.md §8c).

8. Verify: quizzes render, drills toggle, links resolve, no console warnings — run
   `node scripts/qa-site.mjs` if Node is available; then check attribution consistency
   (dated → badges backed by matrix; generic → grep for years/semester names returns
   nothing) and grep for assignment file names (Rule B).

9. Update `_build/STATE.md`: mark the Exam Prep phase, note coverage stats
   ("X model answers, Y families solved, Z drills"), set next action.

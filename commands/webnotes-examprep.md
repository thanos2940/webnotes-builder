---
description: Build/enhance exam_prep.html from the mined exam patterns
---

Run the Exam Prep phase (EP-1/EP-2).

1. Read `webnotes-builder/skills/webnotes-builder/references/11-exam-prep.md` in full,
   `_build/exam_patterns.md` (run `/webnotes-mine` first if missing), and STATE.md
   (goal mode + attribution).
2. Extract any remaining exam detail → `_build/examprep_outline.md` +
   `_build/examprep_fidelity.md`.
3. Build `exam_prep.html` from `webnotes-builder/skills/webnotes-builder/assets/exam-prep.html`:
   - **PASS mode template**: strategy → primer → core-facts table → recipes/mnemonics →
     model answers (`.qa-card` with the «Για Αρχάριους» side-notes column) → recurring
     proofs → skip-triage. Every Tier-1 family gets a model answer or solved exercise.
   - **MASTER mode template**: format → theory-flash → one solved section per exercise
     family → trace drills → assignments bridge.
   - Attribution `dated`: `.exam-badge` chips backed by the frequency matrix.
     Attribution `generic`: no dates/sittings/percentages anywhere.
   - Rule B always: never reference the student's specific assignment implementation.
4. Add `examprep` quiz data, 🎯 Exam Focus boxes in mapped chapter sections, nav entry,
   and the hub card (PASS: first full-width «ΞΕΚΙΝΑ ΑΠΟ ΕΔΩ» card; MASTER: orange card
   before the quiz). Build/refresh `flashcards.html` + `data/flashcards.js`.
5. Update STATE.md (Exam prep ✅) and report the §12 done-criteria checklist.

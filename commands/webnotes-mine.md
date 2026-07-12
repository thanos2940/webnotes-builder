---
description: Mine past exams into _build/exam_patterns.md (families, frequency matrix, pass-plan tiers)
---

Run the Exam Mining phase (EP-0) for this course.

1. Read `webnotes-builder/skills/webnotes-builder/references/12-exam-mining.md` in full,
   plus `_build/STATE.md` if it exists (goal mode, attribution).
2. Read EVERY past exam file (PDFs, markdown, photos — reconstruct unreadable statements
   as patterns, never as verbatim quotes).
3. Produce `_build/exam_patterns.md`: question inventory → family clustering →
   family × period frequency matrix → typical-paper blueprint → Tier 1/2/3 pass plan
   with explicit arithmetic vs the pass line → syllabus cross-check (hide-list
   candidates in PASS mode).
4. Present to the user in ~10 plain-language lines: the matrix, the blueprint, the
   Tier 1 list, and (PASS mode) the proposed hide-list. WAIT for confirmation.
5. Update STATE.md (Exam mining ✅) and tell the user what to run next
   (usually `/webnotes-resume` for scaffolding, or confirming the chapter plan).

If you can spawn subagents, delegate step 2-3 to the `webnotes-exam-miner` agent and
review its report.

---
description: Outline chapter N — read the source, build outline + fidelity checklist
argument-hint: <chapter-number>
---

Run the OUTLINE session (5.A) for chapter $ARGUMENTS.

1. Read `_build/STATE.md` (which source file, goal mode, syllabus scope) and
   `webnotes-builder/skills/webnotes-builder/references/02-research.md` +
   `references/08-fidelity.md`.
2. Read the chapter's source file page by page — every definition, code listing,
   diagram, table, warning, worked example, named operator/function.
3. Write `_build/topic$ARGUMENTS_outline.md` (structured extraction) and
   `_build/topic$ARGUMENTS_fidelity.md` (one checkbox per item that MUST appear in the
   HTML). PASS mode: out-of-syllabus items go under `## Skipped (out of syllabus)`.
4. Update STATE.md (Outline ✅); tell the user the next step is `/webnotes-html $ARGUMENTS`.

For 90+ page sources, split into sub-outlines per `references/09-chunked-execution.md` §7.

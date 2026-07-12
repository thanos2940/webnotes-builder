# Workflow: OUTLINE <N> — Source extraction + fidelity checklist (session 5.A)

> Canonical phase instructions. `<N>` = chapter number. Paths are relative to the
> webnotes-builder plugin root; if the repo sits inside your course workspace, prefix
> them with `webnotes-builder/`.

1. Read `_build/STATE.md` (which source file, goal mode, syllabus scope) and
   `skills/webnotes-builder/references/02-research.md` + `references/08-fidelity.md`.
2. Read the chapter's source file page by page — every definition, code listing,
   diagram, table, warning, worked example, named operator/function.
3. Write `_build/topic<N>_outline.md` (structured extraction) and
   `_build/topic<N>_fidelity.md` (one checkbox per item that MUST appear in the HTML).
   PASS mode: out-of-syllabus items go under `## Skipped (out of syllabus)`.
4. Update STATE.md (Outline ✅); tell the user the next step is the HTML workflow
   for chapter <N>.

For 90+ page sources, split into sub-outlines per
`skills/webnotes-builder/references/09-chunked-execution.md` §7.

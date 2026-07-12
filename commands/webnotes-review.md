---
description: Mandatory reviewer pass for chapter N — verify against the source, patch gaps
argument-hint: <chapter-number>
---

Run the REVIEWER session (5.D) for chapter $ARGUMENTS — the mandatory verification loop.

Best run in a FRESH session/agent that didn't write the chapter. If you can spawn
subagents, use the `webnotes-reviewer` agent (inputs: source file, chapter HTML,
`_build/topic$ARGUMENTS_fidelity.md`).

Otherwise follow `webnotes-builder/skills/webnotes-builder/references/10-reviewer-pass.md`
yourself:

1. Re-read the SOURCE from scratch, page by page — before opening the HTML.
2. Verify every fidelity-checklist item appears in the HTML (grep + targeted reads).
   PASS goal mode: in-scope items must appear; out-of-scope omissions must be listed
   under `## Skipped (out of syllabus)`.
3. Patch missing/terse/wrong items into the HTML. Never delete existing content.
4. Update the checklist tick-marks and STATE.md (Reviewer ✅) with coverage stats
   («31/31 items ✅») and a one-line note of what was added.

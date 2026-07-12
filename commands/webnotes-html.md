---
description: Write the HTML page for chapter N from its outline
argument-hint: <chapter-number>
---

Run the HTML session (5.B) for chapter $ARGUMENTS.

1. Read `_build/STATE.md`, `_build/topic$ARGUMENTS_outline.md`,
   `_build/topic$ARGUMENTS_fidelity.md`, and
   `webnotes-builder/skills/webnotes-builder/references/03-design-system.md` +
   `references/04-html-components.md`. Re-open the source file too — write from the
   source, not just the outline.
2. Start from `webnotes-builder/skills/webnotes-builder/assets/chapter.html`; pick an
   accent color not used by neighboring chapters.
3. The page OPENS with the «Η Ουσία σε 60″» essence section (mandatory in PASS mode).
   Then the sections per the plan, each ending with its `.section-quiz` placeholder.
   Add 🎯 Exam Focus boxes where `_build/exam_patterns.md` maps a family to this chapter.
4. Tick fidelity items as you cover them. Output: `topic$ARGUMENTS_<slug>.html` at the
   workspace ROOT.
5. Update STATE.md (HTML ✅); next step: `/webnotes-quiz $ARGUMENTS`.

If you can spawn subagents, you may delegate to the `webnotes-chapter-writer` agent.

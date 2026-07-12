# Workflow: HTML <N> — Write the chapter page (session 5.B)

> Canonical phase instructions. `<N>` = chapter number. Paths are relative to the
> webnotes-builder plugin root; if the repo sits inside your course workspace, prefix
> them with `webnotes-builder/`.

1. Read `_build/STATE.md`, `_build/topic<N>_outline.md`, `_build/topic<N>_fidelity.md`,
   and `skills/webnotes-builder/references/03-design-system.md` +
   `references/04-html-components.md`. Re-open the source file too — write from the
   source, not just the outline.
2. Start from `skills/webnotes-builder/assets/chapter.html`; pick an accent color not
   used by neighboring chapters.
3. The page OPENS with the «Η Ουσία σε 60″» essence section (mandatory in PASS mode).
   Then the sections per the plan, each ending with its `.section-quiz` placeholder.
   Add 🎯 Exam Focus boxes where `_build/exam_patterns.md` maps a family to this chapter.
   PASS mode: intuition and visuals first; include a formula only when the exam grades
   it, and always translate it to words.
4. Tick fidelity items as you cover them. Output: `topic<N>_<slug>.html` at the
   workspace ROOT (next to index.html — never inside `_build/`).
5. Update STATE.md (HTML ✅); next step: the QUIZ workflow for chapter <N>.

If you can spawn subagents, you may delegate to the `webnotes-chapter-writer` agent.

# Workflow: CHECKLIST — Final QA across the site

> Canonical phase instructions. Paths are relative to the webnotes-builder plugin root;
> if the repo sits inside your course workspace, prefix them with `webnotes-builder/`.

1. If Node is available, run the mechanical checks first from the workspace root:
   `node <plugin-root>/scripts/qa-site.mjs` — it validates `data/questions.js` /
   `data/flashcards.js` parse, quiz placeholders ↔ quiz data in both directions,
   broken TOC anchors, dead local links, nav.js paths, and duplicate element ids.
   Fix every ERROR it reports before continuing.

2. Read `skills/webnotes-builder/references/07-checklist.md` and `_build/STATE.md`.

3. Work through every checklist section: structural, goal-mode (A2 — PASS hub layout,
   essence sections, hidden-chapter wiring, attribution consistency), per-chapter,
   content depth, quizzes, navigation, cross-references, visual/rendering, interactive
   quiz, exam prep (11-exam-prep.md §12), cleanup.

4. Fix what you find; re-verify fixes (re-run qa-site.mjs at the end).

5. Update STATE.md (Final QA ✅) and give the user the summary message from §K —
   including fidelity coverage stats per chapter and any known gaps.

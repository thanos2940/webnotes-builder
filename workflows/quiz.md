# Workflow: QUIZ <N> — Per-section quiz questions (session 5.C)

> Canonical phase instructions. `<N>` = chapter number. Paths are relative to the
> webnotes-builder plugin root; if the repo sits inside your course workspace, prefix
> them with `webnotes-builder/`.

1. Read `skills/webnotes-builder/references/05-quiz-format.md`, the chapter outline,
   and the finished `topic<N>_*.html`.
2. Add `window.quizData["topic<N>"]` to `data/questions.js` — one sub-entry per
   `.section-quiz` placeholder, 1-3 questions each, with distractors that encode real
   misconceptions and explanations for every answer.
3. If flashcard-worthy theory questions exist, add the chapter's deck to
   `data/flashcards.js` as well.
4. Verify the file parses (no trailing commas / syntax errors) — run
   `node scripts/qa-site.mjs` from the workspace root if Node is available.
5. Update STATE.md (Quiz ✅); next step: the REVIEW workflow for chapter <N>.

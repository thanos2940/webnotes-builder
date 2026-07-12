---
description: Write per-section quiz questions for chapter N
argument-hint: <chapter-number>
---

Run the QUIZ session (5.C) for chapter $ARGUMENTS.

1. Read `webnotes-builder/skills/webnotes-builder/references/05-quiz-format.md`,
   the chapter outline, and the finished `topic$ARGUMENTS_*.html`.
2. Add `window.quizData["topic$ARGUMENTS"]` to `data/questions.js` — one sub-entry per
   `.section-quiz` placeholder, 1-3 questions each, with distractors that encode real
   misconceptions and explanations for every answer.
3. If flashcard-worthy theory questions exist, add the chapter's deck to
   `data/flashcards.js` as well.
4. Verify the file parses (no trailing commas / syntax errors), update STATE.md
   (Quiz ✅); next step: `/webnotes-review $ARGUMENTS`.

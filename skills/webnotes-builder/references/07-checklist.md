# 07 — Final QA Checklist

> Before telling the user "done", verify every box. This is the difference between "agent generated something" and "agent built something usable."

---

## A. Structural checks

- [ ] `index.html` exists at parent dir root
- [ ] One `topic<N>_<slug>.html` per chapter AT THE ROOT (next to index.html), names match `index.html` links
- [ ] `exam_prep.html` exists if exam material was found (see `11-exam-prep.md` §12 for its own checklist)
- [ ] `interactive_quiz.html` exists
- [ ] All four stylesheets exist: `styles/base.css`, `styles/layout.css`, `styles/components.css`, `styles/quiz.css`
- [ ] `js/nav.js` exists, includes ALL chapters in its `topics` array (+ examprep + quiz entries)
- [ ] `js/quiz-loader.js` exists and is the unmodified copy from templates
- [ ] `data/questions.js` exists and has data for every chapter (+ `examprep` if the page exists)

Verify with:
```bash
ls -la *.html styles/ js/ data/
```

---

## B. Per-chapter checks

For EACH chapter HTML file:

- [ ] `<!DOCTYPE html>` declared
- [ ] Title in `<head>` describes the chapter
- [ ] Font link + base.css/layout.css/components.css links in `<head>` (root-relative paths)
- [ ] Chapter accent color set in `<style>` block (hero gradient)
- [ ] Syntax highlight classes (`.kw`, `.fn`, ...) defined in `<style>` if code is used
- [ ] `<div id="site-nav"></div>` at start of `<body>`
- [ ] Hero, TOC, wrap+sections, footer all present
- [ ] Every `<section>` has a unique `id`
- [ ] Every `<section>` ends with `<div class="section-quiz" data-topic="topicN" data-section="<id>"></div>`
- [ ] TOC has one `<a>` per section, all hrefs resolve
- [ ] No unclosed tags (validate with online HTML validator or `Read` the file)

---

## C. Content depth checks

- [ ] Each section is at least 30 lines of HTML (rule of thumb)
- [ ] Code blocks use `.cb` with syntax classes (no plain `<pre>`)
- [ ] At least one `.tip`, `.ibox`, `.wbox`, `.rbox`, or `.gbox` per chapter
- [ ] At least one `.vtbl` table per chapter (for comparison content)
- [ ] At least one SVG diagram or structured CSS shape per chapter (for visual concepts)
- [ ] Strong terms styled with accent colors on first introduction

---

## D. Quiz checks

For EACH chapter:

- [ ] In `data/questions.js`: `window.quizData["topicN"]` exists
- [ ] For each section in that chapter, a sub-entry in `questions.js` exists with same key
- [ ] Each section quiz has 1–3 questions
- [ ] Every option has `text`, `correct`, and `explanation` fields
- [ ] Exactly ONE option per question has `correct: true`
- [ ] No empty `explanation` strings
- [ ] No section in HTML missing from questions.js (would cause console warning)
- [ ] No question in questions.js without a matching section (orphan data)

Verify by opening a chapter in browser, scrolling to bottom of a section — quiz should appear with "Δες απάντηση" buttons.

---

## E. Navigation checks

- [ ] `js/nav.js` `topics` array has correct path for each chapter
- [ ] `js/nav.js` `topics` array has correct title (matches `<h1>` in chapter)
- [ ] `js/nav.js` `topics` array has unique `id` per chapter
- [ ] Clicking nav links in browser jumps to correct chapter
- [ ] `index.html` topic-card hrefs match actual chapter filenames

---

## F. Cross-reference checks

- [ ] References to other chapters use correct relative URLs (e.g. `topic3_io_signals.html#read-write`)
- [ ] No broken anchor links within a chapter (TOC → sections)
- [ ] No broken anchor links across chapters

---

## G. Visual / rendering checks

Open in browser (or use Preview tool):

- [ ] Hero shows correctly with gradient
- [ ] TOC is sticky and readable
- [ ] Sections have proper spacing (not cramped)
- [ ] Code blocks have horizontal scrollbar if overflow (not wrap-broken)
- [ ] Tables render with borders, alternating-row colors if applicable
- [ ] Quiz buttons toggle answers on click
- [ ] Page is readable at mobile width (375px)
- [ ] No console errors in browser DevTools

---

## H. Interactive quiz check

- [ ] `interactive_quiz.html` loads
- [ ] Shows questions from ALL chapters (not just one)
- [ ] Radio buttons are selectable
- [ ] Submit button calculates score
- [ ] Score shows total / correct / wrong
- [ ] Each question's correct answer is highlightable after submit

---

## I. Exam prep checks (if exam material exists)

- [ ] `exam_prep.html` covers: format/strategy, theory-flash, one solved section per
      exercise family, trace drills, assignments bridge
- [ ] NO dated/attributed exam references anywhere (grep for years, "εξέταση 20",
      semester names, percentage weights in statement labels)
- [ ] NO references to the student's specific assignment code / file / function names
- [ ] Trace drill toggles work (unique `tq*` ids)
- [ ] `examprep` quiz data present; no console warnings on the page
- [ ] 🎯 Exam Focus boxes exist in the mapped chapter sections; their links resolve to
      real `exam_prep.html#anchor` targets
- [ ] `_build/examprep_fidelity.md` fully ticked

---

## J. Cleanup

- [ ] No template placeholder strings left (e.g. `"REPLACE_ME"`, `"TODO"`)
- [ ] No `console.log` statements in shipped JS (unless intentional debugging)
- [ ] No leftover Lorem Ipsum text
- [ ] No commented-out `<!-- -->` blocks larger than 5 lines (clean up dead HTML)
- [ ] `webnotes-skill/` directory is intact (not modified during build) — kept for re-runs

---

## K. Summary message to user

Final user-facing message must include:

- [ ] List of chapter files created (with line counts if helpful)
- [ ] Total section count
- [ ] Total quiz question count
- [ ] How to preview (`npx serve .` or local file open)
- [ ] Known gaps / TODOs (be honest — don't claim completeness if not true)
- [ ] Suggestions for next steps (e.g. "you might want to add a chapter on X")

Example:
```
✅ Built Algorithms course webnotes:
   - 6 chapter pages: topic1_bigo.html ... topic6_dp.html
   - 78 sections total
   - 142 quiz questions
   - Shared assets: styles/base.css, js/nav.js, js/quiz-loader.js, data/questions.js

🚀 Preview: cd into this dir and run `npx serve .`, then open http://localhost:3000

📝 Known gaps:
   - Topic 4 (Greedy) is lighter than others because the source PDF was incomplete
     (only 12 pages vs 50+ for other topics).
   - I added 3 worked examples beyond the source material for Topic 5 (DP) since
     the source only had 1.

💡 Suggested next steps:
   - You might want to add a "Practice Problems" chapter with curated exercises.
   - The MathJax CDN load takes ~500ms — consider self-hosting if studying offline.
```

---

## Common failure modes (last-minute scan)

| Symptom | Likely cause |
|---|---|
| Quizzes show "Δες απάντηση" but no question | section's `data-topic` / `data-section` doesn't match key in questions.js |
| Nav bar empty | nav.js didn't run; check `<script src="js/nav.js" defer>` |
| Code blocks look like plain text | missing syntax highlighting `<style>` block in chapter, or wrong class names |
| Hero looks wrong (no gradient) | `<style>` block forgot the `.hero` override |
| Page has no styling | `<link rel="stylesheet" href="styles/base.css">` path wrong, or layout/components.css missing |
| MathJax not rendering | script tags out of order or `\(`/`\)` not escaped properly in HTML |

If you hit any of these, debug then re-check this list.

---

You're done. Ship.

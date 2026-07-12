# Webnotes build conventions (always apply)

- **State first**: read `_build/STATE.md` before acting; update it after every
  meaningful action (outline done, HTML done, review done). It is the only handoff
  between sessions.
- **Output location**: everything generated goes to the course workspace root
  (`topicN_*.html` next to `index.html`); `_build/` holds only state, outlines, and
  fidelity checklists. Never write inside the webnotes-builder plugin folder.
- **Content fidelity**: never silently omit source content. Every chapter needs a
  fidelity checklist before its HTML, and a reviewer pass before it is marked done.
  In PASS goal mode, out-of-syllabus omissions are listed visibly under
  `## Skipped (out of syllabus)`.
- **One work item per session**: outline OR html OR quiz OR review — don't batch
  chapters; quality collapses with context bloat.
- **No ASCII-art diagrams**: use CSS/HTML layouts (grid, flexbox, borders) or
  restrained inline SVG with theme tokens.
- **Quizzes are mandatory**: every `<section>` ends with a `.section-quiz` placeholder
  and matching data in `data/questions.js`.
- **Exam attribution**: `.exam-badge` dates/frequencies only when STATE.md says
  `Attribution: dated` AND the claim is backed by `_build/exam_patterns.md`. Never
  reference a student's specific assignment implementation.
- **Verify before done**: run `node <plugin-root>/scripts/qa-site.mjs` from the
  workspace root when Node is available; fix every ERROR before reporting completion.

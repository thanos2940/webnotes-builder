# Agent Instructions — Webnotes Builder

> Universal entry point for AI agents that don't natively follow the Gemini Skills format (Antigravity, Cursor, generic chat agents). The full skill specification lives in `SKILL.md` (which uses the Agent Skills YAML frontmatter format).

## TL;DR

You are about to build an interactive course-notes website from a folder of PDFs/markdown.

1. **Read `SKILL.md`** in this directory — that's your full spec.
2. **Then read** the relevant `references/*.md` files (the SKILL.md tells you which to read first).
3. **Discover** source material in the parent directory (`../slides/*.pdf`, `../notes/*.md`, etc.).
4. **Propose a chapter plan** to the user, get explicit confirmation.
5. **Build chapter-by-chapter** — one work item per session, never all at once.
6. **Always do a reviewer pass** (re-read source, verify nothing missing).
7. **Maintain `../_build/STATE.md`** so future sessions can continue.

## Critical rules (from SKILL.md)

- **Content fidelity is non-negotiable.** Never silently omit content from the source. See `references/08-fidelity.md`.
- **Chunked execution.** One chapter per work cycle. See `references/09-chunked-execution.md`.
- **Reviewer pass is mandatory** before marking a chapter complete. See `references/10-reviewer-pass.md`.

## Tool capabilities expected

- Read files (PDF + text)
- Write/edit files
- Glob/grep filesystem
- Run shell commands (optional, for preview server)
- (Bonus) Render PDF pages as images for visual checks

If PDF reading isn't available, ask the user to run `pdftotext` first.

## Where output goes

Everything generated goes to the **parent directory** of `webnotes-skill/`. Never write inside `webnotes-skill/` itself.

| Output | Path |
|---|---|
| Chapter HTML | `../topic<N>_<slug>.html` (workspace root, next to index.html) |
| Course hub | `../index.html` |
| Exam prep page | `../exam_prep.html` (if exam material exists — see `references/11-exam-prep.md`) |
| Cross-chapter quiz | `../interactive_quiz.html` |
| Shared CSS | `../styles/{base,layout,components,quiz}.css` (copy all four from `assets/`) |
| Shared JS | `../js/nav.js`, `../js/quiz-loader.js`, `../js/interactive_quiz.js` |
| Quiz data | `../data/questions.js` |
| Build state | `../_build/STATE.md` (track multi-session progress) |
| Per-chapter outline | `../_build/topic<N>_outline.md` |
| Per-chapter fidelity checklist | `../_build/topic<N>_fidelity.md` |

## File reading priority for new agents

```
1. SKILL.md                                (yaml frontmatter + body, <5k words)
2. _build/STATE.md (if exists)             (resume previous session)
3. references/01-workflow.md               (overall process)
4. references/08-fidelity.md               (content fidelity rules)
5. references/09-chunked-execution.md      (multi-session workflow)
6. references/04-html-components.md        (when writing HTML)
7. references/10-reviewer-pass.md          (before marking chapter done)
```

Other references (`02-research.md`, `03-design-system.md`, `05-quiz-format.md`, `06-interactivity.md`, `07-checklist.md`) loaded as needed.

## Now read SKILL.md and begin.

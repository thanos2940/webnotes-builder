# Webnotes Builder Extension

This Gemini CLI extension converts course material (PDFs, markdown) into an interactive HTML study site, chapter-by-chapter, with per-section quizzes, content fidelity guarantees, and a chunked multi-session workflow.

## When the user invokes you

If the user asks anything like:
- "Build course notes" / "Create webnotes" / "Generate study guide"
- "Φτιάξε σημειώσεις από τα slides"
- "Make interactive notes from these PDFs"
- "Add exam prep" / "Φτιάξε σελίδα για την εξεταστική"
- "Upgrade/enhance my existing webnotes site"
- Or invokes any `/webnotes-*` slash command

…then activate the `webnotes-builder` skill.

The skill has TWO modes, decided in Discovery:
- **CREATE** — no webnotes exist yet: full pipeline (scaffold → chapters → exam prep → QA)
- **ENHANCE** — `topic*.html`/`index.html` already exist: audit the site against the
  skill's standard and upgrade the gaps in place (never regress existing content)

## Critical reading order

Before generating ANY HTML, read these files (in this order):

1. **`skills/webnotes-builder/SKILL.md`** — the full skill specification
2. **`skills/webnotes-builder/references/08-fidelity.md`** — content fidelity rules (MANDATORY)
3. **`skills/webnotes-builder/references/09-chunked-execution.md`** — multi-session workflow
4. **`skills/webnotes-builder/references/01-workflow.md`** — phase-by-phase process
5. Other references as needed (HTML components, quiz format, design system)

## Core principles (always apply)

1. **Content fidelity** — every concept, operator, warning, example, definition from the source MUST appear in the output. Never silently omit. Build a fidelity checklist before writing HTML.
2. **One work item per session** — outline → HTML → quiz → reviewer pass, each in a separate session. Track state in `_build/STATE.md`.
3. **Reviewer pass is mandatory** — after drafting a chapter, re-read the source PDF and verify every fidelity item is covered. Patch missing items.
4. **Exam prep when material exists** — past exams / assignments / exercises feed `exam_prep.html` (solved exercise families, theory-flash, trace drills, assignments bridge) plus 🎯 Exam Focus boxes in the chapters. See `skills/webnotes-builder/references/11-exam-prep.md`. Two golden rules there: present everything as GENERIC exercises (no "this fell in June 2025"), and never reference the student's specific implementation — patterns + your own annotated sample code only.
5. **Confirm before generating** — discovery phase produces a plan; wait for user approval before scaffolding.
6. **Output goes to the parent directory** (the user's course folder), NOT inside this extension folder. Chapter pages live at the workspace ROOT next to index.html; `_build/` holds only state/outlines.

## Slash commands available

- `/webnotes-start` — kicks off discovery, proposes chapter plan
- `/webnotes-resume` — read `_build/STATE.md`, continue where left off
- `/webnotes-status` — show current build state
- `/webnotes-outline <N>` — outline chapter N (read source, build fidelity checklist)
- `/webnotes-html <N>` — write HTML for chapter N from outline
- `/webnotes-quiz <N>` — write quiz questions for chapter N
- `/webnotes-review <N>` — reviewer pass for chapter N (re-read source, fill gaps)
- `/webnotes-examprep` — build/enhance exam_prep.html from past exams + assignments
- `/webnotes-checklist` — run final QA across all chapters

Each command's prompt template is in `commands/*.toml` and explicitly instructs you which files to read.

## State file

Always maintain `<workspace>/_build/STATE.md`. Read it at session start. Update it after every meaningful action. It's the only way future sessions can continue from where you left off.

## DO NOT

- Build all chapters in one tool-call run (quality drops)
- Skip the reviewer pass
- "Summarize" content that should be reproduced fully
- Generate files inside the `webnotes-builder/` extension folder — output goes to the workspace root
- Forget to update STATE.md

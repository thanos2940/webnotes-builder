# Changelog

## 2.0.0 — 2026-07-12

### Goal modes & exam mining
- **PASS / MASTER goal modes** — Discovery now asks whether the student wants to just
  pass (exam-pattern-driven build) or master the whole course (full-fidelity coverage).
  Recorded in STATE.md; drives planning, depth, hub layout, quiz scope, and fidelity scope.
- **Exam mining** (`references/12-exam-mining.md`, `/webnotes-mine`) — past papers →
  question inventory → recurring-question families → family × period frequency matrix →
  typical-paper blueprint → Tier 1/2/3 pass plan with explicit arithmetic → syllabus
  cross-check. Output: `_build/exam_patterns.md`, consumed by every later phase.
- **Attribution setting** (`dated` | `generic`) — dated recurrence badges
  («πέφτει σίγουρα», «2023·Σεπτ») are now a supported, evidence-backed option; the old
  blanket "no dated references" rule applies only in `generic` mode.

### New page standards (battle-tested on a Data Mining course)
- **«Η Ουσία σε 60″» essence opener** on every chapter page (what-it-does, mental
  model, works/fails-when, «για τις εξετάσεις θυμήσου») — mandatory in PASS mode.
- **PASS-mode exam-prep template**: strategy → primer → core-facts table →
  recipes/mnemonics → model answers (`.qa-card` with «Για Αρχάριους» side-notes
  column) → recurring proofs → skip-triage. New `assets/exam-prep.html` skeleton.
- **Cram Sheet spec** (`11-exam-prep.md` §8c) — printable one-pager with print CSS.
- Hub v2: exam-first full-width hero card («ΞΕΚΙΝΑ ΑΠΟ ΕΔΩ»), grid-group module
  dividers, `.exam-badge` component.
- Quiz **progress tracking** (localStorage): per-question results persist, a
  «🔁 Επανάλαβε τα λάθη σου» review mode on the quiz start screen, and per-chapter
  accuracy tags on the hub cards.
- Generalized `window.quizSyllabus` whitelist filter for the cross-chapter quiz.

### Multi-platform
- **Antigravity plugin** (root `plugin.json` + `rules/`) — install with
  `agy plugin install`; Antigravity CLI replaced Gemini CLI on 2026-06-18.
- **Claude Code plugin** (`.claude-plugin/plugin.json` + `marketplace.json`,
  markdown commands, subagents).
- **Role subagents** in `agents/` (exam-miner, chapter-writer, reviewer) +
  orchestration guide (`references/13-orchestration.md`).
- **Canonical workflows** in `workflows/` — the single source of truth for the 10
  phases; `commands/*.md` (Claude) and `commands/*.toml` (legacy Gemini) are thin
  wrappers around them.
- `PROMPT.md` universal bootstrap for local LLMs; per-platform guide rewritten.

### Tooling
- `scripts/qa-site.mjs` — mechanical site QA: quiz data parses, placeholders ↔ data in
  both directions, exactly-one-correct-option check, broken anchors/links, nav paths,
  duplicate ids. Wired into the QUIZ/EXAMPREP/CHECKLIST workflows.
- `scripts/make-offline.mjs` — vendors MathJax (self-contained SVG bundle) and Google
  Fonts into `vendor/` and rewrites pages, so the site works with no internet.
- `scripts/new-state.sh` updated for goal mode / attribution / syllabus scope.
- Removed the compromised polyfill.io reference from the MathJax instructions.

## 1.2.0 — 2026-06

- Exam-prep page (solved exercise families, theory-flash, trace drills, assignments
  bridge), Exam Focus boxes, flashcards workspace, ENHANCE mode, fidelity protocol,
  chunked execution, reviewer pass. Gemini CLI extension + standalone Agent Skill.

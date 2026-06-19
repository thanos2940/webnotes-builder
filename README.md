# 📚 Webnotes Builder — Gemini CLI Extension

A **Gemini CLI extension** (and standalone Agent Skill) that converts a folder of course material (PDF slides, markdown, past exams, assignments) into a beautifully designed, interactive HTML study site — chapter-by-chapter, with per-section quizzes, CSS diagrams, annotated code, an **exam-prep page** (solved exam-style exercises, theory flash-cards, "what does this print?" drills), and a cross-chapter test mode.

It also works in **ENHANCE mode**: point it at an existing webnotes site and it audits the pages against this standard (component usage, depth vs source, quizzes, exam prep, responsive rendering) and upgrades the gaps in place.

Works as:
- 🟢 **Native Gemini CLI extension** with bundled slash commands + auto-loaded context
- 🟢 **Standalone Agent Skill** for Claude Code/Desktop, Antigravity, Cursor, OpenAI Assistants, any agent that can read files

Built on the [Agent Skills](https://agentskills.io) open standard.

---

## ⚠️ This is a multi-session build

Building good webnotes for a real course takes **15–30 hours of agent work**. It will not happen in one conversation. The extension uses a **chunked execution model**: one work item per session, with state persisted in `_build/STATE.md`.

Expect **~5 sessions per chapter**:
1. Outline (read PDF, build fidelity checklist)
2. HTML draft
3. Quiz questions
4. **Reviewer pass** (re-read source, verify nothing missing)
5. (Optional) Cross-validation

For a 6-chapter course: ~30 sessions spread over days. The slash commands tell you exactly what to ask next each time.

**Content fidelity is the highest priority.** If your slides mention 23 Prolog operators, your output documents all 23 — never silently summarized down to "the main ones."

---

## 🚀 Install (Gemini CLI — recommended)

### Option 1 — Install from a public repo

```bash
gemini extensions install https://github.com/thanos2940/webnotes-builder
gemini extensions list  # verify
```

### Option 2 — Link a local copy (for development or single-user use)

```bash
git clone https://github.com/thanos2940/webnotes-builder webnotes-builder
cd webnotes-builder
gemini extensions link .
```

### Option 3 — Manual install

```bash
mkdir -p ~/.gemini/extensions/
cp -r ./webnotes-builder ~/.gemini/extensions/
```

### Verify

```bash
gemini
> /extensions list   # shows "webnotes-builder" v1.2.0
> /skills list       # shows "webnotes-builder" skill
```

---

## 🧭 Slash commands

| Command | What it does |
|---|---|
| `/webnotes-start` | Discover sources, classify subject, propose chapter plan |
| `/webnotes-resume` | Read `_build/STATE.md`, continue next pending action |
| `/webnotes-status` | Report build state (read-only) |
| `/webnotes-outline <N>` | Outline chapter N (PDF → outline + fidelity checklist) |
| `/webnotes-html <N>` | Write HTML page for chapter N |
| `/webnotes-quiz <N>` | Write per-section quizzes for chapter N |
| `/webnotes-review <N>` | **Mandatory reviewer pass** — verify against source |
| `/webnotes-examprep` | Build/enhance `exam_prep.html` from past exams + assignments |
| `/webnotes-checklist` | Final QA across the site |

### Typical sequence

```
/webnotes-start              (confirm chapter plan)
/webnotes-resume             (scaffold shared assets)
/webnotes-outline 1
/webnotes-html 1
/webnotes-quiz 1
/webnotes-review 1
/webnotes-outline 2
...
/webnotes-examprep            (if you have past exams / assignments)
/webnotes-checklist
```

Each command tells you what to run next — no memorizing.

---

## 📂 Extension layout

```
webnotes-builder/
├── gemini-extension.json                ← manifest
├── GEMINI.md                            ← auto-loaded context primer
├── README.md
├── AGENT_INTEGRATION.md                 ← non-Gemini agent setup
├── commands/                            ← Gemini slash commands (9 TOML files)
│   ├── webnotes-start.toml
│   ├── webnotes-resume.toml
│   ├── webnotes-status.toml
│   ├── webnotes-outline.toml
│   ├── webnotes-html.toml
│   ├── webnotes-quiz.toml
│   ├── webnotes-review.toml
│   ├── webnotes-examprep.toml           ⭐ exam-prep page
│   └── webnotes-checklist.toml
├── skills/
│   └── webnotes-builder/                ← Agent Skill (works standalone)
│       ├── SKILL.md                     ← YAML frontmatter + body
│       ├── AGENTS.md
│       ├── references/                  ← 11 docs (progressive disclosure)
│       │   ├── 01-workflow.md
│       │   ├── 02-research.md
│       │   ├── 03-design-system.md
│       │   ├── 04-html-components.md
│       │   ├── 05-quiz-format.md
│       │   ├── 06-interactivity.md
│       │   ├── 07-checklist.md
│       │   ├── 08-fidelity.md           ⭐ no silent omissions
│       │   ├── 09-chunked-execution.md  ⭐ multi-session workflow
│       │   ├── 10-reviewer-pass.md      ⭐ verification loop
│       │   └── 11-exam-prep.md          ⭐ exam-prep page + Exam Focus boxes
│       └── assets/                      ← templates copied to user workspace
│           ├── chapter.html
│           ├── index.html
│           ├── interactive-quiz.html
│           ├── styles/{base,layout,components,quiz}.css
│           ├── js/{nav,quiz-loader,interactive_quiz}.js
│           └── data/questions.js
└── scripts/                             ← helper shell scripts
    ├── new-state.sh
    └── verify-fidelity.sh
```

---

## 🎯 Output in your course directory

```
~/uni/algorithms-course/
├── slides/                              ← (untouched) source PDFs
├── exams/ · assignments/                ← (untouched) exam material, if any
├── _build/                              ← agent's working state ONLY
│   ├── STATE.md                         ← progress tracker
│   ├── topic1_outline.md
│   ├── topic1_fidelity.md
│   ├── examprep_outline.md
│   └── ...
├── index.html                           ← course hub
├── topic1_bigo.html                     ← chapters (at the root, next to index.html)
├── topic2_recursion.html
├── ...
├── exam_prep.html                       ← exam prep (if exam material exists)
├── interactive_quiz.html                ← cross-chapter test
├── styles/{base,layout,components,quiz}.css
├── js/{nav,quiz-loader,interactive_quiz}.js
└── data/questions.js
```

Preview: `npx serve .` → http://localhost:3000

---

## ✨ Per-chapter contents

- **Hero** — title, summary, keyword chips
- **Sticky TOC** — section navigation
- **8–14 sections**, each with:
  - Prose explanation (your language)
  - Annotated, syntax-highlighted code/pseudocode
  - ASCII or SVG diagrams
  - Tip / Warning / Mnemonic / Anti-pattern boxes
  - Comparison tables, struct visualizations
  - **Per-section quiz**
- **Unique color theme** per chapter
- **Dark-mode, mobile responsive**

Cross-chapter quiz aggregates all questions into a graded test.

---

## 🎯 Exam prep (new in 1.2)

When the course folder contains past exams (`exams/`, photos/PDFs of papers), assignments, or exercise sets, the build includes an **exam-prep page**:

- **Δομή εξέτασης** — typical structure + time strategy
- **Θεωρία-Flash** — every recurring short-answer theory pair, with ready 2-line answers
- **One solved section per exercise family** — full statement → annotated solution → "τα σημεία που βαθμολογούνται" → a variant for generalization
- **«Τι θα τυπώσει;» drills** — reveal-answer trace questions
- **Assignments bridge** — maps each exercise family to the *idea* the student already implemented in the assignments
- **🎯 Exam Focus boxes** inside the chapter pages, linking to the matching solved exercise

Two golden rules (enforced by the QA checklist):
1. Everything is presented as **generic exercises** — never "this fell in June 2025".
2. The bridge teaches **patterns**, never one student's specific implementation or file names.

Full spec: `skills/webnotes-builder/references/11-exam-prep.md`.

---

## 🔬 Suitable subjects

| Subject | Components emphasized |
|---|---|
| Operating Systems / Systems Programming | Code blocks, struct diagrams, race-condition timelines |
| Algorithms / Data Structures | Pseudocode, complexity tables, execution traces |
| Mathematics | MathJax formulas, theorem boxes, SVG plots |
| **Logic Programming (Prolog, Datalog)** | Operator tables, unification trees, resolution |
| Networking | Protocol stacks, packet formats, sequence diagrams |
| Databases | ER diagrams, query plans, transaction sequences |
| Probability / Statistics | Distribution plots, formulas |
| Languages / Linguistics | Vocabulary, grammar, conjugation tables |

---

## 🛡️ Content fidelity (the killer feature)

A common AI failure mode: silent omission. Agent decides "this operator is rare, skip" — student misses exam content.

This extension prevents that via:

1. **Mandatory fidelity checklist** — `_build/topicN_fidelity.md` lists every concept, operator, warning, example, definition from source — BEFORE writing HTML.
2. **Item-by-item tracking** — HTML writing ticks each item.
3. **Reviewer pass** — re-reads source PDF, grep-checks HTML, patches missing items.
4. **Coverage stats** — "23/23 operators documented ✅" reported back to you.

Full protocol: `skills/webnotes-builder/references/08-fidelity.md` and `references/10-reviewer-pass.md`.

---

## 🤝 Using without Gemini CLI

The extension is also a valid standalone Agent Skill:

```bash
cp -r webnotes-builder my-course/
cd my-course
# Then in your agent (Claude / Cursor / etc):
"Read webnotes-builder/skills/webnotes-builder/SKILL.md and build the course notes."
```

Per-platform setup: `AGENT_INTEGRATION.md`.

---

## 📖 Example session — Prolog course

```text
$ cd ~/uni/prolog-course/
$ ls slides/
01-intro.pdf  02-unification.pdf  03-lists.pdf  04-operators.pdf  05-cut.pdf

$ gemini
> /webnotes-start
[agent runs discovery → proposes 5-chapter plan]
> Confirmed. Proceed.

[scaffolding done, session ends with "next: /webnotes-outline 1"]

> /webnotes-outline 1
[reads slides/01-intro.pdf → writes outline + 23-item fidelity checklist]

> /webnotes-html 1
[writes topic1_intro.html, ticks 23/23 items]

> /webnotes-quiz 1
[adds quiz data for chapter 1]

> /webnotes-review 1
[re-reads PDF, finds 2 missing items, patches HTML]

> /webnotes-outline 2
... [repeat for chapters 2-5]

> /webnotes-checklist
[final QA, reports coverage stats]

$ npx serve .
# open http://localhost:3000 — done!
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| Agent can't read PDFs | `pdftotext slides/*.pdf` first |
| Generated pages look shallow | "follow `references/08-fidelity.md` strictly" |
| No styling | Confirm `styles/base.css` copied to course root |
| Quizzes missing | `data/questions.js` must load before `js/quiz-loader.js` |
| Agent forgets state | `/webnotes-resume` |
| Want to redo chapter N | Edit STATE.md, delete `_build/topicN_*` + `topicN_*.html` |
| Extension not recognized | `gemini extensions list`; re-install if missing |

---

## 📜 License

MIT. Originally built for the K24 Systems Programming course (NKUA), generalized for any technical subject.

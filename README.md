# 📚 Webnotes Builder

Turns a folder of course material (PDF slides, markdown, txt, images, **past exams**,
assignments) into a beautifully designed, interactive HTML study site — built so a
student can study **from the site instead of the professor's notes**.

Works natively as:
- 🟣 **Claude Code plugin** — slash commands + role subagents (`.claude-plugin/`)
- 🟢 **Gemini CLI extension** — slash commands + auto-loaded context (`gemini-extension.json`)
- 🔵 **Standalone Agent Skill** — Antigravity, Cursor, Claude Desktop, OpenAI Assistants
  (`skills/webnotes-builder/SKILL.md`), or **any local LLM** via `PROMPT.md`

Built on the [Agent Skills](https://agentskills.io) open standard.

---

## 🎯 Two goal modes (asked at Discovery)

| | **PASS** — «θέλω απλά να περάσω» | **MASTER** — κατανόησε όλη την ύλη |
|---|---|---|
| Drives the build | **Exam mining**: past papers → recurring-question families → frequency matrix → Tier 1/2/3 pass plan | The source material itself |
| Coverage | In-syllabus chapters only; zero-exam-presence chapters *hidden* (never deleted) | Every source file, full fidelity |
| Page style | Intuition-first: «Η Ουσία σε 60″» opener, visuals/metaphors over formulas | Complete, beginner-friendly explanation of everything |
| Centerpiece | `exam_prep.html`: model answers per recurring question, recurring proofs, «τι να αφήσεις τελευταίο» triage — first, full-width hub card | The chapter pages; exam prep as a standard card |
| Result | Pass the exam after ~1 day of studying one page | A central site explaining the entire course simply |

Both modes keep the same fidelity discipline: nothing is *silently* dropped —
PASS-mode exclusions are listed visibly as out-of-syllabus.

---

## ⛏️ Exam mining (the engine behind PASS mode)

Before any chapter is planned, past exams are analyzed as data
(`references/12-exam-mining.md` → `_build/exam_patterns.md`):

1. **Question inventory** — every question from every paper (photos included)
2. **Family clustering** — same skill across different wordings/periods
3. **Frequency matrix** — family × exam period
4. **Blueprint** — what the typical paper looks like
5. **Pass-plan tiers** — CORE / FREQUENT / RARE, with explicit arithmetic:
   *«τα Tier-1 θέματα αθροίζουν ~65 μονάδες → μαθαίνοντάς τα τέλεια περνάς με περιθώριο»*
6. **Syllabus cross-check** — which chapters the exam never touches

Attribution is a user choice: **dated** badges («πέφτει σίγουρα», «2023·Σεπτ» — great
motivation for personal study) or **generic** exercises (for sites you'll share).

---

## ⚠️ This is a multi-session build

Building good webnotes for a real course takes **15–30 hours of agent work**, chunked
into one work item per session with state persisted in `_build/STATE.md`. Expect
**~5 sessions per chapter**: Outline → HTML → Quiz → **Reviewer pass** → (optional)
cross-validation. Every command tells you exactly what to ask next.

**Content fidelity is the highest priority.** If your slides mention 23 Prolog
operators, the output documents all 23 — never silently summarized down to "the main ones".

---

## 🚀 Install

### Claude Code (plugin)

```bash
claude
> /plugin marketplace add thanos2940/webnotes-builder
> /plugin install webnotes-builder
# or for a local clone:  claude --plugin-dir ./webnotes-builder
```

### Gemini CLI (extension)

```bash
gemini extensions install https://github.com/thanos2940/webnotes-builder
# or link a local clone:  cd webnotes-builder && gemini extensions link .
```

### Anything else

Drop the `webnotes-builder/` folder into your course directory and point the agent at
`webnotes-builder/skills/webnotes-builder/SKILL.md` — or paste the bootstrap from
`PROMPT.md` (local LLMs). Full per-platform guide: [AGENT_INTEGRATION.md](AGENT_INTEGRATION.md).

---

## 🧭 Slash commands (Claude Code `.md` + Gemini `.toml`, same names)

| Command | What it does |
|---|---|
| `/webnotes-start` | Discover sources, ask **goal mode**, propose plan |
| `/webnotes-mine` | ⛏️ Mine past exams → `_build/exam_patterns.md` (run before the plan) |
| `/webnotes-resume` | Read `_build/STATE.md`, continue next pending action |
| `/webnotes-status` | Report build state (read-only) |
| `/webnotes-outline <N>` | Outline chapter N (source → outline + fidelity checklist) |
| `/webnotes-html <N>` | Write HTML page for chapter N (opens with «Η Ουσία σε 60″») |
| `/webnotes-quiz <N>` | Write per-section quizzes for chapter N |
| `/webnotes-review <N>` | **Mandatory reviewer pass** — verify against source |
| `/webnotes-examprep` | Build/enhance `exam_prep.html` from the mined patterns |
| `/webnotes-checklist` | Final QA across the site |

### Typical sequence

```
/webnotes-start          (goal mode + discovery)
/webnotes-mine           (if past exams exist — confirm tiers & hide-list)
/webnotes-resume         (scaffold shared assets)
/webnotes-outline 1 → /webnotes-html 1 → /webnotes-quiz 1 → /webnotes-review 1
...repeat per chapter...
/webnotes-examprep
/webnotes-checklist
```

---

## 🤖 Multi-agent orchestration

Role definitions in `agents/` (registered automatically as Claude Code subagents;
paste-able role prompts everywhere else):

- **webnotes-exam-miner** — past papers → `_build/exam_patterns.md`
- **webnotes-chapter-writer** — outline → HTML + quiz (owns only its `topicN` files)
- **webnotes-reviewer** — **fresh context**, sees only source + HTML + checklist,
  patches omissions objectively

Platform mapping, parallelism and file-ownership rules:
`skills/webnotes-builder/references/13-orchestration.md`. On session-based platforms
(Gemini, chat apps) the same roles map to separate sessions — the isolation of the
reviewer is what catches omissions.

---

## 📂 Repo layout

```
webnotes-builder/
├── .claude-plugin/plugin.json           ← Claude Code plugin manifest
├── gemini-extension.json                ← Gemini CLI extension manifest
├── GEMINI.md                            ← auto-loaded context primer (Gemini)
├── PROMPT.md                            ← universal bootstrap (local LLMs / any agent)
├── AGENT_INTEGRATION.md                 ← per-platform setup
├── agents/                              ← role subagents (Claude Code + paste-able)
│   ├── webnotes-exam-miner.md
│   ├── webnotes-chapter-writer.md
│   └── webnotes-reviewer.md
├── commands/                            ← slash commands: *.md (Claude) + *.toml (Gemini)
├── skills/
│   └── webnotes-builder/
│       ├── SKILL.md                     ← the full skill spec
│       ├── AGENTS.md                    ← generic-agent entry point
│       ├── references/                  ← 13 docs (progressive disclosure)
│       │   ├── 01-workflow.md … 07-checklist.md
│       │   ├── 08-fidelity.md           ⭐ no silent omissions
│       │   ├── 09-chunked-execution.md  ⭐ multi-session workflow
│       │   ├── 10-reviewer-pass.md      ⭐ verification loop
│       │   ├── 11-exam-prep.md          ⭐ exam-prep page (PASS + MASTER templates)
│       │   ├── 12-exam-mining.md        ⭐ past-exam pattern analysis
│       │   └── 13-orchestration.md      ⭐ multi-agent roles
│       └── assets/                      ← templates copied to the course workspace
│           ├── chapter.html             (with «Η Ουσία σε 60″» opener)
│           ├── index.html               (grouped hub + exam-first hero card)
│           ├── exam-prep.html           (PASS-mode skeleton)
│           ├── interactive-quiz.html · flashcards.html
│           ├── styles/{base,layout,components,quiz}.css
│           ├── js/{nav,quiz-loader,interactive_quiz,flashcards}.js
│           └── data/{questions,flashcards}.js
└── scripts/                             ← new-state.sh · verify-fidelity.sh
```

## 🎯 Output in your course directory

```
~/uni/algorithms-course/
├── slides/ · exams/ · assignments/      ← (untouched) source material
├── _build/                              ← agent state: STATE.md, exam_patterns.md,
│                                          outlines, fidelity checklists
├── index.html                           ← course hub (PASS: exam-first hero card)
├── topic1_<slug>.html …                 ← chapter pages (root, next to index.html)
├── exam_prep.html                       ← model answers / solved families
├── interactive_quiz.html · flashcards.html
├── styles/ · js/ · data/
```

Preview: `npx serve .` → http://localhost:3000

---

## ✨ Per-chapter contents

- **«Η Ουσία σε 60″»** — intuition-first opener: what it does, the mental model,
  works-well-when vs fails-when, «για τις εξετάσεις θυμήσου»
- **Hero + sticky TOC**, 8–14 sections, each with prose, annotated code/pseudocode,
  CSS/SVG diagrams, tip/warning/mnemonic boxes, comparison tables, **per-section quiz**
- **🎯 Exam Focus boxes** linking to the matching solved exercise/model answer
- Unique accent color per chapter · dark/light themes · mobile responsive

Cross-chapter quiz aggregates all questions (PASS mode: filtered by the
`window.quizSyllabus` whitelist). Flashcards workspace aggregates theory Q&A.

---

## 🛡️ Content fidelity (the killer feature)

1. **Mandatory fidelity checklist** per chapter — every concept, operator, warning,
   example from the source, BEFORE writing HTML (PASS mode: out-of-scope items listed
   visibly as skipped).
2. **Item-by-item tracking** while writing.
3. **Reviewer pass** — a fresh context re-reads the source and patches gaps.
4. **Coverage stats** — «23/23 operators documented ✅» reported back to you.

---

## 🔬 Suitable subjects

CS/systems, algorithms, math, logic programming (Prolog), networking, databases,
probability/statistics, data mining/ML, languages — the component library adapts
(code blocks vs MathJax vs operator tables vs protocol diagrams).

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| Agent can't read PDFs | `pdftotext -layout slides/*.pdf` first (OCR photos with `tesseract`) |
| Generated pages look shallow | "follow `references/08-fidelity.md` strictly" |
| Exam prep feels generic | Run `/webnotes-mine` first — it must cite `_build/exam_patterns.md` |
| No styling | Confirm all four `styles/*.css` copied to course root |
| Quizzes missing | `data/questions.js` must load before `js/quiz-loader.js` |
| Agent forgets state | `/webnotes-resume` |
| Want to redo chapter N | Edit STATE.md, delete `_build/topicN_*` + `topicN_*.html` |

---

## 📜 License

MIT. Originally built for the K24 Systems Programming course (NKUA); the PASS mode and
exam mining were battle-tested on a Data Mining course. Generalized for any technical
subject.

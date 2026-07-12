# Agent Integration Guide

> Per-platform install/invocation. The same repo works natively as an **Antigravity
> plugin** (root `plugin.json` + `skills/` + subagents in `agents/`), a **Claude Code
> plugin** (`.claude-plugin/plugin.json` + markdown commands + subagents in `agents/`),
> a **legacy Gemini CLI extension** (`gemini-extension.json` + TOML commands — Gemini
> CLI was sunset for most users on 2026-06-18 in favor of Antigravity CLI), and a
> **standalone Agent Skill** (`skills/webnotes-builder/SKILL.md`) for Cursor, Claude
> Desktop, OpenAI Assistants, and local LLMs (`PROMPT.md`).
> Pick your section below.

---

## Antigravity CLI (`agy`) — native plugin

Antigravity CLI is Google's successor to Gemini CLI (same agent harness as
Antigravity 2.0). This repo is a valid Antigravity plugin out of the box: root
`plugin.json`, the skill at `skills/webnotes-builder/SKILL.md` (auto-discovered,
progressive disclosure), and the three role subagents in `agents/`.

### Install

```bash
# from the published repo
agy plugin install https://github.com/thanos2940/webnotes-builder.git

# or from a local clone
agy plugin install /path/to/webnotes-builder

# validate during development
agy plugin validate /path/to/webnotes-builder
```

Plugins land in `~/.gemini/antigravity-cli/plugins/webnotes-builder/`.

### Use

```bash
cd ~/uni/algorithms-course/
agy
> /skills            # confirm "webnotes-builder" is listed
> Build interactive course notes from the PDFs in this directory.
```

Phases are invoked in natural language — the skill's workflow routes them:
«ξεκίνα discovery», «κάνε exam mining», «γράψε το HTML του κεφαλαίου 3»,
«τρέξε reviewer pass στο κεφάλαιο 3». For the reviewer, use Antigravity's native
subagent delegation so it runs in an isolated context:

```
> In a subagent: use webnotes-reviewer to review chapter 3
  (source: slides/ch3.pdf, page: topic3_trees.html, checklist: _build/topic3_fidelity.md)
```

The `/agents` panel shows running subagents. Note: the `commands/*.toml` files in this
repo are legacy Gemini CLI commands — `agy plugin import gemini` converts old Gemini
extensions if you had one installed, but the native path above doesn't need them.

### Antigravity IDE / workspace-scoped install (no plugin)

Antigravity also reads workspace-level skills and context files directly:

```bash
# workspace-scoped skill
mkdir -p .agents/skills/
cp -r webnotes-builder/skills/webnotes-builder .agents/skills/

# align agent behavior: put the entry-point instructions at the workspace root
cp webnotes-builder/skills/webnotes-builder/AGENTS.md AGENTS.md
```

Antigravity reads `AGENTS.md` (and `GEMINI.md`) from the workspace root as context.

---

## Claude Code (native plugin — recommended for Claude)

The repo is a valid Claude Code plugin: `.claude-plugin/plugin.json`, markdown slash
commands in `commands/*.md` (the `.toml` files alongside them are for Gemini and are
ignored), the skill in `skills/webnotes-builder/`, and three role subagents in
`agents/` (`webnotes-exam-miner`, `webnotes-chapter-writer`, `webnotes-reviewer`).

### Install from a marketplace/repo

```bash
claude
> /plugin marketplace add thanos2940/webnotes-builder
> /plugin install webnotes-builder
```

### Install from a local clone (development)

```bash
claude --plugin-dir /path/to/webnotes-builder
# or add it under "plugins" in your settings for persistence
```

### Use

```bash
cd ~/uni/algorithms-course/
claude
> /webnotes-start          # discovery + goal-mode question
> /webnotes-mine           # if past exams exist
> /webnotes-outline 1  →  /webnotes-html 1  →  /webnotes-quiz 1  →  /webnotes-review 1
> /webnotes-examprep  →  /webnotes-checklist
```

The subagents let the main conversation orchestrate: the reviewer runs as a fresh
context automatically (see `skills/webnotes-builder/references/13-orchestration.md`).

---

## Gemini CLI (legacy extension)

> ⚠️ Gemini CLI stopped serving requests for Google AI Pro/Ultra and free users on
> **2026-06-18** — use Antigravity CLI (above) instead. Gemini CLI remains supported
> only via Gemini Code Assist Standard/Enterprise licenses. This repo stays a valid
> Gemini CLI extension for those users (`gemini-extension.json` + `commands/*.toml`
> + auto-loaded `GEMINI.md`).

```bash
gemini extensions install https://github.com/thanos2940/webnotes-builder
# or, for development:  cd webnotes-builder && gemini extensions link .

cd ~/uni/algorithms-course/
gemini
> /webnotes-start        # or just describe your goal — skill matching is automatic
```

If you're migrating an old Gemini CLI setup to Antigravity: `agy plugin import gemini`
(commands become skills; custom themes don't migrate).

---

## Claude Code (skill-only, without the plugin)

The inner skill at `webnotes-builder/skills/webnotes-builder/` is a valid Agent Skill.

### Option A — Project-scoped

Copy just the inner skill into your project's `.claude/skills/`:

```bash
mkdir -p .claude/skills/
cp -r webnotes-builder/skills/webnotes-builder .claude/skills/
```

Then in Claude Code:
```
> Use the webnotes-builder skill on this folder.
```

### Option B — User-scoped (multi-course)

```bash
mkdir -p ~/.claude/skills/
cp -r webnotes-builder/skills/webnotes-builder ~/.claude/skills/
```

### Option C — Drop the whole extension in the workspace

Just place the entire `webnotes-builder/` folder in your course directory. Claude Code will read it when asked:

```bash
cd ~/uni/algorithms-course/
# Place webnotes-builder/ here

claude
> Read webnotes-builder/skills/webnotes-builder/SKILL.md and start the Discovery phase.
```

### Option D — CLAUDE.md hook

```markdown
# CLAUDE.md (at workspace root)

This is a course notes directory. When asked to "build notes",
"create webnotes", or similar, read
`webnotes-builder/skills/webnotes-builder/SKILL.md` and follow its workflow.
```

---

## Claude Desktop

Open the course directory as a Project. First message:

> "Read `webnotes-builder/skills/webnotes-builder/SKILL.md` and start the Discovery phase."

---

## Antigravity (IDE / editor surface)

Prefer the native plugin install via Antigravity CLI (`agy plugin install ...`, first
section of this guide) — the IDE and the CLI share the same agent harness, skills, and
subagents. If you'd rather stay workspace-scoped without installing anything:

```bash
# workspace-scoped skill (auto-discovered)
mkdir -p .agents/skills/
cp -r webnotes-builder/skills/webnotes-builder .agents/skills/

# context file the agent reads at the workspace root
cp webnotes-builder/skills/webnotes-builder/AGENTS.md AGENTS.md
```

Then in the agent panel: *"Build interactive course notes from the PDFs in this
directory"* — skill selection is automatic from the SKILL.md description. Delegate the
reviewer with the native subagent syntax («In a subagent: …») per
`references/13-orchestration.md`.

---

## Cursor

### Option A — `.cursorrules`

```text
When asked to "build notes", "create webnotes", or "generate study guide"
from this course directory, follow:
  webnotes-builder/skills/webnotes-builder/SKILL.md

Pay special attention to:
  - references/08-fidelity.md  (no silent omissions)
  - references/09-chunked-execution.md  (multi-session workflow)
  - references/10-reviewer-pass.md  (mandatory verification)

Always update `_build/STATE.md` after each meaningful action.
One work item per session.
```

### Option B — Reference in chat

```
@webnotes-builder/skills/webnotes-builder/SKILL.md  build the course notes
```

---

## VS Code Copilot Chat

```
@workspace read webnotes-builder/skills/webnotes-builder/SKILL.md and follow the workflow.
```

---

## OpenAI Assistants (custom GPT)

Upload as knowledge files:
- `webnotes-builder/skills/webnotes-builder/SKILL.md`
- All `webnotes-builder/skills/webnotes-builder/references/*.md`
- `webnotes-builder/skills/webnotes-builder/assets/chapter.html` (reference)

System prompt:

```
You are the webnotes-builder. The user provides course material (PDFs/markdown)
and asks to build interactive study notes. Follow the procedures in your knowledge
files (SKILL.md, references/01-workflow.md through references/10-reviewer-pass.md).

Critical rules:
- Content fidelity (references/08-fidelity.md) is the highest priority.
  Never silently omit content from the source.
- Work in chunks (references/09-chunked-execution.md). One chapter at a time.
- Always do a reviewer pass (references/10-reviewer-pass.md) before marking
  a chapter complete.
- Maintain _build/STATE.md so the user can return across sessions.
```

Enable Code Interpreter + File Search.

---

## Local LLMs (Ollama, LM Studio, aider, opencode, ...)

Use the universal bootstrap prompt in **`PROMPT.md`** (repo root) as the first message
to any file-capable agent opened in the course directory. It includes a
per-session file-feeding table for small-context models and the role prompts for
multi-agent runs. If the model can't read PDFs, convert first
(`pdftotext -layout`, `tesseract` for scans).

---

## Manual workflow (no agent)

For developers building by hand:

1. Read `webnotes-builder/skills/webnotes-builder/SKILL.md` and `references/01-workflow.md`.
2. Bootstrap state: `bash webnotes-builder/scripts/new-state.sh "Course Name" "el" "standard"`
3. Per chapter:
   - Read source PDF
   - Build outline + fidelity checklist
   - Copy `webnotes-builder/skills/webnotes-builder/assets/chapter.html` → `topic1_<slug>.html`
   - Fill in section-by-section using `references/04-html-components.md`
   - Add quiz data to `data/questions.js`
4. Update `js/nav.js`'s `topics` array.
5. Update `index.html` to list all chapters.

Typical time: 3-5 hours per chapter by hand vs 30-90 min per chapter with a good agent.

---

## Multi-language / multi-course setup

One install, many courses:

```
~/.gemini/antigravity-cli/plugins/webnotes-builder/   ← Antigravity CLI plugin (installed once)
  (or ~/.claude plugin install · or ~/.gemini/extensions/ for legacy Gemini CLI)
~/uni/algorithms/                          ← course 1
  ├── slides/
  ├── _build/STATE.md
  └── (generated webnotes)
~/uni/databases/                           ← course 2
  ├── slides/
  ├── _build/STATE.md
  └── (generated webnotes)
```

Each course has its own `_build/STATE.md`. The plugin picks up the right state per workspace.

---

## Multi-agent collaboration (advanced)

Full role definitions (Orchestrator / Exam Miner / Outliner / Chapter Writer /
Reviewer / QA Runner), platform mapping, and parallelism rules:
`skills/webnotes-builder/references/13-orchestration.md`. Role prompts ready to paste:
`agents/*.md`. On Claude Code AND Antigravity with the plugin installed, the roles are
registered subagents (Antigravity: «In a subagent: use webnotes-reviewer …»).
The minimal version — run TWO agents per chapter:

1. **Builder** does `/webnotes-outline`, `/webnotes-html`, `/webnotes-quiz`
2. **Reviewer** (fresh context, ideally a different model) does `/webnotes-review`

Workflow:
- Agent 1 completes chapter 3 sessions A-C
- Close Agent 1's session
- Agent 2 (new session, maybe a different agent altogether): "Run `/webnotes-review 3`"
- Agent 2 re-reads source independently, finds gaps, patches HTML

This catches omissions that confirmation bias would miss when one agent reviews its own work.

Example combos:
- Antigravity (Gemini) builds + Claude reviews
- Claude builds + Antigravity (Gemini) reviews
- Same model, different sessions (still benefits from fresh context)

---

## CI / automation (advanced)

After a build, you can wire `scripts/verify-fidelity.sh` into CI/pre-commit:

```yaml
# .github/workflows/fidelity.yml
on: [pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          for html in topic*.html; do
            n=$(echo $html | grep -oP 'topic\K\d+')
            bash webnotes-builder/scripts/verify-fidelity.sh \
                 "$html" \
                 "_build/topic${n}_fidelity.md"
          done
```

Catches accidental content deletion when you edit pages later.

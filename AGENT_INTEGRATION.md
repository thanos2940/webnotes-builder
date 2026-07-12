# Agent Integration Guide

> Per-platform install/invocation. The same repo works natively as a **Claude Code
> plugin** (`.claude-plugin/plugin.json` + markdown commands + subagents in `agents/`),
> a **Gemini CLI extension** (`gemini-extension.json` + TOML commands), and a
> **standalone Agent Skill** (`skills/webnotes-builder/SKILL.md`) for Antigravity,
> Cursor, Claude Desktop, OpenAI Assistants, and local LLMs (`PROMPT.md`).
> Pick your section below.

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

## Gemini CLI (native extension)

This is what the project is designed for. Full feature set: bundled slash-commands, auto-loaded GEMINI.md, skill discovery.

### Install — from a published repo

```bash
gemini extensions install https://github.com/<your-org>/webnotes-builder
gemini extensions list
```

### Install — from a local clone

```bash
git clone <repo-url> webnotes-builder
cd webnotes-builder
gemini extensions link .
```

`link` symlinks the folder — your edits to the extension are picked up immediately. Good for development.

### Install — manual copy

```bash
mkdir -p ~/.gemini/extensions/
cp -r webnotes-builder ~/.gemini/extensions/
```

### Verify

```bash
gemini
> /extensions list
# Should show: "webnotes-builder  v1.2.0  enabled"

> /skills list
# Should show: "webnotes-builder  Converts a folder of course material..."
```

### Use

```bash
cd ~/uni/algorithms-course/
gemini

# Either use a slash command:
> /webnotes-start

# Or describe your goal — Gemini matches the skill description automatically:
> Build interactive course notes from the PDFs in this directory.
```

### Disable / uninstall

```bash
gemini extensions disable webnotes-builder       # temporarily
gemini extensions enable webnotes-builder
gemini extensions uninstall webnotes-builder
```

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

## Antigravity

Place `AGENTS.md` (from `webnotes-builder/skills/webnotes-builder/AGENTS.md`) at your workspace root, OR keep the whole `webnotes-builder/` extension in the workspace and reference its SKILL.md.

```bash
# Option A — single agent pointer file at workspace root
cp webnotes-builder/skills/webnotes-builder/AGENTS.md AGENTS.md
# Edit AGENTS.md to use path: webnotes-builder/skills/webnotes-builder/SKILL.md

# Option B — .agent/ folder
mkdir -p .agent
cat > .agent/webnotes-builder.md <<'EOF'
# webnotes-builder
When asked to build course notes, follow
`webnotes-builder/skills/webnotes-builder/SKILL.md`.
EOF
```

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
~/.gemini/extensions/webnotes-builder/    ← installed once
~/uni/algorithms/                          ← course 1
  ├── slides/
  ├── _build/STATE.md
  └── (generated webnotes)
~/uni/databases/                           ← course 2
  ├── slides/
  ├── _build/STATE.md
  └── (generated webnotes)
```

Each course has its own `_build/STATE.md`. The extension picks up the right state per workspace.

---

## Multi-agent collaboration (advanced)

Full role definitions (Orchestrator / Exam Miner / Outliner / Chapter Writer /
Reviewer / QA Runner), platform mapping, and parallelism rules:
`skills/webnotes-builder/references/13-orchestration.md`. Role prompts ready to paste:
`agents/*.md`. On Claude Code with the plugin installed, the roles are registered
subagents. The minimal version — run TWO agents per chapter:

1. **Builder** does `/webnotes-outline`, `/webnotes-html`, `/webnotes-quiz`
2. **Reviewer** (fresh context, ideally a different model) does `/webnotes-review`

Workflow:
- Agent 1 completes chapter 3 sessions A-C
- Close Agent 1's session
- Agent 2 (new session, maybe a different agent altogether): "Run `/webnotes-review 3`"
- Agent 2 re-reads source independently, finds gaps, patches HTML

This catches omissions that confirmation bias would miss when one agent reviews its own work.

Example combos:
- Gemini builds + Claude reviews
- Claude builds + Gemini reviews
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

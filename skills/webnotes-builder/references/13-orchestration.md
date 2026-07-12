# 13 — Multi-Agent Orchestration

> How to split the build across agents with distinct roles. Optional but recommended for
> quality: the single biggest quality win is a **fresh-context Reviewer** that never saw
> the Writer's reasoning. On platforms without subagents, the same roles map to separate
> sessions.

---

## 1. The roles

| Role | Work items (from `09-chunked-execution.md`) | Reads | Writes |
|---|---|---|---|
| **Orchestrator** | Decides next work item, spawns/instructs role agents, merges results | `_build/STATE.md`, SKILL.md | `_build/STATE.md` (sole owner) |
| **Exam Miner** | EP-0: mine past exams → patterns file | exam material, `12-exam-mining.md` | `_build/exam_patterns.md` |
| **Outliner** | Session A per chapter: outline + fidelity checklist | source PDF, `02-research.md`, `08-fidelity.md` | `_build/topicN_outline.md`, `_build/topicN_fidelity.md` |
| **Chapter Writer** | Sessions B+C: HTML page + quiz data | outline, fidelity checklist, `03/04/05/06`, `exam_patterns.md` (for 🎯 boxes) | `topicN_<slug>.html`, `data/questions.js` (its topic only) |
| **Reviewer** | Session D: verify vs source, patch gaps | source PDF (fresh read), the HTML, fidelity checklist, `10-reviewer-pass.md` | patched HTML, review report |
| **QA Runner** | Final QA + responsive/console checks | `07-checklist.md`, the whole site | fix-ups, QA report |

If you are a single agent, you play every role — but keep the role *boundaries*:
deliberately re-read the source from scratch when you switch to the Reviewer role, and
never let the Writer's memory substitute for the Reviewer's verification.

## 2. The golden isolation rule

**The Reviewer must be a fresh context.** It receives ONLY: the source file, the
generated HTML, and the fidelity checklist. It must NOT see the outline, the Writer's
conversation, or the Writer's justifications — that's how omissions survive review.
On subagent platforms, spawn it as a new agent; on session-based platforms, run it in a
brand-new session (ideally even a different model — e.g. Gemini builds, Claude reviews).

## 3. Platform mapping

### Claude Code (subagents available)

The plugin registers role agents from `agents/`:
`webnotes-exam-miner`, `webnotes-chapter-writer`, `webnotes-reviewer`.

The main conversation acts as Orchestrator:

```
> Use the webnotes-reviewer agent to review chapter 3
  (source: slides/ch3.pdf, page: topic3_trees.html, checklist: _build/topic3_fidelity.md)
```

Or, without the plugin, spawn general-purpose subagents with the role prompt from the
matching `agents/*.md` file pasted into the task description.

### Gemini CLI (no subagents)

Roles = sessions. The `/webnotes-*` commands already are role entry points:
`/webnotes-mine` → Miner, `/webnotes-outline N` → Outliner, `/webnotes-html N` +
`/webnotes-quiz N` → Writer, `/webnotes-review N` → Reviewer. Fresh context is achieved
by starting a new `gemini` session for the review.

### Antigravity / Cursor / Claude Desktop

One chat per role. Open a new chat for the Reviewer, paste the role prompt from
`agents/webnotes-reviewer.md`, point it at the three inputs.

### Local LLMs / any chat agent

Use `PROMPT.md` (repo root) as the bootstrap, then the role prompt from `agents/*.md`.
Small-context models: give the Reviewer one *section* at a time plus the matching
checklist slice.

## 4. Parallelism rules (when running agents concurrently)

- ✅ Outlines of **different chapters** in parallel — no shared files.
- ✅ HTML of different chapters in parallel — each Writer owns only its `topicN_*` files.
- ⚠️ `data/questions.js` and `data/flashcards.js` are SHARED. Either serialize quiz
  sessions, or have Writers emit `_build/topicN_questions.fragment.js` and let the
  Orchestrator merge.
- ⚠️ `js/nav.js`, `index.html` — Orchestrator-only after scaffolding.
- ❌ `_build/STATE.md` — written ONLY by the Orchestrator, after each agent reports back.
- A Reviewer for chapter N can run while a Writer builds chapter N+1.

## 5. Handoff contract

Every role agent ends by reporting (to the Orchestrator or the user):

1. What was produced (files + one-line description each)
2. Fidelity/coverage numbers where applicable («31/31 items ✅»)
3. Anything blocked or uncertain (unreadable pages, contradictions)

The Orchestrator translates that into a STATE.md update. An agent that cannot finish
its work item still reports partial state — silent failure poisons the next session.

## 6. Arbitration

When the Reviewer claims an omission and the Writer (or previous state) claims coverage,
the Orchestrator re-reads the cited source page itself and decides. The source is always
the authority — never settle a dispute by majority of agent opinions.

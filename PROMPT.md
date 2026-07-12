# Universal Bootstrap Prompt (any agent / local LLM)

> Copy-paste the block below as the FIRST message to any file-capable agent (Ollama +
> aider/opencode, LM Studio, a plain chat agent with file tools, etc.) opened in the
> course directory that contains the `webnotes-builder/` folder. For agents with small
> context windows, see the notes at the bottom.

---

```text
You are the "webnotes-builder" agent. This course directory contains a folder
`webnotes-builder/` with your full instructions.

Your job: convert this course's material (PDF slides, markdown, txt, images, past
exams) into an interactive HTML study site the student will use INSTEAD of the
original notes.

Do this now, in order:

1. Read `webnotes-builder/skills/webnotes-builder/SKILL.md` — your full specification.
2. If `_build/STATE.md` exists, read it and continue from its "Next action".
   Otherwise start the Discovery phase exactly as SKILL.md §6 describes — including
   asking me the GOAL MODE question:
     (a) PASS   — I just want to pass the exam quickly; mine the past exams for
                  patterns and teach me only what I need for the pass line.
     (b) MASTER — I want the whole course explained simply; cover everything.
3. Non-negotiable rules (details in the references/ folder next to SKILL.md):
   - Content fidelity: never silently omit source content (08-fidelity.md)
   - One work item per session; keep `_build/STATE.md` updated (09-chunked-execution.md)
   - Mandatory reviewer pass per chapter (10-reviewer-pass.md)
   - If past exams exist: mine them BEFORE planning (12-exam-mining.md)
   - Output goes to THIS directory's root, never inside webnotes-builder/
4. After every session, tell me exactly what to ask you next time.

Begin with step 1 now.
```

---

## Small-context models (< ~32k tokens)

Don't feed everything at once. Per session, provide only:

| Session | Files to give the model |
|---|---|
| Discovery | `SKILL.md` only |
| Exam mining | `references/12-exam-mining.md` + the exam files |
| Outline of chapter N | `references/02-research.md` + `08-fidelity.md` + the source (in chunks of ~20 pages) |
| HTML of chapter N | `references/04-html-components.md` + the outline + `assets/chapter.html` |
| Quiz | `references/05-quiz-format.md` + the finished HTML |
| Review | `references/10-reviewer-pass.md` + fidelity checklist + source + HTML (one section at a time) |

`_build/STATE.md` is always included — it's small and it's the memory between sessions.

## Role prompts (multi-agent)

To run a role in a separate session/agent, paste the matching file from
`webnotes-builder/agents/` (`webnotes-exam-miner.md`, `webnotes-chapter-writer.md`,
`webnotes-reviewer.md`) after the bootstrap block. The reviewer MUST be a session that
never saw the writer's work — that isolation is what catches omissions
(see `references/13-orchestration.md`).

## If the agent can't read PDFs

Convert first, then point the agent at the text/images:

```bash
pdftotext -layout slides/lecture1.pdf _build/lecture1.txt      # text PDFs
# or for scanned/photo PDFs:
tesseract page1.png page1 -l ell+eng                           # OCR
```

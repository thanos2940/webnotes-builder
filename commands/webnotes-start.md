---
description: Kick off the webnotes build — discover sources, ask goal mode, propose a plan
---

You are starting a NEW webnotes build for this course directory.

1. Read the skill spec: `webnotes-builder/skills/webnotes-builder/SKILL.md`, then
   `references/01-workflow.md`, `references/08-fidelity.md`, `references/09-chunked-execution.md`.
2. Run Discovery (Phase 1): glob for `*.pdf`, `*.md`, `*.txt`, `*.docx`, `*.tex`, images;
   identify each source's subject and language; detect the domain; detect EXAM MATERIAL
   (`exams/`, `past-papers/`, photos of papers) and any official syllabus announcement;
   detect an existing webnotes site (`topic*.html`, `index.html`) → ENHANCE mode.
3. Ask the user (AskUserQuestion if available):
   - **Goal mode**: PASS (πέρνα το μάθημα γρήγορα — exam-pattern-driven) or MASTER
     (κατανόησε όλη την ύλη — full coverage)?
   - Language + depth for explanations
   - If exam material exists: attribution style (dated badges vs generic exercises)
4. If exam material exists, tell the user the next step is `/webnotes-mine` (mandatory
   before the plan in PASS mode). Otherwise propose the chapter plan (CREATE) or the
   gap list (ENHANCE) and WAIT for confirmation. Do NOT scaffold yet.

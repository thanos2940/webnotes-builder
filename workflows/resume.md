# Workflow: RESUME — Continue from STATE.md

> Canonical phase instructions. Paths are relative to the webnotes-builder plugin root;
> if the repo sits inside your course workspace, prefix them with `webnotes-builder/`.

1. Read `_build/STATE.md` — it names the next action. Note Goal mode, language,
   attribution, syllabus scope.
2. Read `skills/webnotes-builder/SKILL.md` and the reference doc matching the next
   action (outline → 02/08, HTML → 03/04, quiz → 05, review → 10, exam mining → 12,
   exam prep → 11, QA → 07).
3. Confirm with the user: "STATE.md says next action is X — proceed?"
4. Execute exactly ONE work item (or a couple of small ones), verify what you produced,
   update STATE.md, and tell the user what to ask next session.

If no STATE.md exists, run the START workflow instead (`workflows/start.md`).

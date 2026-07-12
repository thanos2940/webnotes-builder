---
description: Write per-section quiz questions for chapter N
argument-hint: <chapter-number>
---

Execute the canonical workflow file `workflows/quiz.md` from the webnotes-builder
plugin root - resolve it as `${CLAUDE_PLUGIN_ROOT}/workflows/quiz.md` when installed
as a plugin, or `webnotes-builder/workflows/quiz.md` when the repo sits in this
workspace.

Read it fully and follow it exactly, substituting `<N>` = $ARGUMENTS.

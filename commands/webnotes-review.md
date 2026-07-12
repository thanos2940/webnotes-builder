---
description: Mandatory reviewer pass for chapter N - verify against the source, patch gaps
argument-hint: <chapter-number>
---

Execute the canonical workflow file `workflows/review.md` from the webnotes-builder
plugin root - resolve it as `${CLAUDE_PLUGIN_ROOT}/workflows/review.md` when installed
as a plugin, or `webnotes-builder/workflows/review.md` when the repo sits in this
workspace.

Read it fully and follow it exactly, substituting `<N>` = $ARGUMENTS.

# Workflow: MINE — Past-exam pattern analysis (EP-0)

> Canonical phase instructions. Paths are relative to the webnotes-builder plugin root;
> if the repo sits inside your course workspace, prefix them with `webnotes-builder/`.

1. Read `skills/webnotes-builder/references/12-exam-mining.md` in full, plus
   `_build/STATE.md` if it exists (goal mode, attribution).

2. Read EVERY past exam file (PDFs, markdown, photos). For photos: reconstruct
   unreadable statements as PATTERNS marked "(reconstructed)" — never as verbatim quotes.

3. Produce `_build/exam_patterns.md`:
   - Question inventory (period, #, condensed statement, type, topics, points)
   - Family clustering across periods + family × period frequency matrix
   - Typical-paper blueprint (question count, points, duration, formula sheets)
   - Tier 1 (CORE) / Tier 2 (FREQUENT) / Tier 3 (RARE) pass plan with explicit
     arithmetic vs the pass line
   - Syllabus cross-check: chapters with zero exam presence (PASS-mode hide-list
     candidates), families without source coverage

4. Present to the user in ~10 plain-language lines: the matrix, the blueprint, the
   Tier 1 list, and (PASS mode) the proposed hide-list. WAIT for confirmation.

5. Update STATE.md (Exam mining ✅) and tell the user what to run next
   (usually RESUME for scaffolding, or confirming the chapter plan).

Rules: recurrence claims need ≥2 periods; never invent point values or dates; with few
papers, add a Confidence-notes section saying so.

If you can spawn subagents, delegate steps 2-3 to the `webnotes-exam-miner` agent and
review its report.

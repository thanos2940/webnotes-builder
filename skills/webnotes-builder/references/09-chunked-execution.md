# 09 — Chunked Execution (Multi-Session Workflow)

> A typical 6-chapter course takes 15-30 hours of agent work. No single session can do it all. This document defines how to break the task across many sessions while maintaining quality.

---

## 1. The execution unit: ONE WORK ITEM

A **work item** is the smallest unit of meaningful progress. Examples:

- Discovery + plan (entire course)
- Scaffolding (entire course)
- Outline for chapter N
- HTML draft for chapter N
- Quiz questions for chapter N
- Reviewer pass for chapter N
- Cross-chapter quiz wiring
- Final QA + summary

A single session does **one or a few** work items, then stops. Never try to do all chapters in one session.

---

## 2. State persistence — `_build/STATE.md`

Located at `<course-folder>/_build/STATE.md`. This is the single source of truth for "where are we?"

### Required fields

```markdown
# Build State

## Course metadata
- Title: <course name>
- Language: <el | en | mixed>
- Depth: <terse | standard | encyclopedic>
- Source: <slides/ or wherever PDFs live>
- Skill version: 1.1.0
- Started: 2026-05-15

## Phases
- [x] 1. Discovery
- [x] 2. Plan approved
- [x] 3. Scaffolding
- [ ] 4. Chapters (3/6)
- [ ] 5. Cross-chapter quiz
- [ ] 6. Final QA

## Chapter table
| # | Source PDF              | Slug      | Outline | HTML | Quiz | Reviewer | Notes |
|---|-------------------------|-----------|---------|------|------|----------|-------|
| 1 | slides/intro.pdf        | bigo      | ✅      | ✅   | ✅   | ✅       |       |
| 2 | slides/recursion.pdf    | recursion | ✅      | ✅   | ✅   | ❌       | Need reviewer pass next |
| 3 | slides/divide_conq.pdf  | dnc       | ✅      | ❌   | ❌   | ❌       | Outline done — HTML next |
| 4 | slides/greedy.pdf       | greedy    | ❌      | ❌   | ❌   | ❌       |       |
| 5 | slides/dp.pdf           | dp        | ❌      | ❌   | ❌   | ❌       |       |
| 6 | slides/graphs.pdf       | graphs    | ❌      | ❌   | ❌   | ❌       |       |

## Last completed action
**When:** 2026-05-15 18:45
**What:** Wrote outline for Chapter 3 (Divide & Conquer) → `_build/topic3_outline.md`
**Verification:** Fidelity checklist has 28 items, all sourced from pages 1-42 of `slides/divide_conq.pdf`.

## Next action (for the next session)
Write HTML for Chapter 3 from `_build/topic3_outline.md`.
Use `assets/chapter.html` as starter. Color theme: orange (--odim).
Estimated time: 60-90 min of agent work.

## Open questions (for user)
- (none)

## Known issues
- Chapter 1 §3.4 references "CLRS Ch.4" — couldn't access. Added an .ibox noting this.

## Fidelity coverage so far
- Chapter 1: 31/31 items ✅
- Chapter 2: 24/24 items ✅
- Chapter 3: outline complete, HTML pending
```

### Update rules

Update STATE.md **after every meaningful action**:

- Wrote an outline → mark outline ✅, set "Last completed action"
- Wrote HTML → mark HTML ✅
- Wrote quiz → mark Quiz ✅
- Finished reviewer pass → mark Reviewer ✅
- Discovered an open question → add to "Open questions"
- Discovered a known issue → add to "Known issues"

---

## 3. Per-session protocol

### Session start

1. **Read** `_build/STATE.md` first thing.
2. **Read** `SKILL.md`.
3. **Read** the doc most relevant to the "Next action" (e.g. if next is HTML, read `references/04-html-components.md`).
4. **Confirm with the user**: "STATE.md says next action is X. Should I proceed?"

If no STATE.md exists, the user is starting fresh — go to Discovery phase (see SKILL.md §6).

### Session execution

1. Execute exactly ONE next action (or maybe two small ones).
2. Verify what you produced (read the file back; spot-check).
3. **Update STATE.md** with what was done.
4. **Tell the user** what's next and what to ask in the next session.

### Session end

End the session message with:

```
✅ Completed: <what you did>
📋 STATE.md updated.
🔜 Next session: ask me to "do <next-action>" — e.g. "write quiz questions for chapter 3"

🛑 Do NOT continue without user reply — long sessions degrade quality.
```

---

## 4. Per-chapter cycle (the inner loop)

For each chapter, **5 separate sessions** is the gold standard:

### Session A — Outline

**Input:** Source PDF
**Action:** Read PDF in full. Produce:
- `_build/topicN_outline.md` — content extraction
- `_build/topicN_fidelity.md` — checklist (see `references/08-fidelity.md`)

**Output:** Two files in `_build/`
**Time:** ~30 min for a 50-page PDF

### Session B — HTML draft

**Input:** Outline + fidelity checklist + `assets/chapter.html` template
**Action:** Write `topicN_<slug>.html` in parent dir. Tick fidelity items as you include them.

**Output:** One HTML file
**Time:** ~60-90 min

### Session C — Quiz

**Input:** Outline + completed HTML
**Action:** Append quiz data for this chapter to `data/questions.js`. One section block per `.section-quiz` placeholder.

**Output:** Updated `data/questions.js`
**Time:** ~30 min

### Session D — Reviewer pass

**Input:** Source PDF (re-read) + generated HTML + fidelity checklist
**Action:** Verify every fidelity item is present. Enhance any section that's missing items or is too terse.

**Output:** Enhanced HTML
**Time:** ~45 min

### Session E (optional) — Cross-validation

**Input:** Two agents independently review the same chapter.
**Action:** Reconcile any differences in flagged omissions.
**Output:** Final HTML

**Time:** ~30 min

### Time budget per chapter

| Pass | Min | Practical | Max |
|---|---|---|---|
| Outline | 20 min | 30 min | 60 min |
| HTML | 45 min | 75 min | 120 min |
| Quiz | 15 min | 30 min | 45 min |
| Reviewer | 30 min | 45 min | 90 min |
| Total | 110 min | 180 min | 315 min |

For a 6-chapter course: ~18 hours practical, ~30 hours max. Spread across days/weeks.

---

## 5. Collapsing passes (when in a hurry)

If the user explicitly asks for speed:

- **Sessions A+B combined**: write outline AND HTML in one session. Risk: HTML quality drops because outline isn't given separate attention. Acceptable for short chapters (<20 pages).
- **Sessions B+C combined**: write HTML AND quiz in one session. Lower risk — quiz benefits from fresh HTML in memory.
- **Skip Session D**: NEVER recommended. Skipping the reviewer pass means students miss content.

Always tell the user what corners you cut so they can decide if it's acceptable.

---

## 6. State file FAQ

### Q: User deletes _build/STATE.md by accident. What now?

Reconstruct from existing files:
1. Glob `topic*.html` — count chapters that have HTML.
2. Read `data/questions.js` — count chapters that have quizzes.
3. Glob `_build/topic*_outline.md` — count outlines.
4. Ask user which were reviewer-passed.

Then rebuild STATE.md from this evidence.

### Q: User wants to redo Chapter 3

Edit STATE.md: set Chapter 3 row to all ❌. Delete `_build/topic3_*` files. Delete `topic3_<slug>.html`. Optionally remove `"topic3"` key from `data/questions.js`. Restart from Session A for Chapter 3.

### Q: Multiple users / agents collaborating

STATE.md becomes a git-tracked file. Each agent commits after their session. Standard merge conflict resolution applies. The "Last completed action" timestamp helps order operations.

### Q: User wants to add a new chapter mid-build

Add a row to the chapter table. Update Chapter # numbering if needed. Add the source PDF info. Start that chapter from Session A.

---

## 7. Working with large chapters (90+ pages)

Some source PDFs are massive. Strategy: split the outline pass.

```
Chapter 5 (Networking) — 142 pages

Session A1: outline pages 1-50  → _build/topic5_outline_part1.md
Session A2: outline pages 51-100 → _build/topic5_outline_part2.md
Session A3: outline pages 101-142 → _build/topic5_outline_part3.md
Session A-merge: combine into _build/topic5_outline.md + fidelity.md
Session B: HTML (may also be split into B1, B2)
...
```

Track sub-sessions in STATE.md too:

```markdown
| 5 | slides/networking.pdf | networking | A1:✅ A2:✅ A3:✅ merge:✅ | B1:✅ B2:❌ | ❌ | ❌ | Split outline (142 pages) |
```

---

## 8. Cross-chapter dependencies

Sometimes Chapter 5 references Chapter 3's content (e.g. "as we saw in §3.2"). This is fine — the link goes `<a href="topic3_<slug>.html#section2">`.

Don't generate Chapter 5 before Chapter 3 exists if you want such links to be writable from memory. But it's not a hard blocker — you can add cross-links during the reviewer pass.

---

## 9. Anti-patterns

❌ Not creating `_build/STATE.md` — future sessions can't pick up
❌ Updating STATE.md only at session end — if you crash mid-session, you lose progress info
❌ Trying to do all 5 per-chapter sessions in 1 conversation — quality drops
❌ Reading STATE.md but not following the "Next action" — user is confused why you did something else
❌ Generating HTML directly without an outline file — no source-of-truth for fidelity check
❌ Skipping the reviewer pass to "save time" — defeats the entire purpose of the skill

---

## 10. Agent handoff message template

When you finish a session, your last message should look like:

```
✅ Session complete.

What I did this session:
   - Read all 42 pages of slides/divide_conq.pdf
   - Wrote outline → _build/topic3_outline.md
   - Built fidelity checklist (28 items) → _build/topic3_fidelity.md
   - Updated _build/STATE.md

Files changed:
   _build/STATE.md           (modified)
   _build/topic3_outline.md  (new, 312 lines)
   _build/topic3_fidelity.md (new, 28 items)

🔜 Next session — tell me one of:
   • "Write Chapter 3 HTML" → I'll do Session B
   • "Continue chapter 3" → same as above
   • "Outline Chapter 4 instead" → switch focus
   • "Review my outline first" → human review pause

The outline took ~25 min. Chapter 3 HTML estimated at 75 min in next session.
```

Be specific. Don't say "let me know what's next" — give them concrete options.

---

Next: read `references/10-reviewer-pass.md` for the verification protocol.

# 10 — Reviewer Pass

> The mandatory verification loop. After a chapter is "drafted", an agent re-reads the source and compares it against the output, enhancing anything missing or thin.

---

## 1. Why this exists

The first-pass HTML is always incomplete. Reasons:
- Context bloat — by section 11 of a chapter, the agent has forgotten what was in section 3 of the PDF
- Over-summarization — long bullet lists tempt the agent to "and other examples" rather than enumerate
- Hidden warnings — slides often have small-print warnings the agent overlooked
- Verbal-only content — slides with mostly speaker notes get under-represented

The reviewer pass catches these.

---

## 2. The principle

**A reviewer agent reads the source PDF and the generated HTML, and treats them as if they were written by different people. The reviewer's job: find every fact in the PDF that isn't in the HTML.**

---

## 3. Single-agent reviewer protocol

If you're a single agent doing both write + review:

### Step 1: Clear your reasoning

Before starting the reviewer pass:
- Close the previous outline file (mentally)
- Re-open the source PDF from scratch
- Pretend you've never seen the HTML before

### Step 2: Read the source again, fully

Don't skim. Read all N pages. Take notes of what's there. This is essentially the outline pass again, but you focus on **comparison** with what's already written.

### Step 3: Check the fidelity checklist

Open `_build/topicN_fidelity.md`. Verify each item is checked. For unchecked items:
- Find them in the HTML using grep/search
- If found, tick the box
- If not found, ADD them to the HTML

### Step 4: Read the HTML

Now open the chapter HTML. Read it as if you were a student. For each section, ask:
- Does this section's content match what the source teaches?
- Are there any source items missing from this section?
- Is anything mentioned but not explained?
- Are warnings/prohibitions preserved?

### Step 5: Patch the HTML

For each gap found:
- Locate the right section in the HTML
- Edit the section to include the missing content
- Maintain the chapter's design (use same components, same color theme)
- Tick the corresponding fidelity item

### Step 6: Re-verify

After patching, do a quick grep/scan to confirm every fidelity item now appears:

```bash
grep -F 'operator @' topic4_prolog.html  # should return >0
grep -F 'spurious wakeup' topic6_threads.html  # should return >0
```

### Step 7: Update STATE.md

Mark "Reviewer: ✅" for this chapter. Note any items that were added.

---

## 4. Multi-agent reviewer protocol (recommended for high-stakes courses)

For maximum quality, run two agents:

### Agent 1: Builder

- Reads source
- Generates outline + HTML + quiz
- Has full context of "why I made these choices"

### Agent 2: Reviewer

- **Fresh context** — no memory of builder's reasoning
- Reads only: source PDF + generated HTML + fidelity checklist
- Produces a `_build/topicN_review.md` listing issues found:

```markdown
# Review Report — Chapter 4 (Prolog Operators)

## Coverage stats
- Operators documented: 21/23 ⚠️
- Warnings preserved: 6/7 ⚠️
- Examples: 12/12 ✅

## Missing items

### 1. Operator `=..` (univ) — page 18 of source
Source describes this as decomposing a term into a list.
HTML §3 has no mention. Should be added to the operator table.

### 2. Operator `@>` (standard order, greater)
Listed in source page 21 but only `@<` is in HTML §3.

### 3. Warning "Never use ! in negation-as-failure"
Source page 28 has a red box; HTML §6 mentions cut but doesn't include this prohibition.

## Items present but too terse

### 4. Section §5 — Cut operator
HTML has 2 sentences. Source has a full slide with 4 bullet points
(commits to choice, prevents backtracking, scope, dangers). Should expand.

## Items present but possibly wrong

### 5. §4 Example for `is/2`
Source uses `X is 2 + 3 * 4` → 14 (precedence example).
HTML uses `X is 2 + 3` → 5 (loses the precedence point).
Recommend matching the source example.

## All-clear items
- Concepts of unification ✅
- Theorem about resolution ✅
- ...
```

### Agent 1 (builder) applies the patches

The builder reads the review report and edits the HTML to fix each issue. After patching:

- Mark reviewer pass complete in STATE.md
- Optionally save the resolved review report (e.g. with checkmarks)

---

## 5. Reviewer checklist (what to look for)

When reviewing, scan for these specific failure modes:

| Pattern in source | What to verify in HTML |
|---|---|
| Numbered list (e.g. "5 properties of...") | Output has all 5, numbered or in a list |
| "Note that..." / "Observe that..." | The note appears (usually as `.ibox`) |
| Red text or warning slide | Preserved as `.rbox` or `.wbox` |
| Code listing with comments | Code is present with comments preserved |
| Table on slide | Output has matching `<table class="vtbl">` |
| Diagram | SVG / CSS layout equivalent in output (no ASCII art) |
| Worked example | Reproduced in output |
| Multiple cases (e.g. "case 1:", "case 2:") | All cases present |
| "Don't..." / "Avoid..." / "Never..." | Anti-pattern preserved |
| Glossary / definition | Definition present, term highlighted |
| Bibliographic note | Cited somewhere (footer or section note) |

---

## 6. Reviewer cadence

The reviewer pass happens **after** the HTML draft and **before** the chapter is marked "done". Concretely:

```
Outline ─→ HTML ─→ Quiz ─→ Reviewer ─→ [Done]
                              ↑
                  (re-reads source, enhances HTML)
```

Some agents prefer reviewer-pass after **all** chapters are drafted. This is acceptable for very long courses (10+ chapters) where context switching is expensive — but be aware that fidelity gaps compound (later chapters reference earlier ones).

Default: reviewer-pass per-chapter, immediately after drafting.

---

## 7. Triggering a reviewer pass

The user can request a reviewer pass at any time:

> "Run the reviewer pass on Chapter 4"

The agent:
1. Reads `_build/STATE.md` (confirms chapter has HTML)
2. Reads source PDF (e.g. `slides/prolog.pdf`)
3. Reads generated HTML (`topic4_prolog.html`)
4. Reads fidelity checklist (`_build/topic4_fidelity.md`)
5. Produces review report or directly patches HTML
6. Updates STATE.md

---

## 8. Reviewer pass for non-fidelity issues

The reviewer pass also catches:

- **Broken links** — `<a href="topic3_...html">` to a non-existent file
- **Quiz mismatches** — `<div class="section-quiz" data-section="X">` with no matching entry in `questions.js`
- **Color theme inconsistency** — section uses orange but chapter is blue
- **Sloppy code highlighting** — code block missing `.kw` / `.fn` / `.cm` classes
- **Typos / grammar in explanations** — fix in passing

These are secondary; primary focus is fidelity.

---

## 9. Sign-off

After a reviewer pass is complete, the chapter row in STATE.md gets ✅ in the Reviewer column. The reviewer also writes a one-line note:

```
| 4 | slides/prolog.pdf | prolog | ✅ | ✅ | ✅ | ✅ | Added 2 missing operators + 1 warning in §6 |
```

This historical record helps if questions come up later.

---

## 10. When the reviewer finds nothing

Sometimes a chapter is already perfect. The reviewer should still:
- Report "Reviewed Chapter N — 0 issues found"
- Tick the Reviewer column in STATE.md
- Briefly explain WHY it was thorough (e.g. "Spot-checked all 23 operators, all warnings, all examples")

This transparency matters — a "no-issues" review without proof of work is suspicious.

---

## 11. Anti-patterns

❌ Reviewer agent uses outline notes instead of re-reading source — defeats the purpose
❌ Reviewer agent skips reading the HTML — can't compare
❌ Reviewer agent only checks the fidelity checklist — should also re-read source for items missed even from the checklist
❌ Builder agent and reviewer agent are the same session-context — bias confirms own work
❌ Marking Reviewer ✅ without a review report or visible patches — no audit trail
❌ Doing reviewer pass for all chapters in one session — context bloat means later chapters get less attention

---

## 12. Example transcript

```
User: Do the reviewer pass on Chapter 4.

Agent: Reading _build/STATE.md... Chapter 4 (Prolog Operators) is in
       state "HTML ✅, Quiz ✅, Reviewer ❌". Starting reviewer pass.

       Reading slides/prolog.pdf (53 pages)...

       [reads all pages]

       Reading topic4_prolog.html (1247 lines)...

       Reading _build/topic4_fidelity.md (47 items, 41 ticked)...

       Verifying unchecked items against HTML:
       - "[page 19] Operator @>" — searched HTML... NOT FOUND.
         Will add to operator table in §3.
       - "[page 28] Warning about ! in negation" — NOT FOUND.
         Will add as .rbox in §6.
       - "[page 31] Operator =.." — found in §3, but with wrong
         example. Will fix.
       - ...

       [edits the HTML to add missing items]

       Re-verifying: all 47 fidelity items now confirmed in HTML.

       Updating _build/STATE.md:
       - Chapter 4 Reviewer: ✅
       - Note: "Added 3 missing operators + 1 warning; fixed 1 example"

       ✅ Reviewer pass complete. Chapter 4 is now fully verified.

       Next: should I run the reviewer pass on another chapter, or move to
       cross-chapter quiz wiring?
```

---

That's the reviewer pass. Treat it as non-optional — it's the difference between "the agent wrote something" and "the student got the full course."

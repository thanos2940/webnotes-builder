# 08 — Content Fidelity Guarantees

> The student will study from your output INSTEAD OF the original PDFs. Anything missing from your output is content the student will never see. This document defines hard rules to prevent omissions.

---

## 1. The Fidelity Principle

**Every piece of substantive content in the source must be reflected in the output, with appropriate weight.**

| Source content | Required in output |
|---|---|
| Definition of a term | Full definition, term highlighted on first use |
| Code listing | Transcribed verbatim (corrected for typos) with syntax highlighting |
| Pseudocode | Transcribed with same control flow + commentary |
| Theorem / property / law | Statement preserved; proof may be summarized |
| Warning / "Be careful!" slide | Reproduced as `.rbox` or `.wbox` |
| Prohibition / "Don't do X" | Preserved as explicit anti-pattern |
| Example (worked) | Included in full |
| Table / comparison | Preserved as `<table class="vtbl">` |
| Diagram | Recreated as inline SVG or CSS shapes (no ASCII art) |
| Operator / function / keyword list | Every entry preserved |
| Historical note / aside | Included as `.ibox` (lighter weight OK) |
| Bibliographic reference | Listed in footer or section note |

**You may compress or expand for readability — never delete.**

---

## 2. Mandatory: The Fidelity Checklist (`_build/topicN_fidelity.md`)

For every chapter, **before writing the HTML**, generate a fidelity checklist by reading the source PDF page-by-page. This checklist is your contract with the student.

### Template

```markdown
# Fidelity Checklist — Topic N: <Title>

Source: ./slides/lectureN.pdf (NN pages)

## Concepts (must appear in HTML)
- [ ] [page 3] Definition of "X"
- [ ] [page 4] Definition of "Y"
- [ ] [page 7] Theorem: "Z ⇒ W"
- [ ] [page 12] The 5 properties of relation R
- [ ] [page 18] Distinction between A and B
- [ ] ...

## Code / Pseudocode (must appear)
- [ ] [page 22] mergesort.c — complete listing
- [ ] [page 24] partition() pseudocode
- [ ] ...

## Operators / Keywords / Functions named in source
- [ ] :- (clause separator)
- [ ] ?- (query)
- [ ] !  (cut)
- [ ] ,  (conjunction)
- [ ] ;  (disjunction)
- [ ] -> (implication)
- [ ] \+ (negation as failure)
- [ ] =  (unification)
- [ ] == (literal equality)
- [ ] =:= (arithmetic equality)
- [ ] is  (arithmetic evaluation)
- [ ] ...all from the source...

## Warnings / Prohibitions
- [ ] [page 14] "Never modify list during iteration"
- [ ] [page 19] "Cut prevents backtracking — use sparingly"
- [ ] [page 31] "Avoid left-recursion in clauses"
- [ ] ...

## Examples (worked)
- [ ] [page 8]  Example 1: factorial
- [ ] [page 11] Example 2: ancestor relation
- [ ] [page 17] Counter-example: failed unification
- [ ] ...

## Diagrams / Tables
- [ ] [page 5]  Resolution tree diagram
- [ ] [page 16] Comparison table: declarative vs procedural
- [ ] [page 28] State transition diagram
- [ ] ...

## Historical / context
- [ ] [page 1]  Kowalski 1974, history of Prolog
- [ ] [page 33] Note about ISO Prolog standardization

## Skipped (with reason)
- [page 41] Decorative slide (course logo) — skipping
- [page 88-89] Slide deck table of contents — already reflected in TOC
```

### Coverage rule

Before claiming the chapter is done, **every box must be checked** ✅.

If a box is impossible to fulfill (e.g. source contradicts itself), explicitly note it in the chapter as a `.ibox`: "Source materials are unclear on X; standard interpretation is Y."

---

## 3. Generation discipline

When you write the chapter HTML:

1. Open the fidelity checklist alongside the source PDF.
2. For each section in your plan, identify which checklist items belong in it.
3. Write the section, ticking items as you include them.
4. Don't move to the next section until current section's items are all ticked.

### Item tracking inside HTML

Optionally add HTML comments to mark where each checklist item is covered:

```html
<!-- fidelity:concept:cut-operator -->
<p>...content about the cut operator...</p>
```

A future reviewer agent can grep for these and verify nothing is missing.

---

## 4. Weighting

Not all content deserves equal length. Triage:

| Weight | Content type | Length in output |
|---|---|---|
| **Heavy** | Core concepts, key algorithms, important warnings | Multiple paragraphs, code, diagram |
| **Medium** | Secondary examples, supplementary properties | Single paragraph, possibly with code |
| **Light** | Historical asides, edge cases, footnotes | Single sentence in `.ibox` |
| **Mention only** | Trivial details, terminology pointers | Listed in a bullet without elaboration |

**Even "mention only" items must be in the output.** A student who studies your page and not the PDF should know that operator `=..` exists in Prolog, even if you spend only one bullet on it.

---

## 5. Specific subject patterns

### Prolog / Logic Programming (the user's example)

For a chapter on Prolog operators, you must include EVERY operator from the source, organized by category. Use a table:

```html
<table class="vtbl">
  <thead>
    <tr><th>Operator</th><th>Category</th><th>Meaning</th><th>Example</th></tr>
  </thead>
  <tbody>
    <tr><td><code>=</code></td><td>Unification</td><td>Unify two terms</td><td><code>X = 5</code></td></tr>
    <tr><td><code>==</code></td><td>Comparison</td><td>Literal equality (no unification)</td><td><code>X == X</code></td></tr>
    <tr><td><code>\=</code></td><td>Negation</td><td>Cannot unify</td><td><code>5 \= a</code></td></tr>
    <tr><td><code>is</code></td><td>Arithmetic</td><td>Evaluate right side, unify left</td><td><code>X is 2+3</code></td></tr>
    <tr><td><code>!</code></td><td>Control</td><td>Cut — commits to current choice point</td><td><code>foo(X) :- bar(X), !</code></td></tr>
    <!-- ...ALL operators from source... -->
  </tbody>
</table>
```

If the source mentions 23 operators, the table has 23 rows. If it warns "never use `!` inside `findall/3`", that warning is a `.rbox` after the table.

### Mathematics

For a chapter on integration techniques, include every named technique:
- Integration by parts
- Substitution
- Partial fractions
- Trigonometric substitution
- Improper integrals
- Each with: statement, formula (MathJax), worked example.

Don't decide one technique is "less important" and skip it.

### Algorithms

For a chapter on sorting algorithms, include every algorithm covered:
- Bubble sort (even if only 1 slide)
- Insertion sort
- Selection sort
- Merge sort
- Quick sort
- Heap sort
- ...

Each gets a section with: pseudocode, complexity, when-to-use, example trace.

### Networking

For a chapter on TCP, include every flag from the source:
- SYN, ACK, FIN, RST, PSH, URG, ECE, CWR, NS

Every state from the source:
- LISTEN, SYN_SENT, SYN_RECEIVED, ESTABLISHED, FIN_WAIT_1, FIN_WAIT_2, CLOSE_WAIT, CLOSING, LAST_ACK, TIME_WAIT, CLOSED

Don't decide TIME_WAIT is "advanced" and skip it.

---

## 6. Verification pass (cheap version)

After writing the HTML, do a fast verification:

1. Read the fidelity checklist.
2. For each item, search the HTML (`grep` or `Read` + scan).
3. Mark items found ✅, items missing ❌.
4. If any ❌, fix them BEFORE marking the chapter done.

Tool support: use grep to verify presence. E.g. for Prolog operators:

```bash
grep -c '<code>=</code>' topic4_prolog.html
grep -c '<code>!</code>' topic4_prolog.html
grep -c 'cut' topic4_prolog.html
```

If any operator returns 0 occurrences, it's missing.

---

## 7. Verification pass (thorough version) — Reviewer Pass

See `references/10-reviewer-pass.md`. The reviewer pass is the mandatory final check before marking a chapter complete.

---

## 8. When the source is genuinely ambiguous or incomplete

Sometimes the source IS the problem (poor slides, missing pages, errors). Handle these explicitly:

```html
<div class="ibox">
  <div class="lbl" style="color:var(--blue)">📚 Source note</div>
  Slide 47 introduces operator <code>@</code> without explaining its semantics.
  The standard meaning in SWI-Prolog is <em>standard order comparison</em> —
  consult the instructor or SWI-Prolog reference for confirmation.
</div>
```

**Never silently fill the gap with possibly-wrong content.** Flag uncertainty.

---

## 9. Output to user — what to report

When you finish a chapter, your summary to the user MUST include fidelity stats:

```
✅ Chapter 4 (Prolog Operators) — built and verified

📊 Coverage:
   - Concepts: 18/18 covered ✅
   - Operators: 23/23 documented ✅
   - Warnings: 7/7 preserved ✅
   - Examples: 12/12 included ✅
   - Diagrams: 3/3 recreated ✅

⚠️ Note:
   - Operator `@>` is mentioned in source but has no example;
     I added a generic example based on standard semantics.
   - Slide 53 is a 1-line aside; covered as a single bullet in §6.
```

This transparency lets the student trust the output and lets the user/instructor verify nothing was silently dropped.

---

## 10. Anti-patterns

❌ "I'll skip this minor operator — students don't need it" — you don't decide; the source does
❌ "Three operators do basically the same thing, I'll group them" — preserve each one's name and example
❌ "This warning is obvious" — preserve it anyway; obvious to you ≠ obvious to student
❌ "The proof is too long, I'll skip the body" — OK to summarize, NOT OK to omit existence
❌ Generating HTML before completing the fidelity checklist
❌ Skipping the verification step at the end
❌ Reporting "done" without coverage stats

---

Next: read `references/09-chunked-execution.md` to learn how to spread this work across multiple sessions, and `references/10-reviewer-pass.md` for the verification protocol.

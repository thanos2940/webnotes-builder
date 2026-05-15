# 05 — Quiz Format

> All quiz data lives in `data/questions.js` as one big object. The shared `quiz-loader.js` reads it and renders into `.section-quiz` placeholders.

---

## 1. Schema

```js
window.quizData = {
  "<topicId>": {
    "<sectionId>": {
      "title": "Display name shown in quiz header",
      "questions": [
        {
          "q": "Question text in user's language?",
          "options": [
            {
              "text": "Option text",
              "correct": true,         // exactly ONE option per question should be correct
              "explanation": "Why this is the correct answer"
            },
            {
              "text": "Distractor 1",
              "correct": false,
              "explanation": "Why this is wrong (educational!)"
            },
            {
              "text": "Distractor 2",
              "correct": false,
              "explanation": "..."
            }
          ]
        }
      ]
    }
  }
};
```

- `<topicId>` matches the chapter's `data-topic` value. Convention: `"topic1"`, `"topic2"`, ... or `"basics"`, `"graphs"`, etc.
- `<sectionId>` matches the section's `data-section` value AND the section's HTML `id`.

---

## 2. Rendering behavior

The `quiz-loader.js` finds every `<div class="section-quiz" data-topic="X" data-section="Y">` on the page and replaces its inner HTML with:

```html
<div class="quiz">
  <h3>🧠 Quick Check — <title></h3>
  <div class="qitems">
    <div class="qitem">
      <div class="qq"><question text></div>
      <div class="qa" id="q-X-Y-0" style="display:none"><correct answer text></div>
      <button class="qa-toggle" onclick="toggleAnswer('q-X-Y-0', this)">Δες απάντηση</button>
    </div>
    <!-- ...more qitems... -->
  </div>
</div>
```

Per-question state is just show/hide — no scoring, no input. It's a study aid, not a graded test.

The **interactive_quiz.html** is the graded test version — it reads the SAME data but renders with radio buttons + scoring.

---

## 3. Writing good questions

### 3.1 Question types to use

| Type | Example | When |
|---|---|---|
| **Definition recall** | "Τι είναι ο mutex;" | Sections introducing new term |
| **Mechanism / "what happens"** | "Τι γίνεται αν δύο threads κλειδώσουν τον ίδιο mutex ταυτόχρονα;" | Sections explaining a system's behavior |
| **Compare / contrast** | "Ποια η διαφορά join vs detach;" | Sections that present two related concepts |
| **Diagnose** | "Γιατί η total_words += count είναι ανασφαλής σε threads;" | Sections about pitfalls |
| **Apply** | "Σε ποια περίπτωση θα χρησιμοποιούσες UDP αντί για TCP;" | Sections about decision-making |

### 3.2 Distractor design (the hard part)

Bad distractors are obvious and waste students' time. Good distractors are **plausible misconceptions** — the kind students actually have.

**Pattern 1 — Swap labels:**
> Q: Τι ορίζει η IP και τι το Port;
> A (correct): IP = μηχάνημα, Port = διεργασία
> Distractor: IP = διεργασία, Port = μηχάνημα ← students confuse these

**Pattern 2 — Half-truth:**
> Q: Γιατί χρησιμοποιούμε while(condition) γύρω από pthread_cond_wait;
> A (correct): Για προστασία από spurious wakeups
> Distractor: Γιατί η if δεν δουλεύει με CVs ← partially true (no, it works, but unsafely)
> Distractor: Γιατί το while είναι πιο γρήγορο ← plausible but wrong reasoning

**Pattern 3 — Wrong scope:**
> Q: Τι σημαίνει 'kernel lifetime' για System V IPC;
> A: Τα objects ζουν στον kernel μέχρι ρητή διαγραφή
> Distractor: Ζουν όσο ζει η διεργασία ← what users assume (since pipes work this way)

### 3.3 Explanations

Every option needs an explanation — including wrong ones. The student clicks "Show answer", sees the correct answer, but in the *interactive quiz mode* they also see explanations for why their wrong choice was wrong.

Length: 1–2 sentences. Examples:

✅ Good explanation:
> "Η perror() ελέγχει το global errno. Οι pthread functions δεν θέτουν errno — επιστρέφουν τον error code απευθείας, οπότε χρειαζόμαστε strerror(err)."

❌ Bad explanation:
> "It's wrong."

### 3.4 Question count per section

| Section depth | Questions |
|---|---|
| 5–10 paragraphs, single concept | 1 question |
| Standard section (mixed concept + example) | 2 questions |
| Heavy section (multiple sub-concepts) | 3 questions |
| Don't exceed 3 per section | quiz fatigue |

Aim for **roughly 2 questions per section on average** — gives ~20–28 questions per chapter for a typical 10–14 section chapter.

### 3.5 Language

Match the chapter's language. For mixed Greek/English (common in Greek CS courses):
- Question stem in Greek
- Technical terms in English (no translation: `fork()`, not "κλήση φόρκ")
- Answer choices same language as stem
- Explanations same language as stem

---

## 4. File structure of questions.js

```js
window.quizData = {
  "topic1": {
    "intro":   { "title": "...", "questions": [/*...*/] },
    "section2": { "title": "...", "questions": [/*...*/] }
  },
  "topic2": {
    "intro": { /*...*/ },
    "...": { /*...*/ }
  },
  // ...
};
```

Don't fragment into multiple files unless the file grows past ~5000 lines. One `questions.js` is simpler.

---

## 5. Adding quiz data — workflow

When you complete a chapter's HTML:

1. Open `data/questions.js`
2. Add a new top-level key for the topic (e.g. `"topic5": { ... }`) — preserve existing topics
3. For each section in the chapter, add a sub-entry with the section's questions
4. Save
5. Reload chapter page in browser → quizzes should render

If you forget a section, you'll see a warning in the browser console:
> `No questions found for topic: topicN, section: sectionId`

---

## 6. Example — fully fleshed-out section quiz

```js
"topic6": {
  "mutexes": {
    "title": "POSIX Mutexes",
    "questions": [
      {
        "q": "Τι κάνει η pthread_mutex_trylock() σε σχέση με τη lock();",
        "options": [
          {
            "text": "Αν ο mutex είναι κλειδωμένος, επιστρέφει αμέσως EBUSY αντί να μπλοκάρει.",
            "correct": true,
            "explanation": "Non-blocking εναλλακτική. Χρήσιμο για busy-wait ή deadlock avoidance."
          },
          {
            "text": "Κλειδώνει μόνο αν δεν υπάρχει κανείς στην ουρά.",
            "correct": false,
            "explanation": "Δεν εξετάζει ουρές — ελέγχει μόνο αν είναι free."
          },
          {
            "text": "Δοκιμάζει πολλές φορές πριν εγκαταλείψει.",
            "correct": false,
            "explanation": "Δοκιμάζει μόνο μία φορά."
          }
        ]
      },
      {
        "q": "Ποιοι είναι οι βασικοί κανόνες χρήσης mutex;",
        "options": [
          {
            "text": "Μόνο ο κάτοχος κάνει unlock, κράτα τα critical sections μικρά, πάντα ξεκλείδωνε.",
            "correct": true,
            "explanation": "Αν ξεχάσεις unlock → deadlock. Αν τα CS είναι μεγάλα → χαμηλή απόδοση."
          },
          {
            "text": "Κλείδωνε τα πάντα με ένα global mutex.",
            "correct": false,
            "explanation": "Αυτό δουλεύει αλλά σειριοποιεί τα πάντα (coarse-grained)."
          },
          {
            "text": "Ο mutex δεν χρειάζεται destroy.",
            "correct": false,
            "explanation": "Πάντα κάνε pthread_mutex_destroy() για cleanup."
          }
        ]
      }
    ]
  }
}
```

---

## 7. Quiz placeholder in HTML

In the chapter HTML at the end of `<section id="mutexes">`:

```html
<div class="section-quiz" data-topic="topic6" data-section="mutexes"></div>
```

The `data-topic="topic6"` must match the `"topic6"` key in `window.quizData`, and `data-section="mutexes"` must match `"mutexes"` sub-key.

---

## 8. Interactive (cross-chapter) quiz behavior

`interactive_quiz.html` shows all questions from all topics, randomized, with:
- Radio buttons (single selection)
- Submit button
- Per-question correct/wrong marker after submit
- Total score at end
- Per-question explanation reveal

It auto-pulls from `data/questions.js` — no separate data needed.

For details on its rendering logic, see `assets/interactive-quiz.html`.

---

## 9. Anti-patterns

❌ Adding a question without an explanation
❌ Two correct options (`correct: true` on multiple — UI behavior is undefined)
❌ Distractors that are obviously silly ("The CPU explodes")
❌ Quiz data without a matching `.section-quiz` div in HTML (orphan data)
❌ `.section-quiz` div without quiz data (empty quiz, console warning)
❌ Section IDs with hyphens — keep them simple (`prodcons` not `prod-cons`)

---

Next: `references/06-interactivity.md` — when to add diagrams, animations, simulations.

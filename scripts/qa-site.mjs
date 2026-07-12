#!/usr/bin/env node
/**
 * qa-site.mjs — Mechanical QA for a generated webnotes site.
 *
 * Run from the COURSE WORKSPACE ROOT (the directory containing index.html):
 *   node webnotes-builder/scripts/qa-site.mjs
 *
 * Checks (ERROR = must fix, WARN = should look at):
 *   1. data/questions.js and data/flashcards.js parse without errors
 *   2. every .section-quiz placeholder has non-empty questions in quizData  [ERROR]
 *   3. every quizData topic/section has a placeholder somewhere             [WARN]
 *   4. in-page anchors (TOC links etc.) resolve to an element id            [ERROR]
 *   5. local *.html links resolve to existing files                        [ERROR]
 *   6. duplicate element ids within a page                                 [ERROR]
 *   7. nav.js topics[] paths point to existing files                       [ERROR]
 *   8. flashcardData topics point to existing pages                        [WARN]
 *
 * Exit code: 1 if any ERROR, else 0.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const errors = [];
const warns = [];

function err(msg) { errors.push(msg); }
function warn(msg) { warns.push(msg); }

// ── Load quiz/flashcard data via a sandboxed window ──
function loadDataFile(relPath) {
  const p = join(root, relPath);
  if (!existsSync(p)) return { missing: true, window: {} };
  const sandbox = { window: {} };
  try {
    vm.runInNewContext(readFileSync(p, 'utf8'), sandbox, { filename: relPath, timeout: 5000 });
    return { missing: false, window: sandbox.window };
  } catch (e) {
    err(`${relPath}: does not parse — ${e.message}`);
    return { missing: false, window: {}, broken: true };
  }
}

const qd = loadDataFile('data/questions.js');
const fd = loadDataFile('data/flashcards.js');
const quizData = qd.window.quizData || null;
const flashData = fd.window.flashcardData || null;
if (qd.missing) warn('data/questions.js not found — skipping quiz checks');
if (quizData && Object.keys(quizData).length === 0) warn('data/questions.js: quizData is empty');

// ── Collect HTML pages ──
const htmlFiles = readdirSync(root).filter(f => f.endsWith('.html'));
if (!htmlFiles.length) { console.error('No *.html files here — run from the course workspace root.'); process.exit(1); }

const placeholders = []; // {file, topic, section}

for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), 'utf8');

  // element ids (+ duplicates)
  const ids = new Set();
  for (const m of html.matchAll(/\bid\s*=\s*"([^"]+)"/g)) {
    if (ids.has(m[1])) err(`${file}: duplicate id "${m[1]}"`);
    ids.add(m[1]);
  }

  // in-page anchors
  for (const m of html.matchAll(/\bhref\s*=\s*"#([^"]+)"/g)) {
    if (!ids.has(m[1])) err(`${file}: anchor "#${m[1]}" has no matching id`);
  }

  // local page links (skip http, mailto, #)
  for (const m of html.matchAll(/\bhref\s*=\s*"([^"#:]+\.html)(#[^"]*)?"/g)) {
    const target = m[1];
    if (!existsSync(join(root, target))) err(`${file}: link to missing file "${target}"`);
  }

  // quiz placeholders
  for (const m of html.matchAll(/class\s*=\s*"section-quiz"[^>]*data-topic\s*=\s*"([^"]+)"[^>]*data-section\s*=\s*"([^"]+)"/g)) {
    placeholders.push({ file, topic: m[1], section: m[2] });
  }
}

// ── Placeholder ↔ quizData, both directions ──
if (quizData) {
  for (const ph of placeholders) {
    const sec = quizData[ph.topic] && quizData[ph.topic][ph.section];
    if (!sec || !Array.isArray(sec.questions) || sec.questions.length === 0) {
      err(`${ph.file}: .section-quiz [${ph.topic}/${ph.section}] has no questions in data/questions.js`);
    }
  }
  const used = new Set(placeholders.map(p => `${p.topic}/${p.section}`));
  for (const [topic, sections] of Object.entries(quizData)) {
    for (const [section, sec] of Object.entries(sections)) {
      if (sec && Array.isArray(sec.questions) && sec.questions.length && !used.has(`${topic}/${section}`)) {
        warn(`quizData[${topic}][${section}] (${sec.questions.length} q) has no .section-quiz placeholder in any page`);
      }
      // option sanity: exactly one correct per question
      (sec.questions || []).forEach((q, i) => {
        const correct = (q.options || []).filter(o => o.correct).length;
        if (correct !== 1) err(`quizData[${topic}][${section}] question ${i + 1}: ${correct} options marked correct (need exactly 1)`);
      });
    }
  }
}

// ── nav.js topic paths ──
const navPath = join(root, 'js', 'nav.js');
if (existsSync(navPath)) {
  const nav = readFileSync(navPath, 'utf8');
  for (const m of nav.matchAll(/path:\s*'([^']+\.html)'/g)) {
    if (!existsSync(join(root, m[1]))) err(`js/nav.js: topics[] path "${m[1]}" does not exist`);
  }
} else {
  warn('js/nav.js not found');
}

// ── flashcards ──
if (flashData) {
  for (const [topic, deck] of Object.entries(flashData)) {
    if (deck.page && !existsSync(join(root, deck.page))) warn(`flashcardData[${topic}].page "${deck.page}" does not exist`);
    if (!Array.isArray(deck.cards) || !deck.cards.length) warn(`flashcardData[${topic}] has no cards`);
  }
}

// ── Report ──
console.log(`qa-site: ${htmlFiles.length} pages, ${placeholders.length} quiz placeholders, ` +
  `${quizData ? Object.keys(quizData).length : 0} quiz topics, ${flashData ? Object.keys(flashData).length : 0} flashcard decks`);
for (const w of warns) console.log('  WARN  ' + w);
for (const e of errors) console.log('  ERROR ' + e);
console.log(errors.length ? `\n${errors.length} error(s), ${warns.length} warning(s) — FIX ERRORS BEFORE SHIPPING` :
  `\nNo errors, ${warns.length} warning(s) ✅`);
process.exit(errors.length ? 1 : 0);

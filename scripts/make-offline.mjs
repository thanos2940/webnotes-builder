#!/usr/bin/env node
/**
 * make-offline.mjs — Vendor CDN dependencies so the site works with no internet
 * (studying on the train / exam-day cram with no WiFi).
 *
 * Run from the COURSE WORKSPACE ROOT (needs Node 18+ for global fetch):
 *   node webnotes-builder/scripts/make-offline.mjs
 *
 * What it does:
 *   1. Downloads MathJax as the self-contained SVG bundle (tex-svg.js — no external
 *      font files needed, unlike tex-mml-chtml.js) into vendor/mathjax/.
 *   2. Downloads every Google Fonts stylesheet referenced by the pages, plus the woff2
 *      files it points to, into vendor/fonts/ (rewritten to local paths).
 *   3. Rewrites all *.html files to use the local copies.
 *
 * Idempotent: re-running skips existing downloads and leaves already-local pages as-is.
 * Roll back: git checkout the *.html files and delete vendor/.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';

async function download(url, dest, binary = false) {
  if (existsSync(dest)) { console.log('  skip (exists) ' + dest); return true; }
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = binary ? Buffer.from(await res.arrayBuffer()) : await res.text();
    writeFileSync(dest, data);
    console.log('  saved ' + dest);
    return true;
  } catch (e) {
    console.error('  FAILED ' + url + ' — ' + e.message);
    return false;
  }
}

const htmlFiles = readdirSync(root).filter(f => f.endsWith('.html'));
if (!htmlFiles.length) { console.error('No *.html here — run from the course workspace root.'); process.exit(1); }

mkdirSync(join(root, 'vendor', 'mathjax'), { recursive: true });
mkdirSync(join(root, 'vendor', 'fonts'), { recursive: true });

// ── 1. MathJax (single-file SVG output, no font downloads needed) ──
const mathjaxLocal = 'vendor/mathjax/tex-svg.js';
let usesMathjax = htmlFiles.some(f => /cdn\.jsdelivr\.net\/npm\/mathjax@3/.test(readFileSync(join(root, f), 'utf8')));
if (usesMathjax) {
  console.log('MathJax:');
  await download('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', join(root, mathjaxLocal));
}

// ── 2. Google Fonts CSS + woff2 files ──
const fontCssUrls = new Set();
for (const f of htmlFiles) {
  const html = readFileSync(join(root, f), 'utf8');
  for (const m of html.matchAll(/href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/g)) {
    fontCssUrls.add(m[1].replaceAll('&amp;', '&'));
  }
}

const cssUrlToLocal = new Map();
let cssIndex = 0;
for (const cssUrl of fontCssUrls) {
  console.log('Fonts CSS: ' + cssUrl.slice(0, 90) + '…');
  let css;
  try {
    const res = await fetch(cssUrl, { headers: { 'User-Agent': UA } }); // UA → woff2 variant
    if (!res.ok) throw new Error('HTTP ' + res.status);
    css = await res.text();
  } catch (e) { console.error('  FAILED — ' + e.message); continue; }

  // download each font file, rewrite the css to local relative paths
  const fontUrls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1]))];
  for (const fu of fontUrls) {
    const name = fu.split('/').slice(-2).join('-'); // e.g. jetbrainsmono-v18-abc.woff2
    if (await download(fu, join(root, 'vendor', 'fonts', name), true)) {
      css = css.replaceAll(fu, name); // css sits in the same dir as the fonts
    }
  }
  const localCss = 'vendor/fonts/fonts-' + (cssIndex++) + '.css';
  writeFileSync(join(root, localCss), css);
  console.log('  saved ' + localCss);
  cssUrlToLocal.set(cssUrl, localCss);
}

// ── 3. Rewrite the HTML files ──
let rewritten = 0;
for (const f of htmlFiles) {
  const p = join(root, f);
  let html = readFileSync(p, 'utf8');
  const before = html;

  if (usesMathjax) {
    html = html.replace(/src="https:\/\/cdn\.jsdelivr\.net\/npm\/mathjax@3\/es5\/[^"]+"/g, `src="${mathjaxLocal}"`);
  }
  for (const [cssUrl, localCss] of cssUrlToLocal) {
    html = html.replaceAll(cssUrl, localCss).replaceAll(cssUrl.replaceAll('&', '&amp;'), localCss);
  }
  // drop now-useless preconnect hints
  html = html.replace(/^\s*<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\s*\n/gm, '');

  if (html !== before) { writeFileSync(p, html); rewritten++; console.log('rewrote ' + f); }
}

console.log(`\nDone: ${rewritten} page(s) rewritten. The site now loads MathJax + fonts from vendor/ — no internet needed.`);

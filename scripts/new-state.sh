#!/usr/bin/env bash
#
# new-state.sh — Create a fresh _build/STATE.md from a template.
#
# Usage:
#   bash webnotes-skill/scripts/new-state.sh "Course Title" "el" "standard"
#
# Args:
#   $1 — Course title
#   $2 — Language code (el / en / mixed)
#   $3 — Depth (terse / standard / encyclopedic)
#
# Output:
#   Creates _build/STATE.md in the parent directory (../_build/STATE.md
#   relative to webnotes-skill/scripts/).

set -euo pipefail

TITLE="${1:-Course Title}"
LANG="${2:-en}"
DEPTH="${3:-standard}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# scripts/ is at the extension root, so the workspace (course folder)
# is one level up — unless the extension is installed at ~/.gemini/extensions/
# in which case the user should pass the workspace path explicitly.
PARENT_DIR="${WORKSPACE:-$(cd "$SCRIPT_DIR/.." && pwd)}"
# If we ended up pointing at the extension root, assume PWD is the workspace
if [ -f "$PARENT_DIR/gemini-extension.json" ]; then
    PARENT_DIR="$(pwd)"
fi
BUILD_DIR="$PARENT_DIR/_build"

mkdir -p "$BUILD_DIR"

cat > "$BUILD_DIR/STATE.md" <<EOF
# Build State

## Course metadata
- Title: $TITLE
- Language: $LANG
- Depth: $DEPTH
- Source: ./slides/   (adjust if different)
- Skill version: 1.2.0
- Started: $(date +%Y-%m-%d)

## Phases
- [ ] 1. Discovery (mode: CREATE | ENHANCE; exam material: yes/no)
- [ ] 2. Plan approved
- [ ] 3. Scaffolding
- [ ] 4. Chapters
- [ ] 5. Exam prep (exam_prep.html + Exam Focus boxes) — skip only if no exam material
- [ ] 6. Cross-chapter quiz
- [ ] 7. Final QA

## Chapter table
| # | Source PDF | Slug | Outline | HTML | Quiz | Reviewer | Notes |
|---|------------|------|---------|------|------|----------|-------|
| - | (run Discovery to populate) |

## Last completed action
- (none yet)

## Next action
Start Discovery phase: read all source PDFs and propose chapter plan.

## Open questions
- (none)

## Known issues
- (none)

## Fidelity coverage
- (per chapter, populated after each Reviewer pass)
EOF

echo "✅ Created $BUILD_DIR/STATE.md"
echo ""
echo "Now tell the agent:"
echo '  "Read webnotes-skill/SKILL.md and start the Discovery phase."'

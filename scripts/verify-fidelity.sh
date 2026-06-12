#!/usr/bin/env bash
#
# verify-fidelity.sh — Quick coverage check for a chapter
#
# Usage:
#   bash scripts/verify-fidelity.sh <chapter_html> <fidelity_md>
#
# Example:
#   bash webnotes-skill/scripts/verify-fidelity.sh \
#        topic4_prolog.html \
#        _build/topic4_fidelity.md
#
# What it does:
#   - Reads the fidelity checklist (markdown with checkbox lines)
#   - For each [ ] line, extracts the key phrase
#   - Greps the HTML for that phrase
#   - Reports missing items
#
# This is an APPROXIMATE check. The reviewer pass (see references/10-reviewer-pass.md)
# is the authoritative verification.

set -euo pipefail

if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <chapter_html> <fidelity_md>"
    exit 1
fi

HTML="$1"
FIDELITY="$2"

if [ ! -f "$HTML" ]; then
    echo "❌ HTML file not found: $HTML"
    exit 1
fi

if [ ! -f "$FIDELITY" ]; then
    echo "❌ Fidelity checklist not found: $FIDELITY"
    exit 1
fi

echo "🔍 Fidelity check: $HTML against $FIDELITY"
echo ""

total=0
missing=0
present=0
missing_items=()

while IFS= read -r line; do
    # Match unchecked items: - [ ] [page N] Phrase here
    # or:                   - [x] [page N] Phrase here
    if [[ "$line" =~ ^-\ \[[\ x]\]\ (.*)$ ]]; then
        item="${BASH_REMATCH[1]}"
        # Strip [page N] prefix
        clean_item=$(echo "$item" | sed -E 's/\[page [0-9]+\] *//')
        # Extract a short key phrase (first 3-5 meaningful words)
        key=$(echo "$clean_item" | awk '{print $1, $2, $3}' | sed 's/[^a-zA-Z0-9 _-]//g')

        total=$((total + 1))

        # Check if any reasonably-distinctive substring of the item is in the HTML
        # (case-insensitive, ignoring HTML tags)
        if grep -qiF "$key" "$HTML" 2>/dev/null; then
            present=$((present + 1))
        else
            missing=$((missing + 1))
            missing_items+=("$clean_item")
        fi
    fi
done < "$FIDELITY"

echo "📊 Results:"
echo "   Total items:   $total"
echo "   Present:       $present"
echo "   Missing:       $missing"
echo ""

if [ "$missing" -gt 0 ]; then
    echo "⚠️  Missing items (may be false positives — verify manually):"
    for item in "${missing_items[@]}"; do
        echo "   - $item"
    done
    echo ""
    echo "Run the reviewer pass (see references/10-reviewer-pass.md) to confirm."
    exit 1
fi

echo "✅ All checklist items appear in the HTML (approximate check)."
echo "Still recommended: full reviewer pass (references/10-reviewer-pass.md)."

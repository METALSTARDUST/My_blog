#!/usr/bin/env bash
# Heuristic duplication scan for the AgroPilot monorepo.
# Usage:
#   bash .claude/skills/dry-code-review/scripts/find_duplicates.sh <directory> "ts,tsx,js,jsx,json,sql,md"

set -euo pipefail

TARGET_DIR="${1:-.}"
EXTENSIONS="${2:-ts,tsx,js,jsx,json,sql,md}"
MIN_LINE_LENGTH="${MIN_LINE_LENGTH:-24}"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: directory '$TARGET_DIR' does not exist."
  exit 1
fi

tmp_files="$(mktemp)"
tmp_lines="$(mktemp)"
tmp_literals="$(mktemp)"
tmp_funcs="$(mktemp)"
trap 'rm -f "$tmp_files" "$tmp_lines" "$tmp_literals" "$tmp_funcs"' EXIT

find_ext_args=()
old_ifs="$IFS"
IFS=","
for ext in $EXTENSIONS; do
  if [ "${#find_ext_args[@]}" -gt 0 ]; then
    find_ext_args+=("-o")
  fi
  find_ext_args+=("-name" "*.${ext}")
done
IFS="$old_ifs"

find "$TARGET_DIR" -type f \
  \( "${find_ext_args[@]}" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/dist/*" \
  ! -path "*/build/*" \
  ! -path "*/coverage/*" \
  ! -path "*/playwright-report/*" \
  ! -path "*/test-results/*" \
  ! -path "*/.vercel/*" \
  ! -path "*/.data/*" \
  ! -name "*.map" \
  ! -name "*.min.*" \
  ! -name "*.d.ts" \
  | sort > "$tmp_files"

file_count="$(wc -l < "$tmp_files" | tr -d ' ')"

if [ "$file_count" -eq 0 ]; then
  echo "No files found for extensions: $EXTENSIONS"
  exit 0
fi

total_lines=0
while IFS= read -r file; do
  lines="$(wc -l < "$file" | tr -d ' ')"
  total_lines=$((total_lines + lines))
done < "$tmp_files"

echo "DRY scan"
echo "Scope: $TARGET_DIR"
echo "Extensions: $EXTENSIONS"
echo "Files: $file_count"
echo "Lines: $total_lines"
echo

echo "1. Lines repeated in 3 or more locations"
while IFS= read -r file; do
  awk -v file="$file" -v minlen="$MIN_LINE_LENGTH" '
    {
      trimmed = $0
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", trimmed)
      if (length(trimmed) < minlen) next
      if (length(trimmed) == 1 && index("{}()[];,", trimmed) > 0) next
      if (trimmed ~ /^(import |export .* from |from |require\()/) next
      if (trimmed ~ /^(describe\(|it\(|test\()/) next
      if (trimmed ~ /^\/\//) next
      if (trimmed ~ /^#/) next
      if (trimmed ~ /^\*/) next
      print trimmed "\t" file ":" NR
    }
  ' "$file" >> "$tmp_lines"
done < "$tmp_files"

if [ -s "$tmp_lines" ]; then
  cut -f1 "$tmp_lines" | sort | uniq -c | sort -rn | head -40 | while read -r count line; do
    if [ "$count" -ge 3 ]; then
      echo "[$count occurrences] $line"
      awk -F '\t' -v pattern="$line" '$1 == pattern {print "  - " $2}' "$tmp_lines" | head -8
      echo
    fi
  done
else
  echo "No relevant repeated lines found."
  echo
fi

echo "2. Literals repeated in 3 or more locations"
while IFS= read -r file; do
  grep -nE '"[^"]{4,}"|'\''[^'\'']{4,}'\''' "$file" 2>/dev/null \
    | awk -F ':' -v file="$file" '{line=$1; $1=""; sub(/^:/, ""); print $0 "\t" file ":" line}' \
    >> "$tmp_literals" || true
done < "$tmp_files"

if [ -s "$tmp_literals" ]; then
  cut -f1 "$tmp_literals" | sort | uniq -c | sort -rn | head -30 | while read -r count literal; do
    if [ "$count" -ge 3 ]; then
      echo "[$count times] $literal"
      awk -F '\t' -v pattern="$literal" '$1 == pattern {print "  - " $2}' "$tmp_literals" | head -6
      echo
    fi
  done
else
  echo "No relevant repeated literals found."
  echo
fi

echo "3. Similar function signatures"
while IFS= read -r file; do
  grep -nE '^[[:space:]]*(export[[:space:]]+)?(async[[:space:]]+)?function[[:space:]]+[A-Za-z0-9_]+|^[[:space:]]*(const|let)[[:space:]]+[A-Za-z0-9_]+[[:space:]]*=[[:space:]]*(async[[:space:]]*)?\(' "$file" 2>/dev/null \
    | awk -F ':' -v file="$file" '{line=$1; $1=""; sub(/^:/, ""); print $0 "\t" file ":" line}' \
    >> "$tmp_funcs" || true
done < "$tmp_files"

if [ -s "$tmp_funcs" ]; then
  cut -f1 "$tmp_funcs" | sed 's/[[:space:]]//g' | sort | uniq -c | sort -rn | head -25 | while read -r count sig; do
    if [ "$count" -ge 2 ]; then
      echo "[$count matches] $sig"
      awk -F '\t' -v pattern="$sig" '{key=$1; gsub(/[[:space:]]/, "", key); if (key == pattern) print "  - " $2}' "$tmp_funcs" | head -8
      echo
    fi
  done
else
  echo "No similar function signatures found."
  echo
fi

echo "Scan finished. Review manually before classifying findings."

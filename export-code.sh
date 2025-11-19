#!/bin/bash

# Script to export all .tsx and .css files to a single .txt file
# Usage: ./export-code.sh [output-file]

OUTPUT_FILE="${1:-code-export.txt}"
PROJECT_DIR="$(pwd)"

echo "Exporting all .tsx and .css files to $OUTPUT_FILE..."

# Remove existing output file if it exists
rm -f "$OUTPUT_FILE"

# Find all .tsx files (excluding node_modules, dist, build, .git)
find "$PROJECT_DIR" -type f -name "*.tsx" \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -not -path "*/.git/*" \
    -not -path "*/.next/*" \
    | while read -r file; do
    # Get relative path from project directory
    rel_path="${file#$PROJECT_DIR/}"
    
    echo "=========================================" >> "$OUTPUT_FILE"
    echo "FILE: $rel_path" >> "$OUTPUT_FILE"
    echo "=========================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

# Find all .css files (excluding node_modules, dist, build, .git)
find "$PROJECT_DIR" -type f -name "*.css" \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -not -path "*/.git/*" \
    -not -path "*/.next/*" \
    | while read -r file; do
    # Get relative path from project directory
    rel_path="${file#$PROJECT_DIR/}"
    
    echo "=========================================" >> "$OUTPUT_FILE"
    echo "FILE: $rel_path" >> "$OUTPUT_FILE"
    echo "=========================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "Export complete! Output saved to: $OUTPUT_FILE"
echo "Total files exported: $(grep -c "^FILE:" "$OUTPUT_FILE" 2>/dev/null || echo "0")"


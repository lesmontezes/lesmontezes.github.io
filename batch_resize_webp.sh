#!/usr/bin/env bash
# Usage: ./batch_resize_webp.sh
# Converts photos from photos_orig/${folder} to photos/${folder}/400|800|1600/

set -euo pipefail

if command -v magick >/dev/null 2>&1; then
  IM_CMD="magick"
elif command -v convert >/dev/null 2>&1; then
  IM_CMD="convert"
else
  echo "Error: ImageMagick binary not found in PATH (expected 'magick' or 'convert')." >&2
  exit 1
fi

# Define folders to process
folders=("appart" "gite0" "gite1")

for fold in "${folders[@]}"; do
  in_dir="photos_orig/${fold}"
  out_dir="photos/${fold}"

  echo "Processing folder: ${fold}"

  # Skip if input directory doesn't exist
  if [ ! -d "$in_dir" ]; then
    echo "  Warning: ${in_dir} does not exist, skipping..."
    continue
  fi

  # Create output directories
  mkdir -p "$out_dir"/400 "$out_dir"/800 "$out_dir"/1600

  shopt -s nullglob
  photo_count=0
  for f in "$in_dir"/*.[Jj][Pp][Gg] "$in_dir"/*.[Jj][Pp][Ee][Gg]; do
    base=$(basename "$f")
    name="${base%.*}"

    echo -n "  ${name} "

    "$IM_CMD" "$f" -auto-orient -strip -resize 400x  -quality 80 "$out_dir/400/${name}-400.webp"
    "$IM_CMD" "$f" -auto-orient -strip -resize 800x  -quality 80 "$out_dir/800/${name}-800.webp"
    "$IM_CMD" "$f" -auto-orient -strip -resize 1600x -quality 80 "$out_dir/1600/${name}-1600.webp"

    echo "✓"
    photo_count=$((photo_count + 1))
  done
  shopt -u nullglob

  echo "  Processed ${photo_count} photos in ${fold}"
  echo ""
done

echo "All folders processed successfully!"

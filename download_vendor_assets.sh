#!/usr/bin/env bash
# Usage: ./download_vendor_assets.sh
# Downloads third-party front-end assets into assets/vendor/ so the site has
# no runtime dependency on external CDNs.
#
# Re-run this script whenever you want to update a library version.
# After updating, also bump the references in:
#   - _layouts/default.html      (CSS link href)
#   - assets/js/logement-photoswipe.js  (ESM import paths)

set -euo pipefail
# Change to the directory where this script is located to make execution location-independent
cd "$(dirname "$0")"


if ! command -v curl >/dev/null 2>&1; then
  echo "Error: 'curl' not found in PATH." >&2
  exit 1
fi

# ── PhotoSwipe ──────────────────────────────────────────────────────────────
PSWP_VERSION="5.4.4"
PSWP_BASE="https://unpkg.com/photoswipe@${PSWP_VERSION}/dist"
PSWP_OUT="assets/vendor/photoswipe"

mkdir -p "$PSWP_OUT"

echo "Downloading PhotoSwipe ${PSWP_VERSION}..."

curl -fsSL "${PSWP_BASE}/photoswipe.css"                   -o "${PSWP_OUT}/photoswipe.css"
curl -fsSL "${PSWP_BASE}/photoswipe.esm.min.js"            -o "${PSWP_OUT}/photoswipe.esm.min.js"
curl -fsSL "${PSWP_BASE}/photoswipe-lightbox.esm.min.js"   -o "${PSWP_OUT}/photoswipe-lightbox.esm.min.js"

echo "  ✓ ${PSWP_OUT}/photoswipe.css"
echo "  ✓ ${PSWP_OUT}/photoswipe.esm.min.js"
echo "  ✓ ${PSWP_OUT}/photoswipe-lightbox.esm.min.js"

# ── Add further libraries here following the same pattern ───────────────────

echo ""
echo "All vendor assets downloaded successfully."

const scriptEl = document.getElementById('logement-photoswipe-script');
const fallbackLightboxModuleUrl = new URL('../vendor/photoswipe/photoswipe-lightbox.esm.min.js', import.meta.url).toString();
const fallbackPswpModuleUrl = new URL('../vendor/photoswipe/photoswipe.esm.min.js', import.meta.url).toString();
const lightboxModuleUrl = scriptEl?.dataset.lightboxModule || fallbackLightboxModuleUrl;
const pswpModuleUrl = scriptEl?.dataset.pswpModule || fallbackPswpModuleUrl;

async function initLightbox() {
  const { default: PhotoSwipeLightbox } = await import(lightboxModuleUrl);

  const lightbox = new PhotoSwipeLightbox({
    gallery: '.pswp-gallery',
    children: 'a',
    showHideAnimationType: 'zoom',
    showAnimationDuration: 420,
    hideAnimationDuration: 420,
    // Keep a small margin around images and preserve ratio.
    padding: { top: 24, bottom: 24, left: 24, right: 24 },
    // Spacing between slides and allow pan to next slide for swipe-like behavior.
    spacing: 0.12,
    allowPanToNext: true,
    pswpModule: () => import(pswpModuleUrl)
  });

  lightbox.init();
}

async function initializeGallery() {
  // Set anchor sizes first, then initialize lightbox to ensure
  // anchors have data-pswp-width/height before lightbox can be triggered
  initAnchorSizes();
  try {
    await initLightbox();
  } catch (err) {
    console.error('PhotoSwipe initialization failed:', err);
  }
}

// Wait for DOM to be ready before initializing gallery
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
  initializeGallery();
}

function getLargestSrcsetWidth(srcset) {
  if (!srcset) return null;
  let maxWidth = 0;
  srcset.split(',').forEach((entry) => {
    const match = entry.trim().match(/\s(\d+)w$/);
    if (match) {
      const width = Number.parseInt(match[1], 10);
      if (Number.isFinite(width) && width > maxWidth) maxWidth = width;
    }
  });
  return maxWidth || null;
}

function inferTargetWidth(anchor, thumb) {
  const srcsetWidth = getLargestSrcsetWidth(thumb.getAttribute('srcset'));
  if (srcsetWidth) return srcsetWidth;

  const href = anchor.getAttribute('href') || '';
  const hrefWidthMatch = href.match(/-(\d+)\.[a-z0-9]+(?:\?.*)?$/i);
  if (hrefWidthMatch) {
    const hrefWidth = Number.parseInt(hrefWidthMatch[1], 10);
    if (Number.isFinite(hrefWidth) && hrefWidth > 0) return hrefWidth;
  }

  return thumb.naturalWidth || null;
}

function setAnchorSizeFromThumb(anchor) {
  if (anchor.dataset.pswpWidth && anchor.dataset.pswpHeight) return;

  const thumb = anchor.querySelector('img');
  if (!thumb) return;

  const declaredWidth = Number.parseInt(thumb.getAttribute('width') || '', 10);
  const declaredHeight = Number.parseInt(thumb.getAttribute('height') || '', 10);
  if (Number.isFinite(declaredWidth) && declaredWidth > 0 && Number.isFinite(declaredHeight) && declaredHeight > 0) {
    const targetWidth = inferTargetWidth(anchor, thumb) || declaredWidth;
    const targetHeight = Math.round((declaredHeight / declaredWidth) * targetWidth);
    anchor.setAttribute('data-pswp-width', String(targetWidth));
    anchor.setAttribute('data-pswp-height', String(targetHeight));
    return;
  }

  // If dimensions are not declared and the lazy thumbnail is not loaded yet,
  // set a synchronous fallback to avoid PhotoSwipe opening with 0x0 sizing.
  const fallbackTargetWidth = inferTargetWidth(anchor, thumb) || 1600;
  const fallbackTargetHeight = Math.round((3 / 4) * fallbackTargetWidth);
  anchor.setAttribute('data-pswp-width', String(fallbackTargetWidth));
  anchor.setAttribute('data-pswp-height', String(fallbackTargetHeight));

  const applySize = function () {
    const nw = thumb.naturalWidth;
    const nh = thumb.naturalHeight;
    if (!nw || !nh) return;

    const targetWidth = inferTargetWidth(anchor, thumb);
    if (!targetWidth) return;

    const targetHeight = Math.round((nh / nw) * targetWidth);
    anchor.setAttribute('data-pswp-width', String(targetWidth));
    anchor.setAttribute('data-pswp-height', String(targetHeight));
  };

  if (thumb.complete) {
    applySize();
  } else {
    thumb.addEventListener('load', applySize, { once: true });
  }
}

function initAnchorSizes() {
  const anchors = document.querySelectorAll('.pswp-gallery a');
  anchors.forEach(setAnchorSizeFromThumb);
}

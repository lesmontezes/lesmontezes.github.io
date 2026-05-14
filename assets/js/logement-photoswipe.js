import PhotoSwipeLightbox from '/assets/vendor/photoswipe/photoswipe-lightbox.esm.min.js';

const lightbox = new PhotoSwipeLightbox({
  gallery: '.pswp-gallery',
  children: 'a',
  showHideAnimationType: 'zoom',
  showAnimationDuration: 420,
  hideAnimationDuration: 420,
  // Keep a small margin around images and preserve ratio.
  paddingFn: () => ({ top: 24, bottom: 24, left: 24, right: 24 }),
  // Spacing between slides and allow pan to next slide for swipe-like behavior.
  spacing: 0.12,
  allowPanToNext: true,
  pswpModule: () => import('/assets/vendor/photoswipe/photoswipe.esm.min.js')
});

lightbox.init();

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

document.addEventListener('DOMContentLoaded', function () {
  const anchors = document.querySelectorAll('.pswp-gallery a');
  anchors.forEach(setAnchorSizeFromThumb);
});

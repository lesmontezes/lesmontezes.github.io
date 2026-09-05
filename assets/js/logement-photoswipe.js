const scriptEl = document.getElementById('logement-photoswipe-script');
const fallbackLightboxModuleUrl = new URL('../vendor/photoswipe/photoswipe-lightbox.esm.min.js', import.meta.url).toString();
const fallbackPswpModuleUrl = new URL('../vendor/photoswipe/photoswipe.esm.min.js', import.meta.url).toString();
const lightboxModuleUrl = scriptEl?.dataset.lightboxModule || fallbackLightboxModuleUrl;
const pswpModuleUrl = scriptEl?.dataset.pswpModule || fallbackPswpModuleUrl;
const galleryTitle = scriptEl?.dataset.galleryTitle || '';

async function initLightbox() {
  const { default: PhotoSwipeLightbox } = await import(lightboxModuleUrl);

  const lightbox = new PhotoSwipeLightbox({
    gallery: '.pswp-gallery',
    children: 'a',
    showHideAnimationType: 'zoom',
    showAnimationDuration: 420,
    hideAnimationDuration: 420,
    padding: { top: 24, bottom: 24, left: 24, right: 24 },
    spacing: 0.12,
    allowPanToNext: true,
    pswpModule: () => import(pswpModuleUrl)
  });

  lightbox.on('uiRegister', () => {
    lightbox.pswp.ui.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: '',
      onInit: (el, pswp) => {
        const updateCaption = () => {
          const anchor = pswp.currSlide?.data?.element;
          const sectionTitle = anchor?.getAttribute('data-section-title') || '';
          el.textContent = [galleryTitle, sectionTitle].filter(Boolean).join(' — ');
        };
        updateCaption();
        pswp.on('change', updateCaption);
      }
    });
  });

  lightbox.init();
}

initLightbox().catch((err) => {
  console.error('PhotoSwipe initialization failed:', err);
});

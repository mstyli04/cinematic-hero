import './styles/main.css';
import { enhanceHeroTitle } from './ui/heroTitle.js';
import { initContentAnimations } from './ui/contentSection.js';
import { initFooterAnimations } from './ui/footer.js';
import { initMagneticLinks } from './ui/cursor.js';
import { createScrollTimeline } from './scroll/scrollTimeline.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const heroTitle = enhanceHeroTitle({ animate: !reducedMotion });

let sceneHooks = null;
let scrollProgress = 0;
if (!reducedMotion) {
  createScrollTimeline({
    heroEl: document.getElementById('hero'),
    onHeroProgress: (progress) => {
      heroTitle.setProgress(progress);
      scrollProgress = progress / 3;
      if (sceneHooks) sceneHooks.setProgress(progress);
    },
  });
}

initContentAnimations({ animate: !reducedMotion });
initFooterAnimations({ animate: !reducedMotion });

if (!reducedMotion) {
  initMagneticLinks('.navbar__links a');
  initMagneticLinks('.footer__links a');
}

// Three.js and the whole WebGL scene are code-split behind a dynamic import
// so the static text paints and reads before (or without) them; the scene
// is decorative, so a failed load leaves a fully usable page.
import('./scene/sceneApp.js')
  .then(({ initScene }) => {
    sceneHooks = initScene({
      canvas: document.getElementById('scene'),
      reducedMotion,
      getScrollProgress: () => scrollProgress,
    });
  })
  .catch(() => {});

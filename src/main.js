import './styles/main.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { getDeviceTier } from './scene/deviceTier.js';
import { ParticleField } from './scene/ParticleField.js';
import { createRenderer } from './scene/renderer.js';
import { createScrollTimeline } from './scroll/scrollTimeline.js';
import { createNavbar, computeFps } from './ui/navbar.js';
import { createContentSection } from './ui/contentSection.js';
import { createFooter } from './ui/footer.js';
import { createHeroTitle } from './ui/heroTitle.js';
import { initCursorParallax, initMagneticLinks } from './ui/cursor.js';
import { initClickRipple } from './ui/ripple.js';
import { debounce } from './scene/debounce.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const tier = getDeviceTier({
  width: window.innerWidth,
  cores: navigator.hardwareConcurrency || 4,
});

const canvas = document.getElementById('scene');
const particleField = new ParticleField({ count: tier.particleCount });
const { scene, composer, camera } = createRenderer(canvas, { bloom: tier.bloom });

scene.add(particleField.mesh);

const navbar = createNavbar({ particleCount: tier.particleCount });
if (reducedMotion) {
  document.querySelector('.stats-hud').style.display = 'none';
}
const heroTitle = createHeroTitle({ animate: !reducedMotion });

let scrollProgress = 0;
if (!reducedMotion) {
  createScrollTimeline({
    heroEl: document.getElementById('hero'),
    onHeroProgress: (progress) => {
      particleField.setProgress(progress);
      heroTitle.setProgress(progress);
      document.documentElement.style.setProperty('--scene-tint', particleField.getTintCss());
      scrollProgress = progress / 3;
    },
  });
}
createContentSection({ animate: !reducedMotion });
createFooter({ animate: !reducedMotion });
if (!reducedMotion) {
  initCursorParallax(particleField.mesh);
  initMagneticLinks('.navbar__links a');
  initMagneticLinks('.footer__links a');
  initClickRipple({
    heroEl: document.getElementById('hero'),
    mesh: particleField.mesh,
    camera,
    particleField,
  });
}

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  if (!reducedMotion) particleField.update(delta);
  navbar.updateStats({ fps: computeFps(delta), scrollProgress });
  composer.render();
  requestAnimationFrame(animate);
}

let assemblyTween = null;
if (reducedMotion) {
  particleField.setAssembly(1);
  requestAnimationFrame(() => composer.render());
  window.addEventListener('resize', debounce(() => composer.render(), 200));
} else {
  requestAnimationFrame(animate);
  const assembly = { value: 0 };
  assemblyTween = gsap.to(assembly, {
    value: 1,
    duration: 1.8,
    ease: 'power3.out',
    onUpdate: () => particleField.setAssembly(assembly.value),
  });
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (assemblyTween) assemblyTween.kill();
    particleField.dispose();
  });
}

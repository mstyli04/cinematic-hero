import './styles/main.css';
import * as THREE from 'three';
import { getDeviceTier } from './scene/deviceTier.js';
import { ParticleField } from './scene/ParticleField.js';
import { createRenderer } from './scene/renderer.js';
import { createScrollTimeline } from './scroll/scrollTimeline.js';

const tier = getDeviceTier({
  width: window.innerWidth,
  cores: navigator.hardwareConcurrency || 4,
});

const canvas = document.getElementById('scene');
const particleField = new ParticleField({ count: tier.particleCount });
const { scene, composer } = createRenderer(canvas, { bloom: tier.bloom });

scene.add(particleField.mesh);

createScrollTimeline({
  heroEl: document.getElementById('hero'),
  onHeroProgress: (progress) => particleField.setProgress(progress),
});

const clock = new THREE.Clock();

function animate() {
  const delta = clock.getDelta();
  particleField.update(delta);
  composer.render();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

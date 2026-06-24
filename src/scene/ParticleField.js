import * as THREE from 'three';
import { ring, cubeOutline, starfield } from './shapes.js';
import vertexShader from './particle.vert.glsl?raw';
import fragmentShader from './particle.frag.glsl?raw';

export class ParticleField {
  constructor({ count, colorHex = 0xbfe6ff } = {}) {
    this.count = count;

    const positionA = ring(count);
    const positionB = cubeOutline(count);
    const positionC = starfield(count);

    const phase = new Float32Array(count);
    for (let i = 0; i < count; i += 1) phase[i] = Math.random() * Math.PI * 2;

    this.geometry = new THREE.BufferGeometry();
    // 'position' is required by THREE to know the vertex count for the draw
    // call; the shader ignores it in favor of positionA/B/C below.
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positionA.slice(), 3));
    this.geometry.setAttribute('positionA', new THREE.BufferAttribute(positionA, 3));
    this.geometry.setAttribute('positionB', new THREE.BufferAttribute(positionB, 3));
    this.geometry.setAttribute('positionC', new THREE.BufferAttribute(positionC, 3));
    this.geometry.setAttribute('phase', new THREE.BufferAttribute(phase, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(colorHex) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
  }

  setProgress(progress) {
    this.material.uniforms.uProgress.value = progress;
  }

  update(deltaSeconds) {
    this.material.uniforms.uTime.value += deltaSeconds;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

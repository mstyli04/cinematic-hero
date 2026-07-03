// uProgress in [0, 3]: 0..1 morphs positionA->positionB, 1..2 morphs
// positionB->positionC, 2..3 morphs positionC->positionD. Set by
// ParticleField.setProgress(), driven by scrollTimeline.js's
// heroProgressToShaderProgress(). To add a 5th scene: add positionE,
// extend the range to [0,4], and add one more step() stage below.
uniform float uProgress;
uniform float uTime;

attribute vec3 positionA;
attribute vec3 positionB;
attribute vec3 positionC;
attribute vec3 positionD;
attribute float phase;

varying float vAlpha;

void main() {
  // Clamp below 3.0, not at it: floor(3.0) would select a nonexistent
  // fourth segment, freezing the morph instead of resolving to positionD.
  float seg = clamp(uProgress, 0.0, 2.9999);
  float segIndex = floor(seg);
  float segFract = seg - segIndex;
  float s1 = step(0.5, segIndex);
  float s2 = step(1.5, segIndex);

  vec3 fromPos = mix(positionA, mix(positionB, positionC, s2), s1);
  vec3 toPos = mix(positionB, mix(positionC, positionD, s2), s1);
  vec3 morphed = mix(fromPos, toPos, segFract);

  float angle = uTime * 0.05;
  float c = cos(angle);
  float s = sin(angle);
  vec3 rotated = vec3(
    morphed.x * c - morphed.z * s,
    morphed.y,
    morphed.x * s + morphed.z * c
  );

  vec4 mvPosition = modelViewMatrix * vec4(rotated, 1.0);
  gl_PointSize = (2.0 + 1.5 * sin(uTime * 1.5 + phase)) * (10.0 / -mvPosition.z);
  vAlpha = 0.6 + 0.4 * sin(uTime * 1.5 + phase);
  gl_Position = projectionMatrix * mvPosition;
}

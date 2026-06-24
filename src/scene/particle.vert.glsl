// uProgress in [0, 2]: 0..1 morphs positionA->positionB, 1..2 morphs
// positionB->positionC. Set by ParticleField.setProgress(), which is in
// turn driven by scrollTimeline.js's heroProgressToShaderProgress(). To add
// a 4th scene later: add positionD, extend the range to [0,3], and add one
// more mix() stage below following the same step()-based pattern.
uniform float uProgress;
uniform float uTime;

attribute vec3 positionA;
attribute vec3 positionB;
attribute vec3 positionC;
attribute float phase;

varying float vAlpha;

void main() {
  // Clamp below 2.0, not at it: floor(2.0) would select a nonexistent third
  // segment, freezing the morph instead of resolving to fully positionC.
  float seg = clamp(uProgress, 0.0, 1.9999);
  float segIndex = floor(seg);
  float segFract = seg - segIndex;
  float isSecondSegment = step(0.5, segIndex);

  vec3 fromPos = mix(positionA, positionB, isSecondSegment);
  vec3 toPos = mix(positionB, positionC, isSecondSegment);
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

export function computeFps(deltaSeconds) {
  if (deltaSeconds <= 0) return 0;
  return Math.round(1 / deltaSeconds);
}

// The nav itself is static HTML; only the decorative stats HUD is
// JS-created, since it is meaningless without a running render loop.
export function createStatsHud({ particleCount }) {
  const hud = document.createElement('div');
  hud.className = 'stats-hud';
  hud.innerHTML = `
    <span data-stat="fps">FPS --</span>
    <span data-stat="particles">PTS ${particleCount}</span>
    <span data-stat="scroll">SCROLL 0%</span>
  `;
  document.body.appendChild(hud);

  const fpsEl = hud.querySelector('[data-stat="fps"]');
  const scrollEl = hud.querySelector('[data-stat="scroll"]');

  return {
    updateStats({ fps, scrollProgress }) {
      fpsEl.textContent = `FPS ${fps}`;
      scrollEl.textContent = `SCROLL ${Math.round(scrollProgress * 100)}%`;
    },
  };
}

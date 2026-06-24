export function computeFps(deltaSeconds) {
  if (deltaSeconds <= 0) return 0;
  return Math.round(1 / deltaSeconds);
}

export function createNavbar({ particleCount }) {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.innerHTML = `
    <span class="navbar__logo">STYLI</span>
    <div class="navbar__links">
      <a href="#work">WORK</a>
      <a href="mailto:michael.stylianou7@gmail.com">CONTACT</a>
    </div>
  `;

  const hud = document.createElement('div');
  hud.className = 'stats-hud';
  hud.innerHTML = `
    <span data-stat="fps">FPS --</span>
    <span data-stat="particles">PTS ${particleCount}</span>
    <span data-stat="scroll">SCROLL 0%</span>
  `;

  document.body.append(nav, hud);

  const fpsEl = hud.querySelector('[data-stat="fps"]');
  const scrollEl = hud.querySelector('[data-stat="scroll"]');

  return {
    updateStats({ fps, scrollProgress }) {
      fpsEl.textContent = `FPS ${fps}`;
      scrollEl.textContent = `SCROLL ${Math.round(scrollProgress * 100)}%`;
    },
  };
}

export function createHeroTitle() {
  const el = document.createElement('div');
  el.className = 'hero-title';
  el.innerHTML = `
    <h1>MICHAEL STYLIANOU</h1>
  `;
  document.getElementById('hero').appendChild(el);

  return {
    el,
    // progress is the [0,3] shader progress; the title is fully gone by
    // 0.35 (~12% of the pin) so the name owns the first screen only.
    setProgress(progress) {
      const t = Math.min(progress / 0.35, 1);
      el.style.opacity = 1 - t;
      el.style.transform = `translateY(${t * -30}px)`;
    },
  };
}

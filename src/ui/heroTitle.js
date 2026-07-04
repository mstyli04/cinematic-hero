import gsap from 'gsap';

const NAME = 'MICHAEL STYLIANOU';

export function createHeroTitle({ animate = true } = {}) {
  const el = document.createElement('div');
  el.className = 'hero-title';
  const h1 = document.createElement('h1');
  h1.setAttribute('aria-label', NAME);
  h1.innerHTML = [...NAME]
    .map((ch) => `<span aria-hidden="true">${ch === ' ' ? '&nbsp;' : ch}</span>`)
    .join('');
  el.appendChild(h1);
  document.getElementById('hero').appendChild(el);

  if (animate) {
    gsap.from(h1.children, {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.4,
    });
  }

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

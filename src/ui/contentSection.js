import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createContentSection() {
  const section = document.createElement('section');
  section.id = 'content';
  section.className = 'content-section';
  section.innerHTML = `
    <h2 class="content-section__heading">MICHAEL STYLIANOU</h2>
    <ul class="content-section__list">
      <li><a href="https://paper-alpha-navy.vercel.app/" target="_blank" rel="noopener noreferrer">WEBSITES</a></li>
      <li>INSTALLATIONS</li>
      <li>XR</li>
      <li>GAMES</li>
    </ul>
  `;
  document.body.appendChild(section);

  // scrub: 1 (vs. scrub: true) adds ~1s of catch-up smoothing so the reveal
  // eases toward the scroll position instead of snapping rigidly to it.
  gsap.fromTo(
    section,
    { autoAlpha: 0, y: 60 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1,
      },
    },
  );

  return section;
}

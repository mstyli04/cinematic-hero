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
      <li>WEBSITES</li>
      <li>INSTALLATIONS</li>
      <li>VR</li>
      <li>XR</li>
      <li>GAMES</li>
    </ul>
  `;
  document.body.appendChild(section);

  gsap.fromTo(
    section,
    { autoAlpha: 0, y: 60 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 40%',
        scrub: true,
      },
    },
  );

  return section;
}

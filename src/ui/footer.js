import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function createFooter({ animate = true } = {}) {
  const footer = document.createElement('footer');
  footer.id = 'contact';
  footer.className = 'footer';
  footer.innerHTML = `
    <h2 class="footer__heading">GET IN TOUCH</h2>
    <div class="footer__links">
      <a class="footer__email" href="mailto:michael.stylianou7@gmail.com">michael.stylianou7@gmail.com</a>
      <a class="footer__linkedin" href="https://linkedin.com/in/michael-stylianou-185055302" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
    </div>
    <p class="footer__copyright">© 2026 Michael Stylianou</p>
  `;
  document.body.appendChild(footer);

  if (!animate) return footer;

  gsap.from(footer.children, {
    autoAlpha: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: footer, start: 'top 85%' },
  });

  return footer;
}

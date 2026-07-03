import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'PAPER ALPHA',
    href: 'https://github.com/mstyli04/paper-alpha',
    tags: ['Next.js', 'TypeScript', 'Prisma'],
    desc: 'An educational platform for learning how financial markets and investing work — practice trading stocks and crypto with $100,000 in virtual cash, live market data, and guided lessons, so you can build real investing skills before risking real money.',
  },
  {
    title: 'MACRO MONITOR',
    href: 'https://github.com/mstyli04/macro-monitor',
    tags: ['Python', 'Next.js', 'FRED API'],
    desc: 'A live US macro dashboard with a recession-probability nowcast in the tradition of Estrella & Mishkin (1998) — a probit model with walk-forward out-of-sample validation, refreshed daily from FRED.',
  },
  {
    title: 'GAME THEORY SIMULATOR',
    href: 'https://github.com/mstyli04/game-theory-simulator',
    tags: ['Vanilla JS', 'Zero dependencies'],
    desc: 'An interactive workbook for two-player normal-form games. Build a payoff matrix and watch it get solved live: iterated elimination of dominated strategies, all Nash equilibria, best-response curves, and the Pareto frontier.',
  },
  {
    title: 'FX OPTIONS DASHBOARD',
    href: 'https://github.com/mstyli04/fx-options-dashboard',
    tags: ['Flask', 'NumPy', 'SciPy'],
    desc: 'A pricing and risk dashboard for European FX options using Garman–Kohlhagen, with 3D Greek surfaces, Monte Carlo simulation, implied-volatility solving, and a backtested delta-hedging strategy on real GBPUSD history.',
  },
  {
    title: 'JOB TRACKER',
    href: 'https://github.com/mstyli04/job-tracker',
    tags: ['Flask', 'SQLite'],
    desc: 'A lightweight Flask app for tracking job applications end-to-end, from Applied through Offer or Rejected, built to stay organized during a job search.',
  },
];

const SKILLS = [
  'Python', 'pandas', 'NumPy/SciPy', 'statsmodels', 'R', 'MATLAB', 'Excel',
  'SQL', 'JavaScript/TypeScript', 'Next.js/React', 'Flask', 'Three.js',
  'Claude Code',
];

function projectRow({ title, href, tags, desc }, index) {
  const num = String(index + 1).padStart(2, '0');
  return `
    <li class="project-row">
      <a class="project-row__link" href="${href}" target="_blank" rel="noopener noreferrer">
        <span class="project-row__num">${num}</span>
        <span class="project-row__title">${title}</span>
      </a>
      <ul class="pill-list project-row__tags">${tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <p class="project-row__desc">${desc}</p>
    </li>
  `;
}

export function createContentSection({ animate = true } = {}) {
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
    <h3 class="about__heading">ABOUT</h3>
    <p class="about__bio">Mathematics & Economics undergraduate at the University of Liverpool, building quantitative tools for real markets — from options pricing and delta-hedging backtests to a live recession nowcast. Interested in data-driven finance and AI; everything below was designed, built, and shipped by me.</p>
    <ul class="pill-list about__skills">${SKILLS.map((s) => `<li>${s}</li>`).join('')}</ul>
    <a class="about__cv-button" href="/cv.pdf" download="Michael_Stylianou_CV.pdf">DOWNLOAD CV</a>
    <h3 class="projects__heading">PROJECTS</h3>
    <ul class="projects__list">${PROJECTS.map(projectRow).join('')}</ul>
  `;
  document.body.appendChild(section);

  if (!animate) return section;

  // scrub: 1 (vs. scrub: true) adds ~1s of catch-up smoothing so the reveal
  // eases toward the scroll position instead of snapping rigidly to it.
  gsap.fromTo(
    section.querySelector('.content-section__heading'),
    { autoAlpha: 0, y: 60 },
    {
      autoAlpha: 1,
      y: 0,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 40%', scrub: 1 },
    },
  );

  gsap.from(
    section.querySelectorAll('.about__heading, .about__bio, .about__skills, .about__cv-button'),
    {
      autoAlpha: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: section.querySelector('.about__heading'), start: 'top 85%' },
    },
  );

  gsap.from(section.querySelectorAll('.project-row'), {
    autoAlpha: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: section.querySelector('.projects__list'), start: 'top 80%' },
  });

  return section;
}

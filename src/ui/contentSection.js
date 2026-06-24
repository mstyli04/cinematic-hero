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
    <h3 class="projects__heading">PROJECTS</h3>
    <ul class="projects__list">
      <li>
        <a class="projects__title" href="https://github.com/mstyli04/paper-alpha" target="_blank" rel="noopener noreferrer">PAPER ALPHA</a>
        <p class="projects__desc">Originally a paper-trading platform &mdash; $100,000 in virtual cash, real-time stock and crypto prices, P&amp;L tracking and leaderboards. Now being rebuilt as a financial-literacy teaching tool: the same risk-free trading mechanics, reframed around guided lessons so people can learn how markets actually work before risking real money.</p>
      </li>
      <li>
        <a class="projects__title" href="https://github.com/mstyli04/macro-monitor" target="_blank" rel="noopener noreferrer">MACRO MONITOR</a>
        <p class="projects__desc">A live US macro dashboard with a recession-probability nowcast in the tradition of Estrella &amp; Mishkin (1998) &mdash; a probit model with walk-forward out-of-sample validation, refreshed daily from FRED.</p>
      </li>
      <li>
        <a class="projects__title" href="https://github.com/mstyli04/game-theory-simulator" target="_blank" rel="noopener noreferrer">GAME THEORY SIMULATOR</a>
        <p class="projects__desc">An interactive workbook for two-player normal-form games. Build a payoff matrix and watch it get solved live: iterated elimination of dominated strategies, all Nash equilibria, best-response curves, and the Pareto frontier.</p>
      </li>
      <li>
        <a class="projects__title" href="https://github.com/mstyli04/fx-options-dashboard" target="_blank" rel="noopener noreferrer">FX OPTIONS DASHBOARD</a>
        <p class="projects__desc">A pricing and risk dashboard for European FX options using Garman&ndash;Kohlhagen, with 3D Greek surfaces, Monte Carlo simulation, implied-volatility solving, and a backtested delta-hedging strategy on real GBPUSD history.</p>
      </li>
      <li>
        <a class="projects__title" href="https://github.com/mstyli04/job-tracker" target="_blank" rel="noopener noreferrer">JOB TRACKER</a>
        <p class="projects__desc">A lightweight Flask app for tracking job applications end-to-end, from Applied through Offer or Rejected, built to stay organized during a job search.</p>
      </li>
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

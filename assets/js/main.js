import { initNavigation } from './modules/navigation.js';
import { initReveal } from './modules/reveal.js';
import { initForm } from './modules/form.js';
import { initHeroParticles } from './modules/canvas-particles.js';
import { initServicesParticles } from './modules/services-particles.js';
import { initProcessAnimation } from './modules/process-animation.js';
import { initPortfolioInteractions } from './modules/portfolio-interactions.js';
import { initCursor } from './modules/cursor.js';

initNavigation();
initReveal();
initForm();
const canvasSize = initHeroParticles();
initServicesParticles();
initProcessAnimation();
initPortfolioInteractions();
initCursor();

const gsap = window.gsap;
if (gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.from('.hero-top-row', { opacity: 0, y: 16, duration: .8, ease: 'power3.out', delay: .1 });
  gsap.from('.line-inner', { y: '110%', duration: 1.1, stagger: .12, ease: 'power4.out', delay: .25 });
  gsap.from('.hero-sub', { opacity: 0, y: 16, duration: .9, ease: 'power3.out', delay: .6 });
  gsap.from('.hero-ctas', { opacity: 0, y: 16, duration: .8, ease: 'power3.out', delay: .8 });
  gsap.from('.scroll-indicator', { opacity: 0, duration: 1, delay: 1.2 });
  if (canvasSize) document.addEventListener('mousemove', event => { const x = (event.clientX / canvasSize.getWidth() - .5) * 2; const y = (event.clientY / canvasSize.getHeight() - .5) * 2; gsap.to('.orb-1', { x: x * 28, y: y * 28, duration: 2, ease: 'power2.out' }); gsap.to('.orb-2', { x: x * -18, y: y * -18, duration: 2.5, ease: 'power2.out' }); });
}
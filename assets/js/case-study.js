import { initNavigation } from './modules/navigation.js';

initNavigation();

const mobileToggle = document.getElementById('caseNavToggle');
const mobileMenu = document.getElementById('caseMobileMenu');
if (mobileToggle && mobileMenu) {
  const close = () => {
    mobileToggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  mobileToggle.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('open');
    mobileToggle.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
}

const nav = document.querySelector('.case-nav');
const progress = document.querySelector('.case-progress');
const updatePage = () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
  if (progress) {
    const distance = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${distance ? window.scrollY / distance : 0})`;
  }
};
window.addEventListener('scroll', updatePage, { passive: true });
updatePage();

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const gsapReady = !reducedMotion && window.gsap && window.ScrollTrigger;

const activateScene = index => {
  document.querySelectorAll('.stage-screen').forEach((screen, position) => screen.classList.toggle('active', position === index));
  document.querySelectorAll('.story-chapter').forEach((chapter, position) => chapter.classList.toggle('active', position === index));
};
activateScene(0);

if (gsapReady) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.case-brand', { y: 25, opacity: 0, duration: .7 })
    .from('.case-kicker', { y: 20, opacity: 0, duration: .55 }, '-=.35')
    .from('.case-hero h1', { y: 80, opacity: 0, duration: 1.1 }, '-=.25')
    .from('.case-hero-bottom', { y: 35, opacity: 0, duration: .8 }, '-=.55')
    .from('.case-orb', { scale: .65, opacity: 0, duration: 1.2 }, '-=1');

  gsap.to('.case-orb', { rotate: 50, yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.case-hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
  gsap.from('.case-statement h2', { y: 90, opacity: .08, scrollTrigger: { trigger: '.case-statement', start: 'top 72%', end: 'center 55%', scrub: 1 } });

  document.querySelectorAll('.story-chapter').forEach((chapter, index) => {
    ScrollTrigger.create({ trigger: chapter, start: 'top 55%', end: 'bottom 45%', onEnter: () => activateScene(index), onEnterBack: () => activateScene(index) });
  });

  gsap.utils.toArray('.value-card').forEach((card, index) => gsap.from(card, { y: 70, opacity: 0, duration: .8, delay: index * .08, scrollTrigger: { trigger: card, start: 'top 88%' } }));
  gsap.utils.toArray('.proof-line').forEach(line => gsap.from(line, { x: -45, opacity: 0, duration: .75, scrollTrigger: { trigger: line, start: 'top 88%' } }));
  gsap.to('.cta-rings', { rotate: 80, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.case-cta', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  const hero = document.querySelector('.case-hero');
  hero?.addEventListener('pointermove', event => {
    const x = (event.clientX / innerWidth - .5) * 22;
    const y = (event.clientY / innerHeight - .5) * 22;
    gsap.to('.case-orb', { x, y, duration: 1.2, overwrite: 'auto' });
  });

  document.querySelectorAll('.case-button').forEach(button => {
    button.addEventListener('pointermove', event => {
      const box = button.getBoundingClientRect();
      gsap.to(button, { x: (event.clientX - box.left - box.width / 2) * .12, y: (event.clientY - box.top - box.height / 2) * .18, duration: .3 });
    });
    button.addEventListener('pointerleave', () => gsap.to(button, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.4)' }));
  });
}

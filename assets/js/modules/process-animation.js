export function initProcessAnimation() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const steps = document.querySelector('.steps');
  const icons = [...document.querySelectorAll('.step-icon')];
  if (!steps || !icons.length || !gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    gsap.set('.steps-progress', { height: '100%' });
    gsap.set(icons, { opacity: 1, y: 0 });
    icons.forEach(icon => icon.classList.add('active'));
    return;
  }
  gsap.to('.steps-progress', { height: '100%', ease: 'none', scrollTrigger: { trigger: steps, start: 'top 72%', end: '+=750', scrub: 1.25 } });
  icons.forEach(icon => {
    const step = icon.closest('.step');
    if (!step) return;
    ScrollTrigger.create({ trigger: step, start: 'top 62%', end: 'bottom 38%', onEnter: () => activate(icon), onEnterBack: () => activate(icon), onLeaveBack: () => { icon.classList.remove('active'); gsap.to(icon, { opacity: .3, y: 7, duration: .3 }); } });
  });
  function activate(icon) { icon.classList.add('active'); gsap.to(icon, { opacity: 1, y: 0, duration: .45, ease: 'power2.out' }); }
}
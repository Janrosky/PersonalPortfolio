export function initPortfolioInteractions() {
  document.querySelectorAll('.project-thumb').forEach(image => image.addEventListener('error', () => { image.hidden = true; }));
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const grid = document.querySelector('.portfolio-grid');
  const cards = [...document.querySelectorAll('.project-card')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!gsap || reduced) return;

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.portfolio-header',
      { opacity: .25, y: 80 },
      { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '#portfolio', start: 'top 82%', end: 'top 34%', scrub: .8 } }
    );

    gsap.utils.toArray('.case-story').forEach(story => {
      const reverse = story.classList.contains('case-story--fix');
      const copy = story.querySelector('.case-copy');
      const visual = story.querySelector('.case-visual-link');
      const windowFrame = story.querySelector('.case-window');
      const watermark = story.querySelector('.case-watermark');
      const beats = story.querySelectorAll('.case-beats li');
      const screenDetails = story.querySelectorAll('.story-metric, .meal-orders > div, .fix-ticket-card, .fix-route > *, .fix-cost');

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: story, start: 'top 82%', end: 'center 42%', scrub: .9 }
      });
      timeline
        .fromTo(copy, { opacity: .2, x: reverse ? 70 : -70 }, { opacity: 1, x: 0, ease: 'power2.out' }, 0)
        .fromTo(visual, { opacity: .18, x: reverse ? -110 : 110, scale: .86 }, { opacity: 1, x: 0, scale: 1, ease: 'power2.out' }, 0)
        .fromTo(beats, { opacity: .1, y: 26 }, { opacity: 1, y: 0, stagger: .08, ease: 'power2.out' }, .18)
        .fromTo(watermark, { x: reverse ? -50 : 50 }, { x: 0, ease: 'none' }, 0);

      gsap.fromTo(windowFrame, { yPercent: 6 }, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: story, start: 'top bottom', end: 'bottom top', scrub: 1.1 }
      });

      gsap.fromTo(screenDetails, { opacity: .25, y: 24 }, {
        opacity: 1,
        y: 0,
        stagger: .08,
        ease: 'power2.out',
        scrollTrigger: { trigger: visual, start: 'top 72%', end: 'center 42%', scrub: .65 }
      });
    });
  }

  if (!grid || !cards.length || !window.matchMedia('(pointer:fine)').matches) return;
  cards.forEach(card => {
    const tiltX = gsap.quickTo(card, 'rotationX', { duration: .45, ease: 'power3.out' });
    const tiltY = gsap.quickTo(card, 'rotationY', { duration: .45, ease: 'power3.out' });
    const lift = gsap.quickTo(card, 'y', { duration: .45, ease: 'power3.out' });
    const details = card.querySelectorAll('.project-tag, .project-name, .project-desc, .project-link-row');
    card.addEventListener('mouseenter', () => { grid.classList.add('has-focus'); card.classList.add('is-focus'); lift(-6); gsap.fromTo(details, { opacity: .58, y: 7 }, { opacity: 1, y: 0, duration: .42, stagger: .055, ease: 'power3.out', overwrite: true }); });
    card.addEventListener('mousemove', event => { const rect = card.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; card.style.setProperty('--spot-x', `${x * 100}%`); card.style.setProperty('--spot-y', `${y * 100}%`); tiltX((.5 - y) * 3.2); tiltY((x - .5) * 3.2); });
    card.addEventListener('mouseleave', () => { grid.classList.remove('has-focus'); card.classList.remove('is-focus'); tiltX(0); tiltY(0); lift(0); card.style.setProperty('--spot-x', '50%'); card.style.setProperty('--spot-y', '40%'); });
  });
}

export function initPortfolioInteractions() {
  document.querySelectorAll('.project-thumb').forEach(image => image.addEventListener('error', () => { image.hidden = true; }));
  const gsap = window.gsap;
  const grid = document.querySelector('.portfolio-grid');
  const cards = [...document.querySelectorAll('.project-card')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!gsap || !grid || !cards.length || reduced || !window.matchMedia('(pointer:fine)').matches) return;
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
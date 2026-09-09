export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navbar) {
    const updateNavbar = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  if (navToggle && mobileMenu) {
    navToggle.setAttribute('aria-expanded', 'false');
    const closeMenu = () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', () => {
      const open = !mobileMenu.classList.contains('open');
      navToggle.classList.toggle('open', open);
      mobileMenu.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const dropdowns = [...document.querySelectorAll('.nav-dropdown')];

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

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;
    const close = () => {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', event => {
      event.stopPropagation();
      const open = !dropdown.classList.contains('open');
      dropdowns.forEach(item => {
        item.classList.remove('open');
        item.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    dropdown.addEventListener('keydown', event => {
      if (event.key === 'Escape') { close(); toggle.focus(); }
    });
    document.addEventListener('click', event => {
      if (!dropdown.contains(event.target)) close();
    });
  });

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

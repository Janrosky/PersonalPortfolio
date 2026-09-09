export function initCursor() {
  if (!window.matchMedia('(min-width: 769px) and (pointer: fine)').matches) return;
  const dot = document.getElementById('cursor-dot'); const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mouseX = 0; let mouseY = 0; let ringX = 0; let ringY = 0;
  document.addEventListener('mousemove', event => { mouseX = event.clientX; mouseY = event.clientY; dot.style.left = `${mouseX}px`; dot.style.top = `${mouseY}px`; });
  const loop = () => { ringX += (mouseX - ringX) * .11; ringY += (mouseY - ringY) * .11; ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`; requestAnimationFrame(loop); };
  loop();
  document.querySelectorAll('a, button').forEach(element => { element.addEventListener('mouseenter', () => document.body.classList.add('hovered')); element.addEventListener('mouseleave', () => document.body.classList.remove('hovered')); });
}
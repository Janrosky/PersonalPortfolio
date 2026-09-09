export function initServicesParticles() {
  const section = document.getElementById('services');
  const canvas = document.getElementById('services-canvas');
  if (!section || !canvas || !canvas.getContext) return;
  const context = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particles = Array.from({ length: 62 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .09, vy: (Math.random() - .5) * .09, r: Math.random() * 1.2 + .35, a: Math.random() * .24 + .08 }));
  let width = 0; let height = 0; let visible = false; let mouse = { x: -999, y: -999 };
  const resize = () => { width = canvas.width = section.clientWidth; height = canvas.height = section.scrollHeight; };
  resize();
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(section);
  section.addEventListener('mousemove', event => { const rect = section.getBoundingClientRect(); mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top }; });
  section.addEventListener('mouseleave', () => { mouse = { x: -999, y: -999 }; });
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .04 }).observe(section);
  const draw = () => {
    requestAnimationFrame(draw);
    if (!visible || reduced) return;
    context.clearRect(0, 0, width, height);
    particles.forEach(point => {
      let x = point.x * width; let y = point.y * height; const dx = mouse.x - x; const dy = mouse.y - y; const distance = Math.hypot(dx, dy);
      if (distance < 180 && distance > 1) { point.x += dx / distance * .000035; point.y += dy / distance * .000035; }
      point.x += point.vx / Math.max(width, 1); point.y += point.vy / Math.max(height, 1);
      if (point.x < 0 || point.x > 1) point.vx *= -1; if (point.y < 0 || point.y > 1) point.vy *= -1;
      x = point.x * width; y = point.y * height; context.beginPath(); context.arc(x, y, point.r, 0, Math.PI * 2); context.fillStyle = `rgba(219,41,85,${point.a})`; context.fill();
    });
  };
  draw();
}
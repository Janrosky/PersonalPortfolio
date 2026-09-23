export function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !canvas.getContext) return;
  const context = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const points = Array.from({ length: mobile ? 105 : 185 }, (_, index) => ({
    x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
    r: Math.random() * 1.65 + .25, vx: (Math.random() - .5) * .34,
    vy: (Math.random() - .5) * .34, a: Math.random() * .5 + .1,
    tone: index % 7 === 0 ? '244,244,245' : index % 5 === 0 ? '124,92,255' : '219,41,85'
  }));
  const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize, { passive: true });
  const draw = () => {
    context.clearRect(0, 0, width, height);
    points.forEach(point => {
      point.x += point.vx; point.y += point.vy;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
      context.beginPath(); context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      context.fillStyle = `rgba(${point.tone},${point.a})`; context.fill();
    });
    for (let first = 0; first < points.length; first += 1) for (let second = first + 1; second < points.length; second += 1) {
      const dx = points[first].x - points[second].x;
      const dy = points[first].y - points[second].y;
      const distance = Math.hypot(dx, dy);
      if (distance < 118) {
        context.beginPath(); context.moveTo(points[first].x, points[first].y); context.lineTo(points[second].x, points[second].y);
        context.strokeStyle = `rgba(219,41,85,${.1 * (1 - distance / 118)})`; context.lineWidth = .5; context.stroke();
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
  return { getWidth: () => width, getHeight: () => height };
}

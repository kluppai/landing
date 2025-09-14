// Año automático + scroll suave + eventos de analítica mínimos
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // hero_view cuando entra al viewport
  const hero = document.querySelector('.hero');
  if (hero) {
    const io = new IntersectionObserver(([e])=>{
      if (e.isIntersecting) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'hero_view', section: 'hero' });
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(hero);
  }

  // scroll suave para anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // track clicks de CTA con data-analytics
  document.querySelectorAll('[data-analytics]').forEach(el=>{
    el.addEventListener('click', ()=>{
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'cta_click', section: 'hero', cta: el.dataset.analytics });
    });
  });
});

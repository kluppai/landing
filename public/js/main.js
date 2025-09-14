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
// ===== Animación avanzada del flujo (hero) =====
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrap = document.getElementById('flow-messages');
  const typing = document.getElementById('typing');
  if (!wrap || !typing) return;

  // Secuencia de mensajes
  const sequence = [
    { who: 'sys', name:'Sistema', text:'Hola 👋 ¿Deseas agendar una cita?' },
    { who: 'user', name:'Usuario', text:'Sí, mañana por la tarde.' },
    { who: 'sys', name:'Sistema', text:'Listo. Te confirmo: jueves 4:30 pm. 📅' }
  ];

  // KPIs animados suaves
  const leadsEl = document.getElementById('kpi-leads');
  const roasEl  = document.getElementById('kpi-roas');
  const barCurr = document.getElementById('bar-current');

  function setTyping(on){
    typing.classList.toggle('typing--hidden', !on);
    typing.setAttribute('aria-hidden', on ? 'false' : 'true');
  }

  function nowTime(){
    const d = new Date();
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    return `${hh}:${mm}`;
  }

  function createBubble({who, name, text}){
    const b = document.createElement('div');
    b.className = `bubble bubble--${who}`;
    b.innerHTML = `
      <span class="bubble__sender">${name}</span>
      <p></p>
      <time class="bubble__time" datetime="">${nowTime()}</time>
    `;
    wrap.appendChild(b);
    return b;
  }

  function typeText(el, text, speed=18){
    return new Promise(resolve=>{
      if (prefersReduced){ el.textContent = text; return resolve(); }
      let i=0;
      const timer = setInterval(()=>{
        el.textContent = text.slice(0, ++i);
        if (i >= text.length){ clearInterval(timer); resolve(); }
      }, speed);
    });
  }

  async function playFlow(){
    // KPI bars/leads/roas animación simple
    if (barCurr) {
      // de 40 a 89 (coincide con CPR actual)
      requestAnimationFrame(()=> barCurr.style.setProperty('--v', 89));
    }
    if (leadsEl){
      let v=0; const target=320; const step = prefersReduced ? target : 8;
      const timer = setInterval(()=>{
        v += step; if (v >= target){ v=target; clearInterval(timer); }
        leadsEl.textContent = `+${v}`;
      }, 30);
    }
    if (roasEl){
      let r = 1.0; const target = 3.2; const step = prefersReduced ? (target-1.0) : 0.06;
      const timer = setInterval(()=>{
        r += step; if (r >= target){ r=target; clearInterval(timer); }
        roasEl.textContent = `${r.toFixed(1)}x`;
      }, 40);
    }

    // Mensajes con typing y “escribiendo…”
    for (const msg of sequence){
      setTyping(true);
      // pequeña espera aleatoria para naturalidad
      await new Promise(r => setTimeout(r, prefersReduced ? 80 : 380 + Math.random()*220));
      setTyping(false);

      const b = createBubble(msg);
      const p = b.querySelector('p');
      b.classList.add('appear');
      await typeText(p, msg.text, 14);
      // scroll suave dentro del contenedor
      wrap.parentElement.scrollTop = wrap.parentElement.scrollHeight;
      await new Promise(r => setTimeout(r, prefersReduced ? 120 : 260));
    }
  }

  // Inicia al entrar el hero a viewport (o de inmediato en móviles)
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const io = new IntersectionObserver(([e])=>{
    if (e.isIntersecting){ playFlow().catch(()=>{}); io.disconnect(); }
  }, { threshold: 0.4 });
  io.observe(hero);
})();

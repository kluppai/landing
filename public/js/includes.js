// Carga cualquier <div data-include="ruta.html"> y reemplaza el div por el contenido
(async () => {
  const nodes = document.querySelectorAll('[data-include]');
  for (const el of nodes) {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url, { cache: "no-store" });
      el.outerHTML = await res.text();
    } catch (e) {
      el.innerHTML = `<div style="color:#ff4d00">Error cargando ${url}</div>`;
    }
  }
})();

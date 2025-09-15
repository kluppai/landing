document.addEventListener("DOMContentLoaded", function() {

    // --- Cargar Partials (lista actualizada) ---
    const partials = [
        { selector: '#nav-container', url: 'partials/nav.html' },
        { selector: '#hero-container', url: 'partials/hero.html' },
        { selector: '#problema-container', url: 'partials/problema.html' },
        { selector: '#beneficios-container', url: 'partials/beneficios.html' },
        { selector: '#servicios-container', url: 'partials/servicios.html' },
        { selector: '#diferencia-container', url: 'partials/diferencia.html' },
        { selector: '#metodologia-container', url: 'partials/metodologia.html' },
        { selector: '#autor-container', url: 'partials/autor.html' },
        { selector: '#cta-container', url: 'partials/cta.html' },
        { selector: '#faq-container', url: 'partials/faq.html' },
        { selector: '#footer-container', url: 'partials/footer.html' }
    ];

    // Cargar todos los parciales y luego inicializar los scripts
    Promise.all(partials.map(p => 
        fetch(p.url)
        .then(res => res.ok ? res.text() : Promise.reject(res.statusText))
        .then(html => ({ selector: p.selector, html: html }))))
        .then(results => {
            results.forEach(result => {
                const element = document.querySelector(result.selector);
                if (element) element.innerHTML = result.html;
            });
            // Una vez cargado todo el HTML, inicializamos las funciones
            initializeNav();
            initializeFaq();
            initializeAnimations(); // <--- NUEVA FUNCIÓN DE ANIMACIÓN
        })
        .catch(error => console.error("Error loading one or more partials:", error));


    // --- Menú Móvil ---
    const initializeNav = () => { /* ... (código sin cambios) ... */ };

    // --- FAQ Acordeón ---
    const initializeFaq = () => { /* ... (código sin cambios) ... */ };

    // --- NUEVA LÓGICA DE ANIMACIÓN ---
    const initializeAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const delay = element.dataset.delay || 0;
                        
                        // Aplicamos el delay inline si existe
                        element.style.transitionDelay = `${delay}ms`;

                        element.classList.add('visible');
                        observer.unobserve(element);
                    }
                });
            }, {
                threshold: 0.1 // El elemento se animará cuando un 10% sea visible
            });

            animatedElements.forEach(el => {
                observer.observe(el);
            });
        } else {
            // Si el navegador es antiguo y no soporta IntersectionObserver,
            // simplemente mostramos todos los elementos.
            animatedElements.forEach(el => {
                el.classList.add('visible');
            });
        }
    };
});

document.addEventListener("DOMContentLoaded", function() {

    // --- Cargar Partials (lista actualizada) ---
    const partials = [
        { selector: '#nav-container', url: 'partials/nav.html' },
        { selector: '#hero-container', url: 'partials/hero.html' },
        { selector: '#problema-container', url: 'partials/problema.html' },
        { selector: '#servicios-container', url: 'partials/servicios.html' },
        { selector: '#metodologia-container', url: 'partials/metodologia.html' },
        { selector: '#autor-container', url: 'partials/autor.html' },
        { selector: '#cta-container', url: 'partials/cta.html' },
        { selector: '#faq-container', url: 'partials/faq.html' },
        { selector: '#footer-container', url: 'partials/footer.html' }
    ];

    // Función para cargar todos los parciales y luego inicializar los scripts
    Promise.all(partials.map(p => 
        fetch(p.url)
        .then(res => res.ok ? res.text() : Promise.reject(res.statusText))
        .then(html => ({ selector: p.selector, html: html }))))
        .then(results => {
            results.forEach(result => {
                const element = document.querySelector(result.selector);
                if (element) {
                    element.innerHTML = result.html;
                }
            });
            // Una vez cargado todo el HTML, inicializamos las funciones
            initializeNav();
            initializeFaq();
        })
        .catch(error => console.error("Error loading one or more partials:", error));


    // --- Menú Móvil ---
    const initializeNav = () => {
        // Esta funcionalidad se puede expandir si decides agregar un menú desplegable en móvil
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            // Lógica del menú aquí si es necesaria en el futuro
        }
    }

    // --- FAQ Acordeón ---
    const initializeFaq = () => {
        const faqItems = document.querySelectorAll('.faq__item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            question.addEventListener('click', () => {
                const openItem = document.querySelector('.faq__item.active');
                if (openItem && openItem !== item) {
                    openItem.classList.remove('active');
                }
                item.classList.toggle('active');
            });
        });
    }
});

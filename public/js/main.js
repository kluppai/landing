document.addEventListener("DOMContentLoaded", function() {

    // --- Cargar Partials ---
    const partials = [
        { selector: '#nav-container', url: 'partials/nav.html' },
        { selector: '#hero-container', url: 'partials/hero.html' },
        { selector: '#trust-container', url: 'partials/trust.html' },
        { selector: '#problema-container', url: 'partials/problema.html' },
        { selector: '#servicios-container', url: 'partials/servicios.html' },
        { selector: '#metodologia-container', url: 'partials/metodologia.html' },
        { selector: '#casos-container', url: 'partials/casos.html' },
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
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show-menu');
            });
        }

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('show-menu')) {
                    navMenu.classList.remove('show-menu');
                }
            });
        });
    }

    // --- FAQ Acordeón ---
    const initializeFaq = () => {
        const faqItems = document.querySelectorAll('.faq__item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            question.addEventListener('click', () => {
                const openItem = document.querySelector('.faq__item.active');

                // Cierra el item que ya está abierto (si no es el actual)
                if (openItem && openItem !== item) {
                    openItem.classList.remove('active');
                }

                // Abre o cierra el item actual
                item.classList.toggle('active');
            });
        });
    }
});

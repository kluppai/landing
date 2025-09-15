document.addEventListener("DOMContentLoaded", function() {

    // --- Cargar Partials ---
    const loadPartial = (selector, url) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
            .then(html => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = html;
                }
            })
            .catch(error => console.error(`Error loading partial from ${url}:`, error));
    };

    const partials = [
        { selector: '#nav-container', url: 'partials/nav.html' },
        { selector: '#hero-container', url: 'partials/hero.html' },
        { selector: '#trust-container', url: 'partials/trust.html' },
        { selector: '#servicios-container', url: 'partials/servicios.html' },
        { selector: '#beneficios-container', url: 'partials/beneficios.html' },
        { selector: '#metodologia-container', url: 'partials/metodologia.html' },
        { selector: '#casos-container', url: 'partials/casos.html' },
        { selector: '#cta-container', url: 'partials/cta.html' },
        { selector: '#faq-container', url: 'partials/faq.html' },
        { selector: '#footer-container', url: 'partials/footer.html' }
    ];

    // Load all partials and then initialize event listeners
    Promise.all(partials.map(p => fetch(p.url)
        .then(res => res.ok ? res.text() : Promise.reject(res.statusText))
        .then(html => ({ selector: p.selector, html: html }))))
        .then(results => {
            results.forEach(result => {
                const element = document.querySelector(result.selector);
                if (element) {
                    element.innerHTML = result.html;
                }
            });
            // All partials are loaded, now initialize functionalities
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

        // Close menu when a link is clicked
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

                if (openItem && openItem !== item) {
                    openItem.classList.remove('active');
                }

                item.classList.toggle('active');
            });
        });
    }
});

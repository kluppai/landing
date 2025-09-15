document.addEventListener("DOMContentLoaded", function() {

    // --- Cargar Partials ---
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

    Promise.all(partials.map(p => 
        fetch(p.url)
        .then(res => res.ok ? res.text() : Promise.reject(res.statusText))
        .then(html => ({ selector: p.selector, html: html }))))
        .then(results => {
            results.forEach(result => {
                const element = document.querySelector(result.selector);
                if (element) element.innerHTML = result.html;
            });
            initializeNav();
            initializeFaq();
            initializeAnimations();
        })
        .catch(error => console.error("Error loading one or more partials:", error));

    // --- LÓGICA DEL MENÚ MÓVIL (ACTUALIZADO) ---
    const initializeNav = () => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (navToggle && navMenu) {
            // Abrir/cerrar menú con el botón hamburguesa
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show-menu');
                navToggle.classList.toggle('is-active');
            });
        }

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('show-menu')) {
                    navMenu.classList.remove('show-menu');
                    navToggle.classList.remove('is-active');
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

    // --- Animaciones On-Scroll ---
    const initializeAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const delay = element.dataset.delay || 0;
                        element.style.transitionDelay = `${delay}ms`;
                        element.classList.add('visible');
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(el => observer.observe(el));
        } else {
            animatedElements.forEach(el => el.classList.add('visible'));
        }
    };
});

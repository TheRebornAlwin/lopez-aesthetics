/* ============================================
   LOPEZ AESTHETICS — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --- Fade-in on scroll (Intersection Observer) ---
    const fadeElements = document.querySelectorAll(
        '.pain-card, .why-reframe, .comparison-card, .ba-card, ' +
        '.testimonial-card, .skeptic-card, .step, .info-block, ' +
        '.maria-text, .maria-photo, .fear-text, .fear-quote-block, ' +
        '.cta-content, .collagen-stat'
    );

    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // --- Collagen counter animation ---
    var counterEl = document.getElementById('collagen-counter');
    if (counterEl) {
        var hasAnimated = false;

        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounter(counterEl, 0, 30, 1500);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counterEl);
    }

    function animateCounter(el, start, end, duration) {
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            var current = Math.floor(start + (end - start) * eased);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Header: add scrolled class on scroll ---
    var header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile menu toggle ---
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var headerNav = document.querySelector('.header-nav');
    if (menuBtn && headerNav) {
        menuBtn.addEventListener('click', function () {
            headerNav.classList.toggle('mobile-open');
            menuBtn.classList.toggle('active');
        });

        // Close menu when a nav link is clicked
        headerNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                headerNav.classList.remove('mobile-open');
                menuBtn.classList.remove('active');
            });
        });
    }

    // --- Floating WhatsApp button: show after scroll ---
    var floatingBtn = document.querySelector('.floating-whatsapp');
    if (floatingBtn) {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.pointerEvents = 'none';
        floatingBtn.style.transition = 'opacity 0.4s ease, transform 0.3s ease';

        window.addEventListener('scroll', function () {
            if (window.scrollY > 600) {
                floatingBtn.style.opacity = '1';
                floatingBtn.style.pointerEvents = 'auto';
            } else {
                floatingBtn.style.opacity = '0';
                floatingBtn.style.pointerEvents = 'none';
            }
        });
    }
});

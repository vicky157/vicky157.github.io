document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggleButton.querySelector('.fa-sun');
    const moonIcon = themeToggleButton.querySelector('.fa-moon');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Theme Toggle ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
            localStorage.setItem('theme', 'light');
        }
    }

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    // Correct icon display based on initial theme
    if (savedTheme === 'dark') {
        sunIcon.style.display = 'none'; // Show sun to switch to light
        moonIcon.style.display = 'inline-block'; // Hide moon
    } else {
        sunIcon.style.display = 'inline-block'; // Show moon to switch to dark
        moonIcon.style.display = 'none'; // Hide sun
    }


    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            applyTheme('dark');
             // After switching to dark, sun icon should be hidden, moon icon shown (for next click)
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        } else {
            applyTheme('light');
            // After switching to light, sun icon should be shown, moon icon hidden
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        }
    });
    
    // --- Mobile Menu Toggle ---
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Optional: change hamburger to X icon
            const icon = mobileMenuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    // --- Update Current Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Navigation Link ---
    const navLinks = document.querySelectorAll('nav ul li a, #mobile-menu ul li a');
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // --- Smooth Scroll for internal links (if any) ---
    // This is mostly handled by CSS `scroll-behavior: smooth;`
    // For JS-based smooth scroll on specific links if needed:
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });


    // --- Intersection Observer for Fade-in Animations ---
    const fadeElems = document.querySelectorAll('.card-style, .content-section, .hero-section, .publication-item, .entry, .blog-post-summary'); // Add more selectors if needed
    
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    fadeElems.forEach(elem => {
        elem.classList.add('fade-in'); // Add initial class for transition
        intersectionObserver.observe(elem);
    });

});
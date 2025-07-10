/**
 * Main JavaScript file for Vikash Singh's Portfolio Website
 * Handles theme toggling, mobile menu, navigation, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeTheme();
    initializeMobileMenu();
    initializeNavigation();
    initializeAnimations();
    initializeDynamicFooter();
    initializeInteractiveElements();
    updateCurrentYear();
});

/**
 * Simple Dynamic Footer Features
 */
function initializeDynamicFooter() {
    createFooterParticles();
    animateCounters();
    initializeFooterInteractions();
}

function createFooterParticles() {
    const particleContainer = document.getElementById('footer-particles');
    if (!particleContainer) return;

    // Create floating particles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createParticle(particleContainer);
        }, i * 500);
    }

    // Continuously create new particles
    setInterval(() => {
        createParticle(particleContainer);
    }, 3000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    const startX = Math.random() * 100;
    const animationDuration = 15 + Math.random() * 10; // 15-25 seconds
    const size = 2 + Math.random() * 4; // 2-6px
    
    particle.style.left = startX + '%';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = animationDuration + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (animationDuration + 2) * 1000);
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 50; // Animate over ~1 second
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 20);

                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function initializeFooterInteractions() {
    // Add click effects to research tags
    const researchTags = document.querySelectorAll('.research-tags li');
    researchTags.forEach(tag => {
        tag.addEventListener('click', () => {
            createRippleEffect(tag);
            // Add a brief highlight
            tag.style.transform = 'scale(1.1) translateY(-5px)';
            setTimeout(() => {
                tag.style.transform = '';
            }, 200);
        });
    });
}

/**
 * Site-wide Interactive Elements
 */
function initializeInteractiveElements() {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn, .social-icon, .card-style');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });

    // Add floating animation to cards
    const cards = document.querySelectorAll('.card-style');
    cards.forEach((card, index) => {
        // Add subtle floating animation
        card.style.animation = `cardFloat 4s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Add enhanced hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(74, 144, 226, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Add ripple effect to clickable elements
    const clickableElements = document.querySelectorAll('.btn, .social-icon, .publication-links-home a');
    clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
            createRippleEffect(element, e);
        });
    });
}

function createRippleEffect(element, event = null) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    let x, y;
    if (event) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    } else {
        x = rect.width / 2;
        y = rect.height / 2;
    }
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple-effect';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Theme management functions
 */
function initializeTheme() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = themeToggleButton?.querySelector('.fa-sun');
    const moonIcon = themeToggleButton?.querySelector('.fa-moon');

    if (!themeToggleButton || !sunIcon || !moonIcon) {
        console.warn('Theme toggle elements not found');
        return;
    }

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme, body, sunIcon, moonIcon);

    // Theme toggle event listener with animation
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add transition effect
        body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        applyTheme(newTheme, body, sunIcon, moonIcon);
        
        // Add button animation
        themeToggleButton.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggleButton.style.transform = '';
            body.style.transition = '';
        }, 500);
    });
}

function applyTheme(theme, body, sunIcon, moonIcon) {
    if (theme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        sunIcon.style.display = 'inline-block';
        moonIcon.style.display = 'none';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline-block';
    }
    localStorage.setItem('theme', theme);
}

/**
 * Mobile menu management
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuToggle || !mobileMenu) {
        return; // Mobile menu not available on this page
    }

    mobileMenuToggle.addEventListener('click', () => {
        toggleMobileMenu(mobileMenu, mobileMenuToggle);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            closeMobileMenu(mobileMenu, mobileMenuToggle);
        }
    });
}

function toggleMobileMenu(mobileMenu, mobileMenuToggle) {
    const isActive = mobileMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (isActive) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

function closeMobileMenu(mobileMenu, mobileMenuToggle) {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

/**
 * Navigation management
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a, #mobile-menu ul li a');
    const currentPath = getCurrentPagePath();

    navLinks.forEach(link => {
        const linkPath = getLinkPath(link);
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function getCurrentPagePath() {
    const path = window.location.pathname.split("/").pop();
    return path || 'index.html';
}

function getLinkPath(link) {
    const href = link.getAttribute('href');
    return href ? href.split("/").pop() || 'index.html' : 'index.html';
}

/**
 * Animation management
 */
function initializeAnimations() {
    const fadeElems = document.querySelectorAll('.card-style, .content-section, .hero-section, .publication-item, .entry, .blog-post-summary');
    
    if (fadeElems.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('h2, h3, p, li, .btn');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    fadeElems.forEach(elem => {
        elem.classList.add('fade-in');
        intersectionObserver.observe(elem);
    });
}

/**
 * Utility functions
 */
function updateCurrentYear() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Add smooth scrolling to anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

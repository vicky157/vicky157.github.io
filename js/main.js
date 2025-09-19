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
    initializePublicationFeatures();
    initializeMobileScrolling(); // Add mobile scrolling optimizations
    updateCurrentYear();
});

/**
 * Mobile Scrolling Optimizations
 */
function initializeMobileScrolling() {
    // Optimize viewport height for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set initial value
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
    
    // Prevent zoom on iOS when focusing inputs
    if (navigator.platform.includes('iPhone') || navigator.platform.includes('iPad')) {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (parseFloat(getComputedStyle(input).fontSize) < 16) {
                input.style.fontSize = '16px';
            }
        });
    }
    
    // Improve touch scrolling behavior
    if ('ontouchstart' in window) {
        // Add momentum scrolling to all scrollable elements
        const scrollableElements = document.querySelectorAll(
            '.table-wrapper, pre, .mobile-menu, .card-style, .content-section'
        );
        
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
            element.style.overscrollBehavior = 'contain';
            element.style.touchAction = 'pan-y pan-x';
        });
        
        // Specifically ensure cards allow touch scrolling
        const cards = document.querySelectorAll('.card-style, .content-section');
        cards.forEach(card => {
            card.style.touchAction = 'pan-y pan-x';
            
            // Remove any potential touch event blocking
            card.addEventListener('touchstart', (e) => {
                // Don't prevent default - allow scrolling
            }, { passive: true });
            
            card.addEventListener('touchmove', (e) => {
                // Don't prevent default - allow scrolling
            }, { passive: true });
        });
        
        // Prevent rubber band effect on body
        document.body.style.overscrollBehavior = 'contain';
        document.documentElement.style.overscrollBehavior = 'contain';
    }
}

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
    // Check if device supports hover (not touch-only)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    
    // Add magnetic effect to buttons (only on non-touch devices)
    if (supportsHover) {
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
    }

    // Add floating animation to cards (reduce on mobile)
    const cards = document.querySelectorAll('.card-style');
    cards.forEach((card, index) => {
        // Reduce animation intensity on mobile
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            card.style.animation = `cardFloat 4s ease-in-out infinite`;
            card.style.animationDelay = `${index * 0.5}s`;
        }
        
        // Add enhanced hover effect (touch-friendly)
        card.addEventListener('mouseenter', () => {
            if (supportsHover) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(74, 144, 226, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });

        // Touch support for mobile
        if (!supportsHover) {
            let touchTimeout;
            
            card.addEventListener('touchstart', (e) => {
                // DON'T prevent default - allow scrolling gestures
                // Only apply visual feedback, not prevent touch events
                card.style.transform = 'translateY(-5px) scale(1.01)';
                card.style.boxShadow = '0 15px 30px rgba(74, 144, 226, 0.2)';
                
                clearTimeout(touchTimeout);
                touchTimeout = setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 150);
            }, { passive: true }); // Make it passive to allow scrolling
        }
    });

    // Add ripple effect to clickable elements
    const clickableElements = document.querySelectorAll('.btn, .social-icon, .publication-links-home a, .btn-icon, .publication-links a');
    clickableElements.forEach(element => {
        element.addEventListener('click', (e) => {
            createRippleEffect(element, e);
        });
        
        // Touch support
        element.addEventListener('touchstart', (e) => {
            createRippleEffect(element, e.touches[0]);
        });
    });

    // Improve touch interactions for mobile
    initializeTouchImprovements();
    
    // Initialize viewport height fix for mobile browsers
    initializeViewportFix();
}

function initializeTouchImprovements() {
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('button, .btn, .btn-icon, a, .social-icon');
    
    interactiveElements.forEach(element => {
        // Add active state for better touch feedback
        element.addEventListener('touchstart', () => {
            element.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.classList.remove('touch-active');
            }, 150);
        });
        
        element.addEventListener('touchcancel', () => {
            element.classList.remove('touch-active');
        });
    });
    
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('button, .btn, .btn-icon');
    buttons.forEach(button => {
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            // Trigger click manually to maintain functionality
            setTimeout(() => {
                button.click();
            }, 0);
        });
    });
}

function initializeViewportFix() {
    // Fix viewport height issues on mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
}

function createRippleEffect(element, event = null) {
    // Prevent multiple ripples
    const existingRipple = element.querySelector('.ripple-effect');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    let x, y;
    if (event) {
        x = (event.clientX || event.pageX) - rect.left;
        y = (event.clientY || event.pageY) - rect.top;
    } else {
        x = rect.width / 2;
        y = rect.height / 2;
    }
    
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.left = (x - size / 2) + 'px';
    ripple.style.top = (y - size / 2) + 'px';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.className = 'ripple-effect';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
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

    mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu(mobileMenu, mobileMenuToggle);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            closeMobileMenu(mobileMenu, mobileMenuToggle);
        }
    });

    // Close mobile menu when clicking on a menu item
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu(mobileMenu, mobileMenuToggle);
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu(mobileMenu, mobileMenuToggle);
        }
    });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (mobileMenu.classList.contains('active')) {
                // Recalculate menu positioning if needed
                adjustMobileMenuPosition(mobileMenu);
            }
        }, 100);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
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
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
        // Add ARIA attributes for accessibility
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        // Focus management
        setTimeout(() => {
            const firstLink = mobileMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        }, 100);
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = '';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
}

function closeMobileMenu(mobileMenu, mobileMenuToggle) {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    document.body.style.overflow = '';
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuToggle.focus(); // Return focus to toggle button
}

function adjustMobileMenuPosition(mobileMenu) {
    // Adjust menu position for landscape orientation
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    if (windowHeight < 600 && windowWidth > windowHeight) {
        // Landscape mode adjustments
        mobileMenu.style.flexDirection = 'row';
        mobileMenu.style.alignItems = 'center';
    } else {
        // Portrait mode
        mobileMenu.style.flexDirection = 'column';
        mobileMenu.style.justifyContent = 'center';
    }
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
 * Publication page specific features
 */
function initializePublicationFeatures() {
    // Enhance BibTeX toggle buttons for better mobile experience
    const bibtexButtons = document.querySelectorAll('[onclick*="toggleBibtex"]');
    bibtexButtons.forEach(button => {
        // Add better touch handling
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            button.style.transform = '';
            // Trigger the click after a short delay to ensure proper handling
            setTimeout(() => {
                button.click();
            }, 50);
        });
        
        button.addEventListener('touchcancel', () => {
            button.style.transform = '';
        });
    });
    
    // Ensure publication links are touch-friendly
    const publicationLinks = document.querySelectorAll('.publication-links a, .publication-links-home a');
    publicationLinks.forEach(link => {
        // Add visual feedback for touch
        link.addEventListener('touchstart', () => {
            link.style.opacity = '0.7';
        });
        
        link.addEventListener('touchend', () => {
            link.style.opacity = '';
        });
        
        link.addEventListener('touchcancel', () => {
            link.style.opacity = '';
        });
    });
    
    // Handle external links properly on mobile
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add a small delay on mobile to ensure the touch feedback is visible
            if (window.innerWidth <= 768) {
                e.preventDefault();
                setTimeout(() => {
                    window.open(link.href, '_blank');
                }, 100);
            }
        });
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

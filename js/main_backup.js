/**
 * Main JavaScript file for Vikash Singh's Portfolio Website
 * Handles theme toggling, mobile menu, navigation, animations, and dynamic footer
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
    initializeTypingAnimations();
    initializeCursorEffects();
});

/**
 * Dynamic Footer Features
 */
function initializeDynamicFooter() {
    createFooterParticles();
    animateCounters();
    initializeFooterInteractions();
    initializeDynamicContent();
    enhanceParticleEffects();
    addWeatherEffects();
    addSectionRevealAnimations();
}

function createFooterParticles() {
    const particleContainer = document.getElementById('footer-particles');
    if (!particleContainer) return;

    // Create floating particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle(particleContainer);
        }, i * 500);
    }

    // Continuously create new particles
    setInterval(() => {
        createParticle(particleContainer);
    }, 2000);
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

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.social-icon, .download-cv, .footer-links a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.1)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.filter = '';
        });
    });

    // Add progressive loading effect to footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
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
 * Typing Animations
 */
function initializeTypingAnimations() {
    const typingElements = document.querySelectorAll('.typing-animation, .typing');
    
    typingElements.forEach((element, index) => {
        if (element.classList.contains('typing')) {
            setTimeout(() => {
                typeWriter(element, element.textContent, 100);
            }, index * 1000);
        }
    });
}

function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    element.classList.add('typing');
    
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            setTimeout(() => {
                element.classList.remove('typing');
            }, 1000);
        }
    }, speed);
}

/**
 * Advanced Cursor Effects
 */
function initializeCursorEffects() {
    // Create custom cursor trail
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = [];
    for (let i = 0; i < 10; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Update trail
        cursorTrail.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = mouseX + 'px';
                trail.style.top = mouseY + 'px';
            }, index * 20);
        });
    });

    // Add hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .social-icon, .research-tags li');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

/**
 * Enhanced Scroll Animations
 */
function initializeScrollAnimations() {
    // Add scroll-triggered animations
    const scrollElements = document.querySelectorAll('.news-list li, .publication-item-home, .social-links a');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    scrollElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px) translateY(20px)';
        element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        scrollObserver.observe(element);
    });
}

/**
 * Dynamic Background Effects
 */
function initializeBackgroundEffects() {
    // Add animated background gradient
    const body = document.body;
    let gradientAngle = 0;
    
    setInterval(() => {
        gradientAngle = (gradientAngle + 1) % 360;
        body.style.backgroundImage = `linear-gradient(${gradientAngle}deg, 
            var(--current-bg) 0%, 
            rgba(74, 144, 226, 0.02) 50%, 
            var(--current-bg) 100%)`;
    }, 100);
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
 * Enhanced Mobile menu management
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
        mobileMenu.style.animation = 'slideInRight 0.3s ease-out forwards';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        mobileMenu.style.animation = 'slideOutRight 0.3s ease-out forwards';
    }
}

function closeMobileMenu(mobileMenu, mobileMenuToggle) {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    mobileMenu.style.animation = 'slideOutRight 0.3s ease-out forwards';
}

/**
 * Enhanced Navigation management
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a, #mobile-menu ul li a');
    const currentPath = getCurrentPagePath();

    navLinks.forEach(link => {
        const linkPath = getLinkPath(link);
        if (linkPath === currentPath) {
            link.classList.add('active');
            
            // Add glowing effect to active link
            link.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.5)';
        } else {
            link.classList.remove('active');
        }
        
        // Add hover animation
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(-2px)';
                link.style.boxShadow = '0 4px 15px rgba(74, 144, 226, 0.3)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = '';
                link.style.boxShadow = '';
            }
        });
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
 * Enhanced Animation management
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
    
    // Initialize additional animations
    initializeScrollAnimations();
    initializeBackgroundEffects();
}

/**
 * Additional Dynamic Footer Enhancements
 */

// Add dynamic time and visitor counter
function initializeDynamicContent() {
    addRealTimeFeatures();
    addVisitorCounter();
    addDynamicGreeting();
    addScrollProgressIndicator();
}

function addRealTimeFeatures() {
    // Add current time display
    const timeDisplay = document.createElement('div');
    timeDisplay.className = 'footer-time';
    timeDisplay.innerHTML = '<i class="fas fa-clock"></i> <span id="current-time"></span>';
    
    const footerBottom = document.querySelector('.footer-bottom-content .copyright');
    if (footerBottom) {
        footerBottom.appendChild(timeDisplay);
    }
    
    // Update time every second
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: 'numeric', 
            minute: '2-digit',
            timeZone: 'America/New_York' 
        });
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = `Cleveland: ${timeString}`;
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

function addVisitorCounter() {
    // Simulate visitor counter (in real implementation, this would connect to analytics)
    let visitorCount = localStorage.getItem('visitorCount') || Math.floor(Math.random() * 1000) + 500;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    
    // Add visitor counter to footer stats
    const footerStats = document.querySelector('.footer-stats');
    if (footerStats) {
        const visitorStat = document.createElement('div');
        visitorStat.className = 'stat-item';
        visitorStat.innerHTML = `
            <i class="fas fa-users"></i>
            <span><span class="counter" data-target="${visitorCount}">0</span> Visitors</span>
        `;
        footerStats.appendChild(visitorStat);
        
        // Animate the new counter
        const newCounter = visitorStat.querySelector('.counter');
        if (newCounter) {
            setTimeout(() => {
                animateCounter(newCounter);
            }, 1000);
        }
    }
}

function addDynamicGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) greeting = 'Good morning! ☀️';
    else if (hour < 17) greeting = 'Good afternoon! 🌤️';
    else greeting = 'Good evening! 🌙';
    
    // Add greeting to footer tagline
    const taglines = document.querySelectorAll('.footer-tagline');
    taglines.forEach(tagline => {
        if (!tagline.dataset.originalText) {
            tagline.dataset.originalText = tagline.textContent;
        }
        
        // Show greeting for 3 seconds, then show original text
        tagline.textContent = greeting;
        setTimeout(() => {
            tagline.textContent = tagline.dataset.originalText;
        }, 3000);
    });
}

function addScrollProgressIndicator() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    const footer = document.querySelector('.modern-footer');
    if (footer) {
        footer.appendChild(progressBar);
    }
    
    // Update scroll progress
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBarElement = document.querySelector('.scroll-progress-bar');
        if (progressBarElement) {
            progressBarElement.style.width = scrolled + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
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
}

// Enhanced particle effects with mouse interaction
function enhanceParticleEffects() {
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Override existing particle creation to add mouse interaction
    const originalCreateParticle = window.createParticle;
    if (originalCreateParticle) {
        window.createParticle = function(container) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Create particles near mouse when in footer area
            const footer = document.querySelector('.modern-footer');
            const footerRect = footer ? footer.getBoundingClientRect() : null;
            
            let startX;
            if (footerRect && mouseY > footerRect.top && mouseY < footerRect.bottom) {
                // Mouse is in footer area - create particles near mouse
                const relativeX = ((mouseX - footerRect.left) / footerRect.width) * 100;
                startX = Math.max(0, Math.min(100, relativeX + (Math.random() - 0.5) * 30));
            } else {
                // Default random position
                startX = Math.random() * 100;
            }
            
            const animationDuration = 12 + Math.random() * 8;
            const size = 2 + Math.random() * 3;
            
            particle.style.left = startX + '%';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.animationDuration = animationDuration + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            // Add mouse attraction effect
            particle.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
            
            container.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, (animationDuration + 2) * 1000);
        };
    }
}

// Add weather-like effects
function addWeatherEffects() {
    const hour = new Date().getHours();
    const footer = document.querySelector('.modern-footer');
    
    if (!footer) return;
    
    // Evening/night mode with different particle colors
    if (hour >= 18 || hour <= 6) {
        footer.classList.add('night-mode');
        // Add twinkling stars effect
        createTwinklingStars();
    } else {
        footer.classList.add('day-mode');
    }
}

function createTwinklingStars() {
    const footer = document.querySelector('.modern-footer');
    if (!footer) return;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'twinkling-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            
            footer.appendChild(star);
            
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 10000);
        }, i * 500);
    }
}

// Add footer section reveal animations
function addSectionRevealAnimations() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    footerSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0) scale(1)';
        }, index * 300);
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

// Add loading screen animation
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});
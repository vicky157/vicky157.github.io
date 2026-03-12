/**
 * Main TypeScript module for Vikash Singh's Portfolio Website
 * Handles theme toggling, mobile menu, navigation, animations, and footer effects
 */

import './types';

const MAX_PARTICLES = 30;

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeMobileMenu();
  initializeNavigation();
  initializeAnimations();
  initializeDynamicFooter();
  initializeInteractiveElements();
  initializeViewportFix();
  initializeBibtexToggles();
  updateCurrentYear();
});

// Smooth scrolling for anchor links
document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'A') {
    const href = target.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
});

/**
 * Theme management
 */
function initializeTheme(): void {
  const themeToggleButton = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = themeToggleButton?.querySelector('.fa-sun') as HTMLElement | null;
  const moonIcon = themeToggleButton?.querySelector('.fa-moon') as HTMLElement | null;

  if (!themeToggleButton || !sunIcon || !moonIcon) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme, body, sunIcon, moonIcon);

  themeToggleButton.addEventListener('click', () => {
    const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    applyTheme(newTheme, body, sunIcon, moonIcon);

    themeToggleButton.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeToggleButton.style.transform = '';
      body.style.transition = '';
    }, 500);
  });
}

function applyTheme(
  theme: string,
  body: HTMLElement,
  sunIcon: HTMLElement,
  moonIcon: HTMLElement
): void {
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
function initializeMobileMenu(): void {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuToggle || !mobileMenu) return;

  mobileMenuToggle.addEventListener('click', (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu(mobileMenu, mobileMenuToggle);
  });

  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      mobileMenu.classList.contains('active') &&
      !mobileMenu.contains(target) &&
      !mobileMenuToggle.contains(target)
    ) {
      closeMobileMenu(mobileMenu, mobileMenuToggle);
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu(mobileMenu, mobileMenuToggle);
    });
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu(mobileMenu, mobileMenuToggle);
    }
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      if (mobileMenu.classList.contains('active')) {
        adjustMobileMenuPosition(mobileMenu);
      }
    }, 100);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
      closeMobileMenu(mobileMenu, mobileMenuToggle);
    }
  });
}

function toggleMobileMenu(mobileMenu: HTMLElement, mobileMenuToggle: HTMLElement): void {
  const isActive = mobileMenu.classList.toggle('active');
  const icon = mobileMenuToggle.querySelector('i')!;

  if (isActive) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    document.body.style.overflow = 'hidden';
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      const firstLink = mobileMenu.querySelector('a') as HTMLElement | null;
      firstLink?.focus();
    }, 100);
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    document.body.style.overflow = '';
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }
}

function closeMobileMenu(mobileMenu: HTMLElement, mobileMenuToggle: HTMLElement): void {
  mobileMenu.classList.remove('active');
  const icon = mobileMenuToggle.querySelector('i')!;
  icon.classList.remove('fa-times');
  icon.classList.add('fa-bars');
  document.body.style.overflow = '';
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenuToggle.focus();
}

function adjustMobileMenuPosition(mobileMenu: HTMLElement): void {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  if (windowHeight < 600 && windowWidth > windowHeight) {
    mobileMenu.style.flexDirection = 'row';
    mobileMenu.style.alignItems = 'center';
  } else {
    mobileMenu.style.flexDirection = 'column';
    mobileMenu.style.justifyContent = 'center';
  }
}

/**
 * Navigation active state
 */
function initializeNavigation(): void {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(
    'nav ul li a, #mobile-menu ul li a'
  );
  const currentPath = getCurrentPagePath();

  navLinks.forEach((link) => {
    const linkPath = getLinkPath(link);
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function getCurrentPagePath(): string {
  const path = window.location.pathname.split('/').pop();
  return path || 'index.html';
}

function getLinkPath(link: HTMLAnchorElement): string {
  const href = link.getAttribute('href');
  return href ? href.split('/').pop() || 'index.html' : 'index.html';
}

/**
 * Scroll-triggered fade-in animations
 */
function initializeAnimations(): void {
  const fadeElems = document.querySelectorAll<HTMLElement>(
    '.card-style, .content-section, .hero-section, .publication-item, .entry, .blog-post-summary'
  );

  if (fadeElems.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in', 'visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.1 }
  );

  fadeElems.forEach((elem) => {
    elem.classList.add('fade-in');
    observer.observe(elem);
  });
}

/**
 * Dynamic footer with particles
 */
function initializeDynamicFooter(): void {
  createFooterParticles();
  animateCounters();
  initializeFooterInteractions();
}

function createFooterParticles(): void {
  const particleContainer = document.getElementById('footer-particles');
  if (!particleContainer) return;

  for (let i = 0; i < 10; i++) {
    setTimeout(() => createParticle(particleContainer), i * 500);
  }

  setInterval(() => {
    // Cap max particles to prevent memory leak
    if (particleContainer.children.length < MAX_PARTICLES) {
      createParticle(particleContainer);
    }
  }, 3000);
}

function createParticle(container: HTMLElement): void {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const startX = Math.random() * 100;
  const animationDuration = 15 + Math.random() * 10;
  const size = 2 + Math.random() * 4;

  particle.style.left = `${startX}%`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.animationDuration = `${animationDuration}s`;
  particle.style.animationDelay = `${Math.random() * 2}s`;

  container.appendChild(particle);

  setTimeout(() => {
    particle.parentNode?.removeChild(particle);
  }, (animationDuration + 2) * 1000);
}

function animateCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('.counter');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const increment = target / 50;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = String(target);
              clearInterval(timer);
            } else {
              counter.textContent = String(Math.floor(current));
            }
          }, 20);

          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function initializeFooterInteractions(): void {
  document.querySelectorAll<HTMLElement>('.research-tags li').forEach((tag) => {
    tag.addEventListener('click', () => {
      createRippleEffect(tag);
      tag.style.transform = 'scale(1.1) translateY(-5px)';
      setTimeout(() => {
        tag.style.transform = '';
      }, 200);
    });
  });
}

/**
 * Interactive elements: ripple effect + viewport fix
 */
function initializeInteractiveElements(): void {
  const clickableElements = document.querySelectorAll<HTMLElement>(
    '.btn, .social-icon, .publication-links-home a, .btn-icon, .publication-links a'
  );
  clickableElements.forEach((element) => {
    element.addEventListener('click', (e: MouseEvent) => {
      createRippleEffect(element, e);
    });
  });
}

function initializeViewportFix(): void {
  function setViewportHeight(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
  });
}

function createRippleEffect(element: HTMLElement, event: MouseEvent | null = null): void {
  const existingRipple = element.querySelector('.ripple-effect');
  if (existingRipple) existingRipple.remove();

  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();

  let x: number;
  let y: number;
  if (event) {
    x = (event.clientX || event.pageX) - rect.left;
    y = (event.clientY || event.pageY) - rect.top;
  } else {
    x = rect.width / 2;
    y = rect.height / 2;
  }

  const size = Math.max(rect.width, rect.height) * 2;

  ripple.style.left = `${x - size / 2}px`;
  ripple.style.top = `${y - size / 2}px`;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.className = 'ripple-effect';

  element.style.position = 'relative';
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.parentNode?.removeChild(ripple);
  }, 600);
}

/**
 * BibTeX toggle (used on index + publications pages)
 */
function toggleBibtex(event: Event, bibtexId: string): void {
  const target = event.target as HTMLElement;
  if (target.tagName === 'A') {
    event.preventDefault();
  }

  const bibtexEntry = document.getElementById(bibtexId);
  if (!bibtexEntry) {
    console.warn('BibTeX entry not found:', bibtexId);
    return;
  }

  const isCurrentlyVisible = bibtexEntry.style.display === 'block';
  const thisButton = document.querySelector(`[onclick*="${bibtexId}"]`);

  // Close all other BibTeX entries
  document.querySelectorAll<HTMLElement>('[id^="bibtex-entry-"]').forEach((entry) => {
    if (entry.id !== bibtexId) {
      entry.style.display = 'none';
      const button = document.querySelector(`[onclick*="${entry.id}"]`);
      if (button) {
        const text = button.childNodes[button.childNodes.length - 1];
        if (text?.nodeType === Node.TEXT_NODE) {
          text.textContent = ' BibTeX';
        }
        button.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (isCurrentlyVisible) {
    bibtexEntry.style.display = 'none';
    updateBibtexButtonText(bibtexId, ' BibTeX');
    thisButton?.setAttribute('aria-expanded', 'false');
  } else {
    bibtexEntry.style.display = 'block';
    updateBibtexButtonText(bibtexId, ' Hide BibTeX');
    thisButton?.setAttribute('aria-expanded', 'true');

    if (window.innerWidth <= 768) {
      setTimeout(() => {
        bibtexEntry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }
}

function updateBibtexButtonText(bibtexId: string, newText: string): void {
  const button = document.querySelector(`[onclick*="${bibtexId}"]`);
  if (button) {
    const textNode = button.childNodes[button.childNodes.length - 1];
    if (textNode?.nodeType === Node.TEXT_NODE) {
      textNode.textContent = newText;
    }
  }
}

function initializeBibtexToggles(): void {
  // Expose toggleBibtex globally for onclick handlers in HTML
  window.toggleBibtex = toggleBibtex;
}

/**
 * Update copyright year
 */
function updateCurrentYear(): void {
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }
}

/**
 * Scroll-triggered fade-in animations, ripple effects, and interactive elements
 */

const MAX_PARTICLES = 30;

export function initAnimations(): void {
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

export function initInteractiveElements(): void {
  const clickableElements = document.querySelectorAll<HTMLElement>(
    '.btn, .social-icon, .publication-links-home a, .btn-icon, .publication-links a'
  );
  clickableElements.forEach((element) => {
    element.addEventListener('click', (e: MouseEvent) => {
      createRippleEffect(element, e);
    });
  });
}

export function createRippleEffect(element: HTMLElement, event: MouseEvent | null = null): void {
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

export function initDynamicFooter(): void {
  createFooterParticles();
  animateCounters();
  initFooterInteractions();
}

function createFooterParticles(): void {
  const particleContainer = document.getElementById('footer-particles');
  if (!particleContainer) return;

  for (let i = 0; i < 10; i++) {
    setTimeout(() => createParticle(particleContainer), i * 500);
  }

  setInterval(() => {
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

function initFooterInteractions(): void {
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

export function initViewportFix(): void {
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

/**
 * Scroll-triggered fade-in animations, ripple effects, and interactive elements
 */

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

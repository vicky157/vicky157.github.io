/**
 * Minimal mobile menu: slide-in panel from right
 */

let menu: HTMLElement | null = null;
let overlay: HTMLElement | null = null;
let toggleBtn: HTMLElement | null = null;
let closeBtn: HTMLElement | null = null;

function open(): void {
  if (!menu || !overlay || !toggleBtn) return;
  menu.classList.add('open');
  overlay.classList.add('open');
  toggleBtn.classList.add('open');
  toggleBtn.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function close(): void {
  if (!menu || !overlay || !toggleBtn) return;
  menu.classList.remove('open');
  overlay.classList.remove('open');
  toggleBtn.classList.remove('open');
  toggleBtn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export function initMobileMenu(): void {
  menu = document.getElementById('mobile-menu');
  overlay = document.getElementById('mobile-overlay');
  toggleBtn = document.getElementById('mobile-menu-toggle');
  closeBtn = document.getElementById('mobile-menu-close');

  if (!menu || !overlay || !toggleBtn || !closeBtn) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu!.classList.contains('open') ? close() : open();
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) close();
  });
}

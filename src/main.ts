/**
 * Main TypeScript module for Vikash Singh's Portfolio Website
 * SPA entry point: renders layout, initializes router, mobile menu, footer
 */

import './types';
import { renderLayout } from './layout';
import { initRouter } from './router';
import { initMobileMenu } from './components/mobile-menu';
import { initThemeToggle } from './components/theme-toggle';
import { initFooterTerminal } from './components/footer-terminal';
import { initViewportFix } from './components/animations';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  // Render the layout shell (header + main placeholder + footer) ONCE
  app.innerHTML = renderLayout();

  // Initialize router (renders the initial page into #app-main)
  initRouter();

  // Initialize mobile menu (header elements now exist)
  initMobileMenu();

  // Initialize theme toggle (light by default, persisted choice)
  initThemeToggle();

  // Initialize footer terminal
  initFooterTerminal();

  // Initialize viewport fix
  initViewportFix();

  // Update copyright year
  updateCurrentYear();
});

function updateCurrentYear(): void {
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }
}

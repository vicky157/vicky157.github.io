/**
 * History API router for SPA navigation
 */

import type { Route } from './types';
import * as homePage from './pages/home';
import * as publicationsPage from './pages/publications';
import * as educationExperiencePage from './pages/education-experience';
import * as blogPage from './pages/blog';
import * as contactPage from './pages/contact';
import { destroySpotifyWidget } from './components/spotify-widget';

const routes: Route[] = [
  {
    path: '/',
    title: 'Home - Vikash Singh',
    page: 'home',
    render: homePage.render,
    afterRender: homePage.afterRender,
  },
  {
    path: '/publications',
    title: 'Publications - Vikash Singh',
    page: 'publications',
    render: publicationsPage.render,
    afterRender: publicationsPage.afterRender,
  },
  {
    path: '/education-experience',
    title: 'Education & Experience - Vikash Singh',
    page: 'education-experience',
    render: educationExperiencePage.render,
    afterRender: educationExperiencePage.afterRender,
  },
  {
    path: '/blogs',
    title: 'Blog - Vikash Singh',
    page: 'blogs',
    render: blogPage.render,
    afterRender: blogPage.afterRender,
  },
  {
    path: '/contact',
    title: 'Contact - Vikash Singh',
    page: 'contact',
    render: contactPage.render,
    afterRender: contactPage.afterRender,
  },
];

let currentPage: string | null = null;

function findRoute(path: string): Route | undefined {
  // Normalize: strip trailing slash (except for root)
  const normalized = path === '/' ? '/' : path.replace(/\/$/, '');
  return routes.find((r) => r.path === normalized);
}

function navigateTo(path: string, pushState = true): void {
  const route = findRoute(path);
  if (!route) {
    // Fallback to home for unknown routes
    navigateTo('/', pushState);
    return;
  }

  const appMain = document.getElementById('app-main');
  if (!appMain) return;

  // Run cleanup for leaving page
  if (currentPage === 'home') {
    destroySpotifyWidget();
  }

  // Clean up any FABs from blog page
  if (currentPage === 'blogs' && route.page !== 'blogs') {
    document.getElementById('fab')?.remove();
    document.querySelector('.reading-line')?.remove();
    // Also clean up any blog controls that were inserted outside app-main
    document.querySelectorAll('.blog-controls').forEach((el) => el.remove());
  }

  // Update state
  if (pushState) {
    history.pushState({ path: route.path }, route.title, route.path);
  }

  document.title = route.title;
  document.body.setAttribute('data-page', route.page);
  currentPage = route.page;

  // Render page content
  appMain.innerHTML = route.render();

  // Scroll to top
  window.scrollTo(0, 0);

  // Run afterRender hooks
  if (route.afterRender) {
    route.afterRender();
  }
}

export function initRouter(): void {
  // Intercept all internal link clicks
  document.addEventListener('click', (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
    if (!target) return;

    const href = target.getAttribute('href');
    if (!href) return;

    // Skip external links and special links
    if (
      target.hasAttribute('target') ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('#') ||
      href.endsWith('.pdf') ||
      href.endsWith('.html') ||
      href.startsWith('tel:')
    ) {
      return;
    }

    // Check if it's one of our SPA routes
    const route = findRoute(href);
    if (route) {
      e.preventDefault();
      navigateTo(href);
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, false);
  });

  // Handle smooth scrolling for anchor links (skip bare "#")
  document.addEventListener('click', (e: MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Determine initial path (check for SPA redirect from 404.html)
  let initialPath = window.location.pathname;

  const redirectPath = sessionStorage.getItem('spa-redirect-path');
  if (redirectPath) {
    sessionStorage.removeItem('spa-redirect-path');
    initialPath = redirectPath;
  }

  // Navigate to initial route
  navigateTo(initialPath, false);
}

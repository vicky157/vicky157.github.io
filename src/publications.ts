/**
 * Publication-specific features: abstract toggle, BibTeX copy, mobile touch support
 */

import './types';

document.addEventListener('DOMContentLoaded', () => {
  initializeAbstractToggles();
  initializeBibtexCopyButtons();
  initializeMobileBibtexSupport();
});

/**
 * Abstract toggle (mirrors BibTeX pattern, independent states)
 */
function toggleAbstract(event: Event, abstractId: string): void {
  if (event?.preventDefault) event.preventDefault();

  const abstractEl = document.getElementById(abstractId);
  if (!abstractEl) {
    console.warn('Abstract entry not found:', abstractId);
    return;
  }

  const isVisible = abstractEl.style.display === 'block';
  const thisButton = document.querySelector(`[onclick*="${abstractId}"]`);

  // Close other abstracts
  document.querySelectorAll<HTMLElement>('[id^="abs-"]').forEach((el) => {
    if (el.id !== abstractId) {
      el.style.display = 'none';
      updateAbstractButtonText(el.id, ' Abstract');
      const btn = document.querySelector(`[onclick*="${el.id}"]`);
      btn?.setAttribute('aria-expanded', 'false');
    }
  });

  if (isVisible) {
    abstractEl.style.display = 'none';
    updateAbstractButtonText(abstractId, ' Abstract');
    thisButton?.setAttribute('aria-expanded', 'false');
  } else {
    abstractEl.style.display = 'block';
    updateAbstractButtonText(abstractId, ' Hide Abstract');
    thisButton?.setAttribute('aria-expanded', 'true');
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        abstractEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }
}

function updateAbstractButtonText(abstractId: string, newText: string): void {
  const button = document.querySelector(`[onclick*="${abstractId}"]`);
  if (button) {
    const textNode = button.childNodes[button.childNodes.length - 1];
    if (textNode?.nodeType === Node.TEXT_NODE) {
      textNode.textContent = newText;
    }
  }
}

function initializeAbstractToggles(): void {
  window.toggleAbstract = toggleAbstract;
}

/**
 * BibTeX copy functionality
 */
function copyBibtexToClipboard(bibtexId: string): void {
  const bibtexEntry = document.getElementById(bibtexId);
  if (!bibtexEntry) return;

  const codeEl = bibtexEntry.querySelector('code');
  if (!codeEl) return;

  const bibtexText = codeEl.textContent?.trim() || '';

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(bibtexText)
      .then(() => showCopyNotification('BibTeX copied to clipboard!'))
      .catch(() => fallbackCopyText(bibtexText));
  } else {
    fallbackCopyText(bibtexText);
  }
}

function fallbackCopyText(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    showCopyNotification('BibTeX copied to clipboard!');
  } catch {
    showCopyNotification('Copy failed. Please select and copy manually.');
  }

  document.body.removeChild(textArea);
}

function showCopyNotification(message: string): void {
  document.querySelector('.copy-notification')?.remove();

  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--current-theme-accent);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 14px;
    z-index: 1001;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.parentNode?.removeChild(notification), 300);
  }, 2000);
}

function initializeBibtexCopyButtons(): void {
  document.querySelectorAll<HTMLElement>('[id^="bibtex-entry-"]').forEach((entry) => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyButton.className = 'copy-bibtex-btn';
    copyButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(74, 144, 226, 0.8);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 5px;
    `;

    copyButton.addEventListener('click', () => copyBibtexToClipboard(entry.id));

    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.background = 'rgba(74, 144, 226, 1)';
      copyButton.style.transform = 'scale(1.05)';
    });

    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.background = 'rgba(74, 144, 226, 0.8)';
      copyButton.style.transform = 'scale(1)';
    });

    entry.style.position = 'relative';
    entry.appendChild(copyButton);
  });
}

/**
 * Enhanced mobile support for BibTeX buttons
 */
function initializeMobileBibtexSupport(): void {
  document.querySelectorAll<HTMLElement>('[onclick*="toggleBibtex"]').forEach((button) => {
    button.addEventListener(
      'touchend',
      function (this: HTMLElement, e: TouchEvent) {
        e.preventDefault();
        const onclickAttr = this.getAttribute('onclick') || '';
        const matches = onclickAttr.match(/toggleBibtex\(event,\s*['"]([^'"]+)['"]\)/);
        if (matches?.[1]) {
          window.toggleBibtex(e, matches[1]);
        }
      },
      { passive: false }
    );

    button.addEventListener('touchstart', function (this: HTMLElement) {
      this.style.opacity = '0.7';
    });

    button.addEventListener('touchend', function (this: HTMLElement) {
      this.style.opacity = '1';
    });
  });
}

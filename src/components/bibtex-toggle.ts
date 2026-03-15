/**
 * BibTeX and Abstract toggle logic using event delegation
 */

let toggleListenerAttached = false;

export function initToggles(container?: HTMLElement): void {
  const root = container || document.getElementById('app-main');
  if (!root) return;

  // Only attach the delegation listener once
  if (!toggleListenerAttached) {
    root.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const button = target.closest('[data-toggle-bibtex], [data-toggle-abstract]') as HTMLElement | null;
    if (!button) return;

    e.preventDefault();

    const bibtexId = button.getAttribute('data-toggle-bibtex');
    const abstractId = button.getAttribute('data-toggle-abstract');

    if (bibtexId) {
      toggleEntry(bibtexId, 'bibtex-entry-', 'BibTeX', button);
    } else if (abstractId) {
      toggleEntry(abstractId, 'abs-', 'Abstract', button);
    }
  });
    toggleListenerAttached = true;
  }

  // Add copy buttons to bibtex entries (re-run on each page render)
  initBibtexCopyButtons(root);
}

function toggleEntry(entryId: string, prefix: string, label: string, clickedButton: HTMLElement): void {
  const entry = document.getElementById(entryId);
  if (!entry) {
    console.warn(`${label} entry not found:`, entryId);
    return;
  }

  const isCurrentlyVisible = entry.style.display === 'block';

  // Close all other entries of same type
  const selector = prefix === 'bibtex-entry-' ? '[id^="bibtex-entry-"]' : '[id^="abs-"]';
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    if (el.id !== entryId) {
      el.style.display = 'none';
      // Update the button text for closed entries
      const attr = prefix === 'bibtex-entry-' ? 'data-toggle-bibtex' : 'data-toggle-abstract';
      const btn = document.querySelector(`[${attr}="${el.id}"]`);
      if (btn) {
        updateButtonText(btn as HTMLElement, ` ${label}`);
        btn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (isCurrentlyVisible) {
    entry.style.display = 'none';
    updateButtonText(clickedButton, ` ${label}`);
    clickedButton.setAttribute('aria-expanded', 'false');
  } else {
    entry.style.display = 'block';
    updateButtonText(clickedButton, ` Hide ${label}`);
    clickedButton.setAttribute('aria-expanded', 'true');

    if (window.innerWidth <= 768) {
      setTimeout(() => {
        entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }
}

function updateButtonText(button: HTMLElement, newText: string): void {
  const textNode = button.childNodes[button.childNodes.length - 1];
  if (textNode?.nodeType === Node.TEXT_NODE) {
    textNode.textContent = newText;
  }
}

function initBibtexCopyButtons(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[id^="bibtex-entry-"]').forEach((entry) => {
    // Don't add duplicate buttons
    if (entry.querySelector('.copy-bibtex-btn')) return;

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

    copyButton.addEventListener('click', (e) => {
      e.stopPropagation();
      copyBibtexToClipboard(entry.id);
    });

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

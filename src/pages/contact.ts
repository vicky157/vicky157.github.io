/**
 * Contact page: contact details, skills, ongoing work
 */

import { contactItems, skills, ongoingWork } from '../data/contact';
import { initAnimations, initInteractiveElements } from '../components/animations';

export function render(): string {
  const contactItemsHtml = contactItems.map((item) => {
    let valueHtml: string;
    if (item.href) {
      const targetAttr = item.target ? ` target="${item.target}" rel="noopener"` : '';
      valueHtml = `<a href="${item.href}"${targetAttr}>${item.value}</a>`;
    } else if (item.label === 'Phone') {
      valueHtml = `${item.value} <span style="display:block; font-size:0.75em; color: var(--current-text-secondary);">(Use email for initial contact)</span>`;
    } else {
      valueHtml = item.value;
    }

    return `                <div class="contact-detail-item">
                    <i class="${item.icon}"></i>
                    <div>
                        <div class="label">${item.label}</div>
                        <div class="value">${valueHtml}</div>
                    </div>
                </div>`;
  }).join('\n');

  const ongoingHtml = ongoingWork
    .map((item) => `                    <li>${item}</li>`)
    .join('\n');

  return `
        <section id="contact-info" class="content-section card-style">
            <h2>Get In Touch</h2>
            <p>Feel free to reach out to me through any of the following platforms. I'm always open to discussing research, projects, or potential collaborations.</p>

            <div class="contact-details-grid">
${contactItemsHtml}
            </div>
        </section>

        <section id="other-info" class="content-section card-style">
            <h2>Additional Information</h2>
            <div class="entry">
                <h3>Technical Skills</h3>
                <ul class="skill-list">
                    <li><strong>Languages:</strong> ${skills.languages}</li>
                    <li><strong>Developer Tools:</strong> ${skills.devTools}</li>
                    <li><strong>Technologies/Frameworks:</strong> ${skills.frameworks}</li>
                    <li><strong>Platforms:</strong> ${skills.platforms}</li>
                </ul>
            </div>
            <div class="entry">
                <h3>Ongoing Work Sneak Peek</h3>
                <ul>
${ongoingHtml}
                </ul>
            </div>
        </section>
  `;
}

export function afterRender(): void {
  initAnimations();
  initInteractiveElements();
}

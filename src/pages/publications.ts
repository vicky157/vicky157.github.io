/**
 * Publications page: all publications, research interests, research statement
 */

import { publications, researchInterests, researchStatement } from '../data/publications';
import { initToggles } from '../components/bibtex-toggle';
import { initAnimations, initInteractiveElements } from '../components/animations';
import type { Publication } from '../types';

function renderPublication(pub: Publication): string {
  const linksHtml = pub.links.map((link) => {
    if (link.isInternal) {
      return `<a href="${link.url}" class="btn-icon"><i class="${link.icon}"></i> ${link.label}</a>`;
    }
    return `<a href="${link.url}" target="_blank" class="btn-icon"><i class="${link.icon}"></i> ${link.label}</a>`;
  }).join('\n                        ');

  const abstractBtn = pub.abstract
    ? `\n                        <a class="btn-icon" data-toggle-abstract="abs-${pub.id}" role="button"><i class="fas fa-align-left"></i> Abstract</a>`
    : '';

  const abstractDiv = pub.abstract
    ? `\n                    <div id="abs-${pub.id}" style="display:none; margin-top:1em; background:var(--current-glass-bg); padding:1em; border:1px solid var(--current-glass-border); border-radius:8px;">
                        <p style="margin:0;">${pub.abstract}</p>
                    </div>`
    : '';

  const equalContrib = pub.equalContribution
    ? `\n                    <p style="font-size:0.85em; font-style:italic; margin:-0.6rem 0 0.6rem; color:var(--current-text-secondary);">${pub.equalContribution}</p>`
    : '';

  return `                <li class="publication-item" style="padding:0 0 1.2em; margin:0 0 1.8em; border-bottom:1px dashed var(--current-glass-border);">
                    <h3 class="publication-title" style="margin-top:0;">${pub.title}</h3>
                    <p class="publication-authors">${pub.authors}</p>${equalContrib}
                    <p class="publication-venue">${pub.venue}</p>
                    <div class="publication-actions" style="display:flex; flex-wrap:wrap; gap:10px;">
                        ${linksHtml}${abstractBtn}
                        <a class="btn-icon" data-toggle-bibtex="bibtex-entry-${pub.id}" role="button"><i class="fas fa-quote-right"></i> BibTeX</a>
                    </div>${abstractDiv}
                    <div id="bibtex-entry-${pub.id}" style="display:none; margin-top:1em; background:var(--current-glass-bg); padding:1em; border-radius:8px; border:1px solid var(--current-glass-border);">
                        <pre style="white-space:pre-wrap; word-wrap:break-word; font-family:monospace; font-size:0.9em;"><code>${pub.bibtex}</code></pre>
                    </div>
                </li>`;
}

export function render(): string {
  const pubsHtml = publications.map(renderPublication).join('\n');

  const interestsHtml = researchInterests
    .map((i) => `                <li><strong>${i.title}:</strong> ${i.description}</li>`)
    .join('\n');

  const statementSections = researchStatement.sections.map((section, idx) => {
    const paragraphs = section.paragraphs.map((p, pIdx) => {
      const marginStyle = pIdx === section.paragraphs.length - 1 ? ' style="margin:0;"' : '';
      return `                    <p${marginStyle}>${p}</p>`;
    }).join('\n');

    const marginStyle = idx === researchStatement.sections.length - 1 ? 'margin: 0;' : 'margin: 0 0 2rem;';

    return `                <figure style="${marginStyle} border: 1px solid var(--grid-line); padding: 1.25rem;">
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:0.75rem;">
                        <i class="${section.icon}" aria-hidden="true"></i>
                        <figcaption style="font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem;">
                            ${section.label}
                        </figcaption>
                    </div>
${paragraphs}
                </figure>`;
  }).join('\n\n');

  return `
        <div>
        <section id="publications-list" class="content-section card-style">
            <h2>Publications</h2>
            <p style="margin-bottom: 2rem; color: var(--current-text-secondary);">Select a paper and use the Abstract or BibTeX buttons to reveal details.</p>
            <ul style="list-style:none; margin:0; padding:0;">
${pubsHtml}
            </ul>
        </section>

        <section id="research-interests" class="content-section card-style">
            <h2>Research Interests</h2>
            <ul class="interest-list">
${interestsHtml}
            </ul>
        </section>
        </div>

        <details id="research-statement-details">
            <summary class="research-statement-toggle">Research Statement</summary>
            <section id="research-statement" class="content-section card-style">
${statementSections}
            </section>
        </details>
  `;
}

export function afterRender(): void {
  initToggles();
  initAnimations();
  initInteractiveElements();
}

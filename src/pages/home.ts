/**
 * Home page: hero, about (research pillars), featured publications, news
 */

import { publications, venueBadge, venueDate } from '../data/publications';
import { newsItems } from '../data/news';
import { initToggles } from '../components/bibtex-toggle';
import { renderLinkFs, initLinkFs } from '../components/link-fs';
import { initAnimations, initInteractiveElements } from '../components/animations';

const NEWS_VISIBLE_COUNT = 5;

function renderPublicationHome(pub: typeof publications[0]): string {
  const badge = venueBadge(pub);
  const date = venueDate(pub);

  const linksHtml = pub.links.map((link) => {
    const targetAttr = link.isInternal ? '' : ' target="_blank"';
    return `<a href="${link.url}"${targetAttr} class="pub-link"><i class="${link.icon}"></i> ${link.label}</a>`;
  }).join('\n                    ');

  return `
            <div class="publication-item-home">
                <div class="pub-meta-row">
                    <span class="venue-badge${badge.muted ? ' muted' : ''}">${badge.label}</span>
                    ${date ? `<span class="pub-date">${date}</span>` : ''}
                </div>
                <h3 class="publication-title-home">${pub.title}</h3>
                <p class="publication-authors-home">${pub.authors}</p>
                <div class="pub-links">
                    ${linksHtml}
                    <a data-toggle-bibtex="bibtex-entry-${pub.id}" class="pub-link" role="button" aria-expanded="false"><i class="fas fa-quote-right"></i> BibTeX</a>
                </div>
                <div id="bibtex-entry-${pub.id}" style="display: none; margin-top: 1em; background-color: var(--current-glass-bg); padding: 1em; border-radius: 8px; border: 1px solid var(--current-glass-border);">
                    <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 0.9em;"><code>${pub.bibtex}</code></pre>
                </div>
            </div>`;
}

function renderNewsItem(item: typeof newsItems[0], hidden: boolean): string {
  return `                <li${hidden ? ' class="news-extra" hidden' : ''}><span class="date">${item.date}</span> ${item.text}</li>`;
}

export function render(): string {
  // Featured publications for home page: VERGE, Trust The Typical, Grammars, Mid-Think
  const featuredIds = ['singh2026verge', 'ganguly2026t3', 'ganguly2025', 'wang2026midthink'];
  const featuredPubs = featuredIds
    .map((id) => publications.find((p) => p.id === id))
    .filter((p): p is typeof publications[0] => p !== undefined);

  const publicationsHtml = featuredPubs.map(renderPublicationHome).join('\n');

  const newsHtml = newsItems
    .map((item, i) => renderNewsItem(item, i >= NEWS_VISIBLE_COUNT))
    .join('\n');

  const newsToggleHtml = newsItems.length > NEWS_VISIBLE_COUNT
    ? `
            <div class="news-toggle-wrap">
                <button id="news-toggle" class="btn" aria-expanded="false">
                    <i class="fas fa-chevron-down"></i> Show all ${newsItems.length} updates
                </button>
            </div>`
    : '';

  return `
        <section id="hero" class="hero-section card-style">
            <div class="hero-top">
                <div class="hero-heading">
                    <p class="hero-kicker">PhD Student &middot; Case Western Reserve University &middot; Cleveland, OH</p>
                    <h1>Vikash Singh</h1>
                    <p class="hero-tagline">
                        I make LLM reasoning <strong>formally verifiable</strong> by pairing language
                        models with SMT solvers and theorem provers, so their outputs can be mathematically
                        checked before anyone has to trust them.
                    </p>
                </div>
                <img src="/assets/icons/dog-logo.svg" alt="Vikash Singh logo" class="hero-avatar" width="116" height="116">
            </div>

${renderLinkFs()}
        </section>

        <section id="about" class="card-style">
            <h2>About</h2>
            <p>
                Vikash Singh is a PhD student at Case Western Reserve University working on making Large
                Language Models safe, reliable, and formally verifiable, so they can be deployed in
                settings like healthcare, law, and automated reasoning where a plausible-but-wrong answer
                is not acceptable. His research runs along three threads:
            </p>
            <div class="pillars-grid">
                <div class="pillar">
                    <span class="pillar-num">01</span>
                    <h3 class="pillar-title">Formal Verification</h3>
                    <p>Neurosymbolic systems that pair LLMs with SMT solvers and theorem provers, so model outputs are mathematically checked for logical consistency before they reach users.</p>
                </div>
                <div class="pillar">
                    <span class="pillar-num">02</span>
                    <h3 class="pillar-title">Uncertainty Quantification</h3>
                    <p>Knowing when to trust LLM reasoning: grammar-based uncertainty signals and selective verification that catch errors token probabilities miss.</p>
                </div>
                <div class="pillar">
                    <span class="pillar-num">03</span>
                    <h3 class="pillar-title">Efficient Inference &amp; Systems</h3>
                    <p>Training-free control of inference-time compute budgets, retrieval over structured knowledge graphs, and GPU performance modeling for distributed training.</p>
                </div>
            </div>
        </section>

        <section id="latest-publications" class="card-style">
            <h2>Latest Publications</h2>
${publicationsHtml}

            <div style="text-align: center; margin-top: 2rem;">
                <a href="/publications" class="btn" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-list"></i> View All Publications
                </a>
            </div>
        </section>

        <section id="news" class="card-style">
            <h2>News &amp; Updates</h2>
            <ul class="news-list">
${newsHtml}
            </ul>${newsToggleHtml}
        </section>
  `;
}

function initNewsToggle(): void {
  const toggle = document.getElementById('news-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const extras = document.querySelectorAll<HTMLElement>('.news-list .news-extra');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    extras.forEach((li) => { li.hidden = expanded; });
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.innerHTML = expanded
      ? `<i class="fas fa-chevron-down"></i> Show all ${extras.length + NEWS_VISIBLE_COUNT} updates`
      : '<i class="fas fa-chevron-up"></i> Show fewer';
  });
}

export function afterRender(): void {
  initToggles();
  initAnimations();
  initInteractiveElements();
  initNewsToggle();
  initLinkFs();
}

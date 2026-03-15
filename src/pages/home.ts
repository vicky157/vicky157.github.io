/**
 * Home page: hero, about, featured publications, news, spotify widget
 */

import { publications } from '../data/publications';
import { newsItems } from '../data/news';
import { semanticScholarSvg } from '../layout';
import { initSpotifyWidget, destroySpotifyWidget } from '../components/spotify-widget';
import { initToggles } from '../components/bibtex-toggle';
import { initAnimations, initInteractiveElements } from '../components/animations';

function renderPublicationHome(pub: typeof publications[0]): string {
  const linksHtml = pub.links.map((link) => {
    if (link.isInternal) {
      return `<a href="${link.url}" class="btn-icon"><i class="${link.icon}"></i> ${link.label}</a>`;
    }
    return `<a href="${link.url}" target="_blank" class="btn-icon"><i class="${link.icon}"></i> ${link.label}</a>`;
  }).join('\n                    ');

  return `
            <div class="publication-item-home">
                <h3 class="publication-title-home">${pub.title}</h3>
                <p class="publication-authors-home">${pub.authors}</p>
                <p class="publication-venue-home">${pub.venue}</p>
                <div class="publication-links-home">
                    ${linksHtml}
                    <a data-toggle-bibtex="bibtex-entry-${pub.id}" class="btn-icon" role="button"><i class="fas fa-quote-right"></i> BibTeX</a>
                </div>
                <div id="bibtex-entry-${pub.id}" style="display: none; margin-top: 1em; background-color: var(--current-glass-bg); padding: 1em; border-radius: 8px; border: 1px solid var(--current-glass-border);">
                    <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 0.9em;"><code>${pub.bibtex}</code></pre>
                </div>
            </div>`;
}

export function render(): string {
  // Featured publications for home page: VERGE, Trust The Typical, Grammars, Mid-Think
  const featuredIds = ['singh2026verge', 'ganguly2026t3', 'ganguly2025', 'wang2026midthink'];
  const featuredPubs = featuredIds
    .map((id) => publications.find((p) => p.id === id))
    .filter((p): p is typeof publications[0] => p !== undefined);

  const publicationsHtml = featuredPubs.map(renderPublicationHome).join('\n');

  const newsHtml = newsItems
    .map((item) => `                <li><span class="date">${item.date}</span> ${item.text}</li>`)
    .join('\n');

  return `
        <section id="hero" class="hero-section card-style">
            <h1>Vikash Singh</h1>
            <p class="subtitle">PhD Student at Case Western Reserve University | Machine Learning & AI Researcher</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> Cleveland, OH, 44106</p>

            <div class="social-links">
                <a href="/assets/CV_Vikash_PhD.pdf" target="_blank" class="btn"><i class="fas fa-file-pdf"></i> Resume</a>
                <a href="https://github.com/vicky157" target="_blank" class="btn"><i class="fab fa-github"></i> GitHub</a>
                <a href="https://www.linkedin.com/in/vikash-singh-john/" target="_blank" class="btn"><i class="fab fa-linkedin"></i> LinkedIn</a>
                <a href="https://x.com/vikash_joh60795" target="_blank" class="btn"><i class="fab fa-x-twitter"></i> X</a>
                <a href="https://scholar.google.com/citations?user=zt0c4WsAAAAJ" target="_blank" class="btn"><i class="fas fa-graduation-cap"></i> Google Scholar</a>
                <a href="https://www.semanticscholar.org/author/Vikash-Singh/2363724234" target="_blank" class="btn">${semanticScholarSvg} Semantic Scholar</a>
                <a href="mailto:vikashjohn2505@gmail.com" class="btn"><i class="fas fa-envelope"></i> Email</a>
            </div>
        </section>

        <section id="about" class="card-style">
            <h2>About</h2>
            <p>
                Vikash Singh is a PhD student at Case Western Reserve University working on making Large Language Models safe, reliable, and formally verifiable. He builds neurosymbolic systems that pair LLMs with SMT solvers and theorem provers so that model outputs can be mathematically checked for logical consistency before they reach users in safety-critical settings like healthcare, law, and automated reasoning.
            </p>
            <p>
                Beyond formal verification, his research covers uncertainty quantification for LLM reasoning, retrieval-augmented generation with structured knowledge graphs, training-free methods for controlling inference-time compute budgets, and systems-level work on GPU performance modeling for distributed training. He is also interested in unsupervised anomaly detection, explainable AI, and model compression through pruning.
            </p>
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
            <h2>News & Updates</h2>
            <ul class="news-list">
${newsHtml}
            </ul>
        </section>

        <!-- Spotify Now Playing Widget -->
        <section id="spotify-now-playing" class="card-style spotify-widget" aria-label="Currently playing on Spotify">
            <div class="spotify-widget-inner">
                <div class="spotify-album-art-container" id="spotify-album-art-container">
                    <img id="spotify-album-art" class="spotify-album-art" src="" alt="Album art" loading="lazy">
                </div>
                <div class="spotify-track-info">
                    <div class="spotify-header">
                        <i class="fab fa-spotify"></i>
                        <span id="spotify-status-text" class="spotify-status-text">Loading...</span>
                        <div id="spotify-equalizer" class="spotify-equalizer" style="display: none;">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    <a id="spotify-track-name" class="spotify-track-name" href="#" target="_blank" rel="noopener">---</a>
                    <p id="spotify-artist-name" class="spotify-artist-name">---</p>
                    <p id="spotify-album-name" class="spotify-album-name">---</p>
                    <div class="spotify-progress-container" id="spotify-progress-container" style="display: none;">
                        <div class="spotify-progress-bar">
                            <div id="spotify-progress-fill" class="spotify-progress-fill"></div>
                        </div>
                        <div class="spotify-progress-times">
                            <span id="spotify-progress-current">0:00</span>
                            <span id="spotify-progress-duration">0:00</span>
                        </div>
                    </div>
                    <div class="spotify-actions">
                        <button id="spotify-preview-btn" class="btn spotify-preview-btn" style="display: none;" aria-label="Play preview">
                            <i class="fas fa-play"></i> Preview
                        </button>
                        <a id="spotify-open-link" class="btn spotify-open-btn" href="#" target="_blank" rel="noopener">
                            <i class="fab fa-spotify"></i> Open in Spotify
                        </a>
                    </div>
                </div>
            </div>
            <div id="spotify-embed-container" class="spotify-embed-container" style="display: none;">
                <div class="spotify-embed-header">
                    <span><i class="fas fa-headphones"></i> Preview Player</span>
                    <button id="spotify-embed-close" class="spotify-embed-close" aria-label="Close preview player">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div id="spotify-embed-wrapper" class="spotify-embed-wrapper"></div>
            </div>
        </section>
  `;
}

export function afterRender(): void {
  initSpotifyWidget();
  initToggles();
  initAnimations();
  initInteractiveElements();
}

export function onLeave(): void {
  destroySpotifyWidget();
}

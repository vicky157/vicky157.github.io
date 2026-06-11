/**
 * Contact page: uplink console, skills, ongoing work, spotify widget
 */

import { skills, ongoingWork } from '../data/contact';
import { initAnimations, initInteractiveElements } from '../components/animations';
import { initSpotifyWidget, destroySpotifyWidget } from '../components/spotify-widget';
import { renderUplink, initUplink } from '../components/uplink';

export function render(): string {

  const ongoingHtml = ongoingWork
    .map((item) => `                    <li>${item}</li>`)
    .join('\n');

  return `
${renderUplink()}

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

        <!-- Spotify Now Playing Widget (hidden until a track is available) -->
        <section id="spotify-now-playing" class="card-style spotify-widget" aria-label="Currently playing on Spotify" hidden>
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
  initUplink();
  initSpotifyWidget();
  initAnimations();
  initInteractiveElements();
}

export function onLeave(): void {
  destroySpotifyWidget();
}

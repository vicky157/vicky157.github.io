/**
 * Spotify Now Playing Widget
 * Polls a Vercel serverless endpoint and renders the current track.
 * Uses Spotify Embed iframe for preview playback.
 */

import type { SpotifyTrackData } from '../types';

const API_URL = 'https://spotify-now-playing-api.vercel.app/api/now-playing';
const POLL_INTERVAL_MS = 30_000;
const PROGRESS_TICK_MS = 1_000;

let pollIntervalId: ReturnType<typeof setInterval> | null = null;
let progressTimerId: ReturnType<typeof setInterval> | null = null;

export function destroySpotifyWidget(): void {
  if (pollIntervalId) {
    clearInterval(pollIntervalId);
    pollIntervalId = null;
  }
  if (progressTimerId) {
    clearInterval(progressTimerId);
    progressTimerId = null;
  }
}

export function initSpotifyWidget(): void {
  // Clean up any previous instance
  destroySpotifyWidget();

  const widgetEl = document.getElementById('spotify-now-playing');
  if (!widgetEl) return;
  const widget = widgetEl;

  const albumArt = document.getElementById('spotify-album-art') as HTMLImageElement;
  const statusText = document.getElementById('spotify-status-text')!;
  const equalizer = document.getElementById('spotify-equalizer')!;
  const trackName = document.getElementById('spotify-track-name') as HTMLAnchorElement;
  const artistName = document.getElementById('spotify-artist-name')!;
  const albumNameEl = document.getElementById('spotify-album-name')!;
  const progressContainer = document.getElementById('spotify-progress-container')!;
  const progressFill = document.getElementById('spotify-progress-fill')!;
  const progressCurrent = document.getElementById('spotify-progress-current')!;
  const progressDuration = document.getElementById('spotify-progress-duration')!;
  const previewBtn = document.getElementById('spotify-preview-btn')!;
  const openLink = document.getElementById('spotify-open-link') as HTMLAnchorElement;
  const embedContainer = document.getElementById('spotify-embed-container')!;
  const embedWrapper = document.getElementById('spotify-embed-wrapper')!;
  const embedClose = document.getElementById('spotify-embed-close')!;

  if (!albumArt || !statusText || !equalizer || !trackName || !artistName || !albumNameEl) return;

  let currentTrackId: string | null = null;
  let isEmbedOpen = false;
  let currentProgress = 0;
  let currentDuration = 0;

  function formatMs(ms: number): string {
    if (!ms || ms < 0) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function extractTrackId(url: string | undefined): string | null {
    if (!url) return null;
    const match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }

  function stopProgressTimer(): void {
    if (progressTimerId) {
      clearInterval(progressTimerId);
      progressTimerId = null;
    }
  }

  function updateProgressUI(): void {
    if (currentDuration > 0) {
      const pct = Math.min((currentProgress / currentDuration) * 100, 100);
      progressFill.style.width = `${pct}%`;
      progressCurrent.textContent = formatMs(currentProgress);
      progressDuration.textContent = formatMs(currentDuration);
    }
  }

  function startProgressTimer(): void {
    stopProgressTimer();
    progressTimerId = setInterval(() => {
      currentProgress += PROGRESS_TICK_MS;
      if (currentProgress > currentDuration) currentProgress = currentDuration;
      updateProgressUI();
    }, PROGRESS_TICK_MS);
  }

  function openEmbed(): void {
    if (!currentTrackId) return;

    const isDark = document.body.classList.contains('dark-mode');
    const theme = isDark ? '0' : '1';
    const embedUrl = `https://open.spotify.com/embed/track/${currentTrackId}?utm_source=generator&theme=${theme}`;

    embedWrapper.innerHTML = `<iframe src="${embedUrl}" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border-radius: 12px;"></iframe>`;

    embedContainer.style.display = 'block';
    requestAnimationFrame(() => {
      embedContainer.classList.add('open');
    });

    isEmbedOpen = true;
    previewBtn.innerHTML = '<i class="fas fa-pause"></i> Preview';
    previewBtn.classList.add('playing');
  }

  function closeEmbed(): void {
    embedContainer.classList.remove('open');
    setTimeout(() => {
      embedContainer.style.display = 'none';
      embedWrapper.innerHTML = '';
    }, 300);

    isEmbedOpen = false;
    previewBtn.innerHTML = '<i class="fas fa-play"></i> Preview';
    previewBtn.classList.remove('playing');
  }

  function toggleEmbed(): void {
    if (isEmbedOpen) {
      closeEmbed();
    } else {
      openEmbed();
    }
  }

  function render(data: SpotifyTrackData | null): void {
    widget.classList.remove('loading');

    if (!data || (!data.title && !data.isPlaying)) {
      widget.classList.add('not-playing');
      widget.classList.remove('is-playing');
      statusText.textContent = 'Offline';
      equalizer.style.display = 'none';
      trackName.textContent = 'Nothing playing';
      trackName.removeAttribute('href');
      artistName.textContent = '';
      albumNameEl.textContent = '';
      albumArt.style.display = 'none';
      progressContainer.style.display = 'none';
      previewBtn.style.display = 'none';
      openLink.style.display = 'none';
      stopProgressTimer();
      closeEmbed();
      return;
    }

    albumArt.style.display = 'block';

    if (data.isPlaying) {
      widget.classList.add('is-playing');
      widget.classList.remove('not-playing');
      statusText.textContent = 'Now Playing';
      equalizer.style.display = 'inline-flex';
    } else {
      widget.classList.remove('is-playing');
      widget.classList.add('not-playing');
      statusText.textContent = 'Last Played';
      equalizer.style.display = 'none';
    }

    trackName.textContent = data.title || '---';
    trackName.href = data.songUrl || '#';
    artistName.textContent = data.artist || '---';
    albumNameEl.textContent = data.album || '';

    if (data.albumImageUrl) {
      albumArt.src = data.albumImageUrl;
      albumArt.alt = `Album art for ${data.album || data.title}`;
    } else {
      albumArt.src = '';
      albumArt.alt = 'No album art';
    }

    // Progress bar
    if (data.isPlaying && data.progress != null && data.duration) {
      currentProgress = data.progress;
      currentDuration = data.duration;
      progressContainer.style.display = 'block';
      updateProgressUI();
      startProgressTimer();
    } else if (data.duration) {
      currentProgress = data.duration;
      currentDuration = data.duration;
      progressContainer.style.display = 'block';
      updateProgressUI();
      stopProgressTimer();
    } else {
      progressContainer.style.display = 'none';
      stopProgressTimer();
    }

    // Preview via embed
    currentTrackId = extractTrackId(data.songUrl);
    previewBtn.style.display = currentTrackId ? 'inline-flex' : 'none';

    // Open in Spotify
    if (data.songUrl) {
      openLink.style.display = 'inline-flex';
      openLink.href = data.songUrl;
    } else {
      openLink.style.display = 'none';
    }
  }

  async function fetchNowPlaying(): Promise<void> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network error');
      const data: SpotifyTrackData = await response.json();
      render(data);
    } catch (err) {
      console.warn('Spotify widget fetch error:', err);
    }
  }

  // Event listeners
  previewBtn.addEventListener('click', (e: Event) => {
    e.preventDefault();
    toggleEmbed();
  });

  embedClose.addEventListener('click', (e: Event) => {
    e.preventDefault();
    closeEmbed();
  });

  // Initial load
  widget.classList.add('loading');
  fetchNowPlaying();
  pollIntervalId = setInterval(fetchNowPlaying, POLL_INTERVAL_MS);
}

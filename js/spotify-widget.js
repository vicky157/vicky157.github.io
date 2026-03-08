/**
 * Spotify Now Playing Widget
 * Polls a Vercel serverless endpoint and renders the current track.
 * Uses Spotify Embed iframe for preview playback.
 */
(function () {
  'use strict';

  var API_URL = 'https://spotify-now-playing-api.vercel.app/api/now-playing';
  var POLL_INTERVAL_MS = 30000;
  var PROGRESS_TICK_MS = 1000;

  var widget = document.getElementById('spotify-now-playing');
  if (!widget) return;

  var albumArt = document.getElementById('spotify-album-art');
  var statusText = document.getElementById('spotify-status-text');
  var equalizer = document.getElementById('spotify-equalizer');
  var trackName = document.getElementById('spotify-track-name');
  var artistName = document.getElementById('spotify-artist-name');
  var albumNameEl = document.getElementById('spotify-album-name');
  var progressContainer = document.getElementById('spotify-progress-container');
  var progressFill = document.getElementById('spotify-progress-fill');
  var progressCurrent = document.getElementById('spotify-progress-current');
  var progressDuration = document.getElementById('spotify-progress-duration');
  var previewBtn = document.getElementById('spotify-preview-btn');
  var openLink = document.getElementById('spotify-open-link');
  var embedContainer = document.getElementById('spotify-embed-container');
  var embedWrapper = document.getElementById('spotify-embed-wrapper');
  var embedClose = document.getElementById('spotify-embed-close');

  var currentTrackId = null;
  var isEmbedOpen = false;
  var progressTimer = null;
  var currentProgress = 0;
  var currentDuration = 0;

  function formatMs(ms) {
    if (!ms || ms < 0) return '0:00';
    var totalSeconds = Math.floor(ms / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  function extractTrackId(url) {
    if (!url) return null;
    var match = url.match(/track\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }

  function startProgressTimer() {
    stopProgressTimer();
    progressTimer = setInterval(function () {
      currentProgress += PROGRESS_TICK_MS;
      if (currentProgress > currentDuration) currentProgress = currentDuration;
      updateProgressUI();
    }, PROGRESS_TICK_MS);
  }

  function stopProgressTimer() {
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
  }

  function updateProgressUI() {
    if (currentDuration > 0) {
      var pct = Math.min((currentProgress / currentDuration) * 100, 100);
      progressFill.style.width = pct + '%';
      progressCurrent.textContent = formatMs(currentProgress);
      progressDuration.textContent = formatMs(currentDuration);
    }
  }

  function openEmbed() {
    if (!currentTrackId) return;

    var isDark = document.body.classList.contains('dark-mode');
    var theme = isDark ? '0' : '1';
    var embedUrl = 'https://open.spotify.com/embed/track/' + currentTrackId +
      '?utm_source=generator&theme=' + theme;

    embedWrapper.innerHTML = '<iframe src="' + embedUrl + '" ' +
      'width="100%" height="152" frameBorder="0" ' +
      'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" ' +
      'loading="lazy" style="border-radius: 12px;"></iframe>';

    embedContainer.style.display = 'block';
    requestAnimationFrame(function () {
      embedContainer.classList.add('open');
    });

    isEmbedOpen = true;
    previewBtn.innerHTML = '<i class="fas fa-pause"></i> Preview';
    previewBtn.classList.add('playing');
  }

  function closeEmbed() {
    embedContainer.classList.remove('open');
    setTimeout(function () {
      embedContainer.style.display = 'none';
      embedWrapper.innerHTML = '';
    }, 300);

    isEmbedOpen = false;
    previewBtn.innerHTML = '<i class="fas fa-play"></i> Preview';
    previewBtn.classList.remove('playing');
  }

  function toggleEmbed() {
    if (isEmbedOpen) {
      closeEmbed();
    } else {
      openEmbed();
    }
  }

  function render(data) {
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
      albumArt.alt = 'Album art for ' + (data.album || data.title);
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

    // Preview via embed — always available if we have a track URL
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

  async function fetchNowPlaying() {
    try {
      var response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network error');
      var data = await response.json();
      render(data);
    } catch (err) {
      console.warn('Spotify widget fetch error:', err);
    }
  }

  previewBtn.addEventListener('click', function (e) {
    e.preventDefault();
    toggleEmbed();
  });

  embedClose.addEventListener('click', function (e) {
    e.preventDefault();
    closeEmbed();
  });

  widget.classList.add('loading');
  fetchNowPlaying();
  setInterval(fetchNowPlaying, POLL_INTERVAL_MS);
})();

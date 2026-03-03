/**
 * Spotify Now Playing Widget
 * Polls a Vercel serverless endpoint and renders the current track.
 */
(function () {
  'use strict';

  // ---- Configuration ----
  // TODO: Replace with your deployed Vercel URL
  var API_URL = 'https://spotify-now-playing-api.vercel.app/api/now-playing';
  var POLL_INTERVAL_MS = 30000;
  var PROGRESS_TICK_MS = 1000;

  // ---- DOM References ----
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
  var previewAudio = document.getElementById('spotify-preview-audio');

  // ---- State ----
  var currentPreviewUrl = null;
  var isPreviewPlaying = false;
  var progressTimer = null;
  var currentProgress = 0;
  var currentDuration = 0;

  // ---- Utilities ----
  function formatMs(ms) {
    if (!ms || ms < 0) return '0:00';
    var totalSeconds = Math.floor(ms / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  // ---- Progress Bar ----
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

  // ---- Render ----
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

    // Preview button
    currentPreviewUrl = data.previewUrl;
    previewBtn.style.display = currentPreviewUrl ? 'inline-flex' : 'none';
    if (!currentPreviewUrl) stopPreview();

    // Open in Spotify
    if (data.songUrl) {
      openLink.style.display = 'inline-flex';
      openLink.href = data.songUrl;
    } else {
      openLink.style.display = 'none';
    }
  }

  // ---- Preview Playback ----
  function startPreview() {
    if (!currentPreviewUrl) return;
    previewAudio.src = currentPreviewUrl;
    previewAudio.volume = 0.5;
    previewAudio.play().then(function () {
      isPreviewPlaying = true;
      previewBtn.innerHTML = '<i class="fas fa-pause"></i> Preview';
      previewBtn.classList.add('playing');
    }).catch(function (err) {
      console.warn('Preview playback failed:', err);
    });
  }

  function stopPreview() {
    previewAudio.pause();
    previewAudio.currentTime = 0;
    isPreviewPlaying = false;
    previewBtn.innerHTML = '<i class="fas fa-play"></i> Preview';
    previewBtn.classList.remove('playing');
  }

  function togglePreview() {
    if (isPreviewPlaying) {
      stopPreview();
    } else {
      startPreview();
    }
  }

  // ---- Fetch ----
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

  // ---- Event Listeners ----
  previewBtn.addEventListener('click', function (e) {
    e.preventDefault();
    togglePreview();
  });

  previewAudio.addEventListener('ended', function () {
    stopPreview();
  });

  // ---- Init ----
  widget.classList.add('loading');
  fetchNowPlaying();
  setInterval(fetchNowPlaying, POLL_INTERVAL_MS);
})();

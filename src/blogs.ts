/**
 * Enhanced Blog management system
 * Features: Math rendering, navigation, reading time, search, and more
 */

import { marked } from 'marked';
import type { BlogPost, BlogElements } from './types';
import './types';

document.addEventListener('DOMContentLoaded', () => {
  const blogElements = getBlogElements();
  if (!blogElements) return;
  initializeBlogSystem(blogElements);
});

function getBlogElements(): BlogElements | null {
  const blogPostsContainer = document.getElementById('blog-posts-container');
  const fullBlogPostView = document.getElementById('full-blog-post-view');
  const blogContentArea = document.getElementById('blog-content-area');

  if (!blogPostsContainer || !fullBlogPostView || !blogContentArea) return null;

  return {
    blogPostsContainer,
    fullBlogPostView,
    blogContentArea,
    backToListButton: document.getElementById('back-to-list'),
    blogIntroSection: document.getElementById('blog-intro'),
  };
}

function initializeBlogSystem(elements: BlogElements): void {
  setupBackButtonListener(elements);
  addSearchFunctionality(elements);
  loadBlogData(elements);
  initializeAdvancedFeatures();
}

/**
 * Reading time calculation
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Date formatting
 */
function formatDate(dateString?: string): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Keywords HTML generation
 */
function generateKeywordsHTML(keywords?: string): string {
  if (!keywords) return '';
  const keywordsArray = keywords.split(',').map((k) => k.trim());
  const keywordSpans = keywordsArray.map((k) => `<span class="keyword">${k}</span>`).join(' ');
  return `<div class="blog-keywords"><i class="fas fa-tags"></i> ${keywordSpans}</div>`;
}

/**
 * Summary text extraction
 */
function getSummaryText(post: BlogPost): string {
  if (post.frontmatter.summary) {
    return post.frontmatter.summary
      .replace(/\s*\[cite:\s*[^\]]+\]/gi, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }
  if (post.content) {
    const plainText = post.content
      .replace(/\s*\[cite:\s*[^\]]+\]/gi, '')
      .replace(/#{1,6}\s+/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/```[\s\S]*?```/g, '[code block]')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\s{2,}/g, ' ');
    return plainText.substring(0, 150).trim() + '...';
  }
  return 'No summary available.';
}

/**
 * Blog data loading
 */
async function loadBlogData(elements: BlogElements): Promise<void> {
  elements.blogPostsContainer.innerHTML =
    '<div class="loading-blogs"><i class="fas fa-spinner fa-spin"></i> Loading posts...</div>';

  try {
    const response = await fetch('/data/blogs-data.json');
    if (!response.ok) {
      throw new Error(`Failed to load blogs-data.json: ${response.statusText} (${response.status})`);
    }

    const allPostsData: BlogPost[] = await response.json();

    if (allPostsData && Array.isArray(allPostsData)) {
      displayBlogList(allPostsData, elements);
      window.allBlogPosts = allPostsData;
    } else {
      throw new Error('Blog data is not in the expected array format');
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error fetching blog data:', error);
    elements.blogPostsContainer.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Error loading blog posts: ${msg}</p>
        <p>Please ensure '/data/blogs-data.json' exists and is accessible.</p>
      </div>
    `;
  }
}

/**
 * Blog list display
 */
function displayBlogList(posts: BlogPost[], elements: BlogElements): void {
  const { blogPostsContainer, fullBlogPostView, blogIntroSection } = elements;

  blogPostsContainer.style.display = 'block';
  if (blogIntroSection) blogIntroSection.style.display = 'block';
  fullBlogPostView.style.display = 'none';
  blogPostsContainer.innerHTML = '';

  if (!posts || posts.length === 0) {
    blogPostsContainer.innerHTML = '<p>No blog posts found. Check back soon!</p>';
    return;
  }

  const sortedPosts = posts
    .filter((post) => post?.frontmatter?.date)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date!).getTime() - new Date(a.frontmatter.date!).getTime()
    );

  if (sortedPosts.length === 0) {
    blogPostsContainer.innerHTML =
      '<p>Posts found but unable to sort by date. Please check post frontmatter.</p>';
    return;
  }

  sortedPosts.forEach((post) => {
    const postElement = createPostElement(post, elements, sortedPosts);
    blogPostsContainer.appendChild(postElement);
  });
}

/**
 * Post element creation
 */
function createPostElement(
  post: BlogPost,
  elements: BlogElements,
  allPosts: BlogPost[]
): HTMLElement {
  const postElement = document.createElement('div');
  postElement.classList.add('blog-post-summary', 'card-style');
  postElement.setAttribute('role', 'article');
  postElement.dataset.date = post.frontmatter.date || '';

  const titleForId =
    post.frontmatter.title ||
    `untitled-post-${post.id || Math.random().toString(36).substr(2, 9)}`;
  const uniqueId = post.id || titleForId.replace(/\s+/g, '-').toLowerCase();
  postElement.setAttribute('aria-labelledby', `blog-title-${uniqueId}`);

  const readingTime = calculateReadingTime(post.content);
  const keywordsHTML = generateKeywordsHTML(post.frontmatter.keywords);
  const summaryText = getSummaryText(post);

  postElement.innerHTML = `
    <article class="blog-summary-content">
      <h3 id="blog-title-${uniqueId}">${post.frontmatter.title || 'Untitled Post'}</h3>
      <div class="blog-meta">
        <span class="meta-item publish-date">
          <i class="fas fa-calendar"></i>
          ${formatDate(post.frontmatter.date)}
        </span>
        <span class="meta-item reading-time">
          <i class="fas fa-clock"></i>
          ${readingTime} min read
        </span>
        ${post.frontmatter.math ? '<span class="meta-item math-indicator"><i class="fas fa-square-root-alt"></i> Math</span>' : ''}
      </div>
      <p class="blog-summary">${summaryText}</p>
      ${keywordsHTML}
      <div class="read-more">
        <span class="read-more-text">Read more <i class="fas fa-arrow-right"></i></span>
      </div>
    </article>
  `;

  const clickHandler = () => displayFullPost(post, elements, allPosts);
  postElement.addEventListener('click', clickHandler);
  postElement.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      clickHandler();
    }
  });
  postElement.tabIndex = 0;

  return postElement;
}

/**
 * Full post display
 */
function displayFullPost(
  postData: BlogPost,
  elements: BlogElements,
  allPosts: BlogPost[] = []
): void {
  const { blogPostsContainer, fullBlogPostView, blogContentArea, blogIntroSection } = elements;

  blogPostsContainer.style.display = 'none';
  if (blogIntroSection) blogIntroSection.style.display = 'none';
  fullBlogPostView.style.display = 'block';

  const readingTime = calculateReadingTime(postData.content);
  const keywordsHTML = generateKeywordsHTML(postData.frontmatter.keywords);

  blogContentArea.innerHTML = `
    <div class="reading-progress"><div class="reading-progress-bar"></div></div>
    <article class="blog-post-content">
      <header class="blog-post-header">
        <h1>${postData.frontmatter.title || 'Untitled Post'}</h1>
        <div class="blog-meta">
          <span class="meta-item publish-date">
            <i class="fas fa-calendar"></i>
            ${formatDate(postData.frontmatter.date)}
          </span>
          <span class="meta-item reading-time">
            <i class="fas fa-clock"></i>
            ${readingTime} min read
          </span>
          ${postData.frontmatter.author ? `<span class="meta-item author"><i class="fas fa-user"></i> ${postData.frontmatter.author}</span>` : ''}
          ${postData.frontmatter.math ? '<span class="meta-item math-indicator"><i class="fas fa-square-root-alt"></i> Math</span>' : ''}
        </div>
        ${keywordsHTML}
      </header>

      <div class="blog-content-wrapper">
        <div class="blog-content-body">
          ${processContentWithIds(postData.content)}
        </div>
      </div>

      <footer class="blog-post-footer">
        <div class="blog-actions">
          <button class="action-button print-button" onclick="window.print()">
            <i class="fas fa-print"></i> Print
          </button>
        </div>
      </footer>
    </article>
  `;

  initializeReadingProgress();
  initializeResponsiveTables();
  initializeAdvancedFeatures();
  renderMathJax(blogContentArea);
  window.scrollTo(0, 0);
  window.currentBlogData = { postData, allPosts, elements };
}

/**
 * Content processing with heading IDs for navigation
 */
function processContentWithIds(content: string): string {
  let cleaned = content;

  // Remove citation references
  cleaned = cleaned.replace(/\s*\[cite:\s*[^\]]+\]/gi, '');

  // Fix malformed code blocks (4+ backticks → 3)
  cleaned = cleaned.replace(/````+/g, '```');

  // Clean double spaces
  cleaned = cleaned.replace(/[ \t]{2,}/g, ' ');

  // Normalize line endings
  cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Protect math expressions before markdown parsing
  const mathExpressions: string[] = [];
  let mathIndex = 0;

  // Display math ($$...$$)
  cleaned = cleaned.replace(/\$\$([^$]+)\$\$/g, (_match, expr: string) => {
    const placeholder = `__MATH_DISPLAY_${mathIndex}__`;
    mathExpressions[mathIndex] = `$$${expr}$$`;
    mathIndex++;
    return placeholder;
  });

  // Inline math ($...$)
  cleaned = cleaned.replace(/\$([^$\n]+)\$/g, (_match, expr: string) => {
    const placeholder = `__MATH_INLINE_${mathIndex}__`;
    mathExpressions[mathIndex] = `$${expr}$`;
    mathIndex++;
    return placeholder;
  });

  // Parse markdown to HTML
  let htmlContent = marked.parse(cleaned) as string;

  // Restore math expressions
  for (let i = 0; i < mathExpressions.length; i++) {
    htmlContent = htmlContent
      .replace(new RegExp(`__MATH_DISPLAY_${i}__`, 'g'), mathExpressions[i])
      .replace(new RegExp(`__MATH_INLINE_${i}__`, 'g'), mathExpressions[i]);
  }

  // Decode HTML entities
  const txt = document.createElement('textarea');
  txt.innerHTML = htmlContent;
  htmlContent = txt.value;

  // Fix remaining encoding issues
  htmlContent = htmlContent
    .replace(/&amp;gt;/g, '>')
    .replace(/&amp;lt;/g, '<')
    .replace(/&amp;amp;/g, '&');

  // Add IDs to headings for table of contents
  const headings = cleaned.match(/^#{2,4}\s+(.+)$/gm);
  if (headings) {
    headings.forEach((heading, index) => {
      const level = heading.match(/^#+/)![0].length;
      const text = heading.replace(/^#+\s+/, '').replace(/[^\w\s-]/g, '').trim();
      const id = `toc-${text.toLowerCase().replace(/\s+/g, '-')}-${index}`;
      const cleanText = heading.replace(/^#+\s+/, '');

      const headingTag = `h${level}`;
      const headingRegex = new RegExp(`<${headingTag}>(.*?)</${headingTag}>`, 'g');
      htmlContent = htmlContent.replace(headingRegex, (match, content: string) => {
        if (content.trim() === cleanText.trim()) {
          return `<${headingTag} id="${id}">${content}</${headingTag}>`;
        }
        return match;
      });
    });
  }

  // Wrap tables in responsive containers
  htmlContent = htmlContent.replace(/<table[^>]*>/g, '<div class="table-wrapper">$&');
  htmlContent = htmlContent.replace(/<\/table>/g, '$&</div>');

  return htmlContent;
}

/**
 * Responsive tables
 */
function initializeResponsiveTables(): void {
  document.querySelectorAll<HTMLElement>('.table-wrapper').forEach((wrapper) => {
    const table = wrapper.querySelector('table');
    if (!table) return;

    function updateScrollIndicators(): void {
      const isScrollable = wrapper.scrollWidth > wrapper.clientWidth;
      wrapper.classList.toggle('scrollable', isScrollable);
    }

    updateScrollIndicators();
    window.addEventListener('resize', updateScrollIndicators);

    wrapper.addEventListener('wheel', (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        wrapper.scrollLeft += e.deltaY;
      }
    });
  });
}

/**
 * Reading progress bar
 */
function initializeReadingProgress(): void {
  const progressBar = document.querySelector<HTMLElement>('.reading-progress-bar')!;
  if (!progressBar) return;

  function updateProgress(): void {
    const article = document.querySelector<HTMLElement>('.blog-content-body');
    if (!article) return;

    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;

    const progress = Math.min(
      Math.max((scrollTop - articleTop + windowHeight * 0.1) / articleHeight, 0),
      1
    );
    progressBar.style.width = `${progress * 100}%`;
  }

  window.addEventListener('scroll', updateProgress);
  updateProgress();
}

/**
 * Search and sort functionality
 */
function addSearchFunctionality(elements: BlogElements): void {
  const { blogPostsContainer } = elements;

  const searchHTML = `
    <div class="blog-controls">
      <div class="search-container">
        <i class="fas fa-search"></i>
        <input type="text" id="blog-search-input" placeholder="Search blog posts..." />
        <button id="clear-search" class="clear-search" style="display: none;">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="sort-container">
        <select id="sort-select">
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>
    </div>
  `;

  blogPostsContainer.insertAdjacentHTML('beforebegin', searchHTML);

  const searchInput = document.getElementById('blog-search-input') as HTMLInputElement | null;
  const clearButton = document.getElementById('clear-search');
  const sortSelect = document.getElementById('sort-select') as HTMLSelectElement | null;

  searchInput?.addEventListener('input', (e) => {
    const value = (e.target as HTMLInputElement).value;
    filterPosts(value);
    if (clearButton) clearButton.style.display = value ? 'block' : 'none';
  });

  clearButton?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    filterPosts('');
    clearButton.style.display = 'none';
  });

  sortSelect?.addEventListener('change', (e) => {
    sortPosts((e.target as HTMLSelectElement).value);
  });
}

function filterPosts(searchTerm: string): void {
  const term = searchTerm.toLowerCase();
  document.querySelectorAll<HTMLElement>('.blog-post-summary').forEach((post) => {
    const title = post.querySelector('h3')?.textContent?.toLowerCase() || '';
    const summary = post.querySelector('.blog-summary')?.textContent?.toLowerCase() || '';
    const keywords = post.querySelector('.blog-keywords')?.textContent?.toLowerCase() || '';
    const matches = title.includes(term) || summary.includes(term) || keywords.includes(term);
    post.style.display = matches ? 'block' : 'none';
  });
}

function sortPosts(criteria: string): void {
  const container = document.getElementById('blog-posts-container');
  if (!container) return;

  const posts = Array.from(container.querySelectorAll<HTMLElement>('.blog-post-summary'));

  posts.sort((a, b) => {
    switch (criteria) {
      case 'date-desc':
        return (
          new Date(b.dataset.date || '1970-01-01').getTime() -
          new Date(a.dataset.date || '1970-01-01').getTime()
        );
      case 'date-asc':
        return (
          new Date(a.dataset.date || '1970-01-01').getTime() -
          new Date(b.dataset.date || '1970-01-01').getTime()
        );
      case 'title-asc':
        return (a.querySelector('h3')?.textContent || '').localeCompare(
          b.querySelector('h3')?.textContent || ''
        );
      case 'title-desc':
        return (b.querySelector('h3')?.textContent || '').localeCompare(
          a.querySelector('h3')?.textContent || ''
        );
      default:
        return 0;
    }
  });

  posts.forEach((post) => container.appendChild(post));
}

/**
 * Back button
 */
function setupBackButtonListener(elements: BlogElements): void {
  elements.backToListButton?.addEventListener('click', () => {
    loadBlogData(elements);
  });
}

/**
 * Global post loader
 */
window.loadSpecificPost = function (postId: string): void {
  if (!window.currentBlogData) return;
  const { allPosts, elements } = window.currentBlogData;
  const post = allPosts.find((p) => p.id === postId);
  if (post) displayFullPost(post, elements, allPosts);
};

// ─── Advanced Features ───────────────────────────────────────────────────────

let speechSynthesisInstance = window.speechSynthesis;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let isSpeaking = false;

function initializeAdvancedFeatures(): void {
  createFloatingActionButton();
  initializeCodeBlockCopy();
  initializeReadingEnhancements();
  initializeTextToSpeech();
  initializeAutoBookmark();
}

function createFloatingActionButton(): void {
  // Prevent duplicate FABs
  document.getElementById('fab')?.remove();

  const fabHTML = `
    <div class="floating-action-button" id="fab">
      <div class="fab-main" id="fab-main"><i class="fas fa-magic"></i></div>
      <div class="fab-menu" id="fab-menu">
        <button class="fab-item" id="fab-scroll-top" title="Scroll to Top"><i class="fas fa-arrow-up"></i></button>
        <button class="fab-item" id="fab-speak" title="Read Aloud"><i class="fas fa-volume-up"></i></button>
        <button class="fab-item" id="fab-highlight" title="Toggle Highlights"><i class="fas fa-highlighter"></i></button>
        <button class="fab-item" id="fab-focus" title="Focus Mode"><i class="fas fa-eye"></i></button>
        <button class="fab-item" id="fab-bookmark" title="Bookmark Position"><i class="fas fa-bookmark"></i></button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', fabHTML);

  const fab = document.getElementById('fab')!;
  document.getElementById('fab-main')!.addEventListener('click', () => {
    fab.classList.toggle('active');
  });

  document.getElementById('fab-scroll-top')!.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fab.classList.remove('active');
  });

  document.getElementById('fab-speak')!.addEventListener('click', () => {
    toggleTextToSpeech();
    fab.classList.remove('active');
  });

  document.getElementById('fab-highlight')!.addEventListener('click', () => {
    toggleHighlightMode();
    fab.classList.remove('active');
  });

  document.getElementById('fab-focus')!.addEventListener('click', () => {
    toggleFocusMode();
    fab.classList.remove('active');
  });

  document.getElementById('fab-bookmark')!.addEventListener('click', () => {
    bookmarkCurrentPosition();
    fab.classList.remove('active');
  });

  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 300) {
      fab.style.display = 'block';
      fab.style.transform = scrollTop > lastScrollTop ? 'translateY(100px)' : 'translateY(0)';
    } else {
      fab.style.display = 'none';
    }
    lastScrollTop = scrollTop;
  });
}

function initializeCodeBlockCopy(): void {
  document.querySelectorAll<HTMLElement>('pre code').forEach((block) => {
    const pre = block.parentElement;
    if (!pre) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.title = 'Copy code';

    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(copyButton);

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent || '');
        copyButton.innerHTML = '<i class="fas fa-check"></i>';
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i>';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

function initializeReadingEnhancements(): void {
  const readingLine = document.createElement('div');
  readingLine.className = 'reading-line';
  document.body.appendChild(readingLine);

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (window.readingLineEnabled) {
      readingLine.style.top = `${e.clientY}px`;
      readingLine.style.display = 'block';
    } else {
      readingLine.style.display = 'none';
    }
  });

  document.addEventListener('dblclick', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'P' && window.highlightModeEnabled) {
      target.classList.toggle('highlighted-paragraph');
    }
  });
}

function initializeTextToSpeech(): void {
  window.speechSupported = 'speechSynthesis' in window;
}

function toggleTextToSpeech(): void {
  if (!window.speechSupported) {
    alert('Text-to-speech is not supported in your browser');
    return;
  }

  const speakBtn = document.getElementById('fab-speak');

  if (isSpeaking) {
    speechSynthesisInstance.cancel();
    isSpeaking = false;
    if (speakBtn) speakBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    const content = document.querySelector('.blog-content-body');
    if (content) {
      currentUtterance = new SpeechSynthesisUtterance(content.textContent || '');
      currentUtterance.rate = 0.8;
      currentUtterance.pitch = 1;
      currentUtterance.onend = () => {
        isSpeaking = false;
        if (speakBtn) speakBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      };
      speechSynthesisInstance.speak(currentUtterance);
      isSpeaking = true;
      if (speakBtn) speakBtn.innerHTML = '<i class="fas fa-stop"></i>';
    }
  }
}

function toggleHighlightMode(): void {
  window.highlightModeEnabled = !window.highlightModeEnabled;
  document.body.classList.toggle('highlight-mode', window.highlightModeEnabled);
  showNotification(
    window.highlightModeEnabled
      ? 'Highlight mode enabled - double-click paragraphs to highlight'
      : 'Highlight mode disabled'
  );
}

function toggleFocusMode(): void {
  document.body.classList.toggle('focus-mode');
  showNotification(
    document.body.classList.contains('focus-mode')
      ? 'Focus mode enabled - distractions hidden'
      : 'Focus mode disabled'
  );
}

function initializeAutoBookmark(): void {
  const bookmark = localStorage.getItem(`bookmark-${window.location.pathname}`);
  if (bookmark && bookmark !== '0') {
    setTimeout(() => {
      window.scrollTo({ top: parseInt(bookmark, 10), behavior: 'smooth' });
      showNotification('Restored your reading position');
    }, 1000);
  }

  let saveTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener('scroll', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      const scrollPos = window.pageYOffset;
      if (scrollPos > 100) {
        localStorage.setItem(`bookmark-${window.location.pathname}`, String(scrollPos));
      }
    }, 1000);
  });
}

function bookmarkCurrentPosition(): void {
  localStorage.setItem(`bookmark-${window.location.pathname}`, String(window.pageYOffset));
  showNotification('Position bookmarked!');
}

function showNotification(message: string): void {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * MathJax rendering with retries
 */
function renderMathJax(element: HTMLElement): void {
  function attemptRender(): Promise<void> {
    if (window.MathJax?.typesetPromise) {
      return window.MathJax
        .typesetPromise([element])
        .then(() => fixMathJaxDisplay())
        .catch(() => {
          window.MathJax?.typeset?.([element]);
        });
    }
    return Promise.reject(new Error('MathJax not ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('mathjax-ready', () => {
      setTimeout(() => attemptRender(), 100);
    });
  } else {
    attemptRender().catch(() => {
      setTimeout(() => {
        attemptRender().catch(() => {
          setTimeout(() => attemptRender(), 1000);
        });
      }, 500);
    });
  }
}

function fixMathJaxDisplay(): void {
  document.querySelectorAll<HTMLElement>('mjx-container').forEach((el) => {
    el.style.display = 'inline-block';
    el.style.margin = '0.1em';
  });

  document.querySelectorAll<HTMLElement>('mjx-container[display="true"]').forEach((el) => {
    el.style.display = 'block';
    el.style.textAlign = 'center';
    el.style.margin = '1em 0';
  });
}

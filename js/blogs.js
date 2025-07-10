/**
 * Enhanced Blog management system for Vikash Singh's Portfolio Website
 * Features: Math rendering, navigation, reading time, search, and more
 */

document.addEventListener('DOMContentLoaded', () => {
    const blogElements = getBlogElements();
    
    if (!blogElements.blogPostsContainer) {
        return; // Blog functionality not needed on this page
    }

    initializeBlogSystem(blogElements);
});

/**
 * Get all blog-related DOM elements
 */
function getBlogElements() {
    return {
        blogPostsContainer: document.getElementById('blog-posts-container'),
        fullBlogPostView: document.getElementById('full-blog-post-view'),
        blogContentArea: document.getElementById('blog-content-area'),
        backToListButton: document.getElementById('back-to-list'),
        blogIntroSection: document.getElementById('blog-intro')
    };
}

/**
 * Initialize the blog system
 */
function initializeBlogSystem(elements) {
    setupBackButtonListener(elements);
    addSearchFunctionality(elements);
    loadBlogData(elements);
    initializeAdvancedFeatures();
}

/**
 * Calculate reading time based on word count
 */
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return readingTime;
}

/**
 * Get the next and previous posts for navigation
 */
function getAdjacentPosts(currentPost, allPosts) {
    const currentIndex = allPosts.findIndex(post => post.id === currentPost.id);
    return {
        previousPost: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
        nextPost: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
    };
}

/**
 * Create navigation buttons for blog posts - DISABLED
 */
function createNavigationButtons(currentPost, allPosts, elements) {
    // Navigation buttons removed per user request
    return '';
}

/**
 * Display a single blog post in full view with enhanced features
 */
function displayFullPost(postData, elements, allPosts = []) {
    const { blogPostsContainer, fullBlogPostView, blogContentArea, blogIntroSection } = elements;
    
    // Hide list view, show full post view
    blogPostsContainer.style.display = 'none';
    if (blogIntroSection) blogIntroSection.style.display = 'none';
    fullBlogPostView.style.display = 'block';
    
    // Calculate reading time
    const readingTime = calculateReadingTime(postData.content);
    
    // Generate keywords HTML if available
    const keywordsHTML = generateKeywordsHTML(postData.frontmatter.keywords);
    
    // Generate navigation buttons
    const navigationHTML = createNavigationButtons(postData, allPosts, elements);
    
    // Create progress bar
    const progressBarHTML = '<div class="reading-progress"><div class="reading-progress-bar"></div></div>';
    
    // Populate blog content with enhanced features
    blogContentArea.innerHTML = `
        ${progressBarHTML}
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
                    ${postData.frontmatter.author ? `
                        <span class="meta-item author">
                            <i class="fas fa-user"></i>
                            ${postData.frontmatter.author}
                        </span>
                    ` : ''}
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
                ${navigationHTML}
                <div class="blog-actions">
                    <button class="action-button print-button" onclick="window.print()">
                        <i class="fas fa-print"></i>
                        Print
                    </button>
                </div>
            </footer>
        </article>
    `;
    
    // Initialize reading progress
    initializeReadingProgress();
    
    // Initialize responsive tables
    initializeResponsiveTables();
    
    // Initialize advanced features
    initializeAdvancedFeatures();
    
    // Re-render MathJax - always attempt for better math support
    renderMathJax(blogContentArea);
    
    // Scroll to top for better UX
    window.scrollTo(0, 0);
    
    // Store current post data globally for navigation
    window.currentBlogData = { postData, allPosts, elements };
}

/**
 * Format date in a readable format
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

/**
 * Generate table of contents from markdown content
 */
/**
 * Initialize reading progress indicator
 */
function initializeReadingProgress() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (!progressBar) return;
    
    function updateProgress() {
        const article = document.querySelector('.blog-content-body');
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
    updateProgress(); // Initial call
}

/**
 * Global function to load specific post by ID
 */
window.loadSpecificPost = function(postId) {
    if (!window.currentBlogData) return;
    
    const { allPosts, elements } = window.currentBlogData;
    const post = allPosts.find(p => p.id === postId);
    
    if (post) {
        displayFullPost(post, elements, allPosts);
    }
};

/**
 * Share functionality - DISABLED
 */
// window.sharePost = function(title) {
//     if (navigator.share) {
//         navigator.share({
//             title: title,
//             url: window.location.href
//         }).catch(err => console.log('Error sharing:', err));
//     } else {
//         // Fallback: copy URL to clipboard
//         navigator.clipboard.writeText(window.location.href).then(() => {
//             alert('URL copied to clipboard!');
//         }).catch(err => {
//             console.log('Error copying to clipboard:', err);
//         });
//     }
// };

/**
 * Generate keywords HTML section
 */
function generateKeywordsHTML(keywords) {
    if (!keywords) return '';
    
    const keywordsArray = keywords.split(',').map(k => k.trim());
    const keywordSpans = keywordsArray.map(k => `<span class="keyword">${k}</span>`).join(' ');
    return `<div class="blog-keywords"><i class="fas fa-tags"></i> ${keywordSpans}</div>`;
}

/**
 * Add search functionality to blog list
 */
function addSearchFunctionality(elements) {
    const { blogPostsContainer } = elements;
    
    // Create search and sort controls
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
    
    // Insert search bar before blog posts container
    blogPostsContainer.insertAdjacentHTML('beforebegin', searchHTML);
    
    // Add event listeners
    const searchInput = document.getElementById('blog-search-input');
    const clearButton = document.getElementById('clear-search');
    const sortSelect = document.getElementById('sort-select');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterPosts(e.target.value);
            clearButton.style.display = e.target.value ? 'block' : 'none';
        });
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            filterPosts('');
            clearButton.style.display = 'none';
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortPosts(e.target.value);
        });
    }
}

/**
 * Filter posts based on search term
 */
function filterPosts(searchTerm) {
    const posts = document.querySelectorAll('.blog-post-summary');
    const term = searchTerm.toLowerCase();
    
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const summary = post.querySelector('.blog-summary').textContent.toLowerCase();
        const keywords = post.querySelector('.blog-keywords')?.textContent.toLowerCase() || '';
        
        const matches = title.includes(term) || summary.includes(term) || keywords.includes(term);
        post.style.display = matches ? 'block' : 'none';
    });
}

/**
 * Sort posts based on selected criteria
 */
function sortPosts(criteria) {
    const container = document.getElementById('blog-posts-container');
    const posts = Array.from(container.querySelectorAll('.blog-post-summary'));
    
    posts.sort((a, b) => {
        switch (criteria) {
            case 'date-desc':
                return new Date(b.dataset.date || '1970-01-01') - new Date(a.dataset.date || '1970-01-01');
            case 'date-asc':
                return new Date(a.dataset.date || '1970-01-01') - new Date(b.dataset.date || '1970-01-01');
            case 'title-asc':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            case 'title-desc':
                return b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent);
            default:
                return 0;
        }
    });
    
    posts.forEach(post => container.appendChild(post));
}

/**
 * Display list of blog posts with enhanced features
 */
function displayBlogList(posts, elements) {
    const { blogPostsContainer, fullBlogPostView, blogIntroSection } = elements;
    
    // Show list view, hide full post view
    blogPostsContainer.style.display = 'block';
    if (blogIntroSection) blogIntroSection.style.display = 'block';
    fullBlogPostView.style.display = 'none';
    blogPostsContainer.innerHTML = ''; // Clear previous content

    if (!posts || posts.length === 0) { 
        blogPostsContainer.innerHTML = '<p>No blog posts found. Check back soon!</p>';
        return;
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = getSortedPosts(posts);
    
    if (sortedPosts.length === 0 && posts.length > 0) {
        console.warn("Some posts might be missing valid dates for sorting.");
        blogPostsContainer.innerHTML = '<p>Posts found but unable to sort by date. Please check post frontmatter.</p>';
        return;
    }

    // Create and append post elements
    sortedPosts.forEach(post => {
        const postElement = createPostElement(post, elements, sortedPosts);
        blogPostsContainer.appendChild(postElement);
    });
}

/**
 * Sort posts by date (newest first)
 */
function getSortedPosts(posts) {
    return posts
        .filter(post => post && post.frontmatter && post.frontmatter.date)
        .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

/**
 * Create a post summary element with enhanced features
 */
function createPostElement(post, elements, allPosts) {
    const postElement = document.createElement('div');
    postElement.classList.add('blog-post-summary', 'card-style');
    postElement.setAttribute('role', 'article');
    postElement.dataset.date = post.frontmatter.date; // For sorting
    
    // Generate unique ID for accessibility
    const titleForId = post.frontmatter.title || `untitled-post-${post.id || Math.random().toString(36).substr(2, 9)}`;
    const uniqueId = post.id || titleForId.replace(/\s+/g, '-').toLowerCase();
    postElement.setAttribute('aria-labelledby', `blog-title-${uniqueId}`);
    
    // Calculate reading time
    const readingTime = calculateReadingTime(post.content);
    
    // Generate content
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
    
    // Add click handlers
    setupPostElementHandlers(postElement, post, elements, allPosts);
    
    return postElement;
}

/**
 * Get summary text for a post
 */
function getSummaryText(post) {
    if (post.frontmatter.summary) {
        // Clean citations from frontmatter summary
        return post.frontmatter.summary.replace(/\s*\[cite:\s*[^\]]+\]/gi, '').replace(/\s{2,}/g, ' ').trim();
    }
    if (post.content) {
        // Remove markdown formatting for summary
        const plainText = post.content
            .replace(/\s*\[cite:\s*[^\]]+\]/gi, '') // Remove citation references
            .replace(/#{1,6}\s+/g, '') // Remove headers
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.*?)\*/g, '$1') // Remove italic
            .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
            .replace(/```[\s\S]*?```/g, '[code block]') // Replace code blocks
            .replace(/`(.*?)`/g, '$1') // Remove inline code
            .replace(/\s{2,}/g, ' '); // Clean up double spaces
        
        return plainText.substring(0, 150).trim() + '...';
    }
    return 'No summary available.';
}

/**
 * Setup click and keyboard handlers for post elements
 */
function setupPostElementHandlers(postElement, post, elements, allPosts) {
    const clickHandler = () => displayFullPost(post, elements, allPosts);
    
    postElement.addEventListener('click', clickHandler);
    postElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            clickHandler();
        }
    });
    postElement.tabIndex = 0; // Make keyboard accessible
}

/**
 * Load blog data from JSON file
 */
async function loadBlogData(elements) {
    const { blogPostsContainer } = elements;
    
    // Show loading state
    blogPostsContainer.innerHTML = '<div class="loading-blogs"><i class="fas fa-spinner fa-spin"></i> Loading posts...</div>';
    
    try {
        const response = await fetch('js/blogs-data.json');
        
        if (!response.ok) {
            throw new Error(`Failed to load blogs-data.json: ${response.statusText} (${response.status})`);
        }
        
        const allPostsData = await response.json();

        if (allPostsData && Array.isArray(allPostsData)) {
            displayBlogList(allPostsData, elements);
            
            // Store posts globally for search/filter functionality
            window.allBlogPosts = allPostsData;
        } else {
            throw new Error('Blog data is not in the expected array format or is empty');
        }
    } catch (error) {
        console.error('Error fetching or processing blog data:', error);
        blogPostsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading blog posts: ${error.message}</p>
                <p>Please ensure 'js/blogs-data.json' exists and is accessible.</p>
            </div>
        `;
    }
}

/**
 * Setup back button event listener
 */
function setupBackButtonListener(elements) {
    const { backToListButton } = elements;
    
    if (backToListButton) {
        backToListButton.addEventListener('click', () => {
            loadBlogData(elements);
        });
    }
}

/**
 * Process content and add IDs to headings for navigation
 */
function processContentWithIds(content) {
    // First, clean the content by removing citation references
    let cleanedContent = content;
    
    // Remove [cite: X] patterns (where X can be numbers, comma-separated numbers, etc.)
    cleanedContent = cleanedContent.replace(/\s*\[cite:\s*[^\]]+\]/gi, '');
    
    // Fix malformed markdown code blocks (4+ backticks to 3 backticks)
    cleanedContent = cleanedContent.replace(/````+/g, '```');
    
    // Clean up any double spaces that might result from citation removal (but preserve line breaks and math)
    cleanedContent = cleanedContent.replace(/[ \t]{2,}/g, ' ');
    
    // Ensure proper line breaks are preserved
    cleanedContent = cleanedContent.replace(/\r\n/g, '\n');
    cleanedContent = cleanedContent.replace(/\r/g, '\n');
    
    // Protect math expressions before markdown parsing
    const mathExpressions = [];
    let mathIndex = 0;
    
    // Protect display math ($$...$$)
    cleanedContent = cleanedContent.replace(/\$\$([^$]+)\$\$/g, (match, content) => {
        const placeholder = `__MATH_DISPLAY_${mathIndex}__`;
        mathExpressions[mathIndex] = `$$${content}$$`;
        mathIndex++;
        return placeholder;
    });
    
    // Protect inline math ($...$)
    cleanedContent = cleanedContent.replace(/\$([^$\n]+)\$/g, (match, content) => {
        const placeholder = `__MATH_INLINE_${mathIndex}__`;
        mathExpressions[mathIndex] = `$${content}$`;
        mathIndex++;
        return placeholder;
    });
    
    // Parse the cleaned content to HTML
    let htmlContent = marked.parse(cleanedContent);
    
    // Restore math expressions after markdown parsing
    for (let i = 0; i < mathExpressions.length; i++) {
        const displayPlaceholder = `__MATH_DISPLAY_${i}__`;
        const inlinePlaceholder = `__MATH_INLINE_${i}__`;
        htmlContent = htmlContent.replace(new RegExp(displayPlaceholder, 'g'), mathExpressions[i]);
        htmlContent = htmlContent.replace(new RegExp(inlinePlaceholder, 'g'), mathExpressions[i]);
    }
    
    // Comprehensive HTML entity decoding
    function decodeHtmlEntities(text) {
        const txt = document.createElement('textarea');
        txt.innerHTML = text;
        return txt.value;
    }
    
    // Apply HTML entity decoding
    htmlContent = decodeHtmlEntities(htmlContent);
    
    // Additional cleanup for any remaining encoding issues
    htmlContent = htmlContent.replace(/&amp;gt;/g, '>');
    htmlContent = htmlContent.replace(/&amp;lt;/g, '<');
    htmlContent = htmlContent.replace(/&amp;amp;/g, '&');
    
    // Add IDs to headings for table of contents navigation
    const headings = cleanedContent.match(/^#{2,4}\s+(.+)$/gm);
    if (headings) {
        headings.forEach((heading, index) => {
            const level = heading.match(/^#+/)[0].length;
            const text = heading.replace(/^#+\s+/, '').replace(/[^\w\s-]/g, '').trim();
            const id = `toc-${text.toLowerCase().replace(/\s+/g, '-')}-${index}`;
            const cleanText = heading.replace(/^#+\s+/, '');
            
            // Replace the heading in HTML with one that has an ID
            const headingTag = `h${level}`;
            const headingRegex = new RegExp(`<${headingTag}>(.*?)<\/${headingTag}>`, 'g');
            htmlContent = htmlContent.replace(headingRegex, (match, content) => {
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
 * Initialize responsive table handling
 */
function initializeResponsiveTables() {
    const tableWrappers = document.querySelectorAll('.table-wrapper');
    
    tableWrappers.forEach(wrapper => {
        const table = wrapper.querySelector('table');
        if (!table) return;
        
        function updateScrollIndicators() {
            const isScrollable = wrapper.scrollWidth > wrapper.clientWidth;
            wrapper.classList.toggle('scrollable', isScrollable);
        }
        
        // Check initially
        updateScrollIndicators();
        
        // Check on resize
        window.addEventListener('resize', updateScrollIndicators);
        
        // Add smooth scrolling for table navigation
        wrapper.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                wrapper.scrollLeft += e.deltaY;
            }
        });
    });
}

/**
 * Initialize impressive blog features
 */
function initializeAdvancedFeatures() {
    createFloatingActionButton();
    initializeCodeBlockCopy();
    initializeReadingEnhancements();
    initializeTextToSpeech();
    initializeAutoBookmark();
}

/**
 * Create floating action button with multiple features
 */
function createFloatingActionButton() {
    const fabHTML = `
        <div class="floating-action-button" id="fab">
            <div class="fab-main" id="fab-main">
                <i class="fas fa-magic"></i>
            </div>
            <div class="fab-menu" id="fab-menu">
                <button class="fab-item" id="fab-scroll-top" title="Scroll to Top">
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button class="fab-item" id="fab-speak" title="Read Aloud">
                    <i class="fas fa-volume-up"></i>
                </button>
                <button class="fab-item" id="fab-highlight" title="Toggle Highlights">
                    <i class="fas fa-highlighter"></i>
                </button>
                <button class="fab-item" id="fab-focus" title="Focus Mode">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="fab-item" id="fab-bookmark" title="Bookmark Position">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', fabHTML);
    
    const fab = document.getElementById('fab');
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');
    
    // Toggle FAB menu
    fabMain.addEventListener('click', () => {
        fab.classList.toggle('active');
    });
    
    // FAB actions
    document.getElementById('fab-scroll-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fab.classList.remove('active');
    });
    
    document.getElementById('fab-speak').addEventListener('click', () => {
        toggleTextToSpeech();
        fab.classList.remove('active');
    });
    
    document.getElementById('fab-highlight').addEventListener('click', () => {
        toggleHighlightMode();
        fab.classList.remove('active');
    });
    
    document.getElementById('fab-focus').addEventListener('click', () => {
        toggleFocusMode();
        fab.classList.remove('active');
    });
    
    document.getElementById('fab-bookmark').addEventListener('click', () => {
        bookmarkCurrentPosition();
        fab.classList.remove('active');
    });
    
    // Show/hide FAB based on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 300) {
            fab.style.display = 'block';
            if (scrollTop > lastScrollTop) {
                fab.style.transform = 'translateY(100px)';
            } else {
                fab.style.transform = 'translateY(0)';
            }
        } else {
            fab.style.display = 'none';
        }
        lastScrollTop = scrollTop;
    });
}

/**
 * Add copy functionality to code blocks
 */
function initializeCodeBlockCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((block, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        block.parentNode.insertBefore(wrapper, block.parentNode);
        wrapper.appendChild(block.parentNode);
        wrapper.appendChild(copyButton);
        
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });
}

/**
 * Reading enhancements
 */
function initializeReadingEnhancements() {
    // Add reading line
    const readingLine = document.createElement('div');
    readingLine.className = 'reading-line';
    document.body.appendChild(readingLine);
    
    // Update reading line position
    document.addEventListener('mousemove', (e) => {
        if (window.readingLineEnabled) {
            readingLine.style.top = e.clientY + 'px';
            readingLine.style.display = 'block';
        } else {
            readingLine.style.display = 'none';
        }
    });
    
    // Double-click to highlight paragraphs
    document.addEventListener('dblclick', (e) => {
        if (e.target.tagName === 'P' && window.highlightModeEnabled) {
            e.target.classList.toggle('highlighted-paragraph');
        }
    });
}

/**
 * Text-to-speech functionality
 */
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let isSpeaking = false;

function initializeTextToSpeech() {
    window.speechSupported = 'speechSynthesis' in window;
}

function toggleTextToSpeech() {
    if (!window.speechSupported) {
        alert('Text-to-speech is not supported in your browser');
        return;
    }
    
    if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        document.getElementById('fab-speak').innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        const content = document.querySelector('.blog-content-body');
        if (content) {
            const text = content.innerText;
            currentUtterance = new SpeechSynthesisUtterance(text);
            currentUtterance.rate = 0.8;
            currentUtterance.pitch = 1;
            
            currentUtterance.onend = () => {
                isSpeaking = false;
                document.getElementById('fab-speak').innerHTML = '<i class="fas fa-volume-up"></i>';
            };
            
            speechSynthesis.speak(currentUtterance);
            isSpeaking = true;
            document.getElementById('fab-speak').innerHTML = '<i class="fas fa-stop"></i>';
        }
    }
}

/**
 * Highlight mode toggle
 */
function toggleHighlightMode() {
    window.highlightModeEnabled = !window.highlightModeEnabled;
    document.body.classList.toggle('highlight-mode', window.highlightModeEnabled);
    
    const icon = document.getElementById('fab-highlight').querySelector('i');
    if (window.highlightModeEnabled) {
        icon.className = 'fas fa-highlighter';
        showNotification('Highlight mode enabled - double-click paragraphs to highlight');
    } else {
        icon.className = 'fas fa-highlighter';
        showNotification('Highlight mode disabled');
    }
}

/**
 * Focus mode toggle
 */
function toggleFocusMode() {
    document.body.classList.toggle('focus-mode');
    const isFocusMode = document.body.classList.contains('focus-mode');
    
    if (isFocusMode) {
        showNotification('Focus mode enabled - distractions hidden');
    } else {
        showNotification('Focus mode disabled');
    }
}

/**
 * Auto-bookmark functionality
 */
function initializeAutoBookmark() {
    // Restore bookmark on page load
    const bookmark = localStorage.getItem(`bookmark-${window.location.pathname}`);
    if (bookmark && bookmark !== '0') {
        setTimeout(() => {
            window.scrollTo({ top: parseInt(bookmark), behavior: 'smooth' });
            showNotification('Restored your reading position');
        }, 1000);
    }
    
    // Save bookmark on scroll
    let saveTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            const scrollPos = window.pageYOffset;
            if (scrollPos > 100) { // Only save if scrolled significantly
                localStorage.setItem(`bookmark-${window.location.pathname}`, scrollPos.toString());
            }
        }, 1000);
    });
}

function bookmarkCurrentPosition() {
    const scrollPos = window.pageYOffset;
    localStorage.setItem(`bookmark-${window.location.pathname}`, scrollPos.toString());
    showNotification('Position bookmarked!');
}

/**
 * Show notification
 */
function showNotification(message) {
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
 * Robust MathJax rendering function
 */
function renderMathJax(element) {
    // Function to attempt MathJax rendering
    function attemptRender() {
        if (window.MathJax && window.MathJax.typesetPromise) {
            console.log('Rendering MathJax...');
            return MathJax.typesetPromise([element])
                .then(() => {
                    console.log('MathJax rendering completed successfully');
                    // Fix any display issues after rendering
                    fixMathJaxDisplay();
                })
                .catch(err => {
                    console.error('MathJax rendering error:', err);
                    // Try again with a different approach
                    if (window.MathJax.typeset) {
                        MathJax.typeset([element]);
                    }
                });
        } else {
            console.log('MathJax not ready yet, retrying...');
            return Promise.reject('MathJax not ready');
        }
    }
    
    // Listen for MathJax ready event
    if (document.readyState === 'loading') {
        document.addEventListener('mathjax-ready', () => {
            setTimeout(() => attemptRender(), 100);
        });
    } else {
        // Try rendering immediately
        attemptRender().catch(() => {
            // If immediate rendering fails, wait and try again
            setTimeout(() => {
                attemptRender().catch(() => {
                    // Final attempt after longer delay
                    setTimeout(() => {
                        attemptRender();
                    }, 1000);
                });
            }, 500);
        });
    }
}

/**
 * Fix MathJax display issues
 */
function fixMathJaxDisplay() {
    // Ensure MathJax elements are properly displayed
    const mathElements = document.querySelectorAll('mjx-container');
    mathElements.forEach(el => {
        el.style.display = 'inline-block';
        el.style.margin = '0.1em';
    });
    
    // Fix display math centering
    const displayMath = document.querySelectorAll('mjx-container[display="true"]');
    displayMath.forEach(el => {
        el.style.display = 'block';
        el.style.textAlign = 'center';
        el.style.margin = '1em 0';
    });
}

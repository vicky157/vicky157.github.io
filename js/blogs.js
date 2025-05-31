document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const fullBlogPostView = document.getElementById('full-blog-post-view');
    const blogContentArea = document.getElementById('blog-content-area');
    const backToListButton = document.getElementById('back-to-list');
    const blogIntroSection = document.getElementById('blog-intro');

    // **IMPORTANT**: Manually list your blog markdown filenames here
    // Add new blog post filenames to this array.
    const blogFiles = [
        'my-first-post.md'
    ];

    if (!blogPostsContainer) return; // Only run on pages with the blog container

    // --- Helper function to parse YAML frontmatter ---
    function parseFrontmatter(text) {
        const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
        const match = frontmatterRegex.exec(text);
        const frontmatter = {};
        let content = text;

        if (match) {
            const yamlStr = match[1];
            content = text.substring(match[0].length).trim();
            yamlStr.split('\n').forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, ''); // Remove quotes
                    frontmatter[key] = value;
                }
            });
        }
        return { frontmatter, content };
    }

    // --- Function to display a single blog post ---
    function displayFullPost(postData) {
        blogPostsContainer.style.display = 'none';
        if (blogIntroSection) blogIntroSection.style.display = 'none';
        fullBlogPostView.style.display = 'block';
        
        let keywordsHTML = '';
        if (postData.frontmatter.keywords) {
            const keywordsArray = postData.frontmatter.keywords.split(',').map(k => k.trim());
            keywordsHTML = `<div class="blog-keywords">Keywords: ${keywordsArray.map(k => `<span class="keyword">${k}</span>`).join(' ')}</div>`;
        }

        blogContentArea.innerHTML = `
            <h1>${postData.frontmatter.title || 'Untitled Post'}</h1>
            <p class="blog-meta">Published on: ${postData.frontmatter.date || 'N/A'}</p>
            ${keywordsHTML}
            <hr>
            ${marked.parse(postData.content)}
        `;
        window.scrollTo(0, 0); // Scroll to top
    }

    // --- Function to display list of blog posts ---
    function displayBlogList(posts) {
        blogPostsContainer.style.display = 'block';
        if (blogIntroSection) blogIntroSection.style.display = 'block';
        fullBlogPostView.style.display = 'none';
        blogPostsContainer.innerHTML = ''; // Clear loading or previous content

        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<p>No blog posts found. Check back soon!</p>';
            return;
        }
        
        // Sort posts by date, most recent first
        posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post-summary', 'card-style'); // Added card-style
            postElement.setAttribute('role', 'article');
            postElement.setAttribute('aria-labelledby', `blog-title-${post.id}`);
            
            let keywordsHTML = '';
            if (post.frontmatter.keywords) {
                const keywordsArray = post.frontmatter.keywords.split(',').map(k => k.trim());
                keywordsHTML = `<div class="blog-keywords">${keywordsArray.map(k => `<span class="keyword">${k}</span>`).join(' ')}</div>`;
            }

            postElement.innerHTML = `
                <h3 id="blog-title-${post.id}">${post.frontmatter.title || 'Untitled Post'}</h3>
                <p class="blog-meta">Date: ${post.frontmatter.date || 'N/A'}</p>
                <p class="blog-summary">${post.frontmatter.summary || post.content.substring(0, 150) + '...'}</p>
                ${keywordsHTML}
            `;
            postElement.addEventListener('click', () => displayFullPost(post));
            postElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    displayFullPost(post);
                }
            });
            postElement.tabIndex = 0; // Make it focusable
            blogPostsContainer.appendChild(postElement);
        });
    }

    // --- Fetch and process all blog posts ---
    async function loadBlogPosts() {
        const allPostsData = [];
        let postIdCounter = 0;

        for (const filename of blogFiles) {
            try {
                const response = await fetch(`_blogs/${filename}`);
                if (!response.ok) {
                    console.error(`Failed to load ${filename}: ${response.statusText}`);
                    continue;
                }
                const markdownText = await response.text();
                const { frontmatter, content } = parseFrontmatter(markdownText);
                allPostsData.push({ id: postIdCounter++, frontmatter, content, filename });
            } catch (error) {
                console.error(`Error processing ${filename}:`, error);
            }
        }
        displayBlogList(allPostsData);
    }

    // --- Event listener for back button ---
    if (backToListButton) {
        backToListButton.addEventListener('click', () => {
            loadBlogPosts(); // Reload list view
        });
    }

    // --- Initial load ---
    if (blogFiles.length > 0) {
        loadBlogPosts();
    } else {
        blogPostsContainer.innerHTML = '<p>No blog posts configured. Please add filenames to <code>js/blogs.js</code>.</p>';
    }
});
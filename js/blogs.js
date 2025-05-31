document.addEventListener('DOMContentLoaded', () => {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const fullBlogPostView = document.getElementById('full-blog-post-view');
    const blogContentArea = document.getElementById('blog-content-area');
    const backToListButton = document.getElementById('back-to-list');
    const blogIntroSection = document.getElementById('blog-intro');

    if (!blogPostsContainer) {
        // console.log("Blog container not found on this page."); // Optional: for debugging
        return; 
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

        if (!posts || posts.length === 0) { 
            blogPostsContainer.innerHTML = '<p>No blog posts found. Check back soon!</p>';
            return;
        }
        
        const sortedPosts = posts
            .filter(post => post && post.frontmatter && post.frontmatter.date) // Ensure post and frontmatter.date exist
            .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

        if (sortedPosts.length === 0 && posts.length > 0) {
            // This case means posts exist but might lack valid dates for sorting
            console.warn("Some posts might be missing valid dates for sorting.");
            // Optionally display unsorted or a message
        }

        sortedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post-summary', 'card-style');
            postElement.setAttribute('role', 'article');
            
            // Ensure post.frontmatter.title exists before trying to manipulate it for ID
            const titleForId = post.frontmatter.title || `untitled-post-${post.id || Math.random().toString(36).substr(2, 9)}`;
            const uniqueId = post.id || titleForId.replace(/\s+/g, '-').toLowerCase();
            postElement.setAttribute('aria-labelledby', `blog-title-${uniqueId}`);
            
            let keywordsHTML = '';
            if (post.frontmatter.keywords) {
                const keywordsArray = post.frontmatter.keywords.split(',').map(k => k.trim());
                keywordsHTML = `<div class="blog-keywords">${keywordsArray.map(k => `<span class="keyword">${k}</span>`).join(' ')}</div>`;
            }

            const summaryText = post.frontmatter.summary || (post.content ? post.content.substring(0, 150) + '...' : 'No summary available.');

            postElement.innerHTML = `
                <h3 id="blog-title-${uniqueId}">${post.frontmatter.title || 'Untitled Post'}</h3>
                <p class="blog-meta">Date: ${post.frontmatter.date || 'N/A'}</p>
                <p class="blog-summary">${summaryText}</p>
                ${keywordsHTML}
            `;
            postElement.addEventListener('click', () => displayFullPost(post));
            postElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    displayFullPost(post);
                }
            });
            postElement.tabIndex = 0; 
            blogPostsContainer.appendChild(postElement);
        });
    }

    // --- Fetch and process all blog posts from JSON ---
    async function loadBlogData() {
        blogPostsContainer.innerHTML = '<div class="loading-blogs">Loading posts...</div>';
        try {
            const response = await fetch('js/blogs-data.json'); 
            if (!response.ok) {
                console.error(`Failed to load blogs-data.json: ${response.statusText} (${response.status})`);
                blogPostsContainer.innerHTML = `<p>Error loading blog posts. Status: ${response.statusText} (${response.status}). <br>Please ensure 'js/blogs-data.json' exists and is accessible.</p>`;
                return;
            }
            const allPostsData = await response.json();

            if (allPostsData && Array.isArray(allPostsData)) {
                displayBlogList(allPostsData);
            } else {
                console.error('Blog data is not in the expected array format or is empty.');
                blogPostsContainer.innerHTML = '<p>No blog posts found or data is incorrectly formatted. Check back soon!</p>';
            }
        } catch (error) {
            console.error('Error fetching or processing blog data:', error);
            blogPostsContainer.innerHTML = '<p>Could not load blog posts due to a network or parsing error. Check the console for more details.</p>';
        }
    }

    // --- Event listener for back button ---
    if (backToListButton) {
        backToListButton.addEventListener('click', () => {
            loadBlogData(); 
        });
    }

    // --- Initial load ---
    loadBlogData();
});
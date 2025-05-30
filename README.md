# Personal Portfolio Website

This is a simple, modern portfolio website designed to be deployed on GitHub Pages.

## Setup

1.  **Clone/Download:** Get these files onto your local machine.
2.  **Resume:**
    * Compile your LaTeX CV into a PDF file.
    * Save it as `Vikash_Singh_CV.pdf` inside the `assets/resume/` directory.
3.  **Markdown Parser:**
    * Download `marked.min.js` from [https://cdn.jsdelivr.net/npm/marked/marked.min.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js).
    * Place it inside the `js/lib/` directory.
4.  **Customize Content:**
    * Edit the HTML files (`index.html`, `publications.html`, etc.) to update content directly, especially sections that are not auto-populated from your CV in this static setup. The initial content is based on the LaTeX CV you provided.
    * **Home Page News/Updates:** Manually edit the "News & Updates" section in `index.html`.
    * **Profile Picture (Optional):** Add a `profile.jpg` (or any other name, then update in `index.html`) to the `assets/images/` folder if you want a picture on the home page.
5.  **Blog Posts:**
    * Create new blog posts as Markdown files (`.md`) inside the `_blogs/` directory.
    * Each Markdown file **must** start with YAML frontmatter for title, date, and keywords. Example:
        ```markdown
        ---
        title: "My Awesome New Discovery"
        date: "2025-05-30"
        keywords: "research, AI, LLMs"
        summary: "A brief summary of this groundbreaking post..."
        ---

        The rest of your blog content in **Markdown** format goes here.
        You can use headings, lists, bold, italics, etc.
        ```
    * **Important:** After adding a new `.md` file to the `_blogs` directory, you **must** update the `blogFiles` array in `js/blogs.js` to include the new filename. For example, if you add `my-cool-paper.md`, add it to the array:
        ```javascript
        // In js/blogs.js
        const blogFiles = [
            'my-first-post.md',
            'another-update.md',
            'my-cool-paper.md' // Add your new file here
        ];
        ```

## Deployment on GitHub Pages

1.  Create a new repository on GitHub (e.g., `yourusername.github.io` for a user page, or `my-portfolio` for a project page).
2.  Push all these files (including `assets`, `css`, `js`, `_blogs` directories) to the repository.
3.  If it's a repository named `yourusername.github.io`, the site will be live at `https://yourusername.github.io`.
4.  If it's another name (e.g., `my-portfolio`), go to your repository's "Settings" -> "Pages".
    * Under "Build and deployment", select "Deploy from a branch".
    * Choose the branch (usually `main` or `master`).
    * Select the `/ (root)` folder.
    * Click "Save". Your site will be available at `https://yourusername.github.io/my-portfolio/`. You might need to adjust asset paths if using a project page (e.g., `/my-portfolio/css/style.css` instead of `/css/style.css`). For simplicity, this setup assumes deployment to a root or that paths are handled correctly by GitHub Pages.

## Features

* Responsive Design
* Dark/Light Mode Toggle
* Smooth Scrolling
* CSS Animations on hover/interaction
* Gradient color accents
* Blog system using Markdown files processed client-side.

## Icon Credits
This site uses Font Awesome icons. Ensure you have an internet connection for them to load from the CDN.
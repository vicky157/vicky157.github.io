# Personal Portfolio Website

A modern, responsive portfolio website for AI & LLM researcher Vikash Singh, designed for deployment on GitHub Pages.

## ✨ Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode Toggle** - User preference is saved locally
- **Smooth Animations** - CSS transitions and scroll-based fade-in effects
- **Blog System** - Dynamic blog with Markdown support and client-side processing
- **Modern UI** - Glass morphism design with gradient accents
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Accessibility** - ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/vicky157/vicky157.github.io.git
   cd vicky157.github.io
   ```

2. **Run the build script**
   ```bash
   ./build.sh
   ```

3. **Start local server**
   ```bash
   npm run serve
   ```

4. **Visit** `http://localhost:8000`

## 📝 Content Management

### Resume/CV

1. Compile your LaTeX CV into a PDF
2. Save as `CV_Vikash_PhD.pdf` in the `assets/resume/` directory

### Blog Posts

Create new blog posts as Markdown files in the `_blogs/` directory:

```markdown
---
title: "Your Amazing Post Title"
date: "2025-07-08"
keywords: "research, AI, machine learning"
summary: "A brief summary of your post..."
---

Your **Markdown** content goes here!

## Use headings, lists, and formatting

- Bullet points work
- Images are automatically converted to base64
- Math expressions supported with MathJax
```

**Important:** After adding new blog posts, run:
```bash
npm run build:blog
```

### Customizing Content

- **Home Page**: Edit `index.html` directly
- **Publications**: Update `publications.html`
- **Experience**: Modify `education_experience.html`
- **Contact Info**: Update `contact.html`

## 🛠️ Development

### Available Scripts

```bash
npm run build:blog          # Generate blog data from Markdown files
npm run serve              # Serve with Python (port 8000)
npm run serve:php          # Serve with PHP (port 8000)
```

### Project Structure

```
├── assets/
│   ├── blog_image/        # Blog post images
│   ├── icons/            # Favicons and icons
│   └── resume/           # CV/Resume files
├── css/
│   └── style.css         # Main stylesheet
├── js/
│   ├── lib/              # Third-party libraries
│   ├── blogs.js          # Blog functionality
│   ├── main.js           # Core JavaScript
│   └── blogs-data.json   # Generated blog data
├── scripts/
│   └── generate-blog-data.js  # Blog build script
├── _blogs/               # Markdown blog posts
├── *.html               # Website pages
└── package.json         # Dependencies and scripts
```

### Code Quality

The codebase follows modern best practices:

- **Modular JavaScript** - Functions are organized and well-documented
- **CSS Custom Properties** - Easy theming and maintenance
- **Semantic HTML** - Accessible and SEO-friendly markup
- **Error Handling** - Graceful fallbacks for all features

## 🚢 Deployment

### GitHub Pages (Recommended)

1. **Create Repository**
   - For user site: `yourusername.github.io`
   - For project site: any name (e.g., `portfolio`)

2. **Push Code**
   ```bash
   git push origin main
   ```

3. **Enable Pages**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Save

4. **Access Site**
   - User site: `https://yourusername.github.io`
   - Project site: `https://yourusername.github.io/repository-name`

### Other Hosting Platforms

The site works with any static hosting service:
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## 🔧 Troubleshooting

### Blog Posts Not Showing

1. Check that Markdown files have proper frontmatter
2. Run `npm run build:blog` to regenerate data
3. Ensure `js/blogs-data.json` exists and is valid

### Theme Not Persisting

- Check browser localStorage support
- Ensure JavaScript is enabled

### Images Not Loading

- Verify image paths are relative to the Markdown file
- Run blog build script to convert to base64

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Made with ❤️ by Vikash Singh**
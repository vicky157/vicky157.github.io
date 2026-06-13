/**
 * Layout shell: header (nav + mobile menu) + main placeholder + footer
 */

const semanticScholarSvg = `<svg class="btn-svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-1.5 18.5c-2.485 0-4.5-2.015-4.5-4.5 0-1.67.908-3.127 2.256-3.906L9.5 11.5c-.904.527-1.5 1.5-1.5 2.5 0 1.657 1.343 3 3 3s3-1.343 3-3h2c0 2.485-2.015 4.5-4.5 4.5zm5.244-6.594L14.5 10.5c.904-.527 1.5-1.5 1.5-2.5 0-1.657-1.343-3-3-3s-3 1.343-3 3H8c0-2.485 2.015-4.5 4.5-4.5S17 5.515 17 8c0 1.67-.908 3.127-2.256 3.906z"/></svg>`;

export function renderLayout(): string {
  return `
    <header>
        <nav>
            <div class="logo">
                <a href="/">
                    <img src="/assets/icons/dog-logo.svg" alt="Vikash Singh logo - cute dog face" class="logo-icon" width="40" height="40">
                    Vikash Singh
                </a>
            </div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/publications">Publications</a></li>
                <li><a href="/education-experience">Education &amp; Experience</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/cv">CV</a></li>
            </ul>
            <div class="nav-controls">
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode" aria-pressed="false" title="Toggle theme">
                    <span class="toggle-track-icon sun"><i class="fas fa-sun"></i></span>
                    <span class="toggle-track-icon moon"><i class="fas fa-moon"></i></span>
                    <span class="toggle-thumb">
                        <i class="fas fa-sun thumb-sun"></i>
                        <i class="fas fa-moon thumb-moon"></i>
                    </span>
                </button>
                <button id="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                    <span class="hamburger"></span>
                </button>
            </div>
        </nav>
        <div id="mobile-overlay"></div>
        <div id="mobile-menu" aria-hidden="true">
            <div class="mobile-menu-header">
                <span class="mobile-menu-title"><span class="terminal-prompt">$</span> ls nav/</span>
                <button id="mobile-menu-close" aria-label="Close menu">&times;</button>
            </div>
            <div class="mobile-menu-links">
                <a href="/"><span class="mm-mode">drwx</span><span class="mm-name">home/</span><span class="mm-arrow">&#10095;</span></a>
                <a href="/publications"><span class="mm-mode">drwx</span><span class="mm-name">publications/</span><span class="mm-arrow">&#10095;</span></a>
                <a href="/education-experience"><span class="mm-mode">drwx</span><span class="mm-name">experience/</span><span class="mm-arrow">&#10095;</span></a>
                <a href="/contact"><span class="mm-mode">drwx</span><span class="mm-name">contact/</span><span class="mm-arrow">&#10095;</span></a>
                <a href="/cv"><span class="mm-mode mm-file">-r-x</span><span class="mm-name">cv/</span><span class="mm-arrow">&#10095;</span></a>
            </div>
            <p class="mm-status">4 dirs &middot; 1 file &middot; tap to cd</p>
            <div class="mobile-menu-footer">
                <span class="mm-mode">lrwx</span>
                <a href="https://github.com/vicky157" target="_blank">github</a>
                <a href="https://www.linkedin.com/in/vikash-singh-john/" target="_blank">linkedin</a>
                <a href="https://scholar.google.com/citations?user=zt0c4WsAAAAJ" target="_blank">scholar</a>
                <a href="mailto:vikashjohn2505@gmail.com">email</a>
            </div>
        </div>
    </header>

    <main id="app-main"></main>

    <footer class="modern-footer">
        <div class="footer-terminal-window" aria-hidden="true">
            <div class="terminal-titlebar">
                <span class="terminal-dot dot-accent"></span>
                <span class="terminal-dot"></span>
                <span class="terminal-dot"></span>
                <span class="terminal-title">vikash@research &mdash; zsh</span>
            </div>
            <div id="terminal-body" class="terminal-body"></div>
        </div>
        <div class="footer-content">
            <div class="footer-brand">
                <h3>Vikash Singh</h3>
                <p class="footer-tagline">AI Researcher &amp; PhD Student</p>
            </div>
            <div class="footer-links">
                <div class="footer-row footer-nav">
                    <a href="/">Home</a>
                    <a href="/publications">Publications</a>
                    <a href="/education-experience">Experience</a>
                    <a href="/contact">Contact</a>
                    <a href="/cv">CV</a>
                </div>
                <div class="footer-row footer-social">
                    <a href="https://github.com/vicky157" target="_blank">GitHub</a>
                    <a href="https://www.linkedin.com/in/vikash-singh-john/" target="_blank">LinkedIn</a>
                    <a href="https://x.com/vikash_joh60795" target="_blank">X</a>
                    <a href="https://scholar.google.com/citations?user=zt0c4WsAAAAJ" target="_blank">Scholar</a>
                    <a href="https://www.semanticscholar.org/author/Vikash-Singh/2363724234" target="_blank">Semantic Scholar</a>
                    <a href="mailto:vikashjohn2505@gmail.com">Email</a>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <p>&copy; <span id="current-year"></span> Vikash Singh <span class="footer-updated">&middot; Last updated 2026-06-10</span></p>
        </div>
    </footer>
  `;
}

// Re-export the SVG for use in hero section
export { semanticScholarSvg };

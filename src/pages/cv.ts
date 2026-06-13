/**
 * Digital CV: a pixel-faithful HTML rendering of CV_Vikash_PhD.pdf that
 * prints/exports back to an identical PDF (US Letter, Computer Modern),
 * wrapped in an interactive layer — jump navigation, a live publication
 * filter, and one-click "Export PDF". All interactive chrome is hidden in
 * print and the document is forced to its full state, so the exported PDF
 * always matches the original regardless of on-screen interaction.
 */

import {
  cvHeader,
  cvPublications,
  cvExperience,
  cvEducation,
  cvResearch,
  cvProjects,
  cvSkills,
  cvCoursework,
  cvAchievements,
  type CvEntry,
  type CvPublication,
  type CvProject,
} from '../data/cv';

function renderContactLine(items: typeof cvHeader.line1): string {
  return items
    .map(
      (it) =>
        `<a class="cv-contact-item" href="${it.href}"${it.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}><i class="${it.icon}" aria-hidden="true"></i><span>${it.text}</span></a>`
    )
    .join('<span class="cv-contact-sep" aria-hidden="true">|</span>');
}

function renderPub(pub: CvPublication): string {
  const links = pub.links
    .map((l) => `[<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>]`)
    .join(' ');
  const haystack = `${pub.title} ${pub.authors} ${pub.venue}`
    .replace(/<[^>]+>/g, '')
    .toLowerCase();
  return `
            <article class="cv-pub" data-search="${haystack.replace(/"/g, '')}">
                <div class="cv-pub-head">
                    <span class="cv-pub-n">[${pub.n}]</span>
                    <span class="cv-pub-title">${pub.title}</span>
                </div>
                <div class="cv-pub-venue">${pub.venue}</div>
                <ul class="cv-bullets">
                    <li>${pub.authors}</li>
                    <li class="cv-pub-links">${links}</li>
                </ul>
            </article>`;
}

function renderEntry(e: CvEntry): string {
  const bullets = e.items
    ? `<ul class="cv-bullets">${e.items.map((i) => `<li>${i}</li>`).join('')}</ul>`
    : '';
  return `
            <div class="cv-entry">
                <div class="cv-entry-row">
                    <span class="cv-org">${e.org}</span>
                    <span class="cv-date">${e.date}</span>
                </div>
                <div class="cv-entry-row cv-entry-sub">
                    <span class="cv-role">${e.role}</span>
                    <span class="cv-loc">${e.location}</span>
                </div>${bullets}
            </div>`;
}

function renderProject(p: CvProject): string {
  return `
            <div class="cv-entry">
                <div class="cv-entry-row">
                    <span class="cv-proj-title"><strong>${p.title}</strong> <span class="cv-proj-bar">|</span> <em>${p.stack}</em></span>
                    <span class="cv-date">${p.date}</span>
                </div>
                <ul class="cv-bullets">${p.items.map((i) => `<li>${i}</li>`).join('')}</ul>
            </div>`;
}

export function render(): string {
  const pubsHtml = cvPublications.map(renderPub).join('\n');
  const expHtml = cvExperience.map(renderEntry).join('\n');
  const eduHtml = cvEducation.map(renderEntry).join('\n');
  const researchHtml = cvResearch.map(renderEntry).join('\n');
  const projectsHtml = cvProjects.map(renderProject).join('\n');
  const skillsHtml = cvSkills
    .map((s) => `<li><strong>${s.label}:</strong> ${s.value}</li>`)
    .join('');
  const coursesHtml = cvCoursework.map((c) => `<li>${c}</li>`).join('');
  const achievementsHtml = cvAchievements.map((a) => `<li>${a}</li>`).join('');

  return `
        <div class="cv-page">
            <div class="cv-intro">
                <div class="cv-intro-tag"><span class="cv-tb-prompt">$</span> cat ~/cv &mdash; live &amp; interactive &middot; exports to an identical PDF</div>
                <div class="cv-intro-actions">
                    <label class="cv-find">
                        <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
                        <input id="cv-find" type="search" placeholder="grep publications" aria-label="Filter publications" autocomplete="off">
                        <span id="cv-find-count" class="cv-find-count"></span>
                    </label>
                    <a class="cv-act-btn" href="/assets/CV_Vikash_PhD.pdf" target="_blank" rel="noopener" title="Open the original PDF">
                        <i class="fas fa-file-pdf" aria-hidden="true"></i><span>Original</span>
                    </a>
                    <button id="cv-print" class="cv-act-btn cv-act-primary" type="button" title="Export this CV to PDF">
                        <i class="fas fa-file-arrow-down" aria-hidden="true"></i><span>Export PDF</span>
                    </button>
                </div>
            </div>

            <div class="cv-stage">
                <div class="cv-scale-wrap" id="cv-scale-wrap">
                    <article class="cv-doc" id="cv-doc" lang="en">
                        <div class="cv-doc-head">
                            <h1 class="cv-name">${cvHeader.name}</h1>
                            <p class="cv-loc-line">${cvHeader.location}</p>
                            <p class="cv-contact">${renderContactLine(cvHeader.line1)}</p>
                            <p class="cv-contact">${renderContactLine(cvHeader.line2)}</p>
                        </div>

                        <section class="cv-sec" id="cv-publications">
                            <h2 class="cv-h2">Publications</h2>
                            <div class="cv-pubs">${pubsHtml}
                            </div>
                        </section>

                        <section class="cv-sec" id="cv-experience">
                            <h2 class="cv-h2">Experience</h2>${expHtml}
                        </section>

                        <section class="cv-sec" id="cv-education">
                            <h2 class="cv-h2">Education</h2>${eduHtml}
                        </section>

                        <section class="cv-sec" id="cv-research">
                            <h2 class="cv-h2">Research Work</h2>${researchHtml}
                        </section>

                        <section class="cv-sec" id="cv-projects">
                            <h2 class="cv-h2">Projects</h2>${projectsHtml}
                        </section>

                        <section class="cv-sec" id="cv-skills">
                            <h2 class="cv-h2">Technical Skills</h2>
                            <ul class="cv-skills">${skillsHtml}</ul>
                        </section>

                        <section class="cv-sec" id="cv-coursework">
                            <h2 class="cv-h2">Relevant Coursework</h2>
                            <ul class="cv-courses">${coursesHtml}</ul>
                        </section>

                        <section class="cv-sec" id="cv-achievements">
                            <h2 class="cv-h2">Academic Achievements &amp; Recognitions</h2>
                            <ul class="cv-bullets cv-achievements">${achievementsHtml}</ul>
                        </section>
                    </article>
                </div>
            </div>
        </div>
  `;
}

let resizeHandler: (() => void) | null = null;

function fitToWidth(): void {
  const wrap = document.getElementById('cv-scale-wrap');
  const doc = document.getElementById('cv-doc');
  if (!wrap || !doc) return;
  // Natural sheet width is 8.5in. Measure available width from the stage.
  const stage = wrap.parentElement;
  const avail = stage ? stage.clientWidth : wrap.clientWidth;
  const naturalWidth = doc.offsetWidth || 816;
  const scale = Math.min(1, avail / naturalWidth);
  doc.style.transform = scale < 1 ? `scale(${scale})` : '';
  // Reserve the scaled footprint so there is no extra whitespace.
  wrap.style.width = `${naturalWidth * scale}px`;
  wrap.style.height = scale < 1 ? `${doc.offsetHeight * scale}px` : '';
}

export function afterRender(): void {
  // Export / print to an identical PDF.
  const printBtn = document.getElementById('cv-print');
  printBtn?.addEventListener('click', () => window.print());

  // Live publication filter.
  const find = document.getElementById('cv-find') as HTMLInputElement | null;
  const count = document.getElementById('cv-find-count');
  const pubs = Array.from(document.querySelectorAll<HTMLElement>('.cv-pub'));
  const doc = document.getElementById('cv-doc');
  if (find && doc) {
    find.addEventListener('input', () => {
      const q = find.value.trim().toLowerCase();
      let shown = 0;
      pubs.forEach((pub) => {
        const match = !q || (pub.dataset.search || '').includes(q);
        pub.classList.toggle('cv-hide', !match);
        if (match) shown += 1;
      });
      doc.classList.toggle('is-filtering', q.length > 0);
      if (count) count.textContent = q ? `${shown}/${pubs.length}` : '';
    });
  }

  // Responsive: scale the fixed-width sheet down to fit narrow viewports.
  fitToWidth();
  resizeHandler = fitToWidth;
  window.addEventListener('resize', resizeHandler);
  // Re-fit once fonts settle (metrics can shift sheet height).
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => fitToWidth());
  }
}

export function onLeave(): void {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
}

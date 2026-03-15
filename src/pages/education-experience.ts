/**
 * Education & Experience page
 */

import { educationEntries, experienceEntries, researchEntries, projectEntries } from '../data/education';
import { initAnimations, initInteractiveElements } from '../components/animations';

export function render(): string {
  const educationHtml = educationEntries.map((entry) => {
    const coursesHtml = entry.courses.map((c) =>
      `                    <li><strong>${c.name}:</strong> ${c.description}</li>`
    ).join('\n');

    return `            <div class="entry">
                <h3>${entry.degree}</h3>
                <p class="institution">${entry.institution}</p>
                <p class="dates">${entry.dates}</p>
                <p class="details"><strong>Key Courses:</strong></p>
                <ul>
${coursesHtml}
                </ul>
            </div>`;
  }).join('\n');

  const experienceHtml = experienceEntries.map((entry) => {
    const itemsHtml = entry.items.map((item) =>
      `                    <li>${item}</li>`
    ).join('\n');

    return `            <div class="entry">
                <h3>${entry.title}</h3>
                <p class="institution">${entry.institution}</p>
                <p class="dates">${entry.dates}</p>
                <ul>
${itemsHtml}
                </ul>
            </div>`;
  }).join('\n');

  const researchHtml = researchEntries.map((entry) => {
    const itemsHtml = entry.items.map((item) =>
      `                    <li>${item}</li>`
    ).join('\n');

    return `            <div class="entry">
                <h3>${entry.title}</h3>
                <p class="institution">${entry.institution}</p>
                <p class="dates">${entry.dates}</p>
                <ul>
${itemsHtml}
                </ul>
            </div>`;
  }).join('\n');

  const projectsHtml = projectEntries.map((entry) => {
    const itemsHtml = entry.items.map((item) =>
      `                    <li>${item}</li>`
    ).join('\n');

    return `            <div class="entry project-entry">
                <h3>${entry.title}</h3>
                <p class="tech-stack"><em>${entry.techStack}</em> <span class="project-date">${entry.date}</span></p>
                <ul>
${itemsHtml}
                </ul>
                <a href="${entry.link.url}" target="_blank" class="btn-icon"><i class="${entry.link.icon}"></i> ${entry.link.label}</a>
            </div>`;
  }).join('\n');

  return `
        <section id="education" class="content-section card-style">
            <h2>Education</h2>
${educationHtml}
        </section>

        <section id="experience" class="content-section card-style">
            <h2>Experience</h2>
${experienceHtml}
        </section>

        <section id="research-work" class="content-section card-style">
            <h2>Research Work</h2>
${researchHtml}
        </section>

        <section id="projects" class="content-section card-style">
            <h2>Projects</h2>
${projectsHtml}
        </section>
  `;
}

export function afterRender(): void {
  initAnimations();
  initInteractiveElements();
}

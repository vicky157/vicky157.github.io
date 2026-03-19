/**
 * Semantic Scholar Publication Sync Script
 *
 * Fetches papers from the Semantic Scholar API for a given author,
 * merges with manual overrides (venue, featured, extra links, etc.),
 * and regenerates src/data/publications.ts.
 *
 * Usage: node scripts/sync-publications.cjs
 *
 * Manual overrides are stored in src/data/publication-overrides.json.
 * New papers discovered from S2 are automatically added to overrides
 * with default settings (featured: false).
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OVERRIDES_PATH = path.join(__dirname, '..', 'src', 'data', 'publication-overrides.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'publications.ts');

const S2_API_BASE = 'https://api.semanticscholar.org/graph/v1';
const S2_FIELDS = 'title,year,venue,authors,externalIds,abstract,citationCount,publicationDate';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal HTTPS GET that returns parsed JSON. */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'VikashSinghPortfolio/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
  });
}

/** Escape a string for use inside a single-quoted TypeScript string literal. */
function sq(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

/** Escape a string for use inside a backtick template literal. */
function tl(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

/** Generate a short citation key like "singh2026verge". */
function makeCiteKey(authors, year, title) {
  const lastName = (authors[0]?.name || 'unknown').split(/\s+/).pop().toLowerCase();
  const firstWord = title.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/)[0].toLowerCase();
  return `${lastName}${year}${firstWord}`;
}

/** Format authors with <strong> around the target author name. */
function formatAuthors(s2Authors, boldName) {
  return s2Authors
    .map((a) => (a.name === boldName ? `<strong>${a.name}</strong>` : a.name))
    .join(', ');
}

/** Generate BibTeX entry from paper metadata. */
function makeBibtex(paper, id, primaryClass) {
  const arxivId = paper.externalIds?.ArXiv;
  const authors = paper.authors.map((a) => a.name).join(' and ');
  const lines = [
    `@misc{${id},`,
    `  title={${paper.title}},`,
    `  author={${authors}},`,
    `  year={${paper.year}},`,
  ];
  if (arxivId) {
    lines.push(`  eprint={${arxivId}},`);
    lines.push(`  archivePrefix={arXiv},`);
    if (primaryClass) lines.push(`  primaryClass={${primaryClass}},`);
    lines.push(`  url={https://arxiv.org/abs/${arxivId}}`);
  }
  lines.push('}');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // 1. Load overrides
  const overrides = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf-8'));
  const { authorId, authorName } = overrides;

  console.log(`Fetching papers for ${authorName} (${authorId})...`);

  // 2. Fetch from Semantic Scholar
  const url = `${S2_API_BASE}/author/${authorId}/papers?fields=${S2_FIELDS}&limit=100`;
  const res = await fetchJSON(url);
  console.log(`Found ${res.data.length} papers from Semantic Scholar`);

  // 3. Sort by publication date descending (newest first)
  const papers = res.data.sort((a, b) => {
    const da = a.publicationDate || '0000-00-00';
    const db = b.publicationDate || '0000-00-00';
    return db.localeCompare(da);
  });

  // 4. Build publication entries
  const pubs = [];
  let newPapersFound = false;

  for (const paper of papers) {
    const arxivId = paper.externalIds?.ArXiv;
    const key = arxivId ? `arXiv:${arxivId}` : `s2:${paper.paperId}`;

    // Auto-register new papers with defaults
    if (!overrides.papers[key]) {
      const autoId = makeCiteKey(paper.authors, paper.year, paper.title);
      console.log(`  NEW paper: "${paper.title}" → ${autoId}`);
      overrides.papers[key] = { id: autoId, featured: false };
      newPapersFound = true;
    }

    const ov = overrides.papers[key];
    const id = ov.id || makeCiteKey(paper.authors, paper.year, paper.title);
    const authors = ov.authorsOverride || formatAuthors(paper.authors, authorName);
    const venue = ov.venue || (paper.venue ? `<em>${paper.venue}</em>` : '<em>Preprint</em>');
    const featured = ov.featured || false;
    const equalContribution = ov.equalContribution || null;

    // Build links: internal extras → arXiv → external extras
    const links = [];
    const extras = ov.extraLinks || [];
    links.push(...extras.filter((l) => l.isInternal));
    if (arxivId) {
      links.push({
        label: extras.length > 0 ? 'arXiv' : 'Preprint',
        url: `https://arxiv.org/abs/${arxivId}`,
        icon: 'fas fa-file-pdf',
      });
    }
    links.push(...extras.filter((l) => !l.isInternal));

    const bibtex = makeBibtex(paper, id, ov.primaryClass);

    pubs.push({ id, title: paper.title, authors, venue, links, abstract: paper.abstract, bibtex, featured, equalContribution });
  }

  // 5. Persist new paper entries back to overrides
  if (newPapersFound) {
    fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2) + '\n', 'utf-8');
    console.log('Updated overrides file with new papers');
  }

  // 6. Read existing publications.ts to preserve researchInterests & researchStatement
  const existing = fs.readFileSync(OUTPUT_PATH, 'utf-8');
  const researchMatch = existing.match(/(export const researchInterests[\s\S]*)$/);
  const researchSection = researchMatch ? researchMatch[1] : '';

  // 7. Generate publications.ts
  const pubEntries = pubs
    .map((pub) => {
      const linksStr = pub.links
        .map((l) => {
          let s = `      { label: '${sq(l.label)}', url: '${sq(l.url)}', icon: '${sq(l.icon)}'`;
          if (l.isInternal) s += ', isInternal: true';
          return s + ' }';
        })
        .join(',\n');

      let e = '  {\n';
      e += `    id: '${sq(pub.id)}',\n`;
      e += `    title: '${sq(pub.title)}',\n`;
      e += `    authors: '${sq(pub.authors)}',\n`;
      e += `    venue: '${sq(pub.venue)}',\n`;
      e += `    links: [\n${linksStr},\n    ],\n`;
      if (pub.abstract) {
        e += `    abstract: '${sq(pub.abstract)}',\n`;
      }
      e += `    bibtex: \`${tl(pub.bibtex)}\`,\n`;
      e += `    featured: ${pub.featured},\n`;
      if (pub.equalContribution) {
        e += `    equalContribution: '${sq(pub.equalContribution)}',\n`;
      }
      e += '  }';
      return e;
    })
    .join(',\n');

  const output = `import type { Publication } from '../types';

export const publications: Publication[] = [
${pubEntries},
];

${researchSection}`;

  fs.writeFileSync(OUTPUT_PATH, output, 'utf-8');
  console.log(`Wrote ${pubs.length} publications to publications.ts`);
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});

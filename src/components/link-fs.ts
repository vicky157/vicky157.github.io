/**
 * Hero link filesystem: links rendered as `ls -la` output inside a working
 * mini-shell. Mouse: rows are plain anchors with a TUI selection cursor and
 * a `stat` preview pane. Keyboard: arrows / j / k move, Enter opens. And the
 * prompt below the listing is REAL: type `help`, `open github`, `theme`,
 * `cd publications`, with ghost autosuggestions and Tab-complete.
 * Selection prefetches same-origin files and preconnects external origins.
 */

interface FsLink {
  name: string;
  label: string;
  mode: string;
  href: string;
  target: string;
  type: string;
  note: string;
  newTab: boolean;
}

const FS_LINKS: FsLink[] = [
  { name: 'cv.pdf', label: 'View CV', mode: '-r-x', href: '/assets/CV_Vikash_PhD.pdf', target: 'curriculum vitae · 157K', type: 'file (pdf, 157K)', note: 'Education, experience, full publication list.', newTab: true },
  { name: 'github', label: 'GitHub', mode: 'lrwx', href: 'https://github.com/vicky157', target: 'github.com/vicky157', type: 'symlink', note: 'Research code: verification, anomaly detection, pruning.', newTab: true },
  { name: 'linkedin', label: 'LinkedIn', mode: 'lrwx', href: 'https://www.linkedin.com/in/vikash-singh-john/', target: 'linkedin.com/in/vikash-singh-john', type: 'symlink', note: 'Professional profile and experience.', newTab: true },
  { name: 'x', label: 'X / Twitter', mode: 'lrwx', href: 'https://x.com/vikash_joh60795', target: 'x.com/vikash_joh60795', type: 'symlink', note: 'Paper threads and research updates.', newTab: true },
  { name: 'scholar', label: 'Google Scholar', mode: 'lrwx', href: 'https://scholar.google.com/citations?user=zt0c4WsAAAAJ', target: 'scholar.google.com/zt0c4Ws', type: 'symlink', note: 'Citations across ACL, ICLR, ICML, NeurIPS.', newTab: true },
  { name: 'semantic', label: 'Semantic Scholar', mode: 'lrwx', href: 'https://www.semanticscholar.org/author/Vikash-Singh/2363724234', target: 'semanticscholar.org/author/vikash-singh', type: 'symlink', note: 'Papers, co-authors, citation graph.', newTab: true },
  { name: 'email', label: 'Email me', mode: 'lrwx', href: 'mailto:vikashjohn2505@gmail.com', target: 'vikashjohn2505@gmail.com', type: 'symlink', note: 'Fastest way to reach me. Open to collaboration.', newTab: false },
];

const MODE_KEY = 'link-ui-mode';

const PAGES: Record<string, string> = {
  home: '/',
  '~': '/',
  publications: '/publications',
  experience: '/education-experience',
  contact: '/contact',
};

function renderFsRow(link: FsLink): string {
  const targetAttr = link.newTab ? ' target="_blank" rel="noopener"' : '';
  return `                    <a class="fs-row fs-hidden${link.mode.startsWith('-') ? ' fs-file' : ''}" href="${link.href}"${targetAttr}
                       data-name="${link.name}" data-type="${link.type}" data-target="${link.target}" data-note="${link.note}">
                        <span class="fs-mode">${link.mode}</span><span class="fs-name">${link.name}</span><span class="fs-arrow">→</span><span class="fs-target">${link.target}</span>
                    </a>`;
}

const PORT_CODES: Record<string, string> = {
  'cv.pdf': 'CV', github: 'GITHUB', linkedin: 'LINKEDIN', x: 'X', scholar: 'SCHOLAR', semantic: 'SEMANTIC', email: 'EMAIL',
};

function renderCircuitPort(link: FsLink, i: number): string {
  const targetAttr = link.newTab ? ' target="_blank" rel="noopener"' : '';
  return `                            <a class="circuit-port${i === 0 ? ' is-hot' : ''}" href="${link.href}"${targetAttr} data-index="${i}" data-note="${link.note}">
                                <span class="port-pad"></span><span class="port-name">${PORT_CODES[link.name] || link.name}</span><span class="port-dest">${link.target}</span>
                            </a>`;
}

function renderCircuit(): string {
  return `                <div id="fs-circuit" class="fs-circuit" hidden>
                    <div id="circuit-board" class="circuit-board">
                        <svg id="circuit-traces" class="circuit-traces" aria-hidden="true"></svg>
                        <div class="circuit-chip" aria-hidden="true">
                            <span class="chip-pins chip-pins-left"></span>
                            <span class="chip-pins chip-pins-top"></span>
                            <span class="chip-pins chip-pins-bottom"></span>
                            <span class="chip-dot"></span>
                            <span class="chip-led"></span>
                            <span class="chip-name">VS</span>
                            <span class="chip-sub">link-ctrl</span>
                            <span class="chip-rev">rev 5.0 &middot; 2026</span>
                        </div>
                        <div class="circuit-ports" id="circuit-ports">
${FS_LINKS.map(renderCircuitPort).join('\n')}
                        </div>
                    </div>
                    <p class="circuit-status" id="circuit-status" aria-live="polite">7 routes up &middot; hover to probe &middot; click to open</p>
                </div>`;
}

export function renderLinkFs(): string {
  return `            <div id="link-fs" class="link-fs" aria-label="Links">
                <div class="fs-mode-toggle" role="group" aria-label="Link display mode">
                    <span class="fs-mode-thumb" aria-hidden="true"></span>
                    <button type="button" class="fs-mode-btn" data-mode="circuit" aria-pressed="true">&#8961; circuit</button>
                    <button type="button" class="fs-mode-btn" data-mode="term" aria-pressed="false">&gt;_ terminal</button>
                </div>
                <div id="fs-term-wrap" class="fs-term-wrap">
                <div class="fs-terminal" id="fs-terminal">
                    <p class="link-fs-cmd"><span class="terminal-path">~</span> <span class="terminal-prompt">$</span> <span id="fs-cmd-text"></span><span id="fs-boot-cursor" class="terminal-cursor"></span></p>
                    <div id="fs-list">
${FS_LINKS.map(renderFsRow).join('\n')}
                    </div>
                    <p id="fs-status" class="fs-status fs-hidden">total ${FS_LINKS.length} · 1 file · ${FS_LINKS.length - 1} symlinks</p>
                    <div id="fs-output" class="fs-output" aria-live="polite"></div>
                    <p id="fs-live" class="link-fs-cmd fs-live fs-hidden">
                        <span class="terminal-path">~</span> <span class="terminal-prompt">$</span><!--
                     --><input id="fs-input" class="fs-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" aria-label="Terminal input, type help for commands"><!--
                     --><span class="terminal-cursor"></span><span id="fs-ghost" class="fs-ghost"></span>
                    </p>
                </div>
                <aside id="fs-preview" class="fs-preview fs-hidden" aria-hidden="true">
                    <p class="fs-preview-cmd">$ stat links/<span id="fs-preview-name"></span></p>
                    <p class="fs-preview-line"><span class="fs-preview-key">type</span><span id="fs-preview-type"></span></p>
                    <p class="fs-preview-line"><span class="fs-preview-key">dest</span><span id="fs-preview-target"></span></p>
                    <p class="fs-preview-line"><span class="fs-preview-key">info</span><span id="fs-preview-note"></span></p>
                    <p class="fs-preview-hint">↑↓ / jk move &middot; &#9166; open &middot; or type: help</p>
                </aside>
                </div>
${renderCircuit()}
            </div>`;
}

/** Circuit ⇄ terminal switcher. The schematic is the friendly default;
 *  the terminal is the power mode. The choice persists. */
function initModeToggle(): void {
  const root = document.getElementById('link-fs');
  const termWrap = document.getElementById('fs-term-wrap');
  const circuit = document.getElementById('fs-circuit');
  if (!root || !termWrap || !circuit) return;

  const toggle = root.querySelector<HTMLElement>('.fs-mode-toggle');
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('.fs-mode-btn'));

  const setMode = (mode: 'term' | 'circuit'): void => {
    toggle?.classList.toggle('mode-term', mode === 'term');
    termWrap.hidden = mode !== 'term';
    circuit.hidden = mode === 'term';
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    if (mode === 'circuit') {
      window.dispatchEvent(new Event('resize')); // traces re-measure once visible
    }
  };

  let stored: string | null = null;
  try {
    stored = localStorage.getItem(MODE_KEY);
  } catch { /* storage unavailable */ }

  setMode(stored === 'term' ? 'term' : 'circuit');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = (btn.dataset.mode === 'term' ? 'term' : 'circuit');
      setMode(mode);
      try {
        localStorage.setItem(MODE_KEY, mode);
      } catch { /* storage unavailable */ }
    });
  });
}

const SVG_NS = 'http://www.w3.org/2000/svg';

/** The schematic: traces route from the chip to every port, signals flow. */
function initCircuit(warm: (href: string) => void): void {
  const board = document.getElementById('circuit-board');
  const svg = document.getElementById('circuit-traces') as unknown as SVGSVGElement | null;
  const chip = board?.querySelector<HTMLElement>('.circuit-chip');
  const statusEl = document.getElementById('circuit-status');
  const ports = Array.from(document.querySelectorAll<HTMLAnchorElement>('.circuit-port'));
  if (!board || !svg || !chip || !statusEl || ports.length === 0) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = ports.length;
  let hot = 0;
  let booted = false;

  const build = (): void => {
    svg.innerHTML = '';
    const W = board.clientWidth;
    const H = board.clientHeight;
    if (W === 0) return; // hidden; will rebuild on next resize
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const bRect = board.getBoundingClientRect();
    const cRect = chip.getBoundingClientRect();
    const x0 = cRect.right - bRect.left;
    const cy = cRect.top - bRect.top + cRect.height / 2;

    ports.forEach((port, i) => {
      const pRect = port.getBoundingClientRect();
      const y = pRect.top - bRect.top + pRect.height / 2;
      const xEnd = pRect.left - bRect.left + 4;
      const pinY = cy + (i - (N - 1) / 2) * 9;
      const busX = x0 + 18 + i * 9;

      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', `M ${x0} ${pinY} H ${busX} V ${y} H ${xEnd}`);
      path.setAttribute('class', `trace${i === hot ? ' hot' : ''}`);
      path.setAttribute('id', `trace-${i}`);
      svg.appendChild(path);

      const pin = document.createElementNS(SVG_NS, 'rect');
      pin.setAttribute('x', String(x0 - 2));
      pin.setAttribute('y', String(pinY - 2.5));
      pin.setAttribute('width', '5');
      pin.setAttribute('height', '5');
      pin.setAttribute('class', 'trace-pin');
      svg.appendChild(pin);

      if (!reducedMotion) {
        const pulse = document.createElementNS(SVG_NS, 'circle');
        pulse.setAttribute('r', '2.6');
        pulse.setAttribute('class', `trace-pulse${i === hot ? ' hot' : ''}`);
        const motion = document.createElementNS(SVG_NS, 'animateMotion');
        motion.setAttribute('dur', `${2.6 + i * 0.45}s`);
        motion.setAttribute('repeatCount', 'indefinite');
        const mpath = document.createElementNS(SVG_NS, 'mpath');
        mpath.setAttribute('href', `#trace-${i}`);
        motion.appendChild(mpath);
        pulse.appendChild(motion);
        svg.appendChild(pulse);
      }

      // boot: draw each trace in, staggered
      if (!reducedMotion && !booted) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        path.style.transition = `stroke-dashoffset 0.55s ease ${i * 0.09}s`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });
        });
      }
    });
    booted = true;
  };

  const probe = (i: number): void => {
    hot = i;
    ports.forEach((p, j) => p.classList.toggle('is-hot', j === i));
    svg.querySelectorAll('.trace').forEach((t, j) => t.classList.toggle('hot', j === i));
    svg.querySelectorAll('.trace-pulse').forEach((t, j) => t.classList.toggle('hot', j === i));
    statusEl.textContent = `[${i + 1}/${N}] ${ports[i].dataset.note || ''}`;
    warm(ports[i].getAttribute('href') || '');
  };

  ports.forEach((port, i) => {
    port.addEventListener('mouseenter', () => probe(i));
    port.addEventListener('focus', () => probe(i));
  });

  build();
  window.addEventListener('resize', build);
  probe(0);
}

// Warm the pipe for wherever the cursor lands: prefetch same-origin files,
// preconnect external origins, so the eventual click resolves faster.
const warmed = new Set<string>();
function warmHref(href: string): void {
  if (!href || warmed.has(href) || href.startsWith('mailto:')) return;
  warmed.add(href);
  const link = document.createElement('link');
  if (href.startsWith('/')) {
    link.rel = 'prefetch';
    link.href = href;
  } else {
    link.rel = 'preconnect';
    link.href = new URL(href).origin;
  }
  document.head.appendChild(link);
}

export function initLinkFs(): void {
  initModeToggle();
  initCircuit(warmHref);

  const cmdText = document.getElementById('fs-cmd-text');
  const list = document.getElementById('fs-list');
  const status = document.getElementById('fs-status');
  const preview = document.getElementById('fs-preview');
  if (!cmdText || !list || !status || !preview) return;

  const rows = Array.from(list.querySelectorAll<HTMLAnchorElement>('.fs-row'));
  const previewName = document.getElementById('fs-preview-name')!;
  const previewType = document.getElementById('fs-preview-type')!;
  const previewTarget = document.getElementById('fs-preview-target')!;
  const previewNote = document.getElementById('fs-preview-note')!;
  const bootCursor = document.getElementById('fs-boot-cursor')!;
  const live = document.getElementById('fs-live')!;

  const warm = (row: HTMLAnchorElement): void => warmHref(row.getAttribute('href') || '');

  const select = (row: HTMLAnchorElement): void => {
    rows.forEach((r) => r.classList.toggle('is-selected', r === row));
    const i = rows.indexOf(row);
    status.textContent = `[${i + 1}/${rows.length}] links/${row.dataset.name} → ${row.dataset.target}`;
    previewName.textContent = row.dataset.name || '';
    previewType.textContent = row.dataset.type || '';
    previewTarget.textContent = row.dataset.target || '';
    previewNote.textContent = row.dataset.note || '';
    preview.classList.remove('fs-hidden');
    preview.classList.add('is-open');
    preview.classList.remove('fs-flash');
    void (preview as HTMLElement).offsetWidth; // restart the flash animation
    preview.classList.add('fs-flash');
    warm(row);
  };

  // Selection persists like a real file manager: it moves, it never vanishes
  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => select(row));
    row.addEventListener('focus', () => select(row));
  });

  // TUI keys: arrows / j / k move the cursor, Enter opens (native anchor behavior)
  list.addEventListener('keydown', (e: KeyboardEvent) => {
    const current = rows.indexOf(document.activeElement as HTMLAnchorElement);
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'j') next = Math.min(current + 1, rows.length - 1);
    else if (e.key === 'ArrowUp' || e.key === 'k') next = Math.max(current - 1, 0);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = rows.length - 1;
    if (next >= 0) {
      e.preventDefault();
      rows[next].focus();
    }
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const stagger = (): void => {
    rows.forEach((row, i) => {
      setTimeout(() => row.classList.remove('fs-hidden'), reducedMotion ? 0 : 70 * i);
    });
  };

  // Boot sequence: type the command, print rows, open a live prompt
  const CMD = 'ls -la links/';

  const reveal = (): void => {
    stagger();
    const after = reducedMotion ? 0 : 70 * rows.length;
    setTimeout(() => {
      status.classList.remove('fs-hidden');
      bootCursor.style.display = 'none';
      live.classList.remove('fs-hidden');
    }, after + 120);
    // Land the cursor on cv.pdf so the browser boots into a live state
    setTimeout(() => {
      if (rows[0] && !rows.some((r) => r.classList.contains('is-selected'))) select(rows[0]);
    }, after + 450);
  };

  initShell(rows, stagger);

  if (reducedMotion) {
    cmdText.textContent = CMD;
    reveal();
    return;
  }

  let i = 0;
  const typeChar = (): void => {
    i++;
    cmdText.textContent = CMD.slice(0, i);
    if (i < CMD.length) {
      setTimeout(typeChar, 34 + Math.random() * 36);
    } else {
      setTimeout(reveal, 180);
    }
  };
  typeChar();
}

/** The live prompt: a tiny, forgiving shell. */
function initShell(rows: HTMLAnchorElement[], replay: () => void): void {
  const input = document.getElementById('fs-input') as HTMLInputElement | null;
  const ghost = document.getElementById('fs-ghost');
  const out = document.getElementById('fs-output');
  const terminal = document.getElementById('fs-terminal');
  if (!input || !ghost || !out || !terminal) return;

  const names = FS_LINKS.map((l) => l.name);
  const SUGGESTIONS = [
    'help', 'ls', 'clear', 'whoami', 'theme',
    ...Object.keys(PAGES).filter((p) => p !== '~').map((p) => `cd ${p}`),
    ...names.map((n) => `open ${n}`),
  ];

  const print = (text: string): void => {
    const line = document.createElement('div');
    line.className = 'fs-out-line';
    line.textContent = text;
    out.appendChild(line);
    while (out.children.length > 4) out.removeChild(out.firstChild as Node);
  };

  const openLink = (name: string): boolean => {
    const row = rows.find((r) => (r.dataset.name || '').startsWith(name));
    if (!row) return false;
    print(`opening ${row.dataset.name} → ${row.dataset.target}`);
    row.click();
    return true;
  };

  const execute = (raw: string): void => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const [head, ...args] = cmd.split(/\s+/);
    const arg = args.join(' ');

    if (head === 'help') {
      print('commands: help · ls · whoami · theme · clear · cd <page> · open <link>');
    } else if (head === 'ls') {
      rows.forEach((r) => r.classList.add('fs-hidden'));
      replay();
    } else if (head === 'clear') {
      out.innerHTML = '';
    } else if (head === 'whoami') {
      print('vikash singh · phd @ case western reserve · llm reasoning, formally verified');
    } else if (head === 'theme') {
      document.getElementById('theme-toggle')?.click();
      print(`theme → ${document.documentElement.getAttribute('data-theme')}`);
    } else if (head === 'cd') {
      const path = PAGES[arg];
      if (path) {
        const a = document.createElement('a');
        a.href = path;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        print(`cd: no such directory: ${arg || '?'} · try cd publications`);
      }
    } else if (head === 'open' && arg) {
      if (!openLink(arg)) print(`open: not found: ${arg} · try open github`);
    } else if (openLink(head)) {
      // bare link name works too
    } else {
      print(`zsh: command not found: ${head} · try help`);
    }
  };

  const syncGhost = (): void => {
    const v = input.value;
    input.style.width = `${Math.max(v.length, 1)}ch`;
    const hit = v ? SUGGESTIONS.find((s) => s.startsWith(v.toLowerCase()) && s !== v.toLowerCase()) : '';
    ghost.textContent = hit ? hit.slice(v.length) : (v ? '' : 'try: help');
  };

  input.addEventListener('input', syncGhost);
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(input.value);
      input.value = '';
      syncGhost();
    } else if ((e.key === 'Tab' || e.key === 'ArrowRight') && ghost.textContent && input.value
               && input.selectionStart === input.value.length) {
      e.preventDefault();
      input.value += ghost.textContent;
      syncGhost();
    }
  });

  // Clicking anywhere in the terminal that isn't a row focuses the prompt
  terminal.addEventListener('click', (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest('a')) input.focus({ preventScroll: true });
  });

  syncGhost();
}

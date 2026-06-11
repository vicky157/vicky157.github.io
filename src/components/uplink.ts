/**
 * Contact uplink console: channels with signal bars, a ground-station line,
 * and a transmission composer that builds a prefilled mailto and "transmits"
 * it with a handshake sequence. Live payload size + checksum as you type.
 */

const CONTACT_EMAIL = 'vikashjohn2505@gmail.com';

interface Channel {
  code: string;
  freq: string;
  href: string;
  note: string;
  newTab: boolean;
}

const CHANNELS: Channel[] = [
  { code: 'EMAIL', freq: '88.1MHz', href: `mailto:${CONTACT_EMAIL}`, note: 'Fastest way to reach me. Open to collaboration.', newTab: false },
  { code: 'GITHUB', freq: '94.7MHz', href: 'https://github.com/vicky157', note: 'Research code, issues, pull requests.', newTab: true },
  { code: 'LINKEDIN', freq: '101.3MHz', href: 'https://www.linkedin.com/in/vikash-singh-john/', note: 'Professional profile and experience.', newTab: true },
  { code: 'X', freq: '105.9MHz', href: 'https://x.com/vikash_joh60795', note: 'Paper threads and research updates.', newTab: true },
  { code: 'SCHOLAR', freq: '112.5MHz', href: 'https://scholar.google.com/citations?user=zt0c4WsAAAAJ', note: 'Citations across ACL, ICLR, ICML, NeurIPS.', newTab: true },
  { code: 'SEMANTIC', freq: '118.2MHz', href: 'https://www.semanticscholar.org/author/Vikash-Singh/2363724234', note: 'Papers, co-authors, citation graph.', newTab: true },
];

function renderChannel(ch: Channel, i: number): string {
  const targetAttr = ch.newTab ? ' target="_blank" rel="noopener"' : '';
  return `                <a class="up-channel${i === 0 ? ' is-tuned' : ''}" href="${ch.href}"${targetAttr} data-index="${i}" data-note="${ch.note}">
                    <span class="up-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
                    <span class="up-code">${ch.code}</span>
                    <span class="up-freq">${ch.freq}</span>
                </a>`;
}

export function renderUplink(): string {
  return `
        <section id="uplink" class="content-section card-style">
            <h2>Establish Uplink</h2>
            <p>Pick a channel, or compose a transmission below. I am always open to discussing research,
            collaborations, or a good proof.</p>

            <div class="up-band" aria-label="Contact channels">
${CHANNELS.map(renderChannel).join('\n')}
            </div>
            <p id="up-band-status" class="up-band-status" aria-live="polite">[ch 1/${CHANNELS.length}] ${CHANNELS[0].note}</p>

            <p class="up-ground"><span class="up-beacon" aria-hidden="true"></span>ground station &middot; 41.51&deg;N 81.60&deg;W &middot; cleveland, oh, usa</p>

            <div class="uplink-console">
                <div class="up-titlebar">
                    <span class="terminal-dot dot-accent"></span>
                    <span class="terminal-dot"></span>
                    <span class="up-title">uplink-7 &middot; channel: ${CONTACT_EMAIL}</span>
                    <span class="up-sig" aria-hidden="true">sig &#9602;&#9604;&#9606;&#9608;</span>
                </div>
                <div class="up-body">
                    <label class="up-field">
                        <span class="up-key">from</span>
                        <input id="up-from" type="email" autocomplete="email" placeholder="you@university.edu (optional)">
                    </label>
                    <label class="up-field">
                        <span class="up-key">subject</span>
                        <input id="up-subject" type="text" placeholder="Collaboration / question / hello">
                    </label>
                    <label class="up-field up-field-area">
                        <span class="up-key">payload</span>
                        <textarea id="up-payload" rows="5" placeholder="Type your transmission..."></textarea>
                    </label>
                    <div class="up-foot">
                        <span id="up-meta" class="up-meta">payload 0 B &middot; checksum 0x0000</span>
                        <button id="up-send" type="button" class="btn">&#8673; Transmit</button>
                    </div>
                    <p id="up-status" class="up-status" aria-live="polite"></p>
                </div>
            </div>
        </section>`;
}

/** Cheap, stable checksum for the integrity readout. */
function checksum(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) & 0xffff;
  }
  return `0x${h.toString(16).toUpperCase().padStart(4, '0')}`;
}

export function initUplink(): void {
  const bandStatus = document.getElementById('up-band-status');
  const channels = Array.from(document.querySelectorAll<HTMLAnchorElement>('.up-channel'));
  channels.forEach((ch, i) => {
    const tune = (): void => {
      channels.forEach((c, j) => c.classList.toggle('is-tuned', j === i));
      if (bandStatus) bandStatus.textContent = `[ch ${i + 1}/${channels.length}] ${ch.dataset.note || ''}`;
    };
    ch.addEventListener('mouseenter', tune);
    ch.addEventListener('focus', tune);
  });

  const fromEl = document.getElementById('up-from') as HTMLInputElement | null;
  const subjectEl = document.getElementById('up-subject') as HTMLInputElement | null;
  const payloadEl = document.getElementById('up-payload') as HTMLTextAreaElement | null;
  const metaEl = document.getElementById('up-meta');
  const statusEl = document.getElementById('up-status');
  const sendBtn = document.getElementById('up-send') as HTMLButtonElement | null;
  if (!fromEl || !subjectEl || !payloadEl || !metaEl || !statusEl || !sendBtn) return;

  const syncMeta = (): void => {
    const bytes = new TextEncoder().encode(payloadEl.value).length;
    metaEl.textContent = `payload ${bytes} B · checksum ${checksum(payloadEl.value)}`;
  };
  payloadEl.addEventListener('input', syncMeta);
  syncMeta();

  const transmit = (): void => {
    const payload = payloadEl.value.trim();
    if (!payload) {
      statusEl.textContent = 'abort: empty payload · nothing to transmit';
      payloadEl.focus();
      return;
    }
    const subject = subjectEl.value.trim() || 'Transmission from vikash-singh.me';
    const from = fromEl.value.trim();
    const body = from ? `${payload}\n\n— ${from}` : payload;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      window.location.href = href;
      return;
    }

    sendBtn.disabled = true;
    const steps = [
      ['encrypting payload...', 240],
      [`handshake ok · checksum ${checksum(payloadEl.value)} verified`, 420],
      ['opening secure channel → your mail client', 360],
    ] as const;
    let t = 0;
    steps.forEach(([text, dur]) => {
      t += dur;
      setTimeout(() => { statusEl.textContent = text; }, t - dur);
    });
    setTimeout(() => {
      statusEl.textContent = 'transmission handed off ✓';
      sendBtn.disabled = false;
      window.location.href = href;
    }, t);
  };

  sendBtn.addEventListener('click', transmit);
}

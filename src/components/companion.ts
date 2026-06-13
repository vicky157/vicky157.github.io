/**
 * Lemma — a pet puppy that lives on the page.
 *
 * A front-facing puppy drawn to match the site's dog logo. She behaves on her
 * own: she sits, looks around with a curious head-tilt, sniffs, wags, scratches,
 * barks, chases her tail, hops across the floor, and naps. She does NOT follow
 * your cursor — you come to her. Care for her like a pet: pet her, throw a ball
 * (she hops over to fetch it), and feed her treats. She has moods (happy /
 * energy / fullness) that drift over time and persist across visits, and she'll
 * ask for food or play when she needs it.
 *
 * Self-contained: attaches to <body>, survives SPA navigation, scales down on
 * phones, respects prefers-reduced-motion, pauses when hidden, hidden in print.
 */

const K_ENABLED = 'companion-enabled';
const K_NAME = 'companion-name';
const K_STATS = 'companion-stats';
const K_GREET = 'companion-greeted';

let DOG = 84; // px footprint (set per viewport)
const BALL = 22;
const TREAT = 28;

// Constant movement speeds (px per frame). Front-facing hop; gentle on purpose.
const SPEED = { walk: 1.2, come: 1.9, fetch: 2.3, return: 1.9, eat: 1.7 };

type Mode = 'idle' | 'walk' | 'come' | 'fetch' | 'return' | 'eat';

interface Pt {
  x: number;
  y: number;
}

/* Front-facing puppy, drawn to match /assets/icons/dog-logo.svg. Riggable
   parts: ears (flap), eyes (look + blink), tail (wag), tongue (loll). */
const PUPPY_SVG = `
<svg class="cmp-dog-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path class="cmp-tail" d="M70 76 Q93 71 90 53 Q88 46 82 49 Q88 64 66 68 Z" fill="#fff" stroke="#141414" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <g class="cmp-ink" fill="#fff" stroke="#141414" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body -->
    <path d="M30 48 Q20 70 24 85 Q27 93 38 93 L62 93 Q73 93 76 85 Q80 70 70 48 Q50 56 30 48 Z"/>
    <!-- Tummy patch -->
    <path d="M41.5 67 Q50 63 58.5 67 L58.5 85 Q58.5 92 50 92 Q41.5 92 41.5 85 Z"/>
    <!-- Front paws -->
    <path d="M33 93 Q32 86 38.5 86 Q42 86 41.5 93 Z"/>
    <path d="M67 93 Q68 86 61.5 86 Q58 86 58.5 93 Z"/>
    <!-- Big round back feet -->
    <circle cx="16.5" cy="84" r="12.5"/>
    <circle cx="83.5" cy="84" r="12.5"/>
    <!-- Head -->
    <ellipse cx="50" cy="33" rx="31" ry="27.5"/>
    <!-- Floppy ears -->
    <path class="cmp-ear cmp-ear-l" d="M36 7.5 Q17 10 9.5 29 Q5.5 42 12 48.5 Q19 54 26.5 45 Q23.5 24 36 7.5 Z"/>
    <path class="cmp-ear cmp-ear-r" d="M64 7.5 Q83 10 90.5 29 Q94.5 42 88 48.5 Q81 54 73.5 45 Q76.5 24 64 7.5 Z"/>
  </g>
  <!-- Eyes (JS sets transform: look + blink) -->
  <g class="cmp-eyes">
    <g class="cmp-eye"><circle cx="36" cy="31" r="5" fill="#141414"/><circle cx="37.9" cy="29.1" r="1.7" fill="#fff"/></g>
    <g class="cmp-eye"><circle cx="64" cy="31" r="5" fill="#141414"/><circle cx="65.9" cy="29.1" r="1.7" fill="#fff"/></g>
  </g>
  <!-- Sleeping eyes (downward arcs) -->
  <path class="cmp-eye-closed" d="M30.5 31 Q36 35.5 41.5 31" stroke="#141414" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path class="cmp-eye-closed" d="M58.5 31 Q64 35.5 69.5 31" stroke="#141414" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <!-- Happy squint eyes (upward arcs, ^^ ) -->
  <path class="cmp-eye-happy" d="M30.5 33.5 Q36 27.5 41.5 33.5" stroke="#141414" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path class="cmp-eye-happy" d="M58.5 33.5 Q64 27.5 69.5 33.5" stroke="#141414" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <!-- Nose -->
  <path d="M45.5 39.5 Q50 38 54.5 39.5 Q55.5 43.5 50 46 Q44.5 43.5 45.5 39.5 Z" fill="#141414"/>
  <!-- Philtrum + smile -->
  <g stroke="#141414" stroke-width="2.6" stroke-linecap="round" fill="none">
    <path d="M50 46 L50 50.5"/>
    <path d="M50 50.5 Q43.5 55.5 37.5 50.5"/>
    <path d="M50 50.5 Q56.5 55.5 62.5 50.5"/>
  </g>
  <!-- Tongue -->
  <path class="cmp-tongue" d="M45.8 52.5 L45.8 54.5 Q45.8 59 50 59 Q54.2 59 54.2 54.5 L54.2 52.5 Q50 55 45.8 52.5 Z" fill="#ff8fa3" stroke="#141414" stroke-width="2.2" stroke-linejoin="round"/>
  <!-- Paw pads -->
  <g fill="#141414" stroke="none">
    <ellipse cx="16.5" cy="87.5" rx="4.4" ry="3.6"/>
    <ellipse cx="9.8" cy="81.5" rx="2" ry="2.4"/>
    <ellipse cx="16.5" cy="78.8" rx="2" ry="2.4"/>
    <ellipse cx="23.2" cy="81.5" rx="2" ry="2.4"/>
    <ellipse cx="83.5" cy="87.5" rx="4.4" ry="3.6"/>
    <ellipse cx="76.8" cy="81.5" rx="2" ry="2.4"/>
    <ellipse cx="83.5" cy="78.8" rx="2" ry="2.4"/>
    <ellipse cx="90.2" cy="81.5" rx="2" ry="2.4"/>
  </g>
</svg>`;

const BALL_SVG = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="16" cy="16" r="14" fill="var(--accent-blue,#4169E1)" stroke="#141414" stroke-width="2.5"/>
  <path d="M5 11 Q16 18 27 11" stroke="#fff" stroke-width="2" fill="none" opacity="0.85"/>
  <path d="M5 21 Q16 14 27 21" stroke="#fff" stroke-width="2" fill="none" opacity="0.85"/>
</svg>`;

const TREAT_SVG = `
<svg viewBox="0 0 34 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g fill="#f0ddb6" stroke="#141414" stroke-width="2.4" stroke-linejoin="round">
    <circle cx="7.5" cy="7" r="5.2"/><circle cx="7.5" cy="17" r="5.2"/>
    <circle cx="26.5" cy="7" r="5.2"/><circle cx="26.5" cy="17" r="5.2"/>
    <rect x="7" y="8" width="20" height="8" rx="3.5"/>
  </g>
</svg>`;

interface Stats {
  happy: number;
  energy: number;
  full: number;
  ts: number;
}

interface State {
  enabled: boolean;
  reduced: boolean;
  touch: boolean;
  name: string;
  mode: Mode;
  facing: number;
  behavior: string;
  behaviorUntil: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  px: number;
  py: number;
  cursorSeen: number;
  asleep: boolean;
  excited: boolean;
  happyUntil: number;
  blinkUntil: number;
  nextBlink: number;
  nextSaccade: number;
  eyeX: number;
  eyeY: number;
  stats: Stats;
  ball: { x: number; y: number; vx: number; vy: number; flying: boolean; attached: boolean; visible: boolean; home: Pt };
  treat: { x: number; y: number; visible: boolean };
}

let booted = false;
let raf = 0;
let bubbleTimer = 0;
let inviteTimer = 0;
let playTimer = 0;

let els: {
  layer: HTMLElement;
  dog: HTMLElement;
  fx: HTMLElement;
  eyes: SVGGElement;
  bubble: HTMLElement;
  ball: HTMLElement;
  treat: HTMLElement;
  fab: HTMLElement;
  panel: HTMLElement;
  nameLabel: HTMLElement;
  mood: HTMLElement;
  bars: { happy: HTMLElement; energy: HTMLElement; full: HTMLElement };
} | null = null;

const S: State = {
  enabled: true,
  reduced: false,
  touch: false,
  name: 'Lemma',
  mode: 'idle',
  facing: 1,
  behavior: 'sit',
  behaviorUntil: 0,
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  vx: 0,
  px: 0,
  py: 0,
  cursorSeen: 0,
  asleep: false,
  excited: false,
  happyUntil: 0,
  blinkUntil: 0,
  nextBlink: 0,
  nextSaccade: 0,
  eyeX: 0,
  eyeY: 0,
  stats: { happy: 80, energy: 90, full: 72, ts: 0 },
  ball: { x: 0, y: 0, vx: 0, vy: 0, flying: false, attached: false, visible: false, home: { x: 0, y: 0 } },
  treat: { x: 0, y: 0, visible: false },
};

const now = (): number => performance.now();
const clamp = (v: number, lo: number, hi: number): number => Math.max(lo, Math.min(hi, v));
const dist = (ax: number, ay: number, bx: number, by: number): number => Math.hypot(ax - bx, ay - by);
const vw = (): number => window.innerWidth || document.documentElement.clientWidth;
const vh = (): number => window.innerHeight || document.documentElement.clientHeight;
const rand = (a: number, b: number): number => a + Math.random() * (b - a);

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, val: string): void {
  try {
    localStorage.setItem(key, val);
  } catch {
    /* ignore */
  }
}

function groundY(): number {
  return vh() - DOG - 10;
}
function dogCenter(): Pt {
  return { x: S.x + DOG / 2, y: S.y + DOG / 2 };
}
function dogPaws(): Pt {
  return { x: S.x + DOG / 2, y: S.y + DOG * 0.92 };
}

const BEHAVIOR_CLASSES = ['is-sniffing', 'is-scratching', 'is-barking', 'is-begging', 'is-looking', 'is-wagging', 'is-eating'];

function clearBehaviorClasses(): void {
  els?.dog.classList.remove(...BEHAVIOR_CLASSES);
  els?.fx.classList.remove('cmp-spin');
}

function setSleep(asleep: boolean): void {
  if (S.asleep === asleep) return;
  S.asleep = asleep;
  els?.dog.classList.toggle('is-sleeping', asleep);
  if (asleep) els?.dog.classList.remove('is-happy');
}

function setExcited(on: boolean): void {
  S.excited = on;
  els?.dog.classList.toggle('is-excited', on);
}

function bubble(text: string, ms = 1900): void {
  if (!els) return;
  els.bubble.textContent = text;
  els.bubble.classList.add('show');
  window.clearTimeout(bubbleTimer);
  bubbleTimer = window.setTimeout(() => els?.bubble.classList.remove('show'), ms);
}

function spawnHearts(n = 4, emoji?: string): void {
  if (!els || S.reduced) return;
  const c = dogCenter();
  for (let i = 0; i < n; i++) {
    const h = document.createElement('span');
    h.className = 'cmp-heart';
    h.textContent = emoji || (Math.random() < 0.25 ? '✨' : '♥');
    h.style.left = `${c.x + rand(-22, 22)}px`;
    h.style.top = `${S.y + 4}px`;
    h.style.setProperty('--drift', `${rand(-18, 18)}px`);
    h.style.animationDelay = `${i * 80}ms`;
    els.layer.appendChild(h);
    h.addEventListener('animationend', () => h.remove());
  }
}

function happy(reaction: string, dur = 1700): void {
  wake();
  S.happyUntil = now() + dur;
  els?.dog.classList.add('is-happy');
  spawnHearts();
  if (reaction) bubble(reaction, 1400);
}

function wake(): void {
  if (S.asleep) {
    setSleep(false);
    S.behavior = 'sit';
    S.behaviorUntil = now() + rand(1400, 2400);
  }
}

// ---- stats ----

function moodEmoji(): string {
  const { happy: h, energy: e, full: f } = S.stats;
  if (S.asleep) return '\u{1f634}';
  if (f < 28) return '\u{1f97a}';
  if (h > 86 && e > 40) return '\u{1f929}';
  if (e < 24) return '\u{1f62a}';
  if (h < 45) return '\u{1f614}';
  return '\u{1f642}';
}

function renderStats(): void {
  if (!els) return;
  els.bars.happy.style.width = `${S.stats.happy}%`;
  els.bars.energy.style.width = `${S.stats.energy}%`;
  els.bars.full.style.width = `${S.stats.full}%`;
  els.mood.textContent = moodEmoji();
}

function saveStats(): void {
  S.stats.ts = Date.now();
  write(K_STATS, JSON.stringify(S.stats));
}

function loadStats(): void {
  const raw = read(K_STATS);
  if (!raw) {
    S.stats.ts = Date.now();
    return;
  }
  try {
    const s = JSON.parse(raw) as Stats;
    const mins = Math.min((Date.now() - (s.ts || Date.now())) / 60000, 720);
    S.stats.full = clamp(s.full - mins * 0.5, 0, 100);
    S.stats.energy = clamp(s.energy + mins * 0.6, 0, 100);
    S.stats.happy = clamp(s.happy + (60 - s.happy) * Math.min(mins / 240, 1), 0, 100);
  } catch {
    /* keep defaults */
  }
}

function decay(): void {
  if (!S.enabled) return;
  const s = S.stats;
  s.full = clamp(s.full - 1.1, 0, 100);
  s.energy = clamp(s.energy + (S.asleep ? 2.4 : -0.5), 0, 100);
  if (s.full < 30 || s.energy < 24) s.happy = clamp(s.happy - 0.8, 0, 100);
  else s.happy = clamp(s.happy + 0.25, 0, 100);
  renderStats();
  saveStats();
}

// ---- autonomous behaviour ----

function startWalk(): void {
  S.mode = 'walk';
  S.tx = clamp(rand(20, vw() - DOG - 20), 2, vw() - DOG - 2);
  S.ty = groundY();
  clearBehaviorClasses();
}

function startBehavior(name: string, dur: number): void {
  S.mode = 'idle';
  S.behavior = name;
  S.behaviorUntil = now() + dur;
  S.tx = S.x;
  S.ty = S.y;
  clearBehaviorClasses();
  if (name === 'sniff') els?.dog.classList.add('is-sniffing');
  else if (name === 'look') {
    els?.dog.style.setProperty('--look', Math.random() < 0.5 ? '1' : '-1');
    els?.dog.classList.add('is-looking');
  } else if (name === 'scratch') els?.dog.classList.add('is-scratching');
  else if (name === 'wag') els?.dog.classList.add('is-wagging');
  else if (name === 'chomp') els?.dog.classList.add('is-eating');
  else if (name === 'bark') {
    els?.dog.classList.add('is-barking');
    bubble('woof!', 1000);
  } else if (name === 'beg') els?.dog.classList.add('is-begging');
  else if (name === 'tailchase') els?.fx.classList.add('cmp-spin');
}

function pickBehavior(): void {
  if (S.stats.energy < 22) {
    setSleep(true);
    S.mode = 'idle';
    S.behavior = 'sleep';
    S.behaviorUntil = now() + rand(8000, 15000);
    clearBehaviorClasses();
    return;
  }
  if (S.asleep) setSleep(false);

  if (S.stats.full < 28 && Math.random() < 0.55) {
    startBehavior('beg', rand(2600, 4200));
    if (Math.random() < 0.7) bubble('\u{1f9b4} feed me?', 2400);
    return;
  }

  const roll = Math.random();
  if (roll < 0.22) startWalk();
  else if (roll < 0.4) startBehavior('sit', rand(3200, 6000));
  else if (roll < 0.52) startBehavior('look', rand(2400, 3800));
  else if (roll < 0.64) startBehavior('sniff', rand(2400, 4000));
  else if (roll < 0.74) startBehavior('wag', rand(1800, 2800));
  else if (roll < 0.84) startBehavior('sit', rand(4000, 7000)); // calm doze
  else if (roll < 0.91) startBehavior('scratch', rand(1400, 2000));
  else if (roll < 0.96) startBehavior('tailchase', 1100);
  else startBehavior('bark', 1000);
}

// ---- ball / fetch ----

function placeBall(x: number, y: number): void {
  S.ball.x = clamp(x, 6, vw() - BALL - 6);
  S.ball.y = clamp(y, 6, vh() - BALL - 6);
}
function throwBall(bvx: number, bvy: number): void {
  S.ball.visible = true;
  S.ball.attached = false;
  S.ball.flying = true;
  S.ball.vx = bvx;
  S.ball.vy = bvy;
  S.ball.home = dogCenter();
  els?.ball.classList.add('show');
  S.mode = 'fetch';
  setExcited(true);
  clearBehaviorClasses();
  wake();
}
function play(): void {
  if (!S.ball.visible || !S.ball.flying) {
    const c = dogCenter();
    placeBall(c.x - BALL / 2, c.y);
  }
  wake();
  setExcited(true);
  bubble('a ball!', 1100);
  window.clearTimeout(playTimer);
  playTimer = window.setTimeout(() => throwBall((Math.random() < 0.5 ? -1 : 1) * rand(7, 11), -rand(10, 14)), 240);
}

// ---- feeding ----

function feed(): void {
  const gx = clamp(rand(60, vw() - 60), 30, vw() - 30);
  S.treat.x = gx - TREAT / 2;
  S.treat.y = vh() - TREAT - 12;
  S.treat.visible = true;
  els?.treat.classList.add('show');
  if (els) els.treat.style.transform = `translate3d(${S.treat.x}px, ${S.treat.y}px, 0)`;
  S.mode = 'eat';
  setExcited(true);
  clearBehaviorClasses();
  wake();
  bubble('a treat! \u{1f9b4}', 1300);
}

// ---- tricks ----

function trick(name: string): void {
  switch (name) {
    case 'sit':
      wake();
      startBehavior('sit', rand(3500, 5500));
      bubble('sit ✓', 1200);
      break;
    case 'roll':
      wake();
      if (S.reduced) {
        happy('wheee');
      } else {
        clearBehaviorClasses();
        els?.fx.classList.add('cmp-spin');
        S.behavior = 'tailchase';
        S.mode = 'idle';
        S.behaviorUntil = now() + 1100;
        happy('', 1100);
      }
      break;
    case 'speak':
      startBehavior('bark', 900);
      happy('woof! woof!');
      break;
    case 'come':
      wake();
      S.mode = 'come';
      S.tx = clamp((S.touch || S.cursorSeen < now() - 4000 ? vw() * 0.5 : S.px) - DOG / 2, 2, vw() - DOG - 2);
      S.ty = groundY();
      clearBehaviorClasses();
      bubble('coming!', 1100);
      break;
  }
}

function petDog(): void {
  S.stats.happy = clamp(S.stats.happy + 8, 0, 100);
  renderStats();
  saveStats();
  happy(Math.random() < 0.3 ? 'hehe' : 'woof!', 1700);
}

// ---- main loop ----

function tick(): void {
  raf = requestAnimationFrame(tick);
  if (!els || !S.enabled) return;
  const t = now();
  const b = S.ball;

  // Ball physics
  if (b.flying && !b.attached) {
    b.vy += 0.5;
    b.vx *= 0.992;
    b.x += b.vx;
    b.y += b.vy;
    const maxX = vw() - BALL - 4;
    const maxY = vh() - BALL - 4;
    if (b.x < 4) {
      b.x = 4;
      b.vx = Math.abs(b.vx) * 0.6;
    } else if (b.x > maxX) {
      b.x = maxX;
      b.vx = -Math.abs(b.vx) * 0.6;
    }
    if (b.y > maxY) {
      b.y = maxY;
      b.vy = -Math.abs(b.vy) * 0.55;
      b.vx *= 0.8;
      if (Math.abs(b.vy) < 2.2) {
        b.vy = 0;
        b.flying = false;
      }
    }
  }

  // Mode transitions / targets
  if (S.mode === 'fetch') {
    S.tx = b.x + BALL / 2 - DOG / 2;
    S.ty = groundY();
    const p = dogPaws();
    if (dist(p.x, p.y, b.x + BALL / 2, b.y + BALL / 2) < 34) {
      b.attached = true;
      b.flying = false;
      S.mode = 'return';
      els.dog.classList.add('has-ball');
    }
  } else if (S.mode === 'return') {
    S.tx = b.home.x - DOG / 2;
    S.ty = groundY();
    if (dist(S.x, S.y, S.tx, S.ty) < 6) {
      b.attached = false;
      placeBall(dogPaws().x - BALL / 2, vh() - BALL - 12);
      els.dog.classList.remove('has-ball');
      setExcited(false);
      S.stats.happy = clamp(S.stats.happy + 14, 0, 100);
      S.stats.energy = clamp(S.stats.energy - 9, 0, 100);
      renderStats();
      saveStats();
      happy('again! again!', 1600);
      startBehavior('wag', 1800);
    }
  } else if (S.mode === 'eat') {
    S.tx = S.treat.x + TREAT / 2 - DOG / 2;
    S.ty = groundY();
    const p = dogPaws();
    if (dist(p.x, p.y, S.treat.x + TREAT / 2, S.treat.y + TREAT / 2) < 38) {
      S.treat.visible = false;
      els.treat.classList.remove('show');
      setExcited(false);
      S.stats.full = clamp(S.stats.full + 34, 0, 100);
      S.stats.happy = clamp(S.stats.happy + 12, 0, 100);
      renderStats();
      saveStats();
      spawnHearts(5);
      bubble('nom nom nom!', 1800);
      startBehavior('chomp', 1100);
    }
  } else if (S.mode === 'idle') {
    if (t > S.behaviorUntil) {
      if (S.asleep && S.stats.energy < 80) S.behaviorUntil = t + 4000;
      else pickBehavior();
    }
  }

  // Constant-speed movement (no teleporting; gentle hop, excited fetch)
  S.tx = clamp(S.tx, 2, vw() - DOG - 2);
  S.ty = clamp(S.ty, 2, vh() - DOG - 2);
  const moving = S.mode !== 'idle';
  if (moving) {
    const sp =
      S.mode === 'fetch' ? SPEED.fetch : S.mode === 'return' ? SPEED.return : S.mode === 'eat' ? SPEED.eat : S.mode === 'come' ? SPEED.come : SPEED.walk;
    const dx = S.tx - S.x;
    const dy = S.ty - S.y;
    const d = Math.hypot(dx, dy) || 1;
    if (d > sp) {
      S.x += (dx / d) * sp;
      S.y += (dy / d) * sp;
    } else {
      S.x = S.tx;
      S.y = S.ty;
    }
    S.vx = (dx / d) * sp;
    if (Math.abs(dx) > 0.3) S.facing = dx > 0 ? 1 : -1;
    if (S.mode === 'walk' && d <= sp + 1) pickBehavior();
  } else {
    S.vx *= 0.85;
  }

  els.dog.classList.toggle('is-hopping', moving && !S.reduced);

  // Position + a gentle lean into the hop direction
  const lean = S.reduced ? 0 : clamp(S.vx * 2.2, -9, 9);
  els.dog.style.transform = `translate3d(${S.x}px, ${S.y}px, 0) rotate(${lean}deg)`;

  // Ball render
  if (b.attached) {
    b.x = S.x + DOG / 2 - BALL / 2;
    b.y = S.y + DOG * 0.6;
  }
  if (b.visible) els.ball.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;

  // Eyes (both move together; look toward target, blink)
  let sy = 1;
  if (S.asleep) {
    S.eyeX = 0;
    S.eyeY = 0;
  } else {
    let aimX: number | null = null;
    let aimY: number | null = null;
    const c = dogCenter();
    if (S.mode === 'fetch') {
      aimX = b.x;
      aimY = b.y;
    } else if (S.mode === 'eat') {
      aimX = S.treat.x;
      aimY = S.treat.y;
    } else if (moving) {
      aimX = S.tx + DOG / 2;
      aimY = c.y;
    } else if (S.cursorSeen > t - 2500 && dist(c.x, c.y, S.px, S.py) < 320) {
      aimX = S.px;
      aimY = S.py;
    }
    if (aimX !== null && aimY !== null) {
      const a = Math.atan2(aimY - c.y, aimX - c.x);
      S.eyeX += (clamp(Math.cos(a) * 2.6, -2.6, 2.6) - S.eyeX) * 0.18;
      S.eyeY += (clamp(Math.sin(a) * 1.8, -1.4, 2.2) - S.eyeY) * 0.18;
    } else if (t > S.nextSaccade) {
      S.eyeX = rand(-2, 2);
      S.eyeY = rand(-1, 1.4);
      S.nextSaccade = t + rand(1400, 3200);
    }
    if (t > S.nextBlink) {
      S.blinkUntil = t + 130;
      S.nextBlink = t + rand(3000, 7000);
    }
    if (t < S.blinkUntil) sy = 0.12;
  }
  els.eyes.style.transform = `translate(${S.eyeX}px, ${S.eyeY}px) scaleY(${sy})`;

  if (S.happyUntil && t > S.happyUntil && S.behavior !== 'wag') {
    S.happyUntil = 0;
    els.dog.classList.remove('is-happy');
  }
}

// ---- invitations ----

function scheduleInvite(): void {
  window.clearTimeout(inviteTimer);
  if (!S.enabled) return;
  inviteTimer = window.setTimeout(
    () => {
      if (S.enabled && !S.asleep && S.mode === 'idle') {
        if (S.stats.full < 36) bubble('\u{1f9b4} feed me?', 2600);
        else if (S.stats.happy < 48) bubble('\u{1f3be} play?', 2600);
        else if (Math.random() < 0.5) bubble(['\u{1f43e}', 'woof!', '♥', '*sniff sniff*'][Math.floor(rand(0, 4))], 2000);
      }
      scheduleInvite();
    },
    rand(13000, 21000)
  );
}

// ---- DOM ----

function buildDom(): void {
  const layer = document.createElement('div');
  layer.className = 'cmp-layer';
  layer.setAttribute('aria-hidden', 'true');

  const dog = document.createElement('div');
  dog.className = 'cmp-dog';
  dog.style.width = `${DOG}px`;
  dog.style.height = `${DOG}px`;
  dog.innerHTML =
    `<div class="cmp-zzz">z<span>z</span><span>z</span></div>` +
    `<div class="cmp-tilt"><div class="cmp-fx">${PUPPY_SVG}</div></div>` +
    `<div class="cmp-shadow"></div><div class="cmp-bubble"></div>`;

  const ball = document.createElement('div');
  ball.className = 'cmp-ball';
  ball.innerHTML = BALL_SVG;
  ball.title = 'throw me!';

  const treat = document.createElement('div');
  treat.className = 'cmp-treat';
  treat.innerHTML = TREAT_SVG;

  const fab = document.createElement('button');
  fab.className = 'cmp-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Puppy companion');
  fab.innerHTML = '\u{1f43e}';

  const panel = document.createElement('div');
  panel.className = 'cmp-panel';
  panel.innerHTML = `
    <div class="cmp-panel-head">
      <span class="cmp-name">Lemma</span>
      <span class="cmp-mood" aria-hidden="true">\u{1f642}</span>
      <span class="cmp-tagline">my page puppy</span>
    </div>
    <div class="cmp-stats">
      <div class="cmp-stat"><span>♥</span><div class="cmp-bar"><i data-bar="happy"></i></div></div>
      <div class="cmp-stat"><span>⚡</span><div class="cmp-bar"><i data-bar="energy"></i></div></div>
      <div class="cmp-stat"><span>\u{1f9b4}</span><div class="cmp-bar"><i data-bar="full"></i></div></div>
    </div>
    <div class="cmp-care">
      <button type="button" data-care="feed"><span>\u{1f9b4}</span>feed</button>
      <button type="button" data-care="play"><span>\u{1f3be}</span>play</button>
      <button type="button" data-care="pet"><span>✋</span>pet</button>
    </div>
    <div class="cmp-tricks">
      <span class="cmp-tricks-label">tricks</span>
      <button type="button" data-trick="sit">sit</button>
      <button type="button" data-trick="roll">roll</button>
      <button type="button" data-trick="speak">speak</button>
      <button type="button" data-trick="come">come</button>
    </div>
    <button type="button" class="cmp-hide">hide puppy</button>`;

  layer.append(dog, ball, treat, fab, panel);
  document.body.appendChild(layer);

  els = {
    layer,
    dog,
    fx: dog.querySelector('.cmp-fx') as HTMLElement,
    eyes: dog.querySelector('.cmp-eyes') as unknown as SVGGElement,
    bubble: dog.querySelector('.cmp-bubble') as HTMLElement,
    ball,
    treat,
    fab,
    panel,
    nameLabel: panel.querySelector('.cmp-name') as HTMLElement,
    mood: panel.querySelector('.cmp-mood') as HTMLElement,
    bars: {
      happy: panel.querySelector('[data-bar="happy"]') as HTMLElement,
      energy: panel.querySelector('[data-bar="energy"]') as HTMLElement,
      full: panel.querySelector('[data-bar="full"]') as HTMLElement,
    },
  };
}

// ---- ball drag ----
let dragging = false;
let lastBall: Pt = { x: 0, y: 0 };
let ballVel: Pt = { x: 0, y: 0 };

function onBallDown(e: PointerEvent): void {
  e.preventDefault();
  dragging = true;
  S.ball.flying = false;
  S.ball.attached = false;
  S.ball.visible = true;
  els?.ball.classList.add('show', 'grabbing');
  els?.dog.classList.remove('has-ball');
  lastBall = { x: e.clientX, y: e.clientY };
  ballVel = { x: 0, y: 0 };
  try {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  } catch {
    /* ignore */
  }
}
function onBallMove(e: PointerEvent): void {
  if (!dragging) return;
  ballVel = { x: e.clientX - lastBall.x, y: e.clientY - lastBall.y };
  lastBall = { x: e.clientX, y: e.clientY };
  placeBall(e.clientX - BALL / 2, e.clientY - BALL / 2);
}
function onBallUp(): void {
  if (!dragging) return;
  dragging = false;
  els?.ball.classList.remove('grabbing');
  const speed = Math.hypot(ballVel.x, ballVel.y);
  if (speed < 4) throwBall((Math.random() < 0.5 ? -1 : 1) * 7, -11);
  else throwBall(clamp(ballVel.x * 1.4, -20, 20), clamp(ballVel.y * 1.4, -22, 6));
}

// ---- enable / panel ----

function togglePanel(force?: boolean): void {
  if (!els) return;
  const open = force ?? !els.panel.classList.contains('open');
  els.panel.classList.toggle('open', open);
  els.fab.classList.toggle('active', open);
}

function setEnabled(on: boolean): void {
  S.enabled = on;
  write(K_ENABLED, on ? '1' : '0');
  if (!els) return;
  els.dog.style.display = on ? '' : 'none';
  els.ball.style.display = on ? '' : 'none';
  els.treat.style.display = on ? '' : 'none';
  els.panel.classList.remove('open');
  els.fab.classList.toggle('active', false);
  els.fab.classList.toggle('is-off', !on);
  els.fab.innerHTML = on ? '\u{1f43e}' : '\u{1f436}';
  els.fab.title = on ? 'Lemma · open' : 'Bring Lemma back';
  if (on) scheduleInvite();
  else window.clearTimeout(inviteTimer);
}

function wireEvents(): void {
  if (!els) return;

  window.addEventListener(
    'pointermove',
    (e) => {
      if ((e as PointerEvent).pointerType === 'touch') return;
      S.px = e.clientX;
      S.py = e.clientY;
      S.cursorSeen = now();
    },
    { passive: true }
  );

  els.dog.addEventListener('pointerdown', () => petDog());

  els.ball.addEventListener('pointerdown', onBallDown);
  window.addEventListener('pointermove', onBallMove, { passive: true });
  window.addEventListener('pointerup', onBallUp);

  els.fab.addEventListener('click', () => {
    if (!S.enabled) {
      setEnabled(true);
      return;
    }
    togglePanel();
  });

  els.panel.querySelectorAll<HTMLButtonElement>('[data-care]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.care;
      if (k === 'feed') feed();
      else if (k === 'play') play();
      else if (k === 'pet') petDog();
    });
  });
  els.panel.querySelectorAll<HTMLButtonElement>('[data-trick]').forEach((btn) => {
    btn.addEventListener('click', () => trick(btn.dataset.trick || ''));
  });
  (els.panel.querySelector('.cmp-hide') as HTMLElement).addEventListener('click', () => {
    bubble('bye! \u{1f43e}', 1000);
    window.setTimeout(() => setEnabled(false), 700);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
      saveStats();
    } else if (!raf && S.enabled) {
      raf = requestAnimationFrame(tick);
    }
  });
  window.addEventListener('beforeunload', saveStats);
  window.addEventListener('resize', () => {
    S.x = clamp(S.x, 2, vw() - DOG - 2);
    S.y = groundY();
    S.ty = S.y;
  });
}

// ---- terminal command bridge (home-page link terminal) ----

function statBar(v: number): string {
  const f = clamp(Math.round(v / 10), 0, 10);
  return '[' + '█'.repeat(f) + '░'.repeat(10 - f) + '] ' + Math.round(v) + '%';
}

function ensureOn(): void {
  if (!S.enabled) setEnabled(true);
}

/**
 * Run a Lemma command typed into the home-page terminal. Triggers the puppy and
 * returns the lines to print, or null if it isn't a dog command (so the shell
 * can fall through to its own handling).
 */
export function dogCommand(raw: string): string[] | null {
  const parts = raw.trim().split(/\s+/);
  const head = (parts[0] || '').toLowerCase();
  const arg = parts.slice(1).join(' ');
  const nm = S.name;

  switch (head) {
    case 'dog':
    case 'lemma':
    case 'pup':
    case 'puppy':
      return [
        `${nm.toLowerCase()} · your page puppy \u{1f43e}`,
        '  pet · feed · play · sit · roll · speak · come',
        '  sleep · wake · stats · name <x> · hide',
      ];
    case 'pet':
    case 'pat':
      ensureOn();
      petDog();
      return [`${nm} leans into your hand ♥`];
    case 'feed':
    case 'treat':
      ensureOn();
      feed();
      return [`*tosses a treat* — ${nm} scrambles over \u{1f9b4}`];
    case 'play':
    case 'ball':
    case 'fetch':
      ensureOn();
      play();
      return ['*throws the ball* — fetch!! \u{1f3be}'];
    case 'sit':
      ensureOn();
      trick('sit');
      return [`${nm} sits. good girl ✓`];
    case 'roll':
    case 'rollover':
      ensureOn();
      trick('roll');
      return [`${nm} rolls over \u{1f300}`];
    case 'speak':
    case 'bark':
    case 'woof':
      ensureOn();
      trick('speak');
      return ['woof! woof! \u{1f415}'];
    case 'come':
    case 'here':
      ensureOn();
      trick('come');
      return [`${nm} bounds over to you \u{1f43e}`];
    case 'sleep':
    case 'nap':
      ensureOn();
      setSleep(true);
      S.mode = 'idle';
      S.behavior = 'sleep';
      S.behaviorUntil = now() + rand(9000, 16000);
      clearBehaviorClasses();
      bubble('\u{1f4a4}', 2000);
      return [`shhh… ${nm} curls up \u{1f4a4}`];
    case 'wake':
    case 'wakeup':
      ensureOn();
      wake();
      return [`${nm} blinks awake and stretches`];
    case 'stats':
    case 'status':
    case 'mood':
      return [
        `♥ happy  ${statBar(S.stats.happy)}`,
        `⚡ energy ${statBar(S.stats.energy)}`,
        `\u{1f9b4} full   ${statBar(S.stats.full)}`,
      ];
    case 'name':
    case 'rename': {
      if (!arg) return ['usage: name <new name> · e.g. name Pixel'];
      const clean = arg.replace(/[<>]/g, '').slice(0, 18).trim();
      if (!clean) return ['that name won’t do — try another'];
      const pretty = clean.charAt(0).toUpperCase() + clean.slice(1);
      S.name = pretty;
      write(K_NAME, pretty);
      if (els) els.nameLabel.textContent = pretty;
      ensureOn();
      happy('♥', 1500);
      return [`renamed — say hi to ${pretty} ♥`];
    }
    case 'hide':
    case 'bye':
      bubble('bye! \u{1f43e}', 1000);
      window.setTimeout(() => setEnabled(false), 600);
      return [`${nm} trots off-screen \u{1f43e} (type 'dog' to call her back)`];
    case 'show':
    case 'comeback':
      ensureOn();
      return [`${nm} is here \u{1f43e}`];
    default:
      return null;
  }
}

export function initCompanion(): void {
  if (booted) return;
  booted = true;

  S.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  S.touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  DOG = vw() < 560 ? 66 : 84;
  S.enabled = read(K_ENABLED) !== '0';
  const savedName = read(K_NAME);
  if (savedName) S.name = savedName;
  loadStats();

  buildDom();
  if (els && savedName) els.nameLabel.textContent = savedName;
  renderStats();

  S.x = vw() * 0.62;
  S.y = groundY();
  S.tx = S.x;
  S.ty = S.y;
  S.px = S.x;
  S.py = S.y;
  S.nextBlink = now() + 1800;
  S.behavior = 'sit';
  S.behaviorUntil = now() + rand(1600, 2800);

  wireEvents();
  setEnabled(S.enabled);

  if (read(K_GREET) !== '1') {
    window.setTimeout(() => {
      if (S.enabled) bubble(S.touch ? 'tap me! \u{1f43e}' : 'feed me · play with me \u{1f43e}', 4600);
      write(K_GREET, '1');
    }, 1700);
  }

  window.setInterval(decay, 4000);
  scheduleInvite();
  raf = requestAnimationFrame(tick);
}

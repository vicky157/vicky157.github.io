/**
 * Footer terminal: a small shell session styled in the site's own theme
 * (card background, theme accent, mono type). Cycles through real commands
 * spanning the research portfolio: Lean / SMT / Coq verification, causal
 * inference, OOD guardrails, uncertainty, test-time adaptation, anomaly
 * detection, systems. Keeps a short scrolling history like a live session.
 * Respects prefers-reduced-motion.
 */

interface TermEntry {
  dir: string;
  cmd: string;
  result: string;
}

const ENTRIES: TermEntry[] = [
  { dir: '~', cmd: 'ls papers/', result: '→ acl2026 iclr2026 icml2026 neurips2025 hipc2025 ✓' },
  { dir: '~/lean', cmd: 'lake env lean Verge/TrustIsProof.lean', result: '→ 0 errors · 0 sorries ✓' },
  { dir: '~/smt', cmd: 'z3 -smt2 -T:30 entailment_audit.smt2', result: '→ sat (0.04s) ✓' },
  { dir: '~/papers', cmd: 'grep -ri "unsupported claim" camera_ready/ | wc -l', result: '→ 0 ✓' },
  { dir: '~/coq', cmd: 'coqc -Q . Audit no_hallucination.v', result: '→ Closed under the global context ✓' },
  { dir: '~/causal', cmd: 'python ate.py --dag-prior llm --graphs 128 --alpha 0.1', result: '→ coverage 0.914 ✓' },
  { dir: '~/models', cmd: 'du -sh checkpoints/', result: '→ 1.3T · time to prune ✓' },
  { dir: '~/ood', cmd: 'python -m t3.guard --ckpt vmf.pt < prompts.jsonl', result: '→ OOD blocked · FPR ↓40x ✓' },
  { dir: '~/uncertainty', cmd: 'python pcfg_uq.py --grammar smtlib.bnf --signal entropy', result: '→ AUROC 0.93 ✓' },
  { dir: '~/hpc', cmd: 'squeue -u vikash -h | wc -l', result: '→ 128 jobs running ✓' },
  { dir: '~/safety', cmd: 'verge refine --solver z3 --mcs --consensus 3', result: '→ +18.7% @ convergence ✓' },
  { dir: '~/ctta', cmd: 'python adapt.py --method rmemsafe --stream cifar10c', result: '→ harm slope 1.13x shallower ✓' },
  { dir: '~/verge', cmd: 'git commit -m "proofs, not vibes" && git push', result: '→ main a1b2c3f ✓' },
  { dir: '~/anomaly', cmd: './k4 --knn 16 --online < slurm.log', result: '→ AUROC 0.999 · 4 µs/line ✓' },
  { dir: '~/systems', cmd: 'python predict.py --tp 4 --pp 8 --dp 4 --gpus 128', result: '→ MAPE 4.98% ✓' },
  { dir: '~/training', cmd: 'tail -n1 run42/train.log', result: '→ epoch 42/42 · val loss 0.017 ✓' },
  { dir: '~/reasoning', cmd: 'vllm serve qwen3-8b --midthink --trigger "Okay"', result: '→ AIME 69.8 → 72.4 ✓' },
  { dir: '~/llm', cmd: 'rm -rf hallucinations/', result: '→ removed · nothing of value was lost ✓' },
];

const MAX_LINES = 3;      // visible history depth
const TYPE_MS = 38;       // per character
const RESULT_DELAY = 420; // pause before the result lands
const HOLD_MS = 2200;     // pause before the next prompt appears

let timer: ReturnType<typeof setTimeout> | null = null;

function colorize(text: string): string {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/✓/g, '<span class="t-ok">✓</span>')
    .replace(/→/g, '<span class="t-arrow">→</span>');
}

function buildLine(dir: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 't-line';
  el.innerHTML =
    `<span class="terminal-path">${dir}</span> ` +
    '<span class="terminal-prompt">$</span> ' +
    '<span class="t-cmd"></span><span class="t-result"></span>';
  return el;
}

export function initFooterTerminal(): void {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  if (timer) { clearTimeout(timer); timer = null; }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    ENTRIES.slice(0, MAX_LINES).forEach((entry) => {
      const line = buildLine(entry.dir);
      (line.querySelector('.t-cmd') as HTMLElement).textContent = entry.cmd;
      (line.querySelector('.t-result') as HTMLElement).innerHTML = ' ' + colorize(entry.result);
      body.appendChild(line);
    });
    return;
  }

  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';

  let index = 0;

  const playEntry = (): void => {
    const entry = ENTRIES[index];
    index = (index + 1) % ENTRIES.length;

    const line = buildLine(entry.dir);
    body.appendChild(line);
    while (body.children.length > MAX_LINES) {
      body.removeChild(body.firstChild as Node);
    }

    const cmdEl = line.querySelector('.t-cmd') as HTMLElement;
    const resultEl = line.querySelector('.t-result') as HTMLElement;
    cmdEl.after(cursor);

    let i = 0;
    const typeChar = (): void => {
      i++;
      cmdEl.textContent = entry.cmd.slice(0, i);
      if (i < entry.cmd.length) {
        timer = setTimeout(typeChar, TYPE_MS + Math.random() * 40);
      } else {
        timer = setTimeout(() => {
          resultEl.innerHTML = ' ' + colorize(entry.result);
          resultEl.after(cursor);
          timer = setTimeout(playEntry, HOLD_MS);
        }, RESULT_DELAY);
      }
    };
    typeChar();
  };

  playEntry();
}

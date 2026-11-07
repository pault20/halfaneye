// Fig. 4.9: plays on press only; step buttons and arrow keys move one stage;
// reduced motion jumps between stages and starts on stage 8.
import { STAGES, READOUT, STEPS, TRANSITION_TEXT, mix, draw } from './eye-model.mjs';

const MORPH_MS = 1500;
const PAUSE_MS = 500;
const fmt = (n: number) => n.toLocaleString('en-GB');

for (const root of document.querySelectorAll<HTMLElement>('[data-eye-model]')) {
  const svg = root.querySelector<SVGGElement>('[data-shape]')!;
  const stageOut = root.querySelector<HTMLElement>('[data-stage]')!;
  const dOut = root.querySelector<HTMLElement>('[data-d]')!;
  const fOut = root.querySelector<HTMLElement>('[data-f]')!;
  const stepsOut = root.querySelector<HTMLElement>('[data-steps]')!;
  const noteOut = root.querySelector<HTMLElement>('[data-note]')!;
  const play = root.querySelector<HTMLButtonElement>('[data-play]')!;
  const back = root.querySelector<HTMLButtonElement>('[data-back]')!;
  const fwd = root.querySelector<HTMLButtonElement>('[data-fwd]')!;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let stage = reduce.matches ? 7 : 0; // 0-based
  let raf = 0;
  let playing = false;

  function readout(i: number, via: number | null) {
    stageOut.textContent = `Stage ${i + 1} of 8`;
    dOut.textContent = READOUT[i].d;
    fOut.textContent = READOUT[i].f ?? '—';
    if (i === 7) {
      stepsOut.textContent = `${fmt(STEPS.reduce((a, b) => a + b, 0))} in all`;
    } else if (via != null) {
      stepsOut.textContent = `${fmt(STEPS[via])} from stage ${via + 1}`;
    } else {
      stepsOut.textContent = i === 0 ? '—' : `${fmt(STEPS[i - 1])} from stage ${i}`;
    }
    back.disabled = i === 0;
    fwd.disabled = i === 7;
  }

  function show(i: number) {
    svg.innerHTML = draw(STAGES[i]);
    readout(i, null);
    noteOut.textContent = '';
  }

  function stop() {
    cancelAnimationFrame(raf);
    playing = false;
    play.textContent = stage === 7 ? 'Play again' : 'Play';
    play.setAttribute('aria-pressed', 'false');
  }

  // Animate from stage `from` to `from + 1`; resolve when done.
  function morph(from: number): Promise<void> {
    return new Promise((done) => {
      const t0 = performance.now();
      noteOut.textContent = TRANSITION_TEXT[from];
      readout(from, null);
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / MORPH_MS);
        const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; // ease in-out
        svg.innerHTML = draw(mix(STAGES[from], STAGES[from + 1], e));
        if (t < 1) raf = requestAnimationFrame(tick);
        else {
          stage = from + 1;
          readout(stage, from);
          done();
        }
      };
      raf = requestAnimationFrame(tick);
    });
  }

  async function run() {
    if (stage === 7) show((stage = 0));
    playing = true;
    play.textContent = 'Pause';
    play.setAttribute('aria-pressed', 'true');
    await new Promise((r) => setTimeout(r, PAUSE_MS));
    while (playing && stage < 7) {
      await morph(stage);
      if (playing && stage < 7) await new Promise((r) => setTimeout(r, PAUSE_MS));
    }
    stop();
  }

  function step(dir: 1 | -1) {
    stop();
    const next = Math.max(0, Math.min(7, stage + dir));
    if (next === stage) return;
    if (dir === 1 && !reduce.matches) {
      void morph(stage).then(() => stop());
    } else {
      stage = next;
      show(stage);
      if (dir === 1) noteOut.textContent = TRANSITION_TEXT[stage - 1];
    }
  }

  play.addEventListener('click', () => (playing ? stop() : void run()));
  back.addEventListener('click', () => step(-1));
  fwd.addEventListener('click', () => step(1));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });
  reduce.addEventListener('change', () => { stop(); if (reduce.matches) show((stage = 7)); });

  root.classList.add('is-ready');
  show(stage);
  stop();
}

// Filters the Atlas grid by eye type and by animal group (both apply together).
// Without this script every card shows. State is kept in the URL hash,
// e.g. #type=lens&group=Mollusca; the older #lens form still works.
const grid = document.querySelector<HTMLElement>('[data-grid]');
const count = document.querySelector<HTMLElement>('[data-count]');
const bars = [...document.querySelectorAll<HTMLElement>('[data-filters]')];
if (grid && bars.length) {
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-eye-class]')];
  const state: Record<string, string> = { type: 'all', group: 'all' };
  const matches = (c: HTMLElement) =>
    (state.type === 'all' || c.dataset.eyeClass === state.type) &&
    (state.group === 'all' || c.dataset.group === state.group);

  const apply = () => {
    let shown = 0;
    for (const c of cards) {
      const on = matches(c);
      c.hidden = !on;
      if (on) shown++;
    }
    for (const bar of bars) {
      const key = bar.dataset.filters ?? 'type';
      for (const b of bar.querySelectorAll<HTMLButtonElement>('button')) {
        b.setAttribute('aria-pressed', String(b.dataset.filter === state[key]));
      }
    }
    const all = state.type === 'all' && state.group === 'all';
    if (count) {
      count.hidden = all;
      count.textContent = all ? '' : shown ? `Showing ${shown} of ${cards.length} entries` : 'No published entries match both filters yet';
    }
    const params = new URLSearchParams();
    if (state.type !== 'all') params.set('type', state.type);
    if (state.group !== 'all') params.set('group', state.group);
    const hash = params.toString();
    history.replaceState(null, '', hash ? `#${hash}` : location.pathname);
  };

  for (const bar of bars) {
    const key = bar.dataset.filters ?? 'type';
    bar.hidden = false;
    for (const b of bar.querySelectorAll<HTMLButtonElement>('button')) {
      b.addEventListener('click', () => {
        state[key] = b.dataset.filter ?? 'all';
        apply();
      });
    }
  }

  const raw = decodeURIComponent(location.hash.slice(1));
  if (raw) {
    if (raw.includes('=')) {
      const p = new URLSearchParams(raw);
      state.type = p.get('type') ?? 'all';
      state.group = p.get('group') ?? 'all';
    } else {
      state.type = raw;
    }
    apply();
  }
}
export {};

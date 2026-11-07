// Filters the Atlas grid by eye type. Without this script every card shows.
const bar = document.querySelector<HTMLElement>('[data-filters]');
const grid = document.querySelector<HTMLElement>('[data-grid]');
const count = document.querySelector<HTMLElement>('[data-count]');
if (bar && grid) {
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-eye-class]')];
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('button')];
  const apply = (id: string) => {
    let shown = 0;
    for (const c of cards) {
      const on = id === 'all' || c.dataset.eyeClass === id;
      c.hidden = !on;
      if (on) shown++;
    }
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.filter === id));
    if (count) {
      count.hidden = id === 'all';
      count.textContent = id === 'all' ? '' : `Showing ${shown} of ${cards.length} entries`;
    }
    history.replaceState(null, '', id === 'all' ? location.pathname : `#${id}`);
  };
  bar.hidden = false;
  for (const b of buttons) b.addEventListener('click', () => apply(b.dataset.filter ?? 'all'));
  const start = location.hash.slice(1);
  if (buttons.some((b) => b.dataset.filter === start)) apply(start);
}
export {};

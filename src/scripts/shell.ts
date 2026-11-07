// Small enhancements. Every page works without this script.
const root = document.documentElement;

// Reading progress
const fill = document.querySelector<HTMLElement>('[data-progress]');
if (fill) {
  let queued = false;
  const update = () => {
    queued = false;
    const max = root.scrollHeight - window.innerHeight;
    fill.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  update();
}

// Contents panel (phones)
const toggle = document.querySelector<HTMLButtonElement>('[data-toc-toggle]');
const panel = document.getElementById('toc-panel');
const backdrop = document.querySelector<HTMLElement>('[data-toc-backdrop]');
if (toggle && panel) {
  const setOpen = (open: boolean) => {
    root.classList.toggle('toc-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close contents' : 'Open contents');
    if (open) panel.querySelector<HTMLElement>('a')?.focus();
    else if (root.contains(document.activeElement) && panel.contains(document.activeElement)) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(!root.classList.contains('toc-open')));
  backdrop?.addEventListener('click', () => setOpen(false));
  panel.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('toc-open')) setOpen(false); });
}

// Current section in the contents panel
const links = [...document.querySelectorAll<HTMLAnchorElement>('.eb-toc__sections a')];
if (links.length && 'IntersectionObserver' in window) {
  const byId = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const seen = new Set<string>();
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id));
    const first = [...byId.keys()].find((id) => seen.has(id));
    if (first) links.forEach((a) => (a === byId.get(first) ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')));
  }, { rootMargin: '-60px 0px -60% 0px' });
  byId.forEach((_, id) => { const h = document.getElementById(id); if (h) io.observe(h); });
}

// Sidenotes as a tap-open popover below 720px
const phone = matchMedia('(max-width: 719px)');
let pop: HTMLElement | null = null;
let noteOpener: HTMLElement | null = null;
const closePop = () => { if (!pop) return; pop.remove(); pop = null; noteOpener?.focus(); noteOpener = null; };
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const cite = target.closest<HTMLAnchorElement>('a.eb-cite');
  if (cite && phone.matches) {
    e.preventDefault();
    const note = document.getElementById(cite.hash.slice(1));
    if (!note) return;
    const same = noteOpener === cite;
    closePop();
    if (same) return;
    noteOpener = cite;
    pop = document.createElement('div');
    pop.className = 'note-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-label', cite.getAttribute('aria-label') ?? 'Note');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'note-pop__close';
    close.setAttribute('aria-label', 'Close note');
    close.textContent = '×';
    close.addEventListener('click', closePop);
    const copy = note.cloneNode(true) as HTMLElement;
    copy.removeAttribute('id');
    pop.append(close, copy);
    document.body.append(pop);
    close.focus();
    return;
  }
  if (pop && !target.closest('.note-pop')) closePop();
});
addEventListener('keydown', (e) => { if (e.key === 'Escape') closePop(); });
phone.addEventListener('change', closePop);
export {};

// Pagefind search. The index is built after `astro build` (see package.json),
// so it does not exist under `astro dev`.
const form = document.querySelector<HTMLFormElement>('[data-search-form]');
const status = document.querySelector<HTMLElement>('[data-search-status]');
const list = document.querySelector<HTMLElement>('[data-search-results]');

interface PagefindResult { data(): Promise<{ url: string; excerpt: string; meta: { title?: string } }> }
interface Pagefind { search(q: string): Promise<{ results: PagefindResult[] }> }

async function start() {
  if (!form || !status || !list) return;
  let pf: Pagefind;
  try {
    const url = '/pagefind/pagefind.js';
    pf = (await import(/* @vite-ignore */ url)) as Pagefind;
  } catch {
    status.textContent = 'Search is only available on the built site.';
    return;
  }
  form.hidden = false;
  const input = form.elements.namedItem('q') as HTMLInputElement;
  let timer: number | undefined;
  let seq = 0;
  const run = async () => {
    const q = input.value.trim();
    const mine = ++seq;
    list.replaceChildren();
    if (q.length < 2) { status.textContent = ''; return; }
    const res = await pf.search(q);
    if (mine !== seq) return;
    const hits = await Promise.all(res.results.slice(0, 20).map((r) => r.data()));
    if (mine !== seq) return;
    status.textContent = res.results.length === 0 ? `No results for “${q}”.` : `${res.results.length} ${res.results.length === 1 ? 'result' : 'results'}`;
    for (const h of hits) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = h.url;
      a.textContent = h.meta.title ?? h.url;
      const p = document.createElement('p');
      p.innerHTML = h.excerpt; // Pagefind returns escaped text with <mark> around matches
      li.append(a, p);
      list.append(li);
    }
  };
  input.addEventListener('input', () => { clearTimeout(timer); timer = window.setTimeout(run, 150); });
  form.addEventListener('submit', (e) => { e.preventDefault(); run(); });
  const q = new URLSearchParams(location.search).get('q');
  if (q) { input.value = q; run(); }
  input.focus();
}
start();
export {};

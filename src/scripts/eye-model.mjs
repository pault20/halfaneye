// Geometry for Fig. 4.9: the eight stages of Nilsson & Pelger's (1994) model eye
// (their Fig. 2, p.55). Shared by the browser animation (figure-animation.ts) and
// scripts/build-fig-4-9.mjs, which writes the no-JavaScript fallback (stage 8).
//
// The drawing is a cross-section with light arriving from the top. The retina is
// an arc of a circle whose lowest point stays fixed; each stage sets the arc's
// radius (curvature) and half-angle (how far the cup closes). Flat bands only:
// no gradients, per the design system's Imagery rules.

export const VIEW = { w: 360, h: 340 };
const X0 = 180; // centre line
const BOTTOM = 290; // lowest point of the retina, fixed across stages

// Shape parameters per stage. R = retina radius, theta = half-angle of the cup,
// band = protective layer still visible as a band (1) or merged into a vitreous body (0),
// lens = lens strength (0 none … 1 full), lrx/lry = lens radii, iris = iris length,
// lc = lens position from the aperture (0) to the centre of the chamber (1),
// focus = distance of the ray focus below the retina's lowest point (px; 0 = on the retina).
export const STAGES = [
  { R: 60000, theta: 0.0017, band: 1, vit: 0, lens: 0, lrx: 0, lry: 0, iris: 0, lc: 0, focus: null },
  { R: 190, theta: 0.6, band: 1, vit: 0.3, lens: 0, lrx: 0, lry: 0, iris: 0, lc: 0, focus: null },
  { R: 84, theta: Math.PI / 2, band: 0, vit: 1, lens: 0, lrx: 0, lry: 0, iris: 0, lc: 0, focus: null },
  { R: 84, theta: 2.15, band: 0, vit: 1, lens: 0, lrx: 0, lry: 0, iris: 0, lc: 0, focus: null },
  { R: 84, theta: 2.7, band: 0, vit: 1, lens: 0, lrx: 0, lry: 0, iris: 0, lc: 0, focus: null },
  { R: 84, theta: 2.7, band: 0, vit: 1, lens: 0.45, lrx: 30, lry: 12, iris: 0, lc: 0, focus: 42 },
  { R: 84, theta: 2.7, band: 0, vit: 1, lens: 0.75, lrx: 27, lry: 20, iris: 10, lc: 0.5, focus: 20 },
  { R: 84, theta: 2.7, band: 0, vit: 1, lens: 1, lrx: 25, lry: 25, iris: 14, lc: 1, focus: 0 },
];

// Readout values from the paper (C57–C60 in the dossier) and the draft's §4.8.
export const READOUT = [
  { d: '1', f: null },
  { d: '1.23', f: null },
  { d: '1.95', f: null },
  { d: '2.83', f: null },
  { d: '4.56', f: null },
  { d: '4.56', f: '3P' },
  { d: '4.73', f: '2P' },
  { d: '4.1', f: 'P' },
];
// Steps of 1% for the transition into stage i+1 (index 0 = 1→2).
export const STEPS = [176, 362, 270, 225, 192, 308, 296];
export const TRANSITION_TEXT = [
  'The patch folds inwards.',
  'The cup deepens; the vitreous body has no real optical effect.',
  'Now the opening narrows.',
  '',
  'A weak lens appears in the aperture.',
  'The lens strengthens; an iris forms.',
  'Focused: lens centre index 1.52.',
];

const lerp = (a, b, t) => a + (b - a) * t;
// Curvature, not radius, is interpolated so the flat patch bends smoothly.
export function mix(a, b, t) {
  const k = lerp(1 / a.R, 1 / b.R, t);
  const out = { R: 1 / k };
  for (const key of ['band', 'vit', 'lens', 'lrx', 'lry', 'iris', 'lc']) out[key] = lerp(a[key], b[key], t);
  // Half-angle follows from interpolated arc length and curvature, so the patch bends smoothly.
  const len = lerp(a.R * a.theta, b.R * b.theta, t);
  out.theta = Math.min(2.9, len * k);
  out.focus = a.focus == null && b.focus == null ? null : lerp(a.focus ?? 42, b.focus ?? 42, t);
  return out;
}

const f = (n) => Math.round(n * 10) / 10;
function arc(R, theta, offset, n = 48) {
  const cy = BOTTOM - R;
  const r = R + offset;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const p = -theta + (2 * theta * i) / n;
    pts.push([X0 + r * Math.sin(p), cy + r * Math.cos(p)]);
  }
  return pts;
}
const line = (pts) => 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L');

/** SVG markup (inner content) for a shape state. */
export function draw(s) {
  const { R, theta } = s;
  const cy = BOTTOM - R;
  const rimY = cy + R * Math.cos(theta);
  const rimX = R * Math.sin(theta);
  const parts = [];

  // Vitreous body (protective layer filling the cup), closed across the aperture.
  if (s.vit > 0.01) {
    const inner = arc(R, theta, -3);
    parts.push(`<path d="${line(inner)} Z" fill="var(--raised)" fill-opacity="${f(s.vit)}" stroke="var(--ink)" stroke-width="1" stroke-opacity="${f(s.vit)}"/>`);
  }
  // Protective layer as a band over the receptors (stages 1–2).
  if (s.band > 0.01) {
    const a = arc(R, theta, -4);
    const b = arc(R, theta, -18).reverse();
    parts.push(`<path d="${line(a)} L${line(b).slice(1)} Z" fill="var(--raised)" stroke="var(--ink)" stroke-width="1" opacity="${f(s.band)}"/>`);
  }
  // Pigment layer (ink) behind the receptors, then the receptor layer (part colour).
  parts.push(`<path d="${line(arc(R, theta, 6))}" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>`);
  parts.push(`<path d="${line(arc(R, theta, 0))}" fill="none" stroke="var(--part-2)" stroke-width="6" stroke-linecap="round"/>`);

  // Iris: the old rim turned inwards across the aperture.
  if (s.iris > 0.5) {
    parts.push(`<path d="M${f(X0 - rimX)} ${f(rimY)} L${f(X0 - rimX + s.iris)} ${f(rimY)} M${f(X0 + rimX)} ${f(rimY)} L${f(X0 + rimX - s.iris)} ${f(rimY)}" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>`);
  }

  // Lens: four concentric flat bands, densest at the centre.
  if (s.lens > 0.01) {
    const ly = lerp(rimY + s.lry * 0.6, cy, s.lc);
    for (const k of [1, 0.75, 0.5, 0.25]) {
      parts.push(`<ellipse cx="${X0}" cy="${f(ly)}" rx="${f(s.lrx * k)}" ry="${f(s.lry * k)}" fill="var(--part-2)" fill-opacity="${f(0.16 * s.lens * 100) / 100}"/>`);
    }
    parts.push(`<ellipse cx="${X0}" cy="${f(ly)}" rx="${f(s.lrx)}" ry="${f(s.lry)}" fill="none" stroke="var(--part-2)" stroke-width="1.5" opacity="${f(Math.min(1, s.lens * 1.5))}"/>`);
    // Three parallel rays, bent at the lens towards their focus.
    if (s.focus != null) {
      const fy = BOTTOM + s.focus;
      const op = f(Math.min(1, s.lens * 1.4));
      for (const dx of [-14, 0, 14]) {
        parts.push(`<path d="M${X0 + dx} 8 L${X0 + dx} ${f(ly)} L${X0} ${f(fy)}" fill="none" stroke="var(--ink)" stroke-width="0.9" opacity="${op}"/>`);
      }
    }
  } else {
    // Light arriving from above.
    for (const dx of [-14, 0, 14]) parts.push(`<path d="M${X0 + dx} 8 L${X0 + dx} 40" stroke="var(--ink)" stroke-width="0.9"/>`);
    parts.push(`<text x="${X0 + 24}" y="24" class="t">Light</text>`);
  }
  return parts.join('');
}

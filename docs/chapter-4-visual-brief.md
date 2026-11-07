# Visual brief — Chapter 4: Step by step: eyespot, cup, pinhole, lens

Prepared: 2026-11-07 · Updated: 2026-11-07 (figures renumbered in reading order; photo checks done) · Status: for Paul's check
Draft: `drafts/chapter-4-draft.md` · Dossier: `dossiers/chapter-4-dossier.md` + addendum (both approved)

| Fig | Type | Shows | Section | Source / after | Status |
|---|---|---|---|---|---|
| 4.1 | Diagram | Four simple eyes: single-cell ocellus, two-cell eyespot, planarian cup, box jellyfish lens eye | 4.2 | After Land & Nilsson 2012, fig. 1.4, p.12 | drawn, signed off (`figures/chapter-4/fig-4-1.svg`) |
| 4.2 | Photo | *Platynereis* larvae, larval eyes labelled | 4.3 | Fischer et al. 2010, *Front Zool* 7:31, fig. 8, CC BY 2.0 | logged |
| 4.3 | Photo | Planarian *Dugesia subtentaculata* with two eyes | 4.4 | Commons, Eduard Solà, CC BY-SA 3.0 | logged |
| 4.4 | Photo | Common limpet, underside | 4.4 | Commons, Dimitri Brosens, CC0 | logged |
| 4.5 | Photo | *Nautilus pompilius* with pinhole pupil | 4.5 | Commons, Hans Hillewaert, CC BY-SA 4.0 | logged |
| 4.6 | Photo | *Tridacna maxima* mantle | 4.5 | Commons, Lim et al., CC BY-SA 4.0 | logged |
| 4.7 | Diagram | Mollusc series: *Patella*, *Haliotis*, *Nautilus* / *Helix*, *Littorina* | 4.5 | After Land & Nilsson 2012, fig. 4.1, p.73 | drawn (`figures/chapter-4/fig-4-7.svg`) |
| 4.8 | Photo | *Tripedalia cystophora* rhopalium, labelled eyes | 4.6 | Commons crop of Bielecki et al. 2014, *PLoS ONE*, fig. 1B, CC BY-SA 4.0 | logged |
| 4.9 | Animation | Nilsson & Pelger's eight model stages | 4.8 | Storyboard below; after Nilsson & Pelger 1994, fig. 2, p.55 | storyboard |
| 4.10 | Chart (bar) | Generations per transition | 4.9 | Draft editor's notes (C56), our arithmetic | drawn (`figures/chapter-4/fig-4-10.svg`) |
| 4.11 | Chart (log) | Image points against running 1% steps, stages 1–7 | 4.9 | Draft editor's notes (C61); read from Nilsson & Pelger 1994, fig. 3, p.56 | drawn (`figures/chapter-4/fig-4-11.svg`) |

Old to new numbers (for anyone holding the first version): 4.1→4.1, 4.2→4.7, 4.3→4.9, 4.4→4.10, 4.5→4.11, 4.6→4.2, 4.7→4.3, 4.8→4.4, 4.9→4.5, 4.10→4.6, 4.11→4.8.

House style for all drawings: SVG, `ink` for structure, part-2 colour for the light-sensitive layer, labels in IBM Plex Sans Condensed 13px sentence case with thin straight leaders, no gradients, no drop shadows (design system README, Imagery). Chart bars in `muted`; part colours stay reserved for light-sensitive layers. Credit line: "Drawing: Half an Eye, CC BY 4.0. After …".

Photo files: build pulls each original from its `source_url` below. (An earlier chat downloaded five of them; those files were not carried into the project.)

---

## Diagrams

### Fig. 4.1 — Four simple eyes
**Source figure:** Land & Nilsson 2012, *Animal Eyes* 2nd ed., Fig. 1.4, printed p.12 (itself "modified from Nilsson 2009").
**Panels, as in the source:**
- (a) Single-cell ocellus of a box jellyfish larva: one cell forming its own pigment cup, microvilli, motile cilium. Labels: *screening pigment, microvilli, motile cilium*.
- (b) Polychaete larva ocellus: one pigment cell, one photoreceptor cell. Labels: *pigment cell, receptor cell, microvilli*.
- (c) Planarian pigment cup: receptor cells lining a cup made by a single pigment cell; axons leave towards the light. Labels: *pigment cell, receptor cells, microvilli*; arrow for light direction.
- (d) Box jellyfish lens eye: weak lens, cornea, pigmented iris; receptor cells form the cup. Labels: *cornea, lens, iris, receptor cells*.
**Layout:** 2 × 2 at desktop, 1 column at phone width. Light arrow from the top in every panel. No scale bar (source has none).
**Caption:** fixed in the draft; panel (d) now reads "the lens eye of a box jellyfish".

### Fig. 4.7 — Eyes of five living molluscs
**Source figure:** Land & Nilsson 2012, Fig. 4.1, printed p.73. Their drawings come from Hesse 1908 (*Patella*, *Haliotis*, *Helix*), Young 1964 (*Nautilus*), Newell 1965 (*Littorina*).
**Layout:** as source. Top row *Patella* (open V-shaped pit) → *Haliotis* (narrowed pit) → *Nautilus* (pinhole). Bottom row branches from *Patella*: *Helix* (weak lens) → *Littorina* (graded-index lens). Retina in part-2 colour, lens drawn as 3–4 concentric flat bands (no gradients).
**Scale:** source caption gives *Nautilus* eye about 10 mm, the others all under 1 mm. Add a small "not to scale" tag on the *Nautilus* panel.
**Keep the draft's line** that these are separate living species, not ancestors and descendants.

---

## Charts

### Fig. 4.10 — Generations per transition (bar chart)
Values from the draft's editor's notes (C56); steps × ln(1.01)/ln(1.00005) reproduces every value and the 363,992 total.

| Transition | Steps of 1% | Generations (bar value) | Label |
|---|---|---|---|
| 1→2 | 176 | 35,026 | 35,000 |
| 2→3 | 362 | 72,042 | 72,000 |
| 3→4 | 270 | 53,733 | 54,000 |
| 4→5 | 225 | 44,778 | 45,000 |
| 5→6 | 192 | 38,210 | 38,000 |
| 6→7 | 308 | 61,296 | 61,000 |
| 7→8 | 296 | 58,907 | 59,000 |
| Total | 1,829 | 363,992 | shown as a note, not a bar |

- x axis: "Transition between model stages". y axis: "Generations (thousands)", 0–80, linear.
- Bars in one colour. Note under the chart: "Our arithmetic from the paper's step counts at 0.005% per generation; the total is the paper's."

### Fig. 4.11 — Performance against change (log chart)
Plot the rounded values, matching the caption and the addendum's "about, whole numbers" rule (decided 2026-11-07).

| Stage | x: running total of 1% steps | y: image points (plotted) | addendum raw reading |
|---|---|---|---|
| 1 | 0 | 1 | 1.1 |
| 2 | 176 | 2 | 1.6 |
| 3 | 538 | 4 | 4 |
| 4 | 808 | 8 | 8 |
| 5 | 1,033 | 21 | 21 |
| 6 | 1,225 | 38 | 38 |
| 7 | 1,533 | 73 | 73 |

- x axis: "Transformation progress (1% steps)", 0–2,000, linear. y axis: "Image points in visual field", log, 1–100. Matches the source axes.
- Points plus a dotted line through them, as in the source. Stage numbers beside points.
- End tick at 1,829 marked "stage 8 (not plotted)".

---

## Storyboards

### Fig. 4.9 — The eight stages (animation)
**Source:** Nilsson & Pelger 1994, Fig. 2, printed p.55. Each stage drawn as in the source: transparent protective layer (outline), receptor layer (part-2 colour), pigment layer (ink).
**Controls:** plays on press only. Step back / step forward buttons and a stage readout ("Stage 3 of 8"). Reduced motion: shows stage 8 with the step controls. Keyboard: arrow keys step. Phone width: the drawing above the readout.
**Readout panel beside the drawing (values from C57–C60 and the figure):** stage number, normalised receptor diameter *d*, lens focal length *f* where given, and the 1% steps for the transition just played.

| Frame | Shape | Readout | Transition text (fades in during morph) |
|---|---|---|---|
| 1 | Flat patch: protective layer over receptors over pigment | d = 1 | — |
| 1→2 | Patch dips into a shallow dish | 176 steps | "The patch folds inwards." |
| 2 | Shallow cup | d = 1.23 | — |
| 2→3 | Cup deepens to a hemisphere; protective layer thickens into a vitreous body (n = 1.35) | 362 steps | "The cup deepens; the vitreous body has no real optical effect." |
| 3 | Hemispherical cup | d = 1.95 | — |
| 3→4 | Retina keeps growing at the same curvature; rim starts to close | 270 steps | "Now the opening narrows." |
| 4 | Cup with partly closed rim | d = 2.83 | — |
| 4→5 | Opening narrows further | 225 steps | — |
| 5 | Near-spherical chamber, small aperture | d = 4.56 | — |
| 5→6 | Faint ellipsoid lens appears filling the aperture (local rise in refractive index from 1.35) | 192 steps | "A weak lens appears in the aperture." |
| 6 | Ellipsoid lens in aperture | d = 4.56, f = 3P | — |
| 6→7 | Lens becomes denser, rounder; edge of old aperture flattens into an iris | 308 steps | "The lens strengthens; an iris forms." |
| 7 | Smaller, denser lens; iris visible | d = 4.73, f = 2P | — |
| 7→8 | Lens becomes spherical, centre index reaches 1.52; image comes into focus on the retina | 296 steps | "Focused: lens centre index 1.52." |
| 8 | Sharp camera-type eye | d = 4.1, f = P | End card: "1,829 steps of 1%" |

- *P* = distance from lens to retina. Show three parallel rays converging behind the retina at stage 6, nearer at stage 7, on the retina at stage 8.
- Lens shading: 3–4 concentric flat bands, densest at the centre (decided 2026-11-07; keeps the "no gradients" rule).
- Morph duration about 1.5 s per transition, total under 15 s.
- No text claims beyond C57–C60. The steps-per-transition values match the draft's §4.8.

---

## Photos (chosen, checked and logged)

Ledger entries below go into `image-credits.json`. Checks done 2026-11-07.

**4.2 *Platynereis* larvae** — `4-2-platynereis-larvae.jpg`
Licence confirmed: the article's licence statement (via Europe PMC) is Creative Commons Attribution 2.0. Fig. 8 shows light micrographs at 24–36 hpf with larval eyes labelled "le", scale bar 20 µm (as read by the earlier chat; panel crop to be chosen at build).
```json
{"id": "fig-4-2", "page": "chapter-4", "file": "4-2-platynereis-larvae.jpg",
 "title": "Larvae of Platynereis dumerilii, light micrographs (Fischer et al. 2010, Fig. 8)", "author": "Antje H. L. Fischer, Thorsten Henrich, Detlev Arendt",
 "source_url": "https://doi.org/10.1186/1742-9994-7-31", "licence": "CC BY 2.0",
 "changes": "Cropped to selected panels", "retrieved": "2026-11-07",
 "alt": "Light micrographs of young ragworm larvae, with the larval eyes labelled 'le'"}
```

**4.3 Planarian** — `4-3-planarian.jpg`
Replaces the first choice (iNaturalist photo 103671218, *Girardia tigrina*), which is not research grade: it is absent from GBIF's iNaturalist research-grade dataset. The replacement was viewed: both eyes clearly visible on the head.
```json
{"id": "fig-4-3", "page": "chapter-4", "file": "4-3-planarian.jpg",
 "title": "Freshwater planarian, Dugesia subtentaculata, Montseny, Catalonia", "author": "Eduard Solà",
 "source_url": "https://commons.wikimedia.org/wiki/File:Dugesia_subtentaculata_1.jpg", "licence": "CC BY-SA 3.0",
 "changes": "None", "retrieved": "2026-11-07",
 "alt": "Pale brown planarian flatworm on a black background, with two small dark eyes on its head"}
```

**4.4 Limpet** — `4-4-limpet.jpg`
Identity confirmed: the source iNaturalist observation (127103600) is in GBIF's research-grade dataset as *Patella vulgata*. The eyes are too small to see; the caption says so.
```json
{"id": "fig-4-4", "page": "chapter-4", "file": "4-4-limpet.jpg",
 "title": "Common limpet, Patella vulgata, underside", "author": "Dimitri Brosens",
 "source_url": "https://commons.wikimedia.org/wiki/File:Patella_vulgata_215743149.jpg", "licence": "CC0",
 "changes": "Cropped", "retrieved": "2026-11-07",
 "alt": "Underside of a common limpet held in a hand, showing the foot and the head with its two tentacles"}
```

**4.5 *Nautilus*** — `4-5-nautilus.jpg`
Source changed to Hillewaert's original file (the first choice was a re-upload). Original page: photographed at Pairi Daiza zoo, Brugelette, Belgium, 2008. Viewed: pinhole pupil clearly visible. The licence requires the attribution "© Hans Hillewaert / CC BY-SA 4.0"; a cropped version must stay CC BY-SA 4.0.
```json
{"id": "fig-4-5", "page": "chapter-4", "file": "4-5-nautilus.jpg",
 "title": "Chambered nautilus, Nautilus pompilius, Pairi Daiza", "author": "© Hans Hillewaert",
 "source_url": "https://commons.wikimedia.org/wiki/File:Nautilus_pompilius_(detail).jpg", "licence": "CC BY-SA 4.0",
 "changes": "None", "retrieved": "2026-11-07",
 "alt": "Chambered nautilus side view; its eye is a pale disc with a tiny central hole, a pinhole with no lens"}
```

**4.6 Giant clam** — `4-6-giant-clam.jpg`
Viewed: the dark spots are spread across the whole mantle, so they cannot be shown to be the eyes, which lie along the mantle edge. Alt text and caption no longer claim visible eyes. Source: Commons upload from Lim et al. 2020, *Front Mar Sci*, doi:10.3389/fmars.2020.570361. Share-alike applies.
```json
{"id": "fig-4-6", "page": "chapter-4", "file": "4-6-giant-clam.jpg",
 "title": "Giant clam, Tridacna maxima, Red Sea", "author": "Kah Kheng Lim, Susann Rossbach, Nathan R. Geraldi, Sebastian Schmidt-Roach, Ester A. Serrão and Carlos M. Duarte",
 "source_url": "https://commons.wikimedia.org/wiki/File:Red_Sea_Tridacna_maxima.jpg", "licence": "CC BY-SA 4.0",
 "changes": "None", "retrieved": "2026-11-07",
 "alt": "Blue, dark-spotted mantle of a giant clam spread between its shell valves on a coral reef"}
```

**4.8 Box jellyfish rhopalium** — `4-8-rhopalium.png`
Commons description confirmed: six eyes of four types (ULE, LLE, PE, SE) and a light-sensitive neuropil (NP). Panel B of Bielecki et al. 2014, *PLoS ONE* 9:e98870, Fig. 1. Credited as the Commons crop, whose licence was seen (CC BY-SA 4.0). Scale bar 100 µm.
```json
{"id": "fig-4-8", "page": "chapter-4", "file": "4-8-rhopalium.png",
 "title": "Rhopalium of the box jellyfish Tripedalia cystophora", "author": "Jan Bielecki, Alexander K. Zaharoff, Nicole Y. Leung, Anders Garm, Todd H. Oakley",
 "source_url": "https://commons.wikimedia.org/wiki/File:Ropalio-tripedalia-cystophora-detail.png", "licence": "CC BY-SA 4.0",
 "changes": "None", "retrieved": "2026-11-07",
 "alt": "Box jellyfish sensory club under a microscope, with upper and lower lens eyes, pit and slit eyes labelled"}
```

**Video (link out, not hosted):** Randel et al. 2014 *eLife* Videos 6 and 8 (mixed phototaxis; one-sided eye illumination), CC BY, per the dossier addendum. Still plus caption beside §4.3.

---

## Alt text

All under 150 characters.

| Fig | Alt text | Chars |
|---|---|---|
| 4.1 | Four simple eyes drawn side by side: a one-cell eyespot, a two-cell eyespot, a pigment cup and a small lens eye | 111 |
| 4.2 | Light micrographs of young ragworm larvae, with the larval eyes labelled 'le' | 77 |
| 4.3 | Pale brown planarian flatworm on a black background, with two small dark eyes on its head | 89 |
| 4.4 | Underside of a common limpet held in a hand, showing the foot and the head with its two tentacles | 97 |
| 4.5 | Chambered nautilus side view; its eye is a pale disc with a tiny central hole, a pinhole with no lens | 101 |
| 4.6 | Blue, dark-spotted mantle of a giant clam spread between its shell valves on a coral reef | 89 |
| 4.7 | Five mollusc eyes: limpet open pit, abalone narrowed pit, nautilus pinhole; land snail weak lens, periwinkle sharp lens | 119 |
| 4.8 | Box jellyfish sensory club under a microscope, with upper and lower lens eyes, pit and slit eyes labelled | 105 |
| 4.9 | Animation of a flat light-sensitive patch folding into a cup, narrowing to a pinhole, then gaining a focusing lens | 114 |
| 4.10 | Bar chart: generations for each of seven model transitions, 35,000 to 72,000, about 364,000 in all | 98 |
| 4.11 | Log chart: resolvable image points rise steadily from about 1 to 73 across the first seven model stages | 103 |

---

## For Paul's check
- Figs 4.7, 4.10, 4.11: sign-off.
- Fig. 4.2: which panels of Fischer et al. Fig. 8 to crop (no one in this chat has seen the figure itself).

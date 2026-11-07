# Half an Eye components

## AtlasCard
# AtlasCard

A card in the Atlas of Eyes grid, linking to that animal's page.

Provide: a link to the entry, a plate (photo of the animal, or the house eye diagram where no licensed photo exists), the eye type, common name, Latin name, one surprising fact in under 20 words, the animal group and one number that matters for that eye.

- Lay cards in `.eb-atlas`; it fills as many columns as fit, at least 15rem each.
- The eye type label comes from the fixed list in the catalogue (Pinhole eye, Mirror eye, Compound eye…), so the grid can be filtered by it.
- The fact is a specific finding with a number where possible, never a superlative ("amazing", "incredible").
- Cards are square-cornered with a `rule` border; on hover the border takes `border`. No shadows.

```html
<!-- @dsCard group="Atlas" height=440 subtitle="One card per animal" -->
<div class="eb-atlas" style="padding: 24px;">
  <style>.d{fill:none;stroke:var(--ink);stroke-width:2}.r{fill:none;stroke:var(--part-3);stroke-width:5}.m{fill:none;stroke:var(--accent);stroke-width:5}.f{fill:var(--part-3-tint);stroke:var(--part-3);stroke-width:1.5}</style>
  <a class="eb-card" href="#nautilus">
    <div class="eb-card__plate"><svg viewBox="0 0 240 180" width="100%" height="100%" aria-hidden="true"><path class="r" d="M108 52 A44 44 0 1 0 132 52"/><path class="d" d="M112 40 A56 56 0 1 0 128 40"/></svg></div>
    <div class="eb-card__body"><span class="eb-card__type">Pinhole eye</span><h3 class="eb-card__name">Chambered nautilus</h3><span class="eb-card__latin">Nautilus pompilius</span><p class="eb-card__fact">A camera eye with no lens. Seawater fills the chamber through an open pupil.</p><div class="eb-card__meta"><span>Mollusca</span><span>~500 Mya</span></div></div>
  </a>
  <a class="eb-card" href="#scallop">
    <div class="eb-card__plate"><svg viewBox="0 0 240 180" width="100%" height="100%" aria-hidden="true"><path class="m" d="M80 120 Q120 150 160 120"/><path class="d" d="M74 60 L74 120 Q120 160 166 120 L166 60"/><path class="r" d="M90 84 L150 84"/></svg></div>
    <div class="eb-card__body"><span class="eb-card__type">Mirror eye</span><h3 class="eb-card__name">Great scallop</h3><span class="eb-card__latin">Pecten maximus</span><p class="eb-card__fact">Up to 200 eyes, each focusing light with a mirror of square guanine crystals.</p><div class="eb-card__meta"><span>Mollusca</span><span>2 retinas</span></div></div>
  </a>
  <a class="eb-card" href="#mantis">
    <div class="eb-card__plate"><svg viewBox="0 0 240 180" width="100%" height="100%" aria-hidden="true"><g transform="translate(120 90)"><circle class="d" r="58"/><path class="f" d="M-58 -6 H58 V6 H-58 Z"/><path class="r" d="M-50 -30 A58 58 0 0 1 50 -30"/><path class="r" d="M-50 30 A58 58 0 0 0 50 30"/></g></svg></div>
    <div class="eb-card__body"><span class="eb-card__type">Compound eye</span><h3 class="eb-card__name">Mantis shrimp</h3><span class="eb-card__latin">Haptosquilla trispinosa</span><p class="eb-card__fact">Twelve colour receptors, yet worse at telling colours apart than you are.</p><div class="eb-card__meta"><span>Arthropoda</span><span>12 channels</span></div></div>
  </a>
</div>
```

## ChapterNav
# ChapterNav

Previous and next links at the foot of every chapter, so the book reads in order.

Provide: the previous and next chapter numbers and titles. On the first chapter the left slot links to the Preface; on the last, the right slot links to the Atlas.

- Skip unpublished chapters: link to the next chapter that is live.
- Arrows are text characters in the label, not icons.
- Stacks to one column below 560px.

```html
<!-- @dsCard group="Navigation" height=160 subtitle="Previous and next chapter" -->
<nav class="eb-pager" aria-label="Chapter" style="margin: 0 24px;">
  <a href="#ch5"><span class="eb-pager__dir">← Chapter 5</span><span class="eb-pager__title">Eyes in stone</span></a>
  <a href="#ch7"><span class="eb-pager__dir">Chapter 7 →</span><span class="eb-pager__title">Again and again</span></a>
</nav>
```

## ChapterOpener
# ChapterOpener

The head of every chapter: part tag, large chapter numeral, title, standfirst and the page's dates.

Provide: the part class (`eb-p1` to `eb-p4`) on the header, the chapter number, title, a one-paragraph standfirst, the first-published and last-revised dates, and a reading time.

- Use once per chapter page, before the first section. Atlas entries and claim pages use their own heads, not this.
- The numeral and the part tag take the part's colour; nothing else on the page does.
- The standfirst says what the chapter shows, as a claim, in under 50 words. No questions, no teasers.
- Dates use "12 Jan 2027". Never remove "Last revised": it is how readers know the page is maintained.

```html
<!-- @dsCard group="Reading" height=320 subtitle="Top of every chapter" -->
<div style="padding: 0 24px;">
  <header class="eb-opener eb-p2">
    <div class="eb-opener__num" aria-hidden="true">6</div>
    <span class="eb-part">Part II <span class="eb-part__nm">498 nm</span></span>
    <h1 class="eb-opener__title">Our eyes</h1>
    <p class="eb-opener__stand">The vertebrate eye was not inherited from the paired eyes of our earliest ancestors. It was rebuilt from a single eye on top of the head.</p>
    <div class="eb-opener__meta"><span>First published 12 Jan 2027</span><span>Last revised 3 Mar 2027</span><span>14 min read</span></div>
  </header>
</div>
```

## ClaimResponse
# ClaimResponse

The head of each page in Claims and responses: the creationist claim quoted fairly, then the short answer and links into the chapters that hold the evidence.

Provide: the claim in its strongest common wording, its attribution (a named source where one exists, with a citation), a response of 40–80 words, and two to five links to chapters or Atlas entries.

- Quote the claim as its proponents put it. Never paraphrase it into a weaker version.
- The response states evidence and names animals and papers. No sarcasm, no "debunked", no exclamation marks.
- Links point into the neutral chapters; the claim pages hold the argument, the chapters hold the science.
- Below this head, the page continues as ordinary reading text with sidenotes.

```html
<!-- @dsCard group="Claims" height=470 subtitle="Head of a rebuttal page" -->
<article class="eb-claim" style="padding: 24px;">
  <blockquote class="eb-claim__said">
    <p>“What use is half an eye? The eye is useless until every part is in place.”</p>
    <footer>The claim, as commonly put in debates</footer>
  </blockquote>
  <section class="eb-claim__answer">
    <h3>The evidence</h3>
    <p>Half an eye is in use today. A ragworm larva steers with a two-cell eyespot, a planarian with a pigment cup, a nautilus with a lensless pinhole eye. Each works, and each is better than the stage before it.</p>
    <ul class="eb-claim__evidence">
      <li><a href="#ch4">Ch. 4 Step by step</a></li>
      <li><a href="#nautilus">Atlas: Nautilus</a></li>
      <li><a href="#planarian">Atlas: Planarian</a></li>
    </ul>
  </section>
</article>
```

## Cover

```html
<!-- @dsCard height=288 -->
<div class="cv">
<style>
.cv{position:relative;width:960px;height:288px;background:var(--paper);overflow:hidden}
.cv svg{position:absolute;inset:0}
.b1{fill:var(--part-1)}.b2{fill:var(--part-2)}.b3{fill:var(--part-3)}.b4{fill:var(--part-4)}
.ink{fill:var(--ink)}.pupil{fill:var(--accent)}
.arc{fill:none;stroke:var(--paper);stroke-width:2}
.cv h1{position:absolute;left:48px;bottom:62px;margin:0;font-family:var(--font-serif);font-variation-settings:"opsz" 72;font-weight:600;font-size:96px;line-height:.95;letter-spacing:-0.02em;color:var(--ink);max-width:440px}
.cv p{position:absolute;left:48px;bottom:32px;margin:0;font-family:var(--font-sans);font-size:14px;line-height:18px;color:var(--muted);max-width:440px}
</style>
<svg viewBox="0 0 960 288" width="960" height="288" aria-hidden="true">
<!-- blocks: part-1 96w, part-2 144w, part-3 112w, part-4 128w (multiples of space-4/space-8), full height, square corners (radius-0)
     arrangement: four unequal bands left to right in wavelength order 420/498/534/564 nm, bleeding off top and bottom
     pattern: literal motif (lens) - the README calls the book an optical instrument; an ink eyeball (r 96) with an accent pupil and three paper iris arcs (r 48/64/80, space-4 apart) inside it
     scales: band widths from space-4/space-8 multiples, arc gaps 16px (space-4), radius-0 corners -->
<rect class="b1" x="480" y="0" width="96" height="288"/>
<rect class="b2" x="576" y="0" width="144" height="288"/>
<rect class="b3" x="720" y="0" width="112" height="288"/>
<rect class="b4" x="832" y="0" width="128" height="288"/>
<circle class="ink" cx="720" cy="144" r="96"/>
<circle class="pupil" cx="720" cy="144" r="32"/>
<path class="arc" d="M678.4 120 A48 48 0 0 1 761.6 120"/>
<path class="arc" d="M664.6 112 A64 64 0 0 1 775.4 112"/>
<path class="arc" d="M650.7 104 A80 80 0 0 1 789.3 104"/>
</svg>
<h1>Half an<br>Eye</h1>
<p>Every stage of the eye, still in use today.</p>
</div>
```

## Figure
# Figure

A numbered illustration, photo, chart or animation with caption and credit, at the full width of the reading column.

Provide: the media inside `.eb-figure__plate` (SVG, image or video), the figure number as "FIG. chapter.n", a caption that states what the reader should see, and a credit line with author, source and licence.

- Number figures by chapter: FIG. 4.1, FIG. 4.2. Numbers never change once published.
- Captions state the finding ("Each step improves resolution"), not the contents ("A diagram of eyes").
- Every credit names its licence. Our own drawings are "Half an Eye, CC BY 4.0".
- House drawings use `ink` for structure, the chapter's part colour for the light-sensitive layer, and `font-sans` at 13px in sentence case for labels, with thin straight leaders (see README, Imagery). No gradients, no drop shadows.

```html
<!-- @dsCard group="Reading" height=430 subtitle="Numbered figures with credit" -->
<div style="padding: 24px; max-width: 640px;">
<figure class="eb-figure">
  <div class="eb-figure__plate">
    <svg viewBox="0 0 640 360" role="img" aria-label="Four eye stages: flat patch, cup, pinhole, lens">
      <style>.s{fill:none;stroke:var(--ink);stroke-width:2}.r{fill:none;stroke:var(--part-2);stroke-width:6}.l{fill:var(--part-2-tint);stroke:var(--part-2);stroke-width:2}.t{font:400 13px var(--font-sans);fill:var(--ink)}</style>
      <g transform="translate(80 180)"><path class="r" d="M-40 20 L40 20"/><path class="s" d="M-48 28 L48 28"/><text class="t" x="0" y="80" text-anchor="middle">Patch</text></g>
      <g transform="translate(240 180)"><path class="r" d="M-36 -20 Q0 50 36 -20"/><path class="s" d="M-46 -30 Q0 66 46 -30"/><text class="t" x="0" y="80" text-anchor="middle">Cup</text></g>
      <g transform="translate(400 180)"><path class="r" d="M-14 -40 A44 44 0 1 0 14 -40"/><path class="s" d="M-10 -52 A54 54 0 1 0 10 -52"/><text class="t" x="0" y="80" text-anchor="middle">Pinhole</text></g>
      <g transform="translate(560 180)"><path class="r" d="M-24 -38 A44 44 0 1 0 24 -38"/><path class="s" d="M-20 -50 A54 54 0 1 0 20 -50"/><circle class="l" cx="0" cy="-34" r="16"/><text class="t" x="0" y="80" text-anchor="middle">Lens</text></g>
    </svg>
  </div>
  <figcaption><span class="eb-figure__num">FIG. 4.1</span><span>Four stages that living animals still use today. Each step improves resolution; none requires the next to be useful.</span><span class="eb-figure__credit">Drawing: Half an Eye, CC BY 4.0. After Nilsson &amp; Pelger 1994.</span></figcaption>
</figure>
</div>
```

## Sidenote
# Sidenote

Every factual claim carries a numbered citation that sits beside the sentence in the right margin, not at the foot of the page.

Provide: the marker (`a.eb-cite`, numbered in page order) straight after the sentence's full stop, and the matching `aside.eb-sidenote` directly after that paragraph inside `.eb-text`. The aside holds authors, year, title, journal in italics, volume and pages, then a DOI or page number on its own line.

- One number per source per sentence. Two sources for one sentence get two markers.
- Below 960px the note drops beneath its paragraph on the `sunk` panel.
- When a reader follows a marker, the note takes `accent-tint` (`:target` or `.is-active`).
- Asides that are commentary rather than a source use the same component without a DOI line. Keep them under 60 words.

```html
<!-- @dsCard group="Reading" height=300 subtitle="Citations in the margin" -->
<div class="eb-text" style="padding: 24px;">
  <p>The hagfish eye has no lens, no muscles to move it and the simplest retina of any living vertebrate.<a class="eb-cite" href="#sn-14" id="ref-14">14</a> Lamb and colleagues argue that it is not a degenerate lamprey eye but a surviving stage from before the lens evolved.<a class="eb-cite" href="#sn-15" id="ref-15">15</a></p>
  <aside class="eb-sidenote" id="sn-14"><b>14</b>Lamb TD, Collin SP, Pugh EN (2007). Evolution of the vertebrate eye. <cite>Nature Reviews Neuroscience</cite> 8:960–976. <span class="eb-doi">doi:10.1038/nrn2283</span></aside>
  <p>Larval lampreys are effectively blind and carry a hagfish-like eye, which remodels into a camera eye at metamorphosis.</p>
  <aside class="eb-sidenote is-active" id="sn-15"><b>15</b>Lamb TD, Pugh EN, Collin SP (2008). The origin of the vertebrate eye. <cite>Evolution: Education and Outreach</cite> 1:415–426.</aside>
</div>
```

## TableOfContents
# TableOfContents

The book's contents as a left sidebar on wide screens and a slide-out panel on phones, with the current chapter marked.

Provide: the book title, the parts in order with their wavelength tags, each chapter's number and title, which chapter is current, and which are not yet published.

- Each part list takes its part class (`eb-p1` to `eb-p4`); only the tag and the current-chapter bar use the part colour.
- Unpublished chapters stay listed, dimmed, with "coming". Readers see the whole book's shape from day one.
- The Atlas, Claims and back matter follow the four parts as plain lists with no wavelength tag.
- Mark the current chapter with `aria-current="page"`.

```html
<!-- @dsCard group="Navigation" height=520 subtitle="Persistent sidebar" -->
<nav class="eb-toc" aria-label="Contents">
  <p class="eb-toc__book">Half an Eye</p>
  <ul class="eb-toc__part eb-p1"><li><span class="eb-part">Part I <span class="eb-part__nm">420 nm</span></span></li>
    <li class="eb-toc__item"><a href="#1"><span class="eb-toc__n">1</span>What an eye does</a></li>
    <li class="eb-toc__item"><a href="#2"><span class="eb-toc__n">2</span>The toolkit</a></li>
    <li class="eb-toc__item is-soon"><a href="#3" aria-disabled="true"><span class="eb-toc__n">3</span><span>The physics of seeing <span class="eb-toc__soon">· coming</span></span></a></li>
  </ul>
  <ul class="eb-toc__part eb-p2"><li><span class="eb-part">Part II <span class="eb-part__nm">498 nm</span></span></li>
    <li class="eb-toc__item"><a href="#4"><span class="eb-toc__n">4</span>Step by step</a></li>
    <li class="eb-toc__item"><a href="#5"><span class="eb-toc__n">5</span>Eyes in stone</a></li>
    <li class="eb-toc__item" aria-current="page"><a href="#6"><span class="eb-toc__n">6</span>Our eyes</a></li>
    <li class="eb-toc__item"><a href="#7"><span class="eb-toc__n">7</span>Again and again</a></li>
  </ul>
</nav>
```

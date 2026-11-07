# Writing style guide

*Half an Eye* reads like a good popular-science book written by someone who has read the papers: clear enough for an interested sixteen-year-old, exact enough that a biologist finds nothing to correct.

## Voice

- **Plain and exact.** Short sentences, everyday words, technical terms defined at first use and linked to the glossary. "Photoreceptor" is fine once explained; "phototransduction cascade" needs a sentence of its own.
- **Evidence first.** Lead each paragraph with the finding, then how we know it. "The hagfish eye has no lens. Lamb and colleagues dissected…"
- **Neutral in chapters.** No mention of creationism, design or apologetics in Parts I–IV or the Atlas. The evidence does the work.
- **Firm in claim pages.** State that a claim is wrong when the evidence says so, show the evidence, link the chapter. No sarcasm, mockery or exclamation marks. Never "debunked", "destroyed" or "obviously".
- **Honest about uncertainty.** Say "the leading hypothesis is", "most researchers think", "this is disputed" where the dossier marks a claim *Supported* or *Hypothesis*. One hedge per claim, not three.
- **Analogies earn their place.** Use one when it makes a mechanism click (a pinhole camera, a satellite's colour bands), then say where it breaks down.
- **No filler.** Cut "It is worth noting", "Interestingly", "In fact", "Remarkably", "amazing", "incredible", "perfect", "stunning", and every "not X, but Y" flourish.

## Mechanics

- British English (colour, behaviour, analyse). Sentence case for every heading.
- Species: common name, then Latin in italics at first mention ("the chambered nautilus, *Nautilus pompilius*"), common name after.
- Numbers: digits for 10 and above and for all measurements; units with a space (27 cm, 498 nm, 515 million years ago). "Mya" only in tables, cards and captions.
- Dates in prose: "in 1994". Authors in prose: "Nilsson and Pelger (1994)"; three or more: "Lamb and colleagues (2007)".
- Paragraphs of three to five sentences. A section every 400–700 words.

## Citations

- A numbered sidenote marker after the full stop of every factual sentence: `text.[^14]`
- The note: `[^14]: Lamb TD, Collin SP, Pugh EN (2007). Evolution of the vertebrate eye. *Nat Rev Neurosci* 8:960–976. doi:10.1038/nrn2283`
- Books: author, year, title, edition, printed page. Two sources for one sentence get two markers.
- Numbering restarts on each page. Every note also appears in the site bibliography.

## Page templates

**Chapter (2,500–3,500 words)**

```markdown
---
part: 2
chapter: 6
title: Our eyes
standfirst: One sentence of under 50 words stating what the chapter shows.
first_published:
last_revised:
---
## 6.1 Section title
Text with citations.[^1]
:::figure 6.1
Caption stating what the reader should see.
:::
## 6.2 …
## Key evidence
- Three to five bullets: the findings a reader should leave with, each linked to its section.
[^1]: …
```

**Atlas entry (500–700 words)**: front matter (common name, Latin name, eye type, animal group, key number, first appeared); then four short sections: *What the eye is*, *How it works*, *What it tells us about evolution*, *Where to read more* (links to chapters). One labelled diagram, one photo.

**Claim and response (800–1,200 words)**: front matter (claim wording, attribution with citation); *The claim* (quoted fairly, in its strongest common form); *The short answer* (40–80 words); *The evidence* (in order of strength, each point linked to a chapter or Atlas entry); *Where the claim has a point* (concede anything true, e.g. that Nilsson and Pelger was a calculation, not a simulation); *Sources*.

## Before handing a draft back

- Every factual sentence has a marker; every marker is in the dossier.
- No sentence states a *Hypothesis* claim as fact.
- Word count within range; standfirst under 50 words.
- Glossary terms listed at the end for linking.

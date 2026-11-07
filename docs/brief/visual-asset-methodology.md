# Visual asset methodology

Every figure is either drawn by us from a cited source or is an openly licensed photo with a full credit. Nothing is AI-generated, and nothing goes in without a line in the credits ledger.

## What each kind of asset is and who makes it

| Asset | Made by | Rule |
| --- | --- | --- |
| Labelled eye diagrams and explainers | Drawn as SVG in the house style (design system: Figure) | Redrawn from a cited source figure: caption ends "After Lamb et al. 2007, fig. 3". |
| Charts | Built from the dossier's numbers as SVG | Every value traces to a dossier claim; axis units always shown. |
| Animations | SVG + script in the site build, from a storyboard in the visual brief | Play on press only; reduced-motion shows the final frame with step controls. |
| Interactives (blind-spot test, Atlas filter) | Site build | Work by keyboard and at phone width. |
| Photos of animals and fossils | Sourced, never made | Order of search below. Claude chooses the best image and logs it; no candidate lists for Paul. |
| Video | Not hosted | Link out to researchers' own talks and lab footage, with a still and caption. |

## Where photos come from, in order

1. **Wikimedia Commons**: CC0, public domain, CC BY or CC BY-SA.
2. **iNaturalist**: research-grade observations under CC0 or CC BY (check each photo's own licence).
3. **Open-access papers**: figures from CC BY articles (PLOS, *eLife*, *Frontiers*, *Sci Adv*, many *Proc R Soc B*).
4. **Biodiversity Heritage Library**: public-domain natural-history plates, ideal for historical and anatomical views.
5. **Researchers directly**: an email asking permission, for a lab photo nothing else matches. Keep the reply.

Never use: Google Images results, anything marked NC or ND, stock sites with unclear licences, AI-generated images of animals or eyes, or a photo whose licence you cannot see on its own page.

## Accuracy checks

- Every diagram names the source figure it was redrawn from; the fact-check chat compares the two.
- Photo identity: species confirmed from the source page (research-grade on iNaturalist; a named expert or museum on Commons). No photos of a look-alike species.
- Scale and orientation stated in the caption where they matter ("lens about 70 µm across").
- Every image gets alt text describing what it shows and why it matters, under 150 characters.

## Credits ledger

One entry per asset in `image-credits.json`, which generates the credits page:

```json
{"id": "fig-6-2", "page": "chapter-6", "file": "hagfish-head.jpg",
 "title": "Pacific hagfish, Eptatretus stoutii", "author": "<photographer as credited on the source page>",
 "source_url": "https://commons.wikimedia.org/wiki/File:<file name>", "licence": "CC BY 4.0",
 "changes": "Cropped", "retrieved": "2026-11-12",
 "alt": "Head of a hagfish showing the pale eye patch under the skin"}
```

## Visual brief template

```markdown
# Visual brief — Chapter 6
| Fig | Type | Shows | Source / after | Status |
|---|---|---|---|---|
| 6.1 | Diagram | Hagfish, lamprey and human eye side by side | After Lamb et al. 2007, fig. 4 | to draw |
| 6.2 | Photo | Hagfish head with eye patch | Commons, public domain | logged |
| 6.3 | Animation | Median eye splitting into paired eyes | Storyboard below; after Kafetzis et al. 2026 | storyboard |
## Storyboards
## Alt text
```

Half an Eye is an online book about how eyes evolved, named for the question creationists ask ("what use is half an eye?"). It is written for people who argue with creationists and want something they can link to. It should feel like a well-made scientific book printed on optical glass: calm, exact, generous with white space, and impossible to mistake for a blog. Every design choice serves long reading and precise citation.

## Content fundamentals

- **Voice.** A knowledgeable guide explaining evidence. Plain words, short sentences, active voice. "The hagfish eye has no lens", not "It is worth noting that the hagfish's eye notably lacks a lens".
- **Person.** Chapters speak to "you" only when inviting a test ("Close your left eye…"). Otherwise third person. Never "we believe".
- **Science stays neutral.** Chapters present evidence and never address creationists. Arguments live only in Claims and responses.
- **Claims pages.** Quote the claim fairly and in full. No sarcasm, no "debunked", no "destroyed", no exclamation marks.
- **Specifics over adjectives.** Numbers with units, species with Latin names, papers with years: "about 300 facets", "498 nm", "Nilsson & Pelger 1994". Avoid "amazing", "incredible", "perfect".
- **Casing.** Sentence case for every heading and label. Part labels and eyebrows are set in capitals by style, written in sentence case in the source.
- **Numbers and dates.** "12 Jan 2027"; "515 million years ago" in prose, "515 Mya" in tables and cards; units with a space ("27 cm", "498 nm").
- **No emoji, ever.**

## Visual foundations

### Colour

- Set every page on `paper`. Use `raised` for cards and `sunk` for the table of contents, figure plates, sidenotes on phones and the claim quote.
- Set all running text in `ink`; captions, metadata and sidenotes in `muted`.
- `accent` is rhodopsin, the visual purple of the rod cell. Use it for links, citation markers, the reading-progress bar and the focus ring, and nowhere else. Never fill a large area with it except the primary button (text on it in `on-accent`).
- The four parts of the book each own one colour, taken from the peak sensitivities of the photoreceptors: `part-1` 420 nm (short-wave cone), `part-2` 498 nm (rod), `part-3` 534 nm (medium-wave cone), `part-4` 564 nm (long-wave cone). Use a part colour only for that part's wavelength tag, chapter numeral, contents marker and the light-sensitive layer in its figures. Its `-tint` is the ground for a part's tag.
- `rule` is for decorative hairlines only. Anything a reader must see to use it (inputs, buttons, chips) takes `border`.
- Every text pair named in a token's usage note meets 4.5:1 in both themes. The dark theme is a full theme, not an inversion: it is the deep blue-black of the vitreous chamber, with the part colours lifted so they keep their order.

### Type

- Three families, each with one job. **Literata** (`--font-serif`), a typeface designed for long-form reading on screens, carries every title and all reading text. **IBM Plex Sans Condensed** (`--font-sans`) carries the interface: labels, navigation, buttons. **IBM Plex Mono** (`--font-mono`) carries data: figure numbers, wavelengths, dates, DOIs.
- Set running text in `body` (19/31). It is large on purpose; readers spend twenty minutes at a time here.
- Each chapter has one `chapter-title`, then numbered `section-title`s (6.1, 6.2) and unnumbered `subsection`s. Never skip a level.
- The chapter numeral is Literata Light at 112px in the part colour, with optical size at its maximum.
- Keep reading text within `--measure` (about 66 characters). Headings use `text-wrap: balance`.
- Load the fonts from Google Fonts; `components/bundle.css` imports all three.

### Layout

- Wide screens: three columns. Table of contents (`--toc-width`) on the left, the reading column (`--measure`) in the middle, sidenotes (`--margin-column`) on the right.
- Below 960px the sidenotes drop beneath their paragraphs. Below 720px the contents become a slide-out panel opened from the top bar.
- Space with the scale: `space-6` between paragraphs, `space-8` above a section title, `space-12` between page regions.
- Corners are square (`radius-0`) on everything that holds content: figures, cards, panels. `radius-1` is for controls only, `radius-pill` for wavelength tags only.
- No shadows except `shadow-pop` on the phone sidenote popover. Separate things with `rule` hairlines and the `sunk` ground, never with shadow or a coloured left border.

### Imagery

- House diagrams: flat line drawings. Structure in `ink` at 2px, the light-sensitive layer in the chapter's part colour at 5–6px, lenses as `part-*-tint` fills. No gradients, no 3D, no glow.
- Diagram labels: `font-sans` (IBM Plex Sans Condensed) Regular at 13px in `ink`, sentence case, never capitals (decided 7 Nov 2026). Long labels break onto two lines rather than run into the next panel.
- Label leaders: straight 0.9px `ink` lines on a 3px `sunk` casing, so they read across dark fills without looking heavy. No dots or arrowheads. Place labels in columns at the edges of the drawing so leaders stay short and close to horizontal; a leader ends exactly on the part it names and never crosses label text.
- Charts: all text, including axis numbers and value labels, in `font-sans` at 13px; numbers use tabular figures (`font-variant-numeric: tabular-nums`). Mono is not used inside charts (decided 7 Nov 2026). Gridlines in `rule`, axes in `ink`, bars in `muted`.
- Photos: real animals and fossils only, openly licensed, credited in full under the figure. Never AI-generated images of animals or eyes.
- Every figure is numbered by chapter (FIG. 6.3) and captioned with what it shows, not what it is.

### Motion and interaction

- Pages do not animate in. Motion is reserved for teaching animations inside figures, which play only when the reader presses play.
- Links underline at 1px; hover darkens nothing and moves nothing. The focus ring is a solid 2px `accent` outline with a 2px offset, on every interactive element.
- Respect `prefers-reduced-motion`: teaching animations show their final frame and a step-through control.

## Iconography

- The book uses almost no icons. Direction is written as text arrows (← →). Menu, search and close in the top bar use simple 2px-stroke line icons drawn to match the house diagrams, in `ink`.
- No icon library is part of this system yet. Until one is chosen, use Lucide at 2px stroke, 20px, in `ink`, and flag each use for review.
- The book has no logo. The name is set in Literata Semibold, as on the cover.

## Components

Build pages from `ChapterOpener`, `Sidenote`, `Figure`, `ChapterNav` and `TableOfContents` for chapters; `AtlasCard` for the Atlas grid; `ClaimResponse` for the head of each claim page. Classes are prefixed `eb-` and live in `components/bundle.css`.

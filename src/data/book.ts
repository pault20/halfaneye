// The book's fixed shape (sitemap-and-phase-1.md). Numbers never change once published.
export interface Part {
  n: 1 | 2 | 3 | 4;
  nm: number; // peak sensitivity of the part's photoreceptor
  title: string;
  chapters: { n: number; title: string }[];
}

export const parts: Part[] = [
  {
    n: 1,
    nm: 420,
    title: 'Foundations',
    chapters: [
      { n: 1, title: 'What an eye does' },
      { n: 2, title: 'The toolkit' },
      { n: 3, title: 'The physics of seeing' },
    ],
  },
  {
    n: 2,
    nm: 498,
    title: 'From light patch to image',
    chapters: [
      { n: 4, title: 'Step by step' },
      { n: 5, title: 'Eyes in stone' },
      { n: 6, title: 'Our eyes' },
      { n: 7, title: 'Again and again' },
    ],
  },
  {
    n: 3,
    nm: 534,
    title: 'The diversity of eyes',
    chapters: [
      { n: 8, title: 'Camera eyes' },
      { n: 9, title: 'Compound eyes' },
      { n: 10, title: 'Mirror eyes' },
      { n: 11, title: 'Vision without eyes' },
      { n: 12, title: 'Colour' },
    ],
  },
  {
    n: 4,
    nm: 564,
    title: 'Imperfection and trade-off',
    chapters: [
      { n: 13, title: 'The inverted retina' },
      { n: 14, title: 'No perfect eye' },
      { n: 15, title: 'Losing eyes' },
      { n: 16, title: 'When human eyes fail' },
    ],
  },
];

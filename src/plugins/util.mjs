import { toString } from 'mdast-util-to-string';
export { toString };
export const html = (value) => ({ type: 'html', value });
export const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const frontmatter = (file) => file?.data?.astro?.frontmatter ?? {};

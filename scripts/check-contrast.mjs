// Fails the build when a colour pair in src/components/tokens.css is too faint to read (WCAG 2 contrast).
// Runs before `astro build` (see package.json). `node scripts/check-contrast.mjs [tokens.css]` prints every pair.
// To fix a failure: change the token's lightness in tokens.css until its line here passes.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = process.argv[2] ?? fileURLToPath(new URL('../src/components/tokens.css', import.meta.url));
const css = readFileSync(file, 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\b/g)].map(m => [m[1], m[2]]));

const lum = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };

// [text, ground, minimum]
const pairs = [
  ['paper-fg', 'paper', 4.5], ['paper-dim', 'paper', 4.5], ['accent-paper', 'paper', 4.5],
  ['ink-fg', 'ink', 4.5], ['accent-ink', 'ink', 4.5],
  ['k-poem', 'ink', 3], ['k-reflection', 'ink', 3], ['k-project', 'ink', 3], ['k-essay', 'ink', 3],
];

let failed = 0;
for (const [fg, bg, min] of pairs) {
  if (!tokens[fg] || !tokens[bg]) { console.error(`FAIL  --${fg} or --${bg} is missing from ${file} (or is not a #rrggbb value)`); failed++; continue; }
  const r = ratio(tokens[fg], tokens[bg]);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'}  --${fg} ${tokens[fg]} on --${bg} ${tokens[bg]}: ${r.toFixed(2)}:1 (needs ${min}:1)`);
}
if (failed) {
  console.error(`\n${failed} colour pair${failed === 1 ? '' : 's'} under the minimum. Change the lightness of the failing token in ${file}.`);
  process.exit(1);
}

// Prints the built /cv/ page to public/cv.pdf with a local headless Chromium.
// Run via `npm run cv` (which builds first). Set CHROME_PATH to use a specific browser.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  const candidates = existsSync(cache) ? readdirSync(cache).filter(d => d.startsWith('chromium_headless_shell-')).sort().reverse() : [];
  for (const dir of candidates) {
    const bin = join(cache, dir, 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
    if (existsSync(bin)) return bin;
  }
  const mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (existsSync(mac)) return mac;
  throw new Error('No Chromium found. Set CHROME_PATH to a Chrome or chrome-headless-shell binary.');
}

const page = resolve('dist/cv/index.html');
if (!existsSync(page)) throw new Error('dist/cv/index.html is missing; run `astro build` first.');
const out = resolve('public/cv.pdf');
execFileSync(findChrome(), ['--headless', '--no-pdf-header-footer', `--print-to-pdf=${out}`, `file://${page}`], { stdio: 'ignore' });

// The CV is meant to fit on one page; say so loudly if it doesn't.
const pages = (readFileSync(out, 'latin1').match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
console.log(`Wrote ${out} (${pages} page${pages === 1 ? '' : 's'})`);
if (pages > 1) console.warn('Warning: the CV runs past one page.');

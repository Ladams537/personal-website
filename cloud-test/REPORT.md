# Cloud screenshot feasibility test

**Result: it works.** The site builds and serves in this cloud container, a headless browser screenshots it, and Claude can open and read the PNGs.

## Browser launch
- `chromium.launch({ executablePath: '/usr/bin/google-chrome' })` **worked on the first try** (launch took 930 ms, Chrome 153.0.8010.12).
  `/usr/bin/google-chrome` is a small shell wrapper that runs the pre-installed `/opt/pw-browsers/chromium` (revision 1243) and adds `--no-sandbox` when running as root.
- Playwright 1.65.1 was installed with `npm i --prefix /tmp/pw playwright`. Its bundled Chromium would be revision 1255, which is not installed here, so the plain `chromium.launch()` probably would not have found a browser. That launch was never needed, so it was not tried.
- `npx playwright install chromium` was **not run** because it was not needed.

## Network mode
Outbound HTTPS goes through the environment's agent proxy (`HTTPS_PROXY`, `selective: false`). npm registry traffic bypasses the proxy (`registry.npmjs.org` is in `noProxy`). `localhost` bypasses it too, so the browser reached the preview server directly. Nothing was blocked.

## Timings
| Step | Time |
|---|---|
| Clone | done before the session started (not measured) |
| `npm ci` | 7 s |
| `npm run build` (contrast check + astro build, 97 pages) | 4 s (fallback not needed; the contrast check passed) |
| Preview server start (`npx astro preview --port 4321`) | about 1 s |
| `npm i --prefix /tmp/pw playwright` | 2 s |
| 8 full-page screenshots, including browser launch | 12.8 s |

## Blockers
None.

One finding, which is about the site rather than the environment: **the site has no dark mode.** `colorScheme: 'dark'` was applied (`matchMedia('(prefers-color-scheme: dark)')` returned `true`), but `src/` contains no `prefers-color-scheme` or `data-theme` rules. The dark shots therefore look the same as the light ones. The poem's light and dark PNGs are byte-identical. The home pairs differ by a few bytes only, probably from animation timing.

## Horizontal overflow at 375px
None. On both pages `scrollWidth` equals `clientWidth` (375), and no element extends past the right edge of the viewport. The same holds at 1280px.

## What each PNG shows
Pages: `/`, and `/poetry/withdrawal/` (which renders the poem titled "Taken Off Ice").
- `home-1280-light.png`: split hero with a dark "Building things." project list on the left and a pale "Finding the words." poem list, video card and latest links on the right. Below it are the "where they meet" pairings and the Almanac dial.
- `home-1280-dark.png`: looks the same as the light shot (no dark theme).
- `home-375-light.png`: the halves stack, with the dark projects block first, then the pale poetry block, then a dark "where they meet" and Almanac section. The nav is on one row and nothing is cut off.
- `home-375-dark.png`: looks the same as the 375 light shot.
- `poem-1280-light.png`: a centred single column showing the "Index / Poem" breadcrumb, the title "Taken Off Ice", a subtitle, the date 7 March 2026, tags, four stanzas, and older/newer links at the bottom, on a pale background.
- `poem-1280-dark.png`: byte-identical to the light shot.
- `poem-375-light.png`: the same poem with lines wrapping naturally inside the narrow column. Nothing is clipped and there is no sideways scroll.
- `poem-375-dark.png`: byte-identical to the 375 light shot.

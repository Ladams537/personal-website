# Personal website: lessons learned

### `hidden` attribute ignored on styled elements
* **Context:** The Index filter set `row.hidden = true`, but rows stayed visible, so filters and redirect-to-filter URLs looked broken in production. The same thing happened earlier with `<section hidden>` stat blocks.
* **Root Cause:** `[hidden]` is only a UA-stylesheet `display: none`, and any author rule that sets `display` (e.g. `.row { display: grid }`) wins. Checking `:not([hidden])` in tests counts the attribute, not what's actually visible.
* **Fix:** Add `.x[hidden] { display: none; }` (or a global `[hidden] { display: none !important; }`) whenever a styled element is toggled with `hidden`. Verify visibility with `el.offsetParent !== null` or a screenshot, not the attribute.

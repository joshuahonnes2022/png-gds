// Generates the downloadable developer assets into public/downloads/:
//   pngds.css      — tokens + all component styles in one file (for PHP/WordPress/plain HTML sites)
//   tokens.json    — design tokens (Tokens Studio / Figma Variables compatible structure)
//   starter.html   — a single-page HTML starter using the framework-independent classes
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/downloads');
mkdirSync(out, { recursive: true });

const tokensCss = readFileSync(resolve(root, 'src/lib/tokens/tokens.css'), 'utf8');
const compCss = readFileSync(resolve(root, 'src/lib/pngds.css'), 'utf8').replace(/@import\s+["'][^"']+["'];\s*/, '');
const utilCss = readFileSync(resolve(root, 'src/lib/utilities.css'), 'utf8');
const version = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')).version;

writeFileSync(resolve(out, 'pngds.css'), `/*! PNG Government Digital Design System v${version} | DICT | Single-file build */\n${tokensCss}\n${compCss}\n${utilCss}`);

// ---- tokens.json -------------------------------------------------------
const vars = {};
const rootBlock = tokensCss.split('@media')[0]; // ignore reduced-motion overrides
for (const m of rootBlock.matchAll(/--pngds-([a-z0-9-]+):\s*([^;]+);/g)) vars[m[1]] = m[2].trim();
const resolveVal = (v) => v.replace(/var\(--pngds-([a-z0-9-]+)\)/g, (_, k) => `{${k.replace(/-/g, '.')}}`);
const typeOf = (k) => (/^(red|gold|neutral|ocean|success|warning|error|info|color)-/.test(k) ? 'color'
  : k.startsWith('space') ? 'spacing' : k.startsWith('radius') ? 'borderRadius' : k.startsWith('font-size') ? 'fontSizes'
  : k.startsWith('font-weight') ? 'fontWeights' : k.startsWith('line-height') ? 'lineHeights' : k.startsWith('font-') ? 'fontFamilies'
  : k.startsWith('shadow') ? 'boxShadow' : 'other');
const tree = {};
for (const [k, v] of Object.entries(vars)) {
  const parts = k.split('-'); let node = tree;
  // group e.g. "font-size-md" -> font-size.md, "red-500" -> red.500
  const groupLen = /^(font-size|font-weight|line-height|border-width|color-text|color-bg|color-border|color-link|color-focus|color-primary)/.test(k) ? 2 : 1;
  const path = [parts.slice(0, groupLen).join('-'), ...parts.slice(groupLen)];
  if (path.length === 1) path.push('default');
  path.slice(0, -1).forEach((p) => { node = node[p] ??= {}; });
  node[path.at(-1)] = { value: resolveVal(v), type: typeOf(k) };
}
writeFileSync(resolve(out, 'tokens.json'), JSON.stringify({ $metadata: { name: 'PNG-GDS', version }, pngds: tree }, null, 2));

// ---- starter.html --------------------------------------------------------
writeFileSync(resolve(out, 'starter.html'), `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Agency name | Government of Papua New Guinea</title>
  <link rel="stylesheet" href="pngds.css">
  <link rel="icon" href="/favicon.ico">
</head>
<body class="pngds">
  <a class="pngds-skip-link" href="#main">Skip to main content</a>

  <section class="pngds-masthead" aria-label="Official government website">
    <div class="pngds-stripe"></div>
    <div class="pngds-container">
      <div class="pngds-masthead__inner">
        <span class="pngds-masthead__badge"><img src="crest-badge.png" alt=""></span>
        <span>An official website of the Government of Papua New Guinea</span>
      </div>
    </div>
  </section>

  <header class="pngds-header">
    <div class="pngds-container pngds-header__inner">
      <a class="pngds-header__brand" href="/">
        <img class="pngds-header__crest" src="png-crest.png" alt="Papua New Guinea National Crest">
        <span class="pngds-header__divider" aria-hidden="true"></span>
        <span class="pngds-header__titles">
          <span class="pngds-header__gov">Government of Papua New Guinea</span>
          <span class="pngds-header__agency">Department name</span>
        </span>
      </a>
    </div>
  </header>

  <nav class="pngds-nav" aria-label="Main">
    <div class="pngds-container" style="padding-inline:0">
      <ul class="pngds-nav__list" data-open="true">
        <li><a class="pngds-nav__link" href="/" aria-current="page">Home</a></li>
        <li><a class="pngds-nav__link" href="/services">Services</a></li>
        <li><a class="pngds-nav__link" href="/news">News</a></li>
        <li><a class="pngds-nav__link" href="/about">About us</a></li>
        <li><a class="pngds-nav__link" href="/contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main id="main" class="pngds-container" style="padding-block:2rem">
    <h1 class="pngds-h1">Page title</h1>
    <p class="pngds-lead">One or two sentences that explain what this page is for.</p>

    <div class="pngds-alert">
      <div class="pngds-alert__body">
        <p class="pngds-alert__title">Information</p>
        <p>Replace this starter content with your own.</p>
      </div>
    </div>

    <form novalidate>
      <div class="pngds-field">
        <label class="pngds-label" for="name">Full name</label>
        <span class="pngds-hint" id="name-hint">As shown on your ID card</span>
        <input class="pngds-input" id="name" name="name" autocomplete="name" aria-describedby="name-hint">
      </div>
      <button class="pngds-btn" type="submit">Continue</button>
    </form>
  </main>

  <footer class="pngds-footer">
    <div class="pngds-stripe"></div>
    <div class="pngds-container">
      <div class="pngds-footer__bottom">
        <span>&copy; ${new Date().getFullYear()} Government of Papua New Guinea</span>
        <span><a href="/privacy">Privacy</a> &middot; <a href="/accessibility">Accessibility</a></span>
      </div>
    </div>
  </footer>
</body>
</html>
`);

// Official artwork alongside the starter page
for (const f of ['png-crest.png', 'dict-logo.png', 'crest-badge.png']) {
  const from = resolve(root, 'public/assets', f);
  if (existsSync(from)) copyFileSync(from, resolve(out, f));
}

console.log(`PNG-GDS assets written to public/downloads (v${version})`);

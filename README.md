# PNG Government Digital Design System (PNG-GDS) — v0.2.0

Whole-of-government design system for Papua New Guinea Government websites and digital services.
Owned by the Department of Information and Communications Technology (DICT), Digital Service Design and User Experience Standards.

This project contains **two things in one codebase**:

| Folder | What it is |
|---|---|
| `src/lib/` | **The design system** — design tokens (DICT brand colours), `pngds.css`, `utilities.css` (generated from `utilities.spec.js`), and the React component library (32 components incl. mega-menu, grid, section, pictograms, dialog). This is what agencies reuse. |
| `src/docs/` | **The documentation website** — Get started, Core styles, Components (8 groups), Utility classes (15), Methods, Templates, Guidelines, Governance. |
| `scripts/build-utilities.mjs` | Generates `src/lib/utilities.css` from `src/lib/utilities.spec.js` (runs automatically on dev/build). |
| `scripts/build-assets.mjs` | Generates `public/downloads/` — single-file `pngds.css`, `tokens.json` (Figma/Tokens Studio), `starter.html` for PHP/WordPress/HTML sites. |

---

## Host on XAMPP

> **Blank page?** You copied the source project. Apache needs the **built** files: the contents of `dist/` (or the ready-made `pngds-xampp.zip`), not this whole folder. `localhost/pngds/` must contain `index.html` **and** an `assets/` folder — no `src/`, no `package.json`.

### Option A — use the pre-built site (no Node needed)
1. Copy everything inside the `dist/` folder into `C:\xampp\htdocs\pngds\`
2. Start **Apache** in the XAMPP Control Panel.
3. Open **http://localhost/pngds/**

The build uses relative paths (`base: './'`) and hash URLs (`/pngds/#/components/button`), so it works in **any** htdocs sub-folder with no `.htaccess` or Apache rewrite rules.

### Option B — build it yourself
Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # development server with live reload → http://localhost:5173
npm run build      # production build → dist/
```
Then copy `dist/*` to `C:\xampp\htdocs\pngds\` as above.

> Tip: to rebuild straight into XAMPP, run `npx vite build --outDir C:/xampp/htdocs/pngds --emptyOutDir`

### Optional — clean URLs instead of `#/`
1. In `src/main.jsx`, replace `HashRouter` with `BrowserRouter basename="/pngds"`.
2. In `vite.config.js`, set `base: '/pngds/'`.
3. Add `dist/.htaccess` (requires `mod_rewrite`, enabled by default in XAMPP):
   ```apache
   RewriteEngine On
   RewriteBase /pngds/
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /pngds/index.html [L]
   ```

---

## Using the design system in an agency project

**React:** copy `src/lib/` into the project, then
```jsx
import { LanguageProvider, Masthead, Header, Button } from './lib';
import './lib/pngds.css';
```

**PHP / WordPress / plain HTML:** link `downloads/pngds.css` and use the `pngds-` classes. Each component page on the docs site has an **HTML** tab with the exact markup.

## Before production — to do

- **National Crest:** a labelled placeholder is shown. Supply the official crest file and pass it as `crestSrc` to `<Header>` (or replace `<Crest>` in `src/lib/components/Layout.jsx`). Do not redraw the crest.
- **Tok Pisin review:** strings in `src/lib/i18n.jsx` and the Guidelines page are a working draft — have them reviewed by a qualified Tok Pisin editor.
- **Formal adoption:** the WCAG 2.2 AA target, colour palette and roadmap status are proposals pending DICT Senior Management approval. Roadmap phase status is set in `src/docs/pages/Governance.jsx`.
- **Figma UI kit:** import `public/downloads/tokens.json` with Tokens Studio to start the Figma library (Phase 3).
- **Examples:** demo pages use `example.gov.pg` addresses and fictional data.

## Project structure

```
src/
  lib/                     ← the design system
    tokens/tokens.css      ← all design tokens (single source of truth)
    pngds.css              ← component styles (framework-independent)
    i18n.jsx               ← English / Tok Pisin component strings
    components/            ← Icon, Layout, Actions, Forms, Content
    index.js               ← public exports
  docs/                    ← documentation website
    data/components.jsx    ← component registry (guidance, examples, props)
    data/nav.js            ← navigation and search index
    pages/                 ← Home, GetStarted, Foundations, Components, Patterns,
                             Templates, Guidelines, Governance, Search
  App.jsx, main.jsx
scripts/build-assets.mjs   ← generates public/downloads/*
```

## Adding a component
1. Build it in `src/lib/components/` using only `var(--pngds-…)` tokens; add CSS to `pngds.css`.
2. Export it from `src/lib/index.js`.
3. Add an entry to `src/docs/data/components.jsx` (summary, when to use, examples, props, accessibility, do's/don'ts). The page, navigation, search and HTML snippet are generated automatically.

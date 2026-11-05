import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Header, Icon, iconNames, Table, Tag, TextLink, Masthead } from '../../lib';
import { PageHead, CodeBlock, DoDont, Example } from '../DocUI.jsx';
import NotFound from './NotFound.jsx';
import { CREST, DICT_LOGO, CREST_BADGE } from '../assets.js';

/* ---- contrast utils ---- */
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const bestText = (hex) => (contrast(hex, '#FFFFFF') >= contrast(hex, '#1A1A1A') ? '#FFFFFF' : '#1A1A1A');

const palettes = {
  'Deep Orange — DICT primary': [['orange-50', '#FBEDEB'], ['orange-100', '#F6D4CF'], ['orange-200', '#EBA89F'], ['orange-500', '#D55345'], ['orange-600', '#B8412F'], ['orange-700', '#9C3628'], ['orange-800', '#6E2419']],
  'Orange — DICT primary (gradient partner)': [['amber-100', '#FDE5D3'], ['amber-400', '#ED7D31'], ['amber-700', '#A4521A']],
  'Navy — DICT primary': [['navy-50', '#E9EDF5'], ['navy-100', '#C8D2E6'], ['navy-600', '#2C4A80'], ['navy-700', '#203864'], ['navy-800', '#172A4D'], ['navy-900', '#0F1D36']],
  'DICT secondary colours': [['yellow-400', '#FFFF00'], ['yellow-300', '#FFF35A'], ['yellow-50', '#FFFDE0'], ['teal-500', '#2C9EAA'], ['blue-500', '#2E75B6'], ['purple-500', '#793F43'], ['grey-500', '#7F7F7F']],
  'Neutrals': [['neutral-0', '#FFFFFF'], ['neutral-50', '#F7F7F5'], ['neutral-100', '#EEEEEA'], ['neutral-200', '#DDDCD6'], ['neutral-300', '#C2C1BA'], ['neutral-500', '#6F6E68'], ['neutral-600', '#55544F'], ['neutral-700', '#3F3E3A'], ['neutral-800', '#2B2A27'], ['neutral-900', '#1A1A1A']],
  'Links and information (DICT blue)': [['ocean-50', '#EAF2FA'], ['ocean-100', '#CFE0F1'], ['ocean-600', '#2E75B6'], ['ocean-700', '#245E93'], ['ocean-800', '#1B4672']],
  'Status': [['success-50', '#E7F4EB'], ['success-600', '#1E7B3A'], ['success-800', '#12502A'], ['warning-50', '#FFF4D6'], ['warning-500', '#E0A100'], ['warning-800', '#6B4700'], ['error-50', '#FDECEA'], ['error-600', '#B42318'], ['error-800', '#7A1810']],
};

function Swatches({ list }) {
  const [copied, setCopied] = useState('');
  return (
    <div className="docs-swatches">
      {list.map(([name, hex]) => {
        const cw = contrast(hex, '#FFFFFF');
        return (
          <button type="button" className="docs-swatch" key={name} onClick={() => { navigator.clipboard?.writeText(`var(--pngds-${name})`); setCopied(name); setTimeout(() => setCopied(''), 1400); }}
            aria-label={`${name} ${hex}. Contrast with white ${cw.toFixed(1)} to 1. Copy token`}>
            <span className="docs-swatch__chip" style={{ background: hex, color: bestText(hex), borderBottom: hex === '#FFFFFF' ? '1px solid var(--pngds-color-border)' : 0 }}>Aa</span>
            <span className="docs-swatch__meta">
              <strong>{copied === name ? 'Copied ✓' : name}</strong>
              <code>{hex}</code>
              <code>{cw.toFixed(2)}:1 on white {cw >= 4.5 ? '· AA' : cw >= 3 ? '· AA large/UI' : ''}</code>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Colour() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Colour" lead="Taken from the DICT Brand Strategy: deep orange and orange (the logo gradient) and navy as primary colours, with yellow, green, blue and purple as secondary colours. Every text pairing is checked for WCAG 2.2 AA contrast." />
      <Alert title="Select a swatch to copy its token">
        <p>Use role tokens such as <code className="docs-inline">--pngds-color-primary</code> in components rather than palette values, so themes can change safely.</p>
      </Alert>
      {Object.entries(palettes).map(([title, list]) => (
        <section key={title}><h2 className="pngds-h3">{title}</h2><Swatches list={list} /></section>
      ))}
      <h2 className="pngds-h2">Role tokens</h2>
      <Table caption="Colour roles" columns={[{ key: 't', label: 'Token' }, { key: 'v', label: 'Maps to' }, { key: 'u', label: 'Use for' }]} render={{ t: (v) => <code className="docs-inline">{v}</code> }} rows={[
        { t: '--pngds-color-text', v: 'neutral-900', u: 'Body text and headings' },
        { t: '--pngds-color-text-secondary', v: 'neutral-600', u: 'Hints, captions, metadata (7.6:1)' },
        { t: '--pngds-color-primary', v: 'navy-700', u: 'Buttons and main actions (11.6:1 with white)' },
        { t: '--pngds-color-brand', v: 'orange-500', u: 'Banners, highlights, active indicators — large white text only (4.1:1)' },
        { t: '--pngds-color-brand-text', v: 'orange-600', u: 'Orange text on white (5.5:1)' },
        { t: '--pngds-color-brand-gradient', v: 'orange-500 → amber-400', u: 'Logo gradient: identity stripe, decorative bands' },
        { t: '--pngds-color-accent', v: 'yellow-400', u: 'Call-to-action accents on navy or dark backgrounds only' },
        { t: '--pngds-color-link', v: 'ocean-600 (DICT blue)', u: 'Links (4.8:1)' },
        { t: '--pngds-color-focus', v: 'yellow-400', u: 'Focus ring — paired with a dark outline' },
        { t: '--pngds-color-border-input', v: 'neutral-600', u: 'Form control borders (meets 3:1 non-text contrast)' },
      ]} />
      <h2 className="pngds-h2">Using colour well</h2>
      <DoDont
        dos={['Use navy for buttons and deep orange for banners and active indicators.', 'Use the orange gradient as the brand’s signature, as in the DICT logo.', 'Put yellow on navy or dark backgrounds only.', 'Always pair status colour with an icon or word.']}
        donts={['Don’t put normal-size white text on #D55345 — it is 4.1:1, AA for large text only.', 'Don’t use yellow or orange (#ED7D31) text on white.', 'Don’t rely on colour alone to show errors or status.']} />
    </>
  );
}

export function Typography() {
  const scale = [
    ['Display', 'pngds-display', '48px / 800', 'Home page hero only'],
    ['Heading 1', 'pngds-h1', '38px / 700', 'One per page'],
    ['Heading 2', 'pngds-h2', '30px / 700', 'Page sections'],
    ['Heading 3', 'pngds-h3', '24px / 700', 'Sub-sections'],
    ['Heading 4', 'pngds-h4', '20px / 700', 'Minor headings'],
    ['Lead', 'pngds-lead', '20px / 400', 'Intro paragraph under the H1'],
    ['Body', '', '17px / 400 / 1.6', 'All running text'],
    ['Small', 'pngds-small', '15px / 400', 'Secondary information'],
    ['Caption', 'pngds-caption', '13px / 400', 'Metadata, labels under images'],
  ];
  return (
    <>
      <PageHead eyebrow="Core styles" title="Typography" lead="A system font stack — Noto Sans where available, otherwise the device’s own UI font. No font files to download, perfect rendering of Tok Pisin and local-language characters." />
      <CodeBlock lang="css" code={`--pngds-font-sans: "Noto Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, system-ui, sans-serif;\n/* Body: 17px (1.0625rem), line-height 1.6, max line length 68ch */`} />
      <h2 className="pngds-h2">Type scale</h2>
      <div>
        {scale.map(([n, cls, spec, use]) => (
          <div className="docs-type-row" key={n}>
            <div><strong>{n}</strong><br /><code>{cls ? `.${cls}` : 'body'} · {spec}</code><br /><span className="pngds-caption">{use}</span></div>
            <div className={cls} style={{ margin: 0 }}>Serving every Papua New Guinean</div>
          </div>
        ))}
      </div>
      <h2 className="pngds-h2">Guidance</h2>
      <DoDont dos={['Use sentence case for headings and buttons.', 'Keep lines under 68 characters for reading comfort.', 'Use headings in order (H1 → H2 → H3) — never skip levels for style.']}
        donts={['Don’t load custom web fonts on service pages.', 'Don’t use ALL CAPS for sentences.', 'Don’t set body text below 16px.']} />
    </>
  );
}

export function Spacing() {
  const sp = [[1, 4], [2, 8], [3, 12], [4, 16], [5, 24], [6, 32], [7, 48], [8, 64], [9, 96]];
  return (
    <>
      <PageHead eyebrow="Core styles" title="Spacing and layout" lead="A 4-pixel spacing scale, a single content container and four breakpoints keep layouts aligned across every service." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Spacing scale</h2>
      <Table caption="Spacing tokens" columns={[{ key: 't', label: 'Token' }, { key: 'px', label: 'Pixels', numeric: true }, { key: 'v', label: 'Visual' }]}
        rows={sp.map(([n, px]) => ({ t: `--pngds-space-${n}`, px, v: px }))}
        render={{ t: (v) => <code className="docs-inline">{v}</code>, v: (px) => <div className="docs-space-bar" style={{ width: px }} /> }} />
      <h2 className="pngds-h2">Breakpoints</h2>
      <Table caption="Breakpoints (mobile-first, min-width)" columns={[{ key: 'n', label: 'Name' }, { key: 'w', label: 'Min width' }, { key: 'd', label: 'Devices' }]} rows={[
        { n: 'base', w: '0', d: 'All phones — design here first (test at 360px)' },
        { n: 'sm', w: '36rem / 576px', d: 'Large phones' },
        { n: 'md', w: '48rem / 768px', d: 'Tablets — main navigation expands' },
        { n: 'lg', w: '64rem / 1024px', d: 'Laptops — side navigation appears' },
        { n: 'xl', w: '80rem / 1280px', d: 'Desktops' },
      ]} />
      <h2 className="pngds-h2">Container and grid</h2>
      <p className="pngds-body">Content sits in <code className="docs-inline">.pngds-container</code> (max 1216px, 16px gutters on phones, 24px from tablet). Card grids use <code className="docs-inline">.pngds-grid</code>, which automatically fits as many 256px columns as the screen allows — no breakpoint code needed.</p>
      <h2 className="pngds-h2">Touch targets</h2>
      <p className="pngds-body">All interactive elements are at least <strong>44 × 44px</strong> (<code className="docs-inline">--pngds-touch-target</code>), exceeding the WCAG 2.2 minimum of 24px. Many users operate phones one-handed, outdoors or on the move.</p>
    </>
  );
}

export function Icons() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Icons" lead={`${iconNames.length} simple line icons drawn on a 24px grid. Inline SVG means no extra downloads, and they inherit text colour.`} />
      <div className="docs-swatches" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(7.5rem, 1fr))' }}>
        {iconNames.map((n) => (
          <div key={n} className="docs-swatch" style={{ cursor: 'default', textAlign: 'center', padding: '16px 8px' }}>
            <Icon name={n} size={28} /><div style={{ marginTop: 8 }}><code style={{ fontFamily: 'var(--pngds-font-mono)', fontSize: 12 }}>{n}</code></div>
          </div>
        ))}
      </div>
      <CodeBlock lang="jsx" code={`import { Icon } from './lib';\n\n<Icon name="search" />                          // decorative\n<Icon name="warning" title="Warning" />         // meaningful (announced)`} />
      <DoDont dos={['Always pair icons with a text label.', 'Use the same icon for the same meaning across services.']} donts={['Don’t use icons as the only way to convey meaning.', 'Don’t mix icon styles from other libraries.']} />
    </>
  );
}

export function Tokens() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Design tokens" lead="Tokens are the single source of truth for colour, type, spacing, radius, shadow and motion. Designers and developers use the same names." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Naming</h2>
      <p className="pngds-body"><code className="docs-inline">--pngds-[category]-[property]-[variant]</code>. Palette tokens (<code className="docs-inline">--pngds-red-500</code>) hold raw values; role tokens (<code className="docs-inline">--pngds-color-primary</code>) say what a value is for. Components only use role tokens.</p>
      <CodeBlock lang="css" code={`.my-agency-panel {\n  padding: var(--pngds-space-5);\n  border-left: 6px solid var(--pngds-color-primary);\n  background: var(--pngds-color-bg-subtle);\n  border-radius: var(--pngds-radius-md);\n  font-size: var(--pngds-font-size-md);\n}`} />
      <h2 className="pngds-h2">Formats</h2>
      <Table caption="Token formats" columns={[{ key: 'f', label: 'Format' }, { key: 'w', label: 'Where' }, { key: 'u', label: 'Use in' }]} rows={[
        { f: 'CSS custom properties', w: 'src/lib/tokens/tokens.css', u: 'Any website' },
        { f: 'JSON', w: <TextLink href="downloads/tokens.json" download>downloads/tokens.json</TextLink>, u: 'Figma (Tokens Studio / Variables), build tools, mobile apps' },
      ]} />
      <h2 className="pngds-h2">Other tokens</h2>
      <Table caption="Shape, elevation and motion" columns={[{ key: 't', label: 'Token' }, { key: 'v', label: 'Value' }]} render={{ t: (v) => <code className="docs-inline">{v}</code> }} rows={[
        { t: '--pngds-radius-sm / md / lg / pill', v: '4px / 8px / 12px / 999px' },
        { t: '--pngds-shadow-1 / 2 / 3', v: 'Subtle → overlay elevation' },
        { t: '--pngds-duration-fast / base', v: '120ms / 200ms (0ms with prefers-reduced-motion)' },
        { t: '--pngds-touch-target', v: '44px' },
        { t: '--pngds-measure', v: '68ch' },
      ]} />
    </>
  );
}

export function Branding() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Government digital identity" lead="Every PNG Government website must be instantly recognisable as official. Three elements do this: the brand stripe, the Masthead and the Government header with the National Crest." />
      <Example title="The identity block (Masthead + Header)" flush html={false}>
        <Masthead badgeSrc={CREST_BADGE} /><Header crestSrc={CREST} logoSrc={DICT_LOGO} logoAlt="Department of Information and Communications Technology" agency="Department of Information and Communications Technology" />
      </Example>
      <h2 className="pngds-h2">Elements</h2>
      <Table caption="Identity elements" columns={[{ key: 'e', label: 'Element' }, { key: 'r', label: 'Rule' }, { key: 's', label: 'Status' }]} render={{ s: (v) => <Tag variant={v === 'Mandatory' ? 'error' : 'info'}>{v}</Tag> }} rows={[
        { e: 'Brand stripe', r: 'DICT orange gradient band at the very top and above the footer.', s: 'Mandatory' },
        { e: 'Masthead', r: '“An official website of the Government of Papua New Guinea” with the explanation panel.', s: 'Mandatory' },
        { e: 'National Crest', r: 'Official artwork only, at least 40px tall, on a white background, never altered.', s: 'Mandatory' },
        { e: 'Agency name', r: 'Full legal name, next to the crest, separated by a vertical rule.', s: 'Mandatory' },
        { e: 'Agency logo', r: 'Optional, in the header actions area, max 48px tall.', s: 'Optional' },
        { e: 'Digital Government Program logo', r: 'Right of the header on desktop, where the agency is part of the program.', s: 'Optional' },
      ]} />
      <h2 className="pngds-h2">Controlled agency branding</h2>
      <p className="pngds-body">Agencies show their identity through their name, an approved logo and their own photography. They do <strong>not</strong> change the national colours, typography or component styles. This keeps every service familiar to citizens while letting each agency be recognised.</p>
      <DoDont dos={['Use real photos of PNG people and places, compressed for the web (under 150 KB).', 'Use the agency name exactly as gazetted.']}
        donts={['Don’t introduce agency colour schemes for buttons or links.', 'Don’t place the crest over photos or coloured backgrounds.', 'Don’t use clip-art or stock imagery of other countries.']} />
    </>
  );
}

const pages = { colour: Colour, typography: Typography, spacing: Spacing, icons: Icons, tokens: Tokens, branding: Branding };

export default function Foundations() {
  const { slug } = useParams();
  const P = pages[slug];
  return P ? <P /> : <NotFound />;
}

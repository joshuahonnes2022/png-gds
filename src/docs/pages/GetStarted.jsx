import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Alert, Button, ButtonGroup, Card, CardGrid, Table, TextLink, Tag, Icon, Callout } from '../../lib';
import { PageHead, CodeBlock, Checklist, DoDont } from '../DocUI.jsx';
import { CREST_BADGE } from '../assets.js';

function Intro() {
  return (
    <>
      <PageHead eyebrow="Get started" title="Using the PNG Government Digital Design System"
        lead="The PNG-GDS gives every government agency the same foundations, components and patterns, so citizens get one consistent, accessible experience across all government digital services." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Who should use it</h2>
      <p className="pngds-body">All national departments, statutory authorities, provincial and district administrations, and the ICT contractors who build websites, portals and apps for them.</p>
      <CardGrid>
        <Card href="/get-started/ecosystem" LinkComponent={Link} eyebrow="Overview" title="Our ecosystem" highlight>How identity, foundations, components, patterns and templates fit together.</Card>
        <Card href="/get-started/developers" LinkComponent={Link} eyebrow="Build" title="For developers">Install the React library, or link one CSS file in a PHP, WordPress or HTML site.</Card>
        <Card href="/get-started/designers" LinkComponent={Link} eyebrow="Design" title="For designers">Tokens, specs and component anatomy to design consistent services.</Card>
        <Card href="/get-started/downloads" LinkComponent={Link} eyebrow="Download" title="Downloads">Stylesheet, design tokens (JSON) and an HTML starter page.</Card>
      </CardGrid>

      <h2 className="pngds-h2">How adoption works</h2>
      <ol className="pngds-body" style={{ paddingLeft: '1.25rem', display: 'grid', gap: 8 }}>
        <li><strong>New builds</strong> must use the PNG-GDS from the start.</li>
        <li><strong>Existing websites</strong> adopt in stages: Masthead and Header first, then forms and content components at the next major update.</li>
        <li><strong>Agency branding</strong> appears in the header (agency name and approved logo). Colours, type and components stay national.</li>
        <li><strong>Compliance</strong> is checked against the Digital Services Register during DICT’s website and e-services maturity assessments.</li>
      </ol>

      <h2 className="pngds-h2">Minimum requirements for every government site</h2>
      <Checklist items={[
        <>Masthead (<TextLink as={Link} href="/components/masthead">official banner</TextLink>) on every page</>,
        <>Standard <TextLink as={Link} href="/components/header">Government header</TextLink> with the official National Crest</>,
        'A .gov.pg domain served over HTTPS',
        'Skip link, visible focus states and keyboard access throughout',
        'Accessibility statement and privacy notice linked from the footer',
        'Mobile-first layouts tested at 360px width',
        'Forms built from PNG-GDS form components with an Error summary',
      ]} />

      <Alert title="This is version 0.1 (pilot)">
        <p>The system is in the pilot phase. Components marked <Tag variant="warning">Beta</Tag> may change. Send feedback through the <TextLink as={Link} href="/governance/contribute">contribution process</TextLink>.</p>
      </Alert>
    </>
  );
}

function Developers() {
  return (
    <>
      <PageHead eyebrow="Get started" title="For developers" lead="Two ways to use PNG-GDS: the React component library, or the framework-independent CSS for any HTML, PHP or WordPress site." />

      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Option 1 — React</h2>
      <p className="pngds-body">Copy the <code className="docs-inline">src/lib</code> folder from this project into your app (an npm package will follow once the pilot ends). Import the stylesheet once, wrap your app in the language provider, then use components.</p>
      <CodeBlock lang="jsx" code={`// main.jsx
import { LanguageProvider } from './lib';
import './lib/pngds.css';

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);

// App.jsx
import { SkipLink, Masthead, Header, MainNav, Footer, Button, TextInput } from './lib';

export default function App() {
  return (
    <div className="pngds">
      <SkipLink />
      <Masthead badgeSrc={CREST_BADGE} />
      <Header agency="Department of Lands and Physical Planning" crestSrc="/png-crest.svg" />
      <MainNav items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }]} currentPath="/" />
      <main id="main" className="pngds-container">
        <h1 className="pngds-h1">Apply for a land title search</h1>
        <TextInput label="Title reference number" width="medium" />
        <Button type="submit">Continue</Button>
      </main>
      <Footer columns={[]} bottom={<span>© 2026 Government of Papua New Guinea</span>} />
    </div>
  );
}`} />

      <h2 className="pngds-h2">Option 2 — Plain HTML, PHP or WordPress</h2>
      <p className="pngds-body">Link the single-file stylesheet and use the <code className="docs-inline">pngds-</code> classes. Every component page has an <strong>HTML</strong> tab showing the exact markup.</p>
      <CodeBlock lang="html" code={`<link rel="stylesheet" href="/assets/pngds/pngds.css">

<body class="pngds">
  <a class="pngds-skip-link" href="#main">Skip to main content</a>
  …
  <button class="pngds-btn" type="submit">Submit application</button>
  <button class="pngds-btn pngds-btn--secondary" type="button">Save and continue later</button>
</body>`} />
      <ButtonGroup>
        <Button href="downloads/pngds.css" download variant="secondary" iconStart="download">pngds.css</Button>
        <Button href="downloads/starter.html" download variant="secondary" iconStart="download">starter.html</Button>
      </ButtonGroup>

      <h2 className="pngds-h2">Run this documentation site locally (XAMPP)</h2>
      <CodeBlock lang="bash" code={`# 1. Install Node.js 20+ then, in the project folder:
npm install
npm run dev          # live development at http://localhost:5173

# 2. Build for XAMPP
npm run build        # outputs to /dist

# 3. Copy the contents of /dist to C:\\xampp\\htdocs\\pngds\\
#    then open http://localhost/pngds/`} />

      <h2 className="pngds-h2">Rules for code</h2>
      <Table caption="Coding conventions" columns={[{ key: 'r', label: 'Rule' }, { key: 'w', label: 'Why' }]} rows={[
        { r: 'Use tokens (var(--pngds-…)), never hard-coded hex values', w: 'One change updates every service' },
        { r: 'Don’t override component CSS; extend with your own class', w: 'Upgrades stay safe' },
        { r: 'Keep JavaScript optional where possible', w: 'Pages must work on slow or failed connections' },
        { r: 'Test with keyboard only and a screen reader (NVDA / TalkBack)', w: 'WCAG 2.2 AA' },
        { r: 'Prefix custom classes with your agency code (e.g. .dlpp-)', w: 'Avoids clashes with pngds- classes' },
      ]} />
    </>
  );
}

function Designers() {
  return (
    <>
      <PageHead eyebrow="Get started" title="For designers" lead="Design with the same tokens and components developers build with, so what you design is what gets shipped." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Your toolkit</h2>
      <CardGrid>
        <Card href="/core/tokens" LinkComponent={Link} eyebrow="Tokens" title="Design tokens">Import tokens.json into Figma with Tokens Studio, or create Figma Variables from it.</Card>
        <Card href="/core/colour" LinkComponent={Link} eyebrow="Core styles" title="Colour and contrast">Every pairing is pre-checked for WCAG 2.2 AA.</Card>
        <Card href="/components" LinkComponent={Link} eyebrow="Library" title="Component specs">Each page includes when to use it, states, accessibility and do’s and don’ts.</Card>
      </CardGrid>
      <Alert title="Figma UI Kit">
        <p>Design with the official PNG-GDS libraries in Figma. See the <TextLink as={Link} href="/get-started/figma-ui-kit">Figma UI Kit</TextLink> page for what’s included and how to set it up.</p>
      </Alert>
      <h2 className="pngds-h2">Design principles</h2>
      <Checklist items={[
        'Start with user needs — research with real citizens, including in provinces and districts.',
        'Design for a 360px phone screen first, then scale up.',
        'Do less: one thing per page in transactional services.',
        'Make it accessible from the start, not at the end.',
        'Write in plain English and provide Tok Pisin for core services.',
        'Reuse before creating — check the library before designing a new component.',
      ]} />
    </>
  );
}

function Downloads() {
  const files = [
    { f: 'pngds.css', d: 'Tokens and all component styles in one file. For HTML, PHP and WordPress sites.', t: 'CSS' },
    { f: 'tokens.json', d: 'Design tokens for Figma (Tokens Studio) and build tools.', t: 'JSON' },
    { f: 'starter.html', d: 'A one-page starter with masthead, header, navigation, form and footer.', t: 'HTML' },
  ];
  return (
    <>
      <PageHead eyebrow="Get started" title="Downloads" lead="Resources generated from the same source code as this site, so they are always in sync." />
      <Table caption="Available downloads" columns={[{ key: 'f', label: 'File' }, { key: 't', label: 'Type' }, { key: 'd', label: 'Description' }, { key: 'a', label: 'Download' }]}
        rows={files.map((x) => ({ ...x, a: x.f }))}
        render={{ f: (v) => <code className="docs-inline">{v}</code>, t: (v) => <Tag variant="info" plain>{v}</Tag>, a: (v) => <TextLink href={`downloads/${v}`} download>Download<span className="pngds-visually-hidden"> {v}</span></TextLink> }} />
      <Alert title="National Crest and DICT logo">
        <p>The official artwork is in the site’s <code className="docs-inline">assets/</code> folder (<code className="docs-inline">png-crest.png</code>, <code className="docs-inline">dict-logo.png</code>). Pass it to the Header with <code className="docs-inline">crestSrc</code> and <code className="docs-inline">logoSrc</code>. Never redraw, recolour or stretch the crest.</p>
      </Alert>
    </>
  );
}

/* ======================== Our ecosystem ======================== */
const ecoCols = [
  { k: 'identity', t: 'Digital identity', d: 'PNG Government branding: crest, masthead and brand stripe.', href: '/core/logo' },
  { k: 'foundations', t: 'Core styles', d: 'Colour, typography, grid, layout and tokens.', href: '/core/colour' },
  { k: 'components', t: 'Components', d: 'Reusable, accessible interface building blocks.', href: '/components' },
  { k: 'patterns', t: 'Methods', d: 'Guidance for common citizen tasks and service journeys.', href: '/methods/multi-step-form' },
  { k: 'templates', t: 'Templates', d: 'Page layouts combining foundations and components.', href: '/templates' },
];
const pillars = [
  ['people', 'Built-in accessibility'], ['globe', 'UX, content and Tok Pisin'], ['phone', 'Mobile-first, low bandwidth'], ['code', 'Design and code resources'],
];

export function EcosystemDiagram() {
  return (
    <figure className="eco" aria-labelledby="eco-cap">
      <div className="eco__cols">
        {ecoCols.map((c) => (
          <div key={c.k} className={`eco__col eco__col--${c.k}`}>
            <h3><Link to={c.href}>{c.t}</Link></h3>
            <p>{c.d}</p>
          </div>
        ))}
        <div className="eco__brand">Foundation for national brand compliance</div>
      </div>
      <div className="eco__base">
        <div className="eco__weave" aria-hidden="true" />
        <ul className="eco__pillars" aria-label="Built into every layer">
          {pillars.map(([i, t]) => <li key={t}><Icon name={i} />{t}</li>)}
        </ul>
        <div className="eco__weave" aria-hidden="true" />
      </div>
      <figcaption id="eco-cap" className="pngds-caption eco__caption">The PNG-GDS ecosystem. Each layer builds on the ones before it; accessibility, content guidance and code resources run underneath all of them.</figcaption>
    </figure>
  );
}

function Ecosystem() {
  return (
    <>
      <PageHead eyebrow="Get started" title="Our ecosystem" lead="The PNG Government Digital Design System is built to be reusable and adaptable. Use only what you need: every layer when building from scratch, or just the identity and foundations when updating an existing website." />
      <EcosystemDiagram />

      <h2 className="pngds-h2" style={{ marginTop: 0 }}>The layers</h2>
      <Table caption="What each layer gives you" columns={[{ key: 'l', label: 'Layer' }, { key: 'w', label: 'What it is' }, { key: 'u', label: 'Use it to' }]}
        render={{ l: (v, r) => <TextLink as={Link} href={r.href}>{v}</TextLink> }}
        rows={[
          { l: 'Digital identity', href: '/core/logo', w: 'National Crest, masthead, brand stripe, agency logo rules', u: 'Make every site recognisably official PNG Government' },
          { l: 'Core styles', href: '/core/colour', w: 'Colour, type, spacing, layout, icons and design tokens', u: 'Keep visual decisions consistent across agencies' },
          { l: 'Components', href: '/components', w: 'Buttons, forms, navigation, alerts, tables and more', u: 'Build pages faster from tested, accessible parts' },
          { l: 'Methods', href: '/methods/multi-step-form', w: 'Applications, errors, tracking, service start pages', u: 'Solve common citizen tasks the same way everywhere' },
          { l: 'Templates', href: '/templates', w: 'Department websites, citizen portals', u: 'Start a new site or service from a working layout' },
        ]} />

      <h2 className="pngds-h2">Use what you need</h2>
      <CardGrid>
        <Card highlight title="Building something new" eyebrow="Full system">Use every layer: start from a template, assemble patterns and components, and keep foundations untouched.</Card>
        <Card title="Updating an existing site" eyebrow="Identity + foundations">Add the masthead, government header and colour/type tokens first. Replace forms and content components at the next major update.</Card>
        <Card title="WordPress, PHP or other CMS" eyebrow="CSS only"><p className="pngds-card__text">Link the single-file <code className="docs-inline">pngds.css</code> and use the <code className="docs-inline">pngds-</code> classes. No React needed.</p></Card>
      </CardGrid>

      <Callout title="Brand compliance">
        <p style={{ margin: 0 }}>Digital identity and design foundations are the minimum every government website must adopt. They are what DICT checks first in website and e-services maturity assessments.</p>
      </Callout>
    </>
  );
}

/* ======================== Figma UI Kit ======================== */
function KitThumb({ bg, fg, label, children }) {
  return <div className="kit-file__thumb" style={{ background: bg, color: fg }}>{children}<span>{label}</span></div>;
}

function FigmaKit() {
  const files = [
    { t: 'PNG-GDS Foundations', d: 'Colour, text and effect styles plus Figma Variables generated from the design tokens.', bg: 'var(--pngds-navy-700)', fg: 'var(--pngds-yellow-300)', label: 'Aa  ●  ▢' },
    { t: 'PNG-GDS Components', d: `All components with variants and states that match the React props one-to-one.`, bg: 'var(--pngds-orange-500)', fg: '#fff', label: 'Button  ▭' },
    { t: 'PNG-GDS Templates', d: 'Department website and citizen portal pages at mobile (360px) and desktop (1280px).', bg: 'var(--pngds-amber-400)', fg: 'var(--pngds-neutral-900)', label: '▤ ▤ ▤' },
  ];
  return (
    <>
      <PageHead eyebrow="Get started" title="Figma UI Kit" lead="The PNG-GDS Figma UI Kit gives designers the same foundations and components developers build with, so what you design is what gets shipped." tags={[{ label: 'In development — Phase 3', variant: 'warning' }]} />

      <h2 className="pngds-h2" style={{ marginTop: 0 }}>What’s in the kit</h2>
      <div className="kit-files">
        {files.map((f) => (
          <div className="kit-file" key={f.t}>
            <KitThumb bg={f.bg} fg={f.fg} label={f.label} />
            <div className="kit-file__body"><h3>{f.t}</h3><p>{f.d}</p><Tag variant="warning">Coming soon</Tag></div>
          </div>
        ))}
      </div>

      <h2 className="pngds-h2">Getting access</h2>
      <ol className="pngds-body" style={{ paddingLeft: '1.25rem', display: 'grid', gap: 8 }}>
        <li>Create a free Figma account with your agency (<code className="docs-inline">.gov.pg</code>) email address.</li>
        <li>Request access from the Digital Service Design and UX Standards team at DICT, stating your agency and project.</li>
        <li>Open the kit and choose <strong>Assets → Libraries</strong>, then turn on the three PNG-GDS libraries for your files.</li>
        <li>Contractors working for an agency request access through that agency’s Digital Transformation Officer.</li>
      </ol>

      <h2 className="pngds-h2">Start now with design tokens</h2>
      <p className="pngds-body">Until the libraries are published, set up the foundations yourself from the official tokens file:</p>
      <Checklist items={[
        <>Download <TextLink href="downloads/tokens.json" download>tokens.json</TextLink>.</>,
        'In Figma, install the Tokens Studio plugin and import the file, or create Variables collections named Palette and Roles from it.',
        'Create text styles from the type scale on the Typography page (system font: Noto Sans in Figma).',
        'Build screens at 360px wide first, then 1280px.',
      ]} />
      <ButtonGroup>
        <Button href="downloads/tokens.json" download iconStart="download">Download tokens.json</Button>
        <Button as={Link} to="/core/tokens" variant="secondary">About design tokens</Button>
      </ButtonGroup>

      <h2 className="pngds-h2">Rules for designing with the kit</h2>
      <Table caption="Kit conventions" columns={[{ key: 'r', label: 'Rule' }, { key: 'w', label: 'Why' }]} rows={[
        { r: 'Use library components; don’t detach instances', w: 'Updates flow through when the library changes' },
        { r: 'Component and property names match the React library (e.g. Button / variant = secondary)', w: 'Developers build exactly what was designed' },
        { r: 'Only use colours and text styles from the Foundations library', w: 'Guarantees contrast and brand compliance' },
        { r: 'Need something new? Propose it before designing it', w: 'Reuse before creating — see Contribute' },
        { r: 'Annotate focus order, headings and alt text in handover', w: 'Accessibility is designed, not added later' },
      ]} />
      <p className="pngds-small" style={{ color: 'var(--pngds-color-text-secondary)' }}>Versioning follows the code library: the Figma kit and the React library always share the same version number.</p>
    </>
  );
}

/* ======================== Supporting different roles ======================== */
function Roles() {
  const roles = [
    ['Agency executives and DTOs', 'Decide when to adopt the system, plan the budget and report compliance to DICT.', [['Our ecosystem', '/get-started/ecosystem'], ['Governance model', '/governance'], ['Roadmap', '/governance/roadmap']]],
    ['Service designers and user researchers', 'Map citizen journeys and test services with real people, including in provinces and districts.', [['Methods', '/methods'], ['Accessibility', '/guidelines/accessibility'], ['Designing forms', '/guidelines/forms']]],
    ['Content designers', 'Write clear English and Tok Pisin, and Easy Read versions of core services.', [['Plain language and Tok Pisin', '/guidelines/content'], ['Easy Read', '/methods/easy-read'], ['Validation and errors', '/methods/error-handling']]],
    ['UI and visual designers', 'Design screens with the core styles, components and Figma UI Kit.', [['Core styles', '/core'], ['Figma UI Kit', '/get-started/figma-ui-kit'], ['For designers', '/get-started/designers']]],
    ['Developers', 'Build with the React library or the single-file CSS, and test with keyboard and screen readers.', [['For developers', '/get-started/developers'], ['Components', '/components'], ['Utility classes', '/utilities']]],
    ['ICT contractors and vendors', 'Deliver agency websites that meet PNG-GDS and pass DICT compliance checks.', [['Downloads', '/get-started/downloads'], ['Templates', '/templates'], ['Extending', '/get-started/extending']]],
  ];
  return (
    <>
      <PageHead eyebrow="Get started" title="Supporting different roles" lead="Everyone who works on a government digital service has a part to play. Start with the resources for your role." />
      <CardGrid>
        {roles.map(([t, d, links]) => (
          <Card key={t} title={t}>
            <p className="pngds-card__text">{d}</p>
            <ul className="pngds-m-0 pngds-mt-2" style={{ paddingLeft: '1.1rem', position: 'relative', zIndex: 1 }}>
              {links.map(([l, h]) => <li key={h}><TextLink as={Link} href={h}>{l}</TextLink></li>)}
            </ul>
          </Card>
        ))}
      </CardGrid>
    </>
  );
}

/* ======================== Theming ======================== */
const themes = {
  dict: { label: 'DICT (default)', vars: {} },
  teal: { label: 'Teal accent — e.g. a health authority', vars: { '--pngds-color-brand': '#1E737C', '--pngds-color-brand-text': '#1E737C', '--pngds-color-brand-subtle': '#E6F4F5', '--pngds-color-brand-gradient': 'linear-gradient(90deg, #1E737C, #2C9EAA)' } },
  blue: { label: 'Blue accent — e.g. an education agency', vars: { '--pngds-color-brand': '#245E93', '--pngds-color-brand-text': '#245E93', '--pngds-color-brand-subtle': '#EAF2FA', '--pngds-color-brand-gradient': 'linear-gradient(90deg, #245E93, #2E75B6)' } },
  purple: { label: 'Purple accent', vars: { '--pngds-color-brand': '#793F43', '--pngds-color-brand-text': '#793F43', '--pngds-color-brand-subtle': '#F5ECED', '--pngds-color-brand-gradient': 'linear-gradient(90deg, #793F43, #A65A60)' } },
};
function Theming() {
  const [t, setT] = useState('dict');
  const vars = themes[t].vars;
  const css = Object.keys(vars).length ? `[data-pngds-theme="${t}"] {\n${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}` : '/* DICT default — no overrides needed */';
  return (
    <>
      <PageHead eyebrow="Get started" title="Theming" lead="Agencies can apply a controlled accent theme by overriding a small set of role tokens. The national identity — masthead, crest, navy, typography and components — never changes." />
      <div className="pngds-field">
        <label className="pngds-label" htmlFor="theme-pick">Preview a theme</label>
        <select id="theme-pick" className="pngds-select" value={t} onChange={(e) => setT(e.target.value)}>
          {Object.entries(themes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      <div className="docs-example" style={vars} aria-live="polite">
        <div className="docs-example__title">Themed preview</div>
        <div className="pngds-graphic-band" aria-hidden="true" />
        <div className="docs-example__stage">
          <p className="pngds-card__eyebrow pngds-m-0">Service</p>
          <h3 className="pngds-h3 pngds-mt-1">Book a clinic appointment</h3>
          <div className="pngds-steps"><p className="pngds-steps__count">Step 2 of 4</p><div className="pngds-steps__bar"><div className="pngds-steps__fill" style={{ width: '33%' }} /></div></div>
          <div className="pngds-tabs__list" role="presentation"><span className="pngds-tabs__tab" aria-selected="true">Details</span><span className="pngds-tabs__tab">Location</span></div>
          <div className="pngds-btn-group pngds-mt-4"><Button>Continue</Button><Button variant="secondary">Save for later</Button></div>
        </div>
      </div>
      <CodeBlock lang="css" code={css} />
      <h2 className="pngds-h2">What agencies can and can’t change</h2>
      <Table caption="Theming rules" columns={[{ key: 'w', label: 'Element' }, { key: 'c', label: 'Can change?' }]} render={{ c: (v) => <Tag variant={v.startsWith('Yes') ? 'success' : 'error'}>{v}</Tag> }} rows={[
        { w: 'Accent colour (--pngds-color-brand, brand-text, brand-subtle, brand-gradient)', c: 'Yes — from the DICT secondary palette' },
        { w: 'Agency logo in the header', c: 'Yes' },
        { w: 'Photography', c: 'Yes' },
        { w: 'Masthead, National Crest, navy primary, focus colour', c: 'No' },
        { w: 'Typography, spacing, component shapes', c: 'No' },
      ]} />
      <Alert variant="warning" title="Contrast is the agency’s responsibility"><p>Any accent colour must reach 4.5:1 against white for text and 3:1 for indicators. Check it with a contrast checker before requesting approval from DICT.</p></Alert>
    </>
  );
}

/* ======================== Extending ======================== */
function Extending() {
  return (
    <>
      <PageHead eyebrow="Get started" title="Extending" lead="When a service needs something the system doesn’t have, build it from the system’s tokens and patterns — and share it back so other agencies benefit." />
      <ol className="pngds-body" style={{ paddingLeft: '1.25rem', display: 'grid', gap: 10 }}>
        <li><strong>Check first.</strong> Look for an existing component, method or utility class that already solves it.</li>
        <li><strong>Compose before creating.</strong> Combine existing components and utilities.</li>
        <li><strong>Build with tokens.</strong> Use only <code className="docs-inline">var(--pngds-…)</code> values — no new colours, fonts or spacing.</li>
        <li><strong>Prefix your classes</strong> with your agency code (for example <code className="docs-inline">.ipa-</code>) so they never clash with <code className="docs-inline">.pngds-</code>.</li>
        <li><strong>Test</strong> with keyboard, screen reader, 360px width and 3G throttling.</li>
        <li><strong>Contribute it</strong> through the <TextLink as={Link} href="/governance/contribute">contribution process</TextLink>.</li>
      </ol>
      <CodeBlock lang="css" code={`/* Good: an agency component built from PNG-GDS tokens */\n.ipa-fee-panel {\n  padding: var(--pngds-space-5);\n  border-left: 6px solid var(--pngds-color-brand);\n  background: var(--pngds-color-bg-subtle);\n  border-radius: var(--pngds-radius-md);\n}`} />
      <DoDont dos={['Extend with a new class next to the PNG-GDS class.', 'Keep components’ HTML structure and ARIA attributes intact.']}
        donts={['Don’t edit or override pngds.css directly — upgrades will undo your changes.', 'Don’t copy a component and change its colours.']} />
    </>
  );
}

export default function GetStarted() {
  return (
    <Routes>
      <Route index element={<Intro />} />
      <Route path="developers" element={<Developers />} />
      <Route path="designers" element={<Designers />} />
      <Route path="downloads" element={<Downloads />} />
      <Route path="ecosystem" element={<Ecosystem />} />
      <Route path="figma-ui-kit" element={<FigmaKit />} />
      <Route path="roles" element={<Roles />} />
      <Route path="theming" element={<Theming />} />
      <Route path="extending" element={<Extending />} />
    </Routes>
  );
}

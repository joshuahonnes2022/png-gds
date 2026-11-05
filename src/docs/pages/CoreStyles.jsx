import { Link, useParams } from 'react-router-dom';
import {
  Alert, Button, ButtonGroup, Card, CardGrid, Callout, Icon, Table, Tag, TextLink, Masthead, Header,
  Row, Col, Section, Pictogram, pictogramNames, GraphicBand, Diamonds, HeadingAnchors,
} from '../../lib';
import { PageHead, Example, DoDont, Checklist, CodeBlock, Frame } from '../DocUI.jsx';
import { Colour, Typography, Icons, Tokens } from './Foundations.jsx';
import { coreStyles } from '../data/nav.js';
import { CREST, DICT_LOGO, CREST_BADGE } from '../assets.js';
import NotFound from './NotFound.jsx';

const required = { label: 'Required for national brand compliance', variant: 'warning' };

/* ======================== Overview ======================== */
function Overview() {
  const desc = {
    logo: 'National Crest and agency logos: placement, size and clear space.',
    colour: 'DICT brand palette, role tokens and accessible pairings.',
    typography: 'Type scale, font stack and reading width.',
    iconography: 'Line icons for actions and wayfinding.',
    pictograms: 'Larger two-tone illustrations for services and topics.',
    grid: 'The 12-column responsive grid and breakpoints.',
    'page-layout': 'Full-width and two-column page layouts.',
    section: 'Full-width bands that group related content.',
    'graphic-elements': 'Brand gradient, bilum weave, corners and diamonds.',
    tokens: 'Every value above as reusable design tokens.',
  };
  return (
    <>
      <PageHead eyebrow="Core styles" title="Core styles" lead="Core styles create the PNG Government look and feel. Styles marked as required must be used on every government website to meet national brand compliance." />
      <CardGrid>
        {coreStyles.map((c) => (
          <Card key={c.slug} href={`/core/${c.slug}`} LinkComponent={Link} title={c.label} highlight={c.required}
            footer={c.required ? <Tag variant="warning">Required</Tag> : <Tag plain>Recommended</Tag>}>{desc[c.slug]}</Card>
        ))}
      </CardGrid>
    </>
  );
}

/* ======================== Logo ======================== */
function Logo() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Logo" tags={[required]}
        lead="The National Crest tells citizens a website belongs to the Government of Papua New Guinea. The agency logo identifies the department or authority that runs it." />
      <Example title="Standard placement — centred layout" flush html={false}>
        <Masthead showLanguage={false} badgeSrc={CREST_BADGE} />
        <Header layout="center" crestSrc={CREST} logoSrc={DICT_LOGO} logoAlt="Department of Information and Communications Technology" govLabel="Government of Papua New Guinea" agency="Department of Information and Communications Technology" />
      </Example>
      <Example title="Agency layout — crest and name on the left" flush html={false}>
        <Header crestSrc={CREST} logoSrc={DICT_LOGO} logoAlt="Department of Information and Communications Technology" agency="Department of Information and Communications Technology" />
      </Example>

      <h2 className="pngds-h2">The National Crest</h2>
      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))', alignItems: 'start' }}>
        <figure style={{ margin: 0 }}>
          <div style={{ display: 'grid', placeItems: 'center', padding: 32, background: 'var(--pngds-neutral-50)', border: '1px solid var(--pngds-color-border)', borderRadius: 8 }}>
            <div style={{ padding: 18, outline: '2px dashed var(--pngds-orange-500)', outlineOffset: 0, position: 'relative' }}>
              <img src={CREST} alt="Papua New Guinea National Crest" style={{ height: 96, display: 'block' }} />
            </div>
          </div>
          <figcaption className="pngds-caption" style={{ marginTop: 8 }}>Clear space (dashed) — at least one quarter of the crest’s height on every side.</figcaption>
        </figure>
        <Table caption="Crest rules" columns={[{ key: 'r', label: 'Rule' }, { key: 'v', label: 'Value' }]} rows={[
          { r: 'Minimum height on screen', v: '40px (48px on phones in the header)' },
          { r: 'Header height (desktop)', v: '60–72px' },
          { r: 'Clear space', v: '¼ of the crest height on all sides' },
          { r: 'Background', v: 'White or very light only' },
          { r: 'File', v: 'assets/png-crest.png — the official artwork' },
          { r: 'Alt text', v: '“Papua New Guinea National Crest”' },
        ]} />
      </div>

      <h2 className="pngds-h2">Agency logos</h2>
      <p className="pngds-body">Agency or program logos appear on the right of the header, never in place of the crest. They show from tablet width (768px); on phones only the crest shows, to leave room for the agency name.</p>
      <DoDont
        dos={['Use the official crest file supplied by DICT.', 'Keep the crest on the left of the header.', 'Write the agency name exactly as gazetted.', 'Link the crest and agency name to the home page.']}
        donts={['Don’t redraw, recolour, rotate or stretch the crest.', 'Don’t place the crest on photos, gradients or coloured backgrounds.', 'Don’t make an agency logo larger than the crest.', 'Don’t combine the crest and agency logo into a new lockup.']} />
      <CodeBlock lang="jsx" code={`<Header\n  layout="center"\n  crestSrc="assets/png-crest.png"\n  logoSrc="assets/agency-logo.png"\n  logoAlt="Department of …"\n  agency="Department of …"\n/>`} />
    </>
  );
}

/* ======================== Iconography ======================== */
function Iconography() {
  return (
    <>
      <Icons />
      <h2 className="pngds-h2">Sizes</h2>
      <Table caption="Icon sizes" columns={[{ key: 's', label: 'Size' }, { key: 'u', label: 'Use' }, { key: 'c', label: 'Utility class' }]}
        render={{ c: (v) => <code className="docs-inline">{v}</code> }} rows={[
          { s: '16px', u: 'Inline with small text, tags', c: 'pngds-svg-sm' },
          { s: '24px', u: 'Default — buttons, links, alerts', c: 'pngds-svg-md' },
          { s: '32px', u: 'Feature lists, empty states', c: 'pngds-svg-lg' },
          { s: '48px', u: 'Only when a pictogram isn’t suitable', c: 'pngds-svg-xl' },
        ]} />
      <p className="pngds-body">Icons are for actions and wayfinding. For topics and services, use <TextLink as={Link} href="/core/pictograms">pictograms</TextLink>.</p>
    </>
  );
}

/* ======================== Pictograms ======================== */
function Pictograms() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Pictograms" tags={[required]}
        lead={`${pictogramNames.length} two-tone illustrations for government services and topics. They use DICT navy lines with a deep-orange and orange accent, and are drawn on a 64px grid.`} />
      <div className="docs-swatches" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(8.5rem, 1fr))' }}>
        {pictogramNames.map((n) => (
          <div key={n} className="docs-swatch" style={{ cursor: 'default', textAlign: 'center', padding: '20px 8px 12px' }}>
            <Pictogram name={n} />
            <div style={{ marginTop: 8 }}><code style={{ fontFamily: 'var(--pngds-font-mono)', fontSize: 12 }}>{n}</code></div>
          </div>
        ))}
      </div>
      <Example title="In service cards" code={`<Card href="/sevispass" title="Digital identity">\n  <Pictogram name="digital-id" />\n  <p className="pngds-card__text">Apply for SevisPass…</p>\n</Card>`}>
        <CardGrid>
          {[['digital-id', 'Digital identity', 'Apply for or update your SevisPass.'], ['health', 'Health', 'Find clinics, programs and health information.'], ['education', 'Education', 'Schools, scholarships and teacher services.']].map(([n, t, d]) => (
            <Card key={n} href="#" title={t}><div style={{ order: -1 }}><Pictogram name={n} /></div><p className="pngds-card__text">{d}</p></Card>
          ))}
        </CardGrid>
      </Example>
      <h2 className="pngds-h2">Sizes</h2>
      <div style={{ display: 'flex', alignItems: 'end', gap: 32, marginBottom: 24 }}>
        {[['sm', '48px'], ['md', '64px (default)'], ['lg', '96px']].map(([s, l]) => (
          <div key={s} style={{ textAlign: 'center' }}><Pictogram name="community" size={s} /><div className="pngds-caption">{l}</div></div>
        ))}
      </div>
      <DoDont dos={['Use one pictogram per card or topic.', 'Keep the same pictogram for the same topic across all services.', 'Treat pictograms as decorative when the heading already names the topic.']}
        donts={['Don’t recolour pictograms outside the brand palette.', 'Don’t use pictograms as buttons — use icons with text.', 'Don’t mix with clip-art or other illustration styles.']} />
      <Callout title="Need a new pictogram?"><p style={{ margin: 0 }}>Propose it through the <TextLink as={Link} href="/governance/contribute">contribution process</TextLink>. New pictograms follow the same 64px grid, 2.5px navy line and single orange accent.</p></Callout>
    </>
  );
}

/* ======================== Grid ======================== */
function Grid() {
  const cell = (t) => <div style={{ background: 'var(--pngds-orange-50)', border: '1px solid var(--pngds-orange-200)', padding: '10px 6px', textAlign: 'center', fontSize: 13, fontWeight: 600, borderRadius: 4 }}>{t}</div>;
  return (
    <>
      <PageHead eyebrow="Core styles" title="Grid" lead="A 12-column, mobile-first flexbox grid. Columns stack on phones and sit side by side from the breakpoint you choose." />
      <Example title="12 columns" code={`<div className="pngds-row pngds-row--tight">\n  <div className="pngds-col-1">1</div>\n  …\n</div>`}>
        <Row tight>{Array.from({ length: 12 }, (_, i) => <Col key={i} span={1}>{cell(i + 1)}</Col>)}</Row>
      </Example>
      <Example title="Responsive: stack on phones, 2 columns on tablets, 3 on laptops" code={`<Row>\n  <Col md={6} lg={4}>…</Col>\n  <Col md={6} lg={4}>…</Col>\n  <Col md={12} lg={4}>…</Col>\n</Row>`}>
        <Row><Col md={6} lg={4}>{cell('md 6 · lg 4')}</Col><Col md={6} lg={4}>{cell('md 6 · lg 4')}</Col><Col md={12} lg={4}>{cell('md 12 · lg 4')}</Col></Row>
      </Example>
      <Example title="Main content and sidebar" code={`<Row>\n  <Col lg={8}>Main</Col>\n  <Col lg={4}>Sidebar</Col>\n</Row>`}>
        <Row><Col lg={8}>{cell('lg 8 — main content')}</Col><Col lg={4}>{cell('lg 4 — sidebar')}</Col></Row>
      </Example>
      <h2 className="pngds-h2">Breakpoints</h2>
      <Table caption="Breakpoints (mobile-first, min-width)" columns={[{ key: 'n', label: 'Name' }, { key: 'w', label: 'From' }, { key: 'd', label: 'Devices' }, { key: 'c', label: 'Column classes' }]}
        render={{ c: (v) => <code className="docs-inline">{v}</code> }} rows={[
          { n: 'base', w: '0', d: 'All phones — design here first (test at 360px)', c: 'pngds-col-{1–12}' },
          { n: 'sm', w: '576px', d: 'Large phones', c: 'utility classes only' },
          { n: 'md', w: '768px', d: 'Tablets', c: 'pngds-col-md-{3,4,6,8,12}' },
          { n: 'lg', w: '1024px', d: 'Laptops', c: 'pngds-col-lg-{2,3,4,6,8,9,12}' },
          { n: 'xl', w: '1280px', d: 'Desktops', c: 'utility classes only' },
        ]} />
      <h2 className="pngds-h2">Container and gutters</h2>
      <p className="pngds-body"><code className="docs-inline">.pngds-container</code> centres content at a maximum of 1216px, with 16px side gutters on phones and 24px from tablets. Columns have a 24px gutter (<code className="docs-inline">pngds-row--tight</code> for 12px). For simple card lists, <code className="docs-inline">.pngds-grid</code> fits as many 256px columns as the screen allows with no breakpoint code.</p>
    </>
  );
}

/* ======================== Page layout ======================== */
function MiniLayout({ type }) {
  const box = (label, flex, dark) => <div style={{ flex, background: dark ? 'var(--pngds-navy-100)' : 'var(--pngds-orange-50)', border: `1px solid ${dark ? 'var(--pngds-navy-100)' : 'var(--pngds-orange-200)'}`, borderRadius: 4, padding: 10, fontSize: 12, fontWeight: 600, minHeight: 90 }}>{label}</div>;
  return (
    <div style={{ border: '1px solid var(--pngds-color-border)', borderRadius: 8, padding: 12, background: '#fff' }}>
      <div style={{ height: 10, background: 'var(--pngds-navy-700)', borderRadius: 2, marginBottom: 8 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        {type === 'full' && box('Main content', 1)}
        {type === 'left' && <>{box('Side nav', '0 0 30%', true)}{box('Main content', 1)}</>}
        {type === 'right' && <>{box('Main content', 1)}{box('Sidebar', '0 0 32%', true)}</>}
      </div>
    </div>
  );
}

function PageLayoutPage() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Page layout" lead="Three standard layouts hold the grid on every page. Choose the one that fits the content, not the one that fits the most content." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Page layouts</h2>
      <CardGrid>
        <Card title="Full width"><div style={{ order: -1 }}><MiniLayout type="full" /></div><p className="pngds-card__text">Home pages, landing pages and transactional services. Use <code className="docs-inline">layout="full"</code>.</p></Card>
        <Card title="Two column — left sidebar"><div style={{ order: -1 }}><MiniLayout type="left" /></div><p className="pngds-card__text">Side navigation for sections with many pages. The sidebar can be hidden under 1024px (use a menu or select instead).</p></Card>
        <Card title="Two column — right sidebar"><div style={{ order: -1 }}><MiniLayout type="right" /></div><p className="pngds-card__text">Articles and news with related links. On phones the sidebar stacks below the main content.</p></Card>
      </CardGrid>
      <CodeBlock lang="jsx" code={`<PageLayout layout="sidebar-left" sidebar={<SideNav groups={…} />} sidebarDesktopOnly>\n  <h1 className="pngds-h1">Page title</h1>\n  …\n</PageLayout>\n\n<!-- HTML -->\n<div class="pngds-container pngds-layout pngds-layout--sidebar-right">\n  <div class="pngds-layout__main">…</div>\n  <aside class="pngds-layout__sidebar" aria-label="Related">…</aside>\n</div>`} />

      <h2 className="pngds-h2">Heading anchor links</h2>
      <p className="pngds-body">On long guidance pages, a “#” link next to each H2 lets people copy a link straight to that section. Wrap the content in <code className="docs-inline">HeadingAnchors</code>. Use it for long-form content only — not for cards, navigation or forms.</p>
      <Example title="Hover or focus a heading to see its link" code={`<HeadingAnchors>\n  <h2>Who can apply</h2>\n  <p>…</p>\n</HeadingAnchors>`} html={false}>
        <HeadingAnchors>
          <h2 className="pngds-h3" style={{ marginTop: 0 }}>Who can apply</h2>
          <p style={{ margin: '0 0 12px' }}>Any citizen aged 18 or over.</p>
          <h2 className="pngds-h3">What you need</h2>
          <p style={{ margin: 0 }}>Your SevisPass or National ID number.</p>
        </HeadingAnchors>
      </Example>

      <h2 className="pngds-h2">Alternating layouts</h2>
      <p className="pngds-body">For image-and-text rows that alternate sides, keep the HTML order logical (heading and text first) and swap only the visual order with <code className="docs-inline">pngds-order-lg-first</code> / <code className="docs-inline">pngds-order-lg-last</code>. Screen readers and keyboard focus then follow a sensible order (WCAG 1.3.2 and 2.4.3).</p>
      <Example title="Visual order swapped on laptops only" code={`<Row className="pngds-align-items-center">\n  <Col lg={6}>Text first in the HTML</Col>\n  <Col lg={6} className="pngds-order-lg-first">Image</Col>\n</Row>`}>
        <Row className="pngds-align-items-center">
          <Col lg={6}><h3 className="pngds-h4" style={{ marginTop: 0 }}>1. Text comes first in the code</h3><p style={{ margin: 0 }}>On laptops the picture moves to the left; on phones and for screen readers the text stays first.</p></Col>
          <Col lg={6} className="pngds-order-lg-first"><div className="pngds-graphic-weave" style={{ height: 140, borderRadius: 8 }} role="img" aria-label="Decorative pattern" /></Col>
        </Row>
      </Example>
      <Alert variant="warning" title="Use with care"><p>Only reorder decorative or supporting content. Never reorder form fields, steps or anything people read in sequence.</p></Alert>

      <h2 className="pngds-h2">Sticky container</h2>
      <p className="pngds-body">A fixed region in the bottom corner of the page shell for controls that must always be reachable, such as <strong>Quick exit</strong> on support services or a cookie notice. Place it as the last child of <code className="docs-inline">&lt;body&gt;</code> and don’t wrap it in anything with <code className="docs-inline">overflow</code> or <code className="docs-inline">transform</code>.</p>
      <Frame url="https://example.gov.pg/family-support">
        <div style={{ position: 'relative', minHeight: 200, padding: 24, background: 'var(--pngds-neutral-50)' }}>
          <p style={{ margin: 0, maxWidth: '40ch' }}>Page content… The Quick exit button stays in the corner while people scroll, and Shift + Escape leaves the site.</p>
          <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
            <button type="button" className="pngds-btn pngds-btn--danger"><Icon name="close" className="pngds-btn__icon" />Quick exit</button>
          </div>
        </div>
      </Frame>
      <CodeBlock lang="jsx" code={`<StickyContainer>\n  <QuickExit href="https://www.google.com" />\n</StickyContainer>`} />
      <Checklist items={['Quick exit opens a neutral site and replaces the current page in history.', 'Keyboard shortcut Shift + Escape is announced to screen-reader users.', 'Keep the container clear of other fixed elements so it never hides content (WCAG 2.4.11).']} />
    </>
  );
}

/* ======================== Section ======================== */
function SectionPage() {
  const bgs = [['white', 'White (default)'], ['off-white', 'Off-white'], ['grey', 'Grey'], ['brand-light', 'Brand light'], ['navy-light', 'Navy light'], ['navy', 'Navy'], ['brand', 'Brand (large text only)']];
  return (
    <>
      <PageHead eyebrow="Core styles" title="Section" lead="Sections are full-width bands that group related content on a page. Changing the background between sections helps people see where one topic ends and the next begins." />
      <Example title="Section backgrounds" flush code={`<Section title="Our services" intro="Find and apply for services online." background="off-white">\n  <CardGrid>…</CardGrid>\n</Section>`}>
        {bgs.map(([b, l]) => (
          <Section key={b} background={b} padding="sm" title={l} headingLevel={3}>
            <p style={{ margin: 0 }}>{b === 'brand' ? 'Use for short, large headlines and calls to action.' : 'Section content sits in the standard container.'}</p>
          </Section>
        ))}
      </Example>
      <Example title="Boxed section with brand accent" flush code={`<Section background="navy-light" accent box title="Need help?">…</Section>`}>
        <Section background="navy-light" accent box title="Need help?" intro="Call +675 000 0000, 8am–4pm, Monday to Friday." headingLevel={3}>
          <ButtonGroup><Button>Contact us</Button><Button variant="secondary">Visit an office</Button></ButtonGroup>
        </Section>
      </Example>
      <Table caption="Section options" columns={[{ key: 'p', label: 'Prop' }, { key: 'v', label: 'Values' }, { key: 'd', label: 'Purpose' }]} rows={[
        { p: 'background', v: 'white, off-white, grey, brand-light, navy-light, navy, brand', d: 'Band colour. Navy and brand switch text to white.' },
        { p: 'padding', v: 'sm (32px), md (64px), lg (96px)', d: 'Vertical space' },
        { p: 'accent', v: 'boolean', d: 'Brand gradient line on top' },
        { p: 'box', v: 'boolean', d: 'White rounded panel inside the band' },
        { p: 'title / intro', v: 'string', d: 'Section heading (labels the region) and lead text' },
      ]} />
      <DoDont dos={['Alternate white and off-white sections on long pages.', 'Give every section a heading.', 'Use navy or brand bands once or twice per page at most.']}
        donts={['Don’t put body text on the brand (deep orange) background.', 'Don’t place two coloured sections next to each other.']} />
    </>
  );
}

/* ======================== Graphic elements ======================== */
function GraphicElements() {
  return (
    <>
      <PageHead eyebrow="Core styles" title="Graphic elements" tags={[required]}
        lead="Graphic elements carry the DICT brand beyond colour: the orange gradient from the logo, a bilum-inspired diamond weave, corner shapes and diamond markers. They are decorative and never carry meaning on their own." />
      <Example title="Brand gradient band" code={`<GraphicBand />\n<div className="pngds-graphic-band"></div>`}><GraphicBand /></Example>
      <Example title="Bilum weave" code={`<div className="pngds-graphic-weave" aria-hidden="true"></div>`}>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <div className="pngds-graphic-weave" style={{ height: 110, borderRadius: 8 }} aria-hidden="true" />
          <div className="pngds-graphic-weave pngds-graphic-weave--light" style={{ height: 110, borderRadius: 8 }} aria-hidden="true" />
        </div>
      </Example>
      <Example title="Corner shape on a feature panel" code={`<div className="pngds-graphic-corner pngds-bg-navy pngds-p-6 pngds-rounded-lg">…</div>`}>
        <div className="pngds-graphic-corner pngds-bg-navy pngds-p-6 pngds-rounded-lg">
          <p className="pngds-text-xl pngds-text-bold pngds-m-0">Digital Government Plan 2023–2027</p>
          <p className="pngds-m-0 pngds-mt-2">Connecting every Papua New Guinean to government services.</p>
        </div>
      </Example>
      <Example title="Diamond markers" code={`<Diamonds />`}><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><Diamonds /><strong>Key message or section divider</strong></div></Example>
      <DoDont dos={['Use one graphic element per section.', 'Mark graphic elements aria-hidden="true".', 'Keep the weave behind short headlines only, with a solid panel for text.']}
        donts={['Don’t put body text directly on the weave pattern.', 'Don’t animate graphic elements.', 'Don’t combine the gradient band with the weave in the same area.']} />
    </>
  );
}

/* ======================== Router ======================== */
const pages = {
  logo: Logo, colour: Colour, typography: Typography, iconography: Iconography, pictograms: Pictograms,
  grid: Grid, 'page-layout': PageLayoutPage, section: SectionPage, 'graphic-elements': GraphicElements, tokens: Tokens,
};
export default function CoreStyles() {
  const { slug } = useParams();
  if (!slug) return <Overview />;
  const P = pages[slug];
  return P ? <P /> : <NotFound />;
}

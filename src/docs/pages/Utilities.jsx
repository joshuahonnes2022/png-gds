import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardGrid, Icon, TextInput, Tag, TextLink, Pictogram, utilityGroups, BREAKPOINTS } from '../../lib';
import { PageHead, Example, CodeBlock } from '../DocUI.jsx';
import { utilities } from '../data/nav.js';
import NotFound from './NotFound.jsx';

const box = (label, extra = '') => <div className={`pngds-bg-navy-light pngds-p-3 pngds-rounded-sm pngds-text-sm pngds-text-semibold ${extra}`}>{label}</div>;

/* Live example for each utility group */
const examples = {
  background: {
    code: `<div className="pngds-bg-navy pngds-p-4">…</div>\n<div className="pngds-bg-brand-light pngds-p-4">…</div>`,
    el: <div className="pngds-display-grid pngds-gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))' }}>
      {['bg-navy', 'bg-brand', 'bg-brand-dark', 'bg-orange', 'bg-yellow', 'bg-brand-light', 'bg-navy-light', 'bg-off-white', 'bg-success', 'bg-error'].map((c) => (
        <div key={c} className={`pngds-${c} pngds-p-4 pngds-rounded pngds-text-semibold pngds-border`} style={{ fontSize: c === 'bg-brand' ? 20 : undefined }}>{c}</div>))}
    </div>,
  },
  borders: {
    code: `<div className="pngds-border pngds-rounded pngds-p-4">…</div>\n<div className="pngds-border-accent-left pngds-p-4">…</div>`,
    el: <div className="pngds-display-grid pngds-gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))' }}>
      {['border rounded', 'border border-thick border-navy rounded-lg', 'border-accent-left bg-off-white', 'border-accent-top bg-off-white', 'border border-brand rounded-pill', 'border border-dark rounded-0'].map((c) => (
        <div key={c} className={c.split(' ').map((x) => `pngds-${x}`).join(' ') + ' pngds-p-4 pngds-text-sm'}>{c}</div>))}
    </div>,
  },
  'box-shadow': {
    code: `<div className="pngds-shadow-2 pngds-p-5 pngds-rounded">…</div>`,
    el: <div className="pngds-display-flex pngds-flex-wrap pngds-gap-5">
      {[0, 1, 2, 3].map((n) => <div key={n} className={`pngds-shadow-${n} pngds-bg-white pngds-p-5 pngds-rounded pngds-text-semibold`} style={{ width: 140 }}>shadow-{n}</div>)}
    </div>,
  },
  display: {
    code: `<p className="pngds-display-none pngds-display-md-block">Only on tablets and up</p>\n<p className="pngds-display-md-none">Only on phones</p>`,
    el: <>
      <div className="pngds-display-none pngds-display-md-block pngds-bg-success pngds-p-3 pngds-rounded pngds-mb-2">Visible from 768px (display-none display-md-block)</div>
      <div className="pngds-display-md-none pngds-bg-warning pngds-p-3 pngds-rounded pngds-mb-2">Visible only under 768px (display-md-none) — resize to see</div>
      <span className="pngds-display-inline-block pngds-bg-navy-light pngds-p-2 pngds-rounded">inline-block</span>{' '}
      <span className="pngds-display-inline-block pngds-bg-navy-light pngds-p-2 pngds-rounded">inline-block</span>
    </>,
  },
  flex: {
    code: `<div className="pngds-display-flex pngds-flex-column pngds-flex-md-row pngds-justify-between pngds-align-items-center pngds-gap-4">…</div>`,
    el: <div className="pngds-display-flex pngds-flex-column pngds-flex-md-row pngds-justify-between pngds-align-items-center pngds-gap-4 pngds-p-4 pngds-bg-off-white pngds-rounded">
      {box('Stacks on phones')}{box('row from 768px', 'pngds-flex-1')}{box('justify-between')}
    </div>,
  },
  float: {
    code: `<div className="pngds-clearfix">\n  <img className="pngds-float-right pngds-ml-4 pngds-mb-2" … />\n  <p>…</p>\n</div>`,
    el: <div className="pngds-clearfix">
      <div className="pngds-float-right pngds-ml-4 pngds-mb-2 pngds-graphic-weave pngds-rounded" style={{ width: 140, height: 100 }} aria-hidden="true" />
      <p className="pngds-m-0">Text wraps around a floated image in long-form content. Floats are for content images only; use flex or the grid for layout. Wrap the content in <code className="docs-inline">pngds-clearfix</code> so the container contains the float.</p>
    </div>,
  },
  overflow: {
    code: `<div className="pngds-overflow-x-auto">…wide content…</div>`,
    el: <div className="pngds-overflow-x-auto pngds-border pngds-rounded pngds-p-3" tabIndex={0} role="region" aria-label="Scrollable example">
      <div className="pngds-text-nowrap pngds-text-mono pngds-text-sm">REF-2026-000481 · REF-2026-000482 · REF-2026-000483 · REF-2026-000484 · REF-2026-000485 · REF-2026-000486 · REF-2026-000487</div>
    </div>,
  },
  position: {
    code: `<div className="pngds-position-relative">\n  <span className="pngds-position-absolute pngds-top-0 pngds-right-0">…</span>\n</div>`,
    el: <div className="pngds-position-relative pngds-bg-off-white pngds-rounded pngds-p-6" style={{ minHeight: 120 }}>
      <span className="pngds-position-absolute pngds-top-0 pngds-right-0 pngds-bg-brand-dark pngds-px-3 pngds-py-1 pngds-text-sm pngds-text-bold" style={{ borderBottomLeftRadius: 8 }}>New</span>
      <p className="pngds-m-0">position-relative container with an absolutely positioned label in the top-right corner.</p>
    </div>,
  },
  reflow: {
    code: `<p className="pngds-reflow-wrap">verylongemailaddress@department.gov.pg</p>\n<div className="pngds-display-flex pngds-reflow-stack">…</div>`,
    el: <div style={{ maxWidth: 260 }} className="pngds-border pngds-rounded pngds-p-3">
      <p className="pngds-text-sm pngds-text-secondary pngds-m-0">Without reflow-wrap:</p>
      <p className="pngds-m-0 pngds-mb-3 pngds-overflow-hidden pngds-text-nowrap">digital.transformation.officer@information.gov.pg</p>
      <p className="pngds-text-sm pngds-text-secondary pngds-m-0">With reflow-wrap:</p>
      <p className="pngds-m-0 pngds-reflow-wrap">digital.transformation.officer@information.gov.pg</p>
    </div>,
  },
  spacing: {
    code: `<div className="pngds-p-5 pngds-mb-4">24px padding, 16px margin below</div>\n<div className="pngds-px-6 pngds-py-2">32px left/right, 8px top/bottom</div>`,
    el: <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <div key={n} className="pngds-display-flex pngds-align-items-center pngds-gap-3 pngds-mb-1">
          <code className="docs-inline" style={{ width: 90 }}>p-{n}</code>
          <div className="pngds-bg-brand-light pngds-border pngds-border-brand"><div className={`pngds-p-${n}`}><div className="pngds-bg-brand" style={{ width: 8, height: 8 }} /></div></div>
        </div>))}
    </div>,
  },
  svg: {
    code: `<Icon name="info" className="pngds-svg-lg pngds-svg-color-brand" />\n<Icon name="check" className="pngds-svg-sm pngds-svg-inline" /> Inline with text`,
    el: <div className="pngds-display-flex pngds-align-items-center pngds-gap-5 pngds-flex-wrap">
      <Icon name="info" className="pngds-svg-sm" /><Icon name="info" className="pngds-svg-md" /><Icon name="info" className="pngds-svg-lg pngds-svg-color-brand" /><Icon name="info" className="pngds-svg-xl pngds-svg-color-navy" />
      <span><Icon name="check" className="pngds-svg-sm pngds-svg-inline pngds-svg-color-brand" /> Lined up with text</span>
      <Pictogram name="location" size="sm" />
    </div>,
  },
  text: {
    code: `<p className="pngds-text-xl pngds-text-bold pngds-text-navy">…</p>\n<p className="pngds-text-sm pngds-text-secondary pngds-text-uppercase">…</p>\n<p className="pngds-text-truncate">…</p>`,
    el: <>
      <p className="pngds-text-xl pngds-text-bold pngds-text-navy pngds-m-0">text-xl text-bold text-navy</p>
      <p className="pngds-text-brand pngds-text-semibold pngds-m-0 pngds-mt-2">text-brand text-semibold</p>
      <p className="pngds-text-sm pngds-text-secondary pngds-text-uppercase pngds-m-0 pngds-mt-2">text-sm text-secondary text-uppercase</p>
      <p className="pngds-text-truncate pngds-m-0 pngds-mt-2" style={{ maxWidth: 260 }}>text-truncate cuts very long single lines of text with an ellipsis</p>
      <p className="pngds-text-mono pngds-text-tabular pngds-m-0 pngds-mt-2">text-mono · K1,250.00</p>
    </>,
  },
  'vertical-alignment': {
    code: `<img className="pngds-align-middle" … /> Text`,
    el: <p className="pngds-m-0 pngds-text-lg">{['baseline', 'top', 'middle', 'bottom'].map((a) => (
      <span key={a} className="pngds-mr-5"><span className={`pngds-display-inline-block pngds-bg-brand pngds-align-${a}`} style={{ width: 14, height: 14 }} /> {a}</span>))}</p>,
  },
  visibility: {
    code: `<button>\n  <Icon name="close" />\n  <span className="pngds-visually-hidden">Close dialog</span>\n</button>\n<a className="pngds-visually-hidden-focusable" href="#main">Skip to content</a>`,
    el: <>
      <p className="pngds-m-0 pngds-mb-3">The icon button below has a hidden text label only screen readers announce.</p>
      <button type="button" className="pngds-btn pngds-btn--secondary"><Icon name="close" className="pngds-btn__icon" /><span className="pngds-visually-hidden">Close dialog</span></button>
      <p className="pngds-m-0 pngds-mt-3">Tab here to reveal a focusable hidden link: <a className="pngds-visually-hidden-focusable pngds-link" href="#vis-demo">I appear on keyboard focus</a></p>
    </>,
  },
  'z-index': {
    code: `<div className="pngds-position-relative pngds-z-30">…</div>`,
    el: <div className="pngds-position-relative" style={{ height: 130 }}>
      {[['z-10', 0, 'bg-navy-light'], ['z-30', 30, 'bg-brand-light'], ['z-50', 60, 'bg-yellow-light']].map(([z, o, bg]) => (
        <div key={z} className={`pngds-position-absolute pngds-${z} pngds-${bg} pngds-border pngds-shadow-2 pngds-rounded pngds-p-3 pngds-text-semibold`} style={{ top: o / 2, left: o * 2, width: 160 }}>{z}</div>))}
    </div>,
  },
};

function Overview() {
  return (
    <>
      <PageHead eyebrow="Utility classes" title="Utility classes" lead="Single-purpose CSS classes that adjust spacing, layout, colour and text without writing new CSS. Every class starts with pngds- and uses the design tokens, so changes stay on-brand." />
      <CodeBlock lang="html" code={`<div class="pngds-display-flex pngds-gap-4 pngds-p-5 pngds-bg-off-white pngds-rounded">…</div>`} />
      <CardGrid>
        {utilities.map((u) => {
          const g = utilityGroups[u.slug];
          const n = g.classes.length + (g.extraRows?.length || 0) + (g.responsive ? g.responsive.length * 4 : 0);
          return <Card key={u.slug} href={`/utilities/${u.slug}`} LinkComponent={Link} title={u.label} footer={<Tag plain>{n} classes</Tag>}>{g.intro.split('. ')[0] + '.'}</Card>;
        })}
      </CardGrid>
    </>
  );
}

function ClassTable({ g }) {
  const [q, setQ] = useState('');
  const rows = [...g.classes.map(([n, css, note]) => ({ n, css, note })), ...(g.extraRows || []).map(([n, css]) => ({ n, css }))];
  const shown = rows.filter((r) => !q || r.n.includes(q.toLowerCase()) || r.css.includes(q.toLowerCase()));
  return (
    <>
      {rows.length > 20 && <TextInput label="Filter classes" type="search" width="medium" value={q} onChange={(e) => setQ(e.target.value)} hint={`${shown.length} of ${rows.length} shown`} />}
      <div className="pngds-table-wrap" tabIndex={0} role="region" aria-label="Class reference" style={{ maxHeight: '32rem', overflowY: 'auto' }}>
        <table className="pngds-table">
          <caption>Class reference</caption>
          <thead><tr><th scope="col">Class</th><th scope="col">CSS</th><th scope="col">Notes</th></tr></thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.n}>
                <th scope="row"><code className="docs-inline">.pngds-{r.n}</code></th>
                <td><code className="docs-inline" style={{ whiteSpace: 'normal' }}>{r.css}</code></td>
                <td>{r.note || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UtilityPage({ slug }) {
  const u = utilities.find((x) => x.slug === slug);
  const g = utilityGroups[slug];
  const ex = examples[slug];
  return (
    <>
      <PageHead eyebrow="Utility classes" title={u.label} lead={g.intro} />
      {ex && <Example title="Example" code={ex.code}>{ex.el}</Example>}
      <h2 className="pngds-h2">Classes</h2>
      <ClassTable g={g} />
      {g.responsive && (
        <>
          <h2 className="pngds-h2">Responsive classes</h2>
          <p className="pngds-body">Replace <code className="docs-inline">{'{bp}'}</code> with a breakpoint to apply the class from that width upwards:</p>
          <ul className="pngds-body">{Object.entries(BREAKPOINTS).map(([k, w]) => <li key={k}><code className="docs-inline">{k}</code> — from {parseFloat(w) * 16}px</li>)}</ul>
          <div className="pngds-table-wrap" tabIndex={0} role="region" aria-label="Responsive classes">
            <table className="pngds-table"><thead><tr><th scope="col">Class pattern</th><th scope="col">CSS</th></tr></thead>
              <tbody>{g.responsive.map(([n, css]) => <tr key={n}><th scope="row"><code className="docs-inline">.pngds-{n}</code></th><td><code className="docs-inline">{css}</code></td></tr>)}</tbody>
            </table>
          </div>
        </>
      )}
      <p className="pngds-small pngds-text-secondary pngds-mt-6">Utilities use <code className="docs-inline">!important</code> so they always win over component styles. They are included in <TextLink href="downloads/pngds.css" download>pngds.css</TextLink>.</p>
    </>
  );
}

export default function Utilities() {
  const { slug } = useParams();
  if (!slug) return <Overview />;
  if (!utilityGroups[slug]) return <NotFound />;
  return <UtilityPage slug={slug} />;
}

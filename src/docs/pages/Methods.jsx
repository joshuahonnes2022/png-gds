import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Alert, Button, Breadcrumbs, Card, CardGrid, Checkboxes, Icon, Pictogram, Select, SideNav, StepIndicator,
  Table, Tag, TextInput, TextLink, Pagination, Tabs,
} from '../../lib';
import { PageHead, Example, DoDont, Checklist, Frame } from '../DocUI.jsx';
import { methods } from '../data/nav.js';
import { provinces } from '../data/components.jsx';
import { patternPages } from './Patterns.jsx';
import NotFound from './NotFound.jsx';

/* ======================== Overview ======================== */
function Overview() {
  return (
    <>
      <PageHead eyebrow="Methods" title="Methods" lead="Proven ways to solve common service-design problems. Each method combines components with guidance on when and how to use them." />
      <CardGrid>
        {methods.map((m) => <Card key={m.slug} href={`/methods/${m.slug}`} LinkComponent={Link} title={m.label}>{m.desc}</Card>)}
      </CardGrid>
    </>
  );
}

/* ======================== Charts and graphs ======================== */
const chartData = [
  { p: 'NCD', v: 92 }, { p: 'Morobe', v: 64 }, { p: 'East New Britain', v: 58 }, { p: 'Eastern Highlands', v: 41 },
  { p: 'Southern Highlands', v: 27 }, { p: 'Western', v: 19 },
];
function BarChart() {
  const max = 100; const rowH = 36; const left = 150; const w = 560;
  return (
    <svg viewBox={`0 0 ${w} ${chartData.length * rowH + 30}`} role="img" aria-labelledby="ch-t ch-d" style={{ width: '100%', maxWidth: 640, height: 'auto', fontFamily: 'inherit' }}>
      <title id="ch-t">Online service uptake by province (example data)</title>
      <desc id="ch-d">Horizontal bar chart. NCD is highest at 92 percent; Western is lowest at 19 percent. Full figures are in the table below.</desc>
      {[0, 25, 50, 75, 100].map((t) => {
        const x = left + (t / max) * (w - left - 40);
        return <g key={t}><line x1={x} x2={x} y1={0} y2={chartData.length * rowH} stroke="#DDDCD6" /><text x={x} y={chartData.length * rowH + 18} fontSize="12" textAnchor="middle" fill="#55544F">{t}%</text></g>;
      })}
      {chartData.map((d, i) => {
        const bw = (d.v / max) * (w - left - 40);
        return (
          <g key={d.p} transform={`translate(0 ${i * rowH})`}>
            <text x={left - 10} y={rowH / 2 + 5} fontSize="13" textAnchor="end" fill="#1A1A1A">{d.p}</text>
            <rect x={left} y={7} width={bw} height={rowH - 14} rx="3" fill={i === 0 ? '#203864' : '#D55345'} />
            <text x={left + bw + 6} y={rowH / 2 + 5} fontSize="13" fontWeight="700" fill="#1A1A1A">{d.v}%</text>
          </g>
        );
      })}
    </svg>
  );
}
function Charts() {
  return (
    <>
      <PageHead eyebrow="Methods" title="Charts and graphs" lead="Charts help people see patterns quickly — but only if everyone can read them. Always give the key message in words and the data in a table." />
      <Tabs label="Chart or table" tabs={[
        { label: 'Chart', content: <><p className="pngds-text-semibold pngds-m-0 pngds-mb-1">NCD has the highest online uptake; Western Province the lowest.</p><p className="pngds-caption pngds-m-0 pngds-mb-3">Example data for demonstration only — not real statistics.</p><BarChart /></> },
        { label: 'Table', content: <Table caption="Online service uptake by province (example data)" columns={[{ key: 'p', label: 'Province' }, { key: 'v', label: 'Uptake (%)', numeric: true }]} rows={chartData} /> },
      ]} />
      <h2 className="pngds-h2">Choose the right chart</h2>
      <Table caption="Chart types" columns={[{ key: 'q', label: 'To show' }, { key: 'c', label: 'Use' }]} rows={[
        { q: 'Compare amounts between categories', c: 'Horizontal bar chart (labels stay readable on phones)' },
        { q: 'Change over time', c: 'Line chart, or column chart for few points' },
        { q: 'Parts of a whole', c: 'Stacked bar — avoid pie charts with more than 3 slices' },
        { q: 'A single important number', c: 'A large figure with a sentence, not a chart' },
      ]} />
      <Checklist items={[
        'State the main finding as the chart title or a sentence above it.',
        'Provide the data as a table (a tab, accordion or link) — never only a picture.',
        'Label bars and lines directly; avoid legends where possible.',
        'Use navy and deep orange first; don’t rely on colour alone — use labels and patterns.',
        'Make SVG charts with role="img", a title and a description; avoid chart images with text in them.',
        'Keep charts light: inline SVG or a small library, not a 300 KB charting framework.',
      ]} />
    </>
  );
}

/* ======================== Easy Read ======================== */
function EasyRead() {
  const rows = [
    ['digital-id', 'SevisPass is your digital ID.', 'It proves who you are online.'],
    ['mobile', 'You can apply on your phone.', 'You need a phone number.'],
    ['document', 'Have your birth certificate ready.', 'Or a letter from your ward councillor.'],
    ['calendar', 'We will send you an SMS.', 'This takes about 10 working days.'],
  ];
  return (
    <>
      <PageHead eyebrow="Methods" title="Easy Read" lead="Easy Read uses short sentences and a supporting picture for each idea. It helps people with intellectual disability, low literacy, or who read English or Tok Pisin as another language." />
      <Example title="Easy Read layout" code={`<div className="pngds-easy-read-row">\n  <Pictogram name="mobile" size="lg" />\n  <p>You can apply on your phone.</p>\n</div>`}>
        <h2 className="pngds-h3 pngds-mt-0">How to get SevisPass</h2>
        {rows.map(([p, a, b]) => (
          <div key={p} className="pngds-display-flex pngds-align-items-center pngds-gap-5 pngds-py-4 pngds-border-bottom">
            <Pictogram name={p} size="lg" />
            <div className="pngds-text-xl pngds-leading-body"><p className="pngds-m-0">{a}</p><p className="pngds-m-0">{b}</p></div>
          </div>
        ))}
      </Example>
      <h2 className="pngds-h2">Writing Easy Read</h2>
      <Checklist items={[
        'One idea per sentence; 15 words or fewer.',
        'Use at least 20px text (24px is better) and 1.5 line spacing.',
        'Put a picture on the left of every main idea; text on the right.',
        'Use everyday words. Explain hard words the first time.',
        'Use numbers, not words: “10 days”, not “ten days”.',
        'Test with people who will use it — including in provinces.',
      ]} />
      <Callout />
    </>
  );
}
function Callout() {
  return <Alert title="Offer both versions"><p>Link to the Easy Read version from the top of the standard page, and back again. Provide Easy Read in Tok Pisin for core citizen services.</p></Alert>;
}

/* ======================== Inactive fields ======================== */
function InactiveFields() {
  return (
    <>
      <PageHead eyebrow="Methods" title="Inactive fields" lead="Sometimes people can’t change a field. Choose carefully between disabled, read-only and simply showing the information — each behaves differently for keyboard and screen-reader users." />
      <Example title="Read-only vs disabled" html={false} code={`<TextInput label="SevisPass number" value="SP-48213-0091" readOnly hint="This comes from your SevisPass. Contact NID to change it." />\n<TextInput label="Province" value="Southern Highlands" disabled />`}>
        <TextInput label="SevisPass number" defaultValue="SP-48213-0091" readOnly hint="Read-only: can be focused, selected and copied, and is announced by screen readers." />
        <TextInput label="Province" defaultValue="Southern Highlands" disabled hint="Disabled: skipped by Tab, low contrast, not submitted with the form." />
      </Example>
      <Table caption="Which to use" columns={[{ key: 's', label: 'Situation' }, { key: 'u', label: 'Use' }]} rows={[
        { s: 'Information people can’t change but need to see or copy (ID numbers, verified names)', u: 'Plain text in a Summary list — or a read-only field if it must be in the form' },
        { s: 'A field that only applies after another answer', u: 'Hide it and reveal it when relevant (conditional question)' },
        { s: 'An action that isn’t available yet', u: 'Keep the button active and explain the problem on submit' },
        { s: 'Temporarily locked while saving', u: 'Disabled, with a loader and a status message' },
      ]} />
      <DoDont dos={['Explain why something can’t be changed and how to change it.', 'Show verified information as text, not as a greyed-out field.']}
        donts={['Don’t disable submit buttons to signal errors.', 'Don’t use disabled fields for information people need to read — disabled text fails contrast.']} />
    </>
  );
}

/* ======================== Maps ======================== */
function Maps() {
  const offices = [
    { n: 'Waigani Service Centre (example)', a: 'Near the Waigani government offices', h: '8:00am – 4:00pm', p: 'National Capital District' },
    { n: 'Lae Service Centre (example)', a: 'Opposite the main market, Lae', h: '8:00am – 4:00pm', p: 'Morobe' },
    { n: 'Mendi Service Centre (example)', a: 'Beside the provincial headquarters, Mendi', h: '8:00am – 4:00pm', p: 'Southern Highlands' },
  ];
  return (
    <>
      <PageHead eyebrow="Methods" title="Maps" lead="Maps are useful for showing where things are, but they are heavy on data and hard to use with a screen reader. Always give the same information as text." />
      <Example title="Office finder: list first, map optional" html={false} code={`<ul>{offices.map(o => <li>…address, hours, directions link…</li>)}</ul>\n<details><summary>Show map (uses about 1 MB of data)</summary>…</details>`}>
        <ul className="pngds-m-0 pngds-p-0" style={{ listStyle: 'none' }}>
          {offices.map((o) => (
            <li key={o.n} className="pngds-display-flex pngds-gap-4 pngds-py-4 pngds-border-bottom">
              <Pictogram name="location" size="sm" />
              <div><p className="pngds-m-0 pngds-text-bold">{o.n}</p><p className="pngds-m-0">{o.a} · {o.p}</p><p className="pngds-m-0 pngds-text-sm pngds-text-secondary">Open {o.h}, Monday to Friday · <a className="pngds-link" href="#">Get directions</a></p></div>
            </li>
          ))}
        </ul>
        <details className="pngds-mt-4"><summary className="pngds-text-semibold" style={{ cursor: 'pointer' }}>Show map (uses about 1 MB of data)</summary>
          <div className="pngds-graphic-weave pngds-graphic-weave--light pngds-rounded pngds-mt-3 pngds-display-flex pngds-align-items-center pngds-justify-center pngds-text-semibold" style={{ height: 180 }}>Map loads here only when asked</div>
        </details>
      </Example>
      <Checklist items={[
        'Give addresses, landmarks and directions in text — many PNG locations are described by landmark, not street.',
        'Load interactive maps only when people ask (low-bandwidth default).',
        'Make map controls keyboard accessible and give the map a text title.',
        'Never use a map as the only way to choose a location — offer a province or district list.',
      ]} />
    </>
  );
}

/* ======================== Search and filters ======================== */
const services = [
  { t: 'Apply for SevisPass', c: 'Identity', p: 'All provinces', o: true },
  { t: 'Register a business name', c: 'Business', p: 'All provinces', o: true },
  { t: 'Renew vehicle registration', c: 'Transport', p: 'NCD', o: true },
  { t: 'Teacher registration', c: 'Education', p: 'All provinces', o: false },
  { t: 'Land title search', c: 'Land', p: 'NCD', o: true },
  { t: 'Apply for a fishing licence', c: 'Business', p: 'Milne Bay', o: false },
  { t: 'Book a clinic appointment', c: 'Health', p: 'Southern Highlands', o: true },
  { t: 'School fee subsidy', c: 'Education', p: 'All provinces', o: false },
  { t: 'Disaster SMS alerts', c: 'Safety', p: 'All provinces', o: true },
];
function SearchFilters() {
  const [q, setQ] = useState('');
  const [cats, setCats] = useState([]);
  const [online, setOnline] = useState(false);
  const [page, setPage] = useState(1);
  const res = useMemo(() => services.filter((s) => (!q || s.t.toLowerCase().includes(q.toLowerCase())) && (!cats.length || cats.includes(s.c)) && (!online || s.o)), [q, cats, online]);
  const per = 5; const total = Math.max(1, Math.ceil(res.length / per)); const shown = res.slice((page - 1) * per, page * per);
  return (
    <>
      <PageHead eyebrow="Methods" title="Search and filters" lead="Help people narrow long lists of services, documents or offices. Results update as filters change, with the count announced to screen readers." />
      <Frame url="https://example.gov.pg/services">
        <div className="pngds-container pngds-py-5">
          <div className="pngds-row">
            <div className="pngds-col-12 pngds-col-md-4">
              <h2 className="pngds-h4 pngds-mt-0">Filter</h2>
              <TextInput label="Search services" type="search" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
              <Checkboxes legend="Category" value={cats} onChange={(v) => { setCats(v); setPage(1); }} options={['Identity', 'Business', 'Transport', 'Education', 'Health', 'Land', 'Safety']} />
              <div className="pngds-choice"><input type="checkbox" id="onl" checked={online} onChange={(e) => { setOnline(e.target.checked); setPage(1); }} /><label htmlFor="onl">Available online only</label></div>
              {(q || cats.length > 0 || online) && <Button variant="tertiary" size="sm" onClick={() => { setQ(''); setCats([]); setOnline(false); }}>Clear all filters</Button>}
            </div>
            <div className="pngds-col-12 pngds-col-md-8">
              <p role="status" className="pngds-text-semibold pngds-mt-0">{res.length} service{res.length === 1 ? '' : 's'} found</p>
              {(cats.length > 0 || online) && <p className="pngds-display-flex pngds-gap-2 pngds-flex-wrap">{cats.map((c) => <Tag key={c} variant="info" plain>{c}</Tag>)}{online && <Tag variant="success" plain>Online</Tag>}</p>}
              <ul className="pngds-p-0 pngds-m-0" style={{ listStyle: 'none' }}>
                {shown.map((s) => (
                  <li key={s.t} className="pngds-py-3 pngds-border-bottom">
                    <a href="#" className="pngds-link pngds-text-semibold">{s.t}</a>
                    <p className="pngds-m-0 pngds-text-sm pngds-text-secondary">{s.c} · {s.p} · {s.o ? 'Apply online' : 'In person only'}</p>
                  </li>
                ))}
              </ul>
              {!res.length && <p>No services match. Try fewer filters or different words.</p>}
              <Pagination current={page} total={total} onChange={setPage} />
            </div>
          </div>
        </div>
      </Frame>
      <Checklist items={['Show the number of results and announce it (role="status").', 'Apply checkbox filters straight away; use a button only for slow server searches.', 'Show active filters and a “Clear all” option.', 'Stack filters above results on phones; consider a “Filter” disclosure on long lists.', 'Keep search terms in the URL so results can be shared and bookmarked.']} />
    </>
  );
}

/* ======================== You are here ======================== */
function YouAreHere() {
  return (
    <>
      <PageHead eyebrow="Methods" title="You are here" lead="People should always know where they are: which site, which section and which page — or which step of a service. Use several signals together." />
      <Example title="Signals working together" html={false} code={`<MainNav currentPath="/services" … />   // aria-current on the section\n<Breadcrumbs items={[…]} />\n<SideNav currentPath="/services/business/register" … />\n<h1>Register a business name</h1>`}>
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Services', href: '#' }, { label: 'Business', href: '#' }, { label: 'Register a business name' }]} />
        <div className="pngds-row">
          <div className="pngds-col-12 pngds-col-md-4"><SideNav currentPath="#reg" groups={[{ title: 'Business', items: [{ label: 'Overview', href: '#ov' }, { label: 'Register a business name', href: '#reg' }, { label: 'Change details', href: '#ch' }, { label: 'Close a business', href: '#cl' }] }]} /></div>
          <div className="pngds-col-12 pngds-col-md-8"><h2 className="pngds-h2 pngds-mt-0">Register a business name</h2><p className="pngds-m-0">The page title matches the breadcrumb and highlighted side-navigation link.</p></div>
        </div>
      </Example>
      <Example title="Inside a service" html={false} code={`<StepIndicator steps={[…]} current={2} />`}>
        <StepIndicator steps={['Your details', 'Business', 'Pay', 'Confirm']} current={2} />
      </Example>
      <Table caption="Signals and where to use them" columns={[{ key: 's', label: 'Signal' }, { key: 'w', label: 'Where' }]} rows={[
        { s: 'Main navigation current section (aria-current)', w: 'Every page' },
        { s: 'Breadcrumbs', w: 'Content pages two or more levels deep' },
        { s: 'Side navigation current page', w: 'Sections with 4+ pages' },
        { s: 'Page <title> matching the H1', w: 'Every page — e.g. “Register a business name – IPA – PNG Government”' },
        { s: 'Step indicator (“Step 2 of 4”)', w: 'Inside transactional services, instead of breadcrumbs' },
      ]} />
    </>
  );
}

const pages = {
  'charts-and-graphs': Charts, 'easy-read': EasyRead, 'inactive-fields': InactiveFields, maps: Maps,
  'search-and-filters': SearchFilters, 'you-are-here': YouAreHere, ...patternPages,
};
export default function Methods() {
  const { slug } = useParams();
  if (!slug) return <Overview />;
  const P = pages[slug];
  return P ? <P /> : <NotFound />;
}

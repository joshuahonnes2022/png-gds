import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  SkipLink, Masthead, Header, MainNav, Footer, Banner, Button, ButtonGroup, Card, CardGrid, SearchInput,
  Alert, Table, Tag, SideNav, Breadcrumbs, Icon, TextLink, Pagination,
} from '../../lib';
import { PageHead, Frame, Checklist, guardDemoLinks } from '../DocUI.jsx';
import { templates } from '../data/nav.js';
import { CREST, DICT_LOGO, CREST_BADGE } from '../assets.js';
import NotFound from './NotFound.jsx';

/* ======================== Department website ======================== */
export function DepartmentTemplate() {
  const nav = [{ label: 'Home', href: '#' }, { label: 'Services', href: '#s' }, { label: 'Programs', href: '#p' }, { label: 'News', href: '#n' }, { label: 'Publications', href: '#pub' }, { label: 'About us', href: '#a' }, { label: 'Contact', href: '#c' }];
  return (
    <div className="pngds">
      <SkipLink href="#tpl-main" />
      <Masthead badgeSrc={CREST_BADGE} />
      <Header layout="center" crestSrc={CREST} logoSrc={DICT_LOGO} logoAlt="Department of Information and Communications Technology" agency="Department of Example Affairs" />
      <MainNav items={nav} currentPath="#" end={<div style={{ width: 'min(240px, 22vw)' }} className="docs-header-search"><SearchInput placeholder="Search" id="tpl-search" /></div>} />
      <Banner><strong>Public holiday:</strong> Offices are closed on Independence Day, 16 September. Online services stay open.</Banner>
      <main id="tpl-main">
        <section style={{ background: 'var(--pngds-neutral-50)', borderBottom: '1px solid var(--pngds-color-border)' }}>
          <div className="pngds-container" style={{ paddingBlock: 'var(--pngds-space-8)', display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', alignItems: 'center' }}>
            <div>
              <h1 className="pngds-display">Serving communities across Papua New Guinea</h1>
              <p className="pngds-lead">Find services, apply online and get the latest updates from the Department.</p>
              <SearchInput label="What do you need?" placeholder="e.g. apply for a permit" id="tpl-hero-search" />
            </div>
            <div style={{ background: 'var(--pngds-navy-700)', color: '#fff', borderRadius: 12, padding: 28, borderTop: '6px solid var(--pngds-amber-400)' }}>
              <p style={{ margin: '0 0 6px', color: 'var(--pngds-yellow-300)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Most used</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 2 }}>
                {['Apply for a permit', 'Renew a licence', 'Pay a fee online', 'Check application status', 'Make a complaint'].map((s) => (
                  <li key={s}><a href="#" style={{ color: '#fff', display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--pngds-navy-600)', fontWeight: 600 }}>{s}<Icon name="arrow-right" size={18} /></a></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <div className="pngds-container">
          <section style={{ paddingTop: 'var(--pngds-space-7)' }}>
            <h2 className="pngds-h2" style={{ marginTop: 0 }}>Services</h2>
            <CardGrid>
              {[['Licences and permits', 'Apply for, renew or change a licence or permit.'], ['Grants and funding', 'Community and provincial funding programs.'], ['Registrations', 'Register organisations, assets and activities.'], ['Reports and data', 'Annual reports, statistics and open data.']].map(([t, d]) => (
                <Card key={t} href="#" title={t}>{d}</Card>
              ))}
            </CardGrid>
          </section>
          <section style={{ paddingTop: 'var(--pngds-space-7)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
              <h2 className="pngds-h2" style={{ marginTop: 0 }}>Latest news</h2><TextLink href="#">All news</TextLink>
            </div>
            <CardGrid>
              {[['Media release', 'New online service launched for provincial applicants', '4 November 2026'], ['Notice', 'Public consultation open on draft service standards', '28 October 2026'], ['Event', 'Digital services roadshow visits Mt Hagen and Lae', '21 October 2026']].map(([e, t, dt]) => (
                <Card key={t} href="#" eyebrow={e} title={t} footer={dt} />
              ))}
            </CardGrid>
          </section>
          <section style={{ paddingTop: 'var(--pngds-space-7)' }}>
            <Alert title="Need help?"><p>Call <strong>+675 000 0000</strong> (8am–4pm, Monday to Friday) or visit your provincial office.</p></Alert>
          </section>
        </div>
      </main>
      <Footer columns={[
        { title: 'Services', links: [{ label: 'All services', href: '#' }, { label: 'Forms', href: '#' }, { label: 'Fees', href: '#' }] },
        { title: 'About', links: [{ label: 'About us', href: '#' }, { label: 'Corporate plan', href: '#' }, { label: 'Careers', href: '#' }] },
        { title: 'Contact', content: <p style={{ margin: 0 }}>PO Box 0000<br />Waigani, NCD<br />+675 000 0000</p> },
      ]} bottom={<><span>© 2026 Government of Papua New Guinea</span><span><a href="#">Privacy</a> · <a href="#">Accessibility</a> · <a href="#">Terms</a></span></>} />
    </div>
  );
}

/* ======================== Citizen portal ======================== */
export function PortalTemplate() {
  const [page, setPage] = useState(1);
  const apps = [
    { ref: 'BUS-26-00431', svc: 'Business name registration', date: '3 Nov 2026', status: 'review' },
    { ref: 'VEH-26-18820', svc: 'Vehicle registration renewal', date: '28 Oct 2026', status: 'payment' },
    { ref: 'NDC-26-04817', svc: 'Disaster SMS alerts', date: '12 Oct 2026', status: 'approved' },
    { ref: 'LND-26-00092', svc: 'Land title search', date: '2 Sep 2026', status: 'rejected' },
  ];
  const map = { review: ['info', 'Under review'], payment: ['warning', 'Awaiting payment'], approved: ['success', 'Approved'], rejected: ['error', 'Rejected'] };
  return (
    <div className="pngds">
      <SkipLink href="#portal-main" />
      <Masthead badgeSrc={CREST_BADGE} />
      <Header crestSrc={CREST} agency="Government Services Portal" actions={<><span className="pngds-small" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Icon name="user" size={18} />Kila Wari</span><Button variant="secondary" size="sm">Sign out</Button></>} />
      <div className="pngds-container docs-shell">
        <aside className="docs-aside"><SideNav currentPath="#apps" groups={[{ title: 'My account', items: [{ label: 'Dashboard', href: '#dash' }, { label: 'My applications', href: '#apps' }, { label: 'Payments', href: '#pay' }, { label: 'Documents', href: '#docs' }, { label: 'Messages', href: '#msg' }, { label: 'Profile and SevisPass', href: '#profile' }] }]} /></aside>
        <main id="portal-main" style={{ minWidth: 0 }}>
          <Breadcrumbs items={[{ label: 'My account', href: '#' }, { label: 'My applications' }]} />
          <h1 className="pngds-h1">Welcome back, Kila</h1>
          <Alert variant="warning" title="Action needed">
            <p>Pay K85.00 for <strong>Vehicle registration renewal</strong> by 11 November. <a href="#" className="pngds-link">Pay now</a></p>
          </Alert>
          <div className="docs-dashboard-kpi">
            {[['Active applications', '2'], ['Awaiting payment', 'K85.00'], ['Approved this year', '5'], ['Unread messages', '1']].map(([l, v]) => (
              <div className="docs-kpi" key={l}><span>{l}</span><strong>{v}</strong></div>
            ))}
          </div>
          <h2 className="pngds-h2" style={{ marginTop: 0 }}>My applications</h2>
          <Table caption="Applications" columns={[{ key: 'ref', label: 'Reference' }, { key: 'svc', label: 'Service' }, { key: 'date', label: 'Submitted' }, { key: 'status', label: 'Status' }]} rows={apps}
            render={{ ref: (v) => <a href="#" className="pngds-link" style={{ fontFamily: 'var(--pngds-font-mono)' }}>{v}</a>, status: (v) => <Tag variant={map[v][0]}>{map[v][1]}</Tag> }} />
          <Pagination current={page} total={3} onChange={setPage} />
          <h2 className="pngds-h2">Start something new</h2>
          <ButtonGroup><Button iconStart="plus">New application</Button><Button variant="secondary" iconStart="search">Find a service</Button></ButtonGroup>
        </main>
      </div>
      <Footer columns={[]} bottom={<><span>© 2026 Government of Papua New Guinea</span><span><a href="#">Privacy</a> · <a href="#">Help</a></span></>} />
    </div>
  );
}

const registry = { department: { C: DepartmentTemplate, url: 'https://example.gov.pg' }, 'service-portal': { C: PortalTemplate, url: 'https://services.example.gov.pg/account' } };

export function TemplatesIndex() {
  return (
    <>
      <PageHead eyebrow="Templates" title="Page templates" lead="Complete pages assembled from PNG-GDS components. Use them as the starting point for new agency websites and services." />
      <CardGrid>
        {templates.map((t) => <Card key={t.slug} href={`/templates/${t.slug}`} LinkComponent={Link} title={t.label} highlight>{t.desc}</Card>)}
      </CardGrid>
      <h2 className="pngds-h2">Planned templates</h2>
      <p className="pngds-body">Agency website, government information portal, online application portal, service dashboard, mobile app interface and reporting dashboard — scheduled for Phase 4.</p>
    </>
  );
}

export function TemplatePage() {
  const { slug } = useParams();
  const t = templates.find((x) => x.slug === slug);
  const r = registry[slug];
  if (!t || !r) return <NotFound />;
  const C = r.C;
  return (
    <>
      <PageHead eyebrow="Template" title={t.label} lead={t.desc} />
      <ButtonGroup>
        <Button as="a" href={`#/preview/${slug}`} target="_blank" rel="noopener noreferrer" variant="secondary" iconEnd="external">Open full-screen preview<span className="pngds-visually-hidden"> (opens in a new tab)</span></Button>
      </ButtonGroup>
      <Frame url={r.url}><C /></Frame>
      <h2 className="pngds-h2">What’s included</h2>
      <Checklist items={slug === 'department'
        ? ['Masthead, centred header (crest left, title middle, DICT logo right), main navigation and search', 'Site-wide notification banner', 'Hero with service search and most-used tasks', 'Service and news card grids', 'Help panel and standard footer']
        : ['Signed-in header with user name and sign-out', 'Account side navigation', 'Action-needed alert', 'Summary figures', 'Applications table with status tags and pagination']} />
    </>
  );
}

export function TemplatePreview() {
  const { slug } = useParams();
  const r = registry[slug];
  if (!r) return <div className="pngds pngds-container"><NotFound /></div>;
  const C = r.C;
  return <div onClickCapture={guardDemoLinks}><C /></div>;
}

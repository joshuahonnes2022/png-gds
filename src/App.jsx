import { useEffect, useRef } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SkipLink, Masthead, Header, MainNav, SideNav, Footer, Select, Icon, VERSION } from './lib';
import { mainNav, sideNavFor } from './docs/data/nav.js';
import { CREST, DICT_LOGO, CREST_BADGE } from './docs/assets.js';
import Home from './docs/pages/Home.jsx';
import GetStarted from './docs/pages/GetStarted.jsx';
import CoreStyles from './docs/pages/CoreStyles.jsx';
import Utilities from './docs/pages/Utilities.jsx';
import Methods from './docs/pages/Methods.jsx';
import { ComponentsIndex, ComponentPage, ComponentCategory } from './docs/pages/Components.jsx';
import { TemplatesIndex, TemplatePage, TemplatePreview } from './docs/pages/Templates.jsx';
import Guidelines from './docs/pages/Guidelines.jsx';
import Governance from './docs/pages/Governance.jsx';
import SearchPage from './docs/pages/Search.jsx';
import NotFound from './docs/pages/NotFound.jsx';

const OLD_FOUNDATIONS = { branding: 'logo', icons: 'iconography', spacing: '../utilities/spacing' };
function FoundationsRedirect() {
  const { slug } = useParams();
  const to = OLD_FOUNDATIONS[slug] || slug;
  return <Navigate replace to={to.startsWith('../') ? `/${to.slice(3)}` : `/core/${to}`} />;
}
function PatternsRedirect() {
  const { slug } = useParams();
  return <Navigate replace to={`/methods/${slug}`} />;
}

function DocsLayout({ section, children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const groups = sideNavFor(section);
  const flat = groups.flatMap((g) => g.items);
  return (
    <div className="pngds-container docs-shell">
      {groups.length > 0 && (
        <aside className="docs-aside"><SideNav groups={groups} currentPath={pathname} LinkComponent={Link} label={`${section} pages`} /></aside>
      )}
      <main id="main" className="docs-main" tabIndex={-1} style={groups.length ? undefined : { gridColumn: '1 / -1' }}>
        {flat.length > 1 && (
          <div className="docs-aside-mobile">
            <Select label="Jump to page" value={flat.some((i) => i.href === pathname) ? pathname : ''} placeholder="Choose a page"
              options={flat.map((i) => ({ value: i.href, label: i.label }))} onChange={(e) => e.target.value && navigate(e.target.value)} />
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

function ScrollAndFocus() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (first.current) { first.current = false; return; }
    // Move focus to main content on route change so screen-reader users hear the new page.
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname.startsWith('/preview/')) {
    return <Routes><Route path="/preview/:slug" element={<TemplatePreview />} /></Routes>;
  }

  const wrap = (section, el) => <DocsLayout section={section}>{el}</DocsLayout>;

  return (
    <div className="pngds">
      <ScrollAndFocus />
      <SkipLink />
      <Masthead badgeSrc={CREST_BADGE} />
      <Header
        layout="center"
        agency="PNG Government Digital Design System"
        govLabel={null}
        href="/"
        crestSrc={CREST}
        logoSrc={DICT_LOGO}
        logoAlt="Department of Information and Communications Technology"
        LinkComponent={Link}
      />
      <MainNav
        items={mainNav}
        currentPath={pathname}
        LinkComponent={Link}
        end={
          <Link to="/search" className="docs-nav-search" aria-label="Search the design system">
            <Icon name="search" size={22} /><span className="docs-nav-search__label">Search</span>
          </Link>
        }
      />
      <Routes>
        <Route path="/" element={<main id="main" tabIndex={-1} style={{ outline: 'none' }}><Home /></main>} />
        <Route path="/get-started/*" element={wrap('get-started', <GetStarted />)} />
        <Route path="/core" element={wrap('core', <CoreStyles />)} />
        <Route path="/core/:slug" element={wrap('core', <CoreStyles />)} />
        <Route path="/utilities" element={wrap('utilities', <Utilities />)} />
        <Route path="/utilities/:slug" element={wrap('utilities', <Utilities />)} />
        <Route path="/methods" element={wrap('methods', <Methods />)} />
        <Route path="/methods/:slug" element={wrap('methods', <Methods />)} />
        <Route path="/foundations/:slug" element={<FoundationsRedirect />} />
        <Route path="/patterns/:slug" element={<PatternsRedirect />} />
        <Route path="/components" element={wrap('components', <ComponentsIndex />)} />
        <Route path="/components/category/:cat" element={wrap('components', <ComponentCategory />)} />
        <Route path="/components/:slug" element={wrap('components', <ComponentPage />)} />
        <Route path="/templates" element={wrap('templates', <TemplatesIndex />)} />
        <Route path="/templates/:slug" element={wrap('templates', <TemplatePage />)} />
        <Route path="/guidelines/:slug" element={wrap('guidelines', <Guidelines />)} />
        <Route path="/governance/*" element={wrap('governance', <Governance />)} />
        <Route path="/search" element={wrap('search', <SearchPage />)} />
        <Route path="*" element={wrap('none', <NotFound />)} />
      </Routes>
      <Footer
        LinkComponent={Link}
        columns={[
          { title: 'Design system', links: [{ label: 'Get started', href: '/get-started' }, { label: 'Core styles', href: '/core' }, { label: 'Components', href: '/components' }, { label: 'Utility classes', href: '/utilities' }, { label: 'Methods', href: '/methods' }, { label: 'Templates', href: '/templates' }] },
          { title: 'Resources', links: [{ label: 'Downloads', href: '/get-started/downloads' }, { label: 'Accessibility', href: '/guidelines/accessibility' }, { label: 'Release notes', href: '/governance/releases' }, { label: 'Contribute', href: '/governance/contribute' }] },
          { title: 'PNG Digital Government', links: [{ label: 'DICT Digital Standards', href: 'https://www.ict.gov.pg/digital-standards/' }, { label: 'Digital Government Standards', href: 'https://www.digital.gov.pg/index.php/standards/' }, { label: 'DICT website', href: 'https://www.ict.gov.pg/' }] },
          { title: 'Owner', content: <p style={{ margin: 0 }}>Digital Service Design and User Experience Standards<br />Department of Information and Communications Technology<br />Port Moresby, NCD</p> },
        ]}
        bottom={<><span>© 2026 Government of Papua New Guinea · DICT</span><span>PNG-GDS v{VERSION} · One Government. One Digital Design System.</span></>}
      />
    </div>
  );
}

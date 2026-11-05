import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardGrid, Icon, Callout, TextLink } from '../../lib';
import { components } from '../data/components.jsx';

const layers = [
  ['Government digital identity', 'Crest, masthead, colours and brand rules that make a site recognisably PNG Government.'],
  ['Core styles', 'Colour, typography, grid, page layout, pictograms and design tokens.'],
  ['UI component library', `${components.length} accessible components in React and plain HTML/CSS.`],
  ['Methods', 'Proven ways to solve citizen tasks: applications, search, charts, Easy Read.'],
  ['Page templates', 'Department websites and citizen portals, ready to adapt.'],
  ['UX, accessibility and content', 'WCAG 2.2 AA, plain language, English and Tok Pisin.'],
  ['Developer resources', 'Tokens, utility classes, CSS, React library and starter kit.'],
];

const audiences = [
  { icon: 'code', title: 'Developers', text: 'Install the React library or drop in one CSS file. Every component ships with copyable React and HTML.', href: '/get-started/developers' },
  { icon: 'palette', title: 'Designers', text: 'Use the colour, type and spacing tokens and component specs to design consistent services.', href: '/get-started/designers' },
  { icon: 'people', title: 'Agencies and DTOs', text: 'Understand what the system covers, how adoption works and how DICT supports you.', href: '/get-started' },
];

export default function Home() {
  const featured = ['button', 'text-input', 'error-summary', 'step-indicator', 'card', 'alert'].map((s) => components.find((c) => c.slug === s));
  return (
    <>
      <section className="pngds-hero">
        <div className="pngds-container pngds-hero__inner">
          <p className="docs-hero-eyebrow">PNG Government Digital Design System</p>
          <h1 className="pngds-display" style={{ maxWidth: '16ch' }}>One Government. One Digital Design System.</h1>
          <p className="pngds-hero__lead">Shared foundations, accessible components and proven patterns so every government website and service is consistent, easy to use and recognisably Papua New Guinean.</p>
          <ButtonGroup>
            <Button as={Link} to="/get-started" size="lg" iconEnd="arrow-right">Get started</Button>
            <Button as={Link} to="/components" size="lg" variant="secondary">Browse components</Button>
          </ButtonGroup>
          <div className="docs-stats">
            <div><strong>{components.length}</strong><span>components</span></div>
            <div><strong>WCAG 2.2</strong><span>Level AA target</span></div>
            <div><strong>0 KB</strong><span>web fonts to download</span></div>
            <div><strong>2</strong><span>languages: English, Tok Pisin</span></div>
          </div>
        </div>
      </section>

      <div className="pngds-container">
        <section className="docs-section" aria-labelledby="who">
          <h2 className="pngds-h2" id="who" style={{ marginTop: 0 }}>Start here</h2>
          <CardGrid>
            {audiences.map((a) => (
              <Card key={a.title} href={a.href} LinkComponent={Link} title={a.title} headingLevel={3}
                footer={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--pngds-color-link)', fontWeight: 600 }}>Learn more <Icon name="arrow-right" size={16} /></span>}>
                <div className="docs-icon-badge" style={{ order: -1, marginBottom: 8 }}><Icon name={a.icon} /></div>
                <p className="pngds-card__text">{a.text}</p>
              </Card>
            ))}
          </CardGrid>
        </section>

        <section className="docs-section" aria-labelledby="why">
          <div style={{ display: 'grid', gap: 'var(--pngds-space-7)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))' }}>
            <div>
              <h2 className="pngds-h2" id="why" style={{ marginTop: 0 }}>Why a national design system?</h2>
              <p className="pngds-body">Today, each agency designs its own buttons, forms, colours and navigation. Citizens meet a different experience at every department, and government pays to build the same things again and again.</p>
              <p className="pngds-body">The PNG-GDS turns the <TextLink href="https://www.ict.gov.pg/digital-standards/" external>PNG Digital Government Standards</TextLink> into ready-made, tested building blocks — so agencies spend less time designing and more time delivering services.</p>
              <Callout title="Standards say what. The design system shows how.">
                <p style={{ margin: 0 }}>The Digital Service Design Standards and UX Framework set the requirements. This system provides the components and code to meet them.</p>
              </Callout>
            </div>
            <div>
              <h2 className="pngds-h2" style={{ marginTop: 0 }}>Seven layers</h2>
              <p style={{ margin: '-8px 0 0' }}><TextLink as={Link} href="/get-started/ecosystem">See how the layers fit together</TextLink></p>
              <ol className="docs-layers">
                {layers.map(([t, d]) => <li key={t}><div><strong>{t}</strong><span>{d}</span></div></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="docs-section" aria-labelledby="feat">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <h2 className="pngds-h2" id="feat" style={{ marginTop: 0 }}>Featured components</h2>
            <TextLink as={Link} href="/components">View all {components.length} components</TextLink>
          </div>
          <CardGrid>
            {featured.map((c) => (
              <Card key={c.slug} href={`/components/${c.slug}`} LinkComponent={Link} eyebrow={c.category} title={c.name}>{c.summary}</Card>
            ))}
          </CardGrid>
        </section>

        <section className="docs-section" aria-labelledby="png">
          <h2 className="pngds-h2" id="png" style={{ marginTop: 0 }}>Built for Papua New Guinea</h2>
          <CardGrid>
            {[
              ['phone', 'Mobile-first', 'Designed for small screens first — most citizens reach government on a phone.'],
              ['download', 'Low bandwidth', 'System fonts, inline icons, no heavy frameworks in the CSS. Pages stay light on 3G.'],
              ['globe', 'English and Tok Pisin', 'Built-in component text in both languages, with room for other approved languages.'],
              ['people', 'Inclusive', 'Large touch targets, strong contrast and clear errors for people of all abilities and digital skills.'],
            ].map(([i, t, d]) => (
              <div key={t} style={{ borderTop: '4px solid var(--pngds-orange-500)', paddingTop: 16 }}>
                <Icon name={i} size={28} style={{ color: 'var(--pngds-orange-600)' }} />
                <h3 className="pngds-h4" style={{ marginTop: 8 }}>{t}</h3>
                <p style={{ margin: 0, color: 'var(--pngds-neutral-700)' }}>{d}</p>
              </div>
            ))}
          </CardGrid>
        </section>
      </div>
    </>
  );
}

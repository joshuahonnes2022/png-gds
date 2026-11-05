import { Link, Route, Routes } from 'react-router-dom';
import { Alert, Table, Tag, TextLink, Accordion, Callout } from '../../lib';
import { PageHead, Checklist } from '../DocUI.jsx';
import { components } from '../data/components.jsx';

function Model() {
  const roles = [
    ['DICT — System owner and governance authority', 'Sets national direction, approves standards and major releases, keeps alignment with PNG Digital Standards, coordinates adoption and monitors compliance.'],
    ['Digital Service Design and UX Standards team', 'Leads development, maintains foundations and components, writes UX and accessibility guidance, runs design reviews and manages this website.'],
    ['Government agency representatives', 'Provide requirements, join user testing, test components on real services and propose improvements.'],
    ['Government ICT teams and developers', 'Implement approved components, report issues, contribute improvements and stay on supported versions.'],
    ['Technical and accessibility reviewers', 'Quality assurance, accessibility audits, responsive testing and security review.'],
  ];
  return (
    <>
      <PageHead eyebrow="Governance" title="Governance model" lead="Centralised governance, shared implementation. DICT owns the system; agencies help shape it." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Roles</h2>
      <Accordion defaultOpen={[0]} items={roles.map(([t, c]) => ({ title: t, content: c }))} />
      <h2 className="pngds-h2">Principles</h2>
      <Checklist items={['Centralised governance, shared implementation', 'Reuse before creating new components', 'Accessibility by design', 'Standards-based implementation', 'Controlled agency-level customisation', 'Transparent version management', 'Continuous improvement', 'Collaboration between government agencies']} />
      <h2 className="pngds-h2">How it fits together</h2>
      <Table caption="The three instruments" columns={[{ key: 'i', label: 'Instrument' }, { key: 'q', label: 'Answers the question' }]} rows={[
        { i: 'Digital Service Design Standards and UX Framework', q: 'What standards and principles must agencies follow?' },
        { i: 'PNG Government Digital Design System (this site)', q: 'What design resources and components should agencies use?' },
        { i: 'Government digital services and platforms', q: 'How are the standards and resources applied in real services?' },
      ]} />
      <h2 className="pngds-h2">Component status</h2>
      <Table caption="Lifecycle stages" columns={[{ key: 's', label: 'Status' }, { key: 'm', label: 'Meaning' }]} render={{ s: (v) => <Tag variant={{ Stable: 'success', Beta: 'warning', Draft: 'neutral', Deprecated: 'error' }[v]}>{v}</Tag> }} rows={[
        { s: 'Draft', m: 'Being designed. Do not use in live services.' },
        { s: 'Beta', m: 'Usable in live services; may change after pilot feedback.' },
        { s: 'Stable', m: 'Tested for accessibility and usability. Changes follow versioning rules.' },
        { s: 'Deprecated', m: 'Will be removed in the next major version. Migrate away.' },
      ]} />
    </>
  );
}

function Roadmap() {
  const phases = [
    ['Discovery and requirements', 'Review standards, audit findings, compliance register and maturity assessment; benchmark Singapore, NSW, Queensland and Korea.', 'done'],
    ['Foundations and visual identity', 'Digital identity, colour, typography, spacing, tokens, icons.', 'done'],
    ['Component library', 'HTML/CSS and React components with accessibility testing and documentation.', 'active'],
    ['Patterns and templates', 'Service journeys, website and portal templates, usability testing.', 'active'],
    ['Documentation website and developer resources', 'This website, Figma library, GitHub repositories, starter kits, versioning.', 'active'],
    ['Pilot implementation', 'DICT website and services, He Gavman Portal and selected agency platforms.', 'todo'],
    ['Government-wide adoption', 'Adoption guidelines, training, agency support and compliance monitoring.', 'todo'],
  ];
  const label = { done: ['success', 'Complete'], active: ['info', 'In progress'], todo: ['neutral', 'Planned'] };
  return (
    <>
      <PageHead eyebrow="Governance" title="Roadmap" lead="The system is delivered in seven phases so DICT can build a strong foundation before government-wide adoption." />
      <Alert variant="warning" title="Indicative status"><p>Phase status shown here is a placeholder for the pilot build. Update it in <code className="docs-inline">src/docs/pages/Governance.jsx</code> as phases are approved.</p></Alert>
      <ol className="docs-roadmap">
        {phases.map(([t, d, s], i) => (
          <li key={t} data-n={i + 1} data-state={s}>
            <h3>Phase {i + 1}: {t} <Tag variant={label[s][0]}>{label[s][1]}</Tag></h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function Releases() {
  return (
    <>
      <PageHead eyebrow="Governance" title="Release notes" lead="PNG-GDS uses semantic versioning: MAJOR.MINOR.PATCH." />
      <Table caption="Versioning rules" columns={[{ key: 'v', label: 'Change' }, { key: 'm', label: 'Meaning' }]} rows={[
        { v: 'Major (1.0.0 → 2.0.0)', m: 'Breaking changes. Agencies get at least 6 months’ notice.' },
        { v: 'Minor (1.1.0 → 1.2.0)', m: 'New components or features. Safe to upgrade.' },
        { v: 'Patch (1.1.0 → 1.1.1)', m: 'Bug and accessibility fixes. Upgrade promptly.' },
      ]} />
      <h2 className="pngds-h2">v0.2.0 — Core styles, utilities and methods <Tag variant="success">November 2026</Tag></h2>
      <ul className="pngds-body">
        <li>DICT brand colours from the Brand Strategy: deep orange, orange, navy and secondary palette; navy buttons and navigation.</li>
        <li>Mega-menu main navigation (Get started, Core styles, Components, Utility classes, Methods, Guidelines).</li>
        <li>Core styles: Logo, Pictograms (16 new), Grid (12 columns), Page layout (heading anchors, alternating layouts, sticky container and Quick exit), Section and Graphic elements.</li>
        <li>15 groups of utility classes generated from a single spec and included in pngds.css.</li>
        <li>Methods: Charts and graphs, Easy Read, Inactive fields, Maps, Search and filters, You are here.</li>
        <li>New components: Dialog, Loader and progress bar, Hero banner. Components regrouped into eight categories.</li>
        <li>Get started: Supporting different roles, Theming (agency accent themes) and Extending.</li>
        <li>Centred header layout with the National Crest and DICT logo.</li>
      </ul>
      <h2 className="pngds-h2">v0.1.0 — Pilot release <Tag variant="info">November 2026</Tag></h2>
      <ul className="pngds-body">
        <li>Design tokens: colour, typography, spacing, radius, elevation, motion (CSS + JSON).</li>
        <li>{components.length} components across navigation, controls, forms, content and application components.</li>
        <li>Patterns: multi-step application, validation and errors, service start page, application tracking.</li>
        <li>Templates: department website, citizen account portal.</li>
        <li>English and Tok Pisin component text (Tok Pisin pending editorial review).</li>
        <li>Single-file pngds.css and HTML starter for non-React sites.</li>
      </ul>
    </>
  );
}

function Contribute() {
  return (
    <>
      <PageHead eyebrow="Governance" title="Contribute" lead="The design system improves when agencies share what they learn. Anyone working on a PNG Government service can propose a change." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Contribution process</h2>
      <ol className="pngds-body" style={{ paddingLeft: '1.25rem', display: 'grid', gap: 10 }}>
        <li><strong>Check first.</strong> Search the <TextLink as={Link} href="/components">components</TextLink> and <TextLink as={Link} href="/methods/multi-step-form">patterns</TextLink> — reuse before creating.</li>
        <li><strong>Propose.</strong> Describe the user need, evidence (research, analytics, audit findings) and which services would use it.</li>
        <li><strong>Review.</strong> The Digital Service Design and UX Standards team assesses the proposal at its fortnightly design review.</li>
        <li><strong>Build and test.</strong> Design, code and accessibility-test the change with the proposing agency.</li>
        <li><strong>Approve and release.</strong> DICT approves; the change ships in the next minor release with release notes.</li>
      </ol>
      <Callout title="Contact the team">
        <p style={{ margin: 0 }}>Digital Service Design and User Experience Standards, Department of Information and Communications Technology. Report issues and propose changes through the PNG-GDS GitHub repository once published, or by email to the team.</p>
      </Callout>
    </>
  );
}

export default function Governance() {
  return (
    <Routes>
      <Route index element={<Model />} />
      <Route path="roadmap" element={<Roadmap />} />
      <Route path="releases" element={<Releases />} />
      <Route path="contribute" element={<Contribute />} />
    </Routes>
  );
}

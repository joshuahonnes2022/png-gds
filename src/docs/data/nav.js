import { components, categories, categorySlug, categoryDesc } from './components.jsx';

const REQUIRED = 'Required for national brand compliance';

/* ---------- Section page lists ---------- */
export const getStarted = [
  { slug: '', label: 'About PNG-GDS' },
  { slug: 'roles', label: 'Supporting different roles' },
  { slug: 'ecosystem', label: 'Our ecosystem' },
  { slug: 'designers', label: 'For designers' },
  { slug: 'developers', label: 'For developers' },
  { slug: 'figma-ui-kit', label: 'Figma UI Kit' },
  { slug: 'theming', label: 'Theming' },
  { slug: 'extending', label: 'Extending' },
  { slug: 'downloads', label: 'Downloads' },
];

export const coreStyles = [
  { slug: 'logo', label: 'Logo', required: true },
  { slug: 'colour', label: 'Colour', required: true },
  { slug: 'typography', label: 'Typography', required: true },
  { slug: 'iconography', label: 'Iconography', required: true },
  { slug: 'pictograms', label: 'Pictograms', required: true },
  { slug: 'grid', label: 'Grid' },
  { slug: 'page-layout', label: 'Page layout' },
  { slug: 'section', label: 'Section' },
  { slug: 'graphic-elements', label: 'Graphic elements', required: true },
  { slug: 'tokens', label: 'Design tokens' },
];

export const utilities = [
  { slug: 'background', label: 'Background' },
  { slug: 'borders', label: 'Borders' },
  { slug: 'box-shadow', label: 'Box shadow' },
  { slug: 'display', label: 'Display' },
  { slug: 'flex', label: 'Flex' },
  { slug: 'float', label: 'Float' },
  { slug: 'overflow', label: 'Overflow' },
  { slug: 'position', label: 'Position' },
  { slug: 'reflow', label: 'Reflow' },
  { slug: 'spacing', label: 'Spacing' },
  { slug: 'svg', label: 'SVG' },
  { slug: 'text', label: 'Text' },
  { slug: 'vertical-alignment', label: 'Vertical alignment' },
  { slug: 'visibility', label: 'Visibility' },
  { slug: 'z-index', label: 'Z-index' },
];

export const methods = [
  { slug: 'charts-and-graphs', label: 'Charts and graphs', desc: 'Present data so everyone can understand it, with an accessible table alternative.' },
  { slug: 'easy-read', label: 'Easy Read', desc: 'Short sentences and supporting pictures for people with low literacy or learning disability.' },
  { slug: 'inactive-fields', label: 'Inactive fields', desc: 'When to use disabled, read-only or hidden fields — and when not to.' },
  { slug: 'maps', label: 'Maps', desc: 'Show locations accessibly, with a text alternative and low-data fallback.' },
  { slug: 'search-and-filters', label: 'Search and filters', desc: 'Help people narrow long lists of services, offices or documents.' },
  { slug: 'you-are-here', label: 'You are here', desc: 'Show people where they are in a site or service.' },
  { slug: 'multi-step-form', label: 'Multi-step application', desc: 'Collect information across several steps, check answers and submit.' },
  { slug: 'error-handling', label: 'Validation and errors', desc: 'Tell people what went wrong and how to fix it.' },
  { slug: 'service-start', label: 'Service start page', desc: 'Explain a service and what people need before they begin.' },
  { slug: 'application-tracking', label: 'Application tracking', desc: 'Let citizens check the status of something they applied for.' },
];
// kept for older imports
export const patterns = methods;

export const templates = [
  { slug: 'department', label: 'Department website', desc: 'Home page for a national department or agency.' },
  { slug: 'service-portal', label: 'Citizen account portal', desc: 'Signed-in dashboard for a citizen’s applications.' },
];

export const guidelines = [
  { slug: 'accessibility', label: 'Accessibility (WCAG 2.2 AA)' },
  { slug: 'content', label: 'Plain language and Tok Pisin' },
  { slug: 'low-bandwidth', label: 'Mobile-first and low bandwidth' },
  { slug: 'forms', label: 'Designing forms' },
];

export const governance = [
  { slug: '', label: 'Governance model' },
  { slug: 'roadmap', label: 'Roadmap' },
  { slug: 'releases', label: 'Release notes' },
  { slug: 'contribute', label: 'Contribute' },
];

const gsHref = (s) => (s ? `/get-started/${s}` : '/get-started');
const govHref = (s) => (s ? `/governance/${s}` : '/governance');

/* ---------- Main navigation with mega-menu panels ---------- */
export const mainNav = [
  {
    label: 'Get started', href: '/get-started', match: '/get-started',
    description: 'How the PNG Government Digital Design System works, and how to start using it in your agency.',
    children: [
      ...getStarted.map((g) => ({ label: g.label, href: gsHref(g.slug) })),
      { label: 'Templates', href: '/templates' },
      { label: 'Governance', href: '/governance' },
      { label: 'Contribute', href: '/governance/contribute' },
    ],
  },
  {
    label: 'Core styles', href: '/core', match: '/core',
    description: 'Core styles that create the PNG Government look and feel. Items marked ◆ are required for national brand compliance.',
    children: coreStyles.map((c) => ({ label: c.label, href: `/core/${c.slug}`, badge: c.required ? REQUIRED : undefined })),
  },
  {
    label: 'Components', href: '/components', match: '/components',
    description: `${components.length} reusable, accessible building blocks, grouped by what they help people do.`,
    children: [
      ...categories.map((c) => ({ label: c, href: `/components/category/${categorySlug(c)}` })),
      { label: 'All components', href: '/components' },
    ],
  },
  {
    label: 'Utility classes', href: '/utilities', match: '/utilities',
    description: 'Single-purpose CSS classes for spacing, layout, colour and text — adjust a design without writing new CSS.',
    children: utilities.map((u) => ({ label: u.label, href: `/utilities/${u.slug}` })),
  },
  {
    label: 'Methods', href: '/methods', match: '/methods',
    description: 'Proven ways to solve common citizen tasks and service-design problems.',
    children: methods.map((m) => ({ label: m.label, href: `/methods/${m.slug}` })),
  },
  {
    label: 'Guidelines', href: '/guidelines/accessibility', match: '/guidelines',
    description: 'Accessibility, content, low-bandwidth and form design guidance.',
    children: guidelines.map((g) => ({ label: g.label, href: `/guidelines/${g.slug}` })),
  },
  { label: 'Release notes', href: '/governance/releases' },
];

/* ---------- Side navigation per section ---------- */
export const sideNavFor = (section) => {
  switch (section) {
    case 'get-started': return [
      { title: 'Get started', items: getStarted.map((g) => ({ label: g.label, href: gsHref(g.slug) })) },
      { title: 'Governance', items: governance.map((g) => ({ label: g.label, href: govHref(g.slug) })) },
    ];
    case 'core': return [{ title: 'Core styles', items: [{ label: 'Overview', href: '/core' }, ...coreStyles.map((c) => ({ label: c.label, href: `/core/${c.slug}` }))] }];
    case 'components': return [
      { title: 'Overview', items: [{ label: 'All components', href: '/components' }] },
      ...categories.map((cat) => ({ title: cat, items: components.filter((c) => c.category === cat).map((c) => ({ label: c.name, href: `/components/${c.slug}` })) })),
    ];
    case 'utilities': return [{ title: 'Utility classes', items: [{ label: 'Overview', href: '/utilities' }, ...utilities.map((u) => ({ label: u.label, href: `/utilities/${u.slug}` }))] }];
    case 'methods': return [{ title: 'Methods', items: [{ label: 'Overview', href: '/methods' }, ...methods.map((m) => ({ label: m.label, href: `/methods/${m.slug}` }))] }];
    case 'templates': return [{ title: 'Templates', items: [{ label: 'All templates', href: '/templates' }, ...templates.map((t) => ({ label: t.label, href: `/templates/${t.slug}` }))] }];
    case 'guidelines': return [{ title: 'Guidelines', items: guidelines.map((g) => ({ label: g.label, href: `/guidelines/${g.slug}` })) }];
    case 'governance': return [
      { title: 'Governance', items: governance.map((g) => ({ label: g.label, href: govHref(g.slug) })) },
      { title: 'Get started', items: getStarted.slice(0, 3).map((g) => ({ label: g.label, href: gsHref(g.slug) })) },
    ];
    default: return [];
  }
};

/* ---------- Search index ---------- */
export const searchIndex = [
  ...getStarted.map((g) => ({ title: g.label, href: gsHref(g.slug), type: 'Get started', text: `${g.slug} guide start` })),
  ...coreStyles.map((c) => ({ title: c.label, href: `/core/${c.slug}`, type: 'Core style', text: `${c.slug} core style foundation brand` })),
  ...components.map((c) => ({ title: c.name, href: `/components/${c.slug}`, type: 'Component', text: `${c.summary} ${c.category} ${c.slug}` })),
  ...categories.map((c) => ({ title: c, href: `/components/category/${categorySlug(c)}`, type: 'Component group', text: categoryDesc[c] })),
  ...utilities.map((u) => ({ title: `${u.label} utilities`, href: `/utilities/${u.slug}`, type: 'Utility classes', text: `${u.slug} utility class css helper` })),
  ...methods.map((m) => ({ title: m.label, href: `/methods/${m.slug}`, type: 'Method', text: m.desc })),
  ...templates.map((t) => ({ title: t.label, href: `/templates/${t.slug}`, type: 'Template', text: t.desc })),
  ...guidelines.map((g) => ({ title: g.label, href: `/guidelines/${g.slug}`, type: 'Guideline', text: g.slug })),
  ...governance.map((g) => ({ title: g.label, href: govHref(g.slug), type: 'Governance', text: `${g.slug} governance version roadmap contribution` })),
];

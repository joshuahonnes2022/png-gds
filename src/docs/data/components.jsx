import { useState } from 'react';
import {
  Alert, Banner, Callout, Card, CardGrid, Accordion, Tabs, Table, Tag, Pagination,
  StepIndicator, SummaryList, ConfirmationPanel, Button, ButtonGroup, TextLink, Toggle,
  TextInput, Textarea, Select, Radios, Checkboxes, Checkbox, DateInput, FileUpload,
  ErrorSummary, SearchInput, Masthead, Header, MainNav, Breadcrumbs, SideNav, Footer, Icon,
  Dialog, Loader, ProgressBar, HeroBanner,
} from '../../lib';
import { CREST, DICT_LOGO, CREST_BADGE } from '../assets.js';

/* ---- small stateful demos ---- */
function ToggleDemo() {
  const [on, setOn] = useState(true);
  return <Toggle label="Email me updates about my application" checked={on} onChange={setOn} />;
}
function PaginationDemo() {
  const [p, setP] = useState(4);
  return <Pagination current={p} total={12} onChange={setP} />;
}
function RadiosDemo() {
  const [v, setV] = useState('');
  return (
    <Radios legend="How would you like to be contacted?" hint="Choose one option." value={v} onChange={setV}
      options={[
        { value: 'sms', label: 'Text message (SMS)', hint: 'Works without internet data' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone call' },
      ]} />
  );
}
function CheckboxesDemo() {
  const [v, setV] = useState(['nid']);
  return (
    <Checkboxes legend="Which documents can you provide?" hint="Select all that apply." value={v} onChange={setV}
      options={[
        { value: 'nid', label: 'National ID card or SevisPass' },
        { value: 'birth', label: 'Birth certificate' },
        { value: 'passport', label: 'Passport' },
        { value: 'letter', label: 'Letter from a ward councillor or village recorder' },
      ]} />
  );
}
function DateDemo() {
  const [d, setD] = useState({ day: '16', month: '09', year: '1975' });
  return <DateInput legend="What is your date of birth?" hint="For example, 16 09 1990" value={d} onChange={setD} />;
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  return (
    <div className="pngds-btn-group">
      <Button variant="secondary" onClick={() => setOpen(true)}>Open dialog</Button>
      <Button variant="danger" onClick={() => setDel(true)}>Withdraw application</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Save and continue later?"
        footer={<div className="pngds-btn-group"><Button onClick={() => setOpen(false)}>Save</Button><Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button></div>}>
        <p>We will send a link to your mobile so you can come back to this application within 30 days.</p>
      </Dialog>
      <Dialog danger open={del} onClose={() => setDel(false)} title="Withdraw this application?"
        footer={<div className="pngds-btn-group"><Button variant="danger" onClick={() => setDel(false)}>Yes, withdraw</Button><Button variant="secondary" onClick={() => setDel(false)}>No, keep it</Button></div>}>
        <p>You will lose your answers. The K50 fee is not refunded.</p>
      </Dialog>
    </div>
  );
}

const demoNav = [
  { label: 'Home', href: '#svc-home' },
  {
    label: 'Services', href: '#svc', match: '#svc-',
    description: 'Apply, renew, pay and track government services online or at a provincial office.',
    children: [
      { label: 'Licences and permits', href: '#svc-permits' }, { label: 'Registrations', href: '#svc-reg' },
      { label: 'Payments and fees', href: '#svc-pay' }, { label: 'Grants and funding', href: '#svc-grants' },
      { label: 'Check application status', href: '#svc-track' }, { label: 'Forms and documents', href: '#svc-forms' },
    ],
  },
  {
    label: 'Programs', href: '#prog',
    description: 'National and provincial programs delivered by the Department.',
    children: [
      { label: 'Digital Government Plan', href: '#prog-dgp' }, { label: 'Rural connectivity', href: '#prog-rural' },
      { label: 'Digital skills', href: '#prog-skills' }, { label: 'Cyber security awareness', href: '#prog-cyber' },
    ],
  },
  {
    label: 'News and media', href: '#news',
    description: 'Media releases, notices, events and publications.',
    children: [
      { label: 'Media releases', href: '#news-releases' }, { label: 'Public notices', href: '#news-notices' },
      { label: 'Events', href: '#news-events' }, { label: 'Publications', href: '#news-pubs' }, { label: 'Annual reports', href: '#news-annual' },
    ],
  },
  {
    label: 'About us', href: '#about',
    description: 'Who we are, what we do and how we are governed.',
    children: [
      { label: 'Our role', href: '#about-role' }, { label: 'Leadership', href: '#about-lead' }, { label: 'Corporate plan', href: '#about-plan' },
      { label: 'Careers', href: '#about-careers' }, { label: 'Right to information', href: '#about-rti' },
    ],
  },
  { label: 'Contact', href: '#contact' },
];

const provinces = ['Central', 'Chimbu (Simbu)', 'East New Britain', 'East Sepik', 'Eastern Highlands', 'Enga', 'Gulf', 'Hela', 'Jiwaka', 'Madang', 'Manus', 'Milne Bay', 'Morobe', 'National Capital District', 'New Ireland', 'Northern (Oro)', 'Southern Highlands', 'West New Britain', 'West Sepik (Sandaun)', 'Western', 'Western Highlands', 'Autonomous Region of Bougainville'];
export { provinces };

/* ---------------------------------------------------------------------------
   Registry. Each entry drives one page at /components/:slug.
   --------------------------------------------------------------------------- */
export const components = [
  /* ===================== NAVIGATION ===================== */
  {
    slug: 'masthead', name: 'Masthead', category: 'Page structure', status: 'Stable',
    summary: 'The official banner that tells citizens they are on a genuine PNG Government website.',
    use: ['On every page of every PNG Government website and online service, above the header.'],
    avoid: ['Never on non-government websites, contractor sites or private-sector partners.'],
    examples: [{
      title: 'Masthead with language switch', flush: true,
      el: <Masthead badgeSrc={CREST_BADGE} />,
      code: `<Masthead badgeSrc="assets/crest-badge.png" />\n\n// Hide the English / Tok Pisin switch if your site is single-language\n<Masthead showLanguage={false} badgeSrc={CREST_BADGE} />`,
    }],
    props: [['badgeSrc', 'string', '', 'National Crest image for the verification badge (shown on a white tile). Without it, a small flag mark is used.'], ['showLanguage', 'boolean', 'true', 'Show the English / Tok Pisin switch.']],
    a11y: ['The disclosure button uses aria-expanded and aria-controls.', 'Wrapped in a labelled <section> landmark.', 'Text meets 4.5:1 contrast on the dark background.'],
    dos: ['Place it as the very first visible element after the skip link.', 'Keep the wording unchanged so citizens learn to trust it.'],
    donts: ['Don’t restyle, recolour or remove it.', 'Don’t add agency messages inside it — use a Banner instead.'],
  },
  {
    slug: 'header', name: 'Government header', category: 'Page structure', status: 'Stable',
    summary: 'Identifies the agency. Follows the DICT standard layout: National Crest on the left, agency name, agency or program logo on the right.',
    use: ['At the top of every agency website and service, directly under the Masthead.'],
    avoid: ['Don’t use more than one header per page.'],
    examples: [{
      title: 'Centred layout — whole-of-government sites', flush: true,
      el: <Header layout="center" crestSrc={CREST} logoSrc={DICT_LOGO} logoAlt="Department of Information and Communications Technology" govLabel={null} agency="PNG Government Digital Design System" />,
      code: `<Header\n  layout="center"\n  crestSrc="assets/png-crest.png"\n  logoSrc="assets/dict-logo.png"\n  logoAlt="Department of Information and Communications Technology"\n  govLabel={null}\n  agency="PNG Government Digital Design System"\n/>`,
    }, {
      title: 'Agency header (default, left-aligned)', flush: true,
      el: <Header crestSrc={CREST} logoSrc={DICT_LOGO} logoAlt="Department of Information and Communications Technology" agency="Department of Information and Communications Technology" actions={<Button variant="secondary" size="sm" iconStart="user">Sign in</Button>} />,
      code: `<Header\n  agency="Department of Information and Communications Technology"\n  crestSrc="assets/png-crest.png"   // official National Crest\n  logoSrc="assets/dict-logo.png"    // agency logo, right side (768px+)\n  logoAlt="Department of Information and Communications Technology"\n  actions={<Button variant="secondary" size="sm" iconStart="user">Sign in</Button>}\n/>`,
    }],
    props: [
      ['layout', '"left" | "center"', '"left"', '"center" puts the title between the crest and the logo — for national, whole-of-government sites.'],
      ['agency', 'string', '', 'Full official name of the department, agency or provincial administration.'],
      ['crestSrc', 'string', '', 'Path to the official National Crest. A labelled placeholder shows until supplied.'],
      ['govLabel', 'string', '"Government of Papua New Guinea"', 'Line above the agency name.'],
      ['href', 'string', '"/"', 'Home page link.'],
      ['actions', 'node', '', 'Sign-in button, search or other header actions.'],
      ['logoSrc / logoAlt', 'string', '', 'Agency or program logo on the right, shown from 768px.'],
      ['programLogo', 'node', '', 'Custom node instead of logoSrc.'],
      ['LinkComponent', 'component', '"a"', 'Pass React Router’s Link for client-side routing.'],
    ],
    a11y: ['The crest + name is a single link with one tab stop.', 'Crest image must have alt text naming the National Crest.'],
    dos: ['Use the full legal name of the agency.', 'Use only the official crest artwork supplied by DICT.'],
    donts: ['Don’t redraw, stretch or recolour the National Crest.', 'Don’t put the crest on a busy photo background.'],
  },
  {
slug: 'main-navigation', name: 'Main navigation', category: 'Navigation', status: 'Stable',
    summary: 'Primary site sections, with optional mega-menu panels that list the pages in each section. Collapses to a menu button with accordions on phones.',
    use: ['For 3–7 top-level sections of a website.', 'Add a mega-menu panel (children) when a section has several pages people look for directly.'],
    avoid: ['For in-page steps of a service — use the Step indicator.', 'For more than 7 top-level items — group them.', 'Inside transactional services — keep people focused on the task.'],
    examples: [{
      title: 'Mega menu — select “Services”, “About us” or another section', flush: true,
      el: <div style={{ minHeight: 470, background: 'var(--pngds-neutral-50)' }}><MainNav currentPath="#svc-permits" defaultPanel={1} items={demoNav} /><div className="pngds-container pngds-py-5 pngds-text-secondary pngds-text-sm">Page content sits here. Press Escape or click outside to close the panel.</div></div>,
      code: `<MainNav
  currentPath={location.pathname}
  LinkComponent={Link}
  items={[
    { label: 'Home', href: '/' },
    {
      label: 'Services', href: '/services', match: '/services',
      description: 'Apply, renew, pay and track government services online.',
      children: [
        { label: 'Licences and permits', href: '/services/permits' },
        { label: 'Registrations', href: '/services/registrations' },
        { label: 'Payments and fees', href: '/services/payments' },
        // …
      ],
    },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ]}
/>`,
    }, {
      title: 'Simple links (no panels) — resize the window to see the mobile menu', flush: true,
      el: <MainNav currentPath="#n-services" items={[{ label: 'Home', href: '#n-home' }, { label: 'Services', href: '#n-services' }, { label: 'News', href: '#n-news' }, { label: 'Publications', href: '#n-pubs' }, { label: 'About us', href: '#n-about' }, { label: 'Contact', href: '#n-contact' }]} />,
      code: `<MainNav\n  currentPath={location.pathname}\n  LinkComponent={Link}\n  items={[\n    { label: 'Home', href: '/' },\n    { label: 'Services', href: '/services', match: '/services' },\n    { label: 'News', href: '/news' },\n    { label: 'About us', href: '/about' },\n  ]}\n/>`,
    }],
    props: [
      ['items', '{label, href, match?, description?, children?}[]', '[]', 'Top-level items. An item with children becomes a dropdown button with a mega-menu panel.'],
      ['items[].children', '{label, href, badge?}[]', '', 'Links shown in the panel’s 3-column grid. badge adds a ◆ marker with a text label.'],
      ['items[].description', 'string', '', 'One sentence under the panel title.'],
      ['currentPath', 'string', '', 'Current URL path — marks the active section and page.'],
      ['end', 'node', '', 'Content at the right of the bar, e.g. a search link.'],
      ['defaultPanel', 'number', 'null', 'Index of a panel to open on first render (for demos).'],
      ['label', 'string', '"Main"', 'Accessible name of the nav landmark.'],
      ['LinkComponent', 'component', '"a"', 'Router link component.'],
    ],
    a11y: ['Dropdowns are buttons with aria-expanded and aria-controls (disclosure pattern), not hover menus.', 'Escape closes the open panel and returns focus to its button; clicking outside also closes it.', 'Current section and current page use aria-current="page".', 'On phones, panels become accordions inside the menu; every link is at least 44px tall.'],
    dos: ['Use short, plain labels (1–2 words).', 'Make the panel title a link to the section’s overview page.', 'Keep panels to 12 links or fewer.'],
    donts: ['Don’t open panels on hover — people on touch screens and keyboards can’t use hover.', 'Don’t nest panels inside panels.'],
  },
  {
    slug: 'breadcrumbs', name: 'Breadcrumbs', category: 'Navigation', status: 'Stable',
    summary: 'Shows where the current page sits in the site and lets people move up a level.',
    use: ['On content pages two or more levels deep.'], avoid: ['On the home page or inside a transactional service.'],
    examples: [{ title: 'Breadcrumbs', el: <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Services', href: '#' }, { label: 'Business and trade', href: '#' }, { label: 'Register a business name' }]} />, code: `<Breadcrumbs\n  items={[\n    { label: 'Home', href: '/' },\n    { label: 'Services', href: '/services' },\n    { label: 'Register a business name' },  // current page, no href\n  ]}\n/>` }],
    props: [['items', '{label, href?}[]', '[]', 'Trail from home to current page. The last item is the current page.'], ['LinkComponent', 'component', '"a"', 'Router link component.']],
    a11y: ['Uses <nav aria-label="Breadcrumb"> and an ordered list.', 'Current page has aria-current="page".', 'Separators are CSS, so screen readers don’t announce them.'],
    dos: ['Match page titles exactly.'], donts: ['Don’t use breadcrumbs as the only navigation.'],
  },
  {
    slug: 'side-navigation', name: 'Side navigation', category: 'Navigation', status: 'Stable',
    summary: 'Navigation within a section of related pages.',
    use: ['For sections with 4 or more related pages, such as guidance or policy collections.'], avoid: ['On short sites — use main navigation only.'],
    examples: [{ title: 'Side navigation', el: <div style={{ maxWidth: 280 }}><SideNav currentPath="#apply" groups={[{ title: 'Business registration', items: [{ label: 'Overview', href: '#overview' }, { label: 'Who can apply', href: '#who' }, { label: 'How to apply', href: '#apply' }, { label: 'Fees', href: '#fees' }, { label: 'After you apply', href: '#after' }] }]} /></div>, code: `<SideNav\n  currentPath={location.pathname}\n  groups={[{\n    title: 'Business registration',\n    items: [\n      { label: 'Overview', href: '/business' },\n      { label: 'How to apply', href: '/business/apply' },\n    ],\n  }]}\n/>` }],
    props: [['groups', '{title, items[]}[]', '[]', 'Grouped links.'], ['currentPath', 'string', '', 'Highlights the current page.'], ['label', 'string', '"Section"', 'Landmark label.']],
    a11y: ['<nav> landmark with a distinct label from the main navigation.', 'Current page uses aria-current, colour and bold weight — not colour alone.'],
    dos: ['Keep order the same as the user journey.'], donts: ['Don’t nest more than two levels.'],
  },
  {
    slug: 'tabs', name: 'Tabs', category: 'Navigation', status: 'Stable',
    summary: 'Switch between related views of the same content without leaving the page.',
    use: ['When content can be split into clear, parallel groups that users don’t need to compare side by side.'], avoid: ['For sequential steps.', 'When users need to see everything — use headings.'],
    examples: [{ title: 'Tabs (use ← → arrow keys)', el: <Tabs label="Fees" tabs={[{ label: 'Individuals', content: <p style={{ margin: 0 }}>Standard application: <strong>K50.00</strong>. Processing in 10 working days.</p> }, { label: 'Businesses', content: <p style={{ margin: 0 }}>Business application: <strong>K250.00</strong>. Includes certificate.</p> }, { label: 'Community groups', content: <p style={{ margin: 0 }}>Registered community organisations are <strong>exempt</strong> from fees.</p> }]} />, code: `<Tabs\n  label="Fees"\n  tabs={[\n    { label: 'Individuals', content: <p>…</p> },\n    { label: 'Businesses', content: <p>…</p> },\n  ]}\n/>` }],
    props: [['tabs', '{label, content}[]', '[]', 'Tab definitions.'], ['label', 'string', '"Tabs"', 'Accessible name of the tab list.'], ['defaultIndex', 'number', '0', 'Initially selected tab.'], ['onChange', '(index) => void', '', 'Called when the tab changes.']],
    a11y: ['Full WAI-ARIA tabs pattern: role tablist/tab/tabpanel.', 'Arrow keys, Home and End move between tabs; Tab moves into the panel.'],
    dos: ['Keep labels short and parallel.'], donts: ['Don’t hide critical information in a non-default tab.'],
  },
  {
    slug: 'pagination', name: 'Pagination', category: 'Navigation', status: 'Stable',
    summary: 'Moves through long lists of results across pages.',
    use: ['Search results, news listings, registers.'], avoid: ['For multi-step forms.'],
    examples: [{ title: 'Pagination', el: <PaginationDemo />, code: `const [page, setPage] = useState(1);\n\n<Pagination current={page} total={12} onChange={setPage} />` }],
    props: [['current', 'number', '1', 'Current page.'], ['total', 'number', '1', 'Total pages.'], ['onChange', '(page) => void', '', 'Called with the new page.']],
    a11y: ['Each page button reads as “Page 4”, not just “4”.', 'Current page uses aria-current="page".'],
    dos: ['Show total results above the list.'], donts: ['Don’t use infinite scroll — it breaks the footer and wastes data.'],
  },

  /* ===================== ACTIONS ===================== */
  {
    slug: 'button', name: 'Button', category: 'Actions and controls', status: 'Stable',
    summary: 'Lets people take an action, such as starting or submitting an application.',
    use: ['Primary: the single most important action on a page.', 'Secondary: alternative actions.', 'Tertiary: low-emphasis actions like “Cancel”.'],
    avoid: ['For navigation to another page — use a link (or Button with href if it must look like a button, e.g. “Start now”).'],
    examples: [
      { title: 'Variants', el: <ButtonGroup><Button>Submit application</Button><Button variant="secondary">Save and continue later</Button><Button variant="tertiary">Cancel</Button></ButtonGroup>, code: `<Button>Submit application</Button>\n<Button variant="secondary">Save and continue later</Button>\n<Button variant="tertiary">Cancel</Button>` },
      { title: 'Start button, sizes and destructive', el: <ButtonGroup><Button size="lg" href="#" iconEnd="arrow-right">Start now</Button><Button variant="dark" size="sm">Small dark</Button><Button variant="danger" iconStart="close">Withdraw application</Button><Button disabled>Disabled</Button></ButtonGroup>, code: `<Button size="lg" href="/apply/step-1" iconEnd="arrow-right">Start now</Button>\n<Button variant="dark" size="sm">Small dark</Button>\n<Button variant="danger" iconStart="close">Withdraw application</Button>` },
    ],
    props: [['variant', '"primary" | "secondary" | "tertiary" | "dark" | "danger"', '"primary"', 'Visual emphasis.'], ['size', '"sm" | "md" | "lg"', '"md"', 'Size. All sizes keep a 36px+ touch target; md and lg are 44px+.'], ['href', 'string', '', 'Renders an <a> styled as a button.'], ['iconStart / iconEnd', 'IconName', '', 'Optional icon.'], ['block', 'boolean', 'false', 'Full width (useful on mobile forms).'], ['type', 'string', '"button"', 'Set "submit" in forms.']],
    a11y: ['Minimum 44 × 44px target.', 'Yellow focus state with dark underline meets 3:1 against all backgrounds.', 'Text label always present — icons are decorative.'],
    dos: ['Use verbs: “Submit application”, “Pay K50”.', 'One primary button per screen.'], donts: ['Don’t use “Click here” or “Submit” alone.', 'Don’t disable a submit button to signal errors — let people submit and show the Error summary.'],
  },
  {
    slug: 'link', name: 'Text link', category: 'Actions and controls', status: 'Stable',
    summary: 'Takes people to another page or resource.',
    use: ['Inline in content and lists.'], avoid: ['To trigger actions — use a Button.'],
    examples: [{ title: 'Links', el: <p style={{ margin: 0 }}>Read the <TextLink href="#">Digital Government Act 2022</TextLink> or visit the <TextLink href="https://www.ict.gov.pg" external>DICT website</TextLink>.</p>, code: `<TextLink href="/legislation/digital-government-act">Digital Government Act 2022</TextLink>\n<TextLink href="https://www.ict.gov.pg" external>DICT website</TextLink>` }],
    props: [['href', 'string', '', 'Destination.'], ['external', 'boolean', 'false', 'Opens in new tab, adds icon and “(opens in a new tab)” for screen readers.'], ['as', 'component', '"a"', 'Router Link.']],
    a11y: ['Always underlined — colour alone is not enough.', 'Visited links change colour.', 'Link text makes sense out of context.'],
    dos: ['Describe the destination: “Download the 2026 budget (PDF, 2 MB)”.'], donts: ['Don’t write “click here” or “read more”.'],
  },
  {
    slug: 'toggle', name: 'Toggle switch', category: 'Actions and controls', status: 'Beta',
    summary: 'Turns a single setting on or off immediately.',
    use: ['Account preferences that save instantly.'], avoid: ['Inside forms that need a Submit — use a Checkbox.'],
    examples: [{ title: 'Toggle', el: <ToggleDemo />, code: `const [on, setOn] = useState(true);\n<Toggle label="Email me updates" checked={on} onChange={setOn} />` }],
    props: [['label', 'string', '', 'What the setting controls.'], ['checked', 'boolean', '', 'State.'], ['onChange', '(checked) => void', '', 'Called on toggle.']],
    a11y: ['role="switch" with aria-checked.', 'State shown with text and position, not colour only.'],
    dos: ['Apply the change immediately.'], donts: ['Don’t use for yes/no questions in forms.'],
  },

  /* ===================== FORMS ===================== */
  {
    slug: 'text-input', name: 'Text input', category: 'Forms and inputs', status: 'Stable',
    summary: 'Collects short text such as names, phone numbers and email addresses.',
    use: ['Single-line answers.'], avoid: ['Answers longer than a sentence — use Textarea.'],
    examples: [
      { title: 'Text inputs', el: <><TextInput label="Full name" hint="As shown on your SevisPass or ID card" autoComplete="name" /><TextInput label="Mobile number" type="tel" prefix="+675" width="medium" inputMode="tel" autoComplete="tel-national" /><TextInput label="Email address" type="email" optional autoComplete="email" /></>, code: `<TextInput label="Full name" hint="As shown on your SevisPass or ID card" autoComplete="name" />\n<TextInput label="Mobile number" type="tel" prefix="+675" width="medium" inputMode="tel" />\n<TextInput label="Email address" type="email" optional />` },
      { title: 'With an error', el: <TextInput label="Employee number" width="medium" error="Enter your employee number, like 123456" defaultValue="12AB" />, code: `<TextInput\n  label="Employee number"\n  width="medium"\n  error="Enter your employee number, like 123456"\n/>` },
    ],
    props: [['label', 'string', '', 'Visible label (required).'], ['hint', 'string', '', 'Help text, linked via aria-describedby.'], ['error', 'string', '', 'Error message. Sets aria-invalid.'], ['optional', 'boolean', 'false', 'Adds “(optional)”. Mark optional fields, not required ones.'], ['width', '"short" | "medium"', '', 'Size the box to the expected answer.'], ['prefix', 'string', '', 'Fixed prefix such as +675 or K.'], ['…rest', 'input attributes', '', 'type, autoComplete, inputMode, etc.']],
    a11y: ['Label is always visible — never placeholder-only.', 'Hint and error are announced with the field.', 'Border contrast 7.6:1; focus ring is yellow + dark inset.'],
    dos: ['Use autocomplete attributes.', 'Use inputMode="numeric" for numbers.'], donts: ['Don’t use placeholder text as a label.', 'Don’t split phone numbers into multiple boxes.'],
  },
  {
    slug: 'textarea', name: 'Textarea', category: 'Forms and inputs', status: 'Stable',
    summary: 'Collects longer answers in a multi-line box.',
    use: ['Descriptions, complaints, feedback.'], avoid: ['Short answers.'],
    examples: [{ title: 'Textarea with character count', el: <Textarea label="Describe the problem" hint="Do not include personal or financial information." maxLength={500} />, code: `<Textarea\n  label="Describe the problem"\n  hint="Do not include personal or financial information."\n  maxLength={500}\n/>` }],
    props: [['label', 'string', '', 'Label.'], ['maxLength', 'number', '', 'Shows a live “characters remaining” count.'], ['rows', 'number', '5', 'Initial height.']],
    a11y: ['Character count is announced politely as people type.'],
    dos: ['Size the box to the expected length.'], donts: ['Don’t set a limit unless there is a real reason.'],
  },
  {
    slug: 'select', name: 'Select (dropdown)', category: 'Forms and inputs', status: 'Stable',
    summary: 'Choose one option from a long list.',
    use: ['Lists of more than 7 options that people know, such as provinces.'], avoid: ['Fewer than 7 options — use Radios so all choices are visible.'],
    examples: [{ title: 'Province selector', el: <Select label="Province" placeholder="Select your province" options={provinces} />, code: `<Select\n  label="Province"\n  placeholder="Select your province"\n  options={['Central', 'Chimbu (Simbu)', 'East New Britain', /* … */]}\n/>` }],
    props: [['options', '(string | {value, label})[]', '[]', 'Options.'], ['placeholder', 'string', '', 'Empty first option.']],
    a11y: ['Native <select> — works with every screen reader and mobile picker.'],
    dos: ['Sort options logically (alphabetically for places).'], donts: ['Don’t build custom dropdowns — native is faster and accessible.'],
  },
  {
    slug: 'radios', name: 'Radio buttons', category: 'Forms and inputs', status: 'Stable',
    summary: 'Choose exactly one option from a short list.',
    use: ['2–7 mutually exclusive options.'], avoid: ['When more than one can be chosen — use Checkboxes.'],
    examples: [{ title: 'Radios with hints', el: <RadiosDemo />, code: `<Radios\n  legend="How would you like to be contacted?"\n  value={value}\n  onChange={setValue}\n  options={[\n    { value: 'sms', label: 'Text message (SMS)', hint: 'Works without internet data' },\n    { value: 'email', label: 'Email' },\n  ]}\n/>` }],
    props: [['legend', 'string', '', 'The question.'], ['options', '{value, label, hint?}[]', '[]', 'Choices.'], ['value / onChange', 'string', '', 'Controlled value.'], ['inline', 'boolean', 'false', 'Side-by-side (only for 2 short options like Yes/No).'], ['large', 'boolean', 'false', 'Large legend — use when the question is the page heading.']],
    a11y: ['Grouped in <fieldset> with <legend>.', '28px custom control with a 44px row target.'],
    dos: ['Ask one question per page on mobile services.'], donts: ['Don’t pre-select an option unless most people choose it.'],
  },
  {
    slug: 'checkboxes', name: 'Checkboxes', category: 'Forms and inputs', status: 'Stable',
    summary: 'Select one or more options, or confirm a declaration.',
    use: ['Multiple selections.', 'Declarations (“I confirm…”).'], avoid: ['Single-choice questions.'],
    examples: [
      { title: 'Checkbox group', el: <CheckboxesDemo />, code: `<Checkboxes\n  legend="Which documents can you provide?"\n  hint="Select all that apply."\n  value={docs}\n  onChange={setDocs}\n  options={[{ value: 'nid', label: 'National ID card or SevisPass' }, /* … */]}\n/>` },
      { title: 'Declaration', el: <Checkbox label="I confirm the information I have given is true and correct" />, code: `<Checkbox label="I confirm the information I have given is true and correct" />` },
    ],
    props: [['legend', 'string', '', 'The question.'], ['options', '{value, label, hint?}[]', '[]', 'Choices.'], ['value / onChange', 'string[]', '', 'Selected values.']],
    a11y: ['Fieldset + legend.', 'Check mark is drawn with CSS borders and scales with zoom.'],
    dos: ['Say “Select all that apply”.'], donts: ['Don’t use for on/off settings that apply immediately — use Toggle.'],
  },
  {
    slug: 'date-input', name: 'Date input', category: 'Forms and inputs', status: 'Stable',
    summary: 'Three boxes for day, month and year — for dates people already know.',
    use: ['Date of birth, document issue dates.'], avoid: ['Booking future dates where a calendar helps — use the native <input type="date">.'],
    examples: [{ title: 'Date of birth', el: <DateDemo />, code: `const [dob, setDob] = useState({ day: '', month: '', year: '' });\n\n<DateInput legend="What is your date of birth?" hint="For example, 16 09 1990" value={dob} onChange={setDob} />` }],
    props: [['legend', 'string', '', 'Question.'], ['value', '{day, month, year}', '{}', 'Value.'], ['onChange', '(value) => void', '', 'Called on change; non-digits stripped.']],
    a11y: ['Numeric keypad on mobile via inputMode.', 'Labels translate to Tok Pisin (De / Mun / Yia).'],
    dos: ['Accept single digits (“9” for September).'], donts: ['Don’t force a calendar picker for date of birth.'],
  },
  {
    slug: 'file-upload', name: 'File upload', category: 'Forms and inputs', status: 'Beta',
    summary: 'Attach supporting documents, with drag-and-drop on desktop.',
    use: ['Supporting documents for an application.'], avoid: ['When the information could be typed instead.'],
    examples: [{ title: 'Document upload', el: <FileUpload label="Upload a copy of your ID" hint="A clear photo taken on your phone is fine." accept=".pdf,.jpg,.png" maxSizeMB={5} multiple />, code: `<FileUpload\n  label="Upload a copy of your ID"\n  hint="A clear photo taken on your phone is fine."\n  accept=".pdf,.jpg,.png"\n  maxSizeMB={5}\n  multiple\n  onChange={setFiles}\n/>` }],
    props: [['accept', 'string', '', 'Accepted file types.'], ['multiple', 'boolean', 'false', 'Allow several files.'], ['maxSizeMB', 'number', '5', 'Shown to users; validate on the server too.'], ['onChange', '(File[]) => void', '', 'Current files.']],
    a11y: ['Real button opens the native picker — drag-and-drop is an enhancement only.', 'File list changes are announced.', 'Each Remove button names its file.'],
    dos: ['Accept phone photos (JPG/PNG).', 'State the size limit up front — many users are on mobile data.'], donts: ['Don’t require scanners.'],
  },
  {
    slug: 'error-summary', name: 'Error summary', category: 'Forms and inputs', status: 'Stable',
    summary: 'Lists every error at the top of a form after submission, with links to each field.',
    use: ['Every time a form fails validation.'], avoid: ['For success messages — use an Alert.'],
    examples: [{ title: 'Error summary', el: <ErrorSummary focusOnMount={false} errors={[{ href: '#full-name', text: 'Enter your full name' }, { href: '#dob-day', text: 'Date of birth must include a year' }]} />, code: `<ErrorSummary\n  errors={[\n    { href: '#full-name', text: 'Enter your full name' },\n    { href: '#dob-day', text: 'Date of birth must include a year' },\n  ]}\n/>` }],
    props: [['errors', '{href, text}[]', '[]', 'Errors linking to field ids.'], ['title', 'string', '"There is a problem"', 'Heading.'], ['focusOnMount', 'boolean', 'true', 'Move focus to the summary when it appears.']],
    a11y: ['Receives focus and is announced (role="alert") when it appears.', 'Links move focus to the field with the error.'],
    dos: ['Use the same wording as the inline error.', 'Prefix the page title with “Error: ”.'], donts: ['Don’t validate as people type their first attempt.'],
  },
  {
    slug: 'search', name: 'Search', category: 'Search and task flow', status: 'Stable',
    summary: 'Lets people search a website or list.',
    use: ['Site search in the header or on listing pages.'], avoid: ['As a replacement for clear navigation.'],
    examples: [{ title: 'Search', el: <SearchInput label="Search government services" placeholder="e.g. birth certificate" />, code: `<SearchInput label="Search government services" onSearch={(q) => navigate('/search?q=' + q)} />` }],
    props: [['label', 'string', '"Search"', 'Visible label (or visually hidden if omitted).'], ['onSearch', '(query) => void', '', 'Submit handler.']],
    a11y: ['Wrapped in role="search".', 'Icon button has a text label for screen readers.'],
    dos: ['Search across all content types.'], donts: ['Don’t open results in a new tab.'],
  },

  /* ===================== CONTENT ===================== */
  {
    slug: 'alert', name: 'Alert', category: 'Feedback and status', status: 'Stable',
    summary: 'Highlights information people need to notice on a page.',
    use: ['Information, success, warning or error messages related to the page.'], avoid: ['Site-wide notices — use Banner.'],
    examples: [{ title: 'Alert variants', el: <><Alert title="Processing times">Applications are processed within 10 working days.</Alert><Alert variant="success" title="Application received">We have sent a confirmation SMS to +675 7xxx xxxx.</Alert><Alert variant="warning" title="Payment pending">Pay within 7 days or your application will be cancelled.</Alert><Alert variant="error" title="Service unavailable" dismissible>Online payments are offline until 4:00pm.</Alert></>, code: `<Alert title="Processing times">Applications are processed within 10 working days.</Alert>\n<Alert variant="success" title="Application received" live>…</Alert>\n<Alert variant="warning" title="Payment pending">…</Alert>\n<Alert variant="error" title="Service unavailable" dismissible>…</Alert>` }],
    props: [['variant', '"info" | "success" | "warning" | "error"', '"info"', 'Type.'], ['title', 'string', '', 'Short heading.'], ['dismissible', 'boolean', 'false', 'Adds a close button.'], ['live', 'boolean', 'false', 'Announce when it appears after an action.']],
    a11y: ['Type conveyed by icon + hidden text, not colour alone.', 'Use `live` for dynamic alerts.'],
    dos: ['Keep to one or two sentences.'], donts: ['Don’t stack many alerts — people stop reading them.'],
  },
  {
    slug: 'banner', name: 'Notification banner', category: 'Feedback and status', status: 'Stable',
    summary: 'Urgent, site-wide notice shown under the header.',
    use: ['Outages, deadlines, emergencies (e.g. disaster alerts).'], avoid: ['Marketing or news.'],
    examples: [{ title: 'Site-wide banner', flush: true, el: <Banner><strong>Deadline extended:</strong> Lodge your 2026 annual return by 30 November. <a href="#">Find out more</a></Banner>, code: `<Banner>\n  <strong>Deadline extended:</strong> Lodge your 2026 annual return by 30 November.{' '}\n  <a href="/annual-returns">Find out more</a>\n</Banner>` }],
    props: [['children', 'node', '', 'Message (one sentence and a link).']],
    a11y: ['Labelled region landmark; black text on yellow is 16:1.'], dos: ['Remove it as soon as it no longer applies.'], donts: ['Don’t show more than one.'],
  },
  {
    slug: 'card', name: 'Card', category: 'Content', status: 'Stable',
    summary: 'A summary that links to more detail — services, news, programs.',
    use: ['Grids of services or news on landing pages.'], avoid: ['Long content — cards are for scanning.'],
    examples: [{ title: 'Service cards', el: <CardGrid><Card href="#" eyebrow="Identity" title="Apply for SevisPass" highlight>Get your digital identity to access online government services.</Card><Card href="#" eyebrow="Business" title="Register a business name">Register online and receive your certificate by email.</Card><Card href="#" eyebrow="Transport" title="Renew vehicle registration" footer="Updated 2 November 2026">Renew online and pay with your mobile wallet.</Card></CardGrid>, code: `<CardGrid>\n  <Card href="/sevispass" eyebrow="Identity" title="Apply for SevisPass" highlight>\n    Get your digital identity to access online government services.\n  </Card>\n  <Card href="/business" eyebrow="Business" title="Register a business name">…</Card>\n</CardGrid>` }],
    props: [['title', 'string', '', 'Card heading.'], ['href', 'string', '', 'Makes the whole card clickable with one tab stop.'], ['eyebrow', 'string', '', 'Category label.'], ['image / imageAlt', 'string', '', 'Optional image (lazy-loaded). Prefer none on low-bandwidth pages.'], ['highlight', 'boolean', 'false', 'Red top border for featured items.'], ['headingLevel', '2–6', '3', 'Fit the page outline.']],
    a11y: ['Only the title is a link; the whole card is clickable via a CSS overlay.', 'Heading level is configurable to keep a correct outline.'],
    dos: ['Start titles with a verb for services.'], donts: ['Don’t put several links inside a clickable card.'],
  },
  {
    slug: 'accordion', name: 'Accordion', category: 'Content', status: 'Stable',
    summary: 'Hides sections of content so people can open only what they need.',
    use: ['FAQs, eligibility details, reference content.'], avoid: ['Essential information everyone must read.'],
    examples: [{ title: 'Accordion', el: <Accordion items={[{ title: 'Who can apply?', content: 'Any Papua New Guinean citizen aged 18 or over with a valid form of identification.' }, { title: 'What does it cost?', content: 'The standard fee is K50. Pensioners and people with disabilities are exempt.' }, { title: 'How long does it take?', content: 'Most applications are processed within 10 working days.' }]} />, code: `<Accordion\n  items={[\n    { title: 'Who can apply?', content: 'Any citizen aged 18 or over…' },\n    { title: 'What does it cost?', content: 'The standard fee is K50…' },\n  ]}\n/>` }],
    props: [['items', '{title, content}[]', '[]', 'Sections.'], ['headingLevel', '2–6', '3', 'Heading level wrapping each button.'], ['showAllControl', 'boolean', 'true', '“Show all sections” button.'], ['defaultOpen', 'number[]', '[]', 'Indexes open on load.']],
    a11y: ['Buttons inside headings so screen-reader users can browse by heading.', 'aria-expanded / aria-controls; panels use hidden.'],
    dos: ['Write headings as questions people actually ask.'], donts: ['Don’t nest accordions.'],
  },
  {
    slug: 'table', name: 'Table', category: 'Content', status: 'Stable',
    summary: 'Presents data so it can be compared in rows and columns.',
    use: ['Fees, schedules, statistics.'], avoid: ['Layout.'],
    examples: [{ title: 'Data table', el: <Table caption="Application fees, 2026" striped columns={[{ key: 'service', label: 'Service' }, { key: 'time', label: 'Processing time' }, { key: 'fee', label: 'Fee (PGK)', numeric: true }, { key: 'status', label: 'Status' }]} rows={[{ service: 'Business name registration', time: '5 working days', fee: 'K250.00', status: 'online' }, { service: 'Certified copy of certificate', time: '2 working days', fee: 'K30.00', status: 'online' }, { service: 'Change of company director', time: '10 working days', fee: 'K100.00', status: 'paper' }]} render={{ status: (v) => <Tag variant={v === 'online' ? 'success' : 'neutral'}>{v === 'online' ? 'Online' : 'Paper form'}</Tag> }} />, code: `<Table\n  caption="Application fees, 2026"\n  striped\n  columns={[\n    { key: 'service', label: 'Service' },\n    { key: 'fee', label: 'Fee (PGK)', numeric: true },\n  ]}\n  rows={[{ service: 'Business name registration', fee: 'K250.00' }]}\n/>` }],
    props: [['caption', 'string', '', 'Describes the table (required for accessibility).'], ['columns', '{key, label, numeric?}[]', '[]', 'Columns; numeric right-aligns.'], ['rows', 'object[]', '[]', 'Data.'], ['render', '{[key]: (value, row) => node}', '{}', 'Custom cell rendering.'], ['striped', 'boolean', 'false', 'Zebra rows.']],
    a11y: ['<caption>, scope="col" and scope="row".', 'Scroll container is focusable and labelled on small screens.'],
    dos: ['Right-align numbers.'], donts: ['Don’t merge cells.'],
  },
  {
    slug: 'tag', name: 'Tag / status label', category: 'Feedback and status', status: 'Stable',
    summary: 'Shows the status of something — an application, a document, a service.',
    use: ['Status in lists, tables and dashboards.'], avoid: ['As buttons or links.'],
    examples: [{ title: 'Status tags', el: <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Tag variant="info">Submitted</Tag><Tag variant="warning">Awaiting payment</Tag><Tag variant="success">Approved</Tag><Tag variant="error">Rejected</Tag><Tag>Draft</Tag><Tag variant="brand" plain>Official</Tag></div>, code: `<Tag variant="info">Submitted</Tag>\n<Tag variant="warning">Awaiting payment</Tag>\n<Tag variant="success">Approved</Tag>\n<Tag variant="error">Rejected</Tag>\n<Tag>Draft</Tag>` }],
    props: [['variant', '"neutral" | "info" | "success" | "warning" | "error" | "brand"', '"neutral"', 'Meaning.'], ['plain', 'boolean', 'false', 'Hide the status dot.']],
    a11y: ['The text carries the meaning; colour reinforces it.', 'All variants meet 7:1 text contrast.'],
    dos: ['Use the same status words across all government services.'], donts: ['Don’t invent new colours for statuses.'],
  },
  {
    slug: 'step-indicator', name: 'Step indicator', category: 'Search and task flow', status: 'Stable',
    summary: 'Shows progress through a multi-step service.',
    use: ['Services with 3–7 steps.'], avoid: ['One-page forms.'],
    examples: [{ title: 'Step indicator', el: <StepIndicator steps={['Your details', 'Contact', 'Documents', 'Check answers', 'Pay']} current={3} />, code: `<StepIndicator\n  steps={['Your details', 'Contact', 'Documents', 'Check answers', 'Pay']}\n  current={3}\n/>` }],
    props: [['steps', 'string[]', '[]', 'Step names.'], ['current', 'number', '1', '1-based current step.']],
    a11y: ['“Step 3 of 5” is always shown as text.', 'aria-current="step"; completed steps announced as “(completed)”.', 'Step list hidden on phones to save space; the count and bar remain.'],
    dos: ['Keep step names short.'], donts: ['Don’t make steps clickable unless users can genuinely jump around.'],
  },
  {
    slug: 'summary-list', name: 'Summary list', category: 'Search and task flow', status: 'Stable',
    summary: '“Check your answers” before people submit.',
    use: ['The final step before submission or payment.'], avoid: ['Editing data — link back to the original question.'],
    examples: [{ title: 'Check your answers', el: <SummaryList rows={[{ key: 'Full name', value: 'Kila Wari', onChange: () => {} }, { key: 'Date of birth', value: '16 September 1990', onChange: () => {} }, { key: 'Province', value: 'Southern Highlands', onChange: () => {} }, { key: 'Contact', value: 'SMS: +675 7123 4567', onChange: () => {} }]} />, code: `<SummaryList\n  rows={[\n    { key: 'Full name', value: 'Kila Wari', onChange: () => goToStep(1) },\n    { key: 'Province', value: 'Southern Highlands', onChange: () => goToStep(1) },\n  ]}\n/>` }],
    props: [['rows', '{key, value, onChange?}[]', '[]', 'Rows. onChange adds a “Change” button.']],
    a11y: ['Description list markup.', '“Change” buttons include the field name for screen readers.'],
    dos: ['Group answers by section with headings.'], donts: ['Don’t show internal codes.'],
  },
  {
    slug: 'confirmation', name: 'Confirmation panel', category: 'Feedback and status', status: 'Stable',
    summary: 'Confirms an application has been submitted and gives a reference number.',
    use: ['The last page of every transactional service.'], avoid: ['Mid-journey saves — use an Alert.'],
    examples: [{ title: 'Confirmation', el: <ConfirmationPanel title="Application submitted" reference="DICT-2026-48213" />, code: `<ConfirmationPanel title="Application submitted" reference="DICT-2026-48213" />\n<p>We have sent a confirmation SMS to your mobile.</p>` }],
    props: [['title', 'string', '', 'Main message.'], ['reference', 'string', '', 'Reference number (monospace, easy to read over the phone).']],
    a11y: ['role="status".', 'Reference uses a monospace font so 0/O and 1/l are distinct.'],
    dos: ['Say what happens next and when.', 'Send the reference by SMS too.'], donts: ['Don’t only show the reference on screen.'],
  },
  {
    slug: 'footer', name: 'Footer', category: 'Page structure', status: 'Stable',
    summary: 'Supporting links, contact details and required legal links.',
    use: ['Every page.'], avoid: ['Repeating the whole main navigation.'],
    examples: [{ title: 'Footer', flush: true, el: <Footer columns={[{ title: 'Services', links: [{ label: 'All services', href: '#' }, { label: 'Forms', href: '#' }] }, { title: 'About', links: [{ label: 'About us', href: '#' }, { label: 'Careers', href: '#' }] }, { title: 'Contact', content: <p style={{ margin: 0 }}>Phone: +675 000 0000<br />PO Box 0000, Waigani, NCD</p> }]} bottom={<><span>© 2026 Government of Papua New Guinea</span><span><a href="#">Privacy</a> · <a href="#">Accessibility</a> · <a href="#">Terms of use</a></span></>} />, code: `<Footer\n  columns={[\n    { title: 'Services', links: [{ label: 'All services', href: '/services' }] },\n    { title: 'Contact', content: <p>Phone: +675 …</p> },\n  ]}\n  bottom={<><span>© 2026 Government of Papua New Guinea</span>…</>}\n/>` }],
    props: [['columns', '{title, links?, content?}[]', '[]', 'Columns.'], ['bottom', 'node', '', 'Copyright and legal links.']],
    a11y: ['<footer> landmark; column titles are headings.'],
    dos: ['Always include Privacy and Accessibility statement links.'], donts: ['Don’t place social media icons without text labels.'],
  },
  {
    slug: 'dialog', name: 'Dialog', category: 'Overlays', status: 'Beta',
    summary: 'A modal window that asks people to confirm or complete one short task before returning to the page.',
    use: ['Confirming a destructive or irreversible action.', 'A short, self-contained task that must interrupt the flow.'],
    avoid: ['Long forms or content — use a page.', 'Information people may need while reading the page — use an Alert or Accordion.'],
    examples: [{ title: 'Dialogs (select a button)', el: <DialogDemo />, html: false, code: `const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open dialog</Button>\n<Dialog\n  open={open}\n  onClose={() => setOpen(false)}\n  title="Save and continue later?"\n  footer={<Button onClick={save}>Save</Button>}\n>\n  <p>…</p>\n</Dialog>` }],
    props: [['open', 'boolean', 'false', 'Whether the dialog is shown.'], ['onClose', '() => void', '', 'Called on Escape, backdrop click or the close button.'], ['title', 'string', '', 'Heading; labels the dialog.'], ['footer', 'node', '', 'Action buttons.'], ['danger', 'boolean', 'false', 'Red top border for destructive confirmations.']],
    a11y: ['Built on the native <dialog> element: focus is trapped and returns to the trigger on close.', 'Escape closes; the title labels the dialog (aria-labelledby).', 'The close button has a text label for screen readers.'],
    dos: ['Make the safest option the easiest to choose.', 'Use specific button labels: “Yes, withdraw” / “No, keep it”.'], donts: ['Don’t open dialogs automatically on page load.', 'Don’t stack one dialog on another.'],
  },
  {
    slug: 'loader', name: 'Loader and progress', category: 'Feedback and status', status: 'Beta',
    summary: 'Shows that something is happening — a spinner for short waits, a progress bar when the length is known.',
    use: ['Waiting for a server response longer than about one second.', 'Uploads and multi-file processing (progress bar).'],
    avoid: ['Instant actions.', 'Whole pages — show content progressively instead.'],
    examples: [{ title: 'Loader and progress bar', el: <div className="pngds-display-grid pngds-gap-5"><Loader label="Checking your details…" /><ProgressBar value={65} label="Uploading documents" /></div>, code: `<Loader label="Checking your details…" />\n<ProgressBar value={65} label="Uploading documents" />` }],
    props: [['label', 'string', '"Loading…"', 'Text shown and announced.'], ['size', '"lg"', '', 'Larger spinner.'], ['block', 'boolean', 'false', 'Centred block for empty areas.'], ['value / max (ProgressBar)', 'number', '0 / 100', 'Progress amount.']],
    a11y: ['Loader uses role="status" so its label is announced.', 'Progress bar exposes aria-valuenow and a label.', 'Spinner slows down for people who prefer reduced motion.'],
    dos: ['Say what is happening: “Checking your details…”.'], donts: ['Don’t use a spinner without text.'],
  },
  {
    slug: 'hero-banner', name: 'Hero banner', category: 'Page structure', status: 'Beta',
    summary: 'The large introductory band at the top of a home or landing page, in DICT deep orange, navy or light.',
    use: ['Home pages and major landing pages — once per page.'], avoid: ['Transactional service pages — start with the H1.'],
    examples: [{ title: 'Hero banner variants', flush: true, el: <><HeroBanner title="Digital services for every Papua New Guinean" lead="Apply, pay and track government services online, on any phone." actions={<><Button variant="dark" size="lg" iconEnd="arrow-right">Find a service</Button><Button variant="secondary" size="lg">About us</Button></>} /><HeroBanner variant="navy" title="Navy variant" lead="Use when the page already has a lot of orange." /></>, code: `<HeroBanner\n  title="Digital services for every Papua New Guinean"\n  lead="Apply, pay and track government services online, on any phone."\n  actions={<Button variant="dark" size="lg">Find a service</Button>}\n/>` }],
    props: [['title', 'string', '', 'The page H1.'], ['lead', 'string', '', 'Short supporting sentence (shown at 24px).'], ['actions', 'node', '', 'One or two buttons.'], ['image / imageAlt', 'string', '', 'Optional supporting image (compress under 150 KB).'], ['variant', '"brand" | "navy" | "light"', '"brand"', 'Background.']],
    a11y: ['Renders the page’s only H1.', 'All text on the brand background is 24px or larger — white on #D55345 meets AA for large text only.'],
    dos: ['Keep the headline under 10 words.'], donts: ['Don’t use carousels or auto-playing video.', 'Don’t put small text on the deep-orange background.'],
  },
];

export const categories = ['Actions and controls', 'Content', 'Feedback and status', 'Forms and inputs', 'Navigation', 'Overlays', 'Page structure', 'Search and task flow'];
export const categorySlug = (c) => c.toLowerCase().replace(/\s+/g, '-');
export const categoryDesc = {
  'Actions and controls': 'Buttons, links and switches that let people act.',
  Content: 'Ways to present and organise information on a page.',
  'Feedback and status': 'Tell people what is happening and what has happened.',
  'Forms and inputs': 'Collect information from citizens accurately and accessibly.',
  Navigation: 'Help people find their way around a site or service.',
  Overlays: 'Content that appears above the page for focused tasks.',
  'Page structure': 'The required frame of every government page.',
  'Search and task flow': 'Search, multi-step journeys and checking answers.',
};
export const getComponent = (slug) => components.find((c) => c.slug === slug);
export { Icon };

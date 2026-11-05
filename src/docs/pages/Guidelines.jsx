import { useParams } from 'react-router-dom';
import { Alert, Table, Tag, TextLink, Accordion } from '../../lib';
import { PageHead, Checklist, DoDont } from '../DocUI.jsx';
import NotFound from './NotFound.jsx';

function Accessibility() {
  const rows = [
    ['1.1.1', 'Non-text content', 'Meaningful images have alt text; decorative images use alt=""', 'Card, Header (crest), Icon'],
    ['1.3.1', 'Info and relationships', 'Headings, lists, labels, fieldsets and table headers in code', 'All form components, Table'],
    ['1.4.3', 'Contrast (minimum)', 'Text 4.5:1, large text 3:1', 'All tokens pre-checked'],
    ['1.4.10', 'Reflow', 'No horizontal scrolling at 320px width', 'Containers, Table scroll region'],
    ['1.4.11', 'Non-text contrast', 'Controls and focus indicators 3:1', 'Inputs use neutral-600 borders'],
    ['2.1.1', 'Keyboard', 'Everything works with a keyboard', 'Tabs, Accordion, Nav'],
    ['2.4.1', 'Bypass blocks', 'Skip link to main content', 'SkipLink'],
    ['2.4.7 / 2.4.11', 'Focus visible / not obscured', 'Clear, unhidden focus indicator', 'Yellow + dark focus ring'],
    ['2.5.8', 'Target size (minimum)', 'Targets at least 24×24px', 'All controls 44px'],
    ['3.3.1 / 3.3.3', 'Error identification and suggestion', 'Errors described in text with how to fix', 'Error summary, field errors'],
    ['3.3.7', 'Redundant entry', 'Don’t ask for the same information twice', 'Multi-step pattern'],
    ['3.3.8', 'Accessible authentication', 'No memory or puzzle tests to sign in', 'Sign-in patterns (planned)'],
    ['4.1.2', 'Name, role, value', 'ARIA states on custom widgets', 'Toggle, Tabs, Accordion'],
  ];
  return (
    <>
      <PageHead eyebrow="Guidelines" title="Accessibility" lead="PNG-GDS targets WCAG 2.2 Level AA, subject to formal adoption by DICT. Components are built to meet it, but a service is only accessible if it is also designed, written and tested accessibly." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Key success criteria and how PNG-GDS helps</h2>
      <Table caption="WCAG 2.2 AA coverage" columns={[{ key: 'c', label: 'Criterion' }, { key: 'n', label: 'Name' }, { key: 'r', label: 'Requirement' }, { key: 'h', label: 'PNG-GDS support' }]}
        rows={rows.map(([c, n, r, h]) => ({ c, n, r, h }))} />
      <h2 className="pngds-h2">Test every service</h2>
      <Checklist items={[
        'Keyboard only: Tab through every page. Can you reach and use everything? Can you always see the focus?',
        'Screen reader: test with NVDA (Windows, free) and TalkBack (Android) — the most common in PNG.',
        'Zoom to 200% and 400%: nothing overlaps or disappears.',
        'Phone at 360px width, on a slow 3G connection (Chrome DevTools throttling).',
        'Automated scan with axe DevTools or WAVE — then fix and re-test manually.',
        'Usability test with people with disabilities and older citizens.',
      ]} />
      <Alert title="Accessibility statement">
        <p>Every government website must publish an accessibility statement in its footer, listing known issues and how to get information in another format.</p>
      </Alert>
    </>
  );
}

function Content() {
  return (
    <>
      <PageHead eyebrow="Guidelines" title="Plain language and Tok Pisin" lead="Government content should be understood the first time it is read — by everyone, in the language they are most comfortable with." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Plain English</h2>
      <DoDont dos={['Write short sentences — aim for 15–20 words.', 'Use “you” and “we”.', 'Put the most important information first.', 'Use active voice: “We will send you an SMS”.', 'Explain acronyms the first time: “Department of Information and Communications Technology (DICT)”.']}
        donts={['Don’t use legal or technical terms when everyday words work.', 'Don’t write “utilise”, “commence”, “facilitate” — write “use”, “start”, “help”.', 'Don’t put important information only in PDFs.']} />
      <h2 className="pngds-h2">Tok Pisin</h2>
      <p className="pngds-body">Core citizen-facing services should be available in English and Tok Pisin. Component text (buttons, error summaries, masthead) switches language automatically through the <code className="docs-inline">LanguageProvider</code>. Mark Tok Pisin passages with <code className="docs-inline">lang="tpi"</code> so screen readers pronounce them correctly.</p>
      <Table caption="Common interface words" columns={[{ key: 'en', label: 'English' }, { key: 'tp', label: 'Tok Pisin' }]}
        rows={[['Continue', 'Go het'], ['Back', 'Go bek'], ['Submit', 'Salim'], ['Search', 'Painim'], ['Change', 'Senisim'], ['Optional', 'Sapos yu laik'], ['Help', 'Halivim'], ['There is a problem', 'I gat wanpela hevi']].map(([en, tp]) => ({ en, tp: <span lang="tpi">{tp}</span> }))} />
      <Alert variant="warning" title="Translation review">
        <p>Tok Pisin text in this version is a working draft. All translations must be reviewed by a qualified Tok Pisin editor before a service goes live. Hiri Motu and other approved languages can be added to the language files.</p>
      </Alert>
      <h2 className="pngds-h2">Formats</h2>
      <Table caption="Style rules" columns={[{ key: 'w', label: 'Item' }, { key: 'r', label: 'Write it as' }]} rows={[
        { w: 'Currency', r: 'K50.00 (or PGK 50.00 in tables)' }, { w: 'Dates', r: '16 September 2026' }, { w: 'Times', r: '8am to 4pm' },
        { w: 'Phone numbers', r: '+675 7123 4567 / 325 0000' }, { w: 'Provinces', r: 'Use the official name: “Southern Highlands Province”' },
      ]} />
    </>
  );
}

function LowBandwidth() {
  return (
    <>
      <PageHead eyebrow="Guidelines" title="Mobile-first and low bandwidth" lead="Many citizens use prepaid mobile data on 3G or patchy 4G. Every kilobyte costs them money. Design for the slowest connection first." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>Page weight budget</h2>
      <Table caption="Recommended maximums (compressed)" columns={[{ key: 'a', label: 'Asset' }, { key: 'b', label: 'Budget', numeric: true }]} rows={[
        { a: 'Total page (first load)', b: '500 KB' }, { a: 'JavaScript', b: '170 KB' }, { a: 'CSS', b: '50 KB' }, { a: 'Each image', b: '150 KB' }, { a: 'Web fonts', b: '0 KB' },
      ]} />
      <Checklist items={[
        'Use the system font stack — PNG-GDS needs no font downloads.',
        'Compress images (WebP or JPEG at 75–80%) and set width and height to avoid layout shift.',
        'Lazy-load images below the fold (loading="lazy").',
        'Avoid carousels, auto-playing video and background videos.',
        'Make core information work without JavaScript where possible (server-rendered pages).',
        'Offer SMS and USSD alternatives for critical services.',
        'Give file sizes for every download: “Annual report (PDF, 3.2 MB)”.',
        'Test on a low-cost Android phone, not just a laptop.',
      ]} />
    </>
  );
}

function Forms() {
  return (
    <>
      <PageHead eyebrow="Guidelines" title="Designing forms" lead="Forms are where citizens do business with government. Make them short, clear and forgiving." />
      <Accordion defaultOpen={[0]} items={[
        { title: 'Ask only what you need', content: <p>Every question costs the citizen time and data. For each one, know exactly why you need it and what you do with it. Reuse data government already holds (for example, from SevisPass) instead of asking again.</p> },
        { title: 'One thing per page', content: <p>On mobile, a single question per page is easier to answer, easier to fix and saves progress more reliably on slow connections.</p> },
        { title: 'Labels, hints and errors', content: <p>Always use a visible label. Use hints for format examples. Write errors that say how to fix the problem.</p> },
        { title: 'Choose the right control', content: <p>Radios for 2–7 options, Select for long known lists, Checkboxes for multiple answers, Date input (three boxes) for dates people know.</p> },
        { title: 'Privacy', content: <p>Tell people why you need personal information and how it will be used and stored, in line with the Digital Government Act 2022 and data protection requirements. Never ask for full card numbers in a form you host — use an approved payment gateway.</p> },
      ]} />
      <p className="pngds-body">See the <TextLink href="#/methods/multi-step-form">multi-step application</TextLink> and <TextLink href="#/methods/error-handling">validation</TextLink> patterns. <Tag variant="info">Related</Tag></p>
    </>
  );
}

const pages = { accessibility: Accessibility, content: Content, 'low-bandwidth': LowBandwidth, forms: Forms };
export default function Guidelines() {
  const { slug } = useParams();
  const P = pages[slug];
  return P ? <P /> : <NotFound />;
}

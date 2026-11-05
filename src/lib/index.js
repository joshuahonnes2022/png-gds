// PNG-GDS React component library — public entry point.
// import '@/lib/pngds.css' once at your app root, then:
// import { Masthead, Header, Button, TextInput } from './lib';

export { Icon, iconNames } from './components/Icon.jsx';
export { LanguageProvider, useLang, strings } from './i18n.jsx';
export {
  FlagMark, Crest, SkipLink, LanguageSwitch, Masthead, Header, MainNav,
  Breadcrumbs, SideNav, Footer, Container,
} from './components/Layout.jsx';
export { Button, ButtonGroup, TextLink, Toggle } from './components/Actions.jsx';
export {
  TextInput, Textarea, Select, Radios, Checkboxes, Checkbox, DateInput,
  FileUpload, ErrorSummary, SearchInput,
} from './components/Forms.jsx';
export {
  Alert, Banner, Callout, Card, CardGrid, Accordion, Tabs, Table, Tag,
  Pagination, StepIndicator, SummaryList, ConfirmationPanel,
} from './components/Content.jsx';

export {
  Row, Col, PageLayout, HeadingAnchors, StickyContainer, QuickExit, Section, GraphicBand, Diamonds,
  Pictogram, pictogramNames, Dialog, Loader, ProgressBar, HeroBanner,
} from './components/Structure.jsx';
export { utilityGroups, expandResponsive, BREAKPOINTS } from './utilities.spec.js';

export const VERSION = '0.2.0';

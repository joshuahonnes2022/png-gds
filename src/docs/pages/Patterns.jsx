import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Alert, Button, ButtonGroup, Checkbox, Checkboxes, ConfirmationPanel, ErrorSummary, Radios, Select,
  StepIndicator, SummaryList, Tag, TextInput, TextLink, Accordion, Breadcrumbs, Icon,
} from '../../lib';
import { provinces } from '../data/components.jsx';
import { PageHead, DoDont, Checklist, Frame, CodeBlock } from '../DocUI.jsx';
import NotFound from './NotFound.jsx';

/* ======================== Multi-step application demo ======================== */
const STEPS = ['Your details', 'Location', 'Alerts', 'Check answers'];

function validate(step, d) {
  const e = [];
  if (step === 1) {
    if (!d.name.trim()) e.push({ field: 'name', href: '#ms-name', text: 'Enter your full name' });
    const digits = d.phone.replace(/\s/g, '');
    if (!digits) e.push({ field: 'phone', href: '#ms-phone', text: 'Enter your mobile number' });
    else if (!/^7\d{7}$/.test(digits)) e.push({ field: 'phone', href: '#ms-phone', text: 'Enter a mobile number with 8 digits, starting with 7, like 7123 4567' });
  }
  if (step === 2) {
    if (!d.province) e.push({ field: 'province', href: '#ms-province', text: 'Select your province' });
    if (!d.district.trim()) e.push({ field: 'district', href: '#ms-district', text: 'Enter your district' });
  }
  if (step === 3) {
    if (!d.alerts.length) e.push({ field: 'alerts', href: '#ms-alerts-0', text: 'Select at least one type of alert' });
    if (!d.language) e.push({ field: 'language', href: '#ms-lang-0', text: 'Select the language for your alerts' });
  }
  if (step === 4 && !d.agree) e.push({ field: 'agree', href: '#ms-agree', text: 'Confirm that you agree to receive SMS alerts' });
  return e;
}

function MultiStepDemo() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);
  const [done, setDone] = useState(false);
  const [d, setD] = useState({ name: '', phone: '', province: '', district: '', alerts: [], language: '', agree: false });
  const set = (k) => (v) => setD((p) => ({ ...p, [k]: v?.target ? (v.target.type === 'checkbox' ? v.target.checked : v.target.value) : v }));
  const err = (f) => errors.find((x) => x.field === f)?.text;
  const go = (n) => { setErrors([]); setStep(n); };
  const next = (ev) => {
    ev.preventDefault();
    const e = validate(step, d);
    setErrors(e);
    if (e.length) return;
    if (step === 4) setDone(true); else setStep(step + 1);
  };
  const reset = () => { setD({ name: '', phone: '', province: '', district: '', alerts: [], language: '', agree: false }); setStep(1); setDone(false); setErrors([]); };

  if (done) {
    return (
      <div className="pngds-container" style={{ paddingBlock: 32, maxWidth: 720 }}>
        <ConfirmationPanel title="You are registered" reference="NDC-26-04817" />
        <h2 className="pngds-h3" style={{ marginTop: 0 }}>What happens next</h2>
        <p>We have sent a confirmation SMS to +675 {d.phone}. You will receive alerts for {d.district}, {d.province} Province.</p>
        <p>To stop alerts at any time, reply <strong>STOP</strong> to any message.</p>
        <Button variant="secondary" onClick={reset}>Start the demo again</Button>
      </div>
    );
  }

  return (
    <div className="pngds-container" style={{ paddingBlock: 32, maxWidth: 720 }}>
      {step > 1 && <Button variant="tertiary" size="sm" iconStart="arrow-left" onClick={() => go(step - 1)} style={{ paddingLeft: 0, marginBottom: 12 }}>Back</Button>}
      <StepIndicator steps={STEPS} current={step} />
      <ErrorSummary errors={errors} />
      <form noValidate onSubmit={next}>
        {step === 1 && (
          <>
            <h1 className="pngds-h1">Your details</h1>
            <TextInput id="ms-name" label="Full name" autoComplete="name" value={d.name} onChange={set('name')} error={err('name')} />
            <TextInput id="ms-phone" label="Mobile number" hint="Alerts are sent by SMS. You do not need internet data." prefix="+675" width="medium" inputMode="tel" autoComplete="tel-national" value={d.phone} onChange={set('phone')} error={err('phone')} />
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="pngds-h1">Where do you live?</h1>
            <Select id="ms-province" label="Province" placeholder="Select your province" options={provinces} value={d.province} onChange={set('province')} error={err('province')} />
            <TextInput id="ms-district" label="District" hint="For example, Mendi-Munhiu" value={d.district} onChange={set('district')} error={err('district')} />
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="pngds-h1">Which alerts do you want?</h1>
            <Checkboxes id="ms-alerts" legend="Types of alert" hint="Select all that apply." value={d.alerts} onChange={set('alerts')} error={err('alerts')}
              options={[{ value: 'flood', label: 'Floods and heavy rain' }, { value: 'quake', label: 'Earthquakes and tsunami' }, { value: 'volcano', label: 'Volcanic activity' }, { value: 'drought', label: 'Drought and frost', hint: 'Mainly for Highlands provinces' }]} />
            <Radios id="ms-lang" legend="Language for your alerts" inline value={d.language} onChange={set('language')} error={err('language')}
              options={[{ value: 'English', label: 'English' }, { value: 'Tok Pisin', label: 'Tok Pisin' }]} />
          </>
        )}
        {step === 4 && (
          <>
            <h1 className="pngds-h1">Check your answers</h1>
            <SummaryList rows={[
              { key: 'Full name', value: d.name, onChange: () => go(1) },
              { key: 'Mobile number', value: `+675 ${d.phone}`, onChange: () => go(1) },
              { key: 'Location', value: `${d.district}, ${d.province}`, onChange: () => go(2) },
              { key: 'Alerts', value: d.alerts.length + ' type(s)', onChange: () => go(3) },
              { key: 'Language', value: d.language, onChange: () => go(3) },
            ]} />
            <div className={err('agree') ? 'pngds-field pngds-field--error' : 'pngds-field'}>
              {err('agree') && <p className="pngds-error-message"><Icon name="error" /><span>{err('agree')}</span></p>}
              <Checkbox id="ms-agree" label="I agree to receive emergency SMS alerts from the National Disaster Centre" checked={d.agree} onChange={set('agree')} />
            </div>
          </>
        )}
        <ButtonGroup>
          <Button type="submit">{step === 4 ? 'Register for alerts' : 'Continue'}</Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

function MultiStep() {
  return (
    <>
      <PageHead eyebrow="Method" title="Multi-step application" lead="Break long applications into short steps — one topic per page — then let people check their answers before they submit." tags={[{ label: 'Stable', variant: 'success' }]} />
      <Alert title="Try it">
        <p>This is a working example: “Register for disaster SMS alerts”. Press Continue without filling anything in to see validation.</p>
      </Alert>
      <Frame url="https://example.gov.pg/disaster-alerts/register"><MultiStepDemo /></Frame>
      <h2 className="pngds-h2">How it works</h2>
      <ol className="pngds-body" style={{ paddingLeft: '1.25rem', display: 'grid', gap: 8 }}>
        <li><strong>Step indicator</strong> shows where people are, as text (“Step 2 of 4”).</li>
        <li><strong>One topic per page</strong> — the H1 is the question or topic.</li>
        <li><strong>Back link</strong> above the form, never a “Previous” button next to “Continue”.</li>
        <li><strong>Validate on Continue</strong> — show the Error summary and inline errors together.</li>
        <li><strong>Check your answers</strong> with “Change” links that return to the right step.</li>
        <li><strong>Confirmation</strong> with a reference number, also sent by SMS.</li>
      </ol>
      <DoDont dos={['Save progress between steps (server-side), so a dropped connection doesn’t lose work.', 'Tell people up front what they will need.']}
        donts={['Don’t ask for information you don’t use.', 'Don’t time out sessions in under 20 minutes without a warning.']} />
      <h2 className="pngds-h2">Components used</h2>
      <p className="pngds-body">
        {['step-indicator', 'error-summary', 'text-input', 'select', 'checkboxes', 'radios', 'summary-list', 'confirmation', 'button'].map((s, i, a) => (
          <span key={s}><TextLink as={Link} href={`/components/${s}`}>{s.replace(/-/g, ' ')}</TextLink>{i < a.length - 1 ? ', ' : ''}</span>
        ))}
      </p>
    </>
  );
}

/* ======================== Error handling ======================== */
function ErrorHandling() {
  return (
    <>
      <PageHead eyebrow="Method" title="Validation and errors" lead="Errors happen. Good error handling tells people exactly what went wrong and how to fix it — in plain language, without blame." />
      <h2 className="pngds-h2" style={{ marginTop: 0 }}>The pattern</h2>
      <Checklist items={[
        'Validate when the person presses Continue or Submit — not while they type.',
        'Show an Error summary at the top of the page. Move focus to it.',
        'Show the same message next to each field, with a red left border.',
        'Add “Error: ” to the start of the page <title>.',
        'Keep what the person typed — never clear the form.',
      ]} />
      <h2 className="pngds-h2">Writing error messages</h2>
      <div className="pngds-table-wrap" tabIndex={0} role="region" aria-label="Error message examples">
        <table className="pngds-table">
          <caption>Examples</caption>
          <thead><tr><th scope="col">Situation</th><th scope="col">Write</th><th scope="col">Avoid</th></tr></thead>
          <tbody>
            <tr><th scope="row">Empty field</th><td>Enter your full name</td><td>This field is required</td></tr>
            <tr><th scope="row">Wrong format</th><td>Enter a mobile number with 8 digits, like 7123 4567</td><td>Invalid input</td></tr>
            <tr><th scope="row">Too long</th><td>Description must be 500 characters or fewer</td><td>Max length exceeded</td></tr>
            <tr><th scope="row">Date in future</th><td>Date of birth must be in the past</td><td>Date error</td></tr>
            <tr><th scope="row">File too big</th><td>The selected file must be smaller than 5 MB</td><td>Upload failed</td></tr>
            <tr><th scope="row">Tok Pisin</th><td lang="tpi">Raitim nem bilong yu</td><td>—</td></tr>
          </tbody>
        </table>
      </div>
      <h2 className="pngds-h2">System errors</h2>
      <Alert variant="error" title="Sorry, there is a problem with the service">
        <p>Your answers have been saved. Try again later, or call 180 0000 (free from Digicel and bmobile) between 8am and 4pm, Monday to Friday.</p>
      </Alert>
      <p className="pngds-body">When something breaks on our side, say so, reassure people their information is safe, and give an offline alternative. PNG connectivity is variable — always design for failure.</p>
      <CodeBlock lang="jsx" code={`const errors = validate(form);
setErrors(errors);              // ErrorSummary focuses itself
document.title = errors.length ? 'Error: ' + pageTitle : pageTitle;

<ErrorSummary errors={errors} />
<TextInput id="phone" label="Mobile number" error={errors.find(e => e.field === 'phone')?.text} />`} />
    </>
  );
}

/* ======================== Service start ======================== */
function ServiceStart() {
  return (
    <>
      <PageHead eyebrow="Method" title="Service start page" lead="The first page of a transactional service. It explains what the service does, who can use it, what they need and how long it takes." />
      <Frame url="https://example.gov.pg/business/register-name">
        <div className="pngds-container" style={{ paddingBlock: 24, maxWidth: 820 }}>
          <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Business', href: '#' }, { label: 'Register a business name' }]} />
          <h1 className="pngds-h1">Register a business name</h1>
          <p className="pngds-lead">Use this service to register a business name in Papua New Guinea. It takes about 15 minutes.</p>
          <h2 className="pngds-h3" style={{ marginTop: 0 }}>Before you start, you will need</h2>
          <ul><li>your SevisPass or National ID number</li><li>the business address and province</li><li>a mobile money or bank card to pay the <strong>K250</strong> fee</li></ul>
          <Button size="lg" iconEnd="arrow-right">Start now</Button>
          <h2 className="pngds-h3">Other ways to apply</h2>
          <p style={{ maxWidth: '62ch' }}>You can also apply in person at any provincial office. Bring the same documents.</p>
          <Accordion items={[{ title: 'Who can apply', content: 'PNG citizens and registered companies.' }, { title: 'How long it takes', content: 'Most applications are approved within 5 working days.' }]} />
        </div>
      </Frame>
      <DoDont dos={['Use a verb for the title: “Register…”, “Apply for…”, “Renew…”.', 'Say how long it takes and what it costs.', 'Offer an offline alternative.']}
        donts={['Don’t hide the Start button below long content.', 'Don’t require sign-in before people can read about the service.']} />
    </>
  );
}

/* ======================== Tracking ======================== */
function Tracking() {
  const [ref, setRef] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const check = (e) => {
    e.preventDefault();
    if (!/^[A-Z]{2,4}-\d{2}-\d{5}$/i.test(ref.trim())) { setError('Enter your reference number in the format ABC-26-12345'); setResult(null); return; }
    setError(''); setResult(ref.trim().toUpperCase());
  };
  const timeline = [['Submitted', '3 Nov 2026', 'done'], ['Payment received', '3 Nov 2026', 'done'], ['Under review', 'Started 4 Nov 2026', 'current'], ['Decision', 'Expected by 10 Nov 2026', 'todo']];
  return (
    <>
      <PageHead eyebrow="Method" title="Application tracking" lead="Let people check where their application is up to, without calling or visiting an office." tags={[{ label: 'Beta', variant: 'warning' }]} />
      <Frame url="https://example.gov.pg/track">
        <div className="pngds-container" style={{ paddingBlock: 24, maxWidth: 720 }}>
          <h1 className="pngds-h1">Check your application</h1>
          <form noValidate onSubmit={check}>
            <TextInput id="trk" label="Reference number" hint="This is in your confirmation SMS, for example NDC-26-04817" width="medium" value={ref} onChange={(e) => setRef(e.target.value)} error={error} />
            <Button type="submit">Check status</Button>
          </form>
          {result && (
            <div style={{ marginTop: 32 }} role="status">
              <h2 className="pngds-h2" style={{ marginTop: 0 }}>{result} <Tag variant="info">Under review</Tag></h2>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {timeline.map(([t, d, s]) => (
                  <li key={t} style={{ display: 'flex', gap: 12, paddingBottom: 16 }}>
                    <span className={`pngds-steps__item pngds-steps__item--${s}`} style={{ flex: 'none' }}><span className="pngds-steps__num">{s === 'done' ? <Icon name="check" size={14} /> : ''}</span></span>
                    <span><strong>{t}</strong><br /><span className="pngds-caption">{d}</span><span className="pngds-visually-hidden">{s === 'done' ? ' — completed' : s === 'current' ? ' — in progress' : ' — not started'}</span></span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </Frame>
      <DoDont dos={['Use the same status words everywhere: Submitted, Awaiting payment, Under review, Approved, Rejected.', 'Show expected dates.', 'Send SMS updates when status changes.']}
        donts={['Don’t show internal workflow codes.', 'Don’t require login just to check a status.']} />
    </>
  );
}

export const patternPages = { 'multi-step-form': MultiStep, 'error-handling': ErrorHandling, 'service-start': ServiceStart, 'application-tracking': Tracking };
export default function Patterns() {
  const { slug } = useParams();
  const P = patternPages[slug];
  return P ? <P /> : <NotFound />;
}

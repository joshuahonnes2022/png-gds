import { useId, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { useLang } from '../i18n.jsx';

const cx = (...c) => c.filter(Boolean).join(' ');

/* ---------------- Alert ---------------- */
const alertIcon = { info: 'info', success: 'success', warning: 'warning', error: 'error' };
const alertLabel = { info: 'Information', success: 'Success', warning: 'Warning', error: 'Error' };

/**
 * Alert — in-page message. variant: info | success | warning | error
 * Use `live` when the alert appears after a user action so screen readers announce it.
 */
export function Alert({ variant = 'info', title, children, dismissible, onDismiss, live }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className={cx('pngds-alert', variant !== 'info' && `pngds-alert--${variant}`)} role={live ? (variant === 'error' ? 'alert' : 'status') : undefined}>
      <Icon name={alertIcon[variant]} className="pngds-alert__icon" />
      <div className="pngds-alert__body">
        <span className="pngds-visually-hidden">{alertLabel[variant]}: </span>
        {title && <p className="pngds-alert__title">{title}</p>}
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
      {dismissible && (
        <button type="button" className="pngds-alert__close" onClick={() => { setOpen(false); onDismiss?.(); }}>
          <Icon name="close" size={20} /><span className="pngds-visually-hidden">Dismiss message</span>
        </button>
      )}
    </div>
  );
}

/** Banner — site-wide notice under the header (outages, deadlines). Use sparingly. */
export function Banner({ children }) {
  return (
    <div className="pngds-banner" role="region" aria-label="Important notice">
      <div className="pngds-container pngds-banner__inner">
        <Icon name="warning" size={22} />
        <div>{children}</div>
      </div>
    </div>
  );
}

export function Callout({ title, children }) {
  return (
    <div className="pngds-callout">
      {title && <p style={{ fontWeight: 700, margin: '0 0 6px' }}>{title}</p>}
      {children}
    </div>
  );
}

/* ---------------- Card ---------------- */
/** Card — pass `href` to make the whole card a single link target. */
export function Card({ title, href, eyebrow, children, footer, image, imageAlt = '', highlight, headingLevel = 3, LinkComponent = 'a' }) {
  const H = `h${headingLevel}`;
  const lp = LinkComponent === 'a' ? { href } : { to: href };
  return (
    <div className={cx('pngds-card', href && 'pngds-card--link', highlight && 'pngds-card--highlight')}>
      {image && <div className="pngds-card__media"><img src={image} alt={imageAlt} loading="lazy" /></div>}
      <div className="pngds-card__body">
        {eyebrow && <span className="pngds-card__eyebrow">{eyebrow}</span>}
        <H className="pngds-card__title">{href ? <LinkComponent {...lp}>{title}</LinkComponent> : title}</H>
        {children && (typeof children === 'string' ? <p className="pngds-card__text">{children}</p> : children)}
        {footer && <div className="pngds-card__footer">{footer}</div>}
      </div>
    </div>
  );
}

export function CardGrid({ children, className }) {
  return <div className={cx('pngds-grid', className)}>{children}</div>;
}

/* ---------------- Accordion ---------------- */
/** Accordion — items: [{title, content}] */
export function Accordion({ items = [], headingLevel = 3, showAllControl = true, defaultOpen = [] }) {
  const { t } = useLang();
  const base = useId();
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const allOpen = open.size === items.length;
  const H = `h${headingLevel}`;
  const toggle = (i) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div>
      {showAllControl && items.length > 1 && (
        <div className="pngds-accordion__controls">
          <button type="button" className="pngds-btn pngds-btn--tertiary pngds-btn--sm" aria-expanded={allOpen}
            onClick={() => setOpen(allOpen ? new Set() : new Set(items.map((_, i) => i)))}>
            {allOpen ? t.hideAll : t.showAll}
          </button>
        </div>
      )}
      <div className="pngds-accordion">
        {items.map((it, i) => {
          const isOpen = open.has(i);
          return (
            <div className="pngds-accordion__item" key={i}>
              <H className="pngds-accordion__heading">
                <button type="button" className="pngds-accordion__button" aria-expanded={isOpen} aria-controls={`${base}-p${i}`} id={`${base}-b${i}`} onClick={() => toggle(i)}>
                  {it.title}
                  <span className="pngds-accordion__icon" aria-hidden="true"><Icon name="chevron-down" size={16} /></span>
                </button>
              </H>
              <div className="pngds-accordion__panel" id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!isOpen}>
                {typeof it.content === 'string' ? <p>{it.content}</p> : it.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Tabs ---------------- */
/** Tabs — WAI-ARIA tabs with arrow-key navigation. tabs: [{label, content}] */
export function Tabs({ tabs = [], label = 'Tabs', defaultIndex = 0, onChange }) {
  const base = useId();
  const [active, setActive] = useState(defaultIndex);
  const refs = useRef([]);
  const select = (i) => { setActive(i); onChange?.(i); refs.current[i]?.focus(); };
  const onKey = (e) => {
    const n = tabs.length;
    if (e.key === 'ArrowRight') { e.preventDefault(); select((active + 1) % n); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); select((active - 1 + n) % n); }
    if (e.key === 'Home') { e.preventDefault(); select(0); }
    if (e.key === 'End') { e.preventDefault(); select(n - 1); }
  };
  return (
    <div className="pngds-tabs">
      <div className="pngds-tabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((tab, i) => (
          <button key={i} ref={(el) => (refs.current[i] = el)} type="button" role="tab" className="pngds-tabs__tab"
            id={`${base}-t${i}`} aria-selected={i === active} aria-controls={`${base}-p${i}`} tabIndex={i === active ? 0 : -1}
            onClick={() => { setActive(i); onChange?.(i); }}>
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={i} role="tabpanel" className="pngds-tabs__panel" id={`${base}-p${i}`} aria-labelledby={`${base}-t${i}`} hidden={i !== active} tabIndex={0}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Table ---------------- */
/** Table — columns: [{key, label, numeric}], rows: [{...}]. Scrolls horizontally on small screens. */
export function Table({ caption, columns = [], rows = [], striped, render = {} }) {
  return (
    <div className="pngds-table-wrap" tabIndex={0} role="region" aria-label={caption || 'Table'}>
      <table className={cx('pngds-table', striped && 'pngds-table--striped')}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>{columns.map((c) => <th key={c.key} scope="col" className={c.numeric ? 'pngds-num' : undefined}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c, j) => {
                const v = render[c.key] ? render[c.key](r[c.key], r) : r[c.key];
                return j === 0
                  ? <th key={c.key} scope="row" style={{ fontWeight: 600 }}>{v}</th>
                  : <td key={c.key} className={c.numeric ? 'pngds-num' : undefined}>{v}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Tag ---------------- */
/** Tag / status label. variant: neutral | info | success | warning | error | brand */
export function Tag({ variant = 'neutral', plain, children }) {
  return <span className={cx('pngds-tag', variant !== 'neutral' && `pngds-tag--${variant}`, plain && 'pngds-tag--plain')}>{children}</span>;
}

/* ---------------- Pagination ---------------- */
function pageRange(current, total) {
  const set = new Set([1, total, current, current - 1, current + 1]);
  const pages = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  pages.forEach((p, i) => { if (i && p - pages[i - 1] > 1) out.push('…'); out.push(p); });
  return out;
}

export function Pagination({ current = 1, total = 1, onChange, label = 'Pagination' }) {
  const { t } = useLang();
  if (total <= 1) return null;
  return (
    <nav className="pngds-pagination" aria-label={label}>
      <ul>
        {current > 1 && (
          <li><button type="button" onClick={() => onChange?.(current - 1)}><Icon name="arrow-left" size={18} />{t.previous}<span className="pngds-visually-hidden"> {t.page.toLowerCase()}</span></button></li>
        )}
        {pageRange(current, total).map((p, i) => (
          <li key={i}>
            {p === '…'
              ? <span className="pngds-pagination__ellipsis" aria-hidden="true">…</span>
              : <button type="button" aria-current={p === current ? 'page' : undefined} onClick={() => onChange?.(p)}>
                  <span className="pngds-visually-hidden">{t.page} </span>{p}
                </button>}
          </li>
        ))}
        {current < total && (
          <li><button type="button" onClick={() => onChange?.(current + 1)}>{t.next}<span className="pngds-visually-hidden"> {t.page.toLowerCase()}</span><Icon name="arrow-right" size={18} /></button></li>
        )}
      </ul>
    </nav>
  );
}

/* ---------------- Step indicator ---------------- */
export function StepIndicator({ steps = [], current = 1 }) {
  const { t } = useLang();
  const pct = Math.round(((current - 1) / Math.max(1, steps.length - 1)) * 100);
  return (
    <div className="pngds-steps">
      <p className="pngds-steps__count">{t.stepOf(current, steps.length)}: <strong>{steps[current - 1]}</strong></p>
      <div className="pngds-steps__bar" aria-hidden="true"><div className="pngds-steps__fill" style={{ width: `${Math.max(pct, 4)}%` }} /></div>
      <ol className="pngds-steps__list" aria-label="Progress">
        {steps.map((s, i) => {
          const n = i + 1;
          const state = n < current ? 'done' : n === current ? 'current' : 'todo';
          return (
            <li key={s} className={cx('pngds-steps__item', `pngds-steps__item--${state}`)} aria-current={state === 'current' ? 'step' : undefined}>
              <span className="pngds-steps__num">{state === 'done' ? <Icon name="check" size={14} /> : n}</span>
              <span>{s}<span className="pngds-visually-hidden">{state === 'done' ? ' (completed)' : state === 'todo' ? ' (not started)' : ''}</span></span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------------- Summary list ---------------- */
/** SummaryList — "check your answers". rows: [{key, value, onChange}] */
export function SummaryList({ rows = [] }) {
  const { t } = useLang();
  return (
    <dl className="pngds-summary">
      {rows.map((r) => (
        <div className="pngds-summary__row" key={r.key}>
          <dt className="pngds-summary__key">{r.key}</dt>
          <dd className="pngds-summary__value">{r.value || <span className="pngds-caption">Not provided</span>}</dd>
          {r.onChange && (
            <dd style={{ margin: 0 }}>
              <button type="button" className="pngds-btn pngds-btn--tertiary pngds-btn--sm" onClick={r.onChange}>
                {t.change}<span className="pngds-visually-hidden"> {r.key.toLowerCase()}</span>
              </button>
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

/* ---------------- Confirmation ---------------- */
export function ConfirmationPanel({ title, reference, children }) {
  return (
    <div className="pngds-panel-confirm" role="status">
      <h1 className="pngds-h1">{title}</h1>
      {reference && <><p style={{ margin: 0 }}>Your reference number</p><p className="pngds-panel-confirm__ref">{reference}</p></>}
      {children}
    </div>
  );
}

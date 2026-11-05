import { useEffect, useId, useRef } from 'react';
import { Icon } from './Icon.jsx';

const cx = (...c) => c.filter(Boolean).join(' ');

/* ---------------- Grid ---------------- */
/** Row — 12-column flex grid. `tight` reduces the gutter. */
export function Row({ children, tight, className, as: Tag = 'div', ...rest }) {
  return <Tag className={cx('pngds-row', tight && 'pngds-row--tight', className)} {...rest}>{children}</Tag>;
}
/** Col — span (1–12) on all sizes; md / lg override from 768px / 1024px. Omit all for equal-width columns. */
export function Col({ span, md, lg, auto, children, className, as: Tag = 'div', ...rest }) {
  const classes = cx(
    !span && !md && !lg && !auto && 'pngds-col',
    auto && 'pngds-col-auto',
    span && `pngds-col-${span}`, md && `pngds-col-md-${md}`, lg && `pngds-col-lg-${lg}`, className,
  );
  return <Tag className={classes} {...rest}>{children}</Tag>;
}

/* ---------------- Page layout ---------------- */
/**
 * PageLayout — layout: "full" | "sidebar-left" | "sidebar-right".
 * sidebar-left puts the sidebar first in the DOM (for side navigation) and
 * can hide it under 1024px with sidebarDesktopOnly.
 */
export function PageLayout({ layout = 'full', sidebar, sidebarLabel = 'Section navigation', sidebarDesktopOnly, children, className }) {
  const main = <div className="pngds-layout__main">{children}</div>;
  const side = sidebar && (
    <aside className="pngds-layout__sidebar" aria-label={sidebarLabel} data-desktop-only={sidebarDesktopOnly || undefined}>{sidebar}</aside>
  );
  return (
    <div className={cx('pngds-container pngds-layout', layout !== 'full' && `pngds-layout--${layout}`, className)}>
      {layout === 'sidebar-left' ? <>{side}{main}</> : <>{main}{side}</>}
    </div>
  );
}

/**
 * HeadingAnchors — adds a copyable "#" link to every h2 (and optionally h3)
 * inside it. Use for long-form content only, not forms or navigation.
 */
export function HeadingAnchors({ children, levels = 'h2', className }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current; if (!root) return undefined;
    const added = [];
    root.querySelectorAll(levels).forEach((h) => {
      if (h.querySelector('.pngds-heading-anchor')) return;
      if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const a = document.createElement('a');
      a.className = 'pngds-heading-anchor';
      a.href = `#${h.id}`;
      a.innerHTML = `#<span class="pngds-visually-hidden"> Copy link to “${h.textContent.trim()}”</span>`;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `${location.href.split('#')[0]}#${location.hash.startsWith('#/') ? location.hash.slice(1).split('#')[0] + '#' : ''}${h.id}`;
        navigator.clipboard?.writeText(url);
        a.firstChild.textContent = '✓';
        setTimeout(() => { a.firstChild.textContent = '#'; }, 1500);
        h.scrollIntoView({ block: 'start' });
      });
      h.appendChild(a); added.push(a);
    });
    return () => added.forEach((a) => a.remove());
  }, [levels]);
  return <div ref={ref} className={className}>{children}</div>;
}

/** StickyContainer — page-shell region for persistent controls. Place last in <body>. */
export function StickyContainer({ children }) {
  return <div className="pngds-sticky-container">{children}</div>;
}

/** QuickExit — leaves the site fast (e.g. on family-violence or support services). */
export function QuickExit({ href = 'https://www.google.com', label = 'Quick exit' }) {
  const go = () => { window.open(href, '_blank', 'noopener'); window.location.replace(href); };
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && e.shiftKey) go(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });
  return (
    <button type="button" className="pngds-btn pngds-btn--danger pngds-quick-exit" onClick={go}>
      <Icon name="close" className="pngds-btn__icon" />{label}<span className="pngds-visually-hidden"> (or press Shift + Escape)</span>
    </button>
  );
}

/* ---------------- Section ---------------- */
/**
 * Section — full-width band that groups related content.
 * background: white | off-white | grey | brand-light | navy-light | navy | brand
 * padding: sm | md | lg
 */
export function Section({ title, intro, background = 'white', padding = 'md', accent, box, headingLevel = 2, children, className, id }) {
  const H = `h${headingLevel}`;
  const autoId = useId();
  const titleId = title ? `${id || autoId}-title` : undefined;
  return (
    <section id={id} aria-labelledby={titleId}
      className={cx('pngds-section', background !== 'white' && `pngds-section--${background}`, padding !== 'md' && `pngds-section--${padding}`, accent && 'pngds-section--accent', className)}>
      <div className="pngds-container">
        <div className={box ? 'pngds-section__box' : undefined}>
          {(title || intro) && (
            <div className="pngds-section__header">
              {title && <H className="pngds-h2" id={titleId}>{title}</H>}
              {intro && <p>{intro}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Graphic elements ---------------- */
export const GraphicBand = ({ weave }) => <div className={cx('pngds-graphic-band', weave && 'pngds-graphic-weave pngds-graphic-band--weave')} aria-hidden="true" />;
export const Diamonds = () => <span className="pngds-graphic-diamonds" aria-hidden="true"><i /><i /><i /></span>;

/* ---------------- Pictograms ---------------- */
// Original PNG-GDS pictograms: 64px grid, 2.5px navy line, deep-orange accent shape.
const N = 'var(--pngds-navy-700)';
const O = 'var(--pngds-orange-500)';
const Y = 'var(--pngds-amber-400)';
const line = { fill: 'none', stroke: N, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
const pictos = {
  'digital-id': <><rect x="8" y="14" width="48" height="36" rx="5" fill={Y} opacity=".35" /><rect x="8" y="14" width="48" height="36" rx="5" {...line} /><circle cx="22" cy="29" r="6" fill={O} /><path d="M13 43c2-5 5.5-7 9-7s7 2 9 7" {...line} /><path d="M37 26h12M37 33h12M37 40h7" {...line} /></>,
  health: <><path d="M32 54S10 41 10 25c0-7 5-12 11.5-12 4.5 0 8 2.5 10.5 6.5C34.5 15.5 38 13 42.5 13 49 13 54 18 54 25c0 16-22 29-22 29z" fill={O} opacity=".2" /><path d="M32 54S10 41 10 25c0-7 5-12 11.5-12 4.5 0 8 2.5 10.5 6.5C34.5 15.5 38 13 42.5 13 49 13 54 18 54 25c0 16-22 29-22 29z" {...line} /><path d="M18 31h8l3-6 5 12 3-6h9" {...line} stroke={O} /></>,
  education: <><path d="M32 14 6 26l26 12 26-12z" fill={O} /><path d="M32 14 6 26l26 12 26-12z" {...line} /><path d="M16 31v11c0 4 7 8 16 8s16-4 16-8V31" {...line} /><path d="M56 27v14" {...line} /></>,
  business: <><rect x="8" y="22" width="48" height="30" rx="4" fill={Y} opacity=".35" /><rect x="8" y="22" width="48" height="30" rx="4" {...line} /><path d="M24 22v-5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5M8 35h48" {...line} /><rect x="28" y="31" width="8" height="8" rx="1.5" fill={O} /></>,
  transport: <><path d="M10 38V28l6-12h32l6 12v10" fill={Y} opacity=".35" /><path d="M10 38V28l6-12h32l6 12v10H10z" {...line} /><path d="M10 28h44" {...line} /><circle cx="19" cy="44" r="5" fill={O} /><circle cx="45" cy="44" r="5" fill={O} /><circle cx="19" cy="44" r="5" {...line} /><circle cx="45" cy="44" r="5" {...line} /></>,
  agriculture: <><path d="M32 54V24" {...line} /><path d="M32 34c-10 0-16-6-16-14 9 0 16 5 16 14zM32 28c0-9 6-15 16-15 0 9-7 15-16 15z" fill={O} /><path d="M32 34c-10 0-16-6-16-14 9 0 16 5 16 14zM32 28c0-9 6-15 16-15 0 9-7 15-16 15z" {...line} /><path d="M14 54h36" {...line} /></>,
  payment: <><rect x="6" y="16" width="44" height="28" rx="4" fill={Y} opacity=".35" /><rect x="6" y="16" width="44" height="28" rx="4" {...line} /><path d="M6 24h44" {...line} strokeWidth="5" /><circle cx="44" cy="44" r="12" fill={O} /><path d="M44 38v12M40 41.5c0-1.5 1.5-2.5 4-2.5s4 1 4 2.5-1.5 2-4 2.5-4 1-4 2.5 1.5 2.5 4 2.5 4-1 4-2.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></>,
  document: <><path d="M16 8h22l12 12v36H16z" fill={Y} opacity=".35" /><path d="M16 8h22l12 12v36H16z" {...line} /><path d="M38 8v12h12M23 30h20M23 38h20M23 46h12" {...line} /><circle cx="46" cy="48" r="7" fill={O} /><path d="m43 48 2.2 2.2L49 46" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>,
  mobile: <><rect x="18" y="6" width="28" height="52" rx="5" fill={Y} opacity=".35" /><rect x="18" y="6" width="28" height="52" rx="5" {...line} /><path d="M28 12h8" {...line} /><circle cx="32" cy="51" r="2.5" fill={N} /><rect x="23" y="18" width="18" height="24" rx="2" fill={O} /></>,
  location: <><path d="M32 56s-16-15-16-28a16 16 0 0 1 32 0c0 13-16 28-16 28z" fill={O} opacity=".25" /><path d="M32 56s-16-15-16-28a16 16 0 0 1 32 0c0 13-16 28-16 28z" {...line} /><circle cx="32" cy="27" r="6" fill={O} /><circle cx="32" cy="27" r="6" {...line} /></>,
  community: <><circle cx="32" cy="20" r="7" fill={O} /><circle cx="32" cy="20" r="7" {...line} /><circle cx="14" cy="26" r="5" {...line} /><circle cx="50" cy="26" r="5" {...line} /><path d="M20 50c0-8 5-13 12-13s12 5 12 13" fill={Y} opacity=".35" /><path d="M20 50c0-8 5-13 12-13s12 5 12 13M5 48c0-6 4-10 9-10 2.5 0 4.5 1 6 2.5M59 48c0-6-4-10-9-10-2.5 0-4.5 1-6 2.5" {...line} /></>,
  innovation: <><path d="M24 40c-4-3-7-8-7-13a15 15 0 0 1 30 0c0 5-3 10-7 13v6H24z" fill={Y} opacity=".45" /><path d="M24 40c-4-3-7-8-7-13a15 15 0 0 1 30 0c0 5-3 10-7 13v6H24zM25 52h14M28 58h8" {...line} /><path d="M32 46V32l-5-5M32 32l5-5" {...line} stroke={O} /></>,
  connectivity: <><path d="M8 26a34 34 0 0 1 48 0M16 34a22 22 0 0 1 32 0M24 42a10 10 0 0 1 16 0" {...line} /><circle cx="32" cy="50" r="5" fill={O} /><path d="M8 26a34 34 0 0 1 48 0" {...line} stroke={O} /></>,
  calendar: <><rect x="8" y="14" width="48" height="42" rx="4" fill={Y} opacity=".35" /><rect x="8" y="14" width="48" height="42" rx="4" {...line} /><path d="M8 26h48M20 8v12M44 8v12" {...line} /><rect x="36" y="34" width="12" height="12" rx="2" fill={O} /></>,
  security: <><path d="M32 6 52 13v15c0 13-9 23-20 28C21 51 12 41 12 28V13z" fill={O} opacity=".2" /><path d="M32 6 52 13v15c0 13-9 23-20 28C21 51 12 41 12 28V13z" {...line} /><rect x="23" y="27" width="18" height="14" rx="2" fill={O} /><path d="M26 27v-4a6 6 0 0 1 12 0v4" {...line} /></>,
  land: <><path d="M6 50 22 22l10 14 8-10 18 24z" fill={Y} opacity=".45" /><path d="M6 50 22 22l10 14 8-10 18 24zM4 56h56" {...line} /><circle cx="46" cy="14" r="6" fill={O} /></>,
};
export const pictogramNames = Object.keys(pictos);

export function Pictogram({ name, size = 'md', title, className }) {
  if (!pictos[name]) return null;
  return (
    <svg viewBox="0 0 64 64" className={cx('pngds-pictogram', size !== 'md' && `pngds-pictogram--${size}`, className)}
      role={title ? 'img' : undefined} aria-hidden={title ? undefined : 'true'} focusable="false">
      {title && <title>{title}</title>}
      {pictos[name]}
    </svg>
  );
}

/* ---------------- Dialog ---------------- */
/** Dialog — modal built on the native <dialog> element (focus trap, Escape and backdrop handled by the browser). */
export function Dialog({ open, onClose, title, children, footer, danger }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (open && !d.open) d.showModal?.();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className={cx('pngds-dialog', danger && 'pngds-dialog--danger')} aria-labelledby={titleId}
      onClose={() => onClose?.()} onClick={(e) => { if (e.target === ref.current) onClose?.(); }}>
      <div className="pngds-dialog__header">
        <h2 className="pngds-dialog__title" id={titleId}>{title}</h2>
        <button type="button" className="pngds-dialog__close" onClick={() => onClose?.()}>
          <Icon name="close" size={22} /><span className="pngds-visually-hidden">Close dialog</span>
        </button>
      </div>
      <div className="pngds-dialog__body">{children}</div>
      {footer && <div className="pngds-dialog__footer">{footer}</div>}
    </dialog>
  );
}

/* ---------------- Loader & progress ---------------- */
export function Loader({ label = 'Loading…', size, block }) {
  return (
    <div className={cx('pngds-loader', size === 'lg' && 'pngds-loader--lg', block && 'pngds-loader--block')} role="status" aria-live="polite">
      <span className="pngds-loader__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
export function ProgressBar({ value = 0, max = 100, label }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      {label && <p className="pngds-small" style={{ margin: '0 0 6px', fontWeight: 600 }}>{label}: {pct}%</p>}
      <div className="pngds-progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        <div className="pngds-progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---------------- Hero banner ---------------- */
/** HeroBanner — top-of-page banner. variant: brand | navy | light. Text is kept large for contrast on brand orange. */
export function HeroBanner({ title, lead, actions, image, imageAlt = '', variant = 'brand' }) {
  return (
    <section className={cx('pngds-hero-banner', variant !== 'brand' && `pngds-hero-banner--${variant}`, image && 'pngds-hero-banner--image')}>
      <div className="pngds-container pngds-hero-banner__inner">
        <div>
          <h1 className="pngds-hero-banner__title">{title}</h1>
          {lead && <p className="pngds-hero-banner__lead">{lead}</p>}
          {actions && <div className="pngds-btn-group">{actions}</div>}
        </div>
        {image && <div className="pngds-hero-banner__media"><img src={image} alt={imageAlt} /></div>}
      </div>
    </section>
  );
}

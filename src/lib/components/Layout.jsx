import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { useLang } from '../i18n.jsx';

const cx = (...c) => c.filter(Boolean).join(' ');

/* Small flag mark used in the masthead (decorative). */
export function FlagMark({ className = 'pngds-masthead__flag' }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true" focusable="false">
      <path d="M0 0h30v20z" fill="#C8102E" />
      <path d="M0 0v20h30z" fill="#1A1A1A" />
      <circle cx="7" cy="17" r="1.2" fill="#fff" /><circle cx="10" cy="13" r="1" fill="#fff" />
      <circle cx="4.5" cy="12" r="1" fill="#fff" /><circle cx="7" cy="8.5" r="1" fill="#fff" />
      <path d="M18 4.5c2.5-.5 5 .5 6.5 2.5-1.8-.2-3 .3-4 1.4-.6-1.5-1.5-2.8-2.5-3.9z" fill="#FCD116" />
    </svg>
  );
}

/**
 * Crest — slot for the National Crest.
 * Pass `src` with the official crest file issued by DICT. Without it,
 * a neutral placeholder renders so layouts can be built before artwork
 * is supplied. Never redraw or recolour the official crest.
 */
export function Crest({ src, alt = 'Papua New Guinea National Crest', className = 'pngds-header__crest' }) {
  if (src) return <img src={src} alt={alt} className={className} />;
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="National Crest placeholder" focusable="false">
      <rect x="1" y="1" width="46" height="46" rx="6" fill="#F7F7F5" stroke="#B38F00" strokeWidth="2" strokeDasharray="4 3" />
      <text x="24" y="22" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5C4A00" fontFamily="sans-serif">CREST</text>
      <text x="24" y="32" textAnchor="middle" fontSize="6" fill="#5C4A00" fontFamily="sans-serif">official file</text>
    </svg>
  );
}

export function SkipLink({ href = '#main', children }) {
  const { t } = useLang();
  // Moves focus in JS too, so it also works with hash-based routers.
  const onClick = (e) => {
    const el = document.getElementById(href.replace(/^#/, ''));
    if (!el) return;
    e.preventDefault();
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus();
  };
  return <a className="pngds-skip-link" href={href} onClick={onClick}>{children || t.skip}</a>;
}

export function LanguageSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="pngds-lang" role="group" aria-label="Language / Tok">
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">English</button>
      <button type="button" aria-pressed={lang === 'tpi'} onClick={() => setLang('tpi')} lang="tpi">Tok Pisin</button>
    </div>
  );
}

/** Masthead — the official government banner. Required on every PNG Government site. */
/**
 * Masthead — the official government banner. Required on every PNG Government site.
 * badgeSrc: National Crest image for the verification badge (falls back to a flag mark).
 */
export function Masthead({ showLanguage = true, badgeSrc }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <section className="pngds-masthead" aria-label="Official government website">
      <div className="pngds-stripe" />
      <div className="pngds-container">
        <div className="pngds-masthead__inner">
          {badgeSrc
            ? <span className="pngds-masthead__badge"><img src={badgeSrc} alt="" /></span>
            : <FlagMark />}
          <span>{t.official}</span>
          <button type="button" className="pngds-masthead__toggle" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
            {t.howKnow}
            <Icon name="chevron-down" className="pngds-chevron" />
          </button>
          {showLanguage && <div className="pngds-masthead__end"><LanguageSwitch /></div>}
        </div>
        <div id={panelId} className="pngds-masthead__panel" hidden={!open}>
          <p><strong>{t.govDomainTitle}</strong>{t.govDomain}</p>
          <p><strong>{t.secureTitle}</strong>{t.secure}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Header — Crest | agency name | (optional) program logo / actions.
 * Follows the DICT standard header layout.
 */
export function Header({ agency, govLabel = 'Government of Papua New Guinea', crestSrc, href = '/', LinkComponent = 'a', actions, programLogo, logoSrc, logoAlt, layout = 'left' }) {
  // logoSrc: agency or program logo shown on the right (from 768px). programLogo accepts any node instead.
  const rightLogo = programLogo || (logoSrc && <img src={logoSrc} alt={logoAlt || ''} />);
  const linkProps = LinkComponent === 'a' ? { href } : { to: href };

  // layout="center": Crest | title (centred) | agency logo — for national, whole-of-government sites.
  if (layout === 'center') {
    return (
      <header className="pngds-header pngds-header--center">
        <div className="pngds-container pngds-header__inner">
          <span className="pngds-header__side pngds-header__side--start"><Crest src={crestSrc} /></span>
          <LinkComponent className="pngds-header__brand" {...linkProps}>
            <span className="pngds-header__titles">
              {govLabel && <span className="pngds-header__gov">{govLabel}</span>}
              <span className="pngds-header__agency">{agency}</span>
            </span>
          </LinkComponent>
          <span className="pngds-header__side pngds-header__side--end">{rightLogo}</span>
        </div>
        {actions && <div className="pngds-container pngds-header__below">{actions}</div>}
      </header>
    );
  }

  return (
    <header className="pngds-header">
      <div className="pngds-container pngds-header__inner">
        <LinkComponent className="pngds-header__brand" {...linkProps}>
          <Crest src={crestSrc} />
          <span className="pngds-header__divider" aria-hidden="true" />
          <span className="pngds-header__titles">
            <span className="pngds-header__gov">{govLabel}</span>
            <span className="pngds-header__agency">{agency}</span>
          </span>
        </LinkComponent>
        {(actions || rightLogo) && (
          <div className="pngds-header__actions">
            {actions}
            {rightLogo && <span className="pngds-header__program">{rightLogo}</span>}
          </div>
        )}
      </div>
    </header>
  );
}

/**
 * MainNav — main navigation with optional mega-menu panels.
 * items: [{ label, href, match?, description?, children?: [{ label, href, badge? }] }]
 * An item with `children` becomes a disclosure button that opens a panel
 * (desktop) or an accordion (under 768px). Escape and outside clicks close it.
 */
export function MainNav({ items = [], currentPath, LinkComponent = 'a', label = 'Main', end, defaultPanel = null }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);       // mobile menu
  const [panel, setPanel] = useState(defaultPanel); // index of open mega panel
  const listId = useId();
  const navRef = useRef(null);
  const btnRefs = useRef([]);

  const firstPath = useRef(true);
  useEffect(() => { if (firstPath.current) { firstPath.current = false; return; } setPanel(null); setOpen(false); }, [currentPath]);
  useEffect(() => {
    if (panel === null) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') { btnRefs.current[panel]?.focus(); setPanel(null); } };
    const onClick = (e) => { if (!navRef.current?.contains(e.target)) setPanel(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [panel]);

  const lp = (href) => (LinkComponent === 'a' ? { href } : { to: href });
  const isActive = (it) => currentPath === it.href || (it.match && currentPath?.startsWith(it.match))
    || (it.children || []).some((c) => currentPath === c.href);
  const close = () => { setPanel(null); setOpen(false); };

  return (
    <nav className="pngds-nav" aria-label={label} ref={navRef}>
      <div className="pngds-container pngds-nav__bar">
        <button type="button" className="pngds-nav__toggle" aria-expanded={open} aria-controls={listId} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size={20} /> {open ? t.close : t.menu}
        </button>
        <ul className="pngds-nav__list" id={listId} data-open={open}>
          {items.map((it, i) => {
            const active = isActive(it);
            if (!it.children) {
              return (
                <li key={it.href} className="pngds-nav__item">
                  <LinkComponent className="pngds-nav__link" aria-current={active ? 'page' : undefined} onClick={close} {...lp(it.href)}>{it.label}</LinkComponent>
                </li>
              );
            }
            const pid = `${listId}-p${i}`;
            const expanded = panel === i;
            return (
              <li key={it.label} className="pngds-nav__item">
                <button type="button" ref={(el) => (btnRefs.current[i] = el)} className="pngds-nav__link pngds-nav__trigger"
                  aria-expanded={expanded} aria-controls={pid} data-active={active || undefined}
                  onClick={() => setPanel(expanded ? null : i)}>
                  {it.label}<Icon name="chevron-down" className="pngds-chevron" size={16} />
                </button>
                <div className="pngds-megamenu" id={pid} hidden={!expanded}>
                  <div className="pngds-container pngds-megamenu__inner">
                    <div className="pngds-megamenu__head">
                      <p className="pngds-megamenu__title">
                        {it.href ? <LinkComponent className="pngds-link" onClick={close} {...lp(it.href)}>{it.label}</LinkComponent> : it.label}
                      </p>
                      {it.description && <p className="pngds-megamenu__desc">{it.description}</p>}
                    </div>
                    <ul className="pngds-megamenu__list">
                      {it.children.map((c) => (
                        <li key={c.href}>
                          <LinkComponent className="pngds-megamenu__link" aria-current={currentPath === c.href ? 'page' : undefined} onClick={close} {...lp(c.href)}>
                            <span>{c.label}</span>
                            {c.badge && <span className="pngds-megamenu__badge" title={c.badge} aria-label={c.badge}>◆</span>}
                          </LinkComponent>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {end && <div className="pngds-nav__end">{end}</div>}
      </div>
    </nav>
  );
}

export function Breadcrumbs({ items = [], LinkComponent = 'a' }) {
  const { t } = useLang();
  return (
    <nav className="pngds-breadcrumbs" aria-label={t.breadcrumb}>
      <ol>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          const lp = LinkComponent === 'a' ? { href: it.href } : { to: it.href };
          return (
            <li key={i}>
              {last || !it.href
                ? <span aria-current={last ? 'page' : undefined}>{it.label}</span>
                : <LinkComponent className="pngds-link" {...lp}>{it.label}</LinkComponent>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** SideNav — grouped section navigation. groups: [{title, items:[{label, href}]}] */
export function SideNav({ groups = [], currentPath, LinkComponent = 'a', label = 'Section' }) {
  return (
    <nav className="pngds-sidenav" aria-label={label}>
      {groups.map((g) => (
        <div key={g.title}>
          {g.title && <p className="pngds-sidenav__title">{g.title}</p>}
          <ul className="pngds-sidenav__list">
            {g.items.map((it) => {
              const lp = LinkComponent === 'a' ? { href: it.href } : { to: it.href };
              return (
                <li key={it.href}>
                  <LinkComponent className="pngds-sidenav__link" aria-current={currentPath === it.href ? 'page' : undefined} {...lp}>{it.label}</LinkComponent>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** Footer — columns of links + bottom legal row. */
export function Footer({ columns = [], bottom, LinkComponent = 'a', className }) {
  return (
    <footer className={cx('pngds-footer', className)}>
      <div className="pngds-stripe" />
      <div className="pngds-container">
        <div className="pngds-footer__top">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="pngds-footer__heading">{col.title}</h2>
              {col.content}
              {col.links && (
                <ul className="pngds-footer__list">
                  {col.links.map((l) => {
                    const external = /^https?:/.test(l.href);
                    const Comp = external ? 'a' : LinkComponent;
                    const lp = Comp === 'a' ? { href: l.href } : { to: l.href };
                    return <li key={l.label}><Comp {...lp}>{l.label}</Comp></li>;
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="pngds-footer__bottom">{bottom}</div>
      </div>
    </footer>
  );
}

export function Container({ children, className, as: Tag = 'div', ...rest }) {
  return <Tag className={cx('pngds-container', className)} {...rest}>{children}</Tag>;
}

import { useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Icon, Tag, LanguageProvider } from '../lib';

/* ---------- HTML pretty printer for auto-generated HTML snippets ---------- */
const VOID = new Set(['input', 'img', 'br', 'hr', 'meta', 'link', 'source', 'path', 'circle', 'rect']);
export function formatHtml(html) {
  // Normalise React's useId tokens into readable ids.
  const cleaned = html
    .replace(/«(r[0-9a-z]+)»/g, '$1').replace(/:(r[0-9a-z]+):/g, '$1')
    .replace(/<svg[^>]*aria-hidden="true"[\s\S]*?<\/svg>/g, (m) => {
      const name = m.match(/<path d="([^"]{0,14})/); return `<svg class="pngds-icon" aria-hidden="true"><!-- icon --></svg>${name ? '' : ''}`;
    });
  const lowered = cleaned.replace(/<[^>]+>/g, (tag) => tag.replace(/\s([a-z]+[A-Z][A-Za-z]*)=/g, (_, a) => ` ${a.toLowerCase()}=`));
  const tokens = lowered.split(/(<[^>]+>)/).filter((s) => s.trim() !== '');
  let depth = 0; const out = [];
  for (const tk of tokens) {
    if (tk.startsWith('</')) { depth = Math.max(0, depth - 1); out.push('  '.repeat(depth) + tk); }
    else if (tk.startsWith('<!--')) out.push('  '.repeat(depth) + tk);
    else if (tk.startsWith('<')) {
      const name = tk.match(/^<([a-z0-9-]+)/i)?.[1]?.toLowerCase();
      out.push('  '.repeat(depth) + tk);
      if (!VOID.has(name) && !tk.endsWith('/>')) depth++;
    } else out.push('  '.repeat(depth) + tk.trim());
  }
  // collapse <tag>text</tag> onto one line
  const lines = []; for (let i = 0; i < out.length; i++) {
    const a = out[i], b = out[i + 1], c = out[i + 2];
    if (b && c && /^\s*<[a-z][^>]*>$/i.test(a) && !/^\s*</.test(b) && /^\s*<\//.test(c) && (a.trim() + b.trim() + c.trim()).length < 110) {
      lines.push(a + b.trim() + c.trim()); i += 2;
    } else lines.push(a);
  }
  return lines.join('\n').replace(/<svg class="pngds-icon" aria-hidden="true">\n\s*<!-- icon -->\n\s*<\/svg>/g, '<svg class="pngds-icon" aria-hidden="true">…</svg>');
}

/* ---------- light syntax colouring (escape first, then wrap) ---------- */
// Single pass over the raw source: each token is matched once, then escaped
// and wrapped — so later rules can never match inside markup we inserted.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wrap = (cls, s) => `<span class="${cls}">${esc(s)}</span>`;
const RULES = {
  css: /(\/\*[\s\S]*?\*\/)|(--[a-z0-9-]+)|("[^"\n]*")/g,
  // comment | <tag | attr= | "string" | 'string'
  code: /(\{\/\*[\s\S]*?\*\/\}|\/\/[^\n]*|<!--[\s\S]*?-->|#[^\n]*(?=\n|$))|(<\/?)([A-Za-z][\w.]*)|([a-zA-Z_:-]+)(?==["{])|("[^"\n]*"|'[^'\n]*')/g,
};
function highlight(code, lang) {
  const re = lang === 'css' ? RULES.css : RULES.code;
  let out = ''; let last = 0;
  for (const m of code.matchAll(re)) {
    out += esc(code.slice(last, m.index));
    if (lang === 'css') out += m[1] ? wrap('t-com', m[0]) : m[2] ? wrap('t-attr', m[0]) : wrap('t-str', m[0]);
    else if (m[1]) out += (lang === 'bash' || !m[1].startsWith('#')) ? wrap('t-com', m[1]) : esc(m[1]);
    else if (m[2]) out += esc(m[2]) + wrap('t-tag', m[3]);
    else if (m[4]) out += wrap('t-attr', m[4]);
    else out += wrap('t-str', m[5]);
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}

export function CodeBlock({ code, lang = 'jsx', label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); } catch {
      const ta = document.createElement('textarea'); ta.value = code; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="docs-code" style={{ borderTop: label ? undefined : 0, borderRadius: 8, overflow: 'hidden', margin: label === undefined ? '16px 0 24px' : 0 }}>
      <div className="docs-code__bar">
        <span className="docs-code__tab" aria-selected="true" style={{ cursor: 'default' }}>{label || lang.toUpperCase()}</span>
        <button type="button" className="docs-code__copy" onClick={copy}>
          <Icon name={copied ? 'check' : 'copy'} size={14} />{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="docs-pre" tabIndex={0}><code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} /></pre>
    </div>
  );
}

/**
 * Example — live preview with React and auto-generated HTML tabs.
 * `children` is rendered; `code` is the React snippet shown to developers.
 */
export function Example({ title, children, code, flush, narrow, html = true }) {
  const [tab, setTab] = useState('react');
  const [copied, setCopied] = useState(false);
  const htmlCode = useMemo(() => {
    if (!html) return null;
    try { return formatHtml(renderToStaticMarkup(<LanguageProvider>{children}</LanguageProvider>)); } catch { return null; }
  }, [children, html]);
  const current = tab === 'html' && htmlCode ? htmlCode : code;
  const copy = async () => {
    try { await navigator.clipboard.writeText(current); } catch { /* ignore */ }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  return (
    <figure className="docs-example" style={{ margin: undefined }}>
      {title && <figcaption className="docs-example__title">{title}</figcaption>}
      <div className={`docs-example__stage${flush ? ' docs-example__stage--flush' : ''}`} onClickCapture={guardDemoLinks}>
        <div className={narrow ? 'docs-example__stage--narrow' : undefined}>{children}</div>
      </div>
      {code && (
        <div className="docs-code">
          <div className="docs-code__bar" role="tablist" aria-label="Code language">
            <button type="button" role="tab" className="docs-code__tab" aria-selected={tab === 'react'} onClick={() => setTab('react')}>React</button>
            {htmlCode && <button type="button" role="tab" className="docs-code__tab" aria-selected={tab === 'html'} onClick={() => setTab('html')}>HTML</button>}
            <button type="button" className="docs-code__copy" onClick={copy}>
              <Icon name={copied ? 'check' : 'copy'} size={14} />{copied ? 'Copied' : 'Copy code'}
            </button>
          </div>
          <pre className="docs-pre" tabIndex={0} aria-label={`${tab === 'html' ? 'HTML' : 'React'} code`}>
            <code dangerouslySetInnerHTML={{ __html: highlight(current, tab === 'html' ? 'html' : 'jsx') }} />
          </pre>
        </div>
      )}
    </figure>
  );
}

export function PageHead({ title, lead, tags = [], eyebrow }) {
  return (
    <div className="docs-pagehead">
      {(eyebrow || tags.length > 0) && (
        <div className="docs-pagehead__meta">
          {eyebrow && <Tag variant="brand" plain>{eyebrow}</Tag>}
          {tags.map((t) => <Tag key={t.label} variant={t.variant}>{t.label}</Tag>)}
        </div>
      )}
      <h1 className="pngds-h1">{title}</h1>
      {lead && <p className="pngds-lead" style={{ marginBottom: 0 }}>{lead}</p>}
    </div>
  );
}

export function DoDont({ dos = [], donts = [] }) {
  return (
    <div className="docs-dodont">
      <div className="docs-dodont__col">
        <h3><Icon name="success" size={20} style={{ color: 'var(--pngds-success-600)' }} />Do</h3>
        <ul>{dos.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
      <div className="docs-dodont__col docs-dodont__col--dont">
        <h3><Icon name="error" size={20} style={{ color: 'var(--pngds-error-600)' }} />Don’t</h3>
        <ul>{donts.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
    </div>
  );
}

export function Checklist({ items = [] }) {
  return (
    <ul className="docs-check">
      {items.map((it, i) => (
        <li key={i}><Icon name="check" size={18} /><span>{it}</span></li>
      ))}
    </ul>
  );
}

export function PropsTable({ rows = [] }) {
  return (
    <div className="pngds-table-wrap" tabIndex={0} role="region" aria-label="Component properties">
      <table className="pngds-table" style={{ minWidth: '40rem' }}>
        <thead><tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Default</th><th scope="col">Description</th></tr></thead>
        <tbody>
          {rows.map(([p, t, d, desc]) => (
            <tr key={p}>
              <th scope="row"><code className="docs-inline">{p}</code></th>
              <td><code className="docs-inline">{t}</code></td>
              <td style={{ whiteSpace: 'nowrap' }}>{d ? <code className="docs-inline">{d}</code> : '—'}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Keeps demo links ("#", "#section") from changing the docs route. */
export function guardDemoLinks(e) {
  const a = e.target.closest?.('a');
  const href = a?.getAttribute('href');
  if (!href || !href.startsWith('#') || href.startsWith('#/')) return;
  e.preventDefault();
  const target = href.length > 1 && document.getElementById(href.slice(1));
  if (target) { if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus(); }
}

export function Frame({ url, children }) {
  return (
    <div className="docs-frame">
      <div className="docs-frame__bar" aria-hidden="true"><i /><i /><i /><span className="docs-frame__url">{url}</span></div>
      <div className="docs-frame__body pngds" onClickCapture={guardDemoLinks}>{children}</div>
    </div>
  );
}

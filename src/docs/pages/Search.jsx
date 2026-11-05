import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchInput, Tag, TextLink } from '../../lib';
import { searchIndex } from '../data/nav.js';
import { PageHead } from '../DocUI.jsx';

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = (params.get('q') || '').trim();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? searchIndex
        .map((r) => {
          const hay = `${r.title} ${r.text}`.toLowerCase();
          const score = terms.reduce((s, t) => s + (r.title.toLowerCase().includes(t) ? 3 : 0) + (hay.includes(t) ? 1 : 0), 0);
          return { ...r, score, all: terms.every((t) => hay.includes(t)) };
        })
        .filter((r) => r.all)
        .sort((a, b) => b.score - a.score)
    : [];
  return (
    <>
      <PageHead title="Search" />
      <SearchInput key={q} label="Search the design system" defaultValue={q} onSearch={(v) => navigate(`/search?q=${encodeURIComponent(v)}`)} id="search-page" />
      {q && (
        <p role="status" style={{ marginTop: 24 }}><strong>{results.length}</strong> result{results.length === 1 ? '' : 's'} for “{q}”</p>
      )}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {results.map((r) => (
          <li key={r.href} style={{ padding: '16px 0', borderBottom: '1px solid var(--pngds-color-border)' }}>
            <Tag plain>{r.type}</Tag>
            <h2 className="pngds-h4" style={{ margin: '6px 0 4px' }}><TextLink as={Link} href={r.href}>{r.title}</TextLink></h2>
            <p className="pngds-small" style={{ margin: 0, color: 'var(--pngds-neutral-600)' }}>{r.text.length > 140 ? `${r.text.slice(0, 140)}…` : r.text}</p>
          </li>
        ))}
      </ul>
      {q && !results.length && <p>Try different words, or browse <TextLink as={Link} href="/components">all components</TextLink>.</p>}
    </>
  );
}

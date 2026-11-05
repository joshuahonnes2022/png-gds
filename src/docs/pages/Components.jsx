import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardGrid, Tag, TextInput, TextLink, Button, ButtonGroup } from '../../lib';
import { components, categories, getComponent, categorySlug, categoryDesc } from '../data/components.jsx';
import { PageHead, Example, PropsTable, DoDont, Checklist } from '../DocUI.jsx';
import NotFound from './NotFound.jsx';

const statusVariant = { Stable: 'success', Beta: 'warning', Draft: 'neutral' };

export function ComponentsIndex() {
  const [q, setQ] = useState('');
  const match = (c) => !q || `${c.name} ${c.summary} ${c.category}`.toLowerCase().includes(q.toLowerCase());
  const shown = components.filter(match);
  return (
    <>
      <PageHead eyebrow="Library" title="Components" lead="Reusable, accessible building blocks for government websites and services. Each one includes guidance, a live example, React and HTML code, and accessibility notes." />
      <TextInput label="Filter components" type="search" value={q} onChange={(e) => setQ(e.target.value)} hint={`${shown.length} of ${components.length} shown`} />
      {categories.map((cat) => {
        const list = shown.filter((c) => c.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat}>
            <h2 className="pngds-h2" style={{ marginTop: 'var(--pngds-space-6)' }}><Link className="pngds-link" to={`/components/category/${categorySlug(cat)}`} style={{ color: 'inherit' }}>{cat}</Link></h2>
            <p className="pngds-text-secondary pngds-mt-0">{categoryDesc[cat]}</p>
            <CardGrid>
              {list.map((c) => (
                <Card key={c.slug} href={`/components/${c.slug}`} LinkComponent={Link} title={c.name} footer={<Tag variant={statusVariant[c.status]}>{c.status}</Tag>}>{c.summary}</Card>
              ))}
            </CardGrid>
          </section>
        );
      })}
    </>
  );
}

export function ComponentPage() {
  const { slug } = useParams();
  const c = getComponent(slug);
  if (!c) return <NotFound />;
  const idx = components.indexOf(c);
  const prev = components[idx - 1];
  const next = components[idx + 1];
  return (
    <article>
      <PageHead eyebrow={c.category} title={c.name} lead={c.summary} tags={[{ label: c.status, variant: statusVariant[c.status] }, { label: 'React + HTML', variant: 'info' }]} />

      <div style={{ display: 'grid', gap: 'var(--pngds-space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))' }}>
        <div><h2 className="pngds-h3" style={{ marginTop: 0 }}>When to use</h2><ul style={{ margin: 0, paddingLeft: '1.2rem' }}>{c.use.map((u) => <li key={u}>{u}</li>)}</ul></div>
        <div><h2 className="pngds-h3" style={{ marginTop: 0 }}>When not to use</h2><ul style={{ margin: 0, paddingLeft: '1.2rem' }}>{c.avoid.map((u) => <li key={u}>{u}</li>)}</ul></div>
      </div>

      <h2 className="pngds-h2">Examples</h2>
      {c.examples.map((ex) => (
        <Example key={ex.title} title={ex.title} code={ex.code} flush={ex.flush} html={ex.html !== false}>{ex.el}</Example>
      ))}

      <h2 className="pngds-h2">Accessibility</h2>
      <Checklist items={c.a11y} />

      <h2 className="pngds-h2">Do’s and don’ts</h2>
      <DoDont dos={c.dos} donts={c.donts} />

      <h2 className="pngds-h2">Properties (React)</h2>
      <PropsTable rows={c.props} />

      <p className="pngds-small" style={{ marginTop: 'var(--pngds-space-6)', color: 'var(--pngds-color-text-secondary)' }}>
        Something wrong or missing? <TextLink as={Link} href="/governance/contribute">Suggest an improvement</TextLink>.
      </p>
      <nav aria-label="Previous and next component" style={{ marginTop: 'var(--pngds-space-6)', paddingTop: 'var(--pngds-space-5)', borderTop: '1px solid var(--pngds-color-border)' }}>
        <ButtonGroup>
          {prev && <Button as={Link} to={`/components/${prev.slug}`} variant="secondary" iconStart="arrow-left"><span className="pngds-visually-hidden">Previous: </span>{prev.name}</Button>}
          {next && <Button as={Link} to={`/components/${next.slug}`} variant="secondary" iconEnd="arrow-right" style={{ marginLeft: 'auto' }}><span className="pngds-visually-hidden">Next: </span>{next.name}</Button>}
        </ButtonGroup>
      </nav>
    </article>
  );
}

export function ComponentCategory() {
  const { cat } = useParams();
  const name = categories.find((c) => categorySlug(c) === cat);
  if (!name) return <NotFound />;
  const list = components.filter((c) => c.category === name);
  return (
    <>
      <PageHead eyebrow="Components" title={name} lead={categoryDesc[name]} />
      <CardGrid>
        {list.map((c) => (
          <Card key={c.slug} href={`/components/${c.slug}`} LinkComponent={Link} title={c.name} footer={<Tag variant={statusVariant[c.status]}>{c.status}</Tag>}>{c.summary}</Card>
        ))}
      </CardGrid>
    </>
  );
}

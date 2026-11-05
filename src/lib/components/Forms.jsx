import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { useLang } from '../i18n.jsx';

const cx = (...c) => c.filter(Boolean).join(' ');

function ErrorMessage({ id, children }) {
  const { t } = useLang();
  if (!children) return null;
  return (
    <p className="pngds-error-message" id={id}>
      <Icon name="error" />
      <span><span className="pngds-visually-hidden">{t.error}: </span>{children}</span>
    </p>
  );
}

/** Field — label + hint + error wrapper. Wires up aria-describedby for you. */
function useFieldIds(id, hint, error) {
  const auto = useId();
  const inputId = id || `f${auto}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { inputId, hintId, errorId, describedBy };
}

function FieldShell({ inputId, label, hint, hintId, error, errorId, optional, children, className }) {
  const { t } = useLang();
  return (
    <div className={cx('pngds-field', error && 'pngds-field--error', className)}>
      <label className="pngds-label" htmlFor={inputId}>
        {label}{optional && <span className="pngds-label__optional"> {t.optional}</span>}
      </label>
      {hint && <span className="pngds-hint" id={hintId}>{hint}</span>}
      <ErrorMessage id={errorId}>{error}</ErrorMessage>
      {children}
    </div>
  );
}

/** TextInput — text, email, tel, password, number. Use `width` short|medium for known-length answers. */
export const TextInput = forwardRef(function TextInput(
  { label, hint, error, optional, id, width, prefix, type = 'text', className, ...rest }, ref,
) {
  const ids = useFieldIds(id, hint, error);
  const input = (
    <input
      ref={ref}
      id={ids.inputId}
      type={type}
      className={cx('pngds-input', width && `pngds-input--w-${width}`)}
      aria-describedby={ids.describedBy}
      aria-invalid={error ? 'true' : undefined}
      {...rest}
    />
  );
  return (
    <FieldShell {...ids} label={label} hint={hint} error={error} optional={optional} className={className}>
      {prefix ? <div className="pngds-input-group"><span className="pngds-input-prefix" aria-hidden="true">{prefix}</span>{input}</div> : input}
    </FieldShell>
  );
});

export function Textarea({ label, hint, error, optional, id, rows = 5, maxLength, value, onChange, ...rest }) {
  const ids = useFieldIds(id, hint, error);
  const [count, setCount] = useState(value?.length || 0);
  return (
    <FieldShell {...ids} label={label} hint={hint} error={error} optional={optional}>
      <textarea
        id={ids.inputId} rows={rows} className="pngds-textarea" maxLength={maxLength}
        aria-describedby={cx(ids.describedBy, maxLength && `${ids.inputId}-count`) || undefined}
        aria-invalid={error ? 'true' : undefined}
        value={value}
        onChange={(e) => { setCount(e.target.value.length); onChange?.(e); }}
        {...rest}
      />
      {maxLength && (
        <span className="pngds-hint" id={`${ids.inputId}-count`} aria-live="polite" style={{ marginTop: 6 }}>
          {maxLength - count} characters remaining
        </span>
      )}
    </FieldShell>
  );
}

/** Select — options: [{value, label}] or strings. */
export function Select({ label, hint, error, optional, id, options = [], placeholder, ...rest }) {
  const ids = useFieldIds(id, hint, error);
  return (
    <FieldShell {...ids} label={label} hint={hint} error={error} optional={optional}>
      <select id={ids.inputId} className="pngds-select" aria-describedby={ids.describedBy} aria-invalid={error ? 'true' : undefined} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </select>
    </FieldShell>
  );
}

/** Choice group — checkboxes or radios inside a fieldset with legend. */
function ChoiceGroup({ type, legend, hint, error, name, options = [], value, onChange, inline, large, id }) {
  const auto = useId();
  const groupId = id || `g${auto}`;
  const hintId = hint ? `${groupId}-hint` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const selected = type === 'checkbox' ? (value || []) : value;
  const handle = (v, checked) => {
    if (type === 'radio') onChange?.(v);
    else onChange?.(checked ? [...selected, v] : selected.filter((x) => x !== v));
  };
  return (
    <div className={cx('pngds-field', error && 'pngds-field--error')}>
      <fieldset className={cx('pngds-fieldset', large && 'pngds-fieldset--lg')} aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}>
        <legend>{legend}</legend>
        {hint && <span className="pngds-hint" id={hintId}>{hint}</span>}
        <ErrorMessage id={errorId}>{error}</ErrorMessage>
        <div className={inline ? 'pngds-choices--inline' : undefined}>
          {options.map((o, i) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            const oid = `${groupId}-${i}`;
            const checked = type === 'radio' ? selected === opt.value : selected.includes(opt.value);
            return (
              <div className="pngds-choice" key={opt.value}>
                <input
                  type={type} id={oid} name={name || groupId} value={opt.value}
                  checked={onChange ? checked : undefined}
                  defaultChecked={onChange ? undefined : opt.checked}
                  onChange={(e) => handle(opt.value, e.target.checked)}
                  aria-describedby={opt.hint ? `${oid}-hint` : undefined}
                />
                <label htmlFor={oid}>
                  {opt.label}
                  {opt.hint && <span className="pngds-choice__hint" id={`${oid}-hint`}>{opt.hint}</span>}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export const Radios = (p) => <ChoiceGroup type="radio" {...p} />;
export const Checkboxes = (p) => <ChoiceGroup type="checkbox" {...p} />;

/** Single checkbox, e.g. declarations. */
export function Checkbox({ label, hint, id, ...rest }) {
  const auto = useId();
  const cid = id || `c${auto}`;
  return (
    <div className="pngds-choice">
      <input type="checkbox" id={cid} aria-describedby={hint ? `${cid}-hint` : undefined} {...rest} />
      <label htmlFor={cid}>{label}{hint && <span className="pngds-choice__hint" id={`${cid}-hint`}>{hint}</span>}</label>
    </div>
  );
}

/**
 * DateInput — three separate fields (day / month / year).
 * Recommended over calendar pickers for dates people already know
 * (date of birth, issue dates): faster on mobile and fully accessible.
 */
export function DateInput({ legend, hint, error, value = {}, onChange, id }) {
  const { t } = useLang();
  const auto = useId();
  const gid = id || `d${auto}`;
  const set = (k) => (e) => onChange?.({ ...value, [k]: e.target.value.replace(/\D/g, '') });
  const part = (k, label, w, max) => (
    <div>
      <label className="pngds-label" htmlFor={`${gid}-${k}`} style={{ fontWeight: 400 }}>{label}</label>
      <input id={`${gid}-${k}`} className="pngds-input" style={{ width: w }} inputMode="numeric" maxLength={max}
        value={value[k] || ''} onChange={set(k)} aria-invalid={error ? 'true' : undefined} />
    </div>
  );
  return (
    <div className={cx('pngds-field', error && 'pngds-field--error')}>
      <fieldset className="pngds-fieldset" role="group" aria-describedby={[hint && `${gid}-hint`, error && `${gid}-error`].filter(Boolean).join(' ') || undefined}>
        <legend>{legend}</legend>
        {hint && <span className="pngds-hint" id={`${gid}-hint`}>{hint}</span>}
        <ErrorMessage id={`${gid}-error`}>{error}</ErrorMessage>
        <div style={{ display: 'flex', gap: 'var(--pngds-space-4)' }}>
          {part('day', t.day, '4rem', 2)}
          {part('month', t.month, '4rem', 2)}
          {part('year', t.year, '6rem', 4)}
        </div>
      </fieldset>
    </div>
  );
}

/** FileUpload — native input with drag-and-drop and a removable file list. */
export function FileUpload({ label, hint, error, accept, multiple, maxSizeMB = 5, onChange, id }) {
  const { t } = useLang();
  const ids = useFieldIds(id, hint, error);
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);
  const add = (list) => {
    const next = multiple ? [...files, ...list] : list.slice(0, 1);
    setFiles(next); onChange?.(next);
  };
  const remove = (i) => { const next = files.filter((_, j) => j !== i); setFiles(next); onChange?.(next); };
  const fmt = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
  return (
    <FieldShell {...ids} label={label} hint={hint} error={error}>
      <div
        className={cx('pngds-file', drag && 'pngds-file--drag')}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add([...e.dataTransfer.files]); }}
      >
        <Icon name="upload" size={28} style={{ color: 'var(--pngds-neutral-600)' }} />
        <div style={{ marginTop: 8 }}>
          <button type="button" className="pngds-btn pngds-btn--secondary pngds-btn--sm" onClick={() => inputRef.current?.click()}>
            {t.chooseFile}
          </button>{' '}
          <span className="pngds-small">{t.dropHere}</span>
        </div>
        <input ref={inputRef} id={ids.inputId} type="file" className="pngds-visually-hidden" accept={accept} multiple={multiple}
          aria-describedby={ids.describedBy} onChange={(e) => { add([...e.target.files]); e.target.value = ''; }} tabIndex={-1} />
        <p className="pngds-caption" style={{ margin: '8px 0 0' }}>Maximum {maxSizeMB} MB{accept ? ` · ${accept}` : ''}</p>
        {files.length > 0 && (
          <ul className="pngds-file__list" aria-live="polite">
            {files.map((f, i) => (
              <li className="pngds-file__item" key={`${f.name}-${i}`}>
                <span><Icon name="file" size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />{f.name}</span>
                <span className="pngds-caption">{fmt(f.size)}</span>
                <button type="button" className="pngds-btn pngds-btn--tertiary pngds-btn--sm" onClick={() => remove(i)}>
                  {t.remove}<span className="pngds-visually-hidden"> {f.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FieldShell>
  );
}

/** ErrorSummary — shown at the top of a form after a failed submit. Receives focus. */
export function ErrorSummary({ errors = [], title, focusOnMount = true }) {
  const { t } = useLang();
  const ref = useRef(null);
  useEffect(() => { if (errors.length && focusOnMount) ref.current?.focus(); }, [errors.length, focusOnMount]);
  if (!errors.length) return null;
  return (
    <div className="pngds-error-summary" role={focusOnMount ? 'alert' : undefined} tabIndex={-1} ref={ref} aria-labelledby="pngds-es-title">
      <h2 className="pngds-error-summary__title" id="pngds-es-title">{title || t.errorSummary}</h2>
      <ul>
        {errors.map((e) => (
          <li key={e.href}>
            <a href={e.href} onClick={(ev) => { ev.preventDefault(); document.querySelector(e.href)?.focus(); }}>{e.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** SearchInput — labelled search with submit button. */
export function SearchInput({ label, onSearch, placeholder, defaultValue = '', id }) {
  const { t } = useLang();
  const auto = useId();
  const sid = id || `s${auto}`;
  const [q, setQ] = useState(defaultValue);
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); onSearch?.(q); }}>
      <label htmlFor={sid} className={label ? 'pngds-label' : 'pngds-visually-hidden'}>{label || t.search}</label>
      <div className="pngds-search">
        <input id={sid} type="search" className="pngds-input" value={q} placeholder={placeholder} onChange={(e) => setQ(e.target.value)} />
        <button type="submit" className="pngds-btn pngds-btn--dark">
          <Icon name="search" className="pngds-btn__icon" /><span className="pngds-visually-hidden">{t.search}</span>
        </button>
      </div>
    </form>
  );
}

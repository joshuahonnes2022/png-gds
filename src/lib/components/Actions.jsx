import { Icon } from './Icon.jsx';

const cx = (...c) => c.filter(Boolean).join(' ');

/**
 * Button
 * variant: primary | secondary | tertiary | dark | danger
 * size: sm | md | lg
 * Pass `href` to render a link styled as a button (for navigation).
 */
export function Button({
  variant = 'primary', size = 'md', block = false, iconStart, iconEnd,
  href, as, className, children, type = 'button', ...rest
}) {
  const classes = cx(
    'pngds-btn',
    variant !== 'primary' && `pngds-btn--${variant}`,
    size !== 'md' && `pngds-btn--${size}`,
    block && 'pngds-btn--block',
    className,
  );
  const content = (
    <>
      {iconStart && <Icon name={iconStart} className="pngds-btn__icon" />}
      {children}
      {iconEnd && <Icon name={iconEnd} className="pngds-btn__icon" />}
    </>
  );
  if (as) { const Comp = as; return <Comp className={classes} {...rest}>{content}</Comp>; }
  if (href) return <a className={classes} href={href} {...rest}>{content}</a>;
  return <button type={type} className={classes} {...rest}>{content}</button>;
}

export function ButtonGroup({ children, className }) {
  return <div className={cx('pngds-btn-group', className)}>{children}</div>;
}

/** TextLink — inline link. `external` adds an icon + screen-reader text. */
export function TextLink({ href, external, children, className, as: Comp = 'a', ...rest }) {
  const extProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const linkProp = Comp === 'a' ? { href } : { to: href };
  return (
    <Comp className={cx('pngds-link', className)} {...linkProp} {...extProps} {...rest}>
      {children}
      {external && (
        <>
          <Icon name="external" size={14} style={{ marginLeft: 4, verticalAlign: '-1px' }} />
          <span className="pngds-visually-hidden"> (opens in a new tab)</span>
        </>
      )}
    </Comp>
  );
}

/** Toggle — an on/off switch (role="switch"). Use for settings that apply immediately. */
export function Toggle({ label, checked, onChange, onLabel = 'On', offLabel = 'Off', id }) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      className="pngds-toggle"
      onClick={() => onChange?.(!checked)}
    >
      <span className="pngds-toggle__track" aria-hidden="true" />
      <span>{label}</span>
      <span className="pngds-toggle__state" aria-hidden="true">{checked ? onLabel : offLabel}</span>
    </button>
  );
}

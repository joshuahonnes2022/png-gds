// PNG-GDS icon set — inline SVG, 24px grid, 2px stroke, currentColor.
// Inline SVG means zero extra HTTP requests (low-bandwidth friendly).

const paths = {
  'chevron-down': <path d="M6 9l6 6 6-6" />,
  'chevron-right': <path d="M9 6l6 6-6 6" />,
  'chevron-left': <path d="M15 6l-6 6 6 6" />,
  'arrow-right': <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  'arrow-left': <><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7.5v.5" /></>,
  success: <><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></>,
  warning: <><path d="M12 3.5L2.5 20h19z" /><path d="M12 10v4.5" /><path d="M12 17.5v.5" /></>,
  error: <><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  upload: <><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" /></>,
  download: <><path d="M12 4v12" /><path d="M7 11l5 5 5-5" /><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" /></>,
  external: <><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="1.5" /><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  file: <><path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z" /><path d="M14 3v5h5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4.5 4.5-6.5 8-6.5s7 2 8 6.5" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="1.5" /><path d="M8 10.5V7a4 4 0 018 0v3.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A16 16 0 014 5a1 1 0 011-1z" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="1.5" /><path d="M3.5 6.5L12 13l8.5-6.5" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="1.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  palette: <><path d="M12 3a9 9 0 100 18c1.2 0 1.8-.8 1.8-1.7 0-1.3-1-1.6-1-2.8 0-1 .8-1.7 1.8-1.7H17a4 4 0 004-4C21 6.5 17 3 12 3z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" /></>,
  code: <><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /></>,
  template: <><rect x="3.5" y="3.5" width="17" height="17" rx="1.5" /><path d="M3.5 9h17M9 9v11.5" /></>,
  shield: <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />,
  people: <><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5" /><path d="M15.5 5.2a3.5 3.5 0 010 6.6M18 14.8c2 .7 3.2 2.5 3.5 5.2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
};

export function Icon({ name, size = 24, className = '', title, ...rest }) {
  const body = paths[name];
  if (!body) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {body}
    </svg>
  );
}

export const iconNames = Object.keys(paths);

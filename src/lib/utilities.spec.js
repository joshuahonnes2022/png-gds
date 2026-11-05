// PNG-GDS utility classes — single source of truth.
// scripts/build-utilities.mjs turns this into src/lib/utilities.css,
// and the documentation pages read it to list every class.
// All utilities use !important so they reliably override component styles.

const v = (t) => `var(--pngds-${t})`;
const BP = { sm: '36rem', md: '48rem', lg: '64rem', xl: '80rem' };
const spaceSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const spacePx = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96 };

const side = {
  '': (p, val) => `${p}: ${val}`,
  t: (p, val) => `${p}-top: ${val}`,
  r: (p, val) => `${p}-right: ${val}`,
  b: (p, val) => `${p}-bottom: ${val}`,
  l: (p, val) => `${p}-left: ${val}`,
  x: (p, val) => `${p}-left: ${val}; ${p}-right: ${val}`,
  y: (p, val) => `${p}-top: ${val}; ${p}-bottom: ${val}`,
};

function spacing() {
  const rows = [];
  for (const [prop, short] of [['margin', 'm'], ['padding', 'p']]) {
    for (const s of Object.keys(side)) {
      for (const n of spaceSteps) rows.push([`${short}${s}-${n}`, side[s](prop, n === 0 ? '0' : v(`space-${n}`)), `${spacePx[n]}px`]);
      if (prop === 'margin' && ['', 'x', 'l', 'r'].includes(s)) rows.push([`${short}${s}-auto`, side[s](prop, 'auto'), 'auto']);
    }
  }
  return rows;
}

const display = ['none', 'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid'];

export const utilityGroups = {
  background: {
    intro: 'Set a background colour from the brand palette. Classes that use a dark background also set a light text colour so the pair always meets WCAG AA.',
    classes: [
      ['bg-white', `background-color: ${v('neutral-0')}`],
      ['bg-off-white', `background-color: ${v('neutral-50')}`],
      ['bg-grey', `background-color: ${v('neutral-100')}`],
      ['bg-brand', `background-color: ${v('orange-500')}; color: ${v('neutral-0')}`, 'Deep orange — large text only'],
      ['bg-brand-dark', `background-color: ${v('orange-600')}; color: ${v('neutral-0')}`, 'Text-safe deep orange'],
      ['bg-brand-light', `background-color: ${v('orange-50')}`],
      ['bg-orange', `background-color: ${v('amber-400')}; color: ${v('neutral-900')}`],
      ['bg-navy', `background-color: ${v('navy-700')}; color: ${v('neutral-0')}`],
      ['bg-navy-dark', `background-color: ${v('navy-900')}; color: ${v('neutral-0')}`],
      ['bg-navy-light', `background-color: ${v('navy-50')}`],
      ['bg-yellow', `background-color: ${v('yellow-400')}; color: ${v('neutral-900')}`],
      ['bg-yellow-light', `background-color: ${v('yellow-50')}`],
      ['bg-info', `background-color: ${v('info-50')}`],
      ['bg-success', `background-color: ${v('success-50')}`],
      ['bg-warning', `background-color: ${v('warning-50')}`],
      ['bg-error', `background-color: ${v('error-50')}`],
      ['bg-gradient', `background-image: ${v('color-brand-gradient')}`, 'Decorative only — no text'],
      ['bg-transparent', 'background-color: transparent'],
    ],
  },
  borders: {
    intro: 'Add, remove or colour borders, and round corners.',
    classes: [
      ['border', `border: 1px solid ${v('color-border')}`],
      ['border-0', 'border: 0'],
      ['border-top', `border-top: 1px solid ${v('color-border')}`],
      ['border-right', `border-right: 1px solid ${v('color-border')}`],
      ['border-bottom', `border-bottom: 1px solid ${v('color-border')}`],
      ['border-left', `border-left: 1px solid ${v('color-border')}`],
      ['border-thick', 'border-width: 2px'],
      ['border-dark', `border-color: ${v('neutral-900')}`],
      ['border-brand', `border-color: ${v('orange-500')}`],
      ['border-navy', `border-color: ${v('navy-700')}`],
      ['border-accent-left', `border-left: 6px solid ${v('orange-500')}`, 'Brand accent bar'],
      ['border-accent-top', `border-top: 6px solid ${v('orange-500')}`, 'Brand accent bar'],
      ['rounded-0', 'border-radius: 0'],
      ['rounded-sm', `border-radius: ${v('radius-sm')}`],
      ['rounded', `border-radius: ${v('radius-md')}`],
      ['rounded-lg', `border-radius: ${v('radius-lg')}`],
      ['rounded-pill', `border-radius: ${v('radius-pill')}`],
      ['rounded-circle', 'border-radius: 50%'],
    ],
  },
  'box-shadow': {
    intro: 'Add depth with the three elevation levels. Use shadows sparingly — they are for things that sit above the page, like menus and dialogs.',
    classes: [
      ['shadow-0', 'box-shadow: none'],
      ['shadow-1', `box-shadow: ${v('shadow-1')}`, 'Subtle — cards at rest'],
      ['shadow-2', `box-shadow: ${v('shadow-2')}`, 'Raised — hover states'],
      ['shadow-3', `box-shadow: ${v('shadow-3')}`, 'Overlay — menus, dialogs'],
    ],
  },
  display: {
    intro: 'Change how an element is displayed. Add a breakpoint (sm, md, lg, xl) to apply from that screen width upwards — for example, hide on phones and show from tablets.',
    classes: display.map((d) => [`display-${d}`, `display: ${d}`]),
    responsive: display.map((d) => [`display-{bp}-${d}`, `display: ${d}`]),
  },
  flex: {
    intro: 'Control flexbox layouts: direction, wrapping, alignment, gaps and order. Combine with display-flex.',
    classes: [
      ['flex-row', 'flex-direction: row'], ['flex-column', 'flex-direction: column'],
      ['flex-row-reverse', 'flex-direction: row-reverse'], ['flex-column-reverse', 'flex-direction: column-reverse'],
      ['flex-wrap', 'flex-wrap: wrap'], ['flex-nowrap', 'flex-wrap: nowrap'],
      ['flex-1', 'flex: 1 1 0%'], ['flex-auto', 'flex: 1 1 auto'], ['flex-none', 'flex: none'],
      ['flex-grow-0', 'flex-grow: 0'], ['flex-grow-1', 'flex-grow: 1'], ['flex-shrink-0', 'flex-shrink: 0'],
      ['justify-start', 'justify-content: flex-start'], ['justify-center', 'justify-content: center'],
      ['justify-end', 'justify-content: flex-end'], ['justify-between', 'justify-content: space-between'],
      ['justify-around', 'justify-content: space-around'],
      ['align-items-start', 'align-items: flex-start'], ['align-items-center', 'align-items: center'],
      ['align-items-end', 'align-items: flex-end'], ['align-items-stretch', 'align-items: stretch'],
      ['align-items-baseline', 'align-items: baseline'],
      ['align-self-start', 'align-self: flex-start'], ['align-self-center', 'align-self: center'],
      ['align-self-end', 'align-self: flex-end'],
      ...[1, 2, 3, 4, 5, 6].map((n) => [`gap-${n}`, `gap: ${v(`space-${n}`)}`, `${spacePx[n]}px`]),
      ['order-first', 'order: -1'], ['order-last', 'order: 99'],
    ],
    responsive: [['flex-{bp}-row', 'flex-direction: row'], ['flex-{bp}-column', 'flex-direction: column'], ['order-{bp}-first', 'order: -1'], ['order-{bp}-last', 'order: 99']],
  },
  float: {
    intro: 'Float an element left or right so text wraps around it — mainly for images in long-form content. Use flex or grid for layout instead.',
    classes: [['float-left', 'float: left'], ['float-right', 'float: right'], ['float-none', 'float: none']],
    extraCss: '.pngds-clearfix::after { content: ""; display: table; clear: both; }',
    extraRows: [['clearfix', 'contains floated children (::after clear)']],
  },
  overflow: {
    intro: 'Control what happens when content is bigger than its box.',
    classes: [
      ['overflow-auto', 'overflow: auto'], ['overflow-hidden', 'overflow: hidden'], ['overflow-visible', 'overflow: visible'],
      ['overflow-scroll', 'overflow: scroll'], ['overflow-x-auto', 'overflow-x: auto'], ['overflow-y-auto', 'overflow-y: auto'],
    ],
  },
  position: {
    intro: 'Set the positioning method and offsets.',
    classes: [
      ['position-static', 'position: static'], ['position-relative', 'position: relative'], ['position-absolute', 'position: absolute'],
      ['position-fixed', 'position: fixed'], ['position-sticky', 'position: sticky'],
      ['top-0', 'top: 0'], ['bottom-0', 'bottom: 0'], ['left-0', 'left: 0'], ['right-0', 'right: 0'], ['inset-0', 'inset: 0'],
    ],
  },
  reflow: {
    intro: 'Help content reflow at 320px width and 400% zoom without horizontal scrolling (WCAG 1.4.10). Use these when long words, codes or wide content break a layout.',
    classes: [
      ['reflow-wrap', 'overflow-wrap: anywhere; word-break: normal', 'Break long words, emails and URLs'],
      ['reflow-min-0', 'min-width: 0', 'Let flex and grid children shrink'],
      ['reflow-scroll', 'overflow-x: auto; max-width: 100%', 'Wide content (tables, code) scrolls inside its box'],
      ['reflow-media', 'max-width: 100%; height: auto', 'Images and video never overflow'],
    ],
    extraCss: '@media (max-width: 47.99rem) { .pngds-reflow-stack { flex-direction: column !important; } .pngds-reflow-stack > * { width: 100% !important; } }',
    extraRows: [['reflow-stack', 'flex-direction: column under 768px (children full width)']],
  },
  spacing: {
    intro: 'Margin (m) and padding (p) on the 4px spacing scale. Add t, r, b, l for one side, or x and y for two sides. For example pngds-mt-5 adds 24px of margin above.',
    classes: spacing(),
  },
  svg: {
    intro: 'Size and colour inline SVG icons and pictograms. Icons inherit the text colour by default.',
    classes: [
      ['svg-fill-current', 'fill: currentColor'], ['svg-stroke-current', 'stroke: currentColor'],
      ['svg-fill-brand', `fill: ${v('orange-500')}`], ['svg-fill-navy', `fill: ${v('navy-700')}`], ['svg-fill-white', `fill: ${v('neutral-0')}`],
      ['svg-color-brand', `color: ${v('orange-600')}`], ['svg-color-navy', `color: ${v('navy-700')}`],
      ['svg-sm', 'width: 16px; height: 16px'], ['svg-md', 'width: 24px; height: 24px'],
      ['svg-lg', 'width: 32px; height: 32px'], ['svg-xl', 'width: 48px; height: 48px'],
      ['svg-inline', 'vertical-align: -0.15em', 'Line icons up with text'],
    ],
  },
  text: {
    intro: 'Text alignment, size, weight, colour, case, wrapping and decoration.',
    classes: [
      ['text-left', 'text-align: left'], ['text-center', 'text-align: center'], ['text-right', 'text-align: right'],
      ['text-xs', `font-size: ${v('font-size-xs')}`, '13px'], ['text-sm', `font-size: ${v('font-size-sm')}`, '15px'],
      ['text-md', `font-size: ${v('font-size-md')}`, '17px'], ['text-lg', `font-size: ${v('font-size-lg')}`, '20px'],
      ['text-xl', `font-size: ${v('font-size-xl')}`, '24px'], ['text-2xl', `font-size: ${v('font-size-2xl')}`, '30px'],
      ['text-regular', `font-weight: ${v('font-weight-regular')}`], ['text-semibold', `font-weight: ${v('font-weight-semibold')}`],
      ['text-bold', `font-weight: ${v('font-weight-bold')}`],
      ['text-dark', `color: ${v('color-text')}`], ['text-secondary', `color: ${v('color-text-secondary')}`],
      ['text-white', `color: ${v('neutral-0')}`], ['text-brand', `color: ${v('color-brand-text')}`],
      ['text-navy', `color: ${v('navy-700')}`], ['text-link', `color: ${v('color-link')}`],
      ['text-uppercase', 'text-transform: uppercase'], ['text-lowercase', 'text-transform: lowercase'],
      ['text-capitalize', 'text-transform: capitalize'],
      ['text-nowrap', 'white-space: nowrap'], ['text-truncate', 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap'],
      ['text-break', 'overflow-wrap: anywhere'],
      ['text-underline', 'text-decoration: underline'], ['text-no-underline', 'text-decoration: none'],
      ['text-mono', `font-family: ${v('font-mono')}`], ['text-tabular', 'font-variant-numeric: tabular-nums'],
      ['leading-tight', `line-height: ${v('line-height-tight')}`], ['leading-body', `line-height: ${v('line-height-body')}`],
      ['measure', `max-width: ${v('measure')}`, 'Comfortable reading width'],
    ],
  },
  'vertical-alignment': {
    intro: 'Align inline, inline-block and table-cell elements vertically.',
    classes: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom'].map((a) => [`align-${a}`, `vertical-align: ${a}`]),
  },
  visibility: {
    intro: 'Show or hide content — visually, for everyone, or for print. Prefer visually-hidden over display: none when screen-reader users still need the content.',
    classes: [
      ['visible', 'visibility: visible'], ['invisible', 'visibility: hidden', 'Keeps its space'],
    ],
    extraCss: [
      '.pngds-visually-hidden-focusable:not(:focus):not(:focus-within) { position: absolute !important; width: 1px !important; height: 1px !important; padding: 0 !important; margin: -1px !important; overflow: hidden !important; clip: rect(0 0 0 0) !important; white-space: nowrap !important; border: 0 !important; }',
      '.pngds-print-only { display: none !important; }',
      '@media print { .pngds-print-only { display: block !important; } .pngds-print-hidden { display: none !important; } }',
    ].join('\n'),
    extraRows: [
      ['visually-hidden', 'hidden on screen, read by screen readers'],
      ['visually-hidden-focusable', 'hidden until it receives keyboard focus'],
      ['print-only', 'shown only when printed'],
      ['print-hidden', 'hidden when printed'],
    ],
  },
  'z-index': {
    intro: 'Control stacking order with a fixed scale, so components layer predictably across services.',
    classes: [
      ['z-0', 'z-index: 0'], ['z-10', 'z-index: 10', 'Raised content'], ['z-20', 'z-index: 20', 'Sticky elements'],
      ['z-30', 'z-index: 30', 'Dropdowns'], ['z-40', 'z-index: 40', 'Header and navigation'],
      ['z-50', 'z-index: 50', 'Dialogs and overlays'], ['z-auto', 'z-index: auto'],
    ],
  },
};

export const BREAKPOINTS = BP;

/** Expand responsive templates into concrete class names for a breakpoint. */
export const expandResponsive = (rows, bp) => rows.map(([name, css]) => [name.replace('{bp}', bp), css]);

/** Generate the full CSS text. */
export function buildUtilitiesCss() {
  const out = ['/* PNG-GDS utility classes — generated from utilities.spec.js. Do not edit by hand. */'];
  const rule = (name, css) => `.pngds-${name} { ${css.split(';').map((d) => d.trim()).filter(Boolean).map((d) => `${d} !important`).join('; ')}; }`;
  for (const [slug, g] of Object.entries(utilityGroups)) {
    out.push(`\n/* ${slug} */`);
    g.classes.forEach(([n, css]) => out.push(rule(n, css)));
    if (g.extraCss) out.push(g.extraCss);
    if (g.responsive) {
      for (const [bp, w] of Object.entries(BP)) {
        out.push(`@media (min-width: ${w}) {`);
        expandResponsive(g.responsive, bp).forEach(([n, css]) => out.push('  ' + rule(n, css)));
        out.push('}');
      }
    }
  }
  return out.join('\n') + '\n';
}

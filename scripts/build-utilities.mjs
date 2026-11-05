// Generates src/lib/utilities.css from src/lib/utilities.spec.js
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildUtilitiesCss } from '../src/lib/utilities.spec.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = buildUtilitiesCss();
writeFileSync(resolve(root, 'src/lib/utilities.css'), css);
console.log(`utilities.css written (${(css.length / 1024).toFixed(1)} KB, ${(css.match(/\.pngds-/g) || []).length} rules)`);

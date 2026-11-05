import { Link } from 'react-router-dom';
import { TextLink } from '../../lib';

export default function NotFound() {
  return (
    <div style={{ paddingBlock: 'var(--pngds-space-6)' }}>
      <h1 className="pngds-h1">Page not found</h1>
      <p className="pngds-body">If you typed the web address, check it is correct. If you pasted it, check you copied the whole address.</p>
      <p><TextLink as={Link} href="/">Go to the design system home page</TextLink></p>
    </div>
  );
}

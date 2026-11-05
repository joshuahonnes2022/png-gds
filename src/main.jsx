import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { LanguageProvider } from './lib';
import './lib/pngds.css';
import './lib/utilities.css';
import './docs/docs.css';
import App from './App.jsx';

// HashRouter (#/components/button) works on XAMPP/Apache from any folder
// with no .htaccess rewrite rules. See README to switch to BrowserRouter.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
);

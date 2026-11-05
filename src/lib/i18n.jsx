import { createContext, useContext, useEffect, useState } from 'react';

// Built-in component strings in English and Tok Pisin.
// Tok Pisin wording is a first draft — have it reviewed by a DICT
// language/content officer before production use.
export const strings = {
  en: {
    official: 'An official website of the Government of Papua New Guinea',
    howKnow: "Here's how you know",
    govDomainTitle: 'Official websites use .gov.pg',
    govDomain: 'A .gov.pg address means the website belongs to a Papua New Guinea Government department, agency or provincial administration.',
    secureTitle: 'Secure websites use HTTPS',
    secure: 'A padlock or https:// means you are safely connected. Only share personal details on official, secure websites.',
    skip: 'Skip to main content',
    menu: 'Menu',
    close: 'Close',
    search: 'Search',
    errorSummary: 'There is a problem',
    error: 'Error',
    optional: '(optional)',
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    stepOf: (a, b) => `Step ${a} of ${b}`,
    showAll: 'Show all sections',
    hideAll: 'Hide all sections',
    change: 'Change',
    chooseFile: 'Choose file',
    dropHere: 'or drag and drop it here',
    remove: 'Remove',
    breadcrumb: 'Breadcrumb',
    day: 'Day', month: 'Month', year: 'Year',
  },
  tpi: {
    official: 'Em i wanpela ofisal websait bilong Gavman bilong Papua Niugini',
    howKnow: 'Olsem wanem yu save',
    govDomainTitle: 'Ol ofisal websait i yusim .gov.pg',
    govDomain: 'Sapos adres i gat .gov.pg, dispela websait i bilong wanpela dipatmen, ejensi o provins edministresen bilong Gavman bilong PNG.',
    secureTitle: 'Ol sef websait i yusim HTTPS',
    secure: 'Sapos yu lukim lok o https://, yu konek gut. Givim ol pesonal infomesen long ol ofisal na sef websait tasol.',
    skip: 'Go stret long namba wan hap',
    menu: 'Menu',
    close: 'Pasim',
    search: 'Painim',
    errorSummary: 'I gat wanpela hevi',
    error: 'Rong',
    optional: '(sapos yu laik)',
    previous: 'Bipo',
    next: 'Bihain',
    page: 'Pes',
    stepOf: (a, b) => `Step ${a} long ${b}`,
    showAll: 'Soim olgeta hap',
    hideAll: 'Haitim olgeta hap',
    change: 'Senisim',
    chooseFile: 'Makim fail',
    dropHere: 'o pulim na putim long hia',
    remove: 'Rausim',
    breadcrumb: 'Rot bilong pes',
    day: 'De', month: 'Mun', year: 'Yia',
  },
};

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: strings.en });

export function LanguageProvider({ children, defaultLang = 'en' }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('pngds-lang') || defaultLang; } catch { return defaultLang; }
  });
  useEffect(() => {
    try { localStorage.setItem('pngds-lang', lang); } catch { /* storage unavailable */ }
    document.documentElement.lang = lang === 'tpi' ? 'tpi' : 'en';
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t: strings[lang] || strings.en }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

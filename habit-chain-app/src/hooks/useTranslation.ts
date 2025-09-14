import { useState, useEffect } from 'react';
import { SupportedLocale, detectLocale, getRegionalTerm } from '../lib/i18n';
import { translations, Translations } from '../locales/translations';

export function useTranslation() {
  const [locale, setLocale] = useState<SupportedLocale>(() => detectLocale());
  const [t, setT] = useState<Translations>(() => translations[locale]);

  useEffect(() => {
    setT(translations[locale]);
  }, [locale]);

  const changeLocale = (newLocale: SupportedLocale) => {
    setLocale(newLocale);
    localStorage.setItem('preferred-locale', newLocale);
  };

  const getRegionalTermLocalized = (key: keyof typeof import('../lib/i18n').REGIONAL_TERMS) => {
    return getRegionalTerm(key, locale);
  };

  return {
    t,
    locale,
    changeLocale,
    getRegionalTermLocalized
  };
}

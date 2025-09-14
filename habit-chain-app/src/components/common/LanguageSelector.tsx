import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { SUPPORTED_LOCALES, LOCALE_NAMES, SupportedLocale } from '../../lib/i18n';

export default function LanguageSelector() {
  const { locale, changeLocale } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <select
        value={locale}
        onChange={(e) => changeLocale(e.target.value as SupportedLocale)}
        className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
      >
        {SUPPORTED_LOCALES.map((loc) => (
          <option key={loc} value={loc} className="bg-gray-700">
            {LOCALE_NAMES[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}

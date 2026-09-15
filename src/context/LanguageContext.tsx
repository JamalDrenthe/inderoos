import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { DEFAULT_LANGUAGE, isLanguage, LanguageContext, STORAGE_KEY, type Language } from './language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_LANGUAGE;
    }

    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language);
    }

    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

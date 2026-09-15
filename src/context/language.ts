import { createContext } from 'react';

export type Language = 'nl' | 'en' | 'de' | 'fr' | 'es' | 'pl' | 'ar' | 'ru' | 'zh' | 'tr' | 'uk';

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const STORAGE_KEY = 'site-language';
export const DEFAULT_LANGUAGE: Language = 'nl';

export const isLanguage = (value: string | null): value is Language => 
  ['nl', 'en', 'de', 'fr', 'es', 'pl', 'ar', 'ru', 'zh', 'tr', 'uk'].includes(value as string);

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

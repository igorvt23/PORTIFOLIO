// src/context/LanguageContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Language, translations } from '../constants/translations';

type TranslationKey = keyof (typeof translations)['en'];

// Context type
interface LanguageContextData {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

// Create an empty context
const LanguageContext = createContext<LanguageContextData>({} as LanguageContextData);

// Provider that shares the current language state
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  // Returns translated text for the active language, with english fallback.
  function t(key: TranslationKey) {
    return translations[language][key] ?? translations.en[key];
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook used by screens/components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

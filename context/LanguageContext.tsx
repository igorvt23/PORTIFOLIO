// src/context/LanguageContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Language, translations } from '../constants/translations';

// Tipagem do nosso contexto
interface LanguageContextData {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['pt']) => string; // Função mágica que traduz
}

// Cria o contexto vazio
const LanguageContext = createContext<LanguageContextData>({} as LanguageContextData);

// O Provider é quem "abraça" o app para distribuir a informação
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt'); // Começa em Português

  // A função que busca o texto no objeto
  function t(key: keyof typeof translations['pt']) {
    return translations[language][key];
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// O Hook que vamos usar nas telas
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  }
  return context;
}
import React, { createContext, useContext, useState, useEffect } from 'react';

import translations from './translations';

const TranslationContext = createContext();

const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      setLanguage(browserLang);
    }
  }, []);

  const translateBlock = (block) => {
    return block[language] || block['en'];
  };

  const value = {
    language,
    setLanguage,
    translateBlock,
    translation: translations[language] || translations.en, // Default to English if language not supported
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the DataContext
const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};

export { TranslationProvider, useTranslationContext }
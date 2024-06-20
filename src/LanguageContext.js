import React, { createContext, useState, useEffect } from 'react';
import translations from './translations'; // Import the translations

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      setLanguage(browserLang);
    }
  }, []);

  const value = {
    language,
    setLanguage,
    translation: translations[language] || translations.en // Default to English if language not supported
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;

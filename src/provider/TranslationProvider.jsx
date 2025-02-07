/*
Copyright 2024 Caden Klopfenstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the “Software”), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { createContext, useContext, useState, useEffect } from 'react';

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
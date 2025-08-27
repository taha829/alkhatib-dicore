
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (english: string, arabic: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get stored language preference or default to Arabic
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('preferredLanguage');
    return (stored === 'en' || stored === 'ar') ? stored : 'ar';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.body.className = language === 'ar' ? 'rtl font-arabic' : 'ltr';
  }, [language]);

  const t = (english: string, arabic: string): string => {
    return language === 'en' ? english : arabic;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

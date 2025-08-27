
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Set the direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  return (
    <div className={`flex flex-col min-h-screen font-cairo ${language === 'ar' ? 'font-arabic' : ''}`}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default MainLayout;

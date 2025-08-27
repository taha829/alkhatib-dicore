import { Link } from 'react-router-dom';
import { Home, Search, User, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './BottomNav.module.css'; // استيراد الأنماط

const BottomNav = () => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner md:hidden">
      <div className="flex justify-around items-center py-2">
        <Link to="/" className="flex flex-col items-center text-gray-600">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">{t('Home', 'الرئيسية')}</span>
        </Link>

        <Link to="/services" className="flex flex-col items-center text-gray-600">
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">{t('Search', 'بحث')}</span>
        </Link>

        <Link to="/book" className="flex flex-col items-center">
          <div className="bg-orange-500 rounded-full p-3 -mt-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-xs mt-1 text-gray-600">{t('Book', 'حجز')}</span>
        </Link>

        <Link to="/account" className="flex flex-col items-center text-gray-600">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">{t('Account', 'حساب')}</span>
        </Link>

        <Link to="/more" className="flex flex-col items-center text-gray-600">
          <Menu className="h-5 w-5" />
          <span className="text-xs mt-1">{t('More', 'المزيد')}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;

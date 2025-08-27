
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="siteOutline" size="icon" className="relative">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('Switch language', 'تغيير اللغة')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white w-40">
        <DropdownMenuItem 
          className={`${language === 'en' ? 'bg-orange-50 text-orange-500' : ''}`}
          onClick={() => setLanguage('en')}
        >
          <span className="font-medium">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`${language === 'ar' ? 'bg-orange-50 text-orange-500' : ''}`}
          onClick={() => setLanguage('ar')}
        >
          <span className="font-medium">العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;


import { Link } from 'react-router-dom';
import ServiceCategoryCard from '@/components/services/ServiceCategoryCard';
import { serviceCategories } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const ServiceCategories = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="mobile-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">{t('Service Categories', 'فئات الخدمات')}</h2>
          <p className="text-gray-600 mt-1">{t('Browse our wide range of professional services', 'تصفح مجموعتنا الواسعة من الخدمات المهنية')}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {serviceCategories.map(category => (
            <ServiceCategoryCard 
              key={category.id}
              id={category.id}
              name={language === 'ar' ? category.nameAr : category.name}
              image={category.image}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/services">
            <Button 
              variant="siteOutline" 
              className="font-medium"
            >
              {t('View All Service Categories', 'عرض جميع فئات الخدمات')} →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;

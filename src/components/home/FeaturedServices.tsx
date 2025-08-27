
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/services/ServiceCard';
import { services } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturedServices = () => {
  const featuredServices = services.filter(service => service.featured);
  const [visibleServices, setVisibleServices] = useState(4);
  const { t, language } = useLanguage();
  
  const showMore = () => {
    setVisibleServices(prevCount => Math.min(prevCount + 4, featuredServices.length));
  };
  
  return (
    <section className="py-12 md:py-16">
      <div className="mobile-container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{t('Featured Services', 'الخدمات المميزة')}</h2>
            <p className="text-gray-600 mt-1">{t('Our most popular and highly rated services', 'خدماتنا الأكثر شعبية والأعلى تقييمًا')}</p>
          </div>
          <Link to="/services" className="hidden md:inline-block text-orange-500 hover:text-orange-600 font-medium">
            {t('View All', 'عرض الكل')}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.slice(0, visibleServices).map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        
        {visibleServices < featuredServices.length && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={showMore}
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              {t('Load More', 'عرض المزيد')}
            </Button>
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/services">
            <Button className="bg-orange-500 hover:bg-orange-600">
              {t('View All Services', 'عرض جميع الخدمات')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;


import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ServiceCard from '@/components/services/ServiceCard';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { services, serviceCategories } from '@/data/services';
import { Service } from '@/types/service';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('featured');
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);
  
  useEffect(() => {
    let result = [...services];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        service => 
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(service => service.category === selectedCategory);
    }
    
    // Sort results
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredServices(result);
  }, [searchTerm, selectedCategory, sortOption]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the useEffect above
  };
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  return (
    <MainLayout>
  <Seo title="خدماتنا - مؤسسة الخطيب للمقاولات" description="استعرض خدمات المقاولات والهندسة من مؤسسة الخطيب، بما في ذلك الإنشاءات، التشطيب، والكهرباء." />
      <div className="bg-gray-50 py-8">
        <div className="mobile-container">
          <h1 className="text-3xl font-bold mb-6">{t('Our Services', 'خدماتنا')}</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex mb-6">
            <div className="relative flex-grow">
              <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 h-5 w-5 text-gray-400`} />
              <input
                type="text"
                placeholder={t('Search services...', 'بحث عن الخدمات...')}
                className={`w-full ${language === 'ar' ? 'pr-10' : 'pl-10'} py-3 rounded-l-md border border-gray-300 focus:outline-none focus:border-orange-500`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="rounded-l-none bg-orange-500 hover:bg-orange-600 px-6"
            >
              {t('Search', 'بحث')}
            </Button>
          </form>
          
          {/* Category Filters */}
          <div className="mb-6 overflow-x-auto pb-2">
            <div className="flex space-x-2">
              <Button 
                variant={!selectedCategory ? "default" : "outline"}
                className={!selectedCategory ? "bg-orange-500 hover:bg-orange-600" : ""}
                onClick={() => handleCategorySelect(null)}
              >
                {t('All Services', 'جميع الخدمات')}
              </Button>
              {serviceCategories.map(category => (
                <Button 
                  key={category.id}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={selectedCategory === category.name ? "bg-orange-500 hover:bg-orange-600" : ""}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {language === 'en' ? category.name : category.nameAr}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Sort and Filter Controls */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{filteredServices.length}</span> {t('services found', 'خدمة تم العثور عليها')}
            </p>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm mr-2">{t('Sort by:', 'ترتيب حسب:')}</span>
              <select
                className="text-sm border rounded-md p-2 focus:outline-none focus:border-orange-500"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="featured">{t('Featured', 'المميزة')}</option>
                <option value="price-low">{t('Price: Low to High', 'السعر: من الأقل إلى الأعلى')}</option>
                <option value="price-high">{t('Price: High to Low', 'السعر: من الأعلى إلى الأقل')}</option>
                <option value="rating">{t('Highest Rated', 'الأعلى تقييمًا')}</option>
              </select>
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">{t('No services found', 'لم يتم العثور على خدمات')}</h3>
              <p className="text-gray-600 mb-6">{t('Try adjusting your search or filter criteria', 'حاول تعديل معايير البحث أو التصفية')}</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setSortOption('featured');
                }}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {t('Reset Filters', 'إعادة ضبط الفلاتر')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Services;

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, MapPin, Star, Calendar, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import { services } from '@/data/services';
import Seo from '@/components/Seo';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage(); // اللغة الحالية
  const [currentImage, setCurrentImage] = useState(0);

  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <MainLayout>
        <div className="mobile-container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('Service Not Found', 'الخدمة غير موجودة')}</h2>
          <p className="mb-6">{t(
            "The service you're looking for doesn't exist or has been removed.",
            'الخدمة التي تبحث عنها غير موجودة أو تم حذفها.'
          )}</p>
          <Button 
            onClick={() => navigate('/services')}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {t('Browse All Services', 'تصفح جميع الخدمات')}
          </Button>
        </div>
      </MainLayout>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === service.images.length - 1 ? 0 : prev + 1));
  };
  
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? service.images.length - 1 : prev - 1));
  };

  // تحويل النصوص بحسب اللغة
  const getText = (en: string, ar: string) => language === 'ar' ? ar : en;

  return (
    <MainLayout>
      <Seo title={`${getText(service.name, service.nameAr)} - مؤسسة الخطيب للمقاولات`} description={getText(service.description, service.descriptionAr).slice(0, 150)} />

      <div className="bg-gray-50 py-6">
        <div className="mobile-container">
          {/* Breadcrumbs */}
          <div className="text-sm mb-4">
            <a href="/" className="text-gray-500 hover:text-orange-500">{t('Home', 'الرئيسية')}</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="/services" className="text-gray-500 hover:text-orange-500">{t('Services', 'الخدمات')}</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{getText(service.name, service.nameAr)}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Info */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative rounded-lg overflow-hidden mb-6">
                <div className="aspect-video bg-gray-100">
                  <img 
                    src={service.images[currentImage].url} 
                    alt={service.images[currentImage].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {service.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}
              </div>

              {/* Details Tabs */}
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">{t('Details', 'تفاصيل')}</TabsTrigger>
                  <TabsTrigger value="reviews">{t('Reviews', 'التقييمات')}</TabsTrigger>
                  <TabsTrigger value="faq">{t('FAQ', 'الأسئلة الشائعة')}</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{t('About This Service', 'عن هذه الخدمة')}</h3>
                    <p className="text-gray-700">{getText(service.description, service.descriptionAr)}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{t('Service Benefits', 'مزايا الخدمة')}</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        {t('Professional service by certified experts', 'خدمة احترافية من خبراء معتمدين')}
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        {t('Quality materials and latest techniques used', 'استخدام مواد وتقنيات حديثة وعالية الجودة')}
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        {t('Satisfaction guarantee on all work performed', 'ضمان رضا العملاء على جميع الأعمال')}
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        {t('24/7 customer support for any questions', 'دعم العملاء على مدار الساعة لأي استفسارات')}
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6 space-y-4">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < Math.round(service.rating) ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{service.rating.toFixed(1)}</span>
                    <span className="ml-2 text-gray-500">({service.reviewCount} {t('reviews', 'تقييم')})</span>
                  </div>
                  {/* هنا يمكنك إضافة مكونات للتعليقات */}
                </TabsContent>

                <TabsContent value="faq" className="mt-6 space-y-4">
                  <div className="border rounded-lg p-4">{t('No FAQs available', 'لا توجد أسئلة شائعة')}</div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Booking Card */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20 space-y-4">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-xl font-bold">{getText(service.name, service.nameAr)}</h1>
                  <span className="text-2xl font-bold text-orange-500">${service.price}</span>
                </div>

                <Badge variant="outline" className="bg-gray-50">{getText(service.category, service.categoryAr)}</Badge>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{service.executionTimeMin}-{service.executionTimeMax} {t('hours', 'ساعات')}</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">{t('Available in your area', 'متاحة في منطقتك')}</span>
                </div>

                <div className="flex items-center">
                  <Star className="h-4 w-4 text-orange-400 fill-orange-400 mr-2" />
                  <span className="text-sm font-medium">{service.rating} ({service.reviewCount} {t('reviews', 'تقييم')})</span>
                </div>

                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={() => navigate(`/book/${service.slug}`)}
                >
                  {t('Book Now', 'احجز الآن')}
                </Button>

                <Button 
                  variant="outline"
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('View Availability', 'عرض التوفر')}
                </Button>

                <hr className="my-4" />
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• {t('Free cancellation up to 24 hours before', 'إلغاء مجاني حتى 24 ساعة قبل الموعد')}</p>
                  <p>• {t('Only pay 15% deposit today', 'ادفع 15% فقط كدفعة مقدمة')}</p>
                  <p>• {t('100% satisfaction guarantee', 'ضمان رضا كامل')}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;

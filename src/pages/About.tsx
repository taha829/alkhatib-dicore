
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import Seo from '@/components/Seo';

const About = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
  <Seo title="عن مؤسسة الخطيب للمقاولات" description="تعرف على مؤسسة الخطيب، خبرتنا في المقاولات، رسالتنا وقيمنا، وفريق العمل المتخصص لتنفيذ مشاريعك بدقة واحتراف." />
      <div className="bg-white py-12 md:py-20">
        <div className="mobile-container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                  {t('About AlKhatib Co', 'عن مؤسسة الخطيب')}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                    {t(
                      'AlKhatib Co is a professional contracting firm providing comprehensive construction and engineering services for residential and commercial projects.',
                      'مؤسسة الخطيب هي شركة مقاولات وتقدم خدمات هندسية وإنشائية للمشاريع السكنية والتجارية.'
                    )}
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4">
                {t('Our Mission', 'رسالتنا')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t(
                  'Our mission is to simplify the process of finding, booking, and managing professional services. We believe everyone deserves access to reliable service providers who deliver exceptional work.',
                  'مهمتنا هي تبسيط عملية البحث عن الخدمات المهنية وحجزها وإدارتها. نؤمن بأن الجميع يستحق الوصول إلى مزودي خدمات موثوقين يقدمون عملًا استثنائيًا.'
                )}
              </p>
              
              <Separator className="my-8" />
              
              <h2 className="text-2xl font-bold mt-10 mb-4">
                {t('Why Choose Us', 'لماذا تختارنا')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">
                    {t('Verified Professionals', 'متخصصون معتمدون')}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      'All service providers undergo thorough background checks and skill verification before joining our platform.',
                      'يخضع جميع مقدمي الخدمات لعمليات تحقق شاملة من الخلفية والمهارات قبل الانضمام إلى منصتنا.'
                    )}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">
                    {t('Satisfaction Guarantee', 'ضمان الرضا')}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      'We stand behind the quality of our services with a 100% satisfaction guarantee.',
                      'نحن نضمن جودة خدماتنا بنسبة 100% لرضا العملاء.'
                    )}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">
                    {t('Transparent Pricing', 'أسعار شفافة')}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      'Know exactly what you\'ll pay before booking. No hidden fees or surprises.',
                      'اعرف بالضبط ما ستدفعه قبل الحجز. لا توجد رسوم خفية أو مفاجآت.'
                    )}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">
                    {t('24/7 Support', 'دعم على مدار الساعة')}
                  </h3>
                  <p className="text-gray-600">
                    {t(
                      'Our customer service team is available around the clock to assist with any issues or questions.',
                      'فريق خدمة العملاء لدينا متاح على مدار الساعة للمساعدة في أي مشكلات أو استفسارات.'
                    )}
                  </p>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <h2 className="text-2xl font-bold mt-10 mb-4">
                {t('Our Team', 'فريقنا')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t(
                  'We\'re a dedicated team of professionals committed to making service booking simple and stress-free.',
                  'نحن فريق متخصص من المحترفين ملتزمون بجعل حجز الخدمة أمرًا بسيطًا وخاليًا من التوتر.'
                )}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="أحمد حسن - المدير التنفيذي" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold">{t('Ahmed Hassan', 'أحمد حسن')}</h3>
                  <p className="text-gray-600">{t('CEO & Founder', 'المدير التنفيذي والمؤسس')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="سارة جونسون - مديرة العمليات" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold">{t('Sarah Johnson', 'سارة جونسون')}</h3>
                  <p className="text-gray-600">{t('Chief Operations Officer', 'مديرة العمليات')}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/67.jpg" 
                      alt="محمد علي - المدير التقني" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold">{t('Mohammed Ali', 'محمد علي')}</h3>
                  <p className="text-gray-600">{t('Chief Technology Officer', 'المدير التقني')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;

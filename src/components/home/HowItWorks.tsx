
import { ClipboardCheck, Calendar, CreditCard, ThumbsUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorks = () => {
  const { t, language } = useLanguage();

  const steps = [
    {
      icon: ClipboardCheck,
      title: t('Choose a Service', 'اختر خدمة'),
      description: t('Browse through our wide range of professional services and select what you need.', 'تصفح مجموعتنا الواسعة من الخدمات المهنية واختر ما تحتاجه.')
    },
    {
      icon: Calendar,
      title: t('Book an Appointment', 'احجز موعدًا'),
      description: t('Pick a date and time slot that works best for your schedule.', 'حدد تاريخًا ووقتًا يناسب جدولك.')
    },
    {
      icon: CreditCard,
      title: t('Pay Deposit', 'ادفع العربون'),
      description: t('Secure your booking with a small deposit payment through our secure platform.', 'أكّد حجزك من خلال دفع مبلغ صغير كعربون عبر منصتنا الآمنة.')
    },
    {
      icon: ThumbsUp,
      title: t('Get it Done', 'استلم الخدمة'),
      description: t('Our professional will arrive on time and complete the service to your satisfaction.', 'سيصل المتخصص لدينا في الموعد المحدد وسينجز الخدمة بما يرضيك تمامًا.')
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="mobile-container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">{t('How It Works', 'كيف تعمل المنصة')}</h2>
          <p className="text-gray-600 mt-1">{t('Simple steps to get your service needs fulfilled', 'خطوات بسيطة للحصول على الخدمات التي تحتاجها')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-4">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="relative">
                {index < steps.length - 1 && (
                  <div className={`hidden md:block absolute top-0 ${language === 'ar' ? 'right-full' : 'left-full'} w-full h-0.5 bg-gray-200 -translate-y-8`}>
                    <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} -top-1.5 h-3 w-3 bg-gray-200 transform rotate-45`}></div>
                  </div>
                )}
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

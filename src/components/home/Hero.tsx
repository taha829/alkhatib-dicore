import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 🔹 النص مع fallback بدون undefined
  const fullText =
    t(
      'An engineering and construction institution providing integrated services for residential and commercial projects.',
      'مؤسسة مقاولات تقدم خدمات هندسية وإنشائية متكاملة للمشاريع السكنية والتجارية.'
    ) || 'مؤسسة مقاولات تقدم خدمات هندسية وإنشائية متكاملة للمشاريع السكنية والتجارية.';

  const [displayedText, setDisplayedText] = useState('');

  // 🔹 أنيميشن كتابة النص مع تكرار للأبد
  useEffect(() => {
    let index = 0;
    let forward = true; // الكتابة للأمام أو الحذف
    const interval = setInterval(() => {
      if (forward) {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
        } else {
          forward = false; // ابدأ الحذف
        }
      } else {
        if (index > 0) {
          setDisplayedText(fullText.slice(0, index - 1));
          index--;
        } else {
          forward = true; // ابدأ الكتابة مرة ثانية
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="relative h-[500px] md:h-[600px] text-white overflow-hidden">
      {/* خلفية */}
<img
  src="/images/hero-construction.jpg"
  alt={t('Construction work', 'أعمال الإنشاء') || 'أعمال الإنشاء'}
  className="absolute inset-0 w-full h-full object-contain bg-white z-0"
  style={{ imageRendering: 'pixelated' }}
/>


      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* المحتوى */}
      <div className="relative z-20 mobile-container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-orange-500">مؤسسة</span>{" "}
            <span className="text-gray-100">الخطيب</span>
          </h1>

          {/* وصف مع أنيميشن */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 min-h-[60px]">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* الأزرار */}
          <div className="flex justify-center gap-4">
            {/* زر رؤية المزيد */}
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg"
              onClick={() => navigate('/services')}
            >
              {t('See More', 'رؤية المزيد')}
            </Button>

            {/* زر الاتصال */}
            <Button
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg text-lg flex items-center gap-2"
              onClick={() => window.open('https://wa.me/962700000000', '_blank')}
            >
              <Phone className="w-5 h-5" />
              {t('Contact', 'اتصال')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

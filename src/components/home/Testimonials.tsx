import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      id: '1',
      name: t('Sarah Johnson', 'سارة جونسون'),
      service: t('Electrical Installation', 'التركيبات الكهربائية'),
      image: '/placeholder.svg?height=80&width=80',
      rating: 5,
      comment: t(
        'The electrician was professional and completed the installation quickly. He explained everything and cleaned up afterward. Highly recommended!',
        'كان الكهربائي محترفًا وأنجز التركيبات بسرعة. شرح لي كل شيء ونظف المكان بعد الانتهاء. أنصح بالتعامل معه بشدة!'
      )
    },
    {
      id: '2',
      name: t('Michael Chen', 'مايكل تشن'),
      service: t('Plumbing Repair', 'إصلاح السباكة'),
      image: '/placeholder.svg?height=80&width=80',
      rating: 4,
      comment: t(
        'Responded quickly to our emergency call and fixed the leak efficiently. Fair pricing and good communication throughout.',
        'استجاب بسرعة لمكالمة الطوارئ وأصلح التسرب بكفاءة عالية. سعر منصف وتواصل جيد طوال فترة العمل.'
      )
    },
    {
      id: '3',
      name: t('Emma Rodriguez', 'إيما رودريغيز'),
      service: t('Interior Painting', 'طلاء داخلي'),
      image: '/placeholder.svg?height=80&width=80',
      rating: 5,
      comment: t(
        'The painters did an amazing job! They were detail-oriented and the finish looks perfect. They worked efficiently and were very respectful of our home.',
        'قام الدهانون بعمل رائع! كانوا مهتمين بالتفاصيل والنتيجة النهائية مثالية. عملوا بكفاءة واحترموا منزلنا كثيرًا.'
      )
    },
    {
      id: '4',
      name: t('David Wilson', 'ديفيد ويلسون'),
      service: t('3D Engineering Design', 'تصميم هندسي ثلاثي الأبعاد'),
      image: '/placeholder.svg?height=80&width=80',
      rating: 5,
      comment: t(
        'Their 3D design work exceeded my expectations. The designer understood my requirements perfectly and delivered a model that was both functional and aesthetically pleasing.',
        'تجاوز عملهم في التصميم ثلاثي الأبعاد توقعاتي. فهم المصمم متطلباتي بشكل مثالي وقدم نموذجًا عمليًا وجميلًا من الناحية الجمالية.'
      )
    }
  ];

  // تغيير تلقائي للشرائح كل 5 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <section className="py-12 md:py-16 bg-orange-50">
      <div className="mobile-container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">{t('What Our Clients Say', 'ماذا يقول عملاؤنا')}</h2>
          <p className="text-gray-600 mt-1">{t('Real reviews from satisfied customers', 'آراء حقيقية من عملاء راضين')}</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-4 overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <h3 className="font-medium text-lg mb-1">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{testimonial.service}</p>
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 italic leading-relaxed">"{testimonial.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === idx ? 'bg-orange-500 w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-6 space-x-4 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 hover:bg-white border-gray-300 rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/80 hover:bg-white border-gray-300 rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white border-gray-300 rounded-full hidden md:flex"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white border-gray-300 rounded-full hidden md:flex"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
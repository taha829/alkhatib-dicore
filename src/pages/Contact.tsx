
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Seo from '@/components/Seo';

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t("Message Sent!", "تم إرسال الرسالة!"),
        description: t(
          "We've received your message and will get back to you soon.",
          "لقد استلمنا رسالتك وسنرد عليك قريبًا."
        ),
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <MainLayout>
  <Seo title="اتصل بمؤسسة الخطيب للمقاولات" description="تواصل مع مؤسسة الخطيب للمقاولات لطلب عرض سعر أو استفسار عن خدمات المقاولات والهندسة المتكاملة." />
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="mobile-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            {t('Contact Us', 'اتصل بنا')}
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                {t('Get In Touch', 'تواصل معنا')}
              </h2>
              
              <div className="space-y-6">
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <MapPin className={`h-6 w-6 text-orange-500 mt-1 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className="font-medium">
                      {t('Our Location', 'موقعنا')}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {t('123 Service Street, City Name, Country', '123 شارع الخدمات، المدينة، البلد')}
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <Phone className={`h-6 w-6 text-orange-500 mt-1 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className="font-medium">
                      {t('Phone Number', 'رقم الهاتف')}
                    </h3>
                    <p className="text-gray-600 mt-1" dir="ltr">+1 234 567 890</p>
                  </div>
                </div>
                
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <Mail className={`h-6 w-6 text-orange-500 mt-1 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className="font-medium">
                      {t('Email Address', 'البريد الإلكتروني')}
                    </h3>
                    <p className="text-gray-600 mt-1" dir="ltr">info@alkhatib-co.com</p>
                  </div>
                </div>
                
                <div className={`flex items-start ${language === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <Clock className={`h-6 w-6 text-orange-500 mt-1 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <div>
                    <h3 className="font-medium">
                      {t('Working Hours', 'ساعات العمل')}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {t('Monday - Friday: 9:00 AM - 6:00 PM', 'الاثنين - الجمعة: 9:00 صباحًا - 6:00 مساءً')}
                    </p>
                    <p className="text-gray-600">
                      {t('Saturday: 10:00 AM - 4:00 PM', 'السبت: 10:00 صباحًا - 4:00 مساءً')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  {t('Follow Us', 'تابعنا')}
                </h2>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-200 hover:bg-orange-100 p-3 rounded-full transition duration-300">
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-orange-100 p-3 rounded-full transition duration-300">
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-gray-200 hover:bg-orange-100 p-3 rounded-full transition duration-300">
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                {t('Send Us a Message', 'أرسل لنا رسالة')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Your Name', 'الاسم')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('Enter your full name', 'أدخل اسمك الكامل')}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Email Address', 'البريد الإلكتروني')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('Enter your email address', 'أدخل بريدك الإلكتروني')}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Subject', 'الموضوع')}
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('Enter subject', 'أدخل الموضوع')}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Message', 'الرسالة')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('Enter your message here...', 'أدخل رسالتك هنا...')}
                    rows={5}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 
                    t('Sending...', 'جاري الإرسال...') : 
                    t('Send Message', 'إرسال الرسالة')}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">
              {t('Our Location', 'موقعنا')}
            </h2>
            <div className="h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                title="Service Hub Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sbg!4v1579767901424!5m2!1sen!2sbg"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;

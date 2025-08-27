import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 py-10 md:py-16 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-right">

          {/* معلومات الشركة مع الشعار */}
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="flex items-center justify-end space-x-4 space-x-reverse">
              <img src="/images/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
              <span className="text-2xl font-bold text-orange-500 whitespace-nowrap">
                مؤسسة الخطيب <span className="text-slate-700">للمقاولات</span>
              </span>
            </Link>
            <p className="text-m text-gray-600 max-w-xs">
              شركة مقاولات وخدمات هندسية محترفة تقدم حلولاً متكاملة للمشاريع السكنية والتجارية.
            </p>
            <div className="flex justify-end space-x-4 space-x-reverse">
              <a href="https://web.facebook.com/profile.php?id=61577784602222&locale=ar_AR" className="text-orange-500 hover:text-orange-600"><Facebook size={24} /></a>
              <a href="https://www.instagram.com/moaad2008a/?fbclid=IwY2xjawMbdCJleHRuA2FlbQIxMABicmlkETFjSms3bmtKN0dMT0JNdmRuAR6FMVIHVf4GuBKDIweWgyukLL9mYlUtvuiSXZqTj5Xw20OtbPWZfqmC6D3RaQ_aem_vuIDzn19CimgHphbMD_UZQ#" className="text-orange-500 hover:text-orange-600"><Instagram size={24} /></a>
              <a href="#" className="text-orange-500 hover:text-orange-600"><Twitter size={24} /></a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="flex flex-col items-end">
            <h3 className="font-medium text-lg mb-4">{t("Quick Links", "روابط سريعة")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-gray-600 hover:text-orange-500">{t("All Services", "جميع الخدمات")}</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-orange-500">{t("How It Works", "كيف تعمل")}</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-orange-500">{t("Pricing", "التسعير")}</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-orange-500">{t("FAQ", "الأسئلة الشائعة")}</Link></li>
            </ul>
          </div>

          {/* معلومات الاتصال */}
          <div className="flex flex-col items-end">
            <h3 className="font-medium text-lg mb-4">{t("Contact", "تواصل معنا")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start justify-end">
                <MapPin size={16} className="ml-2 mt-0.5 text-orange-500" />
                شارع عدن المدينة، عمان
              </li>
              <li className="flex items-center justify-end">
                <Phone size={16} className="ml-2 text-orange-500" />
                0782633162
              </li>
              <li className="flex items-center justify-end">
                <Mail size={16} className="ml-2 text-orange-500" />
                info@alkhatib-co.com
              </li>
            </ul>
          </div>

          {/* النشرة البريدية */}
          <div className="flex flex-col items-end">
            <h3 className="font-medium text-lg mb-4">{t("Newsletter", "النشرة البريدية")}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t("Subscribe to receive updates on new services and promotions.", "اشترك لتصلك تحديثات حول الخدمات والعروض الجديدة.")}
            </p>
            <div className="flex flex-col space-y-2 w-full max-w-xs">
              <input
                type="email"
                placeholder={t("Your email address", "بريدك الإلكتروني")}
                className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-right w-full"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 w-full">{t("Subscribe", "اشترك")}</Button>
            </div>
          </div>

        </div>

        {/* أسفل الفوتر */}
<div className="border-t mt-10 pt-6 text-sm text-center text-gray-500">
  <span className="text-orange-500 font-semibold">
    تم برمجة الموقع بواسطة المهندس طه الخطيب
  </span>
  <br />
  &copy; {new Date().getFullYear()} مؤسسة الخطيب للمقاولات. جميع الحقوق محفوظة.
</div>

      </div>
    </footer>
  );
};

export default Footer;

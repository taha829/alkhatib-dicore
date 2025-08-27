import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react"; // أيقونة السهم

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* شعار واسم المؤسسة */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in">
        <img
          src="/favicon.ico"
          alt="شعار المؤسسة"
          className="w-16 h-16 object-contain"
        />
        <h1 className="text-2xl font-bold text-orange-500">
          مؤسسة الخطيب للمقاولات
        </h1>
      </div>

      {/* الرسالة */}
      <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-bounce">
        هذه الخدمة ليست متوفرة الآن
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        ستتوفر قريباً، شكراً لصبركم ❤️
      </p>

      {/* زر الرجوع */}
      <a
        href="/"
        className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg 
                   hover:bg-orange-600 transition-all duration-300 animate-pulse"
      >
        <ArrowLeft className="w-5 h-5" />
        الرجوع للصفحة الرئيسية
      </a>
    </div>
  );
};

export default NotFound;

// src/pages/Book.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { services } from "@/data/services";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const BookingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = useMemo(() => services.find(s => s.slug === slug), [slug]);

  if (!service) {
    return (
      <MainLayout>
        <div className="mobile-container py-16 text-center" dir="rtl">
          <h2 className="text-2xl font-bold mb-4">الخدمة غير موجودة</h2>
          <p className="mb-6">الخدمة التي تبحث عنها غير موجودة أو تم حذفها.</p>
          <Button onClick={() => navigate("/services")} className="bg-orange-500 hover:bg-orange-600">
            تصفح جميع الخدمات
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // هنا تقدر ترسل البيانات للسيرفر عبر fetch/axios
    alert("تم استلام طلب الحجز 👍");
    navigate(`/services/${service.slug}`);
  };

  return (
    <MainLayout>
      <Seo
        title={`حجز ${service.nameAr} - مؤسسة الخطيب للمقاولات`}
        description={`احجز خدمة ${service.nameAr} بسهولة`}
      />
      <div className="bg-gray-50 py-6" dir="rtl">
        <div className="mobile-container">
          {/* فتات التصفح */}
          <div className="text-sm mb-6">
            <Link to="/" className="text-gray-500 hover:text-orange-500">الرئيسية</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/services" className="text-gray-500 hover:text-orange-500">الخدمات</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/services/${service.slug}`} className="text-gray-500 hover:text-orange-500">{service.nameAr}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">الحجز</span>
          </div>

          {/* عنوان + نبذة */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">حجز: {service.nameAr}</h1>
            <p className="text-gray-700">{service.shortDescriptionAr || service.descriptionAr}</p>
          </div>

          {/* نموذج الحجز */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg bg-white p-6 rounded-lg shadow-sm border">
            <div>
              <label className="block mb-1 font-medium">اسمك</label>
              <input name="name" type="text" className="w-full border p-2 rounded" placeholder="اكتب اسمك" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">البريد الإلكتروني</label>
              <input name="email" type="email" className="w-full border p-2 rounded" placeholder="example@mail.com" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">رقم الجوال</label>
              <input name="phone" type="tel" className="w-full border p-2 rounded" placeholder="05xxxxxxxx" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">التاريخ المفضل</label>
              <input name="date" type="date" className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">ملاحظات إضافية (اختياري)</label>
              <textarea name="notes" className="w-full border p-2 rounded" rows={3} placeholder="اكتب أي تفاصيل تهمك..." />
            </div>

            {/* ملخص الخدمة المحجوزة */}
            <div className="bg-gray-50 border rounded p-4 text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">الخدمة</span>
                <span>{service.nameAr}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">الفئة</span>
                <span>{service.categoryAr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">السعر التقديري</span>
                <span>{service.price} $</span>
              </div>
            </div>

            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full">
              تأكيد الحجز
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingPage;

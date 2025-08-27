import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  User,
  Phone,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  Wrench,
  Info,
  PhoneCall,
  Paintbrush,
  Lightbulb,
  Droplet,
  Hammer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const services = [
  { title: "أعمال الصيانة", icon: <Wrench className="h-5 w-5 text-orange-500" /> },
  { title: "دهانات وتشطيبات", icon: <Paintbrush className="h-5 w-5 text-orange-500" /> },
  { title: "أعمال الكهرباء", icon: <Lightbulb className="h-5 w-5 text-orange-500" /> },
  { title: "أعمال السباكة", icon: <Droplet className="h-5 w-5 text-orange-500" /> },
  { title: "ترميم وبناء", icon: <Hammer className="h-5 w-5 text-orange-500" /> },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-100 shadow-md border-b">
      {/* ====== الشريط الأول ====== */}
<div className="bg-white py-2 px-4 flex items-center justify-between shadow-sm">
  {/* اسم المؤسسة */}
  <div className="flex flex-col">
    <span
      className="text-lg font-bold"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      <span className="text-orange-500">مؤسسة</span>{" "}
      <span className="text-gray-700">الخطيب</span>
    </span>
    <span className="text-sm text-gray-500">للمقاولات والديكور   وصيانة المباني</span>
  </div>

  {/* أيقونة البيت */}
<img src="/images/logo.png" alt="Logo" className="h-16 w-16 object-contain" />
</div>




      {/* ====== الشريط الثاني ====== */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* زر الهامبرغر */}
        <Button variant="ghost" size="icon"            
           className=" text-orange-500 hover:bg-orange-50"
 onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="flex items-center gap-3">
          <a href="tel:+962782633162">
            <Button
              variant="outline"
              size="icon"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <Phone className="h-5 w-5" />
            </Button>
          </a>

          <LanguageSwitcher />

          {isLoggedIn ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                تسجيل
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* ====== قائمة الهامبرغر ====== */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-50 p-4 space-y-4"
          >
            {/* إغلاق */}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>

            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <Home className="h-5 w-5 text-orange-500" />
              الرئيسية
            </Link>

            {/* قائمة الخدمات */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-orange-500"
              >
                <div className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-orange-500" />
                  الخدمات
                </div>
                {servicesOpen ? <ChevronUp /> : <ChevronDown />}
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-4 space-y-2"
                  >
                    {services.map((service, idx) => (
                      <Link
                        key={idx}
                        to={`/services/${idx}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-orange-500"
                      >
                        {service.icon}
                        {service.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/about" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <Info className="h-5 w-5 text-orange-500" />
              من نحن
            </Link>

            <Link to="/contact" className="flex items-center gap-2 text-gray-700 hover:text-orange-500">
              <PhoneCall className="h-5 w-5 text-orange-500" />
              تواصل معنا
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

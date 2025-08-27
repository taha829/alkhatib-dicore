import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BookingPage from "@/pages/Book"; // ✅ هذا صحيح
import AccountPage from "./pages/account/Index";
import WhatsappFloatingButton from './components/WhatsappFloatingButton';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
           {/* ✅ مسارات صفحة الحجز الصحيحة */}
  <Route path="/book" element={<BookingPage />} />
  <Route path="/book/:slug" element={<BookingPage />} />
            <Route path="/account/*" element={<AccountPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
             <WhatsappFloatingButton /> {/* الزر العائم */}

        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

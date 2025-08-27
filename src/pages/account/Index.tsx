
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User,
  Clock,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Star,
  MessageSquare,
} from 'lucide-react';

import AccountProfile from '@/components/account/AccountProfile';
import AccountBookings from '@/components/account/AccountBookings';
import AccountPayments from '@/components/account/AccountPayments';
import AccountInvoices from '@/components/account/AccountInvoices';
import AccountSettings from '@/components/account/AccountSettings';
import AccountReviews from '@/components/account/AccountReviews';
import AccountMessages from '@/components/account/AccountMessages';

const AccountPage = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Extract tab from URL if present
  useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  });
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const tabs = [
    { id: 'profile', label: t('Profile', 'الملف الشخصي'), icon: User },
    { id: 'bookings', label: t('My Bookings', 'حجوزاتي'), icon: Clock },
    { id: 'payments', label: t('Payments', 'المدفوعات'), icon: CreditCard },
    { id: 'invoices', label: t('Invoices', 'الفواتير'), icon: FileText },
    { id: 'reviews', label: t('My Reviews', 'تقييماتي'), icon: Star },
    { id: 'messages', label: t('Messages', 'الرسائل'), icon: MessageSquare },
    { id: 'settings', label: t('Settings', 'الإعدادات'), icon: Settings },
  ];

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="mobile-container">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            {t('My Account', 'حسابي')}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar for Desktop */}
            <div className="hidden md:block">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-xl font-medium text-orange-600">JD</span>
                  </div>
                  <div>
                    <h2 className="font-medium">John Doe</h2>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.id}
                      to={`/account?tab=${tab.id}`}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                        activeTab === tab.id
                          ? "bg-orange-50 text-orange-600 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => handleTabChange(tab.id)}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </Link>
                  ))}
                  
                  <Link
                    to="/auth/logout"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>{t('Logout', 'تسجيل الخروج')}</span>
                  </Link>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Mobile Tabs */}
              <div className="md:hidden mb-6">
                <TabsList className="grid grid-cols-4 w-full h-auto">
                  <TabsTrigger value="profile" onClick={() => handleTabChange("profile")}>
                    <div className="flex flex-col items-center py-1">
                      <User className="h-5 w-5" />
                      <span className="text-xs mt-1">{t('Profile', 'الملف')}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="bookings" onClick={() => handleTabChange("bookings")}>
                    <div className="flex flex-col items-center py-1">
                      <Clock className="h-5 w-5" />
                      <span className="text-xs mt-1">{t('Bookings', 'الحجوزات')}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="payments" onClick={() => handleTabChange("payments")}>
                    <div className="flex flex-col items-center py-1">
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs mt-1">{t('Payments', 'المدفوعات')}</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="more" onClick={() => handleTabChange("more")}>
                    <div className="flex flex-col items-center py-1">
                      <Settings className="h-5 w-5" />
                      <span className="text-xs mt-1">{t('More', 'المزيد')}</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Tab Content */}
              <div className="bg-white rounded-lg shadow-sm">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsContent value="profile">
                    <AccountProfile />
                  </TabsContent>
                  <TabsContent value="bookings">
                    <AccountBookings />
                  </TabsContent>
                  <TabsContent value="payments">
                    <AccountPayments />
                  </TabsContent>
                  <TabsContent value="invoices">
                    <AccountInvoices />
                  </TabsContent>
                  <TabsContent value="reviews">
                    <AccountReviews />
                  </TabsContent>
                  <TabsContent value="messages">
                    <AccountMessages />
                  </TabsContent>
                  <TabsContent value="settings">
                    <AccountSettings />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;

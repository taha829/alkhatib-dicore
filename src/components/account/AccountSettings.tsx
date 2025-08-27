
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/components/ui/use-toast";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const AccountSettings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketing: true,
    serviceUpdates: true,
    offers: true,
    newsletter: false
  });
  
  const handleToggleChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSaveSettings = () => {
    toast({
      title: t("Settings Updated", "تم تحديث الإعدادات"),
      description: t(
        "Your account settings have been saved successfully.",
        "تم حفظ إعدادات حسابك بنجاح."
      ),
    });
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('Account Settings', 'إعدادات الحساب')}
        </h2>
      </div>
      
      <div className="space-y-8">
        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            {t('Notification Settings', 'إعدادات الإشعارات')}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">
                  {t('Email Notifications', 'إشعارات البريد الإلكتروني')}
                </Label>
                <p className="text-sm text-gray-500">
                  {t(
                    'Receive booking confirmations and updates via email',
                    'تلقي تأكيدات وتحديثات الحجز عبر البريد الإلكتروني'
                  )}
                </p>
              </div>
              <Switch 
                id="emailNotifications"
                checked={settings.emailNotifications} 
                onCheckedChange={(checked) => handleToggleChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications" className="font-medium">
                  {t('SMS Notifications', 'إشعارات الرسائل القصيرة')}
                </Label>
                <p className="text-sm text-gray-500">
                  {t(
                    'Receive booking confirmations and updates via SMS',
                    'تلقي تأكيدات وتحديثات الحجز عبر الرسائل القصيرة'
                  )}
                </p>
              </div>
              <Switch 
                id="smsNotifications"
                checked={settings.smsNotifications} 
                onCheckedChange={(checked) => handleToggleChange('smsNotifications', checked)}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Marketing Preferences */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            {t('Marketing Preferences', 'تفضيلات التسويق')}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing" className="font-medium">
                  {t('Marketing Communications', 'اتصالات تسويقية')}
                </Label>
                <p className="text-sm text-gray-500">
                  {t(
                    'Receive marketing messages from us',
                    'تلقي رسائل تسويقية منا'
                  )}
                </p>
              </div>
              <Switch 
                id="marketing"
                checked={settings.marketing} 
                onCheckedChange={(checked) => handleToggleChange('marketing', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="serviceUpdates" className="font-medium">
                  {t('Service Updates', 'تحديثات الخدمة')}
                </Label>
                <p className="text-sm text-gray-500">
                  {t(
                    'Receive updates about new services and features',
                    'تلقي تحديثات حول الخدمات والميزات الجديدة'
                  )}
                </p>
              </div>
              <Switch 
                id="serviceUpdates"
                checked={settings.serviceUpdates} 
                onCheckedChange={(checked) => handleToggleChange('serviceUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="offers" className="font-medium">
                  {t('Offers and Discounts', 'العروض والخصومات')}
                </Label>
                <p className="text-sm text-gray-500">
                  {t(
                    'Receive exclusive offers and discounts',
                    'تلقي عروض وخصومات حصرية'
                  )}
                </p>
              </div>
              <Switch 
                id="offers"
                checked={settings.offers} 
                onCheckedChange={(checked) => handleToggleChange('offers', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletter" className="font-medium">
                  {t('Newsletter', 'النشرة الإخبارية')}
                </Label>
                <p className="text-sm text-gray-500">
                  {t(
                    'Subscribe to our monthly newsletter',
                    'الاشتراك في نشرتنا الإخبارية الشهرية'
                  )}
                </p>
              </div>
              <Switch 
                id="newsletter"
                checked={settings.newsletter} 
                onCheckedChange={(checked) => handleToggleChange('newsletter', checked)}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Privacy and Security */}
        <div>
          <h3 className="text-lg font-medium mb-4">
            {t('Privacy and Security', 'الخصوصية والأمان')}
          </h3>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              {t('Change Password', 'تغيير كلمة المرور')}
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              {t('Two-factor Authentication', 'المصادقة ذات العاملين')}
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              {t('Manage Connected Accounts', 'إدارة الحسابات المرتبطة')}
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
              {t('Delete Account', 'حذف الحساب')}
            </Button>
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handleSaveSettings}
            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600"
          >
            {t('Save Settings', 'حفظ الإعدادات')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;


import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";

const AccountProfile = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    address: '123 Main Street',
    city: 'New York',
    postalCode: '10001',
    country: 'United States'
  });
  
  const [formData, setFormData] = useState({...profile});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate profile update
    setTimeout(() => {
      setProfile(formData);
      setIsEditing(false);
      setIsSubmitting(false);
      
      toast({
        title: t("Profile Updated!", "تم تحديث الملف الشخصي!"),
        description: t("Your profile information has been updated successfully.", "تم تحديث معلومات ملفك الشخصي بنجاح."),
      });
    }, 1000);
  };
  
  const handleCancel = () => {
    setFormData({...profile});
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('My Profile', 'ملفي الشخصي')}
        </h2>
        {!isEditing && (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
          >
            {t('Edit Profile', 'تعديل الملف')}
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                {t('First Name', 'الاسم الأول')}
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                {t('Last Name', 'اللقب')}
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t('Email', 'البريد الإلكتروني')}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                {t('Phone', 'الهاتف')}
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              {t('Address', 'العنوان')}
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                {t('City', 'المدينة')}
              </label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                {t('Postal Code', 'الرمز البريدي')}
              </label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-1">
                {t('Country', 'البلد')}
              </label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              {t('Cancel', 'إلغاء')}
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 
                t('Saving...', 'جار الحفظ...') : 
                t('Save Changes', 'حفظ التغييرات')}
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('Full Name', 'الاسم الكامل')}</p>
            <p className="font-medium">{profile.firstName} {profile.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('Email', 'البريد الإلكتروني')}</p>
            <p className="font-medium">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('Phone Number', 'رقم الهاتف')}</p>
            <p className="font-medium">{profile.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('Address', 'العنوان')}</p>
            <p className="font-medium">{profile.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('City', 'المدينة')}</p>
            <p className="font-medium">{profile.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('Postal Code', 'الرمز البريدي')}</p>
            <p className="font-medium">{profile.postalCode}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('Country', 'البلد')}</p>
            <p className="font-medium">{profile.country}</p>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="font-medium mb-2">
          {t('Account Security', 'أمان الحساب')}
        </h3>
        <Button variant="outline">
          {t('Change Password', 'تغيير كلمة المرور')}
        </Button>
      </div>
    </div>
  );
};

export default AccountProfile;

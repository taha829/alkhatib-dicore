
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, 
} from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import MainLayout from '@/components/layout/MainLayout';

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Check password match if changing password or confirm password
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password' && value !== formData.confirmPassword && formData.confirmPassword) {
        setPasswordError(t('Passwords do not match', 'كلمات المرور غير متطابقة'));
      } else if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError(t('Passwords do not match', 'كلمات المرور غير متطابقة'));
      } else {
        setPasswordError(null);
      }
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(t('Passwords do not match', 'كلمات المرور غير متطابقة'));
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate registration process
    setTimeout(() => {
      toast({
        title: t("Registration Successful!", "تم التسجيل بنجاح!"),
        description: t("Your account has been created. Welcome to AlKhatib Co!", "تم إنشاء حسابك. مرحبًا بك في مؤسسة الخطيب!"),
      });
      navigate('/auth/login');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="mobile-container max-w-md mx-auto">
          <Card className="border-0 shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {t('Create an Account', 'إنشاء حساب')}
              </CardTitle>
              <CardDescription className="text-center">
                {t(
                  'Enter your details to create your AlKhatib account',
                  'أدخل بياناتك لإنشاء حساب مؤسسة الخطيب'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      {t('First Name', 'الاسم الأول')}
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder={t('John', 'أحمد')}
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      {t('Last Name', 'اللقب')}
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder={t('Doe', 'محمد')}
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('Email', 'البريد الإلكتروني')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('name@example.com', 'name@example.com')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    {t('Password', 'كلمة المرور')}
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('Create a password', 'أنشئ كلمة مرور')}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    {t(
                      'Password must be at least 8 characters long',
                      'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
                    )}
                  </p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    {t('Confirm Password', 'تأكيد كلمة المرور')}
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t('Confirm your password', 'تأكيد كلمة المرور')}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-xs text-red-500">{passwordError}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t(
                      'I agree to the Terms of Service and Privacy Policy',
                      'أوافق على شروط الخدمة وسياسة الخصوصية'
                    )}
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={isSubmitting || !formData.agreeTerms}
                >
                  {isSubmitting ? 
                    t('Creating account...', 'جار إنشاء الحساب...') : 
                    t('Register', 'تسجيل')}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">
                    {t('Or register with', 'أو سجل باستخدام')}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-center">
                {t("Already have an account?", "لديك حساب بالفعل؟")}{" "}
                <Link to="/auth/login" className="text-orange-500 hover:text-orange-600 font-medium">
                  {t("Login", "تسجيل الدخول")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;


import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  serviceName: string;
}

// Sample payments data
const samplePayments: Payment[] = [
  {
    id: 'PAY-1234',
    date: '2023-10-15',
    amount: 18.00,
    method: 'Credit Card',
    status: 'completed',
    serviceName: 'Electrical Repair (Deposit)'
  },
  {
    id: 'PAY-1235',
    date: '2023-09-22',
    amount: 12.00,
    method: 'PayPal',
    status: 'completed',
    serviceName: 'Home Cleaning (Deposit)'
  },
  {
    id: 'PAY-1236',
    date: '2023-09-22',
    amount: 68.00,
    method: 'Cash',
    status: 'completed',
    serviceName: 'Home Cleaning (Balance)'
  },
  {
    id: 'PAY-1237',
    date: '2023-10-10',
    amount: 22.50,
    method: 'Credit Card',
    status: 'pending',
    serviceName: 'Plumbing Service (Deposit)'
  }
];

const AccountPayments = () => {
  const { t } = useLanguage();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const statusBadgeColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const statusTranslation = (status: string) => {
    switch(status) {
      case 'completed': return t('Completed', 'مكتمل');
      case 'pending': return t('Pending', 'قيد الانتظار');
      case 'failed': return t('Failed', 'فشل');
      default: return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('Payment History', 'سجل المدفوعات')}
        </h2>
        <Button variant="outline">
          {t('Download Summary', 'تنزيل الملخص')}
        </Button>
      </div>
      
      <div className="space-y-4">
        {samplePayments.map(payment => (
          <div 
            key={payment.id} 
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="mb-4 md:mb-0">
              <h3 className="font-medium">{payment.serviceName}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <p>{formatDate(payment.date)} | {t('Payment ID', 'معرف الدفع')}: {payment.id}</p>
                <p className="mt-1">{t('Method', 'طريقة الدفع')}: {payment.method}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">${payment.amount.toFixed(2)}</span>
                <Badge className={`${statusBadgeColor(payment.status)} border-0`}>
                  {statusTranslation(payment.status)}
                </Badge>
              </div>
              
              <Button variant="outline" size="sm">
                {t('View Receipt', 'عرض الإيصال')}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Payment Methods Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          {t('Payment Methods', 'طرق الدفع')}
        </h2>
        
        <div className="space-y-3">
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-blue-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 4V20H22V4H2ZM20 18H4V12H20V18ZM20 10H4V6H20V10Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Visa •••• 4242</p>
                <p className="text-sm text-gray-600">{t('Expires', 'تنتهي في')} 12/25</p>
              </div>
            </div>
            <Badge>
              {t('Default', 'الافتراضي')}
            </Badge>
          </div>
          
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-red-100 rounded flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-red-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM12 11C9.24 11 7 8.76 7 6H9C9 7.7 10.3 9 12 9C13.7 9 15 7.7 15 6H17C17 8.76 14.76 11 12 11Z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">PayPal</p>
                <p className="text-sm text-gray-600">user@example.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {t('Remove', 'إزالة')}
            </Button>
          </div>
        </div>
        
        <Button className="mt-4" variant="outline">
          {t('Add Payment Method', 'إضافة طريقة دفع')}
        </Button>
      </div>
    </div>
  );
};

export default AccountPayments;

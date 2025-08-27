
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  serviceName: string;
}

// Sample invoices data
const sampleInvoices: Invoice[] = [
  {
    id: 'INV-1234',
    date: '2023-10-15',
    dueDate: '2023-10-30',
    amount: 120.00,
    status: 'pending',
    serviceName: 'Electrical Repair'
  },
  {
    id: 'INV-1235',
    date: '2023-09-22',
    dueDate: '2023-09-28',
    amount: 80.00,
    status: 'paid',
    serviceName: 'Home Cleaning'
  },
  {
    id: 'INV-1236',
    date: '2023-08-15',
    dueDate: '2023-08-30',
    amount: 200.00,
    status: 'overdue',
    serviceName: '3D Engineering Design'
  }
];

const AccountInvoices = () => {
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
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const statusTranslation = (status: string) => {
    switch(status) {
      case 'paid': return t('Paid', 'مدفوع');
      case 'pending': return t('Pending', 'قيد الانتظار');
      case 'overdue': return t('Overdue', 'متأخر');
      default: return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('Invoices', 'الفواتير')}
        </h2>
      </div>
      
      <div className="space-y-4">
        {sampleInvoices.map(invoice => (
          <div 
            key={invoice.id} 
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
          >
            <div className="mb-4 md:mb-0">
              <h3 className="font-medium">{invoice.serviceName}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <p>{t('Invoice ID', 'رقم الفاتورة')}: {invoice.id}</p>
                <p className="mt-1">
                  {t('Date', 'التاريخ')}: {formatDate(invoice.date)} | 
                  {t('Due Date', 'تاريخ الاستحقاق')}: {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                <Badge className={`${statusBadgeColor(invoice.status)} border-0`}>
                  {statusTranslation(invoice.status)}
                </Badge>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="flex-1 md:flex-initial">
                  {t('View', 'عرض')}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 md:flex-initial flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  {t('Download', 'تنزيل')}
                </Button>
                {invoice.status !== 'paid' && (
                  <Button 
                    className="flex-1 md:flex-initial bg-orange-500 hover:bg-orange-600"
                    size="sm"
                  >
                    {t('Pay Now', 'ادفع الآن')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountInvoices;

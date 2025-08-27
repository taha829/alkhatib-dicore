
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
}

// Sample bookings data
const sampleBookings: Booking[] = [
  {
    id: '1',
    serviceName: 'Electrical Repair',
    date: '2023-10-15',
    time: '10:00 AM',
    status: 'scheduled',
    price: 120
  },
  {
    id: '2',
    serviceName: 'Plumbing Service',
    date: '2023-10-28',
    time: '02:30 PM',
    status: 'scheduled',
    price: 150
  },
  {
    id: '3',
    serviceName: 'Home Cleaning',
    date: '2023-09-22',
    time: '09:00 AM',
    status: 'completed',
    price: 80
  },
  {
    id: '4',
    serviceName: 'Appliance Repair',
    date: '2023-09-10',
    time: '11:00 AM',
    status: 'cancelled',
    price: 95
  }
];

const AccountBookings = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDialogOpen(true);
  };
  
  const confirmCancelBooking = () => {
    if (selectedBooking) {
      const updatedBookings = bookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: 'cancelled' as const } 
          : booking
      );
      
      setBookings(updatedBookings);
      setIsDialogOpen(false);
      
      toast({
        title: t("Booking Cancelled", "تم إلغاء الحجز"),
        description: t(
          `Your booking for ${selectedBooking.serviceName} has been cancelled.`,
          `تم إلغاء حجزك لخدمة ${selectedBooking.serviceName}.`
        ),
      });
    }
  };

  const statusBadgeColor = (status: string) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const statusTranslation = (status: string) => {
    switch(status) {
      case 'scheduled': return t('Scheduled', 'مجدول');
      case 'completed': return t('Completed', 'مكتمل');
      case 'cancelled': return t('Cancelled', 'ملغي');
      default: return status;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('My Bookings', 'حجوزاتي')}
        </h2>
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => window.location.href = '/book'}
        >
          {t('Book New Service', 'حجز خدمة جديدة')}
        </Button>
      </div>
      
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div 
              key={booking.id} 
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="font-medium">{booking.serviceName}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <p>{formatDate(booking.date)} | {booking.time}</p>
                </div>
                <div className="mt-1">
                  <Badge className={`${statusBadgeColor(booking.status)} border-0`}>
                    {statusTranslation(booking.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                <div className="text-right">
                  <span className="font-medium">${booking.price.toFixed(2)}</span>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 md:flex-initial"
                  >
                    {t('View Details', 'عرض التفاصيل')}
                  </Button>
                  
                  {booking.status === 'scheduled' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 md:flex-initial text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleCancelBooking(booking)}
                    >
                      {t('Cancel', 'إلغاء')}
                    </Button>
                  )}
                  
                  {booking.status === 'completed' && (
                    <Link to={`/reviews/add/${booking.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 md:flex-initial"
                      >
                        {t('Leave Review', 'كتابة تقييم')}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{t('You have no bookings yet.', 'ليس لديك حجوزات حتى الآن.')}</p>
          <Button 
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => window.location.href = '/book'}
          >
            {t('Book Your First Service', 'احجز خدمتك الأولى')}
          </Button>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Cancel Booking', 'إلغاء الحجز')}</DialogTitle>
            <DialogDescription>
              {t(
                'Are you sure you want to cancel this booking? This action cannot be undone.',
                'هل أنت متأكد أنك تريد إلغاء هذا الحجز؟ لا يمكن التراجع عن هذا الإجراء.'
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="py-4">
              <p className="font-medium">{selectedBooking.serviceName}</p>
              <p className="text-sm text-gray-600">
                {formatDate(selectedBooking.date)} | {selectedBooking.time}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              {t('Keep Booking', 'الاحتفاظ بالحجز')}
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600"
              onClick={confirmCancelBooking}
            >
              {t('Yes, Cancel Booking', 'نعم، قم بإلغاء الحجز')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountBookings;

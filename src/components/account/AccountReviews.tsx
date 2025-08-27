
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Star, Edit, Trash2 } from 'lucide-react';

interface Review {
  id: string;
  serviceName: string;
  date: string;
  rating: number;
  comment: string;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: '1',
    serviceName: 'Home Cleaning',
    date: '2023-09-25',
    rating: 5,
    comment: 'Excellent service! The cleaner was thorough and professional. Our home has never looked better.'
  },
  {
    id: '2',
    serviceName: 'Plumbing Service',
    date: '2023-08-12',
    rating: 4,
    comment: 'Good work fixing our leaky faucet. The plumber was on time and finished the job quickly.'
  }
];

const AccountReviews = () => {
  const { t } = useLanguage();
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };
  
  const handleEditReview = (reviewId: string) => {
    console.log('Edit review:', reviewId);
    // Implement edit functionality
  };
  
  const handleDeleteReview = (reviewId: string) => {
    console.log('Delete review:', reviewId);
    // Implement delete functionality
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t('My Reviews', 'تقييماتي')}
        </h2>
      </div>
      
      {sampleReviews.length > 0 ? (
        <div className="space-y-6">
          {sampleReviews.map(review => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{review.serviceName}</h3>
                  <p className="text-sm text-gray-600 mt-1">{formatDate(review.date)}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="text-gray-500 hover:text-orange-500"
                    onClick={() => handleEditReview(review.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-2">
                {renderStars(review.rating)}
              </div>
              
              <p className="mt-3 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            {t('You haven\'t left any reviews yet.', 'لم تترك أي تقييمات بعد.')}
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600">
            {t('Book a Service', 'حجز خدمة')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountReviews;

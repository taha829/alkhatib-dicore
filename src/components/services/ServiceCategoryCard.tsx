
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceCategoryProps {
  id: string;
  name: string;
  nameAr?: string;
  image: string;
}

const ServiceCategoryCard = ({ id, name, nameAr, image }: ServiceCategoryProps) => {
  const { language } = useLanguage();
  
  return (
    <Link to={`/services?category=${encodeURIComponent(name)}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md group">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={image}
            alt={language === 'ar' ? nameAr || name : name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 text-white">
              <h3 className="font-medium text-lg">{language === 'ar' ? nameAr || name : name}</h3>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCategoryCard;

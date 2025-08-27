import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Service } from "@/types/service";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

const ServiceCard = ({ service, featured = false }: ServiceCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={service.images[0].url}
          alt={t(service.name, service.nameAr)}
          className="w-full h-full object-cover"
        />
        {featured && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            {t("Featured", "مميز")}
          </span>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{t(service.name, service.nameAr)}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-orange-400 fill-orange-400" />
              <span className="text-sm ml-1">{service.rating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-1 mb-2">
            {t(service.shortDescription, service.shortDescriptionAr)}
          </p>

          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-orange-500">${service.price}</span>
            <span className="text-xs text-gray-500">
              {service.executionTimeMin}-{service.executionTimeMax} {t("hours", "ساعات")}
            </span>
          </div>
        </div>

        {/* الأزرار */}
        <div className="mt-4 flex space-x-2">
          <Button
            variant="outline"
            className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
            onClick={() => navigate(`/services/${service.slug}`)}
          >
            {t("View Details", "رؤية التفاصيل")}
          </Button>

          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            onClick={() => navigate(`/book/${service.slug}`)}
          >
            {t("Book Now", "احجز الآن")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

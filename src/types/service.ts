
export interface Service {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  description: string;
  descriptionAr?: string;
  shortDescription: string;
  shortDescriptionAr?: string;
  price: number;
  executionTimeMin: number;
  executionTimeMax: number;
  type: string;
  typeAr?: string;
  category: string;
  categoryAr?: string;
  images: ServiceImage[];
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export interface ServiceImage {
  id: string;
  url: string;
  alt: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  nameAr?: string;
  icon: string;
  image: string;
}

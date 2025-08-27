
import MainLayout from '@/components/layout/MainLayout';
import Seo from '@/components/Seo';
import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import ServiceCategories from '@/components/home/ServiceCategories';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <MainLayout>
  <Seo title="الصفحة الرئيسية - مؤسسة الخطيب للمقاولات" description="مؤسسة الخطيب للمقاولات تقدم خدمات مقاولات وهندسة متكاملة للمشاريع السكنية والتجارية." />
      <Hero />
      <FeaturedServices />
      <ServiceCategories />
      <HowItWorks />
      <Testimonials />
    </MainLayout>
  );
};

export default Index;

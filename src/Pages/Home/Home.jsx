import AdvertisementSection from '@/HomeComponent/AdvertisementSection';
import Banner from '@/HomeComponent/Banner';
import FeaturedAgentsSection from '@/HomeComponent/FeaturedAgentsSection';
import LatestReviewsSection from '@/HomeComponent/LatestReviewsSection';
import WhyChooseUsSection from '@/HomeComponent/WhyChooseUsSection';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertisedProperties = [] } = useQuery({
    queryKey: ['advertised-properties'],
    queryFn: async () => {
      // console.log('Fetching /advertised-properties');
      const res = await axiosSecure.get('/advertised-properties');
      // console.log('Data:', res.data);
      return res.data;
    },
  });

  return (
    <>
      <Banner />
      <AdvertisementSection properties={advertisedProperties} />
      <LatestReviewsSection />
      <FeaturedAgentsSection />
      <WhyChooseUsSection />
    </>
  );
};

export default Home;

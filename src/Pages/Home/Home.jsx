import AdvertisementSection from '@/HomeComponent/AdvertisementSection';
import Banner from '@/HomeComponent/Banner';
import FeaturedAgentsSection from '@/HomeComponent/FeaturedAgentsSection';
import LatestReviewsSection from '@/HomeComponent/LatestReviewsSection';
import WhyChooseUsSection from '@/HomeComponent/WhyChooseUsSection';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertisedProperties = [], isLoading: loadingProperties } =
    useQuery({
      queryKey: ['advertised-properties'],
      queryFn: async () => {
        console.log('Fetching /advertised-properties');
        const res = await axiosSecure.get('/advertised-properties');
        console.log('Data:', res.data);
        return res.data;
      },
    });

  const { data: latestReviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ['latest-reviews'],
    queryFn: async () => {
      console.log('Fetching /latest-reviews');
      const res = await axiosSecure.get('/latest-reviews');
      console.log('Data:', res.data);
      return res.data;
    },
  });

  console.log({
    loadingProperties,
    loadingReviews,
    advertisedProperties,
    latestReviews,
  });

  // if (loadingProperties || loadingReviews)
  //   return <div className="text-center py-10">Loading...</div>;

  // if (errorProperties || errorReviews)
  //   return (
  //     <div className="text-center py-10 text-red-600">Failed to load data.</div>
  //   );

  return (
    <>
      <Banner />
      <AdvertisementSection properties={advertisedProperties} />
      <LatestReviewsSection reviews={latestReviews} />
      <FeaturedAgentsSection />
      <WhyChooseUsSection />
    </>
  );
};

export default Home;

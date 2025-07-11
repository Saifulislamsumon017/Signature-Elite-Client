// src/hooks/useAdvertisements.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdvertisements = () => {
  const axiosSecure = useAxiosSecure();

  const fetchAdvertisements = async () => {
    try {
      const res = await axiosSecure.get('/advertised-properties');
      console.log('🔁 Advertised Properties Response:', res);
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching advertised properties:', error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ['advertisements'],
    queryFn: fetchAdvertisements,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useAdvertisements;

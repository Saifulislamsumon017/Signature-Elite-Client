import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PropertyBoughtCard from './PropertyBoughtCard';

const PropertyBoughtPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: offers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user-offers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?buyerEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load offers.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">My Property Offers</h2>
      {offers.length === 0 ? (
        <p className="text-gray-600">You have not made any offers yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map(offer => (
            <PropertyBoughtCard key={offer._id} offer={offer} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PropertyBoughtPage;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const MyOffersPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: offers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['myOffers', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get('/offers', {
        params: { buyerEmail: user.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return <p className="text-center py-10">Loading your offers...</p>;

  if (isError)
    return (
      <p className="text-center py-10 text-red-600">Error: {error?.message}</p>
    );

  if (offers.length === 0)
    return (
      <p className="text-center py-10 text-gray-600">
        You haven't made any offers yet.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">My Offers</h2>
      <div className="space-y-4">
        {offers.map(offer => (
          <div
            key={offer._id}
            className="border rounded p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">
                {offer.propertyTitle || 'Untitled Property'}
              </h3>
              <p className="text-gray-600">
                Location: {offer.location || 'N/A'}
              </p>
              <p>
                Offer Price:{' '}
                {offer.price != null
                  ? `$${offer.price.toLocaleString()}`
                  : 'N/A'}
              </p>
              <p>
                Status:{' '}
                <span
                  className={`font-semibold ${
                    offer.status === 'accepted'
                      ? 'text-green-600'
                      : offer.status === 'rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {offer.status || 'Pending'}
                </span>
              </p>
              {offer.createdAt && (
                <p className="text-sm text-gray-500">
                  Submitted on: {new Date(offer.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOffersPage;

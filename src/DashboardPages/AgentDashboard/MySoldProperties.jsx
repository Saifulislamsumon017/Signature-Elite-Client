import React from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldOffers = [], isLoading } = useQuery({
    queryKey: ['soldProperties', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sold-properties?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-10">Loading sold properties...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Sold Properties
      </h1>

      {soldOffers.length === 0 ? (
        <p className="text-center text-gray-500">No sold properties yet.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Property</th>
                <th className="py-3 px-4 text-left">Buyer</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Transaction ID</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {soldOffers.map((offer, index) => (
                <tr key={offer._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{offer.propertyTitle}</td>
                  <td className="py-3 px-4">{offer.userEmail}</td>
                  <td className="py-3 px-4">${offer.offerAmount}</td>
                  <td className="py-3 px-4">{offer.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;

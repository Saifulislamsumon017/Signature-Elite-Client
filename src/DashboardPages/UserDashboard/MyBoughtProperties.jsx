import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const MyBoughtProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: boughtProperties = [], isLoading } = useQuery({
    queryKey: ['boughtProperties', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bought-properties?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-10">Loading your bought properties...</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Bought Properties
      </h1>

      {boughtProperties.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t bought any properties yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Property</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Transaction ID</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {boughtProperties.map((offer, index) => (
                <tr key={offer._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{offer.propertyTitle}</td>
                  <td className="py-3 px-4">${offer.offerAmount}</td>
                  <td className="py-3 px-4">{offer.transactionId}</td>
                  <td className="py-3 px-4 text-green-600 font-medium capitalize">
                    {offer.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBoughtProperties;

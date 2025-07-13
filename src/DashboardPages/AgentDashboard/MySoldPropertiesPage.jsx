import React from 'react';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const MySoldPropertiesPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ['my-sold-properties', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/${user.email}/sold-properties`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalSoldAmount = soldProperties.reduce(
    (sum, item) => sum + (item.offerAmount || 0),
    0
  );

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        My Sold Properties
      </h2>

      <div className="text-center mb-6 text-lg font-semibold text-lime-700">
        ✅ Total Sold Amount: ${totalSoldAmount.toFixed(2)}
      </div>

      {soldProperties.length === 0 ? (
        <div className="text-center text-gray-500">No sold properties yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-lime-600 text-white">
              <tr>
                <th className="p-2 border">Property Title</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Buyer Name</th>
                <th className="p-2 border">Buyer Email</th>
                <th className="p-2 border">Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map(item => (
                <tr key={item._id} className="even:bg-gray-100">
                  <td className="p-2 border">{item.propertyTitle}</td>
                  <td className="p-2 border">{item.propertyLocation}</td>
                  <td className="p-2 border">{item.buyerName}</td>
                  <td className="p-2 border">{item.buyerEmail}</td>
                  <td className="p-2 border">
                    ${item.offerAmount?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MySoldPropertiesPage;

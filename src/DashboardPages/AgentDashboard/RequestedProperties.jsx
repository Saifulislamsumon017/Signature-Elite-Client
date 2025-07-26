import React from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['requestedProperties', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requested-properties?email=${user.email}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/offers/${id}`, { status }),
    onSuccess: () =>
      queryClient.invalidateQueries(['requestedProperties', user?.email]),
  });

  const handleStatusChange = (id, status) => {
    mutation.mutate({ id, status });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Requested Properties
      </h1>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No property offers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Buyer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{offer.propertyTitle}</td>
                  <td className="py-3 px-4">{offer.userEmail}</td>
                  <td className="py-3 px-4">${offer.offerAmount}</td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => handleStatusChange(offer._id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleStatusChange(offer._id, 'rejected')}
                    >
                      Reject
                    </button>
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

export default RequestedProperties;

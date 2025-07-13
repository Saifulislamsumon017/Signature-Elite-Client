import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AgentRequestsPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ React Query v5-compliant useQuery
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['agent-offers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/agent/offers');
      return res.data;
    },
  });

  // ✅ React Query v5-compliant useMutation
  const mutation = useMutation({
    mutationFn: async ({ offerId, status }) => {
      return axiosSecure.patch(`/agent/offer/${offerId}/status`, { status });
    },
    onSuccess: () => {
      toast.success('Offer status updated!');
      queryClient.invalidateQueries({ queryKey: ['agent-offers'] });
    },
    onError: () => {
      toast.error('Failed to update offer status.');
    },
  });

  if (isLoading) return <div>Loading offers...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Requested Properties</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Property Title</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Buyer Email</th>
            <th className="border p-2">Buyer Name</th>
            <th className="border p-2">Offer Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No offers found.
              </td>
            </tr>
          )}
          {offers.map(offer => (
            <tr key={offer._id}>
              <td className="border p-2">{offer.propertyTitle}</td>
              <td className="border p-2">{offer.propertyLocation}</td>
              <td className="border p-2">{offer.buyerEmail}</td>
              <td className="border p-2">{offer.buyerName}</td>
              <td className="border p-2">${offer.offerAmount.toFixed(2)}</td>
              <td className="border p-2 capitalize">{offer.status}</td>
              <td className="border p-2 space-x-2">
                {offer.status === 'pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        mutation.mutate({
                          offerId: offer._id,
                          status: 'accepted',
                        })
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() =>
                        mutation.mutate({
                          offerId: offer._id,
                          status: 'rejected',
                        })
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
                {offer.status !== 'pending' && <span>{offer.status}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentRequestsPage;

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { Tooltip } from 'react-tooltip'; // v5+ Tooltip
import 'react-tooltip/dist/react-tooltip.css';

const MyOffersPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch offers
  const {
    data: offers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['myOffers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?userEmail=${user.email}`);
      return res.data;
    },
  });

  // Mutation for updating offer status
  const { mutate } = useMutation({
    mutationFn: async ({ offerId, status }) => {
      const res = await axiosSecure.patch(`/offers/${offerId}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myOffers', user?.email]); // Refetch offers
    },
    onError: err => {
      console.error('Error updating status:', err);
    },
  });

  const handleStatusChange = (offerId, status) => {
    mutate({ offerId, status });
  };

  const getStatusStyle = status => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 border border-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-700 border border-red-400';
      default:
        return 'bg-yellow-100 text-yellow-700 border border-yellow-400';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'accepted':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '⌛';
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 font-medium">Loading offers...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Error: {error.message || 'Something went wrong'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Offers</h1>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven&apos;t made any offers yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Offer</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {offers.map((offer, index) => (
                <tr key={offer._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <span
                      data-tooltip-id={`title-${offer._id}`}
                      data-tooltip-content={offer.propertyTitle}
                      className="truncate max-w-[160px] block cursor-help"
                    >
                      {offer.propertyTitle}
                    </span>
                    <Tooltip id={`title-${offer._id}`} />
                  </td>
                  <td className="py-3 px-4">
                    <span
                      data-tooltip-id={`amount-${offer._id}`}
                      data-tooltip-content={`Offer: $${offer.offerAmount}`}
                      className="cursor-help"
                    >
                      ${offer.offerAmount.toLocaleString()}
                    </span>
                    <Tooltip id={`amount-${offer._id}`} />
                  </td>
                  <td className="py-3 px-4">
                    <span
                      data-tooltip-id={`message-${offer._id}`}
                      data-tooltip-content={offer.message}
                      className="truncate max-w-[160px] block cursor-help"
                    >
                      {offer.message}
                    </span>
                    <Tooltip id={`message-${offer._id}`} />
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        offer.status
                      )}`}
                    >
                      {getStatusIcon(offer.status)}{' '}
                      {offer.status.charAt(0).toUpperCase() +
                        offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleStatusChange(offer._id, 'accepted')}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(offer._id, 'rejected')}
                      className="text-sm text-red-600 hover:text-red-800"
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

export default MyOffersPage;

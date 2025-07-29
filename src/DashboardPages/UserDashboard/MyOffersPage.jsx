// src/pages/MyOffersPage.jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import toast from 'react-hot-toast';

const MyOffersPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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

  const { mutate } = useMutation({
    mutationFn: async ({ offerId, status }) => {
      const res = await axiosSecure.patch(`/offers/${offerId}`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Status updated!');
      queryClient.invalidateQueries(['myOffers', user?.email]);
    },
    onError: err => {
      console.error('Error updating status:', err);
      toast.error('Failed to update status.');
    },
  });

  const handleStatusChange = (offerId, status, currentStatus) => {
    if (currentStatus === 'accepted' || currentStatus === 'rejected') {
      toast('Status already finalized.');
      return;
    }
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

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return <div className="text-red-500 text-center">{error.message}</div>;

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
                      {getStatusIcon(offer?.offerStatus)}{' '}
                      {offer?.offerStatus?.charAt(0).toUpperCase() +
                        offer?.offerStatus?.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      disabled={offer?.status !== 'pending'}
                      onClick={() =>
                        handleStatusChange(offer._id, 'accepted', offer.status)
                      }
                      className="text-sm text-green-600 hover:text-green-800 disabled:opacity-40"
                    >
                      Accept
                    </button>
                    <button
                      disabled={offer.status !== 'pending'}
                      onClick={() =>
                        handleStatusChange(offer._id, 'rejected', offer.status)
                      }
                      className="text-sm text-red-600 hover:text-red-800 disabled:opacity-40"
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

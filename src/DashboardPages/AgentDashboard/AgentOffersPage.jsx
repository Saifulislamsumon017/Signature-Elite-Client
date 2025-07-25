// src/DashboardPages/AgentDashboard/AgentOffersPage.jsx

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const AgentOffersPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: offers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['agentOffers', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/offers', {
        params: { agentEmail: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleStatusChange = async (offerId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/offers/${offerId}/status`, {
        status: newStatus,
      });
      if (res.data.success) {
        toast.success(`Offer ${newStatus}`);
        refetch();
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  if (isLoading) return <p className="text-center">Loading offers...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Offers on Your Properties</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Buyer</th>
              <th className="px-4 py-2">Offer Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map(offer => (
              <tr key={offer._id} className="border-t">
                <td className="px-4 py-2">{offer.propertyTitle}</td>
                <td className="px-4 py-2">{offer.buyerEmail}</td>
                <td className="px-4 py-2">${offer.offerAmount}</td>
                <td className="px-4 py-2 capitalize">{offer.status}</td>
                <td className="px-4 py-2">
                  {offer.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(offer._id, 'accepted')
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(offer._id, 'rejected')
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={
                        offer.status === 'accepted'
                          ? 'text-green-600 font-semibold'
                          : 'text-red-600 font-semibold'
                      }
                    >
                      {offer.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center" colSpan="5">
                  No offers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentOffersPage;

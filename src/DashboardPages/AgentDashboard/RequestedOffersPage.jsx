import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const RequestedOffersPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['requestedOffers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/agent/offers?agentEmail=${user.email}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status, propertyId }) => {
      const res = await axiosSecure.patch(`/agent/offers/${id}`, {
        status,
        propertyId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['requestedOffers', user?.email]);
    },
  });

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Requested / Offered Properties
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      ) : offers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No offers found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-[720px] w-full bg-white dark:bg-gray-800 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Property</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Buyer Email</th>
                <th className="px-4 py-3 text-left">Buyer Name</th>
                <th className="px-4 py-3 text-left">Offer</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, idx) => (
                <tr
                  key={offer._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{offer.propertyTitle}</td>
                  <td className="px-4 py-3">{offer.propertyLocation}</td>
                  <td className="px-4 py-3">{offer.buyerEmail}</td>
                  <td className="px-4 py-3">{offer.buyerName}</td>
                  <td className="px-4 py-3 font-semibold text-green-700 dark:text-green-400">
                    ${Number(offer.offerAmount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        offer.offerStatus === 'accepted'
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                          : offer.offerStatus === 'rejected'
                          ? 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200'
                      }`}
                    >
                      {offer.offerStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {offer.offerStatus === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            mutation.mutate({
                              id: offer._id,
                              status: 'accepted',
                              propertyId: offer.propertyId,
                            })
                          }
                          className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-700 text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            mutation.mutate({
                              id: offer._id,
                              status: 'rejected',
                              propertyId: offer.propertyId,
                            })
                          }
                          className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-700 text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        --
                      </span>
                    )}
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

export default RequestedOffersPage;

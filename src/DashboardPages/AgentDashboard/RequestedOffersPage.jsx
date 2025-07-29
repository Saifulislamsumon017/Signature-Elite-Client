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
      queryClient.invalidateQueries(['requestedOffers']);
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Requested/Offered Properties</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Property</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Buyer Email</th>
                <th className="p-3 text-left">Buyer Name</th>
                <th className="p-3 text-left">Offer</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, idx) => (
                <tr key={offer._id} className="border-b">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{offer.propertyTitle}</td>
                  <td className="p-3">{offer.propertyLocation}</td>
                  <td className="p-3">{offer.buyerEmail}</td>
                  <td className="p-3">{offer.buyerName}</td>
                  <td className="p-3">${offer.offerAmount}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        offer.offerStatus === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : offer.offerStatus === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {offer.offerStatus}
                    </span>
                  </td>
                  <td className="p-3">
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
                          className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 text-sm"
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
                          className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      '--'
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

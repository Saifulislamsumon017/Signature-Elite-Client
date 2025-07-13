import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router';

const PropertyBoughtPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['user-offers', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?buyerEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="p-6">Loading your offers...</p>;

  if (offers.length === 0) {
    return (
      <p className="p-6 text-gray-600">You haven’t made any offers yet.</p>
    );
  }

  return (
    <section className="p-4 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Offered Properties</h2>
      {offers.map(offer => (
        <div
          key={offer._id}
          className="border rounded-lg shadow p-4 flex flex-col md:flex-row justify-between items-start gap-4"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <img
              src={offer.propertyImage || 'https://via.placeholder.com/150'}
              alt="Property"
              className="w-32 h-24 object-cover rounded"
            />
            <div>
              <h3 className="text-xl font-semibold">{offer.propertyTitle}</h3>
              <p className="text-sm text-gray-500">{offer.location}</p>
              <p className="text-sm">Agent: {offer.agentName}</p>
              <p className="text-sm">Offered Amount: ${offer.offerAmount}</p>
              <p className="text-sm">
                Status: <span className="font-semibold">{offer.status}</span>
              </p>
              {offer.status === 'bought' && offer.transactionId && (
                <p className="text-sm text-green-600">
                  Transaction ID: {offer.transactionId}
                </p>
              )}
            </div>
          </div>

          {offer.status === 'accepted' && (
            <Link
              to={`/dashboard/payment/${offer._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </Link>
          )}
        </div>
      ))}
    </section>
  );
};

export default PropertyBoughtPage;

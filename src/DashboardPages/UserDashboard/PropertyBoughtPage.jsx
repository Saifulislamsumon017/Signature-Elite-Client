import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const PropertyBoughtPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ['myOffers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?userEmail=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Bought Properties</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : offers.length === 0 ? (
        <p>You haven't made any offers yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div
              key={offer._id}
              className="bg-white shadow rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={offer.propertyImage}
                alt={offer.propertyTitle}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{offer.propertyTitle}</h3>
                <p className="text-gray-600 text-sm">
                  📍 {offer.propertyLocation}
                </p>
                <p className="text-gray-600 text-sm">
                  🧑 Agent:{' '}
                  <span className="font-medium">{offer.agentName}</span>
                </p>
                <p className="text-gray-700 font-semibold">
                  Offered: ${offer.offerAmount}
                </p>

                <div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded font-medium ${
                      offer.offerStatus === 'accepted'
                        ? 'bg-green-100 text-green-700'
                        : offer.offerStatus === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {offer.offerStatus}
                  </span>
                </div>

                {offer.offerStatus === 'accepted' && !offer.isPaid && (
                  <Link
                    to={`/dashboard/payment/${offer._id}`}
                    className="inline-block mt-2 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200"
                  >
                    Pay Now
                  </Link>
                )}

                {offer.isPaid && offer.transactionId && (
                  <p className="text-green-700 text-sm font-medium flex items-center gap-1">
                    <FaCheckCircle className="text-green-600" />
                    Paid (Txn ID:{' '}
                    <span className="ml-1">{offer.transactionId}</span>)
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyBoughtPage;

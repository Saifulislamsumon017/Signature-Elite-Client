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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        My Bought Properties
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading...
        </p>
      ) : offers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          You haven't made any offers yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div
              key={offer._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-lg"
            >
              <img
                src={offer.propertyImage}
                alt={offer.propertyTitle}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {offer.propertyTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  📍 {offer.propertyLocation}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  🧑 Agent:{' '}
                  <span className="font-medium text-gray-800 dark:text-white">
                    {offer.agentName}
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  Offered: ${offer.offerAmount}
                </p>

                <div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded font-medium capitalize ${
                      offer.offerStatus === 'accepted'
                        ? 'bg-green-100 text-green-700 dark:bg-green-200'
                        : offer.offerStatus === 'rejected'
                        ? 'bg-red-100 text-red-700 dark:bg-red-200'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-200'
                    }`}
                  >
                    {offer.offerStatus}
                  </span>
                </div>

                {offer.offerStatus === 'accepted' && !offer.isPaid && (
                  <Link
                    to={`/dashboard/payment/${offer._id}`}
                    className="inline-block mt-2 text-sm bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 transition"
                  >
                    Pay Now
                  </Link>
                )}

                {offer.isPaid && offer.transactionId && (
                  <p className="text-green-600 text-sm font-medium flex items-center gap-2 mt-2">
                    <FaCheckCircle className="text-green-500" />
                    Paid (Txn ID:
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

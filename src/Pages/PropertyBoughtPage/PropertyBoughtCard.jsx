import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const PropertyBoughtPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: boughtOffers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['bought-offers', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/offers', {
        params: {
          buyerEmail: user.email,
        },
      });
      return res.data.filter(offer => offer.status === 'bought');
    },
  });

  if (isLoading) return <div className="py-10 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="py-10 text-center text-red-600">
        Failed to load offers.
      </div>
    );

  if (boughtOffers.length === 0)
    return (
      <div className="py-10 text-center">
        You haven't bought any properties yet.
      </div>
    );

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Properties You Bought</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {boughtOffers.map(offer => (
          <div
            key={offer._id}
            className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{offer.propertyTitle}</h3>
            <p className="mb-1">Location: {offer.propertyLocation}</p>
            <p className="mb-1">Agent: {offer.agentName}</p>
            <p className="mb-1">
              Offer Amount: ${offer.offerAmount.toFixed(2)}
            </p>
            <p className="mb-1">Buying Date: {offer.buyingDate}</p>
            <p className="text-green-600 font-bold">Status: {offer.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyBoughtPage;

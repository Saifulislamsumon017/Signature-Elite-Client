import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const MySoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ['soldProperties', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agent/sold?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Sold Properties
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : soldProperties.length === 0 ? (
        <p className="text-center text-gray-500">No sold properties found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border">
          <table className="min-w-[640px] w-full bg-white text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Property</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Buyer Email</th>
                <th className="px-4 py-3 text-left">Buyer Name</th>
                <th className="px-4 py-3 text-left">Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((offer, idx) => (
                <tr
                  key={offer._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{offer.propertyTitle}</td>
                  <td className="px-4 py-3">{offer.propertyLocation}</td>
                  <td className="px-4 py-3">{offer.buyerEmail}</td>
                  <td className="px-4 py-3">{offer.buyerName}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    ${offer.offerAmount}
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

export default MySoldProperties;

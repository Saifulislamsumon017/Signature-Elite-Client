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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : soldProperties.length === 0 ? (
        <p>No sold properties found.</p>
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
                <th className="p-3 text-left">Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((offer, idx) => (
                <tr key={offer._id} className="border-b">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{offer.propertyTitle}</td>
                  <td className="p-3">{offer.propertyLocation}</td>
                  <td className="p-3">{offer.buyerEmail}</td>
                  <td className="p-3">{offer.buyerName}</td>
                  <td className="p-3">${offer.offerAmount}</td>
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

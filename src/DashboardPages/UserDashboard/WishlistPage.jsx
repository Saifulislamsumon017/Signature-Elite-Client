import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const WishlistPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?userEmail=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async id => {
      return await axiosSecure.delete(`/wishlist/${id}`);
    },
    onSuccess: () => {
      toast.success('Removed from wishlist');
      queryClient.invalidateQueries(['wishlist', user?.email]);
    },
  });

  if (isLoading) return <p className="p-4">Loading wishlist...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      {wishlist.length === 0 && <p>You have no properties in your wishlist.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlist.map(item => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow bg-white flex gap-4"
          >
            <img
              src={item.image}
              alt={item.propertyTitle}
              className="w-40 h-32 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.propertyTitle}</h3>
              <p className="text-gray-600 text-sm">Location: {item.location}</p>
              <p className="text-sm">Agent: {item.agentName}</p>
              <p className="text-sm">Verification: {item.verificationStatus}</p>
              <p className="text-green-600 font-medium mt-1">
                Price: ${item.minPrice} - ${item.maxPrice}
              </p>

              <div className="mt-3 flex gap-2">
                <Link
                  to={`/make-offer/${item.propertyId}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Make an Offer
                </Link>
                <button
                  onClick={() => deleteMutation.mutate(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WishlistPage;

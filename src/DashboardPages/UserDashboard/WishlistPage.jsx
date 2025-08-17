import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const WishlistPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch wishlist for the current user
  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?userEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to remove item from wishlist
  const removeMutation = useMutation({
    mutationFn: id =>
      axiosSecure.delete(`/wishlist/${id}`, {
        params: { userEmail: user.email },
      }),
    onSuccess: () => {
      toast.success('Removed from wishlist');
      queryClient.invalidateQueries(['wishlist', user?.email]);
    },
    onError: () => {
      toast.error('Failed to remove wishlist item');
    },
  });

  const handleRemove = id => removeMutation.mutate(id);
  const handleMakeOffer = item =>
    navigate('/make-offer', { state: { property: item } });

  if (isLoading)
    return (
      <p className="text-center mt-10 font-semibold text-lg text-gray-800 dark:text-gray-200">
        Loading wishlist...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No properties in your wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                  {item.location}
                </p>
                <p className="text-sm mb-1 text-gray-700 dark:text-gray-300">
                  Price: ${item.minPrice?.toLocaleString()} - $
                  {item.maxPrice?.toLocaleString()}
                </p>
                <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                  Agent: <span className="font-semibold">{item.agentName}</span>
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={item.agentImage}
                    alt={item.agentName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.verificationStatus}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleMakeOffer(item)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors duration-200"
                  >
                    Make an Offer
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

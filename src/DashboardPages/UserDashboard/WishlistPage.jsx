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

  // Handler: remove from wishlist
  const handleRemove = id => {
    removeMutation.mutate(id);
  };

  // Handler: go to make offer page
  const handleMakeOffer = item => {
    navigate('/make-offer', { state: { property: item } });
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 font-semibold text-lg">
        Loading wishlist...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">
          No properties in your wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-1">{item.location}</p>
                <p className="text-sm mb-1">
                  Price: ${item.minPrice?.toLocaleString()} - $
                  {item.maxPrice?.toLocaleString()}
                </p>
                <p className="text-sm mb-2">
                  Agent: <span className="font-semibold">{item.agentName}</span>
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={item.agentImage}
                    alt={item.agentName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-500">
                    {item.verificationStatus}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleMakeOffer(item)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                  >
                    Make an Offer
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
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

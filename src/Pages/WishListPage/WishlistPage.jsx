import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import WishlistCard from './WishlistCard';

const WishlistPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // ✅ Fetch wishlist
  const {
    data: wishlist = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['wishlist', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?userEmail=${user.email}`);
      return res.data;
    },
  });

  // ✅ Remove from wishlist
  const removeMutation = useMutation({
    mutationFn: async id => {
      await axiosSecure.delete(`/wishlist/${id}`);
    },
    onSuccess: () => {
      toast.success('Removed from wishlist');
      QueryClient.invalidateQueries(['wishlist', user?.email]);
    },
    onError: () => {
      toast.error('Failed to remove item');
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load wishlist.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <WishlistCard
              key={item._id}
              item={item}
              onRemove={id => removeMutation.mutate(id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;

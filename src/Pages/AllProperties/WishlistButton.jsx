import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const WishlistButton = ({ propertyId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: addWishlist, isLoading } = useMutation({
    mutationFn: () =>
      axiosSecure.post('/wishlist', { propertyId, email: user.email }),
    onSuccess: () => {
      toast.success('Added to wishlist!');
      queryClient.invalidateQueries(['wishlist']);
    },
    onError: () => {
      toast.error('Failed to add to wishlist or already exists.');
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={() => addWishlist()}
      className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
    >
      {isLoading ? 'Adding...' : 'Add to Wishlist'}
    </button>
  );
};

export default WishlistButton;

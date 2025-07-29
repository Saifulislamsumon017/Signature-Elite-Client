import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const MyReviewsPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['myReviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews?userEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Review deleted successfully!');
      queryClient.invalidateQueries(['myReviews']);
      setSelectedReviewId(null);
    },
    onError: () => {
      toast.error('Failed to delete review.');
    },
  });

  const confirmDelete = async () => {
    if (!selectedReviewId) return;
    toast.promise(deleteMutation.mutateAsync(selectedReviewId), {
      loading: 'Deleting review...',
      success: 'Review deleted!',
      error: 'Deletion failed!',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        My Reviews
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Loading reviews...
        </p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          You haven’t posted any reviews yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white text-left text-sm uppercase">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-800 dark:text-gray-200">
              {reviews.map((review, idx) => (
                <tr
                  key={review._id || review.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{review.propertyTitle || 'N/A'}</td>
                  <td className="px-6 py-4">{review.rating} ★</td>
                  <td className="px-6 py-4">{review.comment}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setSelectedReviewId(review._id || review.id)
                      }
                      className="text-red-600 hover:text-red-800 transition"
                      disabled={deleteMutation.isLoading}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedReviewId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this review?
            </p>
            <div className="flex justify-end gap-4 pt-2">
              <button
                onClick={() => setSelectedReviewId(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviewsPage;

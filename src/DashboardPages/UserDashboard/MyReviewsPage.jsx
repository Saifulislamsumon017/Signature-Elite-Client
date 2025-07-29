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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>You haven’t posted any reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Property</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Comment</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr key={review._id || review.id} className="border-b">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{review.propertyTitle || 'N/A'}</td>
                  <td className="p-3">{review.rating} ★</td>
                  <td className="p-3">{review.comment}</td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        setSelectedReviewId(review._id || review.id)
                      }
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                      disabled={deleteMutation.isLoading}
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

      {/* Confirmation Modal */}
      {selectedReviewId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-[90%] max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this review?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedReviewId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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

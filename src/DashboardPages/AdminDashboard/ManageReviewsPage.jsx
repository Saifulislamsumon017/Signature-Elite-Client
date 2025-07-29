import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageReviewsPage = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/reviews');
      return res.data;
    },
  });

  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this review?'
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(`/admin/reviews/${id}`);
      if (res.data.success) {
        toast.success('Review deleted');
        refetch();
      } else {
        toast.error(res.data.message || 'Delete failed');
      }
    } catch (err) {
      toast.error('Something went wrong', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>

      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">User</th>
                <th className="p-3">Review</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr key={review._id} className="border-b">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={review.userImage}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-xs text-gray-500">
                        {review.userEmail}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 max-w-sm">
                    <p className="text-gray-800">{review.comment}</p>
                  </td>
                  <td className="p-3">{review.rating}/5</td>
                  <td className="p-3 text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                    >
                      <FaTrash className="inline mr-1" />
                      Delete
                    </button>
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

export default ManageReviewsPage;

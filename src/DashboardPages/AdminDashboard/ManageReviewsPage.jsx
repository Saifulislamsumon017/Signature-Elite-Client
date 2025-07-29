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
      toast.error('Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Reviews</h2>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow border">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 whitespace-nowrap">#</th>
                <th className="p-3 whitespace-nowrap">User</th>
                <th className="p-3 max-w-xs">Review</th>
                <th className="p-3 whitespace-nowrap">Rating</th>
                <th className="p-3 whitespace-nowrap">Date</th>
                <th className="p-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews.map((review, idx) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="p-3 whitespace-nowrap">{idx + 1}</td>
                  <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={review.userImage}
                      alt={`${review.userName}'s avatar`}
                      className="w-8 h-8 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="truncate max-w-[150px]">
                      <p className="font-medium truncate">{review.userName}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {review.userEmail}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 max-w-xs">
                    <p className="text-gray-800 truncate">{review.comment}</p>
                  </td>
                  <td className="p-3 whitespace-nowrap">{review.rating}/5</td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                      aria-label={`Delete review by ${review.userName}`}
                      type="button"
                    >
                      <FaTrash />
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

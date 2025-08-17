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
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Manage Reviews
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Loading reviews...
        </p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No reviews found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded shadow border bg-white dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3 whitespace-nowrap">#</th>
                <th className="p-3 whitespace-nowrap">User</th>
                <th className="p-3 max-w-xs">Review</th>
                <th className="p-3 whitespace-nowrap">Rating</th>
                <th className="p-3 whitespace-nowrap">Date</th>
                <th className="p-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {reviews.map((review, idx) => (
                <tr
                  key={review._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {idx + 1}
                  </td>
                  <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                    <img
                      src={review.userImage}
                      alt={`${review.userName}'s avatar`}
                      className="w-8 h-8 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="truncate max-w-[150px]">
                      <p className="font-medium truncate text-gray-800 dark:text-gray-200">
                        {review.userName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {review.userEmail}
                      </p>
                    </div>
                  </td>
                  <td className="p-3 max-w-xs">
                    <p className="text-gray-800 dark:text-gray-200 truncate">
                      {review.comment}
                    </p>
                  </td>
                  <td className="p-3 whitespace-nowrap text-gray-800 dark:text-gray-200">
                    {review.rating}/5
                  </td>
                  <td className="p-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="flex items-center gap-1 bg-red-100 text-red-600 dark:bg-red-600 dark:text-red-100 px-3 py-1 rounded hover:bg-red-200 dark:hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
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

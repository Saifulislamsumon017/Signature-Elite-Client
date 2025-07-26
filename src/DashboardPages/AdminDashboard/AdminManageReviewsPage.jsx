import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

const AdminManageReviewsPage = () => {
  const axiosSecure = useAxiosSecure();

  // Query to fetch reviews
  const {
    data: reviews = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get('/admin/reviews');
        return res.data;
      } catch (err) {
        throw new Error('Failed to fetch reviews', err);
      }
    },
  });

  // Handle delete action
  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This review will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/admin/reviews/${id}`);
        refetch(); // Refetch reviews after delete
        Swal.fire('Deleted!', 'Review has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete review.', error);
      }
    }
  };

  // Loading state
  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  // Error state
  if (isError) {
    return (
      <div className="text-center p-10 text-red-600">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage All Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map(review => (
            <div key={review._id} className="bg-white shadow rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    {review.userName} ({review.userEmail})
                  </p>
                  <p className="text-sm">{review.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-600 hover:text-red-800"
                  data-tooltip-id="delete-tooltip"
                  data-tooltip-content="Delete Review"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Tooltip id="delete-tooltip" place="top" />
    </section>
  );
};

export default AdminManageReviewsPage;

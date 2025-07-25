// src/Components/ui/Reviews.jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Reviews = ({ propertyId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', propertyId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${propertyId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        propertyId,
        email: user.email,
        name: user.displayName,
        rating,
        review: reviewText,
      };
      await axiosSecure.post('/reviews', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', propertyId]);
      toast.success('Review added!');
      setReviewText('');
      setRating(5);
    },
    onError: () => {
      toast.error('Failed to submit review.');
    },
  });

  return (
    <div>
      <div className="mb-4">
        <textarea
          className="textarea textarea-bordered w-full mb-2"
          placeholder="Write your review..."
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-4">
          <select
            className="select select-bordered"
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map(r => (
              <option key={r} value={r}>
                {r} Stars
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={() => mutation.mutate()}>
            Submit
          </button>
        </div>
      </div>

      <div className="mt-6">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map(r => (
            <div key={r._id} className="mb-4 border-b pb-2">
              <p className="font-semibold">{r.name}</p>
              <p className="text-yellow-500">Rating: {r.rating}⭐</p>
              <p>{r.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;

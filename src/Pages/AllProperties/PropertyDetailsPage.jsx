import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import StarRating from '@/Components/ui/StarRating';
import { useNavigate, useParams } from 'react-router';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch property details
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Add to wishlist
  const wishlistMutation = useMutation({
    mutationFn: wishlistItem => axiosSecure.post('/wishlist', wishlistItem),
  });

  // Add review
  const reviewMutation = useMutation({
    mutationFn: newReview => axiosSecure.post('/reviews', newReview),
    onSuccess: () => {
      toast.success('Review added');
      queryClient.invalidateQueries(['reviews', id]);
      setShowReviewModal(false);
      setRating(0);
      setComment('');
    },
    onError: () => {
      toast.error('Failed to add review');
    },
  });

  if (isLoading) {
    return (
      <p className="text-center mt-10 font-semibold text-lg">
        Loading property...
      </p>
    );
  }

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    if (!user?.email) {
      toast.error('Please login to add to wishlist');
      return;
    }

    wishlistMutation.mutate(
      {
        userEmail: user.email,
        propertyId: property._id,
        title: property.title,
        location: property.location,
        image: property.image,
        agentName: property.agentName,
        agentImage: property.agentImage,
        verificationStatus: property.verificationStatus,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
      },
      {
        onSuccess: () => {
          toast.success('Added to wishlist');
          navigate('/dashboard/wishlist'); // ✅ redirect to wishlist
        },
        onError: () => {
          toast.error('Failed to add to wishlist');
        },
      }
    );
  };

  // Handle submit review
  const handleSubmitReview = e => {
    e.preventDefault();
    if (!user?.email) {
      toast.error('Please login to submit a review');
      return;
    }
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }
    reviewMutation.mutate({
      propertyId: property._id,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      rating,
      comment,
      createdAt: new Date(),
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-72 object-cover rounded-md mb-6"
      />
      <p className="mb-4">{property.description}</p>
      <p className="font-semibold mb-1">
        Price Range: ${property.minPrice?.toLocaleString() ?? 'N/A'} - $
        {property.maxPrice?.toLocaleString() ?? 'N/A'}
      </p>
      <p className="mb-4">
        Agent: <span className="font-semibold">{property.agentName}</span>
      </p>

      <button
        onClick={handleAddToWishlist}
        disabled={wishlistMutation.isLoading}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        {wishlistMutation.isLoading ? 'Adding...' : 'Add to Wishlist'}
      </button>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}

        <div className="space-y-6">
          {reviews.map(review => (
            <div
              key={review._id}
              className="flex items-start space-x-4 border-b border-gray-200 pb-4"
            >
              <img
                src={review.userImage}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <StarRating rating={review.rating} />
                <p className="italic mt-1">"{review.comment}"</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Add a Review
        </button>

        {showReviewModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <form
              onSubmit={handleSubmitReview}
              className="bg-white rounded p-6 w-full max-w-md shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>

              <label className="block mb-2 font-semibold">Rating</label>
              <select
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map(star => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>

              <label className="block mb-2 font-semibold">Comment</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
                className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-indigo-500"
                required
              ></textarea>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewMutation.isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {reviewMutation.isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;

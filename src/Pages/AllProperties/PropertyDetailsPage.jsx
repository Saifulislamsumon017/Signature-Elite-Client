import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import useUserRole from '@/hooks/useUserRole';
import toast from 'react-hot-toast';
import StarRating from '@/Components/ui/StarRating';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role] = useUserRole(); // ✅ Get user role
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // ✅ Fetch property details
  const { data: property, isLoading: propertyLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ✅ Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ✅ Wishlist mutation
  const wishlistMutation = useMutation({
    mutationFn: data => axiosSecure.post('/wishlist', data),
  });

  // ✅ Review mutation
  const reviewMutation = useMutation({
    mutationFn: data => axiosSecure.post('/reviews', data),
    onSuccess: () => {
      toast.success('✅ Review submitted!');
      setShowReviewModal(false);
      setRating(0);
      setComment('');
      queryClient.invalidateQueries(['reviews', id]);
    },
    onError: () => toast.error('❌ Failed to submit review'),
  });

  // ✅ Add to wishlist handler
  const handleAddToWishlist = () => {
    if (!user?.email) {
      return toast.error('🔑 Please login to add to wishlist');
    }

    if (role === 'agent' || role === 'admin') {
      return toast.error('🚫Cannot add to wishlist');
    }

    wishlistMutation.mutate(
      {
        userEmail: user.email,
        propertyId: property._id,
        title: property.title,
        location: property.location,
        image: property.image,
        agentName: property.agentName,
        agentEmail: property.agentEmail,
        agentImage: property.agentImage,
        verificationStatus: property.verificationStatus,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
      },
      {
        onSuccess: () => {
          toast.success('✅ Added to wishlist');
          navigate('/dashboard/wishlist');
        },
        onError: () => {
          toast.error('⚠️ Already in wishlist or failed');
        },
      }
    );
  };

  // ✅ Open review modal
  const handleOpenReviewModal = () => {
    if (!user?.email) return toast.error('🔑 Please login to write a review');
    if (role === 'agent' || role === 'admin') {
      return toast.error('🚫Cannot review properties');
    }
    setShowReviewModal(true);
  };

  // ✅ Submit review handler
  const handleSubmitReview = e => {
    e.preventDefault();

    if (!user?.email) return toast.error('🔑 Login required');
    if (rating === 0) return toast.error('⭐ Please select a rating');

    reviewMutation.mutate({
      propertyId: property._id,
      propertyTitle: property.title,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      rating,
      comment,
      createdAt: new Date(),
    });
  };

  if (propertyLoading) {
    return (
      <p className="text-center mt-10 font-semibold text-lg">Loading...</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-72 object-cover rounded mb-6"
      />
      <p className="mb-4">{property.description}</p>
      <p className="font-semibold">
        Price: ${property.minPrice.toLocaleString()} - $
        {property.maxPrice.toLocaleString()}
      </p>
      <p className="mb-4">
        Agent: <strong>{property.agentName}</strong>
      </p>

      {/* ✅ Wishlist Button */}
      <button
        onClick={handleAddToWishlist}
        disabled={wishlistMutation.isLoading}
        className="px-6 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {wishlistMutation.isLoading ? 'Adding...' : 'Add to Wishlist'}
      </button>

      {/* ✅ Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review._id} className="flex gap-4 border-b pb-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <StarRating rating={review.rating} />
                  <p className="italic mt-1">"{review.comment}"</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Property: {review.propertyTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Add Review Button */}
        <button
          onClick={handleOpenReviewModal}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add a Review
        </button>

        {/* ✅ Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
              onSubmit={handleSubmitReview}
              className="bg-white rounded p-6 w-full max-w-md shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Submit Your Review</h3>

              <label className="block font-semibold mb-2">Rating</label>
              <select
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              >
                <option value={0}>Select rating</option>
                {[1, 2, 3, 4, 5].map(r => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && 's'}
                  </option>
                ))}
              </select>

              <label className="block font-semibold mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                required
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
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

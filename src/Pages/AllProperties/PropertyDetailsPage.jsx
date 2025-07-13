import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import useAuth from '@/hooks/useAuth';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [reviewText, setReviewText] = useState('');
  const [showReviewBox, setShowReviewBox] = useState(false);

  // 🔹 Fetch property by ID
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
  });

  // 🔹 Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
  });

  // 🔹 Wishlist add
  const wishlistMutation = useMutation({
    mutationFn: async () => {
      const item = {
        userEmail: user?.email,
        propertyId: id,
        propertyTitle: property.title,
        image: property.image,
        location: property.location,
        agentName: property.agentName,
        verificationStatus: property.verificationStatus,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
      };
      return await axiosSecure.post('/wishlist', item);
    },
    onSuccess: () => {
      toast.success('Added to wishlist');
    },
    onError: () => {
      toast.error('Could not add to wishlist');
    },
  });

  // 🔹 Add review
  const reviewMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.post('/reviews', {
        propertyId: id,
        userEmail: user?.email,
        userName: user?.displayName,
        userImage: user?.photoURL,
        review: reviewText,
      });
    },
    onSuccess: () => {
      toast.success('Review submitted');
      setReviewText('');
      setShowReviewBox(false);
      queryClient.invalidateQueries(['reviews', id]);
    },
  });

  if (isLoading) return <p>Loading property details...</p>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-1">{property.description}</p>
      <p className="text-sm text-gray-500 mb-1">
        Location: {property.location}
      </p>
      <p className="text-sm text-gray-500 mb-1">
        Agent: {property.agentName} | Verified: {property.verificationStatus}
      </p>
      <p className="text-green-600 font-bold mb-4">
        Price: ${property.minPrice} - ${property.maxPrice}
      </p>

      <button
        onClick={() => wishlistMutation.mutate()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Wishlist
      </button>

      {/* 🔹 Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">User Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map(r => (
          <div
            key={r._id}
            className="border p-3 rounded mb-3 bg-gray-50 shadow-sm"
          >
            <p className="font-medium">{r.userName}</p>
            <p className="text-sm text-gray-600">{r.review}</p>
          </div>
        ))}

        {/* Add review */}
        {!showReviewBox && (
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setShowReviewBox(true)}
          >
            Add a Review
          </button>
        )}

        {showReviewBox && (
          <div className="mt-4">
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              rows="3"
              className="w-full border p-2 rounded"
              placeholder="Write your review..."
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => reviewMutation.mutate()}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowReviewBox(false)}
                className="text-gray-600 px-4 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyDetailsPage;

import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import AddReviewModal from './AddReviewModal';
import ReviewCard from './ReviewCard';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch property details
  const {
    data: property,
    isLoading: loadingProperty,
    isError: errorProperty,
  } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/property/${id}`);
      return res.data;
    },
  });

  // ✅ Fetch reviews for this property
  const {
    data: reviews = [],
    isLoading: loadingReviews,
    isError: errorReviews,
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?propertyId=${id}`);
      return res.data;
    },
  });

  // ✅ Add to wishlist mutation
  const addToWishlist = useMutation({
    mutationFn: async () => {
      await axiosSecure.post('/wishlist', {
        userEmail: user.email,
        propertyId: id,
        propertyImage: property.image,
        propertyTitle: property.title,
        location: property.location,
        agentName: property.agentName,
        agentImage: property.agentImage,
        verificationStatus: property.verificationStatus,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
      });
    },
    onSuccess: () => {
      toast.success('Added to wishlist!');
    },
    onError: () => {
      toast.error('Failed to add to wishlist.');
    },
  });

  // ✅ Add review mutation
  const addReview = useMutation({
    mutationFn: async description => {
      await axiosSecure.post('/reviews', {
        propertyId: id,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        reviewerEmail: user.email,
        description,
      });
    },
    onSuccess: () => {
      toast.success('Review submitted!');
      setIsModalOpen(false);
      QueryClient.invalidateQueries(['reviews', id]);
    },
    onError: () => {
      toast.error('Failed to submit review.');
    },
  });

  if (loadingProperty || loadingReviews) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (errorProperty || errorReviews) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load property.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-96 object-cover rounded-lg shadow"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
          <p className="text-gray-700 mb-4">{property.description}</p>
          <p className="text-lg font-semibold mb-2">
            Price: ${property.minPrice.toLocaleString()} - $
            {property.maxPrice.toLocaleString()}
          </p>
          <p className="text-md mb-2">Location: {property.location}</p>
          <div className="flex items-center mb-2">
            <img
              src={property.agentImage}
              alt={property.agentName}
              className="w-8 h-8 rounded-full object-cover mr-2 border"
            />
            <span className="text-md">{property.agentName}</span>
          </div>
          <button
            onClick={() => addToWishlist.mutate()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add to Wishlist
          </button>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Reviews</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add a Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={description => addReview.mutate(description)}
      />
    </section>
  );
};

export default PropertyDetailsPage;

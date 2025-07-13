import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';

const MyReviewsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: myReviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-reviews', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/my-reviews', {
        params: { userEmail: user.email },
      });
      return res.data;
    },
  });

  if (isLoading) return <div className="py-10 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="py-10 text-center text-red-600">
        Failed to load your reviews.
      </div>
    );

  if (myReviews.length === 0)
    return (
      <div className="py-10 text-center">
        You have not posted any reviews yet.
      </div>
    );

  return (
    <section className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>
      <div className="space-y-4">
        {myReviews.map(review => (
          <div
            key={review._id}
            className="border rounded shadow p-4 bg-white hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">
              Property ID: {review.propertyId}
            </h3>
            <p className="mb-2">{review.comment}</p>
            <p className="text-sm text-gray-500">
              Posted on: {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyReviewsPage;

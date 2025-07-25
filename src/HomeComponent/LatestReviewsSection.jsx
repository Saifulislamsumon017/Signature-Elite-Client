import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import StarRating from '@/Components/ui/StarRating';
import { formatDistanceToNow } from 'date-fns';

const LatestReviewsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ['latestReviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/latest-reviews');
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">What Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div
            key={review._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={review.userPhoto || '/default-user.png'}
                alt={review.userName}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-semibold">{review.userName}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="text-sm italic text-gray-600">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviewsSection;

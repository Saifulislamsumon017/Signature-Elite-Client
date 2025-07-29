import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import StarRating from '@/Components/ui/StarRating';
import { formatDistanceToNow } from 'date-fns';

const LatestReviewsdiv = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ['latestReviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/latest-reviews');
      return res.data;
    },
  });

  if (reviews.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        No reviews available yet.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20  dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg ">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white relative inline-block">
        What Users Say
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {reviews.map(review => (
          <article
            key={review._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105 duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.userImage || '/default-user.png'}
                alt={review.userName}
                className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {review.userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <blockquote className="text-sm italic text-gray-700 dark:text-gray-300">
              &ldquo;{review.comment}&rdquo;
            </blockquote>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LatestReviewsdiv;

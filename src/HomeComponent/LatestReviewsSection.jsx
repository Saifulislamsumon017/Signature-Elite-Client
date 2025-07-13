const LatestReviewsSection = ({ reviews }) => {
  if (!reviews.length) return <p>No recent reviews.</p>;

  return (
    <section className="latest-reviews-section p-5 bg-gray-100 rounded">
      <h2 className="text-2xl font-semibold mb-5">Latest User Reviews</h2>
      <div className="space-y-4">
        {reviews.map(review => (
          <div
            key={review._id || review.createdAt}
            className="review-card border p-3 rounded shadow"
          >
            <p className="font-semibold">{review.reviewerName}</p>
            <p className="italic">{review.comment}</p>
            <p className="text-sm text-gray-600">Rating: {review.rating} / 5</p>
            <p className="text-sm text-gray-600">
              Property: {review.propertyTitle || 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestReviewsSection;

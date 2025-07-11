import React from 'react';

const LatestReviewsSection = ({ reviews }) => (
  <div className="bg-gray-50 py-10">
    <div className="max-w-7xl mx-auto  px-6">
      <h2 className="text-3xl font-semibold mb-6">Latest User Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.length === 0 && <p>No reviews found.</p>}
        {reviews.map(review => (
          <div
            key={review._id}
            className="border rounded-lg shadow bg-white p-4 flex flex-col"
          >
            <div className="flex items-center mb-3 space-x-3">
              <img
                src={
                  review.reviewerImage || 'https://i.ibb.co/7vDLJFb/user.png'
                }
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{review.reviewerName}</h4>
                <p className="text-gray-500 text-sm">{review.propertyTitle}</p>
              </div>
            </div>
            <p className="text-gray-700 flex-grow">
              {review.reviewDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default LatestReviewsSection;

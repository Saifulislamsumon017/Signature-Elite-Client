import React from 'react';

const ReviewCard = ({ review }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-white">
    <div className="flex items-center mb-2">
      <img
        src={review.reviewerImage}
        alt={review.reviewerName}
        className="w-10 h-10 rounded-full mr-3 object-cover border"
      />
      <div>
        <p className="font-semibold">{review.reviewerName}</p>
        <p className="text-sm text-gray-500">
          {new Date(review.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
    <p className="text-gray-700 mt-2">{review.description}</p>
  </div>
);

export default ReviewCard;

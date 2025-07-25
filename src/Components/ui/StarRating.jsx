const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

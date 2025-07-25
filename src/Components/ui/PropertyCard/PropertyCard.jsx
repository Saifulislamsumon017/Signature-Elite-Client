import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const {
    _id,
    image,
    title,
    location,
    agentName,
    agentImage,
    verificationStatus,
    minPrice,
    maxPrice,
  } = property;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{location}</p>

        <div className="flex items-center gap-2">
          <img
            src={agentImage}
            alt={agentName}
            className="w-8 h-8 rounded-full object-cover"
            loading="lazy"
          />
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            {agentName}
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          Price Range:{' '}
          <strong>
            ${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()}
          </strong>
        </p>

        <div className="flex items-center gap-2">
          {verificationStatus === 'verified' ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle size={18} />
              <span className="ml-1 font-semibold">Verified</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600 dark:text-red-400">
              <XCircle size={18} />
              <span className="ml-1 font-semibold capitalize">
                {verificationStatus}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(`/property/${_id}`)}
          className="mt-4 w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded-md font-semibold transition"
          type="button"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;

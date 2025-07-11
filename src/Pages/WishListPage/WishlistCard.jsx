import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const WishlistCard = ({ item, onRemove }) => (
  <div className="border rounded-lg shadow hover:shadow-lg transition duration-200 bg-white">
    <img
      src={item.propertyImage}
      alt={item.propertyTitle}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="font-bold text-lg">{item.propertyTitle}</h3>
      <p className="text-gray-600">{item.location}</p>
      <p className="mt-1 text-indigo-600 font-semibold">
        ${item.minPrice.toLocaleString()} - ${item.maxPrice.toLocaleString()}
      </p>
      <p className="flex items-center mt-2">
        {item.verificationStatus === 'verified' ? (
          <FaCheckCircle className="text-green-500 mr-1" />
        ) : (
          <FaTimesCircle className="text-red-500 mr-1" />
        )}
        <span className="capitalize">{item.verificationStatus}</span>
      </p>
      <div className="flex items-center mt-2">
        <img
          src={item.agentImage}
          alt={item.agentName}
          className="w-8 h-8 rounded-full object-cover mr-2 border"
        />
        <span>{item.agentName}</span>
      </div>

      <div className="flex justify-between mt-4">
        <Link
          to={`/make-offer/${item.propertyId}`}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Make an Offer
        </Link>
        <button
          onClick={() => onRemove(item._id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default WishlistCard;

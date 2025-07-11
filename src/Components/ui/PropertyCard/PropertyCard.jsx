import React from 'react';
import { Link } from 'react-router';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PropertyCard = ({ property }) => (
  <div className="border rounded-lg shadow hover:shadow-lg transition duration-200">
    <img
      src={property.image}
      alt={property.title}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="font-bold text-lg">{property.title}</h3>
      <p className="text-gray-600">{property.location}</p>
      <div className="flex items-center mt-2 space-x-2">
        <img
          src={property.agentImage}
          alt={property.agentName}
          className="w-8 h-8 rounded-full object-cover border"
        />
        <span className="text-sm">{property.agentName}</span>
      </div>
      <p className="mt-1 text-indigo-600 font-semibold">
        ${property.minPrice.toLocaleString()} - $
        {property.maxPrice.toLocaleString()}
      </p>
      <p className="flex items-center mt-2">
        {property.verificationStatus === 'verified' ? (
          <FaCheckCircle className="text-green-500 mr-1" />
        ) : (
          <FaTimesCircle className="text-red-500 mr-1" />
        )}
        <span className="capitalize">{property.verificationStatus}</span>
      </p>
      <Link
        to={`/property/${property._id}`}
        className="inline-block mt-4 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Details
      </Link>
    </div>
  </div>
);

export default PropertyCard;

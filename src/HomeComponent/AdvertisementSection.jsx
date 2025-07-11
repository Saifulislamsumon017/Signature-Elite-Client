import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const AdvertisementSection = ({ properties }) => (
  <div className="max-w-7xl mx-auto  px-6 py-10">
    <h2 className="text-3xl font-semibold mb-6">Featured Advertisements</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {properties.length === 0 && <p>No advertised properties found.</p>}
      {properties.map(property => (
        <div
          key={property._id}
          className="border rounded-lg shadow hover:shadow-lg transition duration-200"
        >
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
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
      ))}
    </div>
  </div>
);

export default AdvertisementSection;

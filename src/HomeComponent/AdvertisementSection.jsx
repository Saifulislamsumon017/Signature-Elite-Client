import PropertyCard from '@/Components/ui/PropertyCard/PropertyCard';
import React from 'react';

const Advertisementsection = ({ properties = [] }) => {
  if (properties.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        No advertised properties available.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20  dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg ">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white relative inline-block">
        Advertised Properties
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {properties.map(property => (
          <div
            key={property._id}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Advertisementsection;

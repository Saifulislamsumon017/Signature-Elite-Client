import React from 'react';
import PropertyCard from '@/Components/ui/PropertyCard/PropertyCard';

const RecentlyAddedSection = ({ properties = [] }) => {
  if (properties.length === 0) {
    return (
      <p className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
        No recent properties available.
      </p>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 pt-20">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white relative inline-block">
        Recently Added Properties
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
        {properties.map(property => (
          <div
            key={property._id}
            className="flex-shrink-0 w-72 transform transition-transform duration-300 hover:scale-105"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyAddedSection;

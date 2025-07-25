import PropertyCard from '@/Components/ui/PropertyCard/PropertyCard';
import React from 'react';

const AdvertisementSection = ({ properties = [] }) => {
  if (properties.length === 0) {
    return (
      <p className="text-center py-10">No advertised properties available.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-6">
        Advertised Properties
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.length === 0 ? (
          <p className="col-span-full text-center">No properties found.</p>
        ) : (
          properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdvertisementSection;

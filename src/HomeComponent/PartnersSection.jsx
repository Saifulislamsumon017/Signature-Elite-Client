import React from 'react';

const partners = [
  {
    id: 1,
    name: 'RealEstateCo',
    logo: 'https://via.placeholder.com/120x60?text=RealEstateCo',
  },
  {
    id: 2,
    name: 'HomeBuilders',
    logo: 'https://via.placeholder.com/120x60?text=HomeBuilders',
  },
  {
    id: 3,
    name: 'DreamHomes',
    logo: 'https://via.placeholder.com/120x60?text=DreamHomes',
  },
  {
    id: 4,
    name: 'CityProperties',
    logo: 'https://via.placeholder.com/120x60?text=CityProperties',
  },
  {
    id: 5,
    name: 'LuxuryLiving',
    logo: 'https://via.placeholder.com/120x60?text=LuxuryLiving',
  },
];

const PartnersSection = () => {
  return (
    // <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold mb-12 text-gray-900 dark:text-white relative inline-block">
        Our Partners
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center">
        {partners.map(partner => (
          <div
            key={partner.id}
            className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition duration-300"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
    // </section>
  );
};

export default PartnersSection;

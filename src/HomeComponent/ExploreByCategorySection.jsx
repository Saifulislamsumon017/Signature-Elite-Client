import React from 'react';
import { FaBuilding, FaHome, FaCity, FaWarehouse } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: 'Apartment',
    icon: <FaHome className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: 2,
    name: 'Villa',
    icon: <FaBuilding className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: 3,
    name: 'Office',
    icon: <FaCity className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: 4,
    name: 'Warehouse',
    icon: <FaWarehouse className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
  },
];

const ExploreByCategorySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-20">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white relative inline-block">
        Explore By Category
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map(cat => (
          <div
            key={cat.id}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl text-center border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
          >
            <div className="flex justify-center mb-4">{cat.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreByCategorySection;

import React from 'react';
import { FaThumbsUp, FaShieldAlt, FaClock, FaDollarSign } from 'react-icons/fa';

const benefits = [
  {
    id: 1,
    icon: <FaThumbsUp className="text-blue-600 dark:text-blue-400 w-8 h-8" />,
    title: 'Trusted by Thousands',
    description: 'We have a large and loyal user base who trust our platform.',
  },
  {
    id: 2,
    icon: <FaShieldAlt className="text-blue-600 dark:text-blue-400 w-8 h-8" />,
    title: 'Secure Transactions',
    description: 'All transactions are protected with top-notch security.',
  },
  {
    id: 3,
    icon: <FaClock className="text-blue-600 dark:text-blue-400 w-8 h-8" />,
    title: '24/7 Support',
    description: 'Our team is available round the clock for your assistance.',
  },
  {
    id: 4,
    icon: <FaDollarSign className="text-blue-600 dark:text-blue-400 w-8 h-8" />,
    title: 'Best Price Guarantee',
    description: 'We ensure competitive pricing for all listings.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-20 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white relative inline-block">
        Why Choose Us
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {benefits.map(({ id, icon, title, description }) => (
          <div
            key={id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
          >
            <div className="flex justify-center mb-3">{icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUsSection;

import React from 'react';
import { FaThumbsUp, FaShieldAlt, FaClock, FaDollarSign } from 'react-icons/fa';

const benefits = [
  {
    id: 1,
    icon: <FaThumbsUp className="text-indigo-600 w-8 h-8 mb-2" />,
    title: 'Trusted by Thousands',
    description: 'We have a large and loyal user base who trust our platform.',
  },
  {
    id: 2,
    icon: <FaShieldAlt className="text-indigo-600 w-8 h-8 mb-2" />,
    title: 'Secure Transactions',
    description: 'All transactions are protected with top-notch security.',
  },
  {
    id: 3,
    icon: <FaClock className="text-indigo-600 w-8 h-8 mb-2" />,
    title: '24/7 Support',
    description: 'Our team is available round the clock for your assistance.',
  },
  {
    id: 4,
    icon: <FaDollarSign className="text-indigo-600 w-8 h-8 mb-2" />,
    title: 'Best Price Guarantee',
    description: 'We ensure competitive pricing for all listings.',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
        {benefits.map(({ id, icon, title, description }) => (
          <div
            key={id}
            className="flex flex-col items-center text-center p-4 border rounded hover:shadow-lg transition"
          >
            {icon}
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

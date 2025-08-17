import React from 'react';
import { Home, Search, Building2, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Search Properties',
    desc: 'Browse thousands of verified listings tailored to your needs.',
    icon: <Search className="w-12 h-12 text-blue-600" />,
  },
  {
    id: 2,
    title: 'Connect with Agents',
    desc: 'Talk to top-rated agents and get professional guidance.',
    icon: <Building2 className="w-12 h-12 text-green-600" />,
  },
  {
    id: 3,
    title: 'Visit & Verify',
    desc: 'Schedule tours, verify details, and explore in-person.',
    icon: <Home className="w-12 h-12 text-pink-600" />,
  },
  {
    id: 4,
    title: 'Close the Deal',
    desc: 'Negotiate, finalize, and move into your dream property.',
    icon: <CheckCircle className="w-12 h-12 text-yellow-600" />,
  },
];

const HowItWorksSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-20  dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg ">
      <h2 className="text-4xl font-extrabold text-center mb-2 text-gray-900 dark:text-white relative inline-block">
        How It Works
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>
      <p className="text-start mb-8 text-gray-900 dark:text-white">
        Finding your perfect property has never been easier. Follow these four
        simple steps to get started.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {steps.map(step => (
          <div
            key={step.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="mb-6">{step.icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksSection;

import React from 'react';

const agents = [
  {
    id: 1,
    name: 'John Doe',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 2,
    name: 'Jane Smith',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    photo: 'https://randomuser.me/api/portraits/men/77.jpg',
    email: 'michael@example.com',
    phone: '+1 (555) 222-3333',
  },
];

const FeaturedAgentsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-20  dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg ">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white relative inline-block">
        Featured Agents
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-3 rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {agents.map(agent => (
          <div
            key={agent.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
          >
            <div className="flex justify-center">
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-28 h-28 rounded-full mb-5 object-cover border-4 border-blue-500 dark:border-blue-400"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
              {agent.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {agent.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {agent.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAgentsSection;

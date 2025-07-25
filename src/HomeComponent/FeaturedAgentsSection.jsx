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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Featured Agents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {agents.map(agent => (
          <div
            key={agent.id}
            className="border p-6 rounded shadow flex flex-col items-center"
          >
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.email}</p>
            <p className="text-sm text-gray-600">{agent.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAgentsSection;

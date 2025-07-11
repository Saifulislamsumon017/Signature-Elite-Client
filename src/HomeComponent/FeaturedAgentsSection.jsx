import React from 'react';

const FeaturedAgentsSection = () => {
  const agents = [
    {
      id: 'agent1',
      name: 'Alice Realtor',
      image: 'https://i.ibb.co/WkxH6nN/agent1.jpg',
    },
    {
      id: 'agent2',
      name: 'Bob Broker',
      image: 'https://i.ibb.co/NmXDDCS/agent2.jpg',
    },
    {
      id: 'agent3',
      name: 'Charlie Homes',
      image: 'https://i.ibb.co/k1FpNQf/agent3.jpg',
    },
    {
      id: 'agent4',
      name: 'Diana Estates',
      image: 'https://i.ibb.co/HrFvDjg/agent4.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto  px-6 py-10">
      <h2 className="text-3xl font-semibold mb-6">Featured Agents</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="flex flex-col items-center">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <h3 className="mt-3 font-semibold">{agent.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAgentsSection;

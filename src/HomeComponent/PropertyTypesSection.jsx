import React from 'react';

const propertyTypes = [
  {
    id: 1,
    name: 'Townhome',
    image:
      'https://plus.unsplash.com/premium_photo-1661315431756-f9870d5ff5a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count: 20,
    className: 'col-span-2 row-span-1',
  },
  {
    id: 2,
    name: 'Houses',
    image:
      'https://images.unsplash.com/photo-1489370321024-e0410ad08da4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SG91c2VzfGVufDB8fDB8fHww',
    count: 20,
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    name: 'Studio',
    image:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U3R1ZGlvfGVufDB8fDB8fHww',
    count: 12,
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    name: 'Apartments',
    image:
      'https://images.unsplash.com/photo-1619542402915-dcaf30e4e2a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QXBhcnRtZW50c3xlbnwwfHwwfHx8MA%3D%3D',
    count: 19,
    className: 'col-span-2 row-span-2', // big highlight
  },
  {
    id: 5,
    name: 'Offices',
    image:
      'https://plus.unsplash.com/premium_photo-1681487178876-a1156952ec60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T2ZmaWNlc3xlbnwwfHwwfHx8MA%3D%3D',
    count: 20,
    className: 'col-span-1 row-span-1',
  },
];

const PropertyTypesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-20">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white relative inline-block">
        Explore by Property Type
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {propertyTypes.map(type => (
          <div
            key={type.id}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
          >
            <img
              src={type.image}
              alt={type.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 dark:bg-black/40 flex flex-col justify-end p-4 text-white">
              <h3 className="text-xl font-semibold">{type.name}</h3>
              <p className="text-sm">{type.count} Properties</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyTypesSection;

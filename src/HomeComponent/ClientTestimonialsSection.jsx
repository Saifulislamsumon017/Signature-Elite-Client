import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Alice Walker',
    photo: 'https://randomuser.me/api/portraits/women/50.jpg',
    feedback: 'Amazing service! Found my dream home within a week.',
  },
  {
    id: 2,
    name: 'Mark Wilson',
    photo: 'https://randomuser.me/api/portraits/men/41.jpg',
    feedback: 'Trusted platform. Smooth and secure transactions.',
  },
  {
    id: 3,
    name: 'Sophia Brown',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    feedback: 'Professional agents and great support throughout the process.',
  },
];

const ClientTestimonialsSection = () => {
  return (
    // <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold mb-12 text-gray-900 dark:text-white relative inline-block">
        Client Testimonials
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map(t => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105"
          >
            <img
              src={t.photo}
              alt={t.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500 dark:border-blue-400"
            />
            <p className="italic text-gray-700 dark:text-gray-300 mb-3">
              &ldquo;{t.feedback}&rdquo;
            </p>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
    // </section>
  );
};

export default ClientTestimonialsSection;

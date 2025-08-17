import WhyChooseUsSection from '@/HomeComponent/WhyChooseUsSection';
import React from 'react';
import {
  FaBullseye,
  FaEye,
  FaShieldAlt,
  FaHeadset,
  FaPalette,
  FaSyncAlt,
} from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'CEO & Founder',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Michael Smith',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    name: 'Sophia Lee',
    role: 'Lead Designer',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'David Kim',
    role: 'Marketing Head',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
];

const About = () => {
  return (
    <div className="min-h-screen p-6 md:p-12 text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto space-y-16 relative">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white inline-block relative">
            About Us
            <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Welcome to our platform! We strive to make buying, selling, and
            exploring properties effortless and transparent. Experience a
            professional approach with cutting-edge features and modern design.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700 flex flex-col gap-4 transition hover:shadow-2xl transform hover:-translate-y-1">
            <div className="flex items-center gap-3 text-indigo-500">
              <FaBullseye className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Provide a trustworthy and user-friendly platform for buyers,
              sellers, and agents, ensuring efficiency, security, and
              transparency in all property transactions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border dark:border-gray-700 flex flex-col gap-4 transition hover:shadow-2xl transform hover:-translate-y-1">
            <div className="flex items-center gap-3 text-purple-500">
              <FaEye className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              To be the leading real estate platform combining technology with
              excellent customer service, making property transactions smooth,
              reliable, and modern for everyone.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <WhyChooseUsSection />

        {/* Team Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <div
                key={member.name}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl flex flex-col items-center transition hover:shadow-2xl hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Explore Properties?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users and find your dream property
            today!
          </p>
          <a
            href="/properties"
            className="inline-block px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full transition"
          >
            Browse Properties
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

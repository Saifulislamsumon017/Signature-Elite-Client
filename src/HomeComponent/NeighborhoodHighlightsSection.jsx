import {
  MapPin,
  ShoppingBag,
  Hospital,
  School,
  Trees,
  Music,
} from 'lucide-react';

const NeighborhoodHighlightsSection = () => {
  const highlights = [
    {
      id: 1,
      icon: (
        <School className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
      ),
      image:
        'https://plus.unsplash.com/premium_photo-1690479510844-6385aa431b76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fFNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D',
      title: 'Top Schools',
      description:
        'Access to excellent schools and educational institutions nearby.',
    },
    {
      id: 2,
      icon: <Hospital className="w-10 h-10 text-red-500 dark:text-red-400" />,
      image:
        'https://plus.unsplash.com/premium_photo-1681967103563-871828436e1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEhvc3BpdGFsfGVufDB8fDB8fHww',
      title: 'Hospitals',
      description: 'World-class healthcare facilities within easy reach.',
    },
    {
      id: 3,
      icon: (
        <ShoppingBag className="w-10 h-10 text-green-600 dark:text-green-400" />
      ),
      image:
        'https://images.unsplash.com/photo-1585202505656-c6b17753db12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2hvcHBpbmclMjBtYWxsfGVufDB8fDB8fHww',
      title: 'Shopping & Dining',
      description: 'Premium malls, local shops, and fine dining experiences.',
    },
    {
      id: 4,
      icon: (
        <Trees className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
      ),
      image:
        'https://media.istockphoto.com/id/1857433096/photo/parents-and-children-playing-with-ball-in-garden.webp?a=1&b=1&s=612x612&w=0&k=20&c=t8i8UF620wKCFRErm8jT6t6LP8gKsZaS4qaWfm7z-Kg=',
      title: 'Parks & Recreation',
      description:
        'Beautiful parks and green spaces for relaxation and fitness.',
    },
    {
      id: 5,
      icon: (
        <MapPin className="w-10 h-10 text-purple-600 dark:text-purple-400" />
      ),
      image:
        'https://plus.unsplash.com/premium_photo-1737200670622-4ab7cd09de62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fFByaW1lJTIwTG9jYXRpb258ZW58MHx8MHx8fDA%3D',
      title: 'Prime Location',
      description: 'Centrally located with easy access to public transport.',
    },
    {
      id: 6,
      icon: <Music className="w-10 h-10 text-pink-600 dark:text-pink-400" />,
      image:
        'https://images.unsplash.com/photo-1720700449251-0e874f42c00a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgzfHxFbnRlcnRhaW5tZW50fGVufDB8fDB8fHww',
      title: 'Entertainment & Nightlife',
      description:
        'Cinemas, theaters, and vibrant nightlife just around the corner.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20  dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg ">
      {/* Heading */}

      <h2 className="text-4xl font-extrabold text-center mb-2 text-gray-900 dark:text-white relative inline-block">
        Neighborhood Highlights
        <span className="block w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-2 rounded-full"></span>
      </h2>
      <p className="text-start mb-8 text-gray-900 dark:text-white">
        Discover what makes our properties stand out with nearby facilities.
      </p>

      {/* Highlights grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlights.map(item => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            {/* Image */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeighborhoodHighlightsSection;

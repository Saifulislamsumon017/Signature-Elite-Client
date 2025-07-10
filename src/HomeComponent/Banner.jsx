import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bannerImg1 from '../assets/Banner Image/1 (1).webp';
import bannerImg2 from '../assets/Banner Image/2 (1).webp';
import bannerImg3 from '../assets/Banner Image/16.webp';
import { Carousel } from 'react-responsive-carousel';

const slides = [
  {
    image: bannerImg1,
    title: 'Discover Your Signature Home',
    description:
      'Find elegant residences tailored to your lifestyle. Signature Elite connects you with premium properties in the city most desirable neighborhoods.',
    button: 'Explore Listings',
  },
  {
    image: bannerImg2,
    title: 'Luxury Redefined, Elite Service',
    description:
      'Experience a seamless buying and selling journey with personalized attention and unmatched market expertise from Signature Elite.',
    button: 'Get Started Today',
  },
  {
    image: bannerImg3,
    title: 'Invest in Your Future with Confidence',
    description:
      'Secure your dream property or grow your portfolio with Signature Elite’s curated real estate opportunities and expert guidance.',
    button: 'View Opportunities',
  },
];

const Banner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="w-full h-screen">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        stopOnHover
        swipeable
        emulateTouch
        onChange={() => AOS.refresh()}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="relative w-full h-screen overflow-hidden">
            <img
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* TEXT AND BUTTON with forced remount for AOS */}
            <div
              key={idx} // This line is key to re-trigger AOS on every slide
              className="relative z-10 flex flex-col items-center justify-center h-full gap-5 px-4 text-center"
            >
              <h1
                data-aos="fade-down"
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-3/4 drop-shadow-lg"
              >
                {slide.title}
              </h1>
              <p
                data-aos="fade-up"
                className="text-white text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl drop-shadow-md"
              >
                {slide.description}
              </p>
              <button
                data-aos="zoom-in"
                className="px-8 py-4 text-lg md:text-xl font-semibold text-white bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300 ease-in-out"
              >
                {slide.button}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;

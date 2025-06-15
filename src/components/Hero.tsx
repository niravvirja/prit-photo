
import React, { useState, useEffect } from 'react';
import OptimizedImage from './ui/optimized-image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mobileImages = [
    'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984662/events/importants/hero/mob-01.jpg',
    'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984662/events/importants/hero/mob-02.jpg',
    'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984662/events/importants/hero/mob-03.jpg',
  ];

  const desktopImages = [
    'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984662/events/importants/hero/des-01.jpg',
    'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984662/events/importants/hero/des-02.jpg',
    'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984662/events/importants/hero/des-03.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileImages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [mobileImages.length]);

  return (
    <section id="hero" className="relative w-full max-h-screen aspect-[9/16] sm:aspect-[16/9] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {mobileImages.map((image, index) => (
          <div
            key={`mobile-${index}`}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out sm:hidden ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          >
            <OptimizedImage
              src={image}
              alt={`Wedding Photography Mobile ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          </div>
        ))}
        {desktopImages.map((image, index) => (
          <div
            key={`desktop-${index}`}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out hidden sm:block ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          >
            <OptimizedImage
              src={image}
              alt={`Wedding Photography Desktop ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
          </div>
        ))}
      </div>

      {/* Main Hashtag */}
      <div className="absolute bottom-52 sm:bottom-20 md:bottom-32 left-0 right-0 z-10 text-center text-white px-4 sm:px-6 w-full max-w-6xl mx-auto">
        <h1 className="text-[2.8vh] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-main font-bold leading-tight text-white break-words text-center">
          #AJourneyOfLoveBy<br />
          <span className="block text-[7vw] [text-shadow:_0_0_10px_rgba(255,255,255,1),_0_0_90px_rgba(255,255,255,0.9),_0_0_200px_rgba(255,255,255,0.7)]">
            PRITPHOTO
          </span>
        </h1>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col space-y-2 sm:space-y-3 z-20">
        {mobileImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1 h-5 sm:h-6 transition-all duration-300 ${index === currentSlide ? 'bg-primary' : 'bg-white/30'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

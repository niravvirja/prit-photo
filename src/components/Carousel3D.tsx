import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from './ui/optimized-image';

const Carousel3D = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const intervalRef = useRef(null);

  // Cleaner transition function with debouncing
  const changeSlide = useCallback((newIndex) => {
    if (newIndex === currentIndex) return;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    changeSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, slides.length, changeSlide]);

  const prevSlide = useCallback(() => {
    changeSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, slides.length, changeSlide]);

  // Simplified auto-play with better cleanup
  useEffect(() => {
    if (!isAutoPlay) return;
    
    intervalRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, isAutoPlay]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  // Optimized touch handling
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlay(false);
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 60;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    
    // Resume auto-play after touch
    setTimeout(() => setIsAutoPlay(true), 1000);
  }, [nextSlide, prevSlide]);

  // Smoother animation variants
  const slideVariants = {
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
      zIndex: 10,
      rotateY: 0,
      filter: 'brightness(1)',
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1], // Custom easing for smoother feel
        type: "tween"
      },
    },
    left: {
      x: '-60%',
      opacity: 0.6,
      scale: 0.8,
      zIndex: 5,
      rotateY: 25,
      filter: 'brightness(0.7)',
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        type: "tween"
      },
    },
    right: {
      x: '60%',
      opacity: 0.6,
      scale: 0.8,
      zIndex: 5,
      rotateY: -25,
      filter: 'brightness(0.7)',
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        type: "tween"
      },
    },
    hidden: {
      x: '100%',
      opacity: 0,
      scale: 0.6,
      zIndex: 0,
      rotateY: -45,
      filter: 'brightness(0.5)',
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1],
        type: "tween"
      },
    },
  };

  const getSlidePosition = useCallback((index) => {
    if (index === currentIndex) return 'center';
    if (index === (currentIndex - 1 + slides.length) % slides.length) return 'left';
    if (index === (currentIndex + 1) % slides.length) return 'right';
    return 'hidden';
  }, [currentIndex, slides.length]);

  return (
    <div
      className="relative w-full max-w-7xl mx-auto select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <div className="relative h-[560px] lg:h-[630px] xl:h-[670px] overflow-visible pb-10 perspective-1000">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => {
              const position = getSlidePosition(index);
              
              return (
                <motion.div
                  key={`${index}-${slide.title}`} // More stable key
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  variants={slideVariants}
                  animate={position}
                  onClick={() => position !== 'center' && changeSlide(index)}
                  style={{ 
                    willChange: 'transform, opacity',
                    transformStyle: 'preserve-3d'
                  }}
                  layout={false} // Disable layout animations for performance
                >
                  <div className="w-[50vw] max-w-[850px] min-w-[380px]">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                      <div className="relative aspect-[16/10]">
                        <OptimizedImage
                          src={slide.desktopSrc}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          lazy={position === 'hidden'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {position === 'center' && (
                          <motion.div
                            className="p-5 bg-gradient-to-r from-primary to-primary/90"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-main font-bold text-primary-foreground text-xl lg:text-2xl mb-2">
                                  {slide.title}
                                </h3>
                              </div>
                              <Link
                                to={`/events#${slide.section}`}
                                className="border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-primary-foreground transition-all duration-300 px-5 py-2 font-main font-semibold tracking-wide rounded-full hover:scale-105 text-base transform-gpu"
                              >
                                {slide.button}
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <div className="relative h-[460px] overflow-visible px-4 pb-6">
          <div className="relative w-full h-full">
            {slides.map((slide, index) => {
              const position = getSlidePosition(index);
              
              return (
                <motion.div
                  key={`mobile-${index}-${slide.title}`}
                  className="absolute inset-0 flex items-center justify-center"
                  variants={slideVariants}
                  animate={position}
                  style={{ 
                    willChange: 'transform, opacity',
                    transformStyle: 'preserve-3d'
                  }}
                  layout={false}
                >
                  <div className="w-[80vw] max-w-[340px]">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
                      <div className="relative aspect-[4/5]">
                        <OptimizedImage
                          src={slide.mobileSrc}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          lazy={position === 'hidden'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                      
                      <AnimatePresence mode="wait">
                        {position === 'center' && (
                          <motion.div
                            className="p-4 text-center bg-gradient-to-b from-primary to-primary/90"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <h3 className="font-main font-bold text-primary-foreground text-lg mb-3">
                              {slide.title}
                            </h3>
                            <Link
                              to={`/events#${slide.section}`}
                              className="border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-primary-foreground transition-all duration-300 px-5 py-2 font-main font-semibold tracking-wide rounded-full hover:scale-105 text-base transform-gpu"
                            >
                              {slide.button}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => changeSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-110' 
                : 'bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;

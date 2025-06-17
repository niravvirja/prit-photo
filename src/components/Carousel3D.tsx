import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import OptimizedImage from './ui/optimized-image';

const Carousel3D = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [slides.length, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  useEffect(() => {
    if (isTransitioning) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isTransitioning]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || isTransitioning) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    else if (isRightSwipe) prevSlide();

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slideVariants = {
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 10,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    left: {
      x: '-55%',
      opacity: 0.4,
      scale: 0.85,
      zIndex: 5,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    right: {
      x: '55%',
      opacity: 0.4,
      scale: 0.85,
      zIndex: 5,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hidden: {
      x: '100%',
      opacity: 0,
      scale: 0.75,
      zIndex: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const getSlidePosition = (index) => {
    if (index === currentIndex) return 'center';
    if (index === (currentIndex - 1 + slides.length) % slides.length) return 'left';
    if (index === (currentIndex + 1) % slides.length) return 'right';
    return 'hidden';
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <div className="relative h-[560px] lg:h-[630px] xl:h-[670px] overflow-visible pb-10">
          <AnimatePresence initial={false} mode="sync">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                variants={slideVariants}
                initial="hidden"
                animate={getSlidePosition(index)}
                onClick={() => getSlidePosition(index) !== 'center' && goToSlide(index)}
                style={{ willChange: 'transform' }}
              >
                <div className="w-[50vw] max-w-[850px] min-w-[380px]">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group">
                    <div className="relative aspect-[16/10]">
                      <OptimizedImage
                        src={slide.desktopSrc}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        lazy={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    {getSlidePosition(index) === 'center' && (
                      <motion.div
                        className="p-5 bg-gradient-to-r from-primary to-primary/90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-main font-bold text-primary-foreground text-xl lg:text-2xl mb-2">
                              {slide.title}
                            </h3>
                          </div>
                          <Link
                            to={`/events#${slide.section}`}
                            className="border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-primary-foreground transition-all duration-300 px-5 py-2 font-main font-semibold tracking-wide rounded-full hover:scale-105 text-base"
                          >
                            {slide.button}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <div className="relative h-[460px] overflow-visible px-4 pb-6">
          <AnimatePresence initial={false} mode="sync">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                variants={slideVariants}
                initial="hidden"
                animate={getSlidePosition(index)}
                style={{ willChange: 'transform' }}
              >
                <div className="w-[80vw] max-w-[340px]">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300 group">
                    <div className="relative aspect-[4/5]">
                      <OptimizedImage
                        src={slide.mobileSrc}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        lazy={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    {getSlidePosition(index) === 'center' && (
                      <motion.div
                        className="p-4 text-center bg-gradient-to-b from-primary to-primary/90"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="font-main font-bold text-primary-foreground text-lg mb-3">
                          {slide.title}
                        </h3>
                        <Link
                          to={`/events#${slide.section}`}
                          className="border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-primary-foreground transition-all duration-300 px-5 py-2 font-main font-semibold tracking-wide rounded-full hover:scale-105 text-base"
                        >
                          {slide.button}
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;

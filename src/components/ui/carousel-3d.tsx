"use client";
import { useState, useRef, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

interface SlideData {
  title: string;
  button: string;
  desktopSrc: string;
  mobileSrc: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick
}: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { desktopSrc, mobileSrc, button, title } = slide;
  const isActive = current === index;

  // Animation variants for slide
  const slideVariants = {
    active: { opacity: 1, scale: 1, zIndex: 10, transition: { duration: 0.5, ease: 'easeOut' } },
    inactive: { opacity: 0.6, scale: 0.9, zIndex: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.li
      ref={slideRef}
      className="flex-shrink-0 w-full"
      variants={slideVariants}
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      onClick={() => handleSlideClick(index)}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 mx-2 sm:mx-4">
        {/* Image Container with responsive aspect ratios */}
        <div className={cn(
          "relative w-full overflow-hidden",
          isMobile ? "aspect-[3/4]" : "aspect-video"
        )}>
          <img
            className="w-full h-full object-cover opacity-0 transition-opacity duration-600 ease-in-out"
            alt={title}
            src={isMobile ? mobileSrc : desktopSrc}
            onLoad={imageLoaded}
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
              e.currentTarget.parentElement!.style.backgroundColor = "rgba(255,255,255,0.1)";
            }}
            loading={isActive ? "eager" : "lazy"}
            decoding="async"
          />
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 text-center">
          <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-3">
            {title}
          </h3>
          <motion.button
            className="px-5 py-2 bg-white text-primary hover:bg-white/90 font-medium rounded-lg shadow-md hover:shadow-lg text-sm transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {button}
          </motion.button>
        </div>
      </div>
    </motion.li>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel3D({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const id = useId();

  // Auto-play functionality - 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  // Animation variants for carousel container
  const carouselVariants = {
    initial: { x: 0 },
    animate: { x: `-${current * 100}%`, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div
      className="relative w-full max-w-3xl sm:max-w-4xl mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.ul
          className="flex w-full"
          variants={carouselVariants}
          initial="initial"
          animate="animate"
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

// Sample data for testing
const sampleSlides: SlideData[] = [
  {
    title: "Modern Architecture",
    button: "Explore Design",
    desktopSrc: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=675&fit=crop",
    mobileSrc: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=480&h=640&fit=crop"
  },
  {
    title: "Urban Landscapes",
    button: "Discover More",
    desktopSrc: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=675&fit=crop",
    mobileSrc: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=480&h=640&fit=crop"
  },
  {
    title: "Natural Beauty",
    button: "View Gallery",
    desktopSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop",
    mobileSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=640&fit=crop"
  },
  {
    title: "Tech Innovation",
    button: "Learn More",
    desktopSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=675&fit=crop",
    mobileSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=480&h=640&fit=crop"
  }
];

// Export with sample data for demonstration
export default function Demo() {
  return (
    <section className="min-h-screen bg-primary p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-center mb-6 sm:mb-8 text-white">
          3D Carousel
        </h1>
        <Carousel3D slides={sampleSlides} />
      </div>
    </section>
  );
}
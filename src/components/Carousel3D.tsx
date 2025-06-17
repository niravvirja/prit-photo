import React, { useState, useEffect, useRef } from 'react';

const Carousel3D = () => {
  // Portfolio slides data
  const portfolioSlides = [
    {
      title: "Traditional Wedding",
      description: "Capturing sacred moments of traditional ceremonies with artistic finesse",
      button: "View Gallery",
      section: "traditional-wedding",
      desktopSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984682/events/importants/portfolio/des-wedding.jpg",
      mobileSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984682/events/importants/portfolio/mob-wedding.jpg"
    },
    {
      title: "Pre-Wedding Romance",
      description: "Intimate sessions that weave your unique love story",
      button: "View Gallery",
      section: "pre-wedding-romance",
      desktopSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882053/events/arpitanddrashti/12.jpg",
      mobileSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882551/events/kuldipanddevangi-pre/01.jpg"
    },
    {
      title: "Maternity Photography",
      description: "Tender moments capturing the beauty of parenthood",
      button: "View Gallery",
      section: "maternity-photography",
      desktopSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749899775/events/darshananddivya/05.jpg",
      mobileSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984688/events/importants/portfolio/mob-maternity.jpg"
    },
    {
      title: "Ring Ceremony",
      description: "Celebrating the moment of commitment with elegance and joy",
      button: "View Gallery",
      section: "ring-ceremony",
      desktopSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893068/events/yashanddivya/14.jpg",
      mobileSrc: "https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984695/events/importants/portfolio/mob-ring-cer.jpg"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioSlides.length) % portfolioSlides.length);
  };

  // Touch/Mouse handlers for swipe functionality
  const handleStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = startX - currentX;
    const threshold = 50;
    
    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  const getSlidePosition = (index) => {
    const diff = index - currentIndex;
    const totalSlides = portfolioSlides.length;
    
    let position = diff;
    if (Math.abs(diff) > totalSlides / 2) {
      position = diff > 0 ? diff - totalSlides : diff + totalSlides;
    }
    
    return position;
  };

  const getSlideStyle = (index) => {
    const position = getSlidePosition(index);
    const isCenter = position === 0;
    const absPosition = Math.abs(position);
    
    // Responsive spacing based on screen size
    const isMobile = window.innerWidth < 768;
    const spacing = isMobile ? 120 : 200;
    
    const translateX = position * spacing;
    const translateZ = isCenter ? 0 : -150 - (absPosition - 1) * 80;
    const scale = isCenter ? 1 : Math.max(0.5, 1 - absPosition * 0.25);
    const opacity = isCenter ? 1 : Math.max(0.2, 1 - absPosition * 0.4);
    const rotateY = position * -20;
    
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: opacity,
      zIndex: isCenter ? 10 : Math.max(1, 10 - absPosition)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-7xl flex items-center justify-center">
        <div 
          ref={carouselRef}
          className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          style={{ 
            perspective: '1200px',
            height: 'clamp(400px, 70vh, 600px)'
          }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          {portfolioSlides.map((slide, index) => {
            // Optimize Cloudinary images for better performance
            const optimizeCloudinaryUrl = (url) => {
              if (!url.includes('cloudinary.com')) return url;
              
              // Add Cloudinary transformations for optimization
              const transforms = isMobile 
                ? 'c_fill,w_400,h_600,q_80,f_auto' // Mobile: smaller size, good quality
                : 'c_fill,w_600,h_400,q_85,f_auto'; // Desktop: medium size, good quality
              
              return url.replace('/upload/', `/upload/${transforms}/`);
            };
            
            const imageSrc = optimizeCloudinaryUrl(isMobile ? slide.mobileSrc : slide.desktopSrc);
            
            return (
              <div
                key={index}
                className="absolute transition-all duration-700 ease-out transform-gpu flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  ...getSlideStyle(index)
                }}
              >
                <div className="relative group">
                  <img
                    src={imageSrc}
                    alt={slide.title}
                    className="object-cover rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-purple-500/30
                      w-60 h-80 md:w-80 md:h-60 lg:w-96 lg:h-72"
                    style={{
                      aspectRatio: isMobile ? '9/16' : '16/9'
                    }}
                    draggable={false}
                  />
                  
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl pointer-events-none" />
                  
                  {/* Glow effect for center image */}
                  {getSlidePosition(index) === 0 && (
                    <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-purple-500/20 pointer-events-none" />
                  )}
                  
                  {/* Title overlay for center image */}
                  {getSlidePosition(index) === 0 && (
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                        <h3 className="text-white font-semibold text-sm md:text-base">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;

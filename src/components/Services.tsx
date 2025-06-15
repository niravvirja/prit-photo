
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Baby, Gem } from 'lucide-react';
import SectionTitle from './ui/section-title';
import OptimizedImage from './ui/optimized-image';

const Services = () => {
  const [activeService, setActiveService] = useState('wedding');
  const isInitialRender = useRef(true);

  const services = [
    {
      id: 'ring',
      title: 'Ring Ceremony',
      icon: Gem,
      heroImage:
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893065/events/yashanddivya/13.jpg',
      images: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893052/events/yashanddivya/08.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893068/events/yashanddivya/14.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893070/events/yashanddivya/15.jpg',
      ],
      mobileImages: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893042/events/yashanddivya/04.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749893060/events/yashanddivya/11.jpg',
      ],
    },
    {
      id: 'prewedding',
      title: 'Pre-Wedding Shoots',
      icon: Heart,
      heroImage:
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749881637/events/parimalandrinkal/17.jpg',
      images: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882576/events/kuldipanddevangi-pre/08.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749881642/events/parimalandrinkal/19.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882041/events/arpitanddrashti/10.jpg',
      ],
      mobileImages: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882596/events/kuldipanddevangi-pre/13.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882058/events/arpitanddrashti/13.jpg',
      ],
    },
    {
      id: 'wedding',
      title: 'Wedding Photography',
      icon: Camera,
      heroImage:
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882866/events/kuldipanddevangi/22.jpg',
      images: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749792834/events/harshandriddhi/23.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749792690/events/hardikandpoonam/20.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882773/events/kuldipanddevangi/10.jpg',
      ],
      mobileImages: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749882907/events/kuldipanddevangi/32.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749792469/events/hardikandpoonam/14.jpg',
      ],
    },
    {
      id: 'maternity',
      title: 'Maternity Photography',
      icon: Baby,
      heroImage:
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749899796/events/darshananddivya/03.jpg',
      images: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749899796/events/darshananddivya/05.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749899812/events/darshananddivya/16.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749899812/events/darshananddivya/18.jpg',
      ],
      mobileImages: [
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749899796/events/darshananddivya/12.jpg',
        'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749899796/events/darshananddivya/16.jpg',
      ],
    },
  ];

  const activeServiceData = services.find((service) => service.id === activeService);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  const imageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="services" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <SectionTitle badge="Our Services" title="Capture Your Moments" />

        <div className="bg-primary-foreground shadow-xl border border-primary/20 rounded-2xl overflow-hidden">
          {/* Mobile Dropdown */}
          <div className="block sm:hidden p-6">
            <select
              value={activeService}
              onChange={(e) => setActiveService(e.target.value)}
              className="w-full p-4 rounded-xl bg-primary text-primary-foreground border border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base font-main appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
              }}
            >
              {services.map((service) => (
                <option key={service.id} value={service.id} className="bg-background text-foreground">
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-col lg:flex-row">
            <div className="lg:w-4/12 p-6 bg-primary-foreground border-r border-primary/10">
              <nav className="space-y-2">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                        activeService === service.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-accent/10 hover:bg-accent/30 text-foreground'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="p-2 rounded-full bg-primary-foreground/10">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-base font-medium font-main">{service.title}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            <div className="lg:w-8/12 p-6 bg-primary-foreground">
              {activeServiceData && (
                <div className="flex flex-col gap-6">
                  <motion.div
                    key={activeServiceData.id}
                    className="w-full h-[50vh] rounded-xl object-cover shadow-md"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <OptimizedImage
                      src={activeServiceData.heroImage}
                      alt={`${activeServiceData.title} Hero`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeServiceData.images.map((image, i) => (
                      <motion.div
                        key={`${activeServiceData.id}-${i}`}
                        className="w-full rounded-xl overflow-hidden aspect-[16/9] shadow-md"
                        variants={imageVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: i * 0.1 }}
                      >
                        <OptimizedImage
                          src={image}
                          alt={`${activeServiceData.title} ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Images */}
          <div className="block sm:hidden p-6 bg-primary-foreground">
            {activeServiceData && (
              <div className="space-y-4">
                <motion.div
                  className="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <OptimizedImage
                    src={activeServiceData.heroImage}
                    alt={`${activeServiceData.title} Hero`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="grid grid-cols-2 gap-4">
                  {activeServiceData.mobileImages.map((img, idx) => (
                    <motion.div
                      key={`${activeServiceData.id}-mobile-${idx}`}
                      className="w-full aspect-[9/16] rounded-xl overflow-hidden shadow-md"
                      variants={imageVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: idx * 0.1 }}
                    >
                      <OptimizedImage
                        src={img}
                        alt={`${activeServiceData.title} Mobile ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

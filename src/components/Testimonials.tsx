import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionTitle from './ui/section-title';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Kuldip & Devangi',
      location: 'Bhavnagar',
      rating: 5,
      text: 'Prit Digital Studio turned our wedding into a timeless memory. Their team was so professional and captured every moment with such care. We’re thrilled with the photos!',
      event: 'Wedding',
    },
    {
      name: 'Arpit & Drashti',
      location: 'Botad',
      rating: 5,
      text: 'The pre-wedding shoot was so much fun! Prit’s team made us feel at ease, and the photos are breathtaking. They truly captured our chemistry.',
      event: 'Pre-Wedding',
    },
    {
      name: 'Parimal & Rinkal',
      location: 'Ahmedabad',
      rating: 5,
      text: 'We couldn’t have asked for better photographers for our pre-wedding session. The creativity and attention to detail were amazing, and the results are stunning!',
      event: 'Pre-Wedding',
    },
    {
      name: 'Hardik & Poonam',
      location: 'Rajkot',
      rating: 5,
      text: 'Our wedding photos are beyond perfect. Prit Digital Studio captured every emotion and detail so beautifully. We’ll cherish these forever!',
      event: 'Wedding',
    },
    {
      name: 'Harsh & Riddhi',
      location: 'Surat',
      rating: 5,
      text: 'The team’s professionalism during our wedding was outstanding. They blended in seamlessly and delivered photos that tell our story so well.',
      event: 'Wedding',
    },
    {
      name: 'Yash & Divya',
      location: 'Bhavnagar',
      rating: 5,
      text: 'Our ring ceremony was captured with such elegance. Prit’s team has an incredible eye for detail, and we’re so happy with the photos!',
      event: 'Ring Ceremony',
    },
    {
      name: 'Darshan & Divya',
      location: 'Ahmedabad',
      rating: 5,
      text: 'The maternity shoot was such a special experience. Prit Digital Studio made us feel so comfortable, and the photos are absolutely beautiful!',
      event: 'Maternity',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: { x: '100%', opacity: 0 },
    center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="testimonials" className="py-20 sm:py-24 lg:py-28 bg-background">
      <SectionTitle badge="Client Testimonials" title="Client Testimonials" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentTestimonial}
              className="w-full flex-shrink-0 px-2 sm:px-4"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div
                className="bg-primary text-primary-foreground p-10 sm:p-12 lg:p-16 text-center relative border border-primary/30 rounded-2xl"
                variants={cardVariants}
                initial="initial"
                animate="animate"
              >
                <div className="absolute top-6 sm:top-8 left-6 sm:left-8 text-primary-foreground/20 hidden sm:block">
                  <Quote className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>

                <div className="flex justify-center mb-6 sm:mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-primary-foreground text-primary-foreground mx-0.5" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto font-main">
                  “{testimonials[currentTestimonial].text}”
                </blockquote>

                <div className="flex flex-col items-center justify-center gap-4 mt-8">
                  <div className="text-center">
                    <div className="font-bold text-lg sm:text-xl font-main">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sm text-primary-foreground/80">{testimonials[currentTestimonial].location}</div>
                    <div className="text-sm font-medium text-primary-foreground mt-1">
                      {testimonials[currentTestimonial].event}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
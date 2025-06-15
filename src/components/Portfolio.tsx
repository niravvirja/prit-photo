
import React from 'react';
import SectionTitle from './ui/section-title';
import Carousel3D from './Carousel3D';
import { portfolioSlides } from '../data/portfolio-slides';

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-card text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle 
          badge="Moments By Prit Photo" 
          title="Moments By Prit Photo" 
        />
        <Carousel3D slides={portfolioSlides} />
      </div>
    </section>
  );
};

export default Portfolio;

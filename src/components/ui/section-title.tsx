
import React from 'react';

interface SectionTitleProps {
  badge: string;
  title: string;
}

const SectionTitle = ({ badge, title }: SectionTitleProps) => {
  return (
    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
      <span className="inline-block bg-accent text-primary capitalize tracking-wide px-6 py-3 mb-4 border border-border rounded-full font-main font-bold text-lg sm:text-xl lg:text-2xl">
        •{badge.toUpperCase()}•
      </span>
    </div>
  );
};

export default SectionTitle;
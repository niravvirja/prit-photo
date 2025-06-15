
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  effect?: "blur" | "black-and-white" | "opacity";
  width?: string | number;
  height?: string | number;
  lazy?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, effect = 'blur', lazy = true, ...props }) => {
  const getOptimizedUrl = (url: string) => {
    if (!url || !url.includes('res.cloudinary.com')) {
      return url;
    }

    const transformations = 'f_auto,q_auto:good';

    if (url.includes('/upload/')) {
        const parts = url.split('/upload/');
        // Avoid adding transformations if they already exist
        if (parts[1].match(/^(f_|q_)/)) {
            return url;
        }
        return `${parts[0]}/upload/${transformations}/${parts[1]}`;
    }

    return url;
  };

  const optimizedSrc = getOptimizedUrl(src);

  if (!lazy) {
    // Render a standard img tag for non-lazy images to improve performance for preloaded assets
    return <img src={optimizedSrc} alt={alt} className={className} {...props} />;
  }

  return (
    <LazyLoadImage
      alt={alt}
      src={optimizedSrc}
      className={className}
      effect={effect}
      wrapperClassName={className} // Pass className to wrapper to preserve layout
      {...props}
    />
  );
};

export default OptimizedImage;
